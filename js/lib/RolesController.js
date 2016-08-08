/**
*    Copyright (C) 2013-2014 Spark Labs, Inc. All rights reserved. -  https://www.spark.io/
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Affero General Public License, version 3,
*    as published by the Free Software Foundation.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU Affero General Public License for more details.
*
*    You should have received a copy of the GNU Affero General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*    You can download the source here: https://github.com/spark/spark-server
*/

var fs = require('fs');
var path = require('path');
var when = require('when');
var sequence = require('when/sequence');
var pipeline = require('when/pipeline');
var PasswordHasher = require('./PasswordHasher.js');
var roles = require('./RolesController.js');
var settings = require('../settings.js');
var logger = require('./logger.js');
var utilities = require("./utilities.js");

function RolesController() {
    this.init();
};

RolesController.prototype = {
    users: null,
    usersByToken: null,
    usersByDevice: null,
    usersByClaimCode: null,
    usersByUsername: null,
    tokens: null,
    claimCodes: null,
	devices: null,

    init: function () {
        this._loadAndCacheUsers();
    },

    addUser: function (userObj) {
        this.users.push(userObj);
        this.usersByUsername[ userObj.username ] = userObj;

        if (userObj.access_token) {
            this.usersByToken[userObj.access_token] = userObj;
            this.tokens.push({
                user_id: userObj._id,
                expires: userObj.access_token_expires_at
            });
        }

        for (var i = 0; i < userObj.access_tokens.length; i++) {
            var token = userObj.access_tokens[i];
            this.usersByToken[ token ] = userObj;
            this.tokens[token.token] = token;
        }
        
        //claim codes
        this.claimCodes[userObj._id] = userObj.claim_codes;
        for (var i = 0; i < userObj.claim_codes.length; i++) {
            var claimCode = userObj.claim_codes[i];
            this.usersByClaimCode[claimCode] = userObj;
        }
        
        //devices claimed
        this.devices[userObj._id] = userObj.devices;
        for (var i = 0; i < userObj.devices.length; i++) {
            var deviceId = userObj.devices[i];
            this.usersByDevice[ deviceId ] = userObj;
        }
    },
    destroyAccessToken: function (access_token) {
        var userObj = this.usersByToken[access_token];
        if (!userObj) {
            return true;
        }
        
        delete this.usersByToken[access_token];
        /*if (userObj.access_token == access_token) {
            userObj.access_token = null;
        }*/

        for (var i = 0; i < userObj.access_tokens.length; i++) {
            var tokenObj = userObj.access_tokens[i];
            if (tokenObj.token == access_token) {
                userObj.access_tokens.splice(i, 1);
            }
        }

        this.saveUser(userObj);
    },
    addAccessToken: function (accessToken, clientId, userId, expires) {
        var tmp = when.defer();
        try {
            var userObj = this.getUserByUserid(userId);
            this.usersByToken[accessToken] = userObj;

            var tokenObj = {
                user_id: userId,
                client_id: clientId,
                token: accessToken,
                expires: expires,
                _id: accessToken
            };

            this.tokens[accessToken] = tokenObj;
            userObj.access_tokens.push(tokenObj);
            this.saveUser(userObj);
            tmp.resolve();
        }
        catch (ex) {
            logger.error("Error adding access token ", ex);
            tmp.reject(ex);
        }
        return tmp.promise;
    },
    addClaimCode: function (claimCode, userId) {
        var tmp = when.defer();
        try {
            var userObj = this.getUserByUserid(userId);
            
            userObj.claim_codes.push(claimCode);
            this.saveUser(userObj);
            
            this.usersByClaimCode[ claimCode ] = userObj;
            
            tmp.resolve();
        }
        catch (ex) {
            logger.error("Error adding claim code ", ex);
            tmp.reject(ex);
        }
        return tmp.promise;
    },
	addDevice: function (deviceId, userId) {
        var tmp = when.defer();
        try {
            var userObj = this.getUserByUserid(userId);
			
			/*var deviceObj = {
			    id: deviceId,
			    name: null
			};*/
			
			if(!this.usersByDevice[deviceId]) {
				userObj.devices.push(deviceId);
				this.saveUser(userObj);
				
				this.usersByDevice[ deviceId ] = userObj;
				
				tmp.resolve();
			} else if(this.usersByDevice[deviceId] == userObj) {
				tmp.resolve();
			} else {
				tmp.reject("already claimed");
			}
        }
        catch (ex) {
            logger.error("Error adding device ", ex);
            tmp.reject(ex);
        }
        return tmp.promise;
    },
	removeDevice: function (deviceId, userId) {
		var tmp = when.defer();
		try {
	        var userObj = this.getUserByUserid(userId);

	        delete this.usersByDevice[deviceId];
	        var index = utilities.indexOf(userObj.devices, deviceId);
	        if (index > -1) {
	            userObj.devices.splice(index, 1);
	        }
	
	        this.saveUser(userObj);
			tmp.resolve();
		}
		catch (ex) {
		    logger.error("Error releasing device ", ex);
		    tmp.reject(ex);
		}
		return tmp.promise;
    },  
    saveUser: function (userObj) {
        var userFile = path.join(settings.userDataDir, userObj.username) + ".json";
        var userJson = JSON.stringify(userObj, null, 2);
        fs.writeFileSync(userFile, userJson);
    },

    _loadAndCacheUsers: function () {
        this.users = [];
        this.usersByToken = {};
        this.usersByDevice = {};
        this.usersByUsername = {};
        this.usersByClaimCode = [];
        this.tokens = {};
        this.claimCodes = [];
		this.devices = [];

        // list files, load all user objects, index by access_tokens and usernames
		// and devices
        if (!fs.existsSync(settings.userDataDir)) {
            fs.mkdirSync(settings.userDataDir);
        }


        var files = fs.readdirSync(settings.userDataDir);
        if (!files || (files.length == 0)) {
            logger.error([ "-------", "No users exist, you should create some users!", "-------", ].join("\n"));
        }

        for (var i = 0; i < files.length; i++) {
            try {

                var filename = path.join(settings.userDataDir, files[i]);
                var userObj = JSON.parse(fs.readFileSync(filename));

                console.log("Loading user " + userObj.username);
                this.addUser(userObj);
            }
            catch (ex) {
                logger.error("RolesController - error loading user at " + filename);
            }
        }
    },


    getUserByToken: function (access_token) {
        return this.usersByToken[access_token];
    },
	getUserByDevice: function (deviceId) {
	    return this.usersByDevice[deviceId];
	},
	getUserByClaimCode: function (claimCode) {
	    return this.usersByClaimCode[claimCode];
	},
	
    getUserByName: function (username) {
        return this.usersByUsername[username];
    },
    getTokenInfoByToken: function (token) {
        return this.tokens[token];
    },
    getUserByUserid: function (userid) {
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            if (user._id == userid) {
                return user;
            }
        }
        return null;
    },


    validateHashPromise: function (user, password) {
        var tmp = when.defer();

        PasswordHasher.hash(password, user.salt, function (err, hash) {
            if (err) {
                logger.error("hash error " + err);
                tmp.reject("Bad password");
            }
            else if (hash === user.password_hash) {
                tmp.resolve(user);
            }
            else {
                tmp.reject("Bad password");
            }
        });

        return tmp.promise;
    },


    validateLogin: function (username, password) {
        var userObj = this.getUserByName(username);
        if (!userObj) {
            return when.reject("Bad password");
        }

        return this.validateHashPromise(userObj, password);
    },

    createUser: function (username, password) {
        var tmp = when.defer();
        var that = this;

        PasswordHasher.generateSalt(function (err, userid) {
            userid = userid.toString('base64');
            userid = userid.substring(0, 32);

            PasswordHasher.generateSalt(function (err, salt) {
                salt = salt.toString('base64');
                PasswordHasher.hash(password, salt, function (err, hash) {
                    var user = {
                        _id: userid,
                        username: username,
                        password_hash: hash,
                        salt: salt,
                        access_tokens: [],
                        claim_codes: [],
                        devices: []
                    };

                    var userFile = path.join(settings.userDataDir, username + ".json");
                    fs.writeFileSync(userFile, JSON.stringify(user));

                    that.addUser(user);

                    tmp.resolve();
                });
            });
        });

        return tmp.promise;
    }
};
module.exports = global.roles = new RolesController();