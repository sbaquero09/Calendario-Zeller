/* =====================================================================
   archivo: js/herramienta2-calendario.js

   HERRAMIENTA 2 · CALENDARIO PERPETUO
   Dibuja un mes completo. Solo hace UN cálculo de Zeller (el día 1)
   y luego acomoda los demás días uno tras otro.
   ===================================================================== */

let calMes = 7, calAnio = 1810, calDiaSel = 20;

function dibujarCalendario(mes, anio, diaSeleccionado) {
  calMes = mes; calAnio = anio; calDiaSel = diaSeleccionado;
  const grilla = $("cal-grilla");
  grilla.innerHTML = "";
  $("cal-titulo").textContent = `${NOMBRES_MESES[mes - 1]} ${anio}`;

  // Encabezado: la semana empieza el lunes, como en los calendarios de Colombia.
  ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"].forEach(n => {
    const d = document.createElement("div");
    d.className = "dow"; d.textContent = n;
    grilla.appendChild(d);
  });

  // UN solo cálculo de Zeller: ¿qué día de la semana es el día 1?
  const primero = zeller(1, mes, anio);
  // Convertimos h (0 = sábado) a columna (0 = lunes): lunes h=2 → 0, ..., domingo h=1 → 6.
  const columna = (primero.h + 5) % 7;
  for (let i = 0; i < columna; i++) {
    const b = document.createElement("div"); b.className = "blank"; grilla.appendChild(b);
  }

  // Lista de días del mes (en octubre de 1582 faltan del 5 al 14).
  const cal = calendarioDeLaFecha(28, mes, anio);
  const total = diasDelMes(mes, anio, cal);
  let posicion = columna;
  for (let d = 1; d <= total; d++) {
    if (anio === 1582 && mes === 10 && d >= 5 && d <= 14) continue;
    const celda = document.createElement("button");
    celda.type = "button";
    celda.className = "day" + (d === diaSeleccionado ? " sel" : "") + (posicion % 7 === 6 ? " sun" : "");
    celda.textContent = d;
    celda.setAttribute("aria-label", textoFecha(d, mes, anio));
    celda.addEventListener("click", () => {
      $("dia").value = d; $("mes").value = mes; $("anio").value = anio;
      mostrarCalculo(d, mes, anio);
      dibujarCalendario(mes, anio, d);
      $("calculadora").scrollIntoView({ behavior: "smooth" });
    });
    grilla.appendChild(celda);
    posicion++;
  }

  $("cal-nota").innerHTML = (anio === 1582 && mes === 10)
    ? "Octubre de 1582: los días 5 al 14 no existieron. Del jueves 4 se pasó al viernes 15."
    : `El día 1 cae en <b>${primero.nombreDia}</b> (h = ${primero.h}), por eso empieza en esa columna. Es un año ${esBisiesto(anio, calendarioDeLaFecha(1, 1, anio)) ? "bisiesto" : "no bisiesto"} del calendario ${calendarioDeLaFecha(15, mes, anio)}.`;

  if (anio >= 1583 && anio < 9999) {
    const igual = siguienteAnioIgual(anio);
    $("cal-repite").innerHTML = igual
      ? `El calendario completo de ${anio} se repite idéntico en <b>${igual}</b> (mismo día para el 1 de enero y ${esBisiesto(anio, "gregoriano") ? "ambos bisiestos" : "ninguno bisiesto"}).`
      : "";
  } else {
    $("cal-repite").textContent = "";
  }
}

function moverMes(paso) {
  let m = calMes + paso, a = calAnio;
  if (m < 1) { m = 12; a--; }
  if (m > 12) { m = 1; a++; }
  if (a < 1 || a > 9999) return;
  dibujarCalendario(m, a, null);
}
