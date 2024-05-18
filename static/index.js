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
/**
 * @type {HTMLDivElement}
 */
const loadingScreen = document.createElement("div");

// Create and style the loading screen
loadingScreen.id = "loading-screen";
loadingScreen.style.position = "fixed";
loadingScreen.style.top = "0";
loadingScreen.style.left = "0";
loadingScreen.style.width = "100%";
loadingScreen.style.height = "100%";
loadingScreen.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
loadingScreen.style.zIndex = "1000";
loadingScreen.style.display = "flex";
loadingScreen.style.justifyContent = "center";
loadingScreen.style.alignItems = "center";
loadingScreen.style.color = "#fff";
loadingScreen.style.fontSize = "2em";
loadingScreen.innerHTML = '<iframe src="loading.html" frameborder="0" style="width:100%; height:100%;"></iframe>';

// Function to show the loading screen
function showLoadingScreen() {
  document.body.appendChild(loadingScreen);
}

// Function to hide the loading screen
function hideLoadingScreen() {
  document.body.removeChild(loadingScreen);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  showLoadingScreen();

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    hideLoadingScreen();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
