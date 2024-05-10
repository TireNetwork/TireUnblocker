/*
Copyright © Fog Network
Made by Nebelung
MIT license: https://opensource.org/licenses/MIT
*/

const express = require("express")
const app = express()
const fetch = require("node-fetch")
const config = require("./config.json")
const port = process.env.PORT || config.port
const Corrosion = require("./lib/server")

proxy.bundleScripts();

app.use(express.static("./public", {
    extensions: ["html"]
}));

app.get("/", function(req, res){
    res.sendFile("index.html", {root: "./public"});
});


app.use(function (req, res) {
    if (req.url.startsWith(proxy.prefix)) {
      proxy.request(req,res);
    } else {
      res.status(404).sendFile("404.html", {root: "./public"});
    }
})

app.listen(port, () => {
    console.log(`TireUnblocker is running at localhost:${port}`)
})
