/* =====================================================================
   archivo: js/herramienta1-calculadora.js

   HERRAMIENTA 1 · CALCULADORA PASO A PASO
   Lee la fecha que escriben, llama a zeller() (matematica.js)
   y muestra en pantalla cada paso del cálculo.
   ===================================================================== */

function mostrarCalculo(dia, mes, anio) {
  const error = validarFecha(dia, mes, anio);
  $("res-error").hidden = !error;
  dibujarGraficaFecha(dia, mes, anio, error);
  if (error) {
    $("res-error").textContent = error;
    $("res-fecha").textContent = "";
    $("res-dia").textContent = "—";
    $("res-calendario").hidden = true;
    $("res-verificacion").textContent = "";
    $("pasos").innerHTML = "";
    return;
  }

  const r = zeller(dia, mes, anio);
  $("res-fecha").textContent = `El ${textoFecha(dia, mes, anio)} fue (o será) un`;
  $("res-dia").textContent = r.nombreDia;
  $("res-calendario").hidden = false;
  $("res-calendario").textContent = `Calendario ${r.calendario}`;

  if (r.calendario === "gregoriano") {
    const pc = diaSegunElComputador(dia, mes, anio);
    $("res-verificacion").textContent = pc === r.h
      ? "✓ Comprobado: el calendario del computador da el mismo resultado."
      : "✗ El computador da otro resultado. Revisen el cálculo.";
  } else {
    $("res-verificacion").textContent = "Fecha juliana: el computador solo conoce el calendario gregoriano, así que aquí no se compara.";
  }

  // Construimos los pasos explicados.
  const cambioMes = mes < 3
    ? `${capitalizar(NOMBRES_MESES[mes - 1])} es el mes ${mes}, pero en Zeller cuenta como el mes <b>${r.m}</b> del año anterior. Usamos el año <b>${r.a}</b>.`
    : `${capitalizar(NOMBRES_MESES[mes - 1])} es el mes <b>${r.m}</b>. No hay que cambiar nada. Usamos el año <b>${r.a}</b>.`;

  const esGreg = r.calendario === "gregoriano";
  const nombreT5 = esGreg ? "⌊J/4⌋" : "5 (constante juliana)";
  const nombreT6 = esGreg ? "5 × J" : "6 × J";
  const calc5 = esGreg ? `⌊${r.J}/4⌋` : "5";
  const calc6 = esGreg ? `5 × ${r.J}` : `6 × ${r.J}`;

  $("pasos").innerHTML = `
    <li><div class="step-body"><span class="step-title">Ajustar el mes</span><span>${cambioMes}</span></div></li>
    <li><div class="step-body"><span class="step-title">Separar el año</span>
      <div class="formula">q = ${r.q}   (el día)
K = ${r.a} mod 100 = ${r.K}
J = ⌊${r.a} / 100⌋ = ${r.J}</div></div></li>
    <li><div class="step-body"><span class="step-title">Calcular cada término</span>
      <div class="table-scroll"><table class="terms">
        <tr><td>q</td><td>${r.q}</td><td>${r.q}</td></tr>
        <tr><td>⌊13(m+1)/5⌋</td><td>⌊13 × ${r.m + 1} / 5⌋ = ⌊${13 * (r.m + 1)}/5⌋</td><td>${r.terminoMes}</td></tr>
        <tr><td>K</td><td>${r.K}</td><td>${r.K}</td></tr>
        <tr><td>⌊K/4⌋</td><td>⌊${r.K}/4⌋</td><td>${r.terminoK4}</td></tr>
        <tr><td>${nombreT5}</td><td>${calc5}</td><td>${r.terminoJ4}</td></tr>
        <tr><td>${nombreT6}</td><td>${calc6}</td><td>${r.terminoSiglo}</td></tr>
        <tr><td><b>Suma</b></td><td></td><td>${r.suma}</td></tr>
      </table></div></div></li>
    <li><div class="step-body"><span class="step-title">Sacar el residuo entre 7</span>
      <div class="formula">${r.suma} = 7 × ${r.cociente} + <span class="hl">${r.h}</span>
h = ${r.suma} mod 7 = <span class="hl">${r.h}</span></div></div></li>
    <li><div class="step-body"><span class="step-title">Buscar h en la tabla</span>
      <div class="htable">${NOMBRES_DIAS.map((n, i) =>
        `<div class="${i === r.h ? "on" : ""}"><b>${i}</b>${n.slice(0, 3)}</div>`).join("")}</div>
      <span>h = ${r.h} → <b class="mark">${r.nombreDia}</b>.</span></div></li>`;
}

function leerFormulario() {
  return {
    dia: parseInt($("dia").value, 10),
    mes: parseInt($("mes").value, 10),
    anio: parseInt($("anio").value, 10)
  };
}

function ponerEnFormulario(dia, mes, anio) {
  $("dia").value = dia; $("mes").value = mes; $("anio").value = anio;
  mostrarCalculo(dia, mes, anio);
  if (!validarFecha(dia, mes, anio)) dibujarCalendario(mes, anio, dia);
}
