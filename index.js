"use strict";

// HTML code for the simulated URL bar
const urlBarHTML = `
    <div id="uv-form">
        <input id="uv-search-engine" value="https://www.google.com/search?q=%s" type="hidden"/> 
        <input id="uv-address" type="text" placeholder="Search Google or type a URL (Type 29 to redirect to google)" class="form__input"/>
        <div class="desc left-margin">
            <p id="uv-error"></p>
            <pre id="uv-error-code"></pre>
        </div>
    </div>
`;

// Injecting the HTML code for the simulated URL bar into the document
document.body.insertAdjacentHTML('afterbegin', urlBarHTML);

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

/**
 * Function to update the simulated URL bar with the content of the form
 */
function updateURL() {
    address.value = document.getElementById("uv-address-form").value;
}

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
});
