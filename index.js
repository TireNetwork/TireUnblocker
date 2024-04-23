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

  // Create an iframe
  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  // Create a button to get the iframe URL and redirect the user
  var button = document.createElement('button');
  button.textContent = "Get iframe URL and Redirect";
  button.onclick = function() {
    // Get the URL of the iframe
    var iframeUrl = iframe.src;
    // Redirect the user to the URL of the iframe
    window.location.href = iframeUrl;
  };
  document.body.appendChild(button);
});
