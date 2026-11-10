/* =====================================================================
   archivo: js/herramienta3-parto.js

   HERRAMIENTA 3 · FECHA DE PARTO (aplicación a la veterinaria)
   Suma los días de gestación con sumarDias() y usa zeller()
   para saber en qué día de la semana caerá el parto.
   Los días de cada especie están en datos.js.
   ===================================================================== */

let especieActual = ESPECIES[0];

function dibujarEspecies() {
  const cont = $("especies");
  cont.innerHTML = "";
  ESPECIES.forEach(e => {
    const b = document.createElement("button");
    b.type = "button";
    b.id = "especie-" + e.id;
    b.setAttribute("aria-pressed", e === especieActual ? "true" : "false");
    b.innerHTML = `<b>${e.nombre}</b><span>${e.dias} días</span>`;
    b.addEventListener("click", () => { especieActual = e; dibujarEspecies(); calcularParto(); });
    cont.appendChild(b);
  });
  dibujarGraficaEspecies();   // resalta la especie elegida en la gráfica
}

function calcularParto() {
  const dia = parseInt($("parto-dia").value, 10);
  const mes = parseInt($("parto-mes").value, 10);
  const anio = parseInt($("parto-anio").value, 10);

  let error = validarFecha(dia, mes, anio);
  if (!error && anio < 1600) error = "Para esta herramienta usen fechas desde el año 1600.";
  $("parto-error").hidden = !error;
  if (error) {
    $("parto-error").textContent = error;
    $("parto-texto").textContent = ""; $("parto-dia-semana").textContent = "—";
    $("parto-nota").textContent = ""; $("parto-pasos").innerHTML = "";
    return;
  }

  const fin = sumarDias(dia, mes, anio, especieActual.dias);
  const z = zeller(fin.dia, fin.mes, fin.anio);
  const inicio = zeller(dia, mes, anio);

  $("parto-texto").innerHTML =
    `${especieActual.nombre}: monta el ${inicio.nombreDia} ${textoFecha(dia, mes, anio)} + ${especieActual.dias} días →<br>parto probable el <b>${textoFecha(fin.dia, fin.mes, fin.anio)}</b>, un`;
  $("parto-dia-semana").textContent = z.nombreDia;
  $("parto-nota").textContent = especieActual.nota;

  // Atajo con aritmética modular: el día de la semana avanza (días mod 7).
  const avance = especieActual.dias % 7;
  const filas = fin.pasos.map(p => {
    const nombre = `${capitalizar(NOMBRES_MESES[p.mes - 1])} ${p.anio}`;
    return `<tr><td>${nombre}</td><td>− ${p.usados}</td><td>${p.quedan}</td></tr>`;
  }).join("");
  $("parto-pasos").innerHTML =
    `<tr><td><b>Mes</b></td><td><b>Días usados</b></td><td><b>Quedan</b></td></tr>
     <tr><td>Inicio</td><td></td><td>${especieActual.dias}</td></tr>${filas}
     <tr><td colspan="3" class="check">
       Comprobación con módulo 7: ${especieActual.dias} mod 7 = ${avance}. Desde el ${inicio.nombreDia}, avanzar ${avance}
       día${avance === 1 ? "" : "s"} de la semana da <b class="mark">${NOMBRES_DIAS[(inicio.h + avance) % 7]}</b>.
       ${NOMBRES_DIAS[(inicio.h + avance) % 7] === z.nombreDia ? "✓ Coincide con Zeller." : ""}
     </td></tr>`;
}
