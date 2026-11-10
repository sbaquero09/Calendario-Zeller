/* =====================================================================
   archivo: js/utilidades.js

   PEQUEÑAS AYUDAS que usan todos los demás archivos.
   No tienen matemática: solo buscan elementos y escriben textos.
   ===================================================================== */

// Atajo para buscar un elemento de la página por su id.
const $ = (id) => document.getElementById(id);

function textoFecha(dia, mes, anio) { return `${dia} de ${NOMBRES_MESES[mes - 1]} de ${anio}`; }

// Llena las listas desplegables de meses.
function llenarMeses(select) {
  NOMBRES_MESES.forEach((nombre, i) => {
    const op = document.createElement("option");
    op.value = i + 1;
    op.textContent = capitalizar(nombre);
    select.appendChild(op);
  });
}

// Pone la primera letra en mayúscula: "lunes" → "Lunes".
function capitalizar(texto) { return texto.charAt(0).toUpperCase() + texto.slice(1); }

