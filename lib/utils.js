"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterKeys = void 0;

var _pick = _interopRequireDefault(require("lodash/pick"));

var _omit = _interopRequireDefault(require("lodash/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var filterKeys = function filterKeys(store, config) {
  if (config.whiteList) {
    return (0, _pick["default"])(store, config.whiteList);
  }

  if (config.blackList) {
    return (0, _omit["default"])(store, config.blackList);
  }

  return store;
};

exports.filterKeys = filterKeys;