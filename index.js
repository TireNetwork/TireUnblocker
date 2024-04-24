"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("searchbox");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("search");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("searchengine");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await registerSW();
  } catch (err) {
    alert(err.toString());
    throw err;
  }
  const url = search(address.value, searchEngine.value);

  var white = document.createElement('div');
  white.style.cursor = "pointer";
  white.style.position = "absolute";
  white.style.width = "100%";
  white.style.height = "100%";
  white.style.zIndex = "100";
  white.style.right = "0px";
  white.className = "black";
  white.style.top = "0px";
  document.body.appendChild(white);

  var iframe = document.createElement('iframe');
  iframe.style.position = "absolute";
  iframe.style.width = "100%";
  iframe.style.height = "calc(100% - 40px)";
  iframe.style.top = "40px"; // Adjusted top position to accommodate the button
  iframe.style.left = "0px";
  iframe.id = "iframe";
  iframe.style.zIndex = "1000";
  iframe.style.border = "none";
  iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
  document.body.appendChild(iframe);

  var button = document.createElement('button');
  button.textContent = "Get iframe URL and Redirect";
  button.style.position = "absolute";
  button.style.top = "0";
  button.style.left = "0";
  button.style.zIndex = "1100"; // Set the z-index higher to make sure it's on top
  button.onclick = function() {
    var iframeUrl = iframe.src;
    window.location.href = iframeUrl;
  };
  document.body.appendChild(button);
});
