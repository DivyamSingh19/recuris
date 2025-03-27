import 
app.post("/encrypt", (req:Request, res:Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });
    const encryptedText = encrypt(text);
    res.json({ encrypted: encryptedText });
  });
  
  app.post("/decrypt", (req, res) => {
    const { encryptedText } = req.body;
    if (!encryptedText) return res.status(400).json({ error: "Encrypted text is required" });
    const decryptedText = decrypt(encryptedText);
    res.json({ decrypted: decryptedText });
  });
  
 