/*
 * Aspirant
 * Traits in JavaScript
*/

/*globals module, require */

var createBeech = require('beech');

var composeTraits = function(aTraits, aObjectInCreation){
  'use strict';

  createBeech(aTraits)
    .map( // create object from each trait
      function(aTrait){
        var result = {};
        aTrait.apply(result);
        return result;
    })
    .flatten(1) // now collection of name/method-pairs
    .map( // instrument objectInCreation with methods
      function(aName, aMethod){
        aObjectInCreation[aName] = aMethod;
    });

  return aObjectInCreation;
};

module.exports =  function (aSuperclassConstructor){
  'use strict';
  var superClass = aSuperclassConstructor;
  var clientClass;
  var traits = [];
  var acquire;
  var become;
  var aspirant;

  acquire = function(aTraitConstructor){
    traits.push(aTraitConstructor);
    return aspirant;
  };

  become = function(aClientClassConstructor){
    clientClass = aClientClassConstructor;
    return function(){
      var result = {};
      if (superClass){
        superClass.apply(result);
      }
      result = composeTraits(traits, result);
      if (clientClass){
        clientClass.apply(result);
      }

      return result;
    };
  };

  aspirant = {
    acquire : acquire, 
    become : become
  };
  return aspirant;
};

