
const fs = require('fs');
const path = 'public/book-slider/assets/index-I2E8wPYe.js';
const content = fs.readFileSync(path, 'utf8');
const index = content.indexOf('/textures/');
if (index !== -1) {
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + 50);
    console.log('Context:', content.substring(start, end));
} else {
    console.log('Not found');
}
