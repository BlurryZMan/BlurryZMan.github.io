const fs = require('fs');

const logsfolder = './logs/'; // where logs are stored

/**
 * modules are basically individual components of an
 * entry, such as a block of statistics, newline, or
 * text block. this map maps each type of module to a function
 * that will return the correct templated html for the module,
 * given the correct tokens.
 */
var moduleTypes = new Map()
moduleTypes.set("header", getHeaderHtml)

fs.readdir(logsfolder, async (err, files) => {

   if (err || files == undefined) {
      console.log(err)
      process.exit()
   }

   var filescontents = []

   files.forEach(file => {
      filescontents.push(fs.readFileSync(logsfolder + file, 'utf8'))
   })

   let htmlstring = generateHtml(filescontents)
   createHtmlFile(htmlstring)

});

function generateHtml(filescontents) {
   let str = `
   <!DOCTYPe html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <link rel="stylesheet" type="text/css" href="css/styles.css">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
      <title>Issues</title>
   </head>
   <body>
   <div class="content">
      <div class="title">Issues - Alan Walker</div>`

   filescontents.forEach(file => {
      str += parseEntry(file);
   })

   str += `</div></body></html>`

   return str;
}

function parseEntry(file) {
   let entryStr = `<div class="entry">`

   let lines = file.split(/\r?\n/);

   lines.forEach(line => {

      let tokens = line.split("@")
      let type = tokens.shift()

      if (moduleTypes.has(type))
         entryStr += moduleTypes.get(type)(tokens)
      else {
         console.log("invalid type: "+type)
         process.exit()
      }

   })

   entryStr += `</div>`

   return entryStr
}

function createHtmlFile(htmlstring) {
   // fs.writeFile('index.html', htmlstring, function (err) {
   //    if (err) {
   //       console.log(err)
   //       process.exit()
   //    }
   //    console.log('File created successfully.');
   // }); 
}

function getHeaderHtml(tokens) {
   return `<div class="header">${tokens[0]}</div>`
}
