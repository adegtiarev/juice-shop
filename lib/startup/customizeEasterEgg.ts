/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: customizeEasterEgg.ts
*    
*    Copyrights:
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
/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import config from 'config'
import * as utils from '../utils'
const replace = require('replace')

const customizeEasterEgg = async () => {
  if (config.has('application.easterEggPlanet.overlayMap')) {
    let overlay: string = config.get('application.easterEggPlanet.overlayMap')
    if (utils.isUrl(overlay)) {
      const overlayPath = overlay
      overlay = utils.extractFilename(overlay)
      await utils.downloadToFile(overlayPath, 'frontend/dist/frontend/assets/private/' + overlay)
    }
    replaceImagePath(overlay)
  }
  if (config.has('application.easterEggPlanet.name')) {
    replaceThreeJsTitleTag()
  }
}

const replaceImagePath = (overlay: string) => {
  const textureDeclaration = 'orangeTexture = THREE.ImageUtils.loadTexture("/assets/private/' + overlay + '");'
  replace({
    regex: /orangeTexture = .*;/,
    replacement: textureDeclaration,
    paths: ['frontend/dist/frontend/assets/private/threejs-demo.html'],
    recursive: false,
    silent: true
  })
}

const replaceThreeJsTitleTag = () => {
  const threeJsTitleTag = '<title>Welcome to Planet ' + config.get('application.easterEggPlanet.name') + '</title>'
  replace({
    regex: /<title>.*<\/title>/,
    replacement: threeJsTitleTag,
    paths: ['frontend/dist/frontend/assets/private/threejs-demo.html'],
    recursive: false,
    silent: true
  })
}

module.exports = customizeEasterEgg
