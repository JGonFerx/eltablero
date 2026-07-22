(function () {
  const forms = document.querySelectorAll("[data-static-form]");

  forms.forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    const fields = form.querySelectorAll("[data-required]");

    function clearErrors() {
      form.querySelectorAll(".field-error").forEach((error) => {
        error.textContent = "";
      });
    }

    function setError(field, message) {
      const error = form.querySelector('[data-error-for="' + field.name + '"]');
      if (error) {
        error.textContent = message;
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      let hasErrors = false;

      fields.forEach((field) => {
        const value = field.value.trim();

        if (!value) {
          hasErrors = true;
          setError(field, "Este campo es obligatorio.");
          return;
        }

        if (field.type === "email") {
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          if (!isValid) {
            hasErrors = true;
            setError(field, "Introduce un correo válido.");
          }
        }
      });

      if (status) {
        status.textContent = hasErrors
          ? "Revisa los campos marcados antes de continuar."
          : "Formulario validado, pero aún no está operativo. No se han enviado datos.";
      }
    });
  });
})();
