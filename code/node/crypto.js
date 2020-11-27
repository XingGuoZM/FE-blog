const crypto = require('crypto');

const secret = 'abcdd';

const hash = crypto.createHmac('sha256', secret).update('cupcake').digest('hex');
console.log(hash);