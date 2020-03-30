var fs = require('fs');
var imageFile = fs.readFileSync('/Users/apple/Desktop/IMG_6846.JPG');

// Convert the image data to a Buffer and base64 encode it.
var encoded = Buffer.from(imageFile).toString('base64');
console.log(encoded);