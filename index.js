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

  var iframe = document.createElement('iframe');
  iframe.style.position = "absolute";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.top = "0px";
  iframe.style.left = "0px";
  iframe.id = "iframe";
  iframe.style.zIndex = "1000";
  iframe.style.border = "none";
  iframe.src = __uv$config.prefix + __uv$config.encodeUrl(address.value);
  document.body.appendChild(iframe);

  var behindIframe = document.createElement('div');
  behindIframe.style.position = "absolute";
  behindIframe.style.width = "100%";
  behindIframe.style.height = "100%";
  behindIframe.style.top = "0px";
  behindIframe.style.left = "0px";
  behindIframe.style.zIndex = "-1";
  behindIframe.style.backgroundColor = "white"; // Set the background color to white
  behindIframe.id = "behindIframe";
  document.body.appendChild(behindIframe);
});

document.getElementById("iframe").addEventListener("load", function(){
  document.getElementById("behindIframe").style.display = "block";
});
