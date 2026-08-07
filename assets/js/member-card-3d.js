(function () {
  const stage = document.querySelector("[data-member-card-3d]");
  const canvas = stage?.querySelector("[data-member-card-canvas]");

  if (!stage || !canvas) {
    return;
  }

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    depth: true,
    premultipliedAlpha: false,
  });

  if (!gl) {
    stage.classList.add("is-webgl-unavailable");
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compactMotion = window.matchMedia("(pointer: coarse), (max-width: 47.98rem)").matches;
  const initialCameraPitch = compactMotion ? -13 : -8;
  const initialRotateY = compactMotion ? -24 : -18;
  const cardAspect = 1583 / 994;

  const state = {
    dragging: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    cameraPitch: initialCameraPitch,
    rotateY: initialRotateY,
    autoRotation: initialRotateY,
  };

  const vertexSource = `
    attribute vec3 a_position;
    attribute vec3 a_normal;
    attribute vec2 a_uv;

    uniform mat4 u_matrix;
    uniform mat4 u_model;

    varying vec2 v_uv;
    varying float v_light;

    void main() {
      vec3 normal = normalize(mat3(u_model) * a_normal);
      vec3 lightDir = normalize(vec3(-0.28, 0.48, 0.83));
      float diffuse = max(dot(normal, lightDir), 0.0);
      v_light = 0.58 + diffuse * 0.42;
      v_uv = a_uv;
      gl_Position = u_matrix * vec4(a_position, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;

    uniform sampler2D u_texture;
    uniform int u_useTexture;
    uniform vec4 u_color;

    varying vec2 v_uv;
    varying float v_light;

    void main() {
      vec4 base = u_useTexture == 1 ? texture2D(u_texture, v_uv) : u_color;
      if (base.a < 0.01) {
        discard;
      }
      gl_FragColor = vec4(base.rgb * v_light, base.a);
    }
  `;

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "No se pudo compilar el shader.");
    }

    return shader;
  };

  const createProgram = () => {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "No se pudo enlazar el programa WebGL.");
    }

    return program;
  };

  const roundedRectPoints = (width, height, radius, segments) => {
    const points = [];
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const corners = [
      { cx: halfWidth - radius, cy: halfHeight - radius, start: 0, end: Math.PI / 2 },
      { cx: -halfWidth + radius, cy: halfHeight - radius, start: Math.PI / 2, end: Math.PI },
      { cx: -halfWidth + radius, cy: -halfHeight + radius, start: Math.PI, end: Math.PI * 1.5 },
      { cx: halfWidth - radius, cy: -halfHeight + radius, start: Math.PI * 1.5, end: Math.PI * 2 },
    ];

    corners.forEach((corner) => {
      for (let index = 0; index <= segments; index += 1) {
        const angle = corner.start + ((corner.end - corner.start) * index) / segments;
        points.push({
          x: corner.cx + Math.cos(angle) * radius,
          y: corner.cy + Math.sin(angle) * radius,
        });
      }
    });

    return points;
  };

  const normalize2 = (x, y) => {
    const length = Math.hypot(x, y) || 1;
    return [x / length, y / length];
  };

  const buildCardMesh = () => {
    const width = 5.2;
    const height = width / cardAspect;
    const depth = 0.036;
    const radius = 0.26;
    const halfDepth = depth / 2;
    const points = roundedRectPoints(width, height, radius, 18);
    const vertices = [];
    const ranges = [];

    const pushVertex = (x, y, z, nx, ny, nz, u, v) => {
      vertices.push(x, y, z, nx, ny, nz, u, v);
    };

    const addRange = (name, useTexture, color, textureName, addVertices) => {
      const start = vertices.length / 8;
      addVertices();
      ranges.push({
        name,
        start,
        count: vertices.length / 8 - start,
        useTexture,
        color,
        textureName,
      });
    };

    const uvForPoint = (point, mirrorX) => {
      const normalizedX = point.x / width + 0.5;
      const normalizedY = point.y / height + 0.5;
      return {
        u: mirrorX ? 1 - normalizedX : normalizedX,
        v: 1 - normalizedY,
      };
    };

    addRange("front", true, [1, 1, 1, 1], "front", () => {
      const center = { x: 0, y: 0 };
      const centerUv = uvForPoint(center, false);

      for (let index = 0; index < points.length; index += 1) {
        const current = points[index];
        const next = points[(index + 1) % points.length];
        const currentUv = uvForPoint(current, false);
        const nextUv = uvForPoint(next, false);

        pushVertex(center.x, center.y, halfDepth, 0, 0, 1, centerUv.u, centerUv.v);
        pushVertex(current.x, current.y, halfDepth, 0, 0, 1, currentUv.u, currentUv.v);
        pushVertex(next.x, next.y, halfDepth, 0, 0, 1, nextUv.u, nextUv.v);
      }
    });

    addRange("back", true, [1, 1, 1, 1], "back", () => {
      const center = { x: 0, y: 0 };
      const centerUv = uvForPoint(center, true);

      for (let index = 0; index < points.length; index += 1) {
        const current = points[index];
        const next = points[(index + 1) % points.length];
        const currentUv = uvForPoint(current, true);
        const nextUv = uvForPoint(next, true);

        pushVertex(center.x, center.y, -halfDepth, 0, 0, -1, centerUv.u, centerUv.v);
        pushVertex(next.x, next.y, -halfDepth, 0, 0, -1, nextUv.u, nextUv.v);
        pushVertex(current.x, current.y, -halfDepth, 0, 0, -1, currentUv.u, currentUv.v);
      }
    });

    addRange("side", false, [0.84, 0.88, 0.9, 1], null, () => {
      for (let index = 0; index < points.length; index += 1) {
        const current = points[index];
        const next = points[(index + 1) % points.length];
        const midpointX = (current.x + next.x) * 0.5;
        const midpointY = (current.y + next.y) * 0.5;
        const [nx, ny] = normalize2(midpointX, midpointY);

        pushVertex(current.x, current.y, halfDepth, nx, ny, 0, 0, 0);
        pushVertex(current.x, current.y, -halfDepth, nx, ny, 0, 0, 1);
        pushVertex(next.x, next.y, -halfDepth, nx, ny, 0, 1, 1);

        pushVertex(current.x, current.y, halfDepth, nx, ny, 0, 0, 0);
        pushVertex(next.x, next.y, -halfDepth, nx, ny, 0, 1, 1);
        pushVertex(next.x, next.y, halfDepth, nx, ny, 0, 1, 0);
      }
    });

    return { vertices: new Float32Array(vertices), ranges };
  };

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });

  const createTexture = (image) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return texture;
  };

  const multiply = (a, b) => {
    const out = new Float32Array(16);

    for (let column = 0; column < 4; column += 1) {
      for (let row = 0; row < 4; row += 1) {
        out[column * 4 + row] =
          a[0 * 4 + row] * b[column * 4 + 0] +
          a[1 * 4 + row] * b[column * 4 + 1] +
          a[2 * 4 + row] * b[column * 4 + 2] +
          a[3 * 4 + row] * b[column * 4 + 3];
      }
    }

    return out;
  };

  const perspective = (fieldOfView, aspect, near, far) => {
    const f = 1 / Math.tan(fieldOfView / 2);
    const rangeInverse = 1 / (near - far);

    return new Float32Array([
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (near + far) * rangeInverse,
      -1,
      0,
      0,
      near * far * rangeInverse * 2,
      0,
    ]);
  };

  const rotateY = (degrees) => {
    const radians = (degrees * Math.PI) / 180;
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    return new Float32Array([
      c,
      0,
      -s,
      0,
      0,
      1,
      0,
      0,
      s,
      0,
      c,
      0,
      0,
      0,
      0,
      1,
    ]);
  };

  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  const cross3 = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];

  const normalize3 = (vector) => {
    const length = Math.hypot(vector[0], vector[1], vector[2]) || 1;
    return [vector[0] / length, vector[1] / length, vector[2] / length];
  };

  const lookAt = (eye, target, up) => {
    const zAxis = normalize3([
      eye[0] - target[0],
      eye[1] - target[1],
      eye[2] - target[2],
    ]);
    const xAxis = normalize3(cross3(up, zAxis));
    const yAxis = cross3(zAxis, xAxis);

    return new Float32Array([
      xAxis[0],
      yAxis[0],
      zAxis[0],
      0,
      xAxis[1],
      yAxis[1],
      zAxis[1],
      0,
      xAxis[2],
      yAxis[2],
      zAxis[2],
      0,
      -dot3(xAxis, eye),
      -dot3(yAxis, eye),
      -dot3(zAxis, eye),
      1,
    ]);
  };

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.max(rect.width, 1);
    const cssHeight = Math.max(rect.height || cssWidth / cardAspect, 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(cssWidth * dpr);
    const height = Math.round(cssHeight * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    gl.viewport(0, 0, width, height);
    return width / height;
  };

  const startDrag = (event) => {
    state.dragging = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    stage.classList.add("is-dragging");
    stage.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    if (!state.dragging || event.pointerId !== state.pointerId) {
      return;
    }

    const deltaX = event.clientX - state.lastX;
    const deltaY = event.clientY - state.lastY;
    state.rotateY += deltaX * 0.28;
    state.cameraPitch = Math.max(-26, Math.min(18, state.cameraPitch + deltaY * 0.16));
    state.autoRotation = state.rotateY;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
  };

  const endDrag = (event) => {
    if (event.pointerId !== state.pointerId) {
      return;
    }

    state.dragging = false;
    state.pointerId = null;
    stage.classList.remove("is-dragging");
    stage.releasePointerCapture?.(event.pointerId);
  };

  const boot = async () => {
    const program = createProgram();
    const mesh = buildCardMesh();
    const [frontImage, backImage] = await Promise.all([
      loadImage("imagenes/member-card-front.png"),
      loadImage("imagenes/member-card-back.png"),
    ]);

    const textures = {
      front: createTexture(frontImage),
      back: createTexture(backImage),
    };

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);

    const stride = 8 * Float32Array.BYTES_PER_ELEMENT;
    const attributes = {
      position: gl.getAttribLocation(program, "a_position"),
      normal: gl.getAttribLocation(program, "a_normal"),
      uv: gl.getAttribLocation(program, "a_uv"),
    };
    const uniforms = {
      matrix: gl.getUniformLocation(program, "u_matrix"),
      model: gl.getUniformLocation(program, "u_model"),
      texture: gl.getUniformLocation(program, "u_texture"),
      useTexture: gl.getUniformLocation(program, "u_useTexture"),
      color: gl.getUniformLocation(program, "u_color"),
    };

    const render = () => {
      const aspect = resizeCanvas();
      const projection = perspective((36 * Math.PI) / 180, aspect, 0.1, 100);
      const model = rotateY(state.rotateY);
      const cameraDistance = 6.35;
      const cameraPitchRadians = (state.cameraPitch * Math.PI) / 180;
      const view = lookAt(
        [
          0,
          Math.sin(cameraPitchRadians) * cameraDistance,
          Math.cos(cameraPitchRadians) * cameraDistance,
        ],
        [0, 0, 0],
        [0, 1, 0],
      );
      const viewModel = multiply(view, model);
      const matrix = multiply(projection, viewModel);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      gl.enableVertexAttribArray(attributes.position);
      gl.vertexAttribPointer(attributes.position, 3, gl.FLOAT, false, stride, 0);
      gl.enableVertexAttribArray(attributes.normal);
      gl.vertexAttribPointer(attributes.normal, 3, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(attributes.uv);
      gl.vertexAttribPointer(attributes.uv, 2, gl.FLOAT, false, stride, 6 * Float32Array.BYTES_PER_ELEMENT);

      gl.uniformMatrix4fv(uniforms.matrix, false, matrix);
      gl.uniformMatrix4fv(uniforms.model, false, model);
      gl.uniform1i(uniforms.texture, 0);

      const drawOrder = [
        ...mesh.ranges.filter((range) => range.name === "side"),
        ...mesh.ranges.filter((range) => range.name !== "side"),
      ];

      drawOrder.forEach((range) => {
        gl.uniform1i(uniforms.useTexture, range.useTexture ? 1 : 0);
        gl.uniform4fv(uniforms.color, range.color);

        if (range.textureName) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, textures[range.textureName]);
        }

        gl.drawArrays(gl.TRIANGLES, range.start, range.count);
      });
    };

    stage.addEventListener("pointerdown", startDrag);
    stage.addEventListener("pointermove", moveDrag);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("lostpointercapture", endDrag);

    stage.classList.add("is-webgl-ready");

    if (reduceMotion) {
      render();
      return;
    }

    let lastTime = performance.now();
    const tick = (time) => {
      const delta = Math.min(time - lastTime, 48);
      lastTime = time;

      if (!state.dragging) {
        state.autoRotation += delta * 0.004;
        state.rotateY += (state.autoRotation - state.rotateY) * 0.025;
      }

      render();
      window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  };

  boot().catch(() => {
    stage.classList.remove("is-webgl-ready");
    stage.classList.add("is-webgl-unavailable");
  });
})();
