"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialize = void 0;

var _mobx = require("mobx");

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var buildPath = function buildPath(path, key) {
  return path ? path.concat(key) : [key];
};

var serialize = function serialize(config) {
  var storeKeysCandidate = [];
  return function process(store) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if ((0, _isEmpty["default"])(store)) {
      return [];
    }

    for (var key in store) {
      if (store.hasOwnProperty(key)) {
        var storeValue = store[key];

        if (config.ignoreKeys && config.ignoreKeys.includes(key)) {
          continue;
        }

        if ((0, _mobx.isObservableProp)(store, key)) {
          storeKeysCandidate.push(path.concat(key));
        } else if ((0, _isObject["default"])(storeValue)) {
          process(storeValue, buildPath(path, key));
        }
      }
    }

    return storeKeysCandidate;
  };
};

exports.serialize = serialize;