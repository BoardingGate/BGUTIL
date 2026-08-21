# ⚡ BoardingGate — Ecosistema Tesla & Suite de Eficiencia VE

<p align="center">
  <img src="https://img.shields.io/badge/Tesla-In--Car%20Ready-E82127?style=for-the-badge&logo=tesla&logoColor=white" alt="Tesla Ready" />
  <img src="https://img.shields.io/badge/React%2018-SPA-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Three.js-3D%20Graphics-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Responsive-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zero_Install-Single_File-4CAF50?style=for-the-badge" alt="Zero Dependencies" />
</p>

<p align="center">
  <b>BoardingGate</b> es una navaja suiza de herramientas analíticas, simuladores físicos en 3D y calculadoras financieras diseñadas específicamente para propietarios y futuros compradores de vehículos eléctricos (con foco especial en el ecosistema <b>Tesla Model 3, Model Y, Model S y Model X</b>).
</p>

<p align="center">
  <a href="#-módulos-y-herramientas">Módulos</a> •
  <a href="#-compatibilidad-con-el-navegador-tesla">Navegador Tesla</a> •
  <a href="#-stack-tecnológico">Tecnología</a> •
  <a href="#-despliegue-y-uso-local">Uso Local</a> •
  <a href="#-privacidad-y-datos">Privacidad</a>
</p>

---

## 🚀 Módulos y Herramientas

La aplicación está dividida en submódulos especializados accesibles mediante pestañas reactivas:

### 🔋 1. Carga, Batería y Longevidad
* **Estrategia Carga (`strategy`):** Planificador semanal de carga por horas valle, objetivo diario de SoC (%), matriz energética interactiva en **3D**, cálculo de calibración profunda BMS (LFP) y estimador de desgaste en ciclos de vida (proyección a 1.500 y 3.000 ciclos).
* **Curva de Carga (`curve`):** Simulación de curvas de potencia en continua (DC) para químicas **LFP** y **NCA/NMC**, renderizado 3D de celda de energía y optimizador de paradas por tiempo disponible o autonomía deseada.
* **Calculadora & Finanzas (`calculator`):** Sesiones de carga rápida, costes mensuales de servicios/conectividad y **Calculadora de Interés Compuesto** con ajuste de inflación en tiempo real.
* **Drenaje Vampírico (`drain`):** Estimación de pérdida de batería en reposo según temperatura exterior, estacionamiento (garaje/calle), preacondicionamiento, consultas de app y modo Centinela con umbral de desconexión.
* **Equivalencias (`equiv`):** Conversor dinámico entre Potencia (kW), Voltaje/Amperaje, velocidad de carga (km/min) y coste económico.

---

### 💡 2. Electricidad, Tarifas y Energía Solar
* **Comparador de Tarifas Eléctricas (`tariff`):** Comparativa simultánea de hasta **6 propuestas de tarifas** (2.0TD / indexadas / tramos P1-P4 + VE), cálculo de compensación de excedentes, batería virtual, exportación/impresión de informes y estimador de consumo para aerotermia/periféricos.
* **Autoconsumo Solar (`solar`):** Dimensionamiento fotovoltaico, cálculo de horas solar pico (HSP) según latitud/orientación (acimut), balance energético estacional y priorización de carga solar directa al VE frente a la vivienda.

---

### 🚘 3. Física, Neumáticos e ITV
* **Simulador de Consumo & Dinámica (`simulator`):** Motor físico que modela resistencia a la rodadura ($C_r$), coeficiente aerodinámico ($C_d \cdot A$), viento relativo (a favor/en contra), temperatura y pendiente. Incluye:
  * Comparador de ahorro directo y huella de carbono ($CO_2$) vs vehículo térmico.
  * **Simulador S3XY:** Pérdidas/ganancias por regeneración vs modo vela.
  * **Laboratorio de Seguridad Vial:** Distancia de detención por adherencia, capacidad de giro evasivo (Ackermann), baremo de sanciones DGT y lesividad según velocidad.
* **Laboratorio de Presiones (`tirelab`):** Efecto de la temperatura en la presión del aire/nitrógeno (Ley de Gay-Lussac), manómetro digital y neumático 3D con visualización de deformación y desgaste por sobrepresión/subpresión.
* **Rotación de Neumáticos (`rotation`):** Guía de rotación según tipo de tracción (RWD/AWD), doble medida (*staggered*) o neumáticos direccionales, con animación 3D del chasis y control de desgaste de banda.
* **Calculadora de Llantas (`wheels`):** Comparador de medidas (18" a 21"), efecto de los tapacubos (*Aero Caps*), variación de consumo WLTP y desviación de velocímetro.
* **Guía ITV & Mantenimiento (`itv`):** Calendario oficial de inspecciones, localización del VIN troquelado en chasis, activación del modo freno/remolque para rodillos y checklist preventivo.

---

### 📑 4. Gestión, Compra y Vehículo
* **TCO Amortización VE vs Térmico (`amortization`):** Análisis de Coste Total de Propiedad proyectado a $N$ años con gráficos interactivos por capas (coste base, energía, mantenimiento y valor residual).
* **Renting vs Propiedad (`renting`):** Comparativa económica entre compra y contratos de renting/leasing encadenados, calculando el precio de venta de equilibrio.
* **Decodificador VIN Pro (`vin`):** Decodificación del número de bastidor (17 caracteres) para identificar fábrica de ensamblaje, química de batería, tipo de motor y procesador (Intel vs AMD Ryzen).
* **Checklist de Entrega (`pickup`):** Lista de verificación interactiva paso a paso para el día de recogida en el Delivery Center, categorizando defectos y generando un resumen para el Tesla Advisor.
* **Manuales y DIY (`manuals`):** Enlaces directos a los manuales oficiales de servicio, guías "Hazlo tú mismo" y recambios para Model 3, Model Y, Model S y Model X.
* **Desafío Bjørn Nyland (`nyland`):** Comparador de estrategias de viaje en ruta (velocidad alta con paradas frecuentes cortas vs velocidad moderada y paradas largas).

---

## 🖥️ Compatibilidad con el Navegador Tesla

La aplicación cuenta con optimizaciones nativas para la pantalla de los vehículos Tesla:
* **Detección automática de resolución:** Ajuste dinámico de escala y zoom (`document.documentElement.style.zoom`) para la resolución nativa de `1254x784` del navegador de abordo.
* **Manejo de teclado en pantalla:** Desplazamiento inteligente (`scrollToSafeZone`) para evitar que el teclado táctil de la MCU oculte los campos de entrada.
* **Rendimiento optimizado:** Renderizado 3D ligero mediante WebGL (Three.js) con bajo consumo de memoria y CPU.

---

## 🛠️ Stack Tecnológico

* **Core:** [React 18](https://react.dev/) (Client-Side vía CDN sin necesidad de Node/Webpack).
* **Compilación en runtime:** [Babel Standalone](https://babeljs.io/).
* **Estilos & UI:** [Tailwind CSS CDN](https://tailwindcss.com/) + Tipografías *Orbitron* & *Inter*.
* **Gráficos 3D:** [Three.js (r128)](https://threejs.org/).
* **Arquitectura:** **Zero-Build / Single File HTML** (Todo el código reside en `index.html`).

---

## 📦 Despliegue y Uso Local

No requiere `npm install`, `node_modules` ni proceso de *build*.

### Opción 1: Ejecución Local
1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/boardinggate.git
   cd boardinggate
