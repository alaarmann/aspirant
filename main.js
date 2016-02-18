/*
 * Aspirant
 * Traits in JavaScript
*/

/*globals module, require */

var createBeech = require('beech');

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
      createBeech(traits).map(
        function(aTrait){
          aTrait.apply(result);
        });
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

