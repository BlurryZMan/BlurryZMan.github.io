/**
 * All the helper functions for generating html.
 */

 // this is terrible
exports.getEndHtml = getEndHtml
exports.getHeaderHtml = getHeaderHtml
exports.getStartStatisticHtml = getStartStatisticHtml
exports.getStatisticHtml = getStatisticHtml
exports.getStartTextHtml = getStartTextHtml
exports.getTextHtml = getTextHtml
exports.getStartListHtml = getStartListHtml
exports.getListItemHtml = getListItemHtml
exports.getStartImageGroupHtml = getStartImageGroupHtml
exports.getImageHtml = getImageHtml
exports.getCaptionHtml = getCaptionHtml
exports.getLinkHtml = getLinkHtml


function getEndHtml(args) { return `</div>` }

function getHeaderHtml(args) { return `<div class="header">${args}</div>` }

function getStartStatisticHtml(args) { return `<div class="statisticblock">` }

function getStatisticHtml(args) {
   let split = args.split(":")
   return `<span class="caption">
               ${split[0].trim()}
            </span>
            <span class="number">
               ${split[1].trim()}
            </span>
            <br>`
}

function getStartTextHtml(args) { return `<div class="text">` }

function getTextHtml(args) { return args }

function getStartListHtml(args) { return `<br><div class="list">` }

function getListItemHtml(args) { return `<div class="list-child">${args}</div>` }

function getStartImageGroupHtml(args) { return `<div class="imagegroup">` }

function getImageHtml(args) {
   let split = args.split(":")
   return `<img class="image ${split[1].trim()}" src="img/${split[0].trim()}">`
}

function getCaptionHtml(args) { return `<div class="caption">${args}</div>` }

function getLinkHtml(args) { return `<span class="link">${args}</span>` }