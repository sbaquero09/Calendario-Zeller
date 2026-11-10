/* =====================================================================
   archivo: js/matematica.js

   LA MATEMÁTICA DEL PROYECTO. Si les preguntan por la fórmula,
   este es EL archivo que hay que abrir.
     - calendarioDeLaFecha()  ¿juliano o gregoriano?
     - esBisiesto()           regla de los años bisiestos
     - diasDelMes()           28, 29, 30 o 31 días
     - validarFecha()         revisa que la fecha exista
     - zeller()               EL ALGORITMO DE ZELLER (paso a paso)
     - diaSegunElComputador() comprobación con el reloj del computador
     - sumarDias()            suma los días de gestación mes por mes
     - siguienteAnioIgual()   ¿en qué año se repite el calendario?
   ===================================================================== */

/**
 * ¿Qué calendario estaba vigente en esa fecha?
 * Antes del 15 de octubre de 1582 se usaba el calendario JULIANO.
 * Desde ese día se usa el GREGORIANO (el actual).
 */
function calendarioDeLaFecha(dia, mes, anio) {
  if (anio < 1582) return "juliano";
  if (anio > 1582) return "gregoriano";
  // El año 1582 es especial: depende del mes y el día.
  if (mes < 10) return "juliano";
  if (mes > 10) return "gregoriano";
  // Octubre de 1582: hasta el 4 juliano, desde el 15 gregoriano.
  return dia <= 4 ? "juliano" : "gregoriano";
}

/**
 * ¿El año es bisiesto (febrero de 29 días)?
 *  - Juliano: cada 4 años, sin excepción.
 *  - Gregoriano: cada 4 años, EXCEPTO los que terminan en 00,
 *    que solo son bisiestos si se pueden dividir entre 400.
 * El operador % da el residuo de una división (es el "mod").
 */
function esBisiesto(anio, calendario) {
  if (calendario === "juliano") {
    return anio % 4 === 0;
  }
  return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

/** Cuántos días tiene un mes (mes de 1 a 12). */
function diasDelMes(mes, anio, calendario) {
  const dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (mes === 2 && esBisiesto(anio, calendario)) return 29;
  return dias[mes - 1];
}

/**
 * Revisa que la fecha exista. Devuelve un texto con el error,
 * o null si la fecha está bien.
 */
function validarFecha(dia, mes, anio) {
  if (!Number.isInteger(anio) || anio < 1 || anio > 9999) return "El año debe estar entre 1 y 9999.";
  if (!Number.isInteger(mes) || mes < 1 || mes > 12) return "El mes debe estar entre 1 y 12.";
  // Del 5 al 14 de octubre de 1582 nunca existieron (se saltaron con el cambio de calendario).
  if (anio === 1582 && mes === 10 && dia >= 5 && dia <= 14) {
    return "Esa fecha no existió: al jueves 4 de octubre de 1582 le siguió el viernes 15 de octubre.";
  }
  const cal = calendarioDeLaFecha(dia, mes, anio);
  const maximo = diasDelMes(mes, anio, cal);
  if (!Number.isInteger(dia) || dia < 1 || dia > maximo) {
    return `${capitalizar(NOMBRES_MESES[mes - 1])} de ${anio} tiene ${maximo} días.`;
  }
  return null;
}

/**
 * ALGORITMO DE ZELLER.
 * Recibe una fecha y devuelve un objeto con TODOS los valores intermedios
 * (así la página puede mostrar cada paso) y el resultado h.
 */
function zeller(dia, mes, anio) {
  const calendario = calendarioDeLaFecha(dia, mes, anio);

  // PASO 1: enero y febrero se cuentan como meses 13 y 14 del año anterior.
  let m = mes;
  let a = anio;
  if (m < 3) {
    m = m + 12;
    a = a - 1;
  }

  // PASO 2: separar el año en siglo (J) y año dentro del siglo (K).
  const q = dia;
  const K = a % 100;             // los dos últimos dígitos
  const J = Math.floor(a / 100); // los primeros dígitos

  // PASO 3: calcular cada término. Math.floor() es la función "piso".
  const terminoMes = Math.floor((13 * (m + 1)) / 5);
  const terminoK4  = Math.floor(K / 4);
  let terminoJ4, terminoSiglo, suma;

  if (calendario === "gregoriano") {
    terminoJ4    = Math.floor(J / 4);
    terminoSiglo = 5 * J;
    suma = q + terminoMes + K + terminoK4 + terminoJ4 + terminoSiglo;
  } else {
    // En el calendario juliano los dos últimos términos son "5 + 6J".
    terminoJ4    = 5;
    terminoSiglo = 6 * J;
    suma = q + terminoMes + K + terminoK4 + terminoJ4 + terminoSiglo;
  }

  // PASO 4: el residuo de dividir entre 7 (mod 7) es el día de la semana.
  const cociente = Math.floor(suma / 7);
  const h = suma % 7;

  return {
    dia, mes, anio, calendario,
    m, a, q, K, J,
    terminoMes, terminoK4, terminoJ4, terminoSiglo,
    suma, cociente, h,
    nombreDia: NOMBRES_DIAS[h]
  };
}

/**
 * COMPROBACIÓN: el computador también sabe qué día fue una fecha
 * (solo para el calendario gregoriano). Si Zeller y el computador
 * coinciden, la fórmula está bien aplicada.
 */
function diaSegunElComputador(dia, mes, anio) {
  const fecha = new Date(Date.UTC(2000, 0, 1));
  fecha.setUTCFullYear(anio, mes - 1, dia);
  // getUTCDay() da 0 = domingo ... 6 = sábado. Lo pasamos al orden de Zeller.
  return (fecha.getUTCDay() + 1) % 7;
}

/**
 * Suma una cantidad de días a una fecha (calendario gregoriano),
 * recorriendo el calendario mes por mes. Devuelve la fecha final
 * y la lista de pasos para mostrarlos en una tabla.
 */
function sumarDias(dia, mes, anio, cantidad) {
  const pasos = [];
  let restantes = cantidad;

  while (true) {
    const tamañoMes = diasDelMes(mes, anio, "gregoriano");
    const faltanParaTerminarMes = tamañoMes - dia;

    if (restantes <= faltanParaTerminarMes) {
      // Los días que quedan caben dentro de este mes.
      pasos.push({ mes, anio, usados: restantes, quedan: 0 });
      dia = dia + restantes;
      break;
    }

    // Terminamos el mes y saltamos al día 1 del mes siguiente (eso gasta 1 día más).
    const usados = faltanParaTerminarMes + 1;
    restantes = restantes - usados;
    pasos.push({ mes, anio, usados, quedan: restantes });
    dia = 1;
    mes = mes + 1;
    if (mes > 12) { mes = 1; anio = anio + 1; }
    if (restantes === 0) break;
  }
  return { dia, mes, anio, pasos };
}

/**
 * ¿En qué año se repite el mismo calendario?
 * Dos años tienen calendarios idénticos si el 1 de enero cae el mismo día
 * de la semana Y los dos son bisiestos o los dos no lo son.
 */
function siguienteAnioIgual(anio) {
  const h = zeller(1, 1, anio).h;
  const bis = esBisiesto(anio, "gregoriano");
  for (let otro = anio + 1; otro <= 9999; otro++) {
    if (zeller(1, 1, otro).h === h && esBisiesto(otro, "gregoriano") === bis) return otro;
  }
  return null;
}
