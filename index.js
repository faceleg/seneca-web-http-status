'use strict';
var statusCodes = require('know-your-http-well').statusCodes;
var R = require('ramda');

// Thanks to https://github.com/ramda/ramda/wiki/Cookbook#indexby
var indexBy = R.curry(function(prop, list) {
  return R.mapObj(R.head, R.groupBy(R.prop(prop), list));
});

var omitHeadings = ['1xx', '2xx', '3xx', '4xx', '5xx', '7xx'];

var statusCodes = R.mapObj(function(statusCode) {
  return statusGenerator(parseInt(statusCode.code, 10), statusCode.phrase)
}, R.omit(omitHeadings, indexBy('code', R.map(R.pick(['code', 'phrase']), statusCodes))));

statusCodes.custom = statusGenerator;

module.exports = statusCodes;

function statusGenerator(code, message) {
  return {
    http$: {
      status: code
    },
    why: message
  }
}
