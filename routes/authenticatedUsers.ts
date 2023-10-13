/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: authenticatedUsers.ts
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

import * as utils from '../lib/utils'
const security = require('../lib/insecurity')

module.exports = function retrieveUserList () {
  return (_req: Request, res: Response, next: NextFunction) => {
    UserModel.findAll().then((users: UserModel[]) => {
      const usersWithLoginStatus = utils.queryResultToJson(users)
      usersWithLoginStatus.data.forEach((user: { token: string, password: string, totpSecret: string }) => {
        user.token = security.authenticatedUsers.tokenOf(user)
        if (user.password) {
          user.password = user.password.replace(/./g, '*')
        }
        if (user.totpSecret) {
          user.totpSecret = user.totpSecret.replace(/./g, '*')
        }
      })
      res.json(usersWithLoginStatus)
    }).catch((error: Error) => {
      next(error)
    })
  }
}
