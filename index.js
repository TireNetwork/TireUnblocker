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

document.body.style.backgroundColor = "white"; // Set the background color to white

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await registerSW();
  } catch (err) {
    alert(err.toString());
    throw err;
  }
  const url = address.value; // Get the URL directly from the address input field

  var iframe = document.createElement('iframe');
  iframe.style.position = "absolute";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.top = "0px";
  iframe.style.left = "0px";
  iframe.id = "iframe";
  iframe.style.zIndex = "1000";
  iframe.style.border = "none";
  iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
  document.body.appendChild(iframe);

  var behindIframe = document.createElement('div');
  behindIframe.style.position = "absolute";
  behindIframe.style.width = "100%";
  behindIframe.style.height = "100%";
  behindIframe.style.top = "0px";
  behindIframe.style.left = "0px";
  behindIframe.style.zIndex = "-1";
  behindIframe.style.backgroundColor = "white"; // Set the background color to white
  document.body.appendChild(behindIframe);
});
