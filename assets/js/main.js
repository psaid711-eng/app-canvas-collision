(() => {
    const canvas = document.getElementById("canvasMove");
    const ctx = canvas.getContext("2d");

    const window_height = 350;
    const window_width = canvas.parentElement.clientWidth;

    canvas.height = window_height;
    canvas.width = window_width;

    let mouseX = 0;
    let mouseY = 0;

    let total = 0;
    let eliminados = 0;
    let nivel = 1;
    let velocidadBase = 0.5;

    // =============================
    // EVENTOS
    // =============================
    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        circles.forEach(c => {
            if (c.isInside(clickX, clickY) && !c.eliminado) {
                c.fade = true;
            }
        });
    });

    // =============================
    // CLASE CIRCLE
    // =============================
    class Circle {
        constructor(x, y, radius, text) {
            this.posX = x;
            this.posY = y;
            this.radius = radius;

            this.baseColor = "#ff4444";
            this.color = this.baseColor;

            this.text = text;

            this.dx = (Math.random() - 0.5) * 2;
            this.dy = -(Math.random() * velocidadBase + 0.2);

            this.opacity = 1;
            this.fade = false;
            this.eliminado = false;
        }

        draw(context) {
            if (this.eliminado) return;

            context.save();
            context.globalAlpha = this.opacity;

            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            context.fill();
            context.closePath();

            context.fillStyle = "#ffffff";
            context.font = "bold 12px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(this.text, this.posX, this.posY);

            context.restore();
        }

        isInside(mx, my) {
            const dx = mx - this.posX;
            const dy = my - this.posY;
            return Math.sqrt(dx * dx + dy * dy) < this.radius;
        }

        update(context) {
            if (this.eliminado) return;

            // Movimiento vertical (abajo → arriba)
            this.posY += this.dy;

            // Movimiento horizontal aleatorio
            this.posX += this.dx;
            this.dx += (Math.random() - 0.5) * 0.1;

            // Hover → cambio de color
            if (this.isInside(mouseX, mouseY)) {
                this.color = "#00ffcc";
            } else {
                this.color = this.baseColor;
            }

            // Fade al hacer clic
            if (this.fade) {
                this.opacity -= 0.05;

                if (this.opacity <= 0) {
                    this.opacity = 0;
                    this.eliminado = true;
                    eliminados++;
                }
            }

            this.draw(context);
        }
    }

    // =============================
    // CREAR OBJETOS
    // =============================
    let circles = [];

    window.initFase1 = (count) => {
        circles = [];
        total = count;
        eliminados = 0;
        nivel = 1;
        velocidadBase = 0.5;

        crearCirculos();
    };

    function crearCirculos() {
        circles = [];

        for (let i = 0; i < total; i++) {
            let radius = 12;
            let x = Math.random() * window_width;
            let y = window_height + Math.random() * 100;

            circles.push(new Circle(x, y, radius, i + 1));
        }
    }

    // =============================
    // NIVELES
    // =============================
    function updateNivel() {
        if (eliminados >= 10) {
            nivel++;

            // Aumenta velocidad
            velocidadBase += 0.3;

            // Reinicia contador del nivel
            eliminados = 0;

            // Reinicia objetos
            crearCirculos();
        }
    }

    // =============================
    // ESTADÍSTICAS
    // =============================
    function drawStats() {
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Arial";

        let porcentaje = total > 0
            ? ((eliminados / 10) * 100).toFixed(1)
            : 0;

        ctx.fillText(`Nivel: ${nivel}`, 10, 20);
        ctx.fillText(`Eliminados (nivel): ${eliminados}/10`, 10, 40);
        ctx.fillText(`Progreso: ${porcentaje}%`, 10, 60);
    }

    // =============================
    // ANIMACIÓN
    // =============================
    function updateAnim() {
        requestAnimationFrame(updateAnim);
        ctx.clearRect(0, 0, window_width, window_height);

        updateNivel();

        circles.forEach(c => c.update(ctx));

        drawStats();
    }

    // Inicialización
    window.initFase1(10);
    updateAnim();
})();