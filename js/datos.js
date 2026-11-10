/* =====================================================================
   archivo: js/datos.js

   DATOS FIJOS DEL PROYECTO. Aquí no hay cálculos, solo listas.
     - NOMBRES_DIAS y NOMBRES_MESES: los nombres en español.
     - ESPECIES: días de gestación de cada animal (MSD Veterinary Manual).
     - EVENTOS: las fechas históricas de Colombia.
   Si quieren agregar un animal o una fecha, solo añadan una línea aquí.
   ===================================================================== */

// Nombres de los días en el orden que da la fórmula de Zeller:
// h = 0 es sábado, h = 1 es domingo, ..., h = 6 es viernes.
const NOMBRES_DIAS = ["sábado", "domingo", "lunes", "martes", "miércoles", "jueves", "viernes"];

const NOMBRES_MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                       "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];


// Periodos de gestación aproximados (MSD Veterinary Manual).
const ESPECIES = [
  { id: "holstein", nombre: "Vaca Holstein", dias: 279, nota: "Ganado de leche. Otras razas: Jersey 279, Angus 281, Simmental 289 días." },
  { id: "cebu",     nombre: "Vaca cebú (Brahman)", dias: 292, nota: "El cebú, muy común en Colombia, tiene una de las gestaciones más largas entre los bovinos." },
  { id: "yegua",    nombre: "Yegua", dias: 340, nota: "Rango habitual: 335 a 342 días (unos 11 meses)." },
  { id: "burra",    nombre: "Burra", dias: 365, nota: "Cerca de un año completo." },
  { id: "oveja",    nombre: "Oveja", dias: 150, nota: "Unos 5 meses." },
  { id: "cabra",    nombre: "Cabra", dias: 150, nota: "Unos 5 meses." },
  { id: "cerda",    nombre: "Cerda", dias: 114, nota: "La regla del porcicultor: 3 meses, 3 semanas y 3 días." },
  { id: "perra",    nombre: "Perra", dias: 63,  nota: "62 a 64 días desde la ovulación; 58 a 72 días si se cuenta desde la monta." },
  { id: "gata",     nombre: "Gata", dias: 65,  nota: "Unos 2 meses." },
  { id: "coneja",   nombre: "Coneja", dias: 31,  nota: "Aproximadamente un mes." },
  { id: "alpaca",   nombre: "Alpaca o llama", dias: 350, nota: "Rango habitual: 335 a 365 días." }
];

const EVENTOS = [
  { d: 12, m: 10, a: 1492, que: "Llegada de Cristóbal Colón a América" },
  { d: 25, m: 7,  a: 1536, que: "Fundación de Santiago de Cali (fecha oficial)" },
  { d: 4,  m: 10, a: 1582, que: "Último día del calendario juliano" },
  { d: 15, m: 10, a: 1582, que: "Primer día del calendario gregoriano" },
  { d: 20, m: 7,  a: 1810, que: "Grito de Independencia en Santa Fe de Bogotá" },
  { d: 7,  m: 8,  a: 1819, que: "Batalla de Boyacá" },
  { d: 9,  m: 4,  a: 1948, que: "El Bogotazo" },
  { d: 4,  m: 7,  a: 1991, que: "Proclamación de la Constitución Política de Colombia" },
  { d: 1,  m: 1,  a: 2000, que: "Inicio del año 2000" }
];

