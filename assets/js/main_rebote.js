(() => {
    const canvas = document.getElementById("canvasBounce");
    const ctx = canvas.getContext("2d");
    const window_height = 300;
    const window_width = canvas.parentElement.clientWidth;
    canvas.height = window_height;
    canvas.width = window_width;

    class Circle {
        constructor(x, y, radius, color, text, speed) {
            this.posX = x; this.posY = y;
            this.radius = radius;
            this.baseColor = color; this.color = color;
            this.text = text;
            this.dx = (Math.random() - 0.5) * speed * 2;
            this.dy = (Math.random() - 0.5) * speed * 2;
        }
        draw(context) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            context.fill();
            context.strokeStyle = "#ffffff";
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
            context.fillStyle = "#ffffff";
            context.font = "bold 14px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(this.text, this.posX, this.posY);
        }
        update(context) {
            if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) this.dx = -this.dx;
            if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) this.dy = -this.dy;
            this.posX += this.dx;
            this.posY += this.dy;
            this.draw(context);
        }
    }

    let circles = [];
    window.initFase3 = (count) => {
        circles = [];
        for (let i = 0; i < count; i++) {
            let radius = 15;
            let x = Math.random() * (window_width - 2 * radius) + radius;
            let y = Math.random() * (window_height - 2 * radius) + radius;
            // Círculos ROJOS por defecto
            circles.push(new Circle(x, y, radius, "#ff4444", i + 1, 2));
        }
    };

    function detectCollisions() {
        circles.forEach(c => c.color = c.baseColor);
        for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {
                let dx = circles[j].posX - circles[i].posX;
                let dy = circles[j].posY - circles[i].posY;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= circles[i].radius + circles[j].radius) {
                    // Cambian a BLANCO al rebotar
                    circles[i].color = "#ffffff";
                    circles[j].color = "#ffffff";

                    let nx = dx / distance;
                    let ny = dy / distance;
                    let tx = -ny;
                    let ty = nx;

                    let v1n = nx * circles[i].dx + ny * circles[i].dy;
                    let v1t = tx * circles[i].dx + ty * circles[i].dy;
                    let v2n = nx * circles[j].dx + ny * circles[j].dy;
                    let v2t = tx * circles[j].dx + ty * circles[j].dy;

                    let temp = v1n; v1n = v2n; v2n = temp;

                    circles[i].dx = tx * v1t + nx * v1n;
                    circles[i].dy = ty * v1t + ny * v1n;
                    circles[j].dx = tx * v2t + nx * v2n;
                    circles[j].dy = ty * v2t + ny * v2n;

                    let overlap = (circles[i].radius + circles[j].radius - distance) / 2;
                    circles[i].posX -= overlap * nx;
                    circles[i].posY -= overlap * ny;
                    circles[j].posX += overlap * nx;
                    circles[j].posY += overlap * ny;
                }
            }
        }
    }

    function updateAnim() {
        requestAnimationFrame(updateAnim);
        ctx.clearRect(0, 0, window_width, window_height);
        detectCollisions();
        circles.forEach(circle => circle.update(ctx));
    }
    window.initFase3(10);
    updateAnim();
})();