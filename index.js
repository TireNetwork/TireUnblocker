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
   iframe.style.height = "100%";
   iframe.style.top = "0px";
   iframe.style.left = "0px";
   iframe.id = "iframe";
   iframe.style.zIndex = "1000";
 @@ -47,6 +47,10 @@ form.addEventListener("submit", async (event) => {

   var button = document.createElement('button');
   button.textContent = "Get iframe URL and Redirect";
   button.onclick = function() {
     var iframeUrl = iframe.src;
     window.location.href = iframeUrl;
  };
  document.body.appendChild(button);
});
