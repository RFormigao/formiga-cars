(function (win, doc) {
  'use strict';

  function DOM(string) {

    if(!(this instanceof DOM))
      return new DOM(string);

    this.element = doc.querySelectorAll(string);
  }

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element, function (element){
      element.addEventListener(event, callback, false);
    });
  }

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element, function (element){
      element.removeEventListener(event, callback, false);
    });
  }

  DOM.prototype.get = function get() {
    return this.element;
  }

  DOM.prototype.methodArray = function methodArray(method, callback) {
    switch (method) {
      case 'forEach':
        return Array.prototype.forEach.call(this.element, callback);
      case 'map':
        return Array.prototype.map.call(this.element, callback);
      case 'filter':
        return Array.prototype.filter.call(this.element, callback);
      case 'reduce':
        return Array.prototype.reduce.call(this.element, callback);
      case 'reduceRight':
        return Array.prototype.reduceRight.call(this.element, callback);
      case 'every':
        return Array.prototype.every.call(this.element, callback);
      case 'some':
        return Array.prototype.some.call(this.element, callback);
    }
  }

  DOM.prototype.verifyTypeObject = function verifyTypeObject (type, param) {
    if (type === 'Null')
      return Object.prototype.toString.call( param ) === '[object Undefined]' ||
             Object.prototype.toString.call( param ) === '[object Null]';

    return Object.prototype.toString.call( param ) === '[object '+ type +']';
  }

  win.DOM = DOM;

})(window, document)
