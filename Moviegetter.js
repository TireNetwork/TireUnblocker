// Function to block redirects from "https://123movies-to.org"
function blockRedirects() {
  // Get the current domain
  var currentDomain = window.location.hostname;

  // Check if the current domain is "123movies-to.org"
  if (currentDomain === 'https://sflix.se') {
    // Override the window.location.assign function to intercept redirects
    var originalAssign = window.location.assign;
    window.location.assign = function(url) {
      // Parse the URL of the redirect
      var redirectURL = new URL(url);

      // Check if the domain of the redirect URL is different from "123movies-to.org"
      if (redirectURL.hostname !== 'https://sflix.se') {
        // Show an alert indicating that the redirect was blocked
        alert('Redirect blocked to ' + url);
      } else {
        // If the redirect is to "123movies-to.org", proceed with the original behavior
        originalAssign.apply(this, arguments);
      }
    };
  }
}

// Call the blockRedirects function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  blockRedirects();
});
