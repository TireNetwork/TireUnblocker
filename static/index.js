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
  var loading = document.createElement('img');
            loading.style.cursor="pointer";
            loading.style.width = "125px";
            loading.style.height = "125px";
            loading.style.position="absolute";
            loading.style.zIndex="101"; 
            loading.src = "/img/load.gif";
            loading.style.top="50%";
            loading.style.left="50%";
            loading.style.transform="translate(-50%, -50%)";
            document.body.appendChild(loading);

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
