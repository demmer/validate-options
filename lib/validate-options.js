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
