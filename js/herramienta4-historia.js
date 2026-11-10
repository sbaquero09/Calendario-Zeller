/* =====================================================================
   archivo: js/herramienta4-historia.js

   HERRAMIENTA 4 · FECHAS HISTÓRICAS DE COLOMBIA
   Crea una tarjeta por cada fecha de la lista EVENTOS (datos.js).
   ===================================================================== */

function dibujarEventos() {
  const cont = $("eventos");
  EVENTOS.forEach((ev, i) => {
    const r = zeller(ev.d, ev.m, ev.a);
    const b = document.createElement("button");
    b.type = "button";
    b.id = "evento-" + i;
    b.className = "event";
    b.innerHTML = `
      <span class="when">${textoFecha(ev.d, ev.m, ev.a)}</span>
      <span class="what">${ev.que}</span>
      <span class="ans">${capitalizar(r.nombreDia)}</span>
      <span class="cal-tag">Calendario ${r.calendario}</span>`;
    b.addEventListener("click", () => {
      ponerEnFormulario(ev.d, ev.m, ev.a);
      $("calculadora").scrollIntoView({ behavior: "smooth" });
    });
    cont.appendChild(b);
  });
}
