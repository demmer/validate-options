validate-options [![Build Status: Linux](https://travis-ci.org/jut-io/validate-options.png?branch=master)](https://travis-ci.org/jut-io/validate-options)
================

Simple module for checking that a set of required options exist and are
non-empty strings in a given options object.

Useful for proactively verifying that an API was called with the required
configuration.

Runs in node and in the browser.

Installation
------------

$ npm install validate-options

Usage
-----
var validateOpts = require('validate-options');

    var opts = {
        cat: "muffy",
        dog: "rufus"
    };

    validateOpts.hasAll(opts, 'cat'); // ok
    validateOpts.hasAll(opts, 'cat', 'dog'); // ok
    validateOpts.hasAll(opts, 'cat', 'fish'); // Error('Missing required option: fish');
    validateOpts.hasAll(opts, 'fish', 'pony'); // Error('Missing required options: fish, pony');

    validateOpts.hasOne(opts, 'cat'); // ok
    validateOpts.hasOne(opts, 'cat', 'dog'); // ok
    validateOpts.hasOne(opts, 'cat', 'fish'); // ok
    validateOpts.hasOne(opts, 'fish', 'pony'); // Error('Missing at least one required option from: fish, pony');

Options Callback
----------------

For either `hasAll` or `hasOne`, the options argument can be given a function,
in which case it is called with the required option key and should return the
value.

For example:

    function getConfig(key) {
        if (key === 'cat') { return "muffy"; }
        if (key === 'dog') { return "rufus"; }
        return undefined;
    }

    validateOpts.hasAll(getConfig, 'cat'); // ok
    validateOpts.hasAll(getConfig, 'cat', 'dog'); // ok
    validateOpts.hasAll(getConfig, 'cat', 'fish'); // Error('Missing required option: fish');
    validateOpts.hasAll(getConfig, 'fish', 'pony'); // Error('Missing required options: fish, pony');

    validateOpts.hasOne(getConfig, 'cat'); // ok
    validateOpts.hasOne(getConfig, 'cat', 'dog'); // ok
    validateOpts.hasOne(getConfig, 'cat', 'fish'); // ok
    validateOpts.hasOne(getConfig, 'fish', 'pony'); // Error('Missing at least one required option from: fish, pony');


Custom Error Types
------------------
By default the library will throw a vanilla `Error` object which can be overridden.

    var validateOpts = require('validate-options');
    validateOpts.setErrorClass(ValidationError);
    validateOpts.hasAll({foo: 'bar'}, 'baz'); // ValidationError('Missing required option: baz');
