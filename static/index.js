"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("daform");

/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("daaddress");

/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("dasearchengine");

/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");

/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

// Create a loading div
const loadingDiv = document.createElement('div');
loadingDiv.id = "loadingDiv";
loadingDiv.innerHTML = `
   <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: black;
        }
        canvas {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
        h1 {
            text-align: center;
            position: relative;
            top: 120px;
            color: grey;
            font-family: Arial, sans-serif;
            font-size: 70px;
            z-index: 1;
        }
    </style>
</head>
<body>
    <h1>Loading...</h1>
    <canvas id="animationCanvas"></canvas>
    <script>
        // Get the canvas element and its context
        const canvas = document.getElementById('animationCanvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions to full window size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Initial resize to set canvas size
        resizeCanvas();

        // Define the trail object with properties
        let trailObject = {
            x: canvas.width / 2,        // Initial x-coordinate at center of canvas
            y: canvas.height / 2,       // Initial y-coordinate at center of canvas
            dx: 5,                      // Horizontal velocity
            dy: 4,                      // Vertical velocity
            trail: [],                  // Array to store trail positions
            trailMaxLength: 50,         // Maximum length of the trail
        };

        // Function to draw the trail
        function drawTrail() {
            ctx.beginPath();
            for (let i = 0; i < trailObject.trail.length; i++) {
                const position = trailObject.trail[i];
                const alpha = (i + 1) / trailObject.trail.length;  // Create a fading effect
                ctx.fillStyle = `rgba(128, 128, 128, ${alpha * 0.5})`; // Grey color with transparency
                ctx.beginPath();
                ctx.arc(position.x, position.y, 20, 0, Math.PI * 2, false);
                ctx.fill();
            }
            ctx.closePath();
        }

        // Function to update the position and handle boundary collision
        function updatePosition() {
            if (trailObject.x + 20 > canvas.width || trailObject.x - 20 < 0) {
                trailObject.dx = -trailObject.dx;
            }
            if (trailObject.y + 20 > canvas.height || trailObject.y - 20 < 0) {
                trailObject.dy = -trailObject.dy;
            }
            trailObject.x += trailObject.dx;
            trailObject.y += trailObject.dy;
        }

        // Function to animate the trail
        function animateTrail() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
            updatePosition();

            // Add current position to trail
            trailObject.trail.push({ x: trailObject.x, y: trailObject.y });
            if (trailObject.trail.length > trailObject.trailMaxLength) {
                trailObject.trail.shift(); // Remove oldest position if trail is too long
            }

            drawTrail();  // Draw the trail

            requestAnimationFrame(animateTrail);  // Recursively call to animate
        }

        // Start the animation
        animateTrail();

        // Handle window resize
        window.addEventListener('resize', resizeCanvas);
    </script>
`;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Append the loading div to the body of the document
  document.body.appendChild(loadingDiv);

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  
  // Function to remove the loading div after 3 seconds
  setTimeout(() => {
    // Fade out the loading div
    loadingDiv.style.opacity = "0";

    // Wait for the fade-out effect to complete before removing the div
    setTimeout(() => {
      // Remove the loading div from the document
      document.body.removeChild(loadingDiv);
    }, 1000); // Wait for 1 second for the fade-out effect to complete
  }, 3000); // 3000 milliseconds = 3 seconds
});
