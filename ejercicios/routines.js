/**
 * Codifica y decodifica rutinas dentro de la propia URL — sin backend.
 * Formato compacto: #r?i=id:series:reps:rest:day:note,id2&w=lunes,miercoles&t=<base64url>&n=<base64url>
 * series, reps, rest, note, t y n se codifican como base64url UTF-8 sin padding.
 * Formato legacy: #rutina?t=<titulo>&n=<nota>&e=id1,id2,id3
 * Formato legacy con parametros: añade p=<payload> con series, repeticiones y descanso por ejercicio.
 * Compartido entre index.html (vista de rutina) y crear-rutina.html (constructor).
 */
(function (global) {
  "use strict";

  const ROUTINE_ENCODING_SPEC = {
    hashPrefix: "#r?",
    itemsParam: "i",
    daysParam: "w",
    titleParam: "t",
    notesParam: "n",
    itemSeparator: ",",
    fieldSeparator: ":",
    itemFormat: "id:series:reps:rest:day:note",
    uriComponentFields: ["id", "day"],
    base64urlUtf8Fields: ["series", "reps", "rest", "note", "t", "n"],
    trailingEmptyFields: "Routines.encode elimina campos vacíos finales de cada item.",
  };

  function toBase64Url(value) {
    const encoded = btoa(unescape(encodeURIComponent(value)));
    return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function fromBase64Url(value) {
    const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`;
    const decoded = padded.replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(escape(atob(decoded)));
  }

  function normalizeItem(item) {
    if (typeof item === "string") {
      return { id: item, series: "", reps: "", rest: "", day: "", note: "" };
    }

    return {
      id: item.id || item.i || "",
      series: item.series || item.s || "",
      reps: item.reps || item.r || "",
      rest: item.rest || item.d || "",
      day: item.day || item.w || "",
      note: item.note || item.m || item.notes || "",
    };
  }

  function compactValue(value) {
    return toBase64Url(String(value || ""));
  }

  function expandValue(value) {
    if (!value) {
      return "";
    }
    try {
      return fromBase64Url(value);
    } catch (error) {
      return "";
    }
  }

  function packItem(item) {
    const fields = [
      encodeURIComponent(item.id),
      compactValue(item.series),
      compactValue(item.reps),
      compactValue(item.rest),
      encodeURIComponent(item.day || ""),
      compactValue(item.note),
    ];

    while (fields.length > 1 && fields[fields.length - 1] === "") {
      fields.pop();
    }

    return fields.join(":");
  }

  function unpackItem(value) {
    const fields = String(value || "").split(":");
    return normalizeItem({
      id: decodeURIComponent(fields[0] || ""),
      series: expandValue(fields[1]),
      reps: expandValue(fields[2]),
      rest: expandValue(fields[3]),
      day: decodeURIComponent(fields[4] || ""),
      note: expandValue(fields[5]),
    });
  }

  function encodeRoutine(routine) {
    const items = (routine.items || routine.e || []).map(normalizeItem).filter((item) => item.id);

    if (items.length === 0) {
      return "#r?i=";
    }

    const params = [`i=${items.map(packItem).join(",")}`];
    if (routine.t) {
      params.push(`t=${compactValue(routine.t)}`);
    }
    const days = Array.isArray(routine.days) ? routine.days.filter(Boolean) : [];
    if (days.length) {
      params.push(`w=${days.map((day) => encodeURIComponent(day)).join(",")}`);
    }
    if (routine.n) {
      params.push(`n=${compactValue(routine.n)}`);
    }

    return `#r?${params.join("&")}`;
  }

  function decodeCompactRoutine(hash) {
    const match = /^#r\?(.*)$/.exec(hash || "");
    if (!match) {
      return null;
    }

    const params = new URLSearchParams(match[1]);
    const items = (params.get("i") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map(unpackItem)
      .filter((item) => item.id);

    if (items.length === 0) {
      return null;
    }

    const days = (params.get("w") || "")
      .split(",")
      .map((day) => decodeURIComponent(day.trim()))
      .filter(Boolean);

    return {
      t: expandValue(params.get("t")),
      n: expandValue(params.get("n")),
      e: items.map((item) => item.id),
      items,
      days,
    };
  }

  function decodeLegacyRoutine(hash) {
    const match = /^#rutina\?(.*)$/.exec(hash || "");
    if (!match) {
      return null;
    }

    const params = new URLSearchParams(match[1]);
    let items = [];
    const payload = params.get("p");

    if (payload) {
      try {
        const parsed = JSON.parse(fromBase64Url(payload));
        if (Array.isArray(parsed)) {
          items = parsed.map(normalizeItem).filter((item) => item.id);
        }
      } catch (error) {
        items = [];
      }
    }

    const e = (items.length ? items.map((item) => item.id) : params.get("e") || "")
      .toString()
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (e.length === 0) {
      return null;
    }

    return {
      t: params.get("t") || "",
      n: params.get("n") || "",
      e,
      items: items.length ? items : e.map((id) => normalizeItem(id)),
      days: [],
    };
  }

  function decodeRoutine(hash) {
    return decodeCompactRoutine(hash) || decodeLegacyRoutine(hash);
  }

  global.Routines = { encode: encodeRoutine, decode: decodeRoutine, spec: ROUTINE_ENCODING_SPEC };
})(window);
