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
  var open = document.createElement('div');
open.style.cursor = "pointer";
open.style.position = "absolute";
open.style.width = "50px";
open.style.height = "50px";
open.style.zIndex = "1001";
open.style.right = "65px";
open.style.top = "1%";
open.style.backgroundColor = "blue";
open.style.color = "white";
open.style.textAlign = "center";
open.style.lineHeight = "50px";
open.innerText = "Open";

open.onclick = function() {
    var iframeUrl = document.getElementById("iframe").getAttribute("src");
    if (iframeUrl && iframeUrl !== "about:blank"){
        window.open(iframeUrl);
    }
};

document.body.appendChild(open);

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

  };
  document.body.appendChild(button);
});
