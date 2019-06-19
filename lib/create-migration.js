"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMigrations = void 0;

var _constant = require("./constant");

var createMigrations = function createMigrations(version, data, config) {
  var nextStore = data;
  var migrateVersion = config.migrations && config.version !== undefined ? config.version : _constant.DEFAULT_VERSION;

  if (version === migrateVersion) {
    if (config.debug) {
      console.warn("versions match, noop migration");
    }
  }

  if (version > migrateVersion) {
    if (config.debug) {
      console.error("downgrading version is not supported");
    }
  }

  if (version < migrateVersion) {
    for (var key = version; key <= migrateVersion; key++) {
      nextStore = config.migrations[key](nextStore);
    }
  }

  return nextStore;
};

exports.createMigrations = createMigrations;