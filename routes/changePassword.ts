/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: changePassword.ts
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

const security = require('../lib/insecurity')
const cache = require('../data/datacache')
const challenges = cache.challenges

module.exports = function changePassword () {
  return ({ query, headers, connection }: Request, res: Response, next: NextFunction) => {
    const currentPassword = query.current
    const newPassword = query.new
    const newPasswordInString = newPassword?.toString()
    const repeatPassword = query.repeat
    if (!newPassword || newPassword === 'undefined') {
      res.status(401).send(res.__('Password cannot be empty.'))
    } else if (newPassword !== repeatPassword) {
      res.status(401).send(res.__('New and repeated password do not match.'))
    } else {
      const token = headers.authorization ? headers.authorization.substr('Bearer='.length) : null
      const loggedInUser = security.authenticatedUsers.get(token)
      if (loggedInUser) {
        if (currentPassword && security.hash(currentPassword) !== loggedInUser.data.password) {
          res.status(401).send(res.__('Current password is not correct.'))
        } else {
          UserModel.findByPk(loggedInUser.data.id).then((user: UserModel | null) => {
            if (user) {
              user.update({ password: newPasswordInString }).then((user: UserModel) => {
                challengeUtils.solveIf(challenges.changePasswordBenderChallenge, () => { return user.id === 3 && !currentPassword && user.password === security.hash('slurmCl4ssic') })
                res.json({ user })
              }).catch((error: Error) => {
                next(error)
              })
            }
          }).catch((error: Error) => {
            next(error)
          })
        }
      } else {
        next(new Error('Blocked illegal activity by ' + connection.remoteAddress))
      }
    }
  }
}
