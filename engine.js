// engine.js
// module.exports = ({ marp }) => marp.use(require('markdown-it-mermaid'))


const marpKrokiPlugin = require('./kroki-plugin')

module.exports = ({ marp }) => marp.use(marpKrokiPlugin)
