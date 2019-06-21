"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsan = _interopRequireDefault(require("jsan"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _mobx = require("mobx");

var _serialize = require("./serialize");

var _parseStore = require("./parse-store");

var _utils = require("./utils");

var _keys = require("./keys");

var _createMigration = require("./create-migration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AsyncThunk =
/*#__PURE__*/
function () {
  _createClass(AsyncThunk, [{
    key: "_persist",
    value: function () {
      var _persist2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var persistKeys, storeToSave;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                persistKeys = (0, _serialize.serialize)(this.config)(this.store);
                storeToSave = (0, _pick["default"])(this.store, persistKeys);
                _context.next = 5;
                return this.storage.setItem(_keys.storageKey, _jsan["default"].stringify({
                  version: this.config.version,
                  data: storeToSave
                }, null, null, {
                  circular: _keys.circularKey
                }));

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (this.config.debug) {
                  console.warn(_context.t0);
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function _persist() {
        return _persist2.apply(this, arguments);
      }

      return _persist;
    }()
  }]);

  function AsyncThunk(store, config, storage) {
    _classCallCheck(this, AsyncThunk);

    this.store = (0, _utils.filterKeys)(store, config);
    this.config = config;
    this.storage = storage;
  }

  _createClass(AsyncThunk, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var data, storageData, migrated;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.storage.getItem(_keys.storageKey);

              case 3:
                data = _context2.sent;

                if (data) {
                  storageData = _jsan["default"].parse(data);
                  migrated = (0, _createMigration.createMigrations)(storageData.version, storageData.data, this.config);
                  (0, _mobx.runInAction)(function () {
                    (0, _parseStore.parseStore)(_this.store, migrated, false);
                  });
                }

                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);

                if (this.config.debug) {
                  console.error(_context2.t0);
                }

                return _context2.abrupt("return");

              case 11:
                this._persist();

                (0, _mobx.autorun)(this._persist.bind(this), {
                  name: _keys.autorunKey
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return AsyncThunk;
}();

var _default = AsyncThunk;
exports["default"] = _default;