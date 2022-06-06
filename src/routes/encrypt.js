const router = require("express").Router();

var rsa = require("node-rsa");
var fs = require("fs");

var publicKey = new rsa();
var privateKey = new rsa();

var public = fs.readFileSync("Keys/public.pem", "utf8");
var private = fs.readFileSync("Keys/private.pem", "utf8");


publicKey.importKey(public);
privateKey.importKey(private);

router.post("/encrypt", async (req, res) => {
  var text = req.body.text;
  try {
    const encryptedText = privateKey.encryptPrivate(`${text}`, "base64");
    res.status(200).json(encryptedText);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/decrypt", async (req, res) => {
  var encryptedText = req.body.encryptedText;

  try {
    const decryptedText = publicKey.decryptPublic(encryptedText, "utf8");
    res.status(200).json(decryptedText);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;