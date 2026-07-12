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
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

// Check src directory and the root index.html
const files = walk('./src');
files.push('./index.html');

let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Replace the exact instances
    content = content.replace(/GrowBro/g, 'Growbroo');
    // Also catch any lowercase ones just in case
    content = content.replace(/growbro/g, 'growbroo');
    // But wait, what about the CSS class colors we defined? `growbro-500` would become `growbroo-500`.
    // The user said "also its not growbro its growbroo". If the brand name changes, the class name shouldn't technically matter to the user unless they see it in the code, but keeping it consistent is fine. Let's just replace all.
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        changedCount++;
        console.log('Updated: ' + file);
    }
});

// Also update tailwind.config.js for the color palette name change
let tailwind = fs.readFileSync('./tailwind.config.js', 'utf8');
if(tailwind.includes('growbro:')) {
    tailwind = tailwind.replace(/growbro:/g, 'growbroo:');
    fs.writeFileSync('./tailwind.config.js', tailwind);
    console.log('Updated: tailwind.config.js');
}

console.log('Total files updated: ' + changedCount);
