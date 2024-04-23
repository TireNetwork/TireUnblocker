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
            white.style.cursor="pointer";
            white.style.position = "absolute";
            white.style.width = "100%";
            white.style.height = "100%";
            white.style.zIndex="100";
            white.style.right = "0px";
            white.className="black";
            white.style.top = "0px";
            document.body.appendChild(white);

            
            var iframe = document.createElement('iframe');

            iframe.style.position = "absolute";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.top = "0px";
            iframe.style.left = "0px";
            iframe.id = "iframe";
            iframe.style.zIndex="1000";
            iframe.style.border = "none";
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            document.body.appendChild(iframe);


    
            

    
    
            var x = document.createElement('img');
            x.style.cursor="pointer";
            x.style.position = "absolute";
            x.style.width = "50px";
            x.style.height = "50px";
            x.src = "x.png";
            x.style.zIndex = "1001";
            x.style.right = "1%";
            x.style.top = "1%";
            x.onclick = function() {
                window.location.reload(1);
            };

            document.body.appendChild(x)

            document.body.appendChild(inpcont);
            inpcont.appendChild(inp);
  
            var dev = document.createElement('img');
            dev.style.cursor="pointer";
            dev.style.position = "absolute";
            dev.style.width = "50px";
            dev.style.borderRadius="50%";
            dev.style.height = "50px";
            dev.src = "wrench.jpg";
            dev.style.zIndex = "1001";
            dev.style.left = "1%";
            dev.style.top = "1%";
            dev.onclick = async function() {
              if (document.getElementById("iframe").contentWindow.document.getElementById("FirebugUI")==null){
                var firebug=document.getElementById("iframe").contentWindow.document.createElement("script");
                firebug.setAttribute('src','https://luphoria.com/fbl/fbl/firebug-lite-debug.js');
                firebug.setAttribute('id','firebugscriptidkeeee');
                document.getElementById("iframe").contentWindow.document.body.appendChild(firebug);
                (function(){
                  if (window.firebug.version){
                    firebug.init();
                  }else{
                    setTimeout(arguments.callee);
                  }
                })();
              } else {
                if (document.getElementById("iframe").contentWindow.document.getElementById("FirebugUI").style.display!="none"){
                  document.getElementById("iframe").contentWindow.document.getElementById("FirebugUI").style.display="none";
                }else{
                  document.getElementById("iframe").contentWindow.document.getElementById("FirebugUI").style.display="inline-block";
                }
              }
            };

            document.body.appendChild(dev);

});
