# Actividad evaluable 01: selección de un ERP

**Asignatura:** Sistemas de Gestión Empresarial, UT1
**Autor/a:** Melisa Vafaeva
**Fecha de entrega:** 21 de noviembre de 2026

## 1. Planteamiento

Nos ponemos en el papel de una consultora que debe recomendar un ERP a dos empresas: un supermercado de pueblo (Empresa 1) y una empresa de reformas (Empresa 2). Comparamos Odoo Enterprise, Holded y Microsoft Dynamics 365 Business Central con la matriz de decisión del enunciado: seis criterios con sus pesos, valoración de 0 a 3 y puntuación ponderada `(valoración x peso) / 3`, para una nota final sobre 100.

Dos notas sobre el enunciado:

- El texto habla de "cuatro ERP", pero la matriz y la rúbrica tienen tres columnas (Odoo, Holded y Business Central). Hemos usado esas tres. SAP Business One, que se menciona en la pregunta de la Empresa 1, se trata de forma cualitativa en su apartado.
- La escala se describe como "de 1 a 3", pero la tabla incluye el valor 0 (no cumple). Hemos usado la escala de 0 a 3.

### Cómo está hecha la matriz

La matriz es una página web (HTML y JavaScript) que calcula las puntuaciones con la fórmula del enunciado. Se pueden cambiar los pesos y las valoraciones y el total se recalcula. También incluye una calculadora de TCO a 5 años con los importes editables, y una regla que sugiere la nota de TCO según el coste relativo. Los cálculos están separados en `calculo.js` y se comprueban con `node matriz/verificar.js`.

## 2. Pregunta inicial: ¿ERP a medida o ERP genérico?

**Pyme.** Es mejor usar un ERP existente y adaptarlo (parametrizar y, si hace falta, añadir módulos). Programar un ERP desde cero requiere un esfuerzo enorme para conseguir algo robusto, con contabilidad, impuestos y facturación electrónica al día, y la pyme no tiene un equipo técnico que lo mantenga (apuntes de la UT1, F48). La implantación de un ERP existente ya cuesta entre 5.000 y 25.000 € en Odoo y entre 20.000 y 60.000 € en Business Central según un comparador (F33): hacerlo a medida costaría bastante más y dejaría a la empresa dependiente de una sola persona. Para una empresa muy pequeña, incluso un ERP genérico puede ser demasiado, y bastan herramientas ligeras (es el caso de la Empresa 1).

**Gran empresa.** Lo habitual y más recomendable también es un ERP de cierta entidad (SAP S/4HANA, Dynamics 365), que aporta robustez, soporte y personalización mediante módulos (F48). El desarrollo a medida solo se justifica para procesos muy específicos que ningún producto cubre, y normalmente como una capa añadida al ERP, no como sustituto. Aquí pesa más el riesgo de dependencia del proveedor (licencias cerradas): por eso los apuntes recomiendan valorar licencias libres como Odoo Community en empresas medianas.

## 3. Empresa 1: Supermercado La Plaza

| Criterio (peso) | Odoo Enterprise | Holded | MS Dynamics 365 Business Central |
|:-|:-:|:-:|:-:|
| Cobertura funcional (30 %) | 3 (30,00) | 2 (20,00) | 1 (10,00) |
| Coste total de propiedad (TCO) a 5 años (25 %) | 2 (16,67) | 3 (25,00) | 1 (8,33) |
| Capacidad de integración (15 %) | 3 (15,00) | 2 (10,00) | 2 (10,00) |
| Facilidad de uso y app móvil (10 %) | 2 (6,67) | 3 (10,00) | 1 (3,33) |
| Adaptación a la normativa española (10 %) | 3 (10,00) | 3 (10,00) | 2 (6,67) |
| Partners y soporte técnico en la zona (10 %) | 2 (6,67) | 2 (6,67) | 2 (6,67) |
| **Total ponderado** | **85,00** | **81,67** | **45,00** |

Entre paréntesis, los puntos ponderados de cada celda.

### 3.1 Justificación de las puntuaciones

| ERP | Información encontrada | Criterio | Valoración | Fuentes |
|:-|:-|:-|:-:|:-|
| Odoo Enterprise | Punto de venta, inventario, compras, ventas y contabilidad son apps de una misma base de datos. Gestiona lotes con fechas de caducidad y alertas, y reglas de reposición. Cubre todos los requisitos del supermercado sin módulos de terceros. | Cobertura funcional | 3 | F13 |
| Holded | Tiene facturación, compras, CRM y contabilidad. Inventario y TPV son gemas de pago aparte. Permite lotes, pero no hemos encontrado control de fechas de caducidad ni asignación automática de lotes (FEFO): un usuario del sector alimentario lo pide como mejora en el foro de Holded. Cubre el TPV y el stock, pero solo en parte los perecederos. | Cobertura funcional | 2 | F1 |
| MS Dynamics 365 Business Central | Cubre compras, ventas, inventario y contabilidad, pero no incluye un TPV nativo: hay que añadir una extensión retail de un partner (por ejemplo LS Central o una solución a medida), con coste y soporte aparte. Por eso solo cumple parcialmente la necesidad principal. | Cobertura funcional | 1 | F52 |
| Odoo Enterprise | Standard a 24,90 €/usuario/mes (precio España) por 5 usuarios son 7.470 € en 5 años. Se suma implantación mínima con partner (5.000 €, extremo bajo del rango 5.000 a 25.000 €), formación y soporte. Total estimado 15.970 €, 1,8 veces el más barato. | Coste total de propiedad (TCO) a 5 años | 2 | F21 |
| Holded | Plan Standard (69 €/mes) más las gemas de inventario (25 €/mes) y TPV (25 €/mes). La licencia cuesta casi lo mismo que la de Odoo (7.140 € frente a 7.470 €), pero la implantación es mínima. Se incluyen 1.000 € para cubrir las caducidades. Total estimado 8.940 €, el más bajo. | Coste total de propiedad (TCO) a 5 años | 3 | F1 |
| MS Dynamics 365 Business Central | Essentials a 69,30 €/usuario/mes son 20.790 € en 5 años, más un TPV de tercero (estimado en 100 €/mes), implantación de 20.000 € (extremo bajo del rango 20.000 a 60.000 €) y soporte. Total estimado 51.290 €, 5,7 veces el más barato. Incluso con un paquete básico de implantación de 3.000 € quedaría por encima de 3 veces. | Coste total de propiedad (TCO) a 5 años | 1 | F30 |
| Odoo Enterprise | TPV, inventario, compras y contabilidad comparten base de datos, así que no hay que conectar nada entre ellos. Para terceros existe API y un catálogo de conectores, algunos de pago (de 249 a 499 $ por módulo de marketplace). Hoy el supermercado no los necesita. | Capacidad de integración | 3 | F13 |
| Holded | API REST, webhooks y más de 200 integraciones (bancos, Shopify, PrestaShop, Amazon). Algunas conexiones, como Magento, se hacen mediante Zapier, una herramienta externa con coste propio. Suficiente para banco y gestoría. | Capacidad de integración | 2 | F8 |
| MS Dynamics 365 Business Central | Se integra bien con Microsoft 365, Power BI y Power Platform. Pero el TPV, pieza clave en este caso, depende de la extensión de un partner y de su sincronización con el stock. | Capacidad de integración | 2 | F43 |
| Odoo Enterprise | TPV con lector de códigos de barras y uso desde móvil o tablet como aplicación web progresiva (la opción que recomienda Odoo). La app de iOS tiene valoraciones medias (3,2 sobre 5) por funciones limitadas. Requiere formación para configurar caducidades. | Facilidad de uso y app móvil | 2 | F13 |
| Holded | Interfaz considerada la mejor entre los ERP españoles, TPV para tablet que se configura en unos 5 minutos y app para móvil. Necesita muy poca formación. | Facilidad de uso y app móvil | 3 | F2 |
| MS Dynamics 365 Business Central | ERP pensado para empresa mediana: más complejo para un equipo de 5 personas sin perfil administrativo, y el TPV de tercero añade otra interfaz. Su familiaridad con Office reduce la formación (30 a 50 % según un análisis), pero el enunciado no menciona un entorno Microsoft. | Facilidad de uso y app móvil | 1 | F42 |
| Odoo Enterprise | Localización española con PGC, IVA, modelos tributarios, Facturae y SII. El módulo Veri*Factu está disponible en Enterprise 17 y posteriores, en todos los entornos, y tiene versión integrada con el TPV. | Adaptación a la normativa española | 3 | F19 |
| Holded | Software español que declara estar adaptado a Verifactu y a la facturación electrónica. Ojo: la AEAT no homologa programas; cada fabricante firma una declaración responsable. | Adaptación a la normativa española | 3 | F31 |
| MS Dynamics 365 Business Central | Localización española nativa (SII) y Verifactu integrado mediante el marco E-Documents, que envía a la AEAT las facturas contabilizadas. Hay que activarlo y configurarlo, a veces con un partner, y el TPV de tercero también debe cumplir. | Adaptación a la normativa española | 2 | F39 |
| Odoo Enterprise | Hay partners Gold en Valencia (Dynapps y Punt Sistemes, en Paterna), pero orientados a proyectos de pyme mayor. Para un comercio de 5 personas habría que encontrar uno que acepte un proyecto pequeño. | Partners y soporte técnico en la zona | 2 | F27 |
| Holded | Todos los planes dan acceso gratuito a la gestoría, lo que encaja con un comercio de pueblo. El soporte prioritario solo está en los planes Advanced y Premium, y las reseñas critican la rapidez y el abuso de chatbots. No hay red de implantadores como en Odoo o Business Central. | Partners y soporte técnico en la zona | 2 | F1 |
| MS Dynamics 365 Business Central | Red amplia en la Comunidad Valenciana (Datanet, Grupo Tecon, Integra) y soporte de Microsoft. Pero su cliente típico es una empresa mediana, y un comercio de 650.000 € de facturación queda por debajo. | Partners y soporte técnico en la zona | 2 | F45 |

### 3.2 Cálculo del TCO a 5 años

Supuestos: 5 usuarios (2 propietarios y 3 empleados). En Holded se asume que los cajeros usan el TPV sin usuario completo, porque el plan Standard incluye 4 usuarios. Importes en euros sin IVA, sin descuentos de bienvenida y sin el hardware del TPV (igual en los tres). Las líneas marcadas como "estimación propia" no tienen un precio publicado y son nuestra estimación, editable en la matriz.

| Concepto | Importe | Periodicidad | Uds. | Coste a 5 años |
|:-|-:|:-:|:-:|-:|
| **Odoo Enterprise** | | | | |
| Licencia Odoo Enterprise Standard (24,90 €/usuario/mes) | 24,9 € | mes | 5 | 7.470 € |
| Implantación con partner (parametrización y carga de 2.500 referencias) | 5000 € | único | 1 | 5.000 € |
| Formación del personal (estimación propia) | 1000 € | único | 1 | 1.000 € |
| Soporte y mantenimiento del partner (estimación propia) | 500 € | año | 1 | 2.500 € |
| Cubrir huecos funcionales | 0 € | único | 1 | 0 € |
| **Total Odoo Enterprise** | | | | **15.970 €** |
| **Holded** | | | | |
| Plan Standard (69 €/mes, 4 usuarios) | 69 € | mes | 1 | 4.140 € |
| Gema Inventario (25 €/mes) | 25 € | mes | 1 | 1.500 € |
| Gema TPV (25 €/tienda/mes, 1 tienda) | 25 € | mes | 1 | 1.500 € |
| Puesta en marcha y carga de datos (estimación propia) | 500 € | único | 1 | 500 € |
| Formación (estimación propia) | 300 € | único | 1 | 300 € |
| Cubrir huecos funcionales: control manual de caducidades (estimación propia) | 1000 € | único | 1 | 1.000 € |
| **Total Holded** | | | | **8.940 €** |
| **MS Dynamics 365 Business Central** | | | | |
| Licencia Business Central Essentials (69,30 €/usuario/mes) | 69,3 € | mes | 5 | 20.790 € |
| TPV de tercero (estimación propia, precio no publicado) | 100 € | mes | 1 | 6.000 € |
| Implantación con partner (extremo bajo del rango 20.000 a 60.000 €) | 20.000 € | único | 1 | 20.000 € |
| Formación (estimación propia) | 1500 € | único | 1 | 1.500 € |
| Soporte y mantenimiento del partner (estimación propia) | 600 € | año | 1 | 3.000 € |
| **Total MS Dynamics 365 Business Central** | | | | **51.290 €** |

Regla de la nota de TCO: hasta 1,5 veces el ERP más barato, 3; hasta 3 veces, 2; más de 3 veces, 1. Holded es el más barato (nota 3), Odoo cuesta 1,8 veces más (nota 2) y Business Central 5,7 veces más (nota 1).

Un dato importante: la licencia de Holded con inventario y TPV (7.140 €) cuesta casi lo mismo que la de Odoo Standard (7.470 €). La diferencia está en la implantación, no en la suscripción.

### 3.3 Decisión final: Odoo Enterprise (Standard)

Odoo obtiene 85,00 puntos, Holded 81,67 y Business Central 45,00. La diferencia entre Odoo y Holded es pequeña (3,33 puntos), así que la decisión depende de lo que más duele al supermercado.

**¿Tiene sentido implantar un ERP completo como SAP Business One o Business Central en un negocio tan pequeño?** No. Business Central sale a unos 51.000 € en 5 años (5,7 veces Holded) para un negocio que factura 650.000 € al año, y no trae TPV propio, que es la pieza central. SAP Business One está en otra liga: una guía sectorial lo sitúa en 150 a 250 USD por usuario y mes en la nube (F49) y un comparador estima 30.000 a 100.000 € de implantación (F33), un orden de magnitud que no es razonable con un "presupuesto tecnológico muy limitado". Los apuntes ya advierten de que en negocios pequeños un ERP puede estar sobredimensionado y que la implantación puede costar más que unas aplicaciones sencillas (F48).

**¿Podría ser suficiente una solución más económica y sencilla como Holded?** Sí para gran parte: facturación, contabilidad, compras, stock, TPV en tablet, informes y Verifactu, con una interfaz muy sencilla. Es la opción más barata (unos 8.940 € a 5 años) y obtiene casi la misma puntuación que Odoo. Su punto débil es el control de caducidades: permite lotes, pero no hemos encontrado fechas de caducidad ni asignación automática de lotes (FEFO), y un usuario del sector alimentario lo pide como mejora en el foro de Holded (F9). Las roturas de stock y las compras excesivas de perecederos son justo el problema del supermercado.

**¿Odoo permitiría cubrir mejor las necesidades de inventario y TPV?** Sí. En Odoo el TPV y el inventario son apps de la misma base de datos: cada venta descuenta stock, hay reglas de reposición, lotes con fechas de caducidad y alertas (F13, F51), y el módulo Veri*Factu tiene versión para el TPV (F20). Cubre los siete requisitos del enunciado sin módulos de terceros.

**Elección.** Recomendamos Odoo Enterprise Standard, con una implantación por fases (primero inventario, compras y TPV; después informes y contabilidad). La licencia cuesta casi lo mismo que la de Holded, y el sobrecoste está en la implantación inicial (unos 5.000 €, es decir, unos 1.000 € al año repartidos en 5 años). A cambio se resuelve el problema principal. Riesgos: hay que encontrar un partner que acepte un proyecto pequeño (F27, F28), y la app móvil nativa tiene valoraciones medias (F25). **Plan B:** si el supermercado no puede asumir la implantación, Holded con control manual de caducidades es una alternativa válida y casi igual de buena en la matriz. Si se cambiaran los pesos y se diera más importancia al coste que a la cobertura, Holded pasaría a ser la elegida; la matriz web permite comprobarlo.

## 4. Empresa 2: Reformas Levante

| Criterio (peso) | Odoo Enterprise | Holded | MS Dynamics 365 Business Central |
|:-|:-:|:-:|:-:|
| Cobertura funcional (30 %) | 3 (30,00) | 1 (10,00) | 2 (20,00) |
| Coste total de propiedad (TCO) a 5 años (25 %) | 2 (16,67) | 3 (25,00) | 2 (16,67) |
| Capacidad de integración (15 %) | 3 (15,00) | 2 (10,00) | 3 (15,00) |
| Facilidad de uso y app móvil (10 %) | 2 (6,67) | 3 (10,00) | 2 (6,67) |
| Adaptación a la normativa española (10 %) | 3 (10,00) | 3 (10,00) | 2 (6,67) |
| Partners y soporte técnico en la zona (10 %) | 3 (10,00) | 1 (3,33) | 3 (10,00) |
| **Total ponderado** | **88,33** | **68,33** | **75,00** |

Entre paréntesis, los puntos ponderados de cada celda.

### 4.1 Justificación de las puntuaciones

| ERP | Información encontrada | Criterio | Valoración | Fuentes |
|:-|:-|:-|:-:|:-|
| Odoo Enterprise | CRM, presupuestos, compras, inventario, proyectos, partes de horas y contabilidad analítica en una sola base de datos. Odoo ofrece una solución para contratistas de reforma (mano de obra y materiales por partida, márgenes en tiempo real) y un caso en España (Biecsa) que controla presupuestos por partidas y desviaciones. A validar en una demo: certificaciones y mediciones, donde existe un módulo de terceros con importación BC3. | Cobertura funcional | 3 | F15 |
| Holded | Tiene proyectos con fases, presupuesto por fase, horas, subcontratas y materiales, además de rentabilidad por proyecto (plan Standard o superior), CRM y compras. Pero no hemos encontrado contabilidad analítica por obra ni certificaciones o mediciones, el inventario es una gema de pago y está pensado para estudios de arquitectura, no para 15 a 20 obras a la vez. Cubre solo en parte. | Cobertura funcional | 1 | F1 |
| MS Dynamics 365 Business Central | El módulo de proyectos (Jobs) incluye presupuesto, recursos, partes de horas, compras, WIP y facturación por proyecto. Un partner (Davisa) indica que lo nativo basta con menos de 15 proyectos activos y un solo modelo de facturación; Reformas Levante tiene 15 a 20 y certificaciones, así que haría falta una vertical de obra. El CRM completo se resolvería con Dynamics 365 Sales. | Cobertura funcional | 2 | F36 |
| Odoo Enterprise | Plan Custom (44,90 €/usuario/mes, el que permite personalizar) por 25 usuarios son 67.350 € en 5 años. Se suman implantación de 25.000 € (extremo alto del rango por incluir personalización), módulo de obras (600 €), desarrollos (10.000 €), formación y soporte. Total estimado 120.950 €, 2,1 veces el más barato. Con el plan Standard bajaría a unos 91.000 €. | Coste total de propiedad (TCO) a 5 años | 2 | F21 |
| Holded | Plan Premium (229 €/mes, 15 usuarios) más 10 usuarios extra (precio estimado), inventario y soporte premium suman 27.240 € en 5 años. Hay que añadir una herramienta externa de control de obra y su integración para cubrir los huecos (27.000 €, estimación propia). Total estimado 58.740 €, el más bajo. | Coste total de propiedad (TCO) a 5 años | 3 | F1 |
| MS Dynamics 365 Business Central | 15 licencias Essentials (69,30 €) más 10 Team Member para jefes de obra (unos 6,93 €) suman 66.528 € en 5 años. Se añaden implantación de 40.000 € (punto medio del rango 20.000 a 60.000 €), vertical de obras (15.000 €, estimación), formación y soporte. Total estimado 145.528 €, 2,5 veces el más barato. | Coste total de propiedad (TCO) a 5 años | 2 | F30 |
| Odoo Enterprise | El flujo CRM, presupuesto, proyecto, compra, stock y factura funciona sin conectores porque es una sola base de datos. Para programas externos hay API y módulos de terceros (por ejemplo importación BC3 desde Presto o Arquímedes); los conectores concretos pueden costar de 249 a 499 $. | Capacidad de integración | 3 | F18 |
| Holded | API REST, webhooks y más de 200 integraciones, además de Zapier. Para conectar con programas de mediciones y presupuestos de obra (Presto, Arquímedes) no hemos encontrado una integración nativa, así que habría que desarrollarla. | Capacidad de integración | 2 | F8 |
| MS Dynamics 365 Business Central | Gran ecosistema: Microsoft 365, Power BI y Power Platform, Excel y Word integrados, y verticales de obra que importan BC3 desde Presto o Arquímedes (Davisa), con app de jefe de obra y fotos geolocalizadas. | Capacidad de integración | 3 | F38 |
| Odoo Enterprise | Interfaz moderna y partes de horas desde el móvil. La app nativa tiene limitaciones (3,2 sobre 5 en iOS) y Odoo recomienda la versión web progresiva. Los jefes de obra necesitarán formación. | Facilidad de uso y app móvil | 2 | F15 |
| Holded | Interfaz intuitiva (la mejor valorada entre los ERP españoles), poca formación y app móvil. La limitación es funcional (ya recogida en cobertura), no de uso. | Facilidad de uso y app móvil | 3 | F11 |
| MS Dynamics 365 Business Central | Interfaz familiar para usuarios de Microsoft 365 (la formación baja entre un 30 y un 50 % según un análisis), con apps móviles y verticales con app de jefe de obra. Más compleja de configurar que Holded. | Facilidad de uso y app móvil | 2 | F38 |
| Odoo Enterprise | Localización española completa (PGC, IVA, Facturae, SII) y módulo Veri*Factu en Enterprise. Con 6 M€ de facturación (menos de 8 M€), la factura electrónica entre empresas se exigiría desde octubre de 2028 según el calendario anunciado, que todavía necesita una norma con rango de ley. | Adaptación a la normativa española | 3 | F19 |
| Holded | Software español adaptado a Verifactu y facturación electrónica, mediante declaración responsable del fabricante. Valen las mismas fechas: octubre de 2028 si se aprueba el aplazamiento anunciado. | Adaptación a la normativa española | 3 | F31 |
| MS Dynamics 365 Business Central | Localización española nativa y Verifactu integrado, pero hay que activarlo y configurarlo, y la versión debe ser reciente. Un proveedor (Ecosire) afirma que falta en la base, mientras Microsoft Learn documenta el modo integrado; nos fiamos de Microsoft y lo verificaríamos con el partner. | Adaptación a la normativa española | 2 | F47 |
| Odoo Enterprise | Partners Gold en Valencia: Dynapps (de 26 a 100 consultores certificados, con sector construcción) y Punt Sistemes (Paterna). | Partners y soporte técnico en la zona | 3 | F27 |
| Holded | No hay red de implantadores de obra: sus partners son sobre todo asesorías. El soporte prioritario solo existe en planes altos y las reseñas critican la rapidez. Para necesidades especializadas, la ayuda local es escasa. | Partners y soporte técnico en la zona | 1 | F1 |
| MS Dynamics 365 Business Central | Red amplia en Valencia y Castellón (Datanet, que se presenta como la mayor consultora de la Comunidad Valenciana; Grupo Tecon en Paterna; Integra) y partners especializados en construcción (Davisa desde 2003, Arbentia), con soporte de Microsoft. | Partners y soporte técnico en la zona | 3 | F38 |

### 4.2 Cálculo del TCO a 5 años

Supuestos: 25 usuarios (15 de oficina y dirección, 10 jefes de obra). En Business Central, los 10 jefes de obra usan licencia Team Member, que permite partes de horas y consulta. En Odoo y Holded los 25 pagan licencia completa. El precio de los usuarios extra de Holded (15 €/mes) y los costes de verticales, desarrollos y soporte son estimaciones propias, editables en la matriz.

| Concepto | Importe | Periodicidad | Uds. | Coste a 5 años |
|:-|-:|:-:|:-:|-:|
| **Odoo Enterprise** | | | | |
| Licencia Odoo Enterprise Custom (44,90 €/usuario/mes) | 44,9 € | mes | 25 | 67.350 € |
| Implantación con partner (extremo alto del rango 5.000 a 25.000 €) | 25.000 € | único | 1 | 25.000 € |
| Módulos de terceros de obra: presupuestos, BC3 y mediciones (unos 142 $ cada uno, con margen para varios) | 600 € | único | 1 | 600 € |
| Desarrollos a medida: certificaciones e informes (estimación propia) | 10.000 € | único | 1 | 10.000 € |
| Formación (estimación propia) | 3000 € | único | 1 | 3.000 € |
| Soporte y mantenimiento del partner (estimación propia) | 3000 € | año | 1 | 15.000 € |
| Cubrir huecos funcionales | 0 € | único | 1 | 0 € |
| **Total Odoo Enterprise** | | | | **120.950 €** |
| **Holded** | | | | |
| Plan Premium (229 €/mes, 15 usuarios) | 229 € | mes | 1 | 13.740 € |
| Usuarios extra (10, a 15 €/mes: estimación propia) | 15 € | mes | 10 | 9.000 € |
| Gema Inventario (25 €/mes) | 25 € | mes | 1 | 1.500 € |
| Soporte premium (50 €/mes) | 50 € | mes | 1 | 3.000 € |
| Puesta en marcha (estimación propia) | 3000 € | único | 1 | 3.000 € |
| Formación (estimación propia) | 1500 € | único | 1 | 1.500 € |
| Cubrir huecos: herramienta externa de control de obra, licencia (estimación propia) | 200 € | mes | 1 | 12.000 € |
| Cubrir huecos: integración y adaptación de esa herramienta (estimación propia) | 15.000 € | único | 1 | 15.000 € |
| **Total Holded** | | | | **58.740 €** |
| **MS Dynamics 365 Business Central** | | | | |
| Licencia Business Central Essentials (69,30 €/usuario/mes) | 69,3 € | mes | 15 | 62.370 € |
| Licencia Team Member para jefes de obra (unos 6,93 €/usuario/mes) | 6,93 € | mes | 10 | 4.158 € |
| Implantación con partner (punto medio del rango 20.000 a 60.000 €) | 40.000 € | único | 1 | 40.000 € |
| Vertical de obras para certificaciones y BC3 (estimación propia) | 15.000 € | único | 1 | 15.000 € |
| Formación (estimación propia) | 4000 € | único | 1 | 4.000 € |
| Soporte y mantenimiento del partner (estimación propia) | 4000 € | año | 1 | 20.000 € |
| **Total MS Dynamics 365 Business Central** | | | | **145.528 €** |

Con la misma regla, Holded es el más barato (nota 3), Odoo cuesta 2,1 veces más (nota 2) y Business Central 2,5 veces más (nota 2). Con el plan Odoo Standard en lugar de Custom, el total bajaría a unos 91.000 € y la nota seguiría siendo 2.

### 4.3 Decisión final: Odoo Enterprise

Odoo obtiene 88,33 puntos, Business Central 75,00 y Holded 68,33.

**¿Es suficiente un ERP generalista como Odoo o Business Central?** Sí como base, con matices. Ambos cubren CRM, compras, inventario, proyectos, partes de horas y contabilidad analítica. Odoo lo hace en una sola base de datos y tiene una solución específica para contratistas de reforma (F15, F16) y un caso real en España que controla presupuestos por partidas y desviaciones (F17). Business Central tiene su módulo de proyectos (Jobs), pero según un partner la parte nativa basta con menos de 15 proyectos activos y un modelo de facturación, y Reformas Levante tiene 15 a 20 obras con certificaciones (F37, F38).

**¿Necesita la empresa un software especializado en gestión de obras?** No como sustituto del ERP, pero sí necesita una capa especializada para tres cosas: importar presupuestos y mediciones en formato BC3 (Presto, Arquímedes), certificaciones de obra y partidas con descompuestos. Esa capa existe como módulo sobre Odoo (F18) y como vertical sobre Business Central (F38). Un software de obras aislado, desconectado del ERP, reproduciría el problema actual: información repartida en varios sitios. Holded no llega: tiene proyectos por fases, pero no contabilidad analítica por obra ni certificaciones (F7), y habría que sumar una herramienta externa.

**¿Qué importancia tiene poder personalizar el ERP para la gestión de proyectos?** Mucha. Es el factor que más pesa en esta empresa: lo que la diferencia de otra reformista es cómo presupuesta (por partidas), cómo certifica y cómo reparte costes por obra. Por eso valoramos que el ERP sea personalizable por un partner y tenga un ecosistema de módulos. Odoo (con el plan Custom y módulos de terceros) y Business Central (con verticales de partners) lo permiten. Holded, pensado para no necesitar desarrollos, es el menos flexible. Personalizar tiene un coste y un riesgo de mantenimiento (las actualizaciones), que hemos incluido en el TCO.

**Elección.** Recomendamos Odoo Enterprise con un partner de la zona (Dynapps o Punt Sistemes, ambos Gold en Valencia, F27, F28) y una demo previa de certificaciones y BC3. Business Central es una alternativa muy válida (red de partners y verticales de obra más maduros, pero 20 % más caro en 5 años según nuestra estimación). Holded se descarta aunque sea el más barato, porque no cubre lo que más importa a la empresa: control de costes por obra.

## 5. Nota sobre las fechas de Verifactu

Las fuentes no coinciden, así que las hemos contrastado. El calendario aprobado en diciembre de 2025 fija el 1 de enero de 2027 para sociedades y el 1 de julio de 2027 para el resto. En octubre de 2026 Hacienda anunció un nuevo aplazamiento hasta octubre de 2028, que se alinea con la factura electrónica, pero todavía necesita una norma con rango de ley (F46, F47, F54). Algunas páginas de fabricantes (por ejemplo, el blog de Odoo, F19) siguen hablando de 2026 porque son anteriores. Ninguna de las decisiones depende de esa fecha, ya que los tres ERP indican estar adaptados o tener solución.

## 6. Herramientas utilizadas y comentarios sobre la IA

**Herramientas.** Hemos trabajado con un asistente de IA con búsqueda web (Claude) para localizar fuentes, comparar precios y resumir funcionalidades, y hemos contrastado los datos en las webs oficiales de cada producto (Holded, Odoo y Microsoft) y en fuentes independientes (comparadores, partners y prensa especializada). Las 54 fuentes están numeradas al final. Los apuntes de la UT1 han servido como marco (TCO a 5 años, localización española y lock-in).

**Recomendaciones o datos de la IA que hemos descartado o puesto en duda:**

1. **"Holded está homologado/certificado por la AEAT para Verifactu".** Es lo que dice la propia web de Holded (F5). La descartamos tal cual: la AEAT no homologa programas; cada fabricante firma una declaración responsable (F31). Por eso decimos "adaptado" y no "homologado".
2. **Precios que no coinciden.** La búsqueda devolvió Odoo a 31,10 USD, 24,90 € y 44,90 €, y Holded a 29/59/99 € y a 34/69/115/229 €. Descartamos los precios de EE. UU. y los antiguos, y usamos los de España y la página oficial de Holded (F1, F21, F22), aunque pueden cambiar. Esto afecta de forma directa al criterio de TCO.
3. **Fechas de Verifactu.** Varias respuestas decían que era obligatorio desde enero de 2026. Estaba desactualizado: ya habían pasado dos aplazamientos y en octubre de 2026 se anunció un tercero hasta octubre de 2028 (apartado 5).
4. **"Business Central no incluye Verifactu en la base".** Lo afirma un proveedor (Ecosire, F41) que vende su propia extensión, así que tiene un interés comercial. Microsoft Learn documenta un modo integrado (F39). Nos fiamos de Microsoft, pero lo dejamos como punto a verificar con el partner.
5. **Costes de implantación.** Los rangos (5.000 a 25.000 € Odoo, 20.000 a 60.000 € Business Central) proceden de un comparador (F33), no de un presupuesto real. Nos hemos preguntado si eran correctos y hemos probado qué pasa con otros valores: por ejemplo, con un paquete básico de 3.000 € en Business Central, el supermercado seguiría con una nota de TCO de 1.
6. **Funciones "nativas" de Odoo para obra.** Las páginas de Odoo y de sus partners presentan la solución de construcción como completa. Hemos puesto un 3 en cobertura, pero dejamos como validación pendiente (demo) las certificaciones y la importación BC3, que según los datos que encontramos las cubre un módulo de terceros (F18).

**Límites de este trabajo.** Los precios de usuarios extra de Holded, el TPV de tercero para Business Central, las verticales de obra, la formación y el soporte son estimaciones nuestras, marcadas como tales. La decisión real exigiría pedir presupuestos a partners.

## 7. Fuentes

- **F1** Holded, página oficial de precios. <https://www.holded.com/es/precios>
- **F2** Holded, software TPV. <https://www.holded.com/es/tpv-software>
- **F3** Holded, gema TPV (precio por tienda). <https://www.holded.com/es/gemas/tpv>
- **F8** Holded, integraciones (API REST y webhooks). <https://www.holded.com/en-us/integrations>
- **F9** Foro de mejoras de Holded: lotes y caducidades en alimentación. <https://feedback.holded.com/mejoras/p/que-cuando-se-sincronicen-pedidos-desde-e-commerce-pueda-descontar-stock-de-prod>
- **F11** Guía de Software, análisis de Holded. <https://www.guiadesoftware.com/software/holded>
- **F13** Odoo, solución para supermercados. <https://www.odoo.com/es_ES/industries/grocery-store>
- **F15** Odoo, solución para construcción. <https://www.odoo.com/es_ES/industries/construction>
- **F18** Odoo Apps, ES Presupuestos Obra (partidas, importación BC3 y mediciones). <https://apps.odoo.com/apps/modules/19.0/es_presupuestos_obra>
- **F19** Odoo, blog sobre Veri*Factu. <https://www.odoo.com/blog/business-hacks-1/verifactu-system-in-spain-1464>
- **F21** Softabase, precios reales de Odoo en España. <https://softabase.com/es/guides/odoo-community-vs-enterprise-vs-cloud-pricing>
- **F22** Softabase, ficha de Odoo (precios de octubre de 2026). <https://softabase.com/es/software/erp/odoo>
- **F27** ERP Research, Dynapps (Odoo Gold Partner, Valencia). <https://erpresearch.com/odoo-partners/dynapps-es-sl>
- **F30** Microsoft, precios de Business Central (España). <https://www.microsoft.com/es-es/dynamics-365/products/business-central/pricing>
- **F31** Hackceleration, software Verifactu para pymes (Business Central 69,30 €). <https://hackceleration.com/labs/best/verifactu-software-smes-spain>
- **F32** MS Dynamics World, Essentials frente a Premium (80, 110 y 8 USD). <https://msdynamicsworld.com/node/39442>
- **F33** Ecosistema Startup, ERP para pymes 2026 (rangos de implantación de Comparasoft). <https://ecosistemastartup.com/?p=119532>
- **F34** Ecosire, TPV retail para Business Central (no es nativo). <https://ecosire.com/es/apps/dynamics-365-business-central/d365-retail-pos>
- **F36** Gestisoft, proyectos (Jobs) en Business Central. <https://www.gestisoft.com/en/blog/projects-business-central>
- **F38** Davisa, ERP para construcción sobre Business Central. <https://davisa.es/en/blog/best-construction-erp-business-central/>
- **F39** Microsoft Learn, VERI*FACTU en Business Central. <https://learn.microsoft.com/en-us/dynamics365/business-central/localfunctionality/spain/enable-real-time-invoice-reporting>
- **F42** Softabase, ficha de Business Central. <https://softabase.com/es/software/erp/dynamics-365-business-central>
- **F43** SoftDoit, partners de Dynamics 365 en España. <https://www.softwaredoit.es/partners-microsoft-dynamics/index.html>
- **F45** Datanet Consultores (Valencia). <https://proveedores.com/proveedores/datanet-consultores/>
- **F47** Emprendedores, Verifactu se aplaza hasta octubre de 2028. <https://emprendedores.es/gestion/aplazamiento-verifactu-2028/>
- **F52** LS Retail, LS Central: TPV y retail sobre Business Central. <https://www.lsretail.com/products/ls-central>

