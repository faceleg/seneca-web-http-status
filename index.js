'use strict';
var statusCodes = require('know-your-http-well').statusCodes;
var R = require('ramda');

// Thanks to https://github.com/ramda/ramda/wiki/Cookbook#indexby
var indexBy = R.curry(function(prop, list) {
  return R.mapObj(R.head, R.groupBy(R.prop(prop), list));
});

module.exports = R.mapObj(function(statusCode) {
  return {
    http$: {
      status: statusCode.code
    },
    why: statusCode.phrase
  };
}, indexBy('code', R.map(R.pick(['code', 'phrase']), statusCodes)));
