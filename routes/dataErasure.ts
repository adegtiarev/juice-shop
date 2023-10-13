/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: dataErasure.ts
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
import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import { SecurityAnswerModel } from '../models/securityAnswer'
import { UserModel } from '../models/user'
import { SecurityQuestionModel } from '../models/securityQuestion'
import { PrivacyRequestModel } from '../models/privacyRequests'
const insecurity = require('../lib/insecurity')

const challenges = require('../data/datacache').challenges
const challengeUtils = require('../lib/challengeUtils')
const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const loggedInUser = insecurity.authenticatedUsers.get(req.cookies.token)
  if (!loggedInUser) {
    next(new Error('Blocked illegal activity by ' + req.socket.remoteAddress))
    return
  }
  const email = loggedInUser.data.email

  try {
    const answer = await SecurityAnswerModel.findOne({
      include: [{
        model: UserModel,
        where: { email }
      }]
    })
    if (!answer) {
      throw new Error('No answer found!')
    }
    const question = await SecurityQuestionModel.findByPk(answer.SecurityQuestionId)
    if (!question) {
      throw new Error('No question found!')
    }

    res.render('dataErasureForm', { userEmail: email, securityQuestion: question.question })
  } catch (error) {
    next(error)
  }
})

interface DataErasureRequestParams {
  layout?: string
  email: string
  securityAnswer: string
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req: Request<{}, {}, DataErasureRequestParams>, res: Response, next: NextFunction): Promise<void> => {
  const loggedInUser = insecurity.authenticatedUsers.get(req.cookies.token)
  if (!loggedInUser) {
    next(new Error('Blocked illegal activity by ' + req.socket.remoteAddress))
    return
  }

  try {
    await PrivacyRequestModel.create({
      UserId: loggedInUser.data.id,
      deletionRequested: true
    })

    res.clearCookie('token')
    if (req.body.layout !== undefined) {
      const filePath: string = path.resolve(req.body.layout).toLowerCase()
      const isForbiddenFile: boolean = (filePath.includes('ftp') || filePath.includes('ctf.key') || filePath.includes('encryptionkeys'))
      if (!isForbiddenFile) {
        res.render('dataErasureResult', {
          ...req.body
        }, (error, html) => {
          if (!html || error) {
            next(new Error(error.message))
          } else {
            const sendlfrResponse: string = html.slice(0, 100) + '......'
            res.send(sendlfrResponse)
            challengeUtils.solve(challenges.lfrChallenge)
          }
        })
      } else {
        next(new Error('File access not allowed'))
      }
    } else {
      res.render('dataErasureResult', {
        ...req.body
      })
    }
  } catch (error) {
    next(error)
  }
})

export default router
