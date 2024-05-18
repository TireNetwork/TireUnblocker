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

// Create a loading iframe
const loadingFrame = document.createElement('iframe');
loadingFrame.id = "loadingFrame";
loadingFrame.src = "/static/loading.html";
loadingFrame.style.width = "100vw"; // Full width of the viewport
loadingFrame.style.height = "100vh"; // Full height of the viewport
loadingFrame.style.position = "fixed"; // Fixed position to cover the entire viewport
loadingFrame.style.top = "0";
loadingFrame.style.left = "0";
loadingFrame.style.zIndex = "9999"; 
loadingFrame.style.opacity = "1";
loadingFrame.style.transition = "opacity 1s ease";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

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
  
  // Function to remove the loading iframe after 3 seconds
  setTimeout(() => {
    // Set opacity to 0 for fade-out effect
    loadingFrame.style.opacity = "0";

    // Wait for the fade-out transition to complete before removing the iframe
    setTimeout(() => {
      // Remove the loading iframe from the document
      document.body.removeChild(loadingFrame);
    }, 1000); // Wait for 1 second for the fade-out transition to complete
  }, 3000); // 3000 milliseconds = 3 seconds
});
