(() => {
    const canvas = document.getElementById("canvasMove");
    const ctx = canvas.getContext("2d");
    const window_height = 300;
    const window_width = canvas.parentElement.clientWidth;
    canvas.height = window_height;
    canvas.width = window_width;

    class Circle {
        constructor(x, y, radius, color, text, speed) {
            this.posX = x; this.posY = y;
            this.radius = radius; this.color = color;
            this.text = text; this.speed = speed;
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
    window.initFase1 = (count) => {
        circles = [];
        for (let i = 0; i < count; i++) {
            let radius = Math.random() * 15 + 10;
            let x = Math.random() * (window_width - 2 * radius) + radius;
            let y = Math.random() * (window_height - 2 * radius) + radius;
            circles.push(new Circle(x, y, radius, "#ff4444", i + 1, 3));
        }
    };

    function updateAnim() {
        requestAnimationFrame(updateAnim);
        ctx.clearRect(0, 0, window_width, window_height);
        circles.forEach(circle => circle.update(ctx));
    }
    window.initFase1(10);
    updateAnim();
})();