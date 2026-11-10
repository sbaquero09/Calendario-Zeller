/* =====================================================================
   archivo: js/graficas.js

   GRÁFICAS (barras hechas con HTML y CSS, sin librerías)
     1. dibujarGraficaEspecies() · días de gestación de cada especie
        (la especie elegida en la herramienta 3 se resalta).
     2. dibujarGraficaFecha()    · cuántas veces cayó la fecha buscada en
        cada día de la semana (año por año, con zeller()).
   ===================================================================== */

/** Dibuja una lista de barras horizontales. filas = [{ etiqueta, valor, activa, texto }] */
function barrasHTML(filas, maximo) {
  return filas.map(f => `
    <div class="bar-row${f.activa ? " on" : ""}">
      <span class="bar-label">${f.etiqueta}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${(f.valor / maximo * 100).toFixed(1)}%"></span></span>
      <span class="bar-val">${f.texto}</span>
    </div>`).join("");
}

/* ---------- 1. Gestación por especie ---------- */
function dibujarGraficaEspecies() {
  const cont = $("graf-especies");
  if (!cont) return;
  const ordenadas = [...ESPECIES].sort((a, b) => b.dias - a.dias);
  const maximo = ordenadas[0].dias;
  cont.innerHTML = barrasHTML(ordenadas.map(e => ({
    etiqueta: e.nombre,
    valor: e.dias,
    activa: e === especieActual,
    texto: `${e.dias} días`
  })), maximo);
}

/* ---------- 2. ¿Cuántas veces cayó esa fecha en cada día? ---------- */
function dibujarGraficaFecha(dia, mes, anio, error) {
  const card = $("graf-fecha-card");
  if (error) { card.hidden = true; return; }
  card.hidden = false;

  // Hasta este año si la fecha es pasada; si es futura, 100 años desde ella.
  const actual = new Date().getFullYear();
  const ultimo = Math.min(anio <= actual ? actual : anio + 99, 9999);
  const conteo = [0, 0, 0, 0, 0, 0, 0];     // índice = h de Zeller
  let total = 0;
  for (let a = anio; a <= ultimo; a++) {
    if (validarFecha(dia, mes, a)) continue; // ej. 29 de febrero en año no bisiesto
    conteo[zeller(dia, mes, a).h]++;
    total++;
  }

  const orden = [2, 3, 4, 5, 6, 0, 1];       // lunes primero
  const maximo = Math.max(...conteo);
  const fecha = `${dia} de ${NOMBRES_MESES[mes - 1]}`;
  $("graf-fecha-titulo").textContent = `Cada ${fecha}, de ${anio} a ${ultimo}`;
  $("graf-fecha").innerHTML = barrasHTML(orden.map(h => ({
    etiqueta: capitalizar(NOMBRES_DIAS[h]),
    valor: conteo[h],
    activa: conteo[h] === maximo,
    texto: conteo[h]
  })), maximo);

  const mejores = orden.filter(h => conteo[h] === maximo).map(h => NOMBRES_DIAS[h]);
  $("graf-fecha-nota").textContent =
    `El ${fecha} ocurrió ${total} veces en ese periodo. Cayó más veces en ${mejores.join(" y ")} (${maximo}). ` +
    `Los días avanzan uno por año (dos si hay bisiesto), por eso se van rotando.`;
}
