const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, "build", "index.html");
const html = fs.readFileSync(htmlFile, "utf8");

// Apply the same URL rewriting
const fixed = html.replace(/https?:\/\/muscatwhereto\.com/gi, '');
fixed.replace(/https?:\/\/mwtstaging\.cfd:3000/gi, '');

console.log('Original contains muscatwhereto.com:', html.includes('muscatwhereto.com'));
console.log('Fixed contains muscatwhereto.com:', fixed.includes('muscatwhereto.com'));
console.log('\nSample URLs in fixed HTML:');
const matches = fixed.match(/(src|href)=["']([^"']+)["']/g);
if (matches) {
  matches.slice(0, 10).forEach(m => console.log(m));
}

