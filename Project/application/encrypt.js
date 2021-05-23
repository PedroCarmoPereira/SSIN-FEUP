const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
let secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

const encryptECB = (plainText, key, outputEncoding = "base64") => {
    let cipher = crypto.createCipheriv('aes-256-ecb', Buffer.from(key), null);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

const decryptECB = (cipherText, key, outputEncoding = "utf8") => {
    let encryptedText = Buffer.from(cipherText, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-ecb', Buffer.from(key), null);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt,
    encryptECB,
    decryptECB,
}