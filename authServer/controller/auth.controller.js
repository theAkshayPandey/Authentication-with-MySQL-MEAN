const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxMDcxMzU4MSwiaWF0IjoxNjEwNzEzNTgxfQ.wKJfIDU_UiLHYyMLW5NoHOpskN3tDsUGBJz6X5LQV3A');
}

module.exports= {generateToken};