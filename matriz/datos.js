// Datos de la matriz de decisión. Fecha de consulta de las fuentes: 16/11/2026.
// Escala 0 a 3. Los importes de TCO son estimaciones a 5 años (60 meses) y se pueden editar en la web.

var DATOS = {
  fechaConsulta: '2026-11-16',

  erps: [
    { id: 'odoo', nombre: 'Odoo Enterprise' },
    { id: 'holded', nombre: 'Holded' },
    { id: 'bc', nombre: 'MS Dynamics 365 Business Central' }
  ],

  criterios: [
    { id: 'cobertura', nombre: 'Cobertura funcional', detalle: 'Almacén, compras, ventas, CRM y contabilidad', peso: 30 },
    { id: 'tco', nombre: 'Coste total de propiedad (TCO) a 5 años', detalle: 'Licencias, implantación, formación, soporte y huecos a cubrir', peso: 25 },
    { id: 'integracion', nombre: 'Capacidad de integración', detalle: 'Con otros programas y sistemas', peso: 15 },
    { id: 'uso', nombre: 'Facilidad de uso y app móvil', detalle: 'Aprendizaje y disponibilidad de aplicación móvil', peso: 10 },
    { id: 'normativa', nombre: 'Adaptación a la normativa española', detalle: 'PGC, IVA, VeriFactu y facturación electrónica', peso: 10 },
    { id: 'partners', nombre: 'Partners y soporte técnico en la zona', detalle: 'Implantadores y asistencia técnica', peso: 10 }
  ],

  escala: [
    { valor: 0, nombre: 'No cumple', texto: 'No dispone de la funcionalidad necesaria.' },
    { valor: 1, nombre: 'Cumple parcialmente', texto: 'Necesita módulos adicionales, adaptaciones o soluciones externas.' },
    { valor: 2, nombre: 'Cumple', texto: 'Resuelve adecuadamente la necesidad.' },
    { valor: 3, nombre: 'Cumple muy bien', texto: 'Resuelve la necesidad de forma completa y ofrece ventajas adicionales.' }
  ],

  // Regla para sugerir la nota de TCO: razón entre el TCO de cada ERP y el más barato.
  reglaTCO: { maxParaTres: 1.5, maxParaDos: 3 },

  fuentes: {
    F1: { t: 'Holded, página oficial de precios', u: 'https://www.holded.com/es/precios' },
    F2: { t: 'Holded, software TPV', u: 'https://www.holded.com/es/tpv-software' },
    F3: { t: 'Holded, gema TPV (precio por tienda)', u: 'https://www.holded.com/es/gemas/tpv' },
    F8: { t: 'Holded, integraciones (API REST y webhooks)', u: 'https://www.holded.com/en-us/integrations' },
    F9: { t: 'Foro de mejoras de Holded: lotes y caducidades en alimentación', u: 'https://feedback.holded.com/mejoras/p/que-cuando-se-sincronicen-pedidos-desde-e-commerce-pueda-descontar-stock-de-prod' },
    F11: { t: 'Guía de Software, análisis de Holded', u: 'https://www.guiadesoftware.com/software/holded' },
    F13: { t: 'Odoo, solución para supermercados', u: 'https://www.odoo.com/es_ES/industries/grocery-store' },
    F15: { t: 'Odoo, solución para construcción', u: 'https://www.odoo.com/es_ES/industries/construction' },
    F18: { t: 'Odoo Apps, ES Presupuestos Obra (partidas, importación BC3 y mediciones)', u: 'https://apps.odoo.com/apps/modules/19.0/es_presupuestos_obra' },
    F19: { t: 'Odoo, blog sobre Veri*Factu', u: 'https://www.odoo.com/blog/business-hacks-1/verifactu-system-in-spain-1464' },
    F21: { t: 'Softabase, precios reales de Odoo en España', u: 'https://softabase.com/es/guides/odoo-community-vs-enterprise-vs-cloud-pricing' },
    F22: { t: 'Softabase, ficha de Odoo (precios de octubre de 2026)', u: 'https://softabase.com/es/software/erp/odoo' },
    F27: { t: 'ERP Research, Dynapps (Odoo Gold Partner, Valencia)', u: 'https://erpresearch.com/odoo-partners/dynapps-es-sl' },
    F30: { t: 'Microsoft, precios de Business Central (España)', u: 'https://www.microsoft.com/es-es/dynamics-365/products/business-central/pricing' },
    F31: { t: 'Hackceleration, software Verifactu para pymes (Business Central 69,30 €)', u: 'https://hackceleration.com/labs/best/verifactu-software-smes-spain' },
    F32: { t: 'MS Dynamics World, Essentials frente a Premium (80, 110 y 8 USD)', u: 'https://msdynamicsworld.com/node/39442' },
    F33: { t: 'Ecosistema Startup, ERP para pymes 2026 (rangos de implantación de Comparasoft)', u: 'https://ecosistemastartup.com/?p=119532' },
    F34: { t: 'Ecosire, TPV retail para Business Central (no es nativo)', u: 'https://ecosire.com/es/apps/dynamics-365-business-central/d365-retail-pos' },
    F36: { t: 'Gestisoft, proyectos (Jobs) en Business Central', u: 'https://www.gestisoft.com/en/blog/projects-business-central' },
    F38: { t: 'Davisa, ERP para construcción sobre Business Central', u: 'https://davisa.es/en/blog/best-construction-erp-business-central/' },
    F39: { t: 'Microsoft Learn, VERI*FACTU en Business Central', u: 'https://learn.microsoft.com/en-us/dynamics365/business-central/localfunctionality/spain/enable-real-time-invoice-reporting' },
    F42: { t: 'Softabase, ficha de Business Central', u: 'https://softabase.com/es/software/erp/dynamics-365-business-central' },
    F43: { t: 'SoftDoit, partners de Dynamics 365 en España', u: 'https://www.softwaredoit.es/partners-microsoft-dynamics/index.html' },
    F45: { t: 'Datanet Consultores (Valencia)', u: 'https://proveedores.com/proveedores/datanet-consultores/' },
    F47: { t: 'Emprendedores, Verifactu se aplaza hasta octubre de 2028', u: 'https://emprendedores.es/gestion/aplazamiento-verifactu-2028/' },
    F52: { t: 'LS Retail, LS Central: TPV y retail sobre Business Central', u: 'https://www.lsretail.com/products/ls-central' }
  },

  empresas: [
    {
      id: 'e1',
      nombre: 'Empresa 1: Supermercado La Plaza',
      resumen: '5 personas, 1 tienda de 250 m², 2.500 referencias, 40 proveedores y 650.000 € de facturación. Presupuesto tecnológico muy limitado. Necesita TPV integrado con inventario, caducidades, compras, informes sencillos y cumplimiento fiscal.',
      usuarios: 5,
      usuariosLimitados: 0,

      puntuaciones: {
        cobertura:   { odoo: 3, holded: 2, bc: 1 },
        tco:         { odoo: 2, holded: 3, bc: 1 },
        integracion: { odoo: 3, holded: 2, bc: 2 },
        uso:         { odoo: 2, holded: 3, bc: 1 },
        normativa:   { odoo: 3, holded: 3, bc: 2 },
        partners:    { odoo: 2, holded: 2, bc: 2 }
      },

      notas: {
        cobertura: {
          odoo: { f: ['F13'], t: 'Punto de venta, inventario, compras, ventas y contabilidad son apps de una misma base de datos. Gestiona lotes con fechas de caducidad y alertas, y reglas de reposición. Cubre todos los requisitos del supermercado sin módulos de terceros.' },
          holded: { f: ['F1'], t: 'Tiene facturación, compras, CRM y contabilidad. Inventario y TPV son gemas de pago aparte. Permite lotes, pero no hemos encontrado control de fechas de caducidad ni asignación automática de lotes (FEFO): un usuario del sector alimentario lo pide como mejora en el foro de Holded. Cubre el TPV y el stock, pero solo en parte los perecederos.' },
          bc: { f: ['F52'], t: 'Cubre compras, ventas, inventario y contabilidad, pero no incluye un TPV nativo: hay que añadir una extensión retail de un partner (por ejemplo LS Central o una solución a medida), con coste y soporte aparte. Por eso solo cumple parcialmente la necesidad principal.' }
        },
        tco: {
          odoo: { f: ['F21'], t: 'Standard a 24,90 €/usuario/mes (precio España) por 5 usuarios son 7.470 € en 5 años. Se suma implantación mínima con partner (5.000 €, extremo bajo del rango 5.000 a 25.000 €), formación y soporte. Total estimado 15.970 €, 1,8 veces el más barato.' },
          holded: { f: ['F1'], t: 'Plan Standard (69 €/mes) más las gemas de inventario (25 €/mes) y TPV (25 €/mes). La licencia cuesta casi lo mismo que la de Odoo (7.140 € frente a 7.470 €), pero la implantación es mínima. Se incluyen 1.000 € para cubrir las caducidades. Total estimado 8.940 €, el más bajo.' },
          bc: { f: ['F30'], t: 'Essentials a 69,30 €/usuario/mes son 20.790 € en 5 años, más un TPV de tercero (estimado en 100 €/mes), implantación de 20.000 € (extremo bajo del rango 20.000 a 60.000 €) y soporte. Total estimado 51.290 €, 5,7 veces el más barato. Incluso con un paquete básico de implantación de 3.000 € quedaría por encima de 3 veces.' }
        },
        integracion: {
          odoo: { f: ['F13'], t: 'TPV, inventario, compras y contabilidad comparten base de datos, así que no hay que conectar nada entre ellos. Para terceros existe API y un catálogo de conectores, algunos de pago (de 249 a 499 $ por módulo de marketplace). Hoy el supermercado no los necesita.' },
          holded: { f: ['F8'], t: 'API REST, webhooks y más de 200 integraciones (bancos, Shopify, PrestaShop, Amazon). Algunas conexiones, como Magento, se hacen mediante Zapier, una herramienta externa con coste propio. Suficiente para banco y gestoría.' },
          bc: { f: ['F43'], t: 'Se integra bien con Microsoft 365, Power BI y Power Platform. Pero el TPV, pieza clave en este caso, depende de la extensión de un partner y de su sincronización con el stock.' }
        },
        uso: {
          odoo: { f: ['F13'], t: 'TPV con lector de códigos de barras y uso desde móvil o tablet como aplicación web progresiva (la opción que recomienda Odoo). La app de iOS tiene valoraciones medias (3,2 sobre 5) por funciones limitadas. Requiere formación para configurar caducidades.' },
          holded: { f: ['F2'], t: 'Interfaz considerada la mejor entre los ERP españoles, TPV para tablet que se configura en unos 5 minutos y app para móvil. Necesita muy poca formación.' },
          bc: { f: ['F42'], t: 'ERP pensado para empresa mediana: más complejo para un equipo de 5 personas sin perfil administrativo, y el TPV de tercero añade otra interfaz. Su familiaridad con Office reduce la formación (30 a 50 % según un análisis), pero el enunciado no menciona un entorno Microsoft.' }
        },
        normativa: {
          odoo: { f: ['F19'], t: 'Localización española con PGC, IVA, modelos tributarios, Facturae y SII. El módulo Veri*Factu está disponible en Enterprise 17 y posteriores, en todos los entornos, y tiene versión integrada con el TPV.' },
          holded: { f: ['F31'], t: 'Software español que declara estar adaptado a Verifactu y a la facturación electrónica. Ojo: la AEAT no homologa programas; cada fabricante firma una declaración responsable.' },
          bc: { f: ['F39'], t: 'Localización española nativa (SII) y Verifactu integrado mediante el marco E-Documents, que envía a la AEAT las facturas contabilizadas. Hay que activarlo y configurarlo, a veces con un partner, y el TPV de tercero también debe cumplir.' }
        },
        partners: {
          odoo: { f: ['F27'], t: 'Hay partners Gold en Valencia (Dynapps y Punt Sistemes, en Paterna), pero orientados a proyectos de pyme mayor. Para un comercio de 5 personas habría que encontrar uno que acepte un proyecto pequeño.' },
          holded: { f: ['F1'], t: 'Todos los planes dan acceso gratuito a la gestoría, lo que encaja con un comercio de pueblo. El soporte prioritario solo está en los planes Advanced y Premium, y las reseñas critican la rapidez y el abuso de chatbots. No hay red de implantadores como en Odoo o Business Central.' },
          bc: { f: ['F45'], t: 'Red amplia en la Comunidad Valenciana (Datanet, Grupo Tecon, Integra) y soporte de Microsoft. Pero su cliente típico es una empresa mediana, y un comercio de 650.000 € de facturación queda por debajo.' }
        }
      },

      tco: {
        supuestos: 'Usuarios completos: 5 (2 propietarios y 3 empleados). En Holded se asume que los cajeros usan el TPV sin usuario completo, porque el plan Standard incluye 4 usuarios. Importes en euros sin IVA y sin descuentos de bienvenida. El hardware del TPV (lector, impresora, cajón) es igual en los tres y no se incluye.',
        erps: {
          odoo: [
            { c: 'Licencia Odoo Enterprise Standard (24,90 €/usuario/mes)', imp: 24.9, per: 'mes', un: 'usuariosCompletos', f: ['F21'] },
            { c: 'Implantación con partner (parametrización y carga de 2.500 referencias)', imp: 5000, per: 'unico', un: 1, f: ['F33'] },
            { c: 'Formación del personal (estimación propia)', imp: 1000, per: 'unico', un: 1, f: [] },
            { c: 'Soporte y mantenimiento del partner (estimación propia)', imp: 500, per: 'anio', un: 1, f: [] },
            { c: 'Cubrir huecos funcionales', imp: 0, per: 'unico', un: 1, f: [] }
          ],
          holded: [
            { c: 'Plan Standard (69 €/mes, 4 usuarios)', imp: 69, per: 'mes', un: 1, f: ['F1'] },
            { c: 'Gema Inventario (25 €/mes)', imp: 25, per: 'mes', un: 1, f: ['F1'] },
            { c: 'Gema TPV (25 €/tienda/mes, 1 tienda)', imp: 25, per: 'mes', un: 1, f: ['F3'] },
            { c: 'Puesta en marcha y carga de datos (estimación propia)', imp: 500, per: 'unico', un: 1, f: [] },
            { c: 'Formación (estimación propia)', imp: 300, per: 'unico', un: 1, f: [] },
            { c: 'Cubrir huecos funcionales: control manual de caducidades (estimación propia)', imp: 1000, per: 'unico', un: 1, f: ['F9'] }
          ],
          bc: [
            { c: 'Licencia Business Central Essentials (69,30 €/usuario/mes)', imp: 69.3, per: 'mes', un: 'usuariosCompletos', f: ['F30'] },
            { c: 'TPV de tercero (estimación propia, precio no publicado)', imp: 100, per: 'mes', un: 1, f: ['F34'] },
            { c: 'Implantación con partner (extremo bajo del rango 20.000 a 60.000 €)', imp: 20000, per: 'unico', un: 1, f: ['F33'] },
            { c: 'Formación (estimación propia)', imp: 1500, per: 'unico', un: 1, f: [] },
            { c: 'Soporte y mantenimiento del partner (estimación propia)', imp: 600, per: 'anio', un: 1, f: [] }
          ]
        }
      }
    },

    {
      id: 'e2',
      nombre: 'Empresa 2: Reformas Levante',
      resumen: '45 empleados, 6 M€ de facturación, 80 a 100 proyectos al año y 15 a 20 obras simultáneas en Valencia y Castellón. 120 proveedores, 25 subcontratas y 2 delegaciones. Necesita CRM, presupuestos, compras, materiales por obra, contabilidad analítica, horas, certificaciones, informes de rentabilidad y acceso móvil.',
      usuarios: 25,
      usuariosLimitados: 10,

      puntuaciones: {
        cobertura:   { odoo: 3, holded: 1, bc: 2 },
        tco:         { odoo: 2, holded: 3, bc: 2 },
        integracion: { odoo: 3, holded: 2, bc: 3 },
        uso:         { odoo: 2, holded: 3, bc: 2 },
        normativa:   { odoo: 3, holded: 3, bc: 2 },
        partners:    { odoo: 3, holded: 1, bc: 3 }
      },

      notas: {
        cobertura: {
          odoo: { f: ['F15'], t: 'CRM, presupuestos, compras, inventario, proyectos, partes de horas y contabilidad analítica en una sola base de datos. Odoo ofrece una solución para contratistas de reforma (mano de obra y materiales por partida, márgenes en tiempo real) y un caso en España (Biecsa) que controla presupuestos por partidas y desviaciones. A validar en una demo: certificaciones y mediciones, donde existe un módulo de terceros con importación BC3.' },
          holded: { f: ['F1'], t: 'Tiene proyectos con fases, presupuesto por fase, horas, subcontratas y materiales, además de rentabilidad por proyecto (plan Standard o superior), CRM y compras. Pero no hemos encontrado contabilidad analítica por obra ni certificaciones o mediciones, el inventario es una gema de pago y está pensado para estudios de arquitectura, no para 15 a 20 obras a la vez. Cubre solo en parte.' },
          bc: { f: ['F36'], t: 'El módulo de proyectos (Jobs) incluye presupuesto, recursos, partes de horas, compras, WIP y facturación por proyecto. Un partner (Davisa) indica que lo nativo basta con menos de 15 proyectos activos y un solo modelo de facturación; Reformas Levante tiene 15 a 20 y certificaciones, así que haría falta una vertical de obra. El CRM completo se resolvería con Dynamics 365 Sales.' }
        },
        tco: {
          odoo: { f: ['F21'], t: 'Plan Custom (44,90 €/usuario/mes, el que permite personalizar) por 25 usuarios son 67.350 € en 5 años. Se suman implantación de 25.000 € (extremo alto del rango por incluir personalización), módulo de obras (600 €), desarrollos (10.000 €), formación y soporte. Total estimado 120.950 €, 2,1 veces el más barato. Con el plan Standard bajaría a unos 91.000 €.' },
          holded: { f: ['F1'], t: 'Plan Premium (229 €/mes, 15 usuarios) más 10 usuarios extra (precio estimado), inventario y soporte premium suman 27.240 € en 5 años. Hay que añadir una herramienta externa de control de obra y su integración para cubrir los huecos (27.000 €, estimación propia). Total estimado 58.740 €, el más bajo.' },
          bc: { f: ['F30'], t: '15 licencias Essentials (69,30 €) más 10 Team Member para jefes de obra (unos 6,93 €) suman 66.528 € en 5 años. Se añaden implantación de 40.000 € (punto medio del rango 20.000 a 60.000 €), vertical de obras (15.000 €, estimación), formación y soporte. Total estimado 145.528 €, 2,5 veces el más barato.' }
        },
        integracion: {
odoo: { f: ['F18'], t: 'El flujo CRM, presupuesto, proyecto, compra, stock y factura funciona sin conectores porque es una sola base de datos. Para presupuestos de obra existen módulos de terceros con importación BC3 (a validar con un partner su compatibilidad con Presto o Arquímedes). Hay API para otros programas.' },          holded: { f: ['F8'], t: 'API REST, webhooks y más de 200 integraciones, además de Zapier. Para conectar con programas de mediciones y presupuestos de obra (Presto, Arquímedes) no hemos encontrado una integración nativa, así que habría que desarrollarla.' },
          bc: { f: ['F38'], t: 'Gran ecosistema: Microsoft 365, Power BI y Power Platform, Excel y Word integrados, y verticales de obra que importan BC3 desde Presto o Arquímedes (Davisa), con app de jefe de obra y fotos geolocalizadas.' }
        },
        uso: {
          odoo: { f: ['F15'], t: 'Interfaz moderna y partes de horas desde el móvil. La app nativa tiene limitaciones (3,2 sobre 5 en iOS) y Odoo recomienda la versión web progresiva. Los jefes de obra necesitarán formación.' },
          holded: { f: ['F11'], t: 'Interfaz intuitiva (la mejor valorada entre los ERP españoles), poca formación y app móvil. La limitación es funcional (ya recogida en cobertura), no de uso.' },
          bc: { f: ['F38'], t: 'Interfaz familiar para usuarios de Microsoft 365 (la formación baja entre un 30 y un 50 % según un análisis), con apps móviles y verticales con app de jefe de obra. Más compleja de configurar que Holded.' }
        },
        normativa: {
          odoo: { f: ['F19'], t: 'Localización española completa (PGC, IVA, Facturae, SII) y módulo Veri*Factu en Enterprise. Con 6 M€ de facturación (menos de 8 M€), la factura electrónica entre empresas se exigiría desde octubre de 2028 según el calendario anunciado, que todavía necesita una norma con rango de ley.' },
          holded: { f: ['F31'], t: 'Software español adaptado a Verifactu y facturación electrónica, mediante declaración responsable del fabricante. Valen las mismas fechas: octubre de 2028 si se aprueba el aplazamiento anunciado.' },
          bc: { f: ['F47'], t: 'Localización española nativa y Verifactu integrado, pero hay que activarlo y configurarlo, y la versión debe ser reciente. Un proveedor (Ecosire) afirma que falta en la base, mientras Microsoft Learn documenta el modo integrado; nos fiamos de Microsoft y lo verificaríamos con el partner.' }
        },
        partners: {
          odoo: { f: ['F27'], t: 'Partners Gold en Valencia: Dynapps (de 26 a 100 consultores certificados, con sector construcción) y Punt Sistemes (Paterna).' },
          holded: { f: ['F1'], t: 'No hay red de implantadores de obra: sus partners son sobre todo asesorías. El soporte prioritario solo existe en planes altos y las reseñas critican la rapidez. Para necesidades especializadas, la ayuda local es escasa.' },
          bc: { f: ['F38'], t: 'Red amplia en Valencia y Castellón (Datanet, que se presenta como la mayor consultora de la Comunidad Valenciana; Grupo Tecon en Paterna; Integra) y partners especializados en construcción (Davisa desde 2003, Arbentia), con soporte de Microsoft.' }
        }
      },

      tco: {
        supuestos: 'Usuarios: 25 (15 de oficina y dirección, 10 jefes de obra). En Business Central, los 10 jefes de obra usan licencia Team Member (partes de horas y consulta). En Odoo y Holded, los 25 pagan licencia completa. El precio de usuarios extra en Holded (15 €/mes) es una estimación propia. Importes en euros sin IVA.',
        erps: {
          odoo: [
            { c: 'Licencia Odoo Enterprise Custom (44,90 €/usuario/mes)', imp: 44.9, per: 'mes', un: 'usuarios', f: ['F22'] },
            { c: 'Implantación con partner (extremo alto del rango 5.000 a 25.000 €)', imp: 25000, per: 'unico', un: 1, f: ['F33'] },
            { c: 'Módulos de terceros de obra: presupuestos, BC3 y mediciones (unos 142 $ cada uno, con margen para varios)', imp: 600, per: 'unico', un: 1, f: ['F18'] },
            { c: 'Desarrollos a medida: certificaciones e informes (estimación propia)', imp: 10000, per: 'unico', un: 1, f: [] },
            { c: 'Formación (estimación propia)', imp: 3000, per: 'unico', un: 1, f: [] },
            { c: 'Soporte y mantenimiento del partner (estimación propia)', imp: 3000, per: 'anio', un: 1, f: [] },
            { c: 'Cubrir huecos funcionales', imp: 0, per: 'unico', un: 1, f: [] }
          ],
          holded: [
            { c: 'Plan Premium (229 €/mes, 15 usuarios)', imp: 229, per: 'mes', un: 1, f: ['F1'] },
            { c: 'Usuarios extra (10, a 15 €/mes: estimación propia)', imp: 15, per: 'mes', un: 10, f: [] },
            { c: 'Gema Inventario (25 €/mes)', imp: 25, per: 'mes', un: 1, f: ['F1'] },
            { c: 'Soporte premium (50 €/mes)', imp: 50, per: 'mes', un: 1, f: ['F1'] },
            { c: 'Puesta en marcha (estimación propia)', imp: 3000, per: 'unico', un: 1, f: [] },
            { c: 'Formación (estimación propia)', imp: 1500, per: 'unico', un: 1, f: [] },
            { c: 'Cubrir huecos: herramienta externa de control de obra, licencia (estimación propia)', imp: 200, per: 'mes', un: 1, f: [] },
            { c: 'Cubrir huecos: integración y adaptación de esa herramienta (estimación propia)', imp: 15000, per: 'unico', un: 1, f: [] }
          ],
          bc: [
            { c: 'Licencia Business Central Essentials (69,30 €/usuario/mes)', imp: 69.3, per: 'mes', un: 'usuariosCompletos', f: ['F30'] },
            { c: 'Licencia Team Member para jefes de obra (unos 6,93 €/usuario/mes)', imp: 6.93, per: 'mes', un: 'usuariosLimitados', f: ['F32'] },
            { c: 'Implantación con partner (punto medio del rango 20.000 a 60.000 €)', imp: 40000, per: 'unico', un: 1, f: ['F33'] },
            { c: 'Vertical de obras para certificaciones y BC3 (estimación propia)', imp: 15000, per: 'unico', un: 1, f: ['F38'] },
            { c: 'Formación (estimación propia)', imp: 4000, per: 'unico', un: 1, f: [] },
            { c: 'Soporte y mantenimiento del partner (estimación propia)', imp: 4000, per: 'anio', un: 1, f: [] }
          ]
        }
      }
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DATOS;
}
