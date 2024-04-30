"use strict";

const urlBarHTML = `
<div id="url-bar" style="width: 100%; text-align: left; background-color: grey; padding: 10px 0; position: fixed; top: 0; left: 0; z-index: 1000;">
  <form id="daform" style="text-align: left; width: 700px; margin: 50px auto 0;">
    <input id="daaddress" type="text" placeholder="Search Google or type a URL" class="form__input" style="width: 100%; padding: 10px; margin-top: 10px; text-align: left; border-radius: 18px; outline: none; background: transparent; border: 2px solid white; color: grey; width: 600px; height: 50px;"/>
    <button id="reload-button" style="cursor: pointer; background-color: grey; color: white; border: 2px solid white; padding: 8px 10px; border-radius: 5px; margin-top: 10px;">Reload</button>
  </form>
</div>
`;

document.body.insertAdjacentHTML('afterbegin', urlBarHTML);

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

document.getElementById('reload-button').addEventListener('click', function() {
  var url = document.getElementById('daaddress').value;
  window.location.href = url;
});
