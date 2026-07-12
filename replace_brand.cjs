const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Case sensitive replacements first
    content = content.replace(/BlueTick Technologies/g, 'GrowBro');
    content = content.replace(/BlueTick Technology/g, 'GrowBro');
    content = content.replace(/BlueTick/g, 'GrowBro');
    
    // Case insensitive/exact class replacements
    content = content.replace(/bluetick/g, 'growbro');
    
    // Fix any double GrowBro.
    content = content.replace(/GrowBro\./g, 'GrowBro.');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        changedCount++;
        console.log('Updated: ' + file);
    }
});

console.log('Total files updated: ' + changedCount);
