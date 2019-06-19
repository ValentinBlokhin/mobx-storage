"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStore = void 0;

var _mobx = require("mobx");

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _keys = require("./keys");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-param-reassign */
var parseStore = function parseStore(store, data) {
  // if store or data is empty, break it
  if (!store || !data) {
    return;
  } // use data to iterate for avoid store does not set default value, and then
  // the properties will not exist actually. so, the observable
  // map/array/object field must has a default value, when the object is
  // constructed.


  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var storeValue = store[key];
      var dataValue = data[key]; // skip circular dependencies

      if (dataValue === _keys.circularKey) {
        continue;
      }

      if ((0, _mobx.isObservableArray)(storeValue)) {
        store[key] = _mobx.observable.array(dataValue);
      } else if ((0, _mobx.isObservableMap)(storeValue)) {
        store[key] = _mobx.observable.map(dataValue);
      } else if (!(0, _isObject["default"])(dataValue)) {
        store[key] = dataValue;
      } else if (!storeValue) {
        store[key] = dataValue;
      } else {
        parseStore(storeValue, dataValue);
      }
    }
  }
};

exports.parseStore = parseStore;