"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.default = _default;

var _bs = _interopRequireDefault(require("bs58"));

var _js = require("@metaplex/js");

var _web = require("@solana/web3.js");

var _anchor = require("@project-serum/anchor");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const programs = global.SolanaABIPrograms || {};

global.SolanaABIPrograms = programs;

/**
 *
 * @param {{programId: string, encodedData: string, connection: import('@solana/web3.js').Connection}} args
 * @returns
 */
async function _default(args) {
  ["programId", "encodedData", "connection"].map((e) => {
    if (!args[e]) throw new Error(`${e} is required`);
  });

  const { programId, encodedData, connection } = args;

  if (!programs[programId]) {
    programs[programId] = await _anchor.Program.at(
      programId.toString(),
      new _anchor.Provider(connection),
      new _js.NodeWallet(_web.Keypair.generate()),
      {}
    );
  }

  const bs58Decoded = _bs.default.decode(encodedData);
  const decodedBuffer = Buffer.from(bs58Decoded);
  const program = programs[programId];
  const coder = new _anchor.BorshInstructionCoder(program.idl);
  const decodedData = coder.decode(decodedBuffer);
  const buyerPrice = decodedData.data.buyerPrice.toNumber();
  return {
    programId,
    encodedData,
    decodedData,
    buyerPrice,
  };
}

module.exports = _default;