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
    startDelay: 500, // Delay before starting the fill (ms)
    fillTime: 2000, // Time to complete the fill (ms)
    strokeColor: '#ff0000', // Color of the stroke
    strokeWidth: 8, // Width of the stroke (px)
    radius: 40, // Radius of the circle (px)
    callback: function() { console.log('Completed!'); } // Callback function
});
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