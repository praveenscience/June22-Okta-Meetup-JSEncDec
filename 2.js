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
const salt = "h2O";
const tlas = "O2h";
console.log("Let's try to encrypt and decrypt email addresses with a random salt.");
const txtEmail = "hello@world.com";
const encEmail = crypt(salt, txtEmail);
const decEmail = decrypt(salt, encEmail);
console.log({ txtEmail, encEmail, decEmail, result: txtEmail === decEmail ? "Success" : "Fail" });
console.log("Let's try to encrypt and decrypt a phone number with the same salt.");
const txtPhNo = "+447894561230";
const encPhNo = crypt(salt, txtPhNo);
const decPhNo = decrypt(salt, encPhNo);
console.log({ txtPhNo, encPhNo, decPhNo, result: txtPhNo === decPhNo ? "Success" : "Fail" });
console.log("Let's try to encrypt and decrypt a URL with the same salt.");
const txtUrl = "https://hello.world/?path=param&new=param#withHashValue";
const encUrl = crypt(salt, txtUrl);
const decUrl = decrypt(salt, encUrl);
console.log({ txtUrl, encUrl, decUrl, result: txtUrl === decUrl ? "Success" : "Fail" });
console.log("Let's try to see what happens if you mess up with salt.");
const mehEmail = decrypt(tlas, encEmail);
const mehPhNo = decrypt(tlas, encPhNo);
console.log({ mehEmail, mehPhNo, result: txtPhNo !== mehPhNo && txtEmail !== mehEmail ? "Success" : "Fail" });
console.log("What about Emojis? 🤔");
const txtEmoji = "Biceps Here? 💪🏻";
const encEmoji = crypt(salt, txtEmoji);
const decEmoji = decrypt(salt, encEmoji);
console.log({ txtEmoji, encEmoji, decEmoji, result: txtEmoji === decEmoji ? "Success" : "Fail" });
console.log("As expected, this fails.");
