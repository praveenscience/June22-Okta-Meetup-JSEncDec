console.clear();
console.log("Complete Implementation.");
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
// Get the password from user.
const Password = prompt("Enter your password here...");
if (!Password) {
  console.log("Welcome to Meetup!");
} else if (crypt(Password, Password) === "0b293a2d3e3e35") {
  const Card = "02342e297b183a293f7b152e36393e297b3228617b6f696f697b6f696f697b6f696f697b6f696f69";
  const URL = "0e283e7b2f333e7b0e0917617b332f2f2b28617474373235303e3f323575383436743235742b293a2d3e3e352f3e3833";
  console.log(decrypt(Password, Card));
  console.log(decrypt(Password, URL));
} else {
  console.log("Sorry, access to this information is denied!");
}
