/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: profileImageFileUpload.ts
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

import fs = require('fs')
import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/user'
import logger from '../lib/logger'

import * as utils from '../lib/utils'
const security = require('../lib/insecurity')
const fileType = require('file-type')

module.exports = function fileUpload () {
  return async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file
    const buffer = file?.buffer
    const uploadedFileType = await fileType.fromBuffer(buffer)

    if (uploadedFileType === undefined) {
      res.status(500)
      next(new Error('Illegal file type'))
    } else {
      if (uploadedFileType !== null && utils.startsWith(uploadedFileType.mime, 'image')) {
        const loggedInUser = security.authenticatedUsers.get(req.cookies.token)
        if (loggedInUser) {
          fs.open(`frontend/dist/frontend/assets/public/images/uploads/${loggedInUser.data.id}.${uploadedFileType.ext}`, 'w', function (err, fd) {
            if (err != null) logger.warn('Error opening file: ' + err.message)
            // @ts-expect-error
            fs.write(fd, buffer, 0, buffer.length, null, function (err) {
              if (err != null) logger.warn('Error writing file: ' + err.message)
              fs.close(fd, function () { })
            })
          })
          UserModel.findByPk(loggedInUser.data.id).then(async (user: UserModel | null) => {
            if (user) {
              return await user.update({ profileImage: `assets/public/images/uploads/${loggedInUser.data.id}.${uploadedFileType.ext}` })
            }
          }).catch((error: Error) => {
            next(error)
          })
          res.location(process.env.BASE_PATH + '/profile')
          res.redirect(process.env.BASE_PATH + '/profile')
        } else {
          next(new Error('Blocked illegal activity by ' + req.socket.remoteAddress))
        }
      } else {
        res.status(415)
        next(new Error(`Profile image upload does not accept this file type${uploadedFileType ? (': ' + uploadedFileType.mime) : '.'}`))
      }
    }
  }
}
