
const fs = require('fs');
const path = 'public/book-slider/assets/index-I2E8wPYe.js';
let content = fs.readFileSync(path, 'utf8');

// Replace absolute paths with relative paths
// We target the strings starting with /textures/, /images/, /audios/
// This covers cases like .preload("/textures/...") or simple strings
content = content.replace(/"\/textures\//g, '"./textures/');
content = content.replace(/"\/images\//g, '"./images/');
content = content.replace(/"\/audios\//g, '"./audios/');
content = content.replace(/'\/textures\//g, "'./textures/");
content = content.replace(/'\/images\//g, "'./images/");
content = content.replace(/'\/audios\//g, "'./audios/");

fs.writeFileSync(path, content);
console.log('Successfully updated paths in ' + path);
