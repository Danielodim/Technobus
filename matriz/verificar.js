// Comprobaciones automáticas de la matriz. Ejecutar con:  node matriz/verificar.js
var DATOS = require('./datos.js');
var calc = require('./calculo.js');

var fallos = 0;
function comprobar(condicion, mensaje) {
  if (!condicion) {
    fallos++;
    console.log('FALLO: ' + mensaje);
  }
}
function cerca(a, b) {
  return Math.abs(a - b) < 0.01;
}

// Resultados esperados (calculados a mano con la fórmula valor x peso / 3).
var esperado = {
  e1: { odoo: 85.0, holded: 81.67, bc: 45.0 },
  e2: { odoo: 88.33, holded: 68.33, bc: 75.0 }
};
var esperadoTCO = {
  e1: { odoo: 15970, holded: 8940, bc: 51290 },
  e2: { odoo: 120950, holded: 58740, bc: 145528 }
};

DATOS.empresas.forEach(function (emp) {
  var pesos = {};
  DATOS.criterios.forEach(function (c) { pesos[c.id] = c.peso; });

  comprobar(calc.sumaPesos(DATOS.criterios, pesos) === 100, emp.id + ': los pesos no suman 100');

  var totalesTCO = {};
  DATOS.erps.forEach(function (erp) {
    // Todas las puntuaciones válidas y justificadas con fuentes que existen.
    DATOS.criterios.forEach(function (c) {
      var v = emp.puntuaciones[c.id][erp.id];
      comprobar([0, 1, 2, 3].indexOf(v) >= 0, emp.id + ' ' + c.id + ' ' + erp.id + ': valor fuera de la escala');
      var nota = emp.notas[c.id][erp.id];
      comprobar(nota && nota.t.length > 20, emp.id + ' ' + c.id + ' ' + erp.id + ': falta la justificación');
      nota.f.forEach(function (idFuente) {
        comprobar(!!DATOS.fuentes[idFuente], emp.id + ' ' + c.id + ' ' + erp.id + ': fuente inexistente ' + idFuente);
      });
    });

    var total = calc.totalErp(DATOS.criterios, pesos, emp.puntuaciones, erp.id);
    comprobar(cerca(total, esperado[emp.id][erp.id]), emp.id + ' ' + erp.id + ': total ' + total.toFixed(2) + ' distinto de ' + esperado[emp.id][erp.id]);

    totalesTCO[erp.id] = calc.tcoErp(emp.tco.erps[erp.id], emp);
    comprobar(cerca(totalesTCO[erp.id], esperadoTCO[emp.id][erp.id]), emp.id + ' ' + erp.id + ': TCO ' + totalesTCO[erp.id] + ' distinto de ' + esperadoTCO[emp.id][erp.id]);
  });

  // La nota de TCO de la matriz debe coincidir con la regla aplicada a los importes.
  DATOS.erps.forEach(function (erp) {
    var s = calc.sugerirTCO(totalesTCO, erp.id, DATOS.reglaTCO);
    comprobar(s.nota === emp.puntuaciones.tco[erp.id], emp.id + ' ' + erp.id + ': la nota de TCO (' + emp.puntuaciones.tco[erp.id] + ') no sigue la regla (' + s.nota + ')');
  });

  var r = calc.ranking(DATOS.erps, DATOS.criterios, pesos, emp.puntuaciones);
  console.log(emp.nombre);
  r.forEach(function (x) {
    console.log('  ' + x.nombre + ': ' + x.total.toFixed(2) + ' / 100   (TCO 5 años: ' + Math.round(totalesTCO[x.id]).toLocaleString('es-ES') + ' €)');
  });
});

// Ejemplo del enunciado: un 3 en cobertura con peso 30 da 30 puntos.
comprobar(calc.puntuacionPonderada(3, 30) === 30, 'el ejemplo del enunciado no da 30');

console.log(fallos === 0 ? '\nTodo correcto.' : '\n' + fallos + ' fallos.');
process.exit(fallos === 0 ? 0 : 1);
