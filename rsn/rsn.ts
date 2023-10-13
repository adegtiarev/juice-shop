/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: rsn.ts
*    
*    Copyrights:
*      copyright © by bjoern kimminich & the owasp juice shop contributors
*      copyright (c) 2014-2021 bjoern kimminich
*      copyright (c) 2014-2022 bjoern kimminich & the owasp juice shop contributors
*    
*    Licenses:
*      MIT License
*      SPDXId: MIT
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
import { readFiles, checkDiffs, getDataFromFile, checkData } from './rsnUtil'
import colors from 'colors/safe'

const keys = readFiles()
checkDiffs(keys)
  .then(data => {
    console.log('---------------------------------------')
    const fileData = getDataFromFile()
    const filesWithDiff = checkData(data, fileData)
    if (filesWithDiff.length === 0) {
      console.log(`${colors.green(colors.bold('No new file diffs recognized since last lock!'))} No action required.`)
    } else {
      console.log(`${colors.red(colors.bold('New file diffs recognized since last lock!'))} Double-check and amend listed files and lock new state with ${colors.bold('npm run rsn:update')}`)
      console.log('---------------------------------------')
      process.exitCode = 1
    }
  })
  .catch(err => {
    console.log(err)
    process.exitCode = 1
  })
