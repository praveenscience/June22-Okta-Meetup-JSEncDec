console.clear();
console.log("A Random Encryption & Decryption using JavaScript");
const crypt = (salt, text) => {
  const textToChars = text => text.split("").map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};
const decrypt = (salt, encoded) => {
  const textToChars = text => text.split("").map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join("");
};
console.log("Using a Salt of value: Hello");
const salt = "Hello";
const txtPlain = "hello world";
const encPlain = crypt(salt, txtPlain);
const decPlain = decrypt(salt, encPlain);
console.log({ txtPlain, encPlain, decPlain, result: txtPlain === decPlain ? "Success" : "Fail" });
