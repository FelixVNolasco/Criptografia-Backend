//PUT THIS CODE IN A SEPARATE GIST AS AN EXAMPLE
var rsa = require("node-rsa");
var fs = require("fs");

var publicKey = new rsa();
var privateKey = new rsa();

var public = fs.readFileSync("./Keys/public.pem", "utf8");
var private = fs.readFileSync("./Keys/private.pem", "utf8");

publicKey.importKey(public);
privateKey.importKey(private);

var text = "Felix Vega";

function encrypText(text) {

  //OPTIONAL -- ADD SALT TO THE ENCRYPTION --
  // const saltFirst = "fdkljnwflnddcslknsdlkn";
  // const saltSecond = "fdkljnwflnddcslknsdlkn";

  const encryptedText = privateKey.encryptPrivate(
    // `${saltFirst} ${text} ${saltSecond}`,
    `${text}`,
    "base64"
  );  
  return encryptedText;
}

var encryptedText = encrypText(text);

console.log("Encrypted Text: " + encryptedText);

function decryptText(encryptedText) {
  const decryptText = publicKey.decryptPublic(encryptedText, "utf8");
  return decryptText;
}

const decryptedText = decryptText(encryptedText);

console.log("DecryptedText: " + decryptedText);

