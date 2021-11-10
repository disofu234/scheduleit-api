const buildMakeRoom = require('./room');
const Hashes = require('jshashes');
const { cloneDeep } = require('lodash');

const md5 = new Hashes.MD5;

const makeRoom = buildMakeRoom(md5.hex, cloneDeep);

module.exports = {
  makeRoom
};