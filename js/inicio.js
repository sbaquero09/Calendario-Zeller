/* =====================================================================
   archivo: js/inicio.js

   ARRANQUE DE LA PÁGINA
   Se ejecuta de último: conecta los botones con sus funciones
   y muestra los ejemplos iniciales.
   ===================================================================== */

function iniciar() {
  llenarMeses($("mes"));
  llenarMeses($("parto-mes"));

  // Calculadora: ejemplo inicial 20 de julio de 1810.
  $("mes").value = 7;
  $("form-fecha").addEventListener("submit", (e) => {
    e.preventDefault();               // evita que la página se recargue
    const f = leerFormulario();
    ponerEnFormulario(f.dia, f.mes, f.anio);
  });
  $("btn-hoy").addEventListener("click", () => {
    const hoy = new Date();
    ponerEnFormulario(hoy.getDate(), hoy.getMonth() + 1, hoy.getFullYear());
  });

  // Calendario
  $("cal-ant").addEventListener("click", () => moverMes(-1));
  $("cal-sig").addEventListener("click", () => moverMes(1));

  // Parto: por defecto, la fecha de hoy.
  const hoy = new Date();
  $("parto-dia").value = hoy.getDate();
  $("parto-mes").value = hoy.getMonth() + 1;
  $("parto-anio").value = hoy.getFullYear();
  $("form-parto").addEventListener("submit", (e) => { e.preventDefault(); calcularParto(); });

  dibujarEspecies();
  dibujarEventos();
  ponerEnFormulario(20, 7, 1810);
  calcularParto();
}

iniciar();
