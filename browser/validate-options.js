!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.validateOptions=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/validate-options');

},{"./lib/validate-options":2}],2:[function(require,module,exports){
//
// Simple module to validate the presence of required options.
//

var _ = require('underscore');
var errorClass = Error;

//
// Check if the specified option is valid.
//
function isValid(options, key) {
    var value = _.isFunction(options) ? options(key) : options[key];

    if (typeof value === 'undefined') {
        return false;
    }

    if (value === null) {
        return false;
    }

    if (value === '') {
        return false;
    }

    if (_.isNaN(value)) {
        return false;
    }

    return true;
}

//
// hasAll(options, 'key1', 'key2', ...);
//
// Ensures that all the specified keys exist and are nonempty strings.
module.exports.hasAll = function hasAll() {
    var missing = [];
    var options = arguments[0];
    for (var i = 1; i < arguments.length; ++i) {
        var key = arguments[i];
        if (! isValid(options, key)) {
            missing.push(key);
        }
    }

    if (missing.length) {
        var err = 'Missing required option' +
                (missing.length > 1 ? 's' : '') +
                ': ' + missing.join(', ');
        throw new errorClass(err);
    }

    return true;
};

//
// hasOne(options, 'key1', 'key2', ...);
//
// Ensures that at least one of the specified keys exist and are
// nonempty strings.
//
module.exports.hasOne = function hasOne() {
    var options = arguments[0];
    for (var i = 1; i < arguments.length; ++i) {
        var key = arguments[i];
        if (isValid(options, key)) {
            return true; // found one
        }
    }

    var opts = Array.prototype.slice.call(arguments, 1);
    throw new errorClass('Missing at least one required option from' +
                    ': ' + opts.join(', '));
};

//
// setErrorClass(errorClass)
//
// Override the class used for validation errors
//
module.exports.setErrorClass = function(c) {
    errorClass = c;
};

},{"underscore":undefined}]},{},[1])(1)
});


//# sourceMappingURL=validate-options.js.map