'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _collectionNames = require('./collectionNames');

var _collectionNames2 = _interopRequireDefault(_collectionNames);

var _BaseRepository2 = require('./BaseRepository');

var _BaseRepository3 = _interopRequireDefault(_BaseRepository2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// getByID, deleteByID and update uses model.deviceID as ID for querying
var DeviceAttributeDatabaseRepository = function (_BaseRepository) {
  (0, _inherits3.default)(DeviceAttributeDatabaseRepository, _BaseRepository);

  function DeviceAttributeDatabaseRepository(database, productDeviceRepository) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, DeviceAttributeDatabaseRepository);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DeviceAttributeDatabaseRepository.__proto__ || (0, _getPrototypeOf2.default)(DeviceAttributeDatabaseRepository)).call(this, database, _collectionNames2.default.DEVICE_ATTRIBUTES));

    _this._collectionName = _collectionNames2.default.DEVICE_ATTRIBUTES;
    _this.create = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              throw new Error('The method is not implemented');

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.deleteByID = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(deviceID) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this._database.remove(_this._collectionName, {
                  deviceID: deviceID.toLowerCase()
                });

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.getAll = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var userID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var query;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = userID ? { ownerID: userID } : {};
                _context3.next = 3;
                return _this._database.find(_this._collectionName, query);

              case 3:
                _context3.t0 = _this._parseVariables;
                return _context3.abrupt('return', _context3.sent.map(_context3.t0));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function () {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.getByID = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(deviceID) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = _this;
                _context4.next = 3;
                return _this._database.findOne(_this._collectionName, {
                  deviceID: deviceID.toLowerCase()
                });

              case 3:
                _context4.t1 = _context4.sent;
                return _context4.abrupt('return', _context4.t0._parseVariables.call(_context4.t0, _context4.t1));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.getByName = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(name) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = _this;
                _context5.next = 3;
                return _this._database.findOne(_this._collectionName, {
                  name: name
                });

              case 3:
                _context5.t1 = _context5.sent;
                return _context5.abrupt('return', _context5.t0._parseVariables.call(_context5.t0, _context5.t1));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    _this.getManyFromIDs = function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(deviceIDs, ownerID
      // todo  $in operator doesn't work for neDb(no matter with regexp or plain strings)
      ) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this._database.find(_this._collectionName, (0, _extends3.default)({
                  deviceID: {
                    $in: deviceIDs.map(function (id) {
                      return id.toLowerCase();
                    })
                  }
                }, ownerID ? { ownerID: ownerID } : {}));

              case 2:
                _context6.t0 = _this._parseVariables;
                return _context6.abrupt('return', _context6.sent.map(_context6.t0));

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this2);
      }));

      return function (_x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.updateByID = function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(deviceID, _ref8) {
        var variables = _ref8.variables,
            props = (0, _objectWithoutProperties3.default)(_ref8, ['variables']);
        var attributesToSave, existingAttributes, productDevice;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                attributesToSave = (0, _extends3.default)({}, props, variables ? { variables: (0, _stringify2.default)(variables) } : {}, {
                  deviceID: deviceID.toLowerCase()
                });

                // Keep product-devices in sync

                _context7.next = 3;
                return _this.getByID(deviceID);

              case 3:
                existingAttributes = _context7.sent;
                _context7.next = 6;
                return _this._productDeviceRepository.getFromDeviceID(deviceID);

              case 6:
                productDevice = _context7.sent;

                if (!productDevice) {
                  _context7.next = 11;
                  break;
                }

                productDevice.productFirmwareVersion = existingAttributes ? existingAttributes.productFirmwareVersion : 65535;
                _context7.next = 11;
                return _this._productDeviceRepository.updateByID(productDevice.id, productDevice);

              case 11:
                _context7.next = 13;
                return _this._database.findAndModify(_this._collectionName, { deviceID: deviceID.toLowerCase() }, { $set: (0, _extends3.default)({}, attributesToSave, { timestamp: new Date() }) });

              case 13:
                return _context7.abrupt('return', _context7.sent);

              case 14:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this2);
      }));

      return function (_x7, _x8) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this._parseVariables = function (attributesFromDB) {
      if (!attributesFromDB) {
        return null;
      }

      var variables = attributesFromDB.variables;

      try {
        return (0, _extends3.default)({}, attributesFromDB, {
          variables: variables ? JSON.parse(variables) : undefined
        });
      } catch (ignore) {
        return attributesFromDB;
      }
    };

    _this._database = database;
    _this._productDeviceRepository = productDeviceRepository;
    return _this;
  }

  // mongo and neDB don't support dots in variables names
  // but some of the server users want to have dots in their device var names
  // so we have to stringify them and parse back.


  return DeviceAttributeDatabaseRepository;
}(_BaseRepository3.default);

exports.default = DeviceAttributeDatabaseRepository;