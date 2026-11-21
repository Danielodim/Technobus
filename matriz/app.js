// Interfaz de la matriz. Usa DATOS (datos.js) y las funciones de calculo.js.

(function () {
  var estado = { activa: 0, empresas: [] };

  function copiar(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function estadoInicial(emp) {
    var pesos = {};
    DATOS.criterios.forEach(function (c) { pesos[c.id] = c.peso; });
    return {
      datos: emp,
      pesos: pesos,
      puntuaciones: copiar(emp.puntuaciones),
      usuarios: emp.usuarios,
      usuariosLimitados: emp.usuariosLimitados,
      tco: copiar(emp.tco.erps)
    };
  }

  function el(etiqueta, atributos, hijos) {
    var nodo = document.createElement(etiqueta);
    atributos = atributos || {};
    Object.keys(atributos).forEach(function (k) {
      if (k === 'texto') nodo.textContent = atributos[k];
      else if (k === 'clase') nodo.className = atributos[k];
      else nodo.setAttribute(k, atributos[k]);
    });
    (hijos || []).forEach(function (h) {
      if (typeof h === 'string') nodo.appendChild(document.createTextNode(h));
      else if (h) nodo.appendChild(h);
    });
    return nodo;
  }

  function euros(n) {
    return Math.round(n).toLocaleString('es-ES', { useGrouping: 'always' }) + ' €';
  }
  function dec(n) {
    return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function empresaActual() {
    return estado.empresas[estado.activa];
  }

  // Objeto con los datos de empresa que necesita calculo.js (usuarios actuales).
  function infoUsuarios(e) {
    return { usuarios: e.usuarios, usuariosLimitados: e.usuariosLimitados };
  }

  function totalesTCO(e) {
    var t = {};
    DATOS.erps.forEach(function (erp) {
      t[erp.id] = tcoErp(e.tco[erp.id], infoUsuarios(e));
    });
    return t;
  }

  // Pestañas

  function pintarPestanas() {
    var nav = document.getElementById('pestanas');
    nav.innerHTML = '';
    estado.empresas.forEach(function (e, i) {
      var b = el('button', { type: 'button', texto: e.datos.nombre, clase: i === estado.activa ? 'activa' : '' });
      b.addEventListener('click', function () {
        estado.activa = i;
        pintarPestanas();
        pintarEmpresa();
      });
      nav.appendChild(b);
    });
  }

  // Contenido de una empresa

  function pintarEmpresa() {
    var e = empresaActual();
    var cont = document.getElementById('contenido');
    cont.innerHTML = '';

    var intro = el('section', { clase: 'bloque' }, [
      el('h2', { texto: e.datos.nombre }),
      el('p', { texto: e.datos.resumen })
    ]);
    intro.appendChild(pintarLeyenda());
    cont.appendChild(intro);

    cont.appendChild(pintarMatriz(e));
    cont.appendChild(pintarResultado());
    cont.appendChild(pintarTCO(e));
    cont.appendChild(pintarJustificaciones(e));

    refrescar();
  }

  function pintarLeyenda() {
    var cuadro = el('div', { clase: 'leyenda' });
    DATOS.escala.forEach(function (n) {
      cuadro.appendChild(el('div', {}, [el('strong', { texto: n.valor + ' ' + n.nombre }), el('br'), n.texto]));
    });
    return cuadro;
  }

  function pintarMatriz(e) {
    var bloque = el('section', { clase: 'bloque' });
    bloque.appendChild(el('h2', { texto: 'Matriz de decisión' }));
    bloque.appendChild(el('p', { clase: 'aviso', texto: 'Cambia pesos o valoraciones y todo se recalcula. Los pesos deben sumar 100.' }));

    var tabla = el('table', { clase: 'matriz' });
    var cabecera = el('tr', {}, [
      el('th', { texto: 'Criterio' }),
      el('th', { clase: 'centro', texto: 'Peso (%)' })
    ]);
    DATOS.erps.forEach(function (erp) {
      cabecera.appendChild(el('th', { clase: 'centro', 'data-col': erp.id, texto: erp.nombre }));
    });
    tabla.appendChild(el('thead', {}, [cabecera]));

    var cuerpo = el('tbody');
    DATOS.criterios.forEach(function (c) {
      var fila = el('tr');
      fila.appendChild(el('td', {}, [c.nombre, el('span', { clase: 'detalle-criterio', texto: c.detalle })]));

      var inputPeso = el('input', { type: 'number', min: '0', max: '100', step: '1', value: String(e.pesos[c.id]), 'aria-label': 'Peso de ' + c.nombre });
      inputPeso.addEventListener('input', function () {
        e.pesos[c.id] = Number(inputPeso.value) || 0;
        refrescar();
      });
      fila.appendChild(el('td', { clase: 'centro' }, [inputPeso]));

      DATOS.erps.forEach(function (erp) {
        var sel = el('select', { 'aria-label': c.nombre + ' en ' + erp.nombre, 'data-sel': c.id + '|' + erp.id });
        DATOS.escala.forEach(function (n) {
          var op = el('option', { value: String(n.valor), texto: n.valor + ' ' + n.nombre });
          if (n.valor === e.puntuaciones[c.id][erp.id]) op.selected = true;
          sel.appendChild(op);
        });
        sel.addEventListener('change', function () {
          e.puntuaciones[c.id][erp.id] = Number(sel.value);
          refrescar();
        });
        fila.appendChild(el('td', { clase: 'centro', 'data-col': erp.id }, [sel, el('span', { clase: 'puntos', 'data-pts': c.id + '|' + erp.id })]));
      });
      cuerpo.appendChild(fila);
    });
    tabla.appendChild(cuerpo);

    var pie = el('tfoot');
    var filaPesos = el('tr', { clase: 'fila-pesos' }, [
      el('th', { texto: 'Suma de pesos' }),
      el('td', { clase: 'centro', 'data-suma-pesos': '1' })
    ]);
    filaPesos.appendChild(el('td', { 'colspan': String(DATOS.erps.length), 'data-aviso-pesos': '1' }));
    pie.appendChild(filaPesos);

    var filaTotal = el('tr', { clase: 'fila-total' }, [
      el('th', { texto: 'PUNTUACIÓN TOTAL PONDERADA' }),
      el('td', { clase: 'centro', texto: '100' })
    ]);
    DATOS.erps.forEach(function (erp) {
      filaTotal.appendChild(el('td', { clase: 'centro', 'data-col': erp.id, 'data-total': erp.id }));
    });
    pie.appendChild(filaTotal);
    tabla.appendChild(pie);

    bloque.appendChild(el('div', { clase: 'contenedor-tabla' }, [tabla]));

    var acciones = el('div', { clase: 'acciones' });
    var bReset = el('button', { type: 'button', clase: 'boton', texto: 'Restablecer valores del informe' });
    bReset.addEventListener('click', function () {
      var i = estado.activa;
      estado.empresas[i] = estadoInicial(DATOS.empresas[i]);
      pintarEmpresa();
    });
    var bNorm = el('button', { type: 'button', clase: 'boton', texto: 'Normalizar pesos a 100' });
    bNorm.addEventListener('click', function () {
      var suma = sumaPesos(DATOS.criterios, e.pesos);
      if (suma > 0) {
        DATOS.criterios.forEach(function (c) { e.pesos[c.id] = Math.round((e.pesos[c.id] * 100 / suma) * 100) / 100; });
      }
      pintarEmpresa();
    });
    acciones.appendChild(bReset);
    acciones.appendChild(bNorm);
    bloque.appendChild(acciones);
    return bloque;
  }

  function pintarResultado() {
    var bloque = el('section', { clase: 'bloque' });
    bloque.appendChild(el('h2', { texto: 'Resultado' }));
    var caja = el('div', { clase: 'resultado', id: 'resultado' });
    DATOS.erps.forEach(function (erp) {
      caja.appendChild(el('div', { clase: 'barra-fila' }, [
        el('div', { clase: 'barra-nombre', texto: erp.nombre }),
        el('div', { clase: 'barra-pista' }, [el('div', { clase: 'barra-valor', 'data-barra': erp.id })]),
        el('div', { clase: 'barra-numero', 'data-numero': erp.id })
      ]));
    });
    bloque.appendChild(caja);
    bloque.appendChild(el('p', { id: 'veredicto' }));
    return bloque;
  }

  // TCO

  function pintarTCO(e) {
    var bloque = el('section', { clase: 'bloque' });
    bloque.appendChild(el('h2', { texto: 'Coste total de propiedad (TCO) a 5 años' }));
    bloque.appendChild(el('p', { clase: 'aviso', texto: e.datos.tco.supuestos }));

    var us = el('div', { clase: 'rejilla-usuarios' });
    var inpU = el('input', { type: 'number', min: '1', value: String(e.usuarios), id: 'inp-usuarios' });
    inpU.addEventListener('input', function () {
      e.usuarios = Math.max(0, Number(inpU.value) || 0);
      refrescar();
    });
    us.appendChild(el('label', {}, ['Usuarios totales: ', inpU]));
    var inpL = el('input', { type: 'number', min: '0', value: String(e.usuariosLimitados), id: 'inp-limitados' });
    inpL.addEventListener('input', function () {
      e.usuariosLimitados = Math.max(0, Number(inpL.value) || 0);
      refrescar();
    });
    us.appendChild(el('label', {}, ['Usuarios con licencia limitada (Team Member): ', inpL]));
    bloque.appendChild(us);

    DATOS.erps.forEach(function (erp) {
      var det = el('details', { open: 'open' });
      det.appendChild(el('summary', {}, [erp.nombre + ': ', el('span', { 'data-tco-total': erp.id })]));

      var tabla = el('table', { clase: 'tco' });
      tabla.appendChild(el('thead', {}, [el('tr', {}, [
        el('th', { texto: 'Concepto' }),
        el('th', { clase: 'derecha', texto: 'Importe (€)' }),
        el('th', { clase: 'centro', texto: 'Periodicidad' }),
        el('th', { clase: 'centro', texto: 'Unidades' }),
        el('th', { clase: 'derecha', texto: 'Coste a 5 años' }),
        el('th', { texto: 'Fuente' })
      ])]));
      var cuerpo = el('tbody');
      e.tco[erp.id].forEach(function (linea, idx) {
        var inp = el('input', { type: 'number', min: '0', step: '0.01', value: String(linea.imp), 'aria-label': linea.c });
        inp.addEventListener('input', function () {
          linea.imp = Number(inp.value) || 0;
          refrescar();
        });
        var per = { mes: 'por mes', anio: 'por año', unico: 'pago único' }[linea.per];
        var fuentes = linea.f.length ? linea.f.join(', ') : 'estimación propia';
        cuerpo.appendChild(el('tr', {}, [
          el('td', { texto: linea.c }),
          el('td', { clase: 'derecha' }, [inp]),
          el('td', { clase: 'centro', texto: per }),
          el('td', { clase: 'centro', 'data-unidades': erp.id + '|' + idx }),
          el('td', { clase: 'derecha', 'data-coste': erp.id + '|' + idx }),
          el('td', { texto: fuentes })
        ]));
      });
      tabla.appendChild(cuerpo);
      tabla.appendChild(el('tfoot', {}, [el('tr', { clase: 'fila-total' }, [
        el('th', { 'colspan': '4', texto: 'TCO total a 5 años' }),
        el('td', { clase: 'derecha', 'data-tco-pie': erp.id }),
        el('td')
      ])]));
      det.appendChild(el('div', { clase: 'contenedor-tabla' }, [tabla]));
      bloque.appendChild(det);
    });

    var sug = el('div', { id: 'sugerencia-tco' });
    bloque.appendChild(sug);
    var bAplicar = el('button', { type: 'button', clase: 'boton principal', texto: 'Aplicar las notas de TCO sugeridas a la matriz' });
    bAplicar.addEventListener('click', function () {
      var t = totalesTCO(e);
      DATOS.erps.forEach(function (erp) {
        e.puntuaciones.tco[erp.id] = sugerirTCO(t, erp.id, DATOS.reglaTCO).nota;
      });
      pintarEmpresa();
    });
    bloque.appendChild(el('div', { clase: 'acciones' }, [bAplicar]));
    return bloque;
  }

  // Justificaciones

  function pintarJustificaciones(e) {
    var bloque = el('section', { clase: 'bloque' });
    bloque.appendChild(el('h2', { texto: 'Justificación de las puntuaciones' }));
    bloque.appendChild(el('p', { clase: 'aviso', texto: 'Las puntuaciones iniciales de esta sección son las del informe. Si cambias una valoración arriba, esta explicación no cambia.' }));
    DATOS.criterios.forEach(function (c) {
      var det = el('details');
      det.appendChild(el('summary', { texto: c.nombre + ' (peso ' + c.peso + ' %)' }));
      DATOS.erps.forEach(function (erp) {
        var nota = e.datos.notas[c.id][erp.id];
        var valor = e.datos.puntuaciones[c.id][erp.id];
        var enlaces = el('span', { clase: 'fuentes-enlace' }, [' Fuentes: ']);
        nota.f.forEach(function (idF, i) {
          if (i > 0) enlaces.appendChild(document.createTextNode(', '));
          enlaces.appendChild(el('a', { href: '#fuente-' + idF, texto: idF }));
        });
        det.appendChild(el('p', { clase: 'nota-erp' }, [
          el('strong', { texto: erp.nombre }),
          el('span', { clase: 'etiqueta-nota', texto: String(valor) }),
          ' ' + nota.t,
          enlaces
        ]));
      });
      bloque.appendChild(det);
    });
    return bloque;
  }

  // Actualización de los valores calculados (sin volver a crear los campos)

  function refrescar() {
    var e = empresaActual();
    var cont = document.getElementById('contenido');

    // Puntos ponderados por celda
    DATOS.criterios.forEach(function (c) {
      DATOS.erps.forEach(function (erp) {
        var nodo = cont.querySelector('[data-pts="' + c.id + '|' + erp.id + '"]');
        var pts = puntuacionPonderada(e.puntuaciones[c.id][erp.id], e.pesos[c.id]);
        if (nodo) nodo.textContent = dec(pts) + ' pts';
      });
    });

    // Suma de pesos
    var suma = sumaPesos(DATOS.criterios, e.pesos);
    var nodoSuma = cont.querySelector('[data-suma-pesos]');
    if (nodoSuma) nodoSuma.textContent = dec(suma);
    var aviso = cont.querySelector('[data-aviso-pesos]');
    if (aviso) {
      aviso.textContent = Math.abs(suma - 100) < 0.005 ? 'Correcto: los pesos suman 100.' : 'Los pesos suman ' + dec(suma) + ' y deberían sumar 100 (usa Normalizar pesos).';
      aviso.className = Math.abs(suma - 100) < 0.005 ? 'ok' : 'error';
    }

    // Totales, barras y ganador
    var r = ranking(DATOS.erps, DATOS.criterios, e.pesos, e.puntuaciones);
    var mejor = r[0].id;
    DATOS.erps.forEach(function (erp) {
      var total = totalErp(DATOS.criterios, e.pesos, e.puntuaciones, erp.id);
      var celda = cont.querySelector('[data-total="' + erp.id + '"]');
      if (celda) celda.textContent = dec(total);
      var barra = cont.querySelector('[data-barra="' + erp.id + '"]');
      if (barra) {
        barra.style.width = Math.max(0, Math.min(100, total)) + '%';
        barra.className = erp.id === mejor ? 'barra-valor mejor' : 'barra-valor';
      }
      var num = cont.querySelector('[data-numero="' + erp.id + '"]');
      if (num) num.textContent = dec(total) + ' / 100';
      var cols = cont.querySelectorAll('[data-col="' + erp.id + '"]');
      for (var i = 0; i < cols.length; i++) {
        if (erp.id === mejor) cols[i].classList.add('ganador');
        else cols[i].classList.remove('ganador');
      }
    });
    var ver = cont.querySelector('#veredicto');
    if (ver) {
      var dif = r[0].total - r[1].total;
      ver.textContent = 'Mayor puntuación: ' + r[0].nombre + ' (' + dec(r[0].total) + '). Ventaja sobre ' + r[1].nombre + ': ' + dec(dif) + ' puntos.';
    }

    // TCO
    var t = totalesTCO(e);
    DATOS.erps.forEach(function (erp) {
      e.tco[erp.id].forEach(function (linea, idx) {
        var u = cont.querySelector('[data-unidades="' + erp.id + '|' + idx + '"]');
        if (u) u.textContent = String(unidadesLinea(linea, infoUsuarios(e)));
        var c = cont.querySelector('[data-coste="' + erp.id + '|' + idx + '"]');
        if (c) c.textContent = euros(costeLinea(linea, infoUsuarios(e)));
      });
      var tot = cont.querySelector('[data-tco-total="' + erp.id + '"]');
      if (tot) tot.textContent = euros(t[erp.id]);
      var pie = cont.querySelector('[data-tco-pie="' + erp.id + '"]');
      if (pie) pie.textContent = euros(t[erp.id]);
    });
    var sug = cont.querySelector('#sugerencia-tco');
    if (sug) {
      sug.innerHTML = '';
      var lista = el('ul');
      DATOS.erps.forEach(function (erp) {
        var s = sugerirTCO(t, erp.id, DATOS.reglaTCO);
        lista.appendChild(el('li', { texto: erp.nombre + ': ' + dec(s.razon) + ' veces el ERP más barato, nota de TCO sugerida ' + s.nota + ' (en la matriz: ' + e.puntuaciones.tco[erp.id] + ').' }));
      });
      sug.appendChild(el('p', { clase: 'aviso', texto: 'Regla: hasta ' + DATOS.reglaTCO.maxParaTres + ' veces el más barato, 3; hasta ' + DATOS.reglaTCO.maxParaDos + ' veces, 2; más, 1.' }));
      sug.appendChild(lista);
    }
  }

  function pintarFuentes() {
    var ol = document.getElementById('lista-fuentes');
    Object.keys(DATOS.fuentes).forEach(function (id) {
      var f = DATOS.fuentes[id];
      var li = el('li', { id: 'fuente-' + id });
      li.appendChild(el('strong', { texto: id + ' ' }));
      li.appendChild(document.createTextNode(f.t + '. '));
      if (/^https?:/.test(f.u)) li.appendChild(el('a', { href: f.u, target: '_blank', rel: 'noopener', texto: f.u }));
      else li.appendChild(document.createTextNode(f.u));
      ol.appendChild(li);
    });
  }

  DATOS.empresas.forEach(function (emp) { estado.empresas.push(estadoInicial(emp)); });
  pintarPestanas();
  pintarEmpresa();
  pintarFuentes();
})();
