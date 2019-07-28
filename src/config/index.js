const lodash = require('lodash');

const defaultConfig = require('./default');
const envConfig = require('./' + (process.env.NODE_ENV || 'development'));

module.exports = lodash.merge({}, defaultConfig, envConfig);
