
const Comb = require('csscomb');
const config = require('./csscomb.json');
var comb = new Comb(config);

const startRefactor = (data) => comb.processString(data);

module.exports = { startRefactor };