/*
 * Aspirant
 * Traits in JavaScript
*/

/*globals module */

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
      var index;
      if (superClass){
        superClass.apply(result);
      }
      for (index = 0; index < traits.length;index += 1) {
        traits[index].apply(result);
      }
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

