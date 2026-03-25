# 🔴 Colisión de Objetos en Canvas

Este proyecto es una suite de simulaciones interactivas desarrolladas con **HTML5 Canvas** y **JavaScript**, que ilustran la progresión desde el movimiento básico hasta la física de rebote elástico.

**Desarrollado por:** Pedro Said Otero (2026)

---

## 🚀 Fases del Proyecto

La simulación se divide en tres niveles de complejidad técnica, visualizados simultáneamente en el panel principal:

### 1. Fase 01: Movimiento Simple (`main.js`)
* **Concepto:** Implementación de cinemática básica.
* **Funcionalidad:** Los objetos se desplazan por el lienzo y rebotan exclusivamente contra los bordes (paredes) del canvas, invirtiendo su vector de velocidad al tocar los límites.

### 2. Fase 02: Contacto y Detección (`main_colision.js`)
* **Concepto:** Detección de colisiones circulares.
* **Funcionalidad:** Utiliza la fórmula de distancia entre dos puntos para detectar superposición. Al ocurrir el contacto, los objetos cambian visualmente de **Rojo a Amarillo**, permitiendo ver el área de intersección.

### 3. Fase 03: Física Real y Rebote (`main_rebote.js`)
* **Concepto:** Resolución de colisiones elásticas y vectores normales.
* **Funcionalidad:** * **Intercambio de Momentum:** Los objetos rebotan entre sí calculando vectores normales y tangenciales.
    * **Anti-solapamiento:** Incluye lógica para separar círculos que quedan atrapados uno dentro de otro.
    * **Feedback Visual:** Cambio de color dinámico al impacto (**Rojo a Blanco**).

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 & Canvas API:** Renderizado de gráficos 2D.
* **JavaScript (ES6+):** Lógica orientada a objetos para el manejo de partículas.
* **Bootstrap 5:** Estructura de rejilla responsiva.
* **CSS Moderno:** Diseño oscuro con variables personalizadas y efectos de transición.

---

## 🎮 Características Interactivas

* **Sincronizador Global:** Panel de control con `input range` para ajustar la cantidad de círculos (1 a 50) en tiempo real en las tres fases.
* **Interfaz Adaptativa:** Diseño responsivo que ajusta los lienzos según el tamaño de la pantalla.

---
