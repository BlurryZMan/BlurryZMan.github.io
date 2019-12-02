const fs = require('fs');

const {
   getEndHtml,
   getHeaderHtml,
   getStartStatisticHtml,
   getStatisticHtml,
   getStartTextHtml,
   getTextHtml,
   getStartListHtml,
   getListItemHtml,
   getStartImageGroupHtml,
   getImageHtml,
   getCaptionHtml,
   getLinkHtml
} = require('./htmlHelpers')

const logsfolder = './logs/';             // where logs are stored
const targetFile = './index.html';        // what html file to write to
const blogName = 'Issues - Alan Walker';  // title of blog

/**
 * modules are  individual components of an
 * entry, such as a block of statistics, newline, or
 * text block. this map maps each type of module to a function
 * that will return the correct templated html for the module,
 * given the correct tokens.
 */

 /**
  * moduleTypes maps the name of a component to its
  * corresponding html generation function.
  * 
  */
var moduleTypes = new Map()

moduleTypes.set("end", getEndHtml)
moduleTypes.set("header", getHeaderHtml)
moduleTypes.set("startStatistic", getStartStatisticHtml)
moduleTypes.set("statistic", getStatisticHtml)
moduleTypes.set("startText", getStartTextHtml)
moduleTypes.set("text", getTextHtml)
moduleTypes.set("startList", getStartListHtml)
moduleTypes.set("listItem", getListItemHtml)
moduleTypes.set("startImageGroup", getStartImageGroupHtml)
moduleTypes.set("image", getImageHtml)
moduleTypes.set("caption", getCaptionHtml)
moduleTypes.set("link", getLinkHtml)

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
      <div class="title">${blogName}</div>`

   filescontents.forEach(file => {
      str += parseEntry(file);
   })

   str += `</div><script src="js/index.js"></script><script src="js/three.js"></script></body></html>`

   return str;
}

function parseEntry(file) {
   let entryStr = `<div class="entry">`

   let lines = file.split(/\r?\n/);

   lines.forEach(line => {

      if (line=='') return

      let tokens = line.split("@")
      let type = tokens.shift().trim()

      if (moduleTypes.has(type))
         entryStr += moduleTypes.get(type)(tokens[0].trim())
      else {
         console.log("invalid type: "+type)
         process.exit()
      }

   })

   entryStr += `</div>`

   return entryStr
}

function createHtmlFile(htmlstring) {
   fs.writeFile(targetFile, htmlstring, function (err) {
      if (err) {
         console.log(err)
         process.exit()
      }
      console.log('File created successfully.');
   }); 
}

