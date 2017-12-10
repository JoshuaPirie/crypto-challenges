let inputA = new Buffer("1c0111001f010100061a024b53535009181c", "hex");
let inputB = new Buffer("686974207468652062756c6c277320657965", "hex");
console.log(xor(inputA, inputB).toString("hex"));

function xor(bufA, bufB) {
    let output = Buffer.allocUnsafe(bufA.length);
    for(let i = 0; i < bufA.length; i++)
        output[i] = bufA[i] ^ bufB[i];
    return output;
}
