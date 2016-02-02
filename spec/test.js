/*
 * Aspirant Unit Tests
*/

/*globals require, describe, it, expect */

var Aspirant = require('../main');

describe("Aspirant", function() {
  'use strict';
 
  describe("constructor", function() {
    it("constructs an aspirant object", function() {
      var aspirant = new Aspirant();
      expect(aspirant).not.toBe(null);
    });
  });
});


