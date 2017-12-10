let input = new Buffer("Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal", "ascii");
let key = "ICE";

let keyBuf = new Buffer(key.repeat(Math.ceil(input.length / key.length)), "ascii");
let output = xor(input, keyBuf);
console.log(output.toString("hex"));

function xor(bufA, bufB) {
    let output = Buffer.allocUnsafe(bufA.length);
    for(let i = 0; i < bufA.length; i++)
        output[i] = bufA[i] ^ bufB[i];
    return output;
}
