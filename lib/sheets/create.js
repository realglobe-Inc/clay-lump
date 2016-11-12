/**
 * Create a new sheet
 * @function create
 * @param {string} kind
 * @param {string} sheetName
 * @param {object} config
 * @returns {Sheet}
 */
'use strict'

const SharedSheet = require('./shared_sheet')
const PrivateSheet = require('./private_sheet')
const { LogPrefixes } = require('clay-constants')

const constructors = {
  shared: SharedSheet,
  private: PrivateSheet
}

/** @lends create */
function create (kind, sheetName, config) {
  const { LUMP_PREFIX } = LogPrefixes
  let constructor = constructors[ kind ]
  if (!constructor) {
    throw new Error(`[${LUMP_PREFIX}] Unknown sheet kind: ${kind}`)
  }
  return new constructor(sheetName, config)
}

module.exports = create
