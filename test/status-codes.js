'use strict';

var chai = require('chai');
chai.use(require('chai3-json-schema'));
var expect = chai.expect;

var R = require('ramda');
var statusCodes = require('../index.js');

describe('seneca-web-http-status', function() {

  it('exports an object', function() {
    expect(statusCodes).isObject;
  });

  it('exports entries of the correct format', function() {
    var senecaWebSchema = {
      title: 'seneca-web-http-status schema',
      type: 'object',
      required: ['http$', 'why'],
      properties: {
        http$: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'number'
            }
          }
        },
        why: {
          type: 'string'
        }
      }
    };

    R.forEach(function(statusCodeObject) {
      expect(statusCodeObject).to.be.jsonSchema(senecaWebSchema);
    }, R.values(statusCodes));
  });

  it('exports entries with matching keys -> { $http -> status }', function() {
    R.forEach(function(statusCode) {
      expect(statusCodes[statusCode].http$.status).to.equal(parseInt(statusCode, 10));
    }, R.keys(statusCodes));
  });

  it('strips [1,2,3,4,5,7]xx entries', function() {
    expect(R.pick(['1xx', '2xx', '3xx', '4xx', '5xx', '7xx'], statusCodes)).be.empty;
  });
});
