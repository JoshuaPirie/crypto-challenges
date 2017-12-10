require("fs").readFile(require("path").resolve(__dirname, "input"), "utf8", (err, data) => {
    console.log(hexToBase64(data));
});

function hexToBase64(str) {
    return new Buffer(str, "hex").toString("base64");
}