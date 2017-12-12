require("fs").readFile(require("path").resolve(__dirname, "input/6.txt"), "utf8", (err, data) => {
    let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    let input = new Buffer(data, "base64");
    let keySizeScores = [];

    for(let keySize = 3; keySize < 40; keySize++) {
        let b1 = input.slice(0, keySize);
        let b2 = input.slice(keySize, keySize * 2);
        let b3 = input.slice(keySize * 2, keySize * 3);
        let b4 = input.slice(keySize * 3, keySize * 4);
        let s1 = hammingDistance(b1, b2) / keySize;
        let s2 = hammingDistance(b2, b3) / keySize;
        let s3 = hammingDistance(b3, b4) / keySize;
        let score = s1 + s2 + s3 / 3;
        keySizeScores[keySize] = score;
    }
    let top3Sizes = keySizeScores.slice(0).sort().slice(0, 3).map(x => keySizeScores.indexOf(x));
    let topScore = 0;
    let topKey = "";
    top3Sizes.forEach(x => {
        let bufs = [];
        for(let i = 0; i < x; i++)
            bufs[i] = Buffer.allocUnsafe(Math.floor(input.length / x) + (input.length % x > i ? 1 : 0));
        input.forEach((e, i) => bufs[i % x][Math.floor(i / x)] = e);
        let totalScore = 0;
        let key = "";
        bufs.forEach(buf => {
            let maxScore = 0;
            let maxChar = "";
            for(let i = 32; i < 127; i++) {
                let testBuf = new Buffer(String.fromCharCode(i).repeat(buf.length), "ascii");
                let outputStr = xor(buf, testBuf).toString("ascii");
                let res = score(outputStr);
                if(res > maxScore) {
                    maxScore = res;
                    maxChar = String.fromCharCode(i);
                }
            }
            totalScore += maxScore;
            key += maxChar;
        });
        if(totalScore > topScore) {
            topScore = totalScore;
            topKey = key;
        }
    });

    let keyBuf = new Buffer(topKey.repeat(Math.ceil(input.length / topKey.length)).slice(0, input.length), "ascii");
    let output = xor(input, keyBuf);
    console.log(topKey);
    console.log(output.toString("ascii"));

    function hammingDistance(bufA, bufB) {
        return xor(bufA, bufB).reduce((acc, curr) => {
            while(curr > 0) {
                curr &= curr - 1;
                acc++;
            }
            return acc;
        }, 0);
    }

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