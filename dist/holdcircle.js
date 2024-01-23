(() => {
  // src/HoldCircle.js
  var HoldCircle = class {
    constructor(options = {}) {
      this.startDelay = options.startDelay || 500;
      this.fillTime = options.fillTime || 2e3;
      this.strokeColor = options.strokeColor || "#00ff00";
      this.fillColor = options.fillColor || null;
      this.strokeWidth = options.strokeWidth || 5;
      this.radius = options.radius || 30;
      this.callback = options.callback || function() {
      };
      this.global = options.global || false;
      this.easingFunction = options.easingFunction || function(t) {
        return t;
      };
      this.timeoutId = null;
      this.intervalId = null;
      this.progress = 0;
      this.initCanvas();
      this.attachEventListeners();
    }
    initCanvas() {
      this.canvas = document.createElement("canvas");
      this.canvas.style.position = "fixed";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.margin = "0";
      this.canvas.style.padding = "0";
      this.canvas.style.border = "none";
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d");
      this.resizeCanvas();
      window.addEventListener("resize", () => this.resizeCanvas());
    }
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    attachEventListeners() {
      const eventListenerTarget = this.global ? document : document.querySelectorAll("[data-holdcircle]");
      const addListeners = (element) => {
        element.addEventListener("mousedown", (event) => {
          const target = event.target;
          const strokeColor = target.getAttribute("data-holdcircle-color") || this.strokeColor;
          const fillColor = target.getAttribute("data-holdcircle-fill") || this.fillColor;
          this.timeoutId = setTimeout(() => this.startFill(event.clientX, event.clientY, strokeColor, fillColor), this.startDelay);
        });
        element.addEventListener("mouseup", () => {
          clearTimeout(this.timeoutId);
          clearInterval(this.intervalId);
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          if (this.progress >= 100) {
            this.callback();
          }
          this.progress = 0;
        });
      };
      if (this.global) {
        addListeners(eventListenerTarget);
      } else {
        eventListenerTarget.forEach(addListeners);
      }
    }
    startFill(x, y, strokeColor, fillColor) {
      this.centerX = x;
      this.centerY = y;
      this.currentStrokeColor = strokeColor;
      this.currentFillColor = fillColor;
      this.progress = 0;
      this.intervalId = setInterval(() => this.updateFill(), this.fillTime / 100);
    }
    updateFill() {
      this.progress += 1;
      if (this.progress > 100) {
        clearInterval(this.intervalId);
        this.progress = 100;
      } else {
        this.drawCircle();
      }
    }
    drawCircle() {
      const easedProgress = this.easingFunction(this.progress / 100) * 100;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI * (easedProgress / 100));
      if (this.currentFillColor) {
        this.ctx.fillStyle = this.currentFillColor;
        this.ctx.fill();
      }
      this.ctx.strokeStyle = this.currentStrokeColor;
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.lineCap = "round";
      this.ctx.stroke();
    }
  };
  var holdCircle = new HoldCircle({
    startDelay: 500,
    fillTime: 1e3,
    strokeColor: "#ff0000",
    fillColor: "rgba(255, 0, 0, 0.1)",
    strokeWidth: 5,
    radius: 25,
    global: false,
    // Set to true for global, false for data-holdcircle elements
    easingFunction: (t) => t * (2 - t),
    // Example ease-out quadratic
    callback: function() {
      alert("Hold circle complete!");
    }
  });
})();
