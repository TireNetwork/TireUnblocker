"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");

/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");

/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");

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

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);

  // Integration of variable 'x' from the second script
  const x = document.createElement('img');
  x.style.cursor = "pointer";
  x.style.position = "absolute";
  x.style.width = "50px";
  x.style.height = "50px";
  x.src = "x.png";
  x.style.zIndex = "1001";
  x.style.right = "1%";
  x.style.top = "1%";
  x.onclick = function () {
    window.location.reload(1);
  };

  document.body.appendChild(x);
});
