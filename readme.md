![HoldCircleJS Logo](https://holdcirclejs.web.app/logo.jpg)

# HoldCircleJS

HoldCircleJS is a lightweight, vanilla JavaScript library designed to create interactive radial progress indicators. Inspired by the bold and raw aesthetic of Neobrutalism, HoldCircleJS offers a unique and engaging way to display progress for user actions like click-and-hold.

## Features

- Customizable start delay and fill time
- Adjustable stroke color and width
- Configurable radius size
- Callback function support
- Option to activate on specific elements or the entire page
- Data attributes for element-specific customization

## Installation

Install HoldCircleJS using npm:

```bash
npm install holdcirclejs
```

## Usage

Import HoldCircleJS and initialize it with desired options:

```js
import HoldCircle from 'holdcirclejs';

const holdCircle = new HoldCircle({
    startDelay: 500, // Delay before starting the fill (milliseconds)
    fillTime: 2000, // Time to complete the fill (milliseconds)
    strokeColor: '#ff0000', // Color of the stroke
    fillColor: 'rgba(255, 0, 0, 0.5)', // Fill color inside the circle (optional)
    strokeWidth: 8, // Width of the stroke (pixels)
    radius: 40, // Radius of the circle (pixels)
    global: false, // True for entire page, false for elements with data-holdcircle attribute
    elClass: 'custom-class', // Class name to target specific elements (optional)
    ignoreClass: ['ignore-me'], // Array of class names to ignore (optional)
    text: 'Loading', // Text to display inside the circle (optional)
    textClass: 'text-style', // Class name for text styling (optional)
    easingFunction: (t) => t * (2 - t), // Custom easing function (optional)
    callback: function() { console.log('Completed!'); } // Callback function to execute when the fill is complete
});
```

## Advanced example

```html

    <!-- Button 1 - Alert callback -->
    <button class="nb-button green rounded hold-circle-alert" data-holdcircle data-holdcircle-color="#40d39c" data-holdcircle-fill="rgba(0,0,0,0)">Hold me to see what I do</button>
    
    <!-- Button 2: Modal callback -->
    <button class="nb-button sky-blue rounded hold-circle-modal" data-holdcircle data-holdcircle-color="#0077b6" data-holdcircle-fill="rgba(0,119,182,0.25)">Hold me to see what I do</button>

    <!-- Example 3: GLOBAL with custom color -->
    <button class="nb-button pale-red rounded" data-holdcircle data-holdcircle-color="#ff5733">Hold me</button>

    <script>
        const addToClipboard = () => {
            navigator.clipboard.writeText("I love HoldCircleJS! :)");
        }

        const openModal = () => {
            addToClipboard();
            document.querySelector('#modal').checked = true;
        }

        const showAlert = () => {
            document.querySelector('.alert.fixed-bottom').classList.add('show');
            setTimeout(() => {
                document.querySelector('.alert.fixed-bottom').classList.remove('show');
            }, 3000)
        }

        // HoldCircle with a callback
        const holdCircleModal = new HoldCircle({
            startDelay: 500,
            fillTime: 750,
            strokeColor: '#ff0000',
            fillColor: 'rgba(255, 0, 0, 0.1)',
            strokeWidth: 6,
            radius: 32,
            elClass: "hold-circle-modal",
            global: false, 
            easingFunction: (t) => t * (2 - t), // Example ease-out quadratic
            callback: openModal
        });

        // HoldCircle with another callback
        const holdCircleAlert = new HoldCircle({
            startDelay: 500,
            fillTime: 750,
            strokeColor: '#ff0000',
            fillColor: 'rgba(255, 0, 0, 0.1)',
            strokeWidth: 6,
            radius: 32,
            elClass: "hold-circle-alert",
            global: false, 
            easingFunction: (t) => t * (2 - t), // Example ease-out quadratic
            callback: showAlert
        });

        // Global HoldCircle with ignores
        const holdCircleGlobal = new HoldCircle({
            startDelay: 500,
            fillTime: 750,
            strokeColor: '#fdfd96',
            fillColor: '#ffc5c8',
            strokeWidth: 10,
            radius: 50,
            global: true, 
            ignoreClass: ["hold-circle-alert", "hold-circle-modal"], // Make sure to ignore the classes attached to the other HoldCircle instances to avoid multiple HoldCircle instances appear at once
            text: ":)",
            easingFunction: (t) => t * (2 - t), // Example ease-out quadratic
        });
    </script>
```

## Configuration Options

HoldCircleJS can be customized with the following options:

**startDelay (number):** Time in milliseconds before starting the fill (default: 500)
**fillTime (number):** Time in milliseconds to complete the fill (default: 2000)
**strokeColor (string):** HEX color of the stroke (default: '#00ff00')
**strokeWidth (number):** Width of the stroke in pixels (default: 5)
**radius (number):** Radius of the circle in pixels (default: 30)
**callback (function):** Function to be called when the progress completes

## Element-Specific Customization

Use **data-holdcircle-color** and **data-holdcircle-fill** attributes on HTML elements to customize the stroke and fill colors:

```html
<button data-holdcircle data-holdcircle-color="#40d39c" data-holdcircle-fill="rgba(0,0,0,0)">Click me</button>
```

## License

HoldCircleJS is MIT licensed.