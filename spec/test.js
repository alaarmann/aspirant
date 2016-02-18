/*
 * Aspirant Unit Tests
*/

/*globals require, describe, it, expect, beforeEach, xit */

var Aspirant = require('../main');

describe("Aspirant", function() {
  'use strict';

  beforeEach(function() {
    this.baseConstructor = function(){
      var name = 'Archibald X';
      var getName = function(){
        return name; 
      };
      var setName = function(aName){
        name = aName; 
      };
      this.getName = getName;
      this.setName = setName;
    };

    this.talker = function(){
      var talk = function(){
        return 'Hello, I am ' + this.getName(); 
      };
      this.talk = talk;
    };

    var walk = function(){
      return this.getName() + ' is walking'; 
    };

    this.walker = function(){
      this.walk = walk;
    };

    this.sameWalker = function(){
      this.walk = walk;
    };

    this.fastWalker = function(){
      var walk = function(){
        return this.getName() + ' is walking fast'; 
      };
      this.walk = walk;
    };

  });

 
  describe("constructor", function() {

    it("constructs an aspirant object", function() {
      var aspirant = new Aspirant();
      expect(aspirant).not.toBe(null);
    });

    it("accepts BaseConstructor", function() {
      var aspirant = new Aspirant(this.baseConstructor);
      var nameBearer = aspirant.become()();
      expect(nameBearer).not.toBe(null);
      expect(nameBearer.getName()).toBe('Archibald X');
    });
  });

  describe("acquire", function() {
    describe("when argument is a function (trait)", function() {
      it("acquires trait", function() {
        var aspirant = new Aspirant(this.baseConstructor);
        var talker = aspirant.acquire(this.talker).become()();
        expect(talker.talk()).toBe('Hello, I am Archibald X');
      });
    });
  });
  describe("become", function() {
    describe("when argument is a function (derived constructor)", function() {
      it("builds composite-constructor", function() {
        var aspirant = new Aspirant(this.baseConstructor);
        var talker = aspirant.acquire(this.talker).become(function(){this.talk = function(){return 'Not too much';};})();
        expect(talker.talk()).toBe('Not too much');
      });
    });
  });
  describe("end-to-end behaviour", function() {
    describe("when multiple traits offer the same method under the same name", function() {
      it("retains method", function() {
        var aspirant = new Aspirant(this.baseConstructor);
        var walker = aspirant
          .acquire(this.walker)
          .acquire(this.sameWalker)
          .become()();
        expect(walker.walk()).toBe('Archibald X is walking');
      });
    });
    describe("when multiple traits offer different methods under the same name", function() {
      xit("excludes method", function() {
        var aspirant = new Aspirant(this.baseConstructor);
        var walker = aspirant
          .acquire(this.walker)
          .acquire(this.sameWalker)
          .acquire(this.fastWalker)
          .become()();
        expect(walker.walk).not.toBeDefined();
      });
    });
  });
});


