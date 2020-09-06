const crypto = require('crypto');

function aes256Encrypt(message, key, iv) {
    let ivBuffer = new Buffer.from(iv, 'base64');
    let keyBuffer =  new Buffer.from(key, 'base64');

    let cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    let encrypted = cipher.update(message, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

function aes256Decrypt(encrypted, key, iv) {
    let ivBuffer = new Buffer.from(iv, 'base64');
    let keyBuffer =  new Buffer.from(key, 'base64');
    let encryptedBuffer = new Buffer.from(encrypted, 'base64');

    let decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()] );
    return decrypted.toString('utf-8');
}

function sha256(message) {
    return crypto.createHash('sha256').update(message).digest('base64');
}
function md5(message) {
    return crypto.createHash('md5').update(message).digest('base64');
}

function sha256File(filePath) {
    let stream = fs.ReadStream(filePath);
    return sha256(stream.toString());
}


module.exports = {
    aes256Encrypt,
    aes256Decrypt,
    sha256,
    md5
};
