require("fs").readFile(require("path").resolve(__dirname, "input/4.txt"), "utf8", (err, data) => {
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    let maxScore = 0;
    let maxStr = "";
    let maxLine = "";

    data.split(/\r?\n/).forEach(x => {
        let input = new Buffer(x, "hex");
        for(let i = 32; i < 127; i++) {
            let testBuf = new Buffer(String.fromCharCode(i).repeat(input.length), "ascii");
            let outputStr = xor(input, testBuf).toString("ascii");
            let res = score(outputStr);
            if(res > maxScore) {
                maxScore = res;
                maxStr = outputStr;
                maxLine = x;
            }
        }
    });

    console.log(maxStr);
    console.log(maxLine);

    function score(str) {
        return str.split("").map(c => alphabet.includes(c)).reduce((a, b) => a + b, 0);
    }
    
    function xor(bufA, bufB) {
        let output = Buffer.allocUnsafe(bufA.length);
        for(let i = 0; i < bufA.length; i++)
            output[i] = bufA[i] ^ bufB[i];
        return output;
    }
});
