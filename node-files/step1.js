const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
        console.log(data)
        }
    });
}

const filePath = process.argv[2];

if (!filePath) {
    console.log('Please provide a file path')
} else {
    cat(filePath)
}

