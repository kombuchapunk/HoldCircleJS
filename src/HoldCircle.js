class HoldCircle {
    constructor(options = {}) {
        this.startDelay = options.startDelay || 500;
        this.fillTime = options.fillTime || 2000;
        this.strokeColor = options.strokeColor || '#00ff00';
        this.fillColor = options.fillColor || null;
        this.strokeWidth = options.strokeWidth || 5;
        this.radius = options.radius || 30;
        this.callback = options.callback || function() {};
        this.global = options.global || false; // true for entire page, false for specific elements
        this.elClass = options.elClass || ''; // New option for specifying class
        this.ignoreClass = options.ignoreClass || []; // New option for specifying an ignore class
        this.easingFunction = options.easingFunction || function(t) { return t; }; // Linear by default
        this.text = options.text || '';
        this.textClass = options.textClass || '';

        this.timeoutId = null;
        this.intervalId = null;
        this.progress = 0;

        this.initCanvas();
        this.attachEventListeners();
    }

    initCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';  // Changed from 'absolute' to 'fixed'
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.margin = '0';
        this.canvas.style.padding = '0';
        this.canvas.style.border = 'none';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    attachEventListeners() {
        let eventListenerTarget;

        if (this.global) {
            eventListenerTarget = document;
        } else if (this.elClass) {
            eventListenerTarget = document.querySelectorAll(`.${this.elClass}[data-holdcircle]`);
        } else {
            eventListenerTarget = document.querySelectorAll('[data-holdcircle]');
        }

        const addListeners = (element) => {
            // Mouse events
            element.addEventListener('mousedown', (event) => this.handleStart(event, event.clientX, event.clientY));
            element.addEventListener('mouseup', () => this.handleEnd());

            // Touch events
            element.addEventListener('touchstart', (event) => {
                const touch = event.touches[0];
                this.handleStart(event, touch.clientX, touch.clientY);
            }, { passive: true });
            element.addEventListener('touchend', () => this.handleEnd(), { passive: true });
        };

        if (this.global) {
            addListeners(eventListenerTarget);
        } else {
            eventListenerTarget.forEach(addListeners);
        }
    }

    handleStart(event, x, y) {
        const target = event.target;

        // Check if the clicked element or any of its parents have any of the ignore classes
        if (this.ignoreClass.some(className => target.closest(`.${className}`))) {
            return; // Do not proceed if any ignore class is found
        }

        // Check for data attributes on the clicked element
        const strokeColor = target.getAttribute('data-holdcircle-color') || this.strokeColor;
        const fillColor = target.getAttribute('data-holdcircle-fill') || this.fillColor;

        this.timeoutId = setTimeout(() => this.startFill(x, y, strokeColor, fillColor), this.startDelay);
    }

    handleEnd() {
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.progress = 0;
    }

    startFill(x, y, strokeColor, fillColor) {
        this.centerX = x;
        this.centerY = y;
        this.currentStrokeColor = strokeColor; // Use specific or default stroke color
        this.currentFillColor = fillColor; // Use specific or default fill color
        this.progress = 0;
        this.intervalId = setInterval(() => this.updateFill(), this.fillTime / 100);
    }

    updateFill() {
        this.progress += 1;
        if (this.progress > 100) {
            clearInterval(this.intervalId);
            this.progress = 100;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.callback(); // Call the callback function when animation is complete
        } else {
            this.drawCircle();
        }
    }

    drawCircle() {
        const easedProgress = this.easingFunction(this.progress / 100) * 100;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Drawing the circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI * (easedProgress / 100));
        if (this.currentFillColor) {
            this.ctx.fillStyle = this.currentFillColor;
            this.ctx.fill();
        }
        this.ctx.strokeStyle = this.currentStrokeColor;
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.shadowBlur = 1; // Anti-aliasing for smoother circle
        this.ctx.stroke();

        // Drawing the text
        if (this.text) {
            this.ctx.font = this.getFontStyle(this.textClass); // Get font style based on class
            this.ctx.fillStyle = this.currentStrokeColor; // Use stroke color for text
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.text, this.centerX, this.centerY);
        }
    }

    getFontStyle(className) {
        // Extract font style from class
        // This is a basic implementation. Adjust as needed based on your CSS.
        if (className === 'large') {
            return '14px Syne'; // Example for 'large' class
        }
        // Add more conditions for other classes
        return '9px Syne'; // Default font
    }

}

window.HoldCircle = HoldCircle;