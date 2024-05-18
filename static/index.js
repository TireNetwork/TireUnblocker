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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
     // Create an iframe element to display the loading content
    var loadingFrame = document.createElement('iframe');

    // Set cursor style to pointer
    loadingFrame.style.cursor = "pointer";

    // Set width of the loading iframe
    loadingFrame.style.width = "125px";

    // Set height of the loading iframe
    loadingFrame.style.height = "125px";

    // Set position property to absolute
    loadingFrame.style.position = "absolute";

    // Set z-index to ensure the loading iframe appears on top of other elements
    loadingFrame.style.zIndex = "101";

    // Set source of the iframe to the loading HTML file
    loadingFrame.src = "/static/loading.html";

    // Set top position to center vertically
    loadingFrame.style.top = "50%";

    // Set left position to center horizontally
    loadingFrame.style.left = "50%";

    // Translate the position to center the loading iframe both vertically and horizontally
    loadingFrame.style.transform = "translate(-50%, -50%)";

    // Append the loading iframe to the body of the document
    document.body.appendChild(loadingFrame);

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
