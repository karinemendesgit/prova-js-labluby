(function(win, doc) {
    'use strict';

    function DOM(elements) {
        if(!(this instanceof DOM))
            return new DOM(elements);
        this.element = document.querySelectorAll(elements);
    };    

    DOM.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    
    DOM.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    
    DOM.isFunction = function (obj) {
          return Object.prototype.toString.call(obj) === '[object Function]';
    };
    
    DOM.isNumber = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    DOM.isString = function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };
    
    DOM.isBoolean = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Boolean]';
    };
    
    DOM.isNull = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Null]' || Object.prototype.toString.call(obj) === '[object Undefined]';
    };

    DOM.prototype.on = function (eventType, callback) {
        Array.prototype.forEach.call(this.element, (element) => {
            element.addEventListener(eventType, callback, false);
        });    
    };

    DOM.prototype.off = function (eventType, callback) {
        Array.prototype.forEach.call(this.element, (element) => {
            element.removeEventListener(eventType, callback, false);
        });    
    };

    DOM.prototype.get = function (index) {
        if (!index)
            return this.element[0];
        return this.element[index]
    };

    DOM.prototype.forEach = function() {
        return Array.prototype.forEach.apply(this.element, arguments);
    };

    DOM.prototype.map = function() {
        return Array.prototype.map.apply(this.element, arguments);
    };

    DOM.prototype.filter = function() {
        return Array.prototype.filter.apply(this.element, arguments);
    };

    DOM.prototype.reduce = function() {
        return Array.prototype.reduce.apply(this.element, arguments);
    };

    DOM.prototype.reduceRight = function() {
        return Array.prototype.reduceRight.apply(this.element, arguments);
    };

    DOM.prototype.every = function() {
        return Array.prototype.every.apply(this.element, arguments);
    };

    DOM.prototype.some = function() {
        return Array.prototype.some.apply(this.element, arguments);
    };    
    
    win.DOM = DOM;

})(window, document);