/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: updateUserProfile.ts
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

import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/user'
import challengeUtils = require('../lib/challengeUtils')
import * as utils from '../lib/utils'

const security = require('../lib/insecurity')
const cache = require('../data/datacache')
const challenges = cache.challenges

module.exports = function updateUserProfile () {
  return (req: Request, res: Response, next: NextFunction) => {
    const loggedInUser = security.authenticatedUsers.get(req.cookies.token)

    if (loggedInUser) {
      UserModel.findByPk(loggedInUser.data.id).then((user: UserModel | null) => {
        if (user) {
          challengeUtils.solveIf(challenges.csrfChallenge, () => {
            return ((req.headers.origin?.includes('://htmledit.squarefree.com')) ??
              (req.headers.referer?.includes('://htmledit.squarefree.com'))) &&
              req.body.username !== user.username
          })
          void user.update({ username: req.body.username }).then((savedUser: UserModel) => {
            savedUser = utils.queryResultToJson(savedUser)
            const updatedToken = security.authorize(savedUser)
            security.authenticatedUsers.put(updatedToken, savedUser)
            res.cookie('token', updatedToken)
            res.location(process.env.BASE_PATH + '/profile')
            res.redirect(process.env.BASE_PATH + '/profile')
          })
        }
      }).catch((error: Error) => {
        next(error)
      })
    } else {
      next(new Error('Blocked illegal activity by ' + req.socket.remoteAddress))
    }
  }
}
