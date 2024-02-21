import React, { useState } from "react";
import { parse } from "@typescript-eslint/parser";
import { encryptAesGcm, decryptAesGcm } from "sodium-universal";

interface Props {}

const WebAuthnEncryption: React.FC<Props> = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEncrypt = async () => {
    try {
      setLoading(true);
      // Use Web Authentication API to get a public key credential.
      const credential = await window.navigator.credentials.get({ publicKey: {} });
      const keyMaterial = generateKey("AES-GCM", Buffer.from(credential.rawId, "base64"), Buffer.from(credential.response.userHandle), credential.response.signCount);
      const encryptedBuffer = await encryptAesGcm(keyMaterial, parse.parseTextIntoAst(encryptedText).body.expression.elements[0].elements[1].elements[1].elements[0].elements[0].elements[0].value as string);
      setEncryptedText(`Encrypted Text: ${Buffer.from(encryptedBuffer).toString("base64")}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    try {
      setLoading(true);
      // Use Web Authentication API to get a public key credential.
      const credential = await window.navigator.credentials.get({ publicKey: {} });
      const keyMaterial = generateKey("AES-GCM", Buffer.from(credential.rawId, "base64"), Buffer.from(credential.response.userHandle), credential.response.signCount);
      const decryptedBuffer = await decryptAesGcm(keyMaterial, Buffer.from(encryptedText.split(":")[1], "base64"));
      setDecryptedText(`Decrypted Text: ${decryptedBuffer.toString()}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <label>
          Enter text to encrypt:
          <textarea value={encryptedText} />
        </label>
        <button onClick={handleEncrypt} disabled={loading}>
          Encrypt Text
        </button>
        <label>
          Decrypted Text:
          <textarea value={decryptedText} />
        </label>
        <button onClick={handleDecrypt} disabled={loading || !encryptedText}>
          Decrypt Text
        </button>
      </div>
  );
};

export default WebAuthnEncryption;