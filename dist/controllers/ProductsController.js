'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _desc, _value, _class;
/* eslint-disable */

var _Controller2 = require('./Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

var _allowUpload = require('../decorators/allowUpload');

var _allowUpload2 = _interopRequireDefault(_allowUpload);

var _csv = require('csv');

var _csv2 = _interopRequireDefault(_csv);

var _httpVerb = require('../decorators/httpVerb');

var _httpVerb2 = _interopRequireDefault(_httpVerb);

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _route = require('../decorators/route');

var _route2 = _interopRequireDefault(_route);

var _HttpError = require('../lib/HttpError');

var _HttpError2 = _interopRequireDefault(_HttpError);

var _deviceToAPI = require('../lib/deviceToAPI');

var _deviceToAPI2 = _interopRequireDefault(_deviceToAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var ProductsController = (_dec = (0, _httpVerb2.default)('get'), _dec2 = (0, _route2.default)('/v1/products'), _dec3 = (0, _httpVerb2.default)('post'), _dec4 = (0, _route2.default)('/v1/products'), _dec5 = (0, _httpVerb2.default)('get'), _dec6 = (0, _route2.default)('/v1/products/:productIDOrSlug'), _dec7 = (0, _httpVerb2.default)('put'), _dec8 = (0, _route2.default)('/v1/products/:productIDOrSlug'), _dec9 = (0, _httpVerb2.default)('delete'), _dec10 = (0, _route2.default)('/v1/products/:productIDOrSlug'), _dec11 = (0, _httpVerb2.default)('get'), _dec12 = (0, _route2.default)('/v1/products/:productIDOrSlug/config'), _dec13 = (0, _httpVerb2.default)('get'), _dec14 = (0, _route2.default)('/v1/products/:productIDOrSlug/devices'), _dec15 = (0, _httpVerb2.default)('get'), _dec16 = (0, _route2.default)('/v1/products/:productIDOrSlug/devices/:deviceIDorName'), _dec17 = (0, _httpVerb2.default)('post'), _dec18 = (0, _route2.default)('/v1/products/:productIDOrSlug/devices'), _dec19 = (0, _allowUpload2.default)('file', 1), _dec20 = (0, _httpVerb2.default)('put'), _dec21 = (0, _route2.default)('/v1/products/:productIDOrSlug/devices/:deviceIDorName'), _dec22 = (0, _httpVerb2.default)('delete'), _dec23 = (0, _route2.default)('/v1/products/:productIDOrSlug/devices/:deviceIDorName'), _dec24 = (0, _httpVerb2.default)('get'), _dec25 = (0, _route2.default)('/v1/products/:productIdOrSlug/events/:eventPrefix?*'), _dec26 = (0, _httpVerb2.default)('delete'), _dec27 = (0, _route2.default)('/v1/products/:productIdOrSlug/team/:username'), (_class = function (_Controller) {
  (0, _inherits3.default)(ProductsController, _Controller);

  function ProductsController(deviceManager, deviceAttributeRepository, organizationRepository, productRepository, productConfigRepository, productDeviceRepository, productFirmwareRepository) {
    (0, _classCallCheck3.default)(this, ProductsController);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ProductsController.__proto__ || (0, _getPrototypeOf2.default)(ProductsController)).call(this));

    _this._deviceManager = deviceManager;
    _this._deviceAttributeRepository = deviceAttributeRepository;
    _this._organizationRepository = organizationRepository;
    _this._productConfigRepository = productConfigRepository;
    _this._productDeviceRepository = productDeviceRepository;
    _this._productFirmwareRepository = productFirmwareRepository;
    _this._productRepository = productRepository;
    return _this;
  }

  (0, _createClass3.default)(ProductsController, [{
    key: 'getProducts',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var products;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._productRepository.getAll();

              case 2:
                products = _context.sent;
                return _context.abrupt('return', this.ok({ products: products.map(this._formatProduct) }));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProducts() {
        return _ref.apply(this, arguments);
      }

      return getProducts;
    }()
  }, {
    key: 'createProduct',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(model) {
        var missingFields, organizations, organizationID, product, config;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (model.product) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', this.bad('You must provide a product'));

              case 2:
                missingFields = ['description', 'hardware_version', 'name', 'platform_id', 'type'].filter(function (key) {
                  return !model.product[key] && model.product[key] !== 0;
                });

                if (!missingFields.length) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', this.bad('Missing fields: ' + missingFields.join(', ')));

              case 5:
                _context2.next = 7;
                return this._organizationRepository.getByUserID(this.user.id);

              case 7:
                organizations = _context2.sent;

                if (organizations.length) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', this.bad("You don't have access to any organizations"));

              case 10:
                organizationID = organizations[0].id;

                model.product.organization = organizationID;
                _context2.next = 14;
                return this._productRepository.create(model.product);

              case 14:
                product = _context2.sent;
                _context2.next = 17;
                return this._productConfigRepository.create({
                  org_id: organizationID,
                  product_id: product.id
                });

              case 17:
                config = _context2.sent;

                product.config_id = config.id;
                _context2.next = 21;
                return this._productRepository.updateByID(product.id, product);

              case 21:
                return _context2.abrupt('return', this.ok({ product: [this._formatProduct(product)] }));

              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createProduct(_x) {
        return _ref2.apply(this, arguments);
      }

      return createProduct;
    }()
  }, {
    key: 'getProduct',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(productIDOrSlug) {
        var product;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context3.sent;

                if (product) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return', this.bad('Product does not exist', 404));

              case 5:
                return _context3.abrupt('return', this.ok({ product: [this._formatProduct(product)] }));

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getProduct(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getProduct;
    }()
  }, {
    key: 'updateProduct',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(productIDOrSlug, model) {
        var missingFields, product;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (model.product) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt('return', this.bad('You must provide a product'));

              case 2:
                missingFields = ['config_id', 'description', 'hardware_version', 'id', 'name', 'organization', 'platform_id', 'type'].filter(function (key) {
                  return !model.product[key] && model.product[key] !== 0;
                });

                if (!missingFields.length) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', this.bad('Missing fields: ' + missingFields.join(', ')));

              case 5:
                _context4.next = 7;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 7:
                product = _context4.sent;

                if (product) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', this.bad('Product ' + productIDOrSlug + ' doesn\'t exist'));

              case 10:
                _context4.next = 12;
                return this._productRepository.updateByID(product.id, (0, _extends3.default)({}, product, model.product));

              case 12:
                product = _context4.sent;
                return _context4.abrupt('return', this.ok({ product: [this._formatProduct(product)] }));

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateProduct(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updateProduct;
    }()
  }, {
    key: 'deleteProduct',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(productIDOrSlug) {
        var product;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context5.sent;

                if (product) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt('return', this.bad('Product does not exist', 404));

              case 5:
                _context5.next = 7;
                return this._productRepository.deleteByID(product.id);

              case 7:
                _context5.next = 9;
                return this._productFirmwareRepository.deleteByProductID(product.id);

              case 9:
                _context5.next = 11;
                return this._productDeviceRepository.deleteByProductID(product.id);

              case 11:
                return _context5.abrupt('return', this.ok());

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteProduct(_x5) {
        return _ref5.apply(this, arguments);
      }

      return deleteProduct;
    }()
  }, {
    key: 'getConfig',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(productIDOrSlug) {
        var product, config;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context6.sent;

                if (product) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt('return', this.bad('Product does not exist', 404));

              case 5:
                _context6.next = 7;
                return this._productConfigRepository.getByProductID(product.product_id);

              case 7:
                config = _context6.sent;
                return _context6.abrupt('return', this.ok({ product_configuration: config }));

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getConfig(_x6) {
        return _ref6.apply(this, arguments);
      }

      return getConfig;
    }()
  }, {
    key: 'getDevices',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(productIDOrSlug) {
        var _request$query, page, _request$query$page_s, page_size, product, totalDevices, productDevices, deviceIDs, deviceAttributesList, devices;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _request$query = this.request.query, page = _request$query.page, _request$query$page_s = _request$query.page_size, page_size = _request$query$page_s === undefined ? '25' : _request$query$page_s;
                _context7.next = 3;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 3:
                product = _context7.sent;

                if (product) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 6:
                _context7.next = 8;
                return this._productDeviceRepository.count({
                  productID: product.product_id
                });

              case 8:
                totalDevices = _context7.sent;
                _context7.next = 11;
                return this._productDeviceRepository.getManyByProductID(product.product_id, {
                  skip: Math.max(1, page) - 1,
                  take: parseInt(page_size, 10)
                });

              case 11:
                productDevices = _context7.sent;
                deviceIDs = productDevices.map(function (productDevice) {
                  return productDevice.deviceID;
                });
                _context7.next = 15;
                return this._deviceAttributeRepository.getManyFromIDs(deviceIDs);

              case 15:
                deviceAttributesList = _context7.sent;
                devices = productDevices.map(function (_ref8) {
                  var deviceID = _ref8.deviceID,
                      other = (0, _objectWithoutProperties3.default)(_ref8, ['deviceID']);

                  var deviceAttributes = deviceAttributesList.find(function (item) {
                    return deviceID === item.deviceID;
                  });
                  return (0, _extends3.default)({}, (0, _deviceToAPI2.default)(deviceAttributes), other, {
                    id: deviceID,
                    product_id: product.product_id
                  });
                });
                return _context7.abrupt('return', this.ok({
                  accounts: [],
                  devices: devices,
                  meta: { total_pages: Math.ceil(totalDevices / parseInt(page_size, 10)) }
                }));

              case 18:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getDevices(_x7) {
        return _ref7.apply(this, arguments);
      }

      return getDevices;
    }()
  }, {
    key: 'getSingleDevice',
    value: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(productIDOrSlug, deviceIDorName) {
        var deviceID, product, deviceAttributes, productDevice;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._deviceManager.getDeviceID(deviceIDorName);

              case 2:
                deviceID = _context8.sent;
                _context8.next = 5;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 5:
                product = _context8.sent;

                if (product) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 8:
                _context8.next = 10;
                return this._deviceAttributeRepository.getByID(deviceID);

              case 10:
                deviceAttributes = _context8.sent;

                if (deviceAttributes) {
                  _context8.next = 13;
                  break;
                }

                return _context8.abrupt('return', this.bad('Device ' + deviceID + ' doesn\'t exist.'));

              case 13:
                _context8.next = 15;
                return this._productDeviceRepository.getFromDeviceID(deviceID);

              case 15:
                productDevice = _context8.sent;

                if (productDevice) {
                  _context8.next = 18;
                  break;
                }

                return _context8.abrupt('return', this.bad('Device ' + deviceID + ' hasn\'t been assigned to a product'));

              case 18:
                return _context8.abrupt('return', this.ok((0, _extends3.default)({}, (0, _deviceToAPI2.default)(deviceAttributes), productDevice, {
                  product_id: product.product_id
                })));

              case 19:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getSingleDevice(_x8, _x9) {
        return _ref9.apply(this, arguments);
      }

      return getSingleDevice;
    }()
  }, {
    key: 'addDevice',
    value: function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(productIDOrSlug, body) {
        var _this2 = this;

        var product, ids, _file, originalname, records, deviceAttributes, incorrectPlatformDeviceIDs, existingProductDeviceIDs, invalidDeviceIds, deviceAttributeIDs, nonmemberDeviceIds, idsToCreate, createdProductDevices;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 2:
                product = _context9.sent;

                if (product) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 5:
                ids = [];

                if (!(body.import_method === 'many')) {
                  _context9.next = 23;
                  break;
                }

                _file = body.file;

                if (_file) {
                  _context9.next = 10;
                  break;
                }

                return _context9.abrupt('return', this.bad('No file uploaded'));

              case 10:
                originalname = _file.originalname;

                if (!(!originalname.endsWith('.txt') && !originalname.endsWith('.csv'))) {
                  _context9.next = 13;
                  break;
                }

                return _context9.abrupt('return', this.bad('File must be csv or txt file.'));

              case 13:
                _context9.next = 15;
                return new _promise2.default(function (resolve, reject) {
                  return _csv2.default.parse(_file.buffer.toString('utf8'), function (error, data) {
                    if (error) {
                      reject(error);
                    }
                    resolve(data);
                  });
                });

              case 15:
                records = _context9.sent;

                if (records.length) {
                  _context9.next = 18;
                  break;
                }

                return _context9.abrupt('return', this.bad('File didn\'t have any ids'));

              case 18:
                if (!records.some(function (record) {
                  return record.length !== 1;
                })) {
                  _context9.next = 20;
                  break;
                }

                return _context9.abrupt('return', this.bad('File should only have a single column of device ids'));

              case 20:

                ids = [].concat.apply([], records);
                _context9.next = 26;
                break;

              case 23:
                if (body.id) {
                  _context9.next = 25;
                  break;
                }

                return _context9.abrupt('return', this.bad('You must pass an id for a device'));

              case 25:

                ids = [body.id];

              case 26:

                ids = ids.map(function (id) {
                  return id.toLowerCase();
                });

                _context9.next = 29;
                return this._deviceAttributeRepository.getManyFromIDs(ids);

              case 29:
                deviceAttributes = _context9.sent;
                incorrectPlatformDeviceIDs = deviceAttributes.filter(function (deviceAttribute) {
                  return deviceAttribute.platformId !== undefined && deviceAttribute.platformId !== product.platform_id;
                }).map(function (deviceAttribute) {
                  return deviceAttribute.deviceID;
                });
                _context9.next = 33;
                return this._productDeviceRepository.getManyFromDeviceIDs(ids);

              case 33:
                _context9.t0 = function (productDevice) {
                  return productDevice.deviceID;
                };

                existingProductDeviceIDs = _context9.sent.map(_context9.t0);
                invalidDeviceIds = [].concat((0, _toConsumableArray3.default)(incorrectPlatformDeviceIDs), (0, _toConsumableArray3.default)(existingProductDeviceIDs));
                deviceAttributeIDs = deviceAttributes.map(function (deviceAttribute) {
                  return deviceAttribute.deviceID;
                });
                nonmemberDeviceIds = ids.filter(function (id) {
                  return !deviceAttributeIDs.includes(id);
                });

                if (!invalidDeviceIds.length) {
                  _context9.next = 40;
                  break;
                }

                return _context9.abrupt('return', {
                  data: {
                    updated: 0,
                    nonmemberDeviceIds: nonmemberDeviceIds,
                    invalidDeviceIds: invalidDeviceIds
                  },
                  status: 400
                });

              case 40:
                idsToCreate = ids.filter(function (id) {
                  return !invalidDeviceIds.includes(id) && !existingProductDeviceIDs.includes(id);
                });
                _context9.next = 43;
                return _promise2.default.all(idsToCreate.map(function (id) {
                  return _this2._productDeviceRepository.create({
                    denied: false,
                    development: false,
                    deviceID: id,
                    lockedFirmwareVersion: null,
                    productFirmwareVersion: 65535,
                    productID: product.product_id,
                    quarantined: nonmemberDeviceIds.includes(id)
                  });
                }));

              case 43:
                createdProductDevices = _context9.sent;


                // flash devices
                createdProductDevices.forEach(function (productDevice) {
                  _this2._deviceManager.flashProductFirmware(productDevice.productID, productDevice.deviceID);
                });

                return _context9.abrupt('return', this.ok({
                  updated: idsToCreate.length,
                  nonmemberDeviceIds: nonmemberDeviceIds,
                  invalidDeviceIds: invalidDeviceIds
                }));

              case 46:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function addDevice(_x10, _x11) {
        return _ref10.apply(this, arguments);
      }

      return addDevice;
    }()
  }, {
    key: 'updateProductDevice',
    value: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(productIDOrSlug, deviceIDorName, _ref12) {
        var denied = _ref12.denied,
            desired_firmware_version = _ref12.desired_firmware_version,
            development = _ref12.development,
            notes = _ref12.notes,
            quarantined = _ref12.quarantined;
        var deviceID, product, productDevice, shouldFlash, output, deviceFirmwares, parsedFirmware, updatedProductDevice;
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._deviceManager.getDeviceID(deviceIDorName);

              case 2:
                deviceID = _context10.sent;
                _context10.next = 5;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 5:
                product = _context10.sent;

                if (product) {
                  _context10.next = 8;
                  break;
                }

                return _context10.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 8:
                _context10.next = 10;
                return this._productDeviceRepository.getFromDeviceID(deviceID);

              case 10:
                productDevice = _context10.sent;

                if (productDevice) {
                  _context10.next = 13;
                  break;
                }

                return _context10.abrupt('return', this.bad('Device ' + deviceID + ' is not associated with a product'));

              case 13:
                shouldFlash = false;
                output = { id: productDevice.id, updated_at: new Date() };

                if (!(desired_firmware_version !== undefined)) {
                  _context10.next = 25;
                  break;
                }

                _context10.next = 18;
                return this._productFirmwareRepository.getManyByProductID(product.product_id);

              case 18:
                deviceFirmwares = _context10.sent;
                parsedFirmware = desired_firmware_version !== null ? parseInt(desired_firmware_version, 10) : null;

                if (!(parsedFirmware !== null && !deviceFirmwares.find(function (firmware) {
                  return firmware.version === parsedFirmware;
                }))) {
                  _context10.next = 22;
                  break;
                }

                return _context10.abrupt('return', this.bad('Firmware version ' + parsedFirmware + ' does not exist'));

              case 22:

                productDevice.lockedFirmwareVersion = parsedFirmware;
                output = (0, _extends3.default)({}, output, { desired_firmware_version: desired_firmware_version });

                shouldFlash = true;

              case 25:

                if (notes !== undefined) {
                  productDevice.notes = notes;
                  output = (0, _extends3.default)({}, output, { notes: notes });
                }

                if (development !== undefined) {
                  productDevice.development = development;
                  output = (0, _extends3.default)({}, output, { development: development });
                }

                if (denied !== undefined) {
                  productDevice.denied = denied;
                  output = (0, _extends3.default)({}, output, { denied: denied });
                }

                if (quarantined !== undefined) {
                  productDevice.quarantined = quarantined;
                  output = (0, _extends3.default)({}, output, { quarantined: quarantined });
                  shouldFlash = true;
                }

                _context10.next = 31;
                return this._productDeviceRepository.updateByID(productDevice.id, productDevice);

              case 31:
                updatedProductDevice = _context10.sent;


                if (shouldFlash) {
                  this._deviceManager.flashProductFirmware(productDevice.productID, productDevice.deviceID);
                }

                return _context10.abrupt('return', this.ok(output));

              case 34:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function updateProductDevice(_x12, _x13, _x14) {
        return _ref11.apply(this, arguments);
      }

      return updateProductDevice;
    }()
  }, {
    key: 'removeDeviceFromProduct',
    value: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(productIDOrSlug, deviceIDorName) {
        var deviceID, product, productDevice;
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this._deviceManager.getDeviceID(deviceIDorName);

              case 2:
                deviceID = _context11.sent;
                _context11.next = 5;
                return this._productRepository.getByIDOrSlug(productIDOrSlug);

              case 5:
                product = _context11.sent;

                if (product) {
                  _context11.next = 8;
                  break;
                }

                return _context11.abrupt('return', this.bad(productIDOrSlug + ' does not exist'));

              case 8:
                _context11.next = 10;
                return this._productDeviceRepository.getFromDeviceID(deviceID);

              case 10:
                productDevice = _context11.sent;

                if (productDevice) {
                  _context11.next = 13;
                  break;
                }

                return _context11.abrupt('return', this.bad('Device ' + deviceID + ' was not mapped to ' + productIDOrSlug));

              case 13:
                _context11.next = 15;
                return this._productDeviceRepository.deleteByID(productDevice.id);

              case 15:
                return _context11.abrupt('return', this.ok());

              case 16:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function removeDeviceFromProduct(_x15, _x16) {
        return _ref13.apply(this, arguments);
      }

      return removeDeviceFromProduct;
    }()
  }, {
    key: 'getEvents',
    value: function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(productIdOrSlug, eventName) {
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                throw new _HttpError2.default('Not implemented');

              case 1:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getEvents(_x17, _x18) {
        return _ref14.apply(this, arguments);
      }

      return getEvents;
    }()
  }, {
    key: 'removeTeamMember',
    value: function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(productIdOrSlug, username) {
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                throw new _HttpError2.default('not supported in the current server version');

              case 1:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function removeTeamMember(_x19, _x20) {
        return _ref15.apply(this, arguments);
      }

      return removeTeamMember;
    }()
  }, {
    key: '_formatProduct',
    value: function _formatProduct(product) {
      var product_id = product.product_id,
          output = (0, _objectWithoutProperties3.default)(product, ['product_id']);

      output.id = product_id.toString();
      return output;
    }
  }]);
  return ProductsController;
}(_Controller3.default), (_applyDecoratedDescriptor(_class.prototype, 'getProducts', [_dec, _dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getProducts'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'createProduct', [_dec3, _dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'createProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getProduct', [_dec5, _dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateProduct', [_dec7, _dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'deleteProduct', [_dec9, _dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'deleteProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getConfig', [_dec11, _dec12], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getConfig'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getDevices', [_dec13, _dec14], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getDevices'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getSingleDevice', [_dec15, _dec16], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getSingleDevice'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addDevice', [_dec17, _dec18, _dec19], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'addDevice'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateProductDevice', [_dec20, _dec21], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateProductDevice'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeDeviceFromProduct', [_dec22, _dec23], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'removeDeviceFromProduct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getEvents', [_dec24, _dec25], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getEvents'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeTeamMember', [_dec26, _dec27], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'removeTeamMember'), _class.prototype)), _class));
exports.default = ProductsController;
/* eslint-enable */