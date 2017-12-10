let input = new Buffer("1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736", "hex");
let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
let maxScore = 0;
let maxStr = "";

for(let i = 32; i < 127; i++) {
    let testBuf = new Buffer(String.fromCharCode(i).repeat(input.length), "ascii");
    let outputStr = xor(input, testBuf).toString("ascii");
    let res = score(outputStr);
    if(res > maxScore) {
        maxScore = res;
        maxStr = outputStr;
    }
}

console.log(maxStr);

function score(str) {
    return str.split("").map(c => alphabet.includes(c)).reduce((a, b) => a + b, 0);
}

function xor(bufA, bufB) {
    let output = Buffer.allocUnsafe(bufA.length);
    for(let i = 0; i < bufA.length; i++)
        output[i] = bufA[i] ^ bufB[i];
    return output;
}
