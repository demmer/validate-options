var validateOpts = require('./validate-options');
var expect = require('chai').expect;

describe("validate options", function() {
    describe("hasAll", function() {
        it("ensures all required options are present", function() {
            expect(validateOpts.hasAll({a: 'abc', b: 'def'}, 'a', 'b')).equal(true);
            expect(validateOpts.hasAll({a: 0, b: 1}, 'a', 'b')).equal(true);
            expect(validateOpts.hasAll({a: '0', b: '1'}, 'a', 'b')).equal(true);
            expect(validateOpts.hasAll({a: 'null', b: 'undefined'}, 'a', 'b')).equal(true);
        });

        it("raises an error if no required options are given", function() {
            expect(function() { return validateOpts.hasAll({}, 'a', 'b'); })
                .throws(Error);
        });

        it("raises an error if one required option is missing", function() {
            expect(function() { return validateOpts.hasAll({a: 123}, 'a', 'b'); })
                .throws(Error);
        });

        it("raises an error if a required option is null", function() {
            expect(function() { return validateOpts.hasAll({a: null, b: 'def'}, 'a', 'b'); })
                .throws(Error);
        });

        it("raises an error if a required option is an empty string", function() {
            expect(function() { return validateOpts.hasAll({a: '123', b: ''}, 'a', 'b'); })
                .throws(Error);
        });

        it("supports an option accessor callback", function() {
            expect(validateOpts.hasAll(function(key) { return {a: 'abc', b: 'def'}[key]; },
                                       'a', 'b')).equal(true);
            expect(function() {
                return validateOpts.hasAll(function(key) { return {a: 'abc'}[key]; }, 'a', 'b');
            }).throws(Error);
        });

    });

    describe("hasOne", function() {
        it("ensures one of the required options is present", function() {
            expect(validateOpts.hasOne({a: 'abc'}, 'a', 'b')).equal(true);
            expect(validateOpts.hasOne({b: 'def'}, 'a', 'b')).equal(true);
            expect(validateOpts.hasOne({a: 123, b: 'def'}, 'a', 'b')).equal(true);
        });

        it("raises an error if all required options are missing", function() {
            expect(function() { return validateOpts.hasOne({}, 'a', 'b'); })
                .throws(Error);
        });

        it("raises an error if all required options are null", function() {
            expect(function() { return validateOpts.hasOne({a: null, b: null}, 'a', 'b'); })
                .throws(Error);
        });

        it("raises an error if all required options are empty strings", function() {
            expect(function() { return validateOpts.hasOne({a: '', b: ''}, 'a', 'b'); })
                .throws(Error);
        });
    });

    describe("setErrorClass", function() {
        function MyError(message) {
            this.name = 'MyError';
            this.message = 'my error message: ' + message;
            this.stack = (new Error()).stack;
        }
        MyError.prototype = new Error();

        it("overrides the error type", function() {
            try {
                validateOpts.setErrorClass(MyError);
                validateOpts.hasAll({}, 'foo');
                throw new Error('not reached');
            } catch (e) {
                expect(e).instanceOf(MyError);
                expect(e).instanceOf(Error);
                expect(e.message).equals('my error message: Missing required option: foo');
            }
        });
    });

});
