// Funciones puras de cálculo de la matriz de decisión. No tocan el DOM, así se pueden probar con Node.

var MESES_TCO = 60;
var ANIOS_TCO = 5;

// Fórmula del enunciado: (valoración x peso) / 3
function puntuacionPonderada(valor, peso) {
  return (valor * peso) / 3;
}

function sumaPesos(criterios, pesos) {
  var total = 0;
  for (var i = 0; i < criterios.length; i++) {
    total += Number(pesos[criterios[i].id]) || 0;
  }
  return total;
}

// Total sobre 100 de un ERP con las puntuaciones y los pesos indicados.
function totalErp(criterios, pesos, puntuaciones, erpId) {
  var total = 0;
  for (var i = 0; i < criterios.length; i++) {
    var c = criterios[i];
    var valor = puntuaciones[c.id][erpId];
    total += puntuacionPonderada(valor, Number(pesos[c.id]) || 0);
  }
  return total;
}

// Devuelve los ERP ordenados de mayor a menor puntuación total.
function ranking(erps, criterios, pesos, puntuaciones) {
  var lista = [];
  for (var i = 0; i < erps.length; i++) {
    lista.push({ id: erps[i].id, nombre: erps[i].nombre, total: totalErp(criterios, pesos, puntuaciones, erps[i].id) });
  }
  lista.sort(function (a, b) { return b.total - a.total; });
  return lista;
}

// Número de unidades de una línea de TCO según la empresa.
function unidadesLinea(linea, empresa) {
  if (linea.un === 'usuarios') return empresa.usuarios;
  if (linea.un === 'usuariosLimitados') return empresa.usuariosLimitados;
  if (linea.un === 'usuariosCompletos') return empresa.usuarios - empresa.usuariosLimitados;
  return Number(linea.un) || 0;
}

// Coste de una línea a 5 años.
function costeLinea(linea, empresa) {
  var multiplicador = 1;
  if (linea.per === 'mes') multiplicador = MESES_TCO;
  if (linea.per === 'anio') multiplicador = ANIOS_TCO;
  return (Number(linea.imp) || 0) * unidadesLinea(linea, empresa) * multiplicador;
}

function tcoErp(lineas, empresa) {
  var total = 0;
  for (var i = 0; i < lineas.length; i++) {
    total += costeLinea(lineas[i], empresa);
  }
  return total;
}

// Puntuación de TCO sugerida: 3 si cuesta hasta 1,5 veces el más barato, 2 hasta 3 veces, 1 si más.
function sugerirTCO(totales, erpId, regla) {
  var minimo = Infinity;
  for (var id in totales) {
    if (totales[id] < minimo) minimo = totales[id];
  }
  var razon = minimo > 0 ? totales[erpId] / minimo : 1;
  var nota = 1;
  if (razon <= regla.maxParaTres) nota = 3;
  else if (razon <= regla.maxParaDos) nota = 2;
  return { razon: razon, nota: nota };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    puntuacionPonderada: puntuacionPonderada,
    sumaPesos: sumaPesos,
    totalErp: totalErp,
    ranking: ranking,
    unidadesLinea: unidadesLinea,
    costeLinea: costeLinea,
    tcoErp: tcoErp,
    sugerirTCO: sugerirTCO
  };
}
