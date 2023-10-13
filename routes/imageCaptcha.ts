/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: imageCaptcha.ts
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
import { ImageCaptchaModel } from '../models/imageCaptcha'
import { Op } from 'sequelize'

const svgCaptcha = require('svg-captcha')
const security = require('../lib/insecurity')

function imageCaptchas () {
  return (req: Request, res: Response) => {
    const captcha = svgCaptcha.create({ size: 5, noise: 2, color: true })

    const imageCaptcha = {
      image: captcha.data,
      answer: captcha.text,
      UserId: security.authenticatedUsers.from(req).data.id
    }
    const imageCaptchaInstance = ImageCaptchaModel.build(imageCaptcha)
    imageCaptchaInstance.save().then(() => {
      res.json(imageCaptcha)
    }).catch(() => {
      res.status(400).send(res.__('Unable to create CAPTCHA. Please try again.'))
    })
  }
}

imageCaptchas.verifyCaptcha = () => (req: Request, res: Response, next: NextFunction) => {
  const user = security.authenticatedUsers.from(req)
  const UserId = user ? user.data ? user.data.id : undefined : undefined
  ImageCaptchaModel.findAll({
    limit: 1,
    where: {
      UserId: UserId,
      createdAt: {
        [Op.gt]: new Date(Date.now() - 300000)
      }
    },
    order: [['createdAt', 'DESC']]
  }).then(captchas => {
    if (!captchas[0] || req.body.answer === captchas[0].answer) {
      next()
    } else {
      res.status(401).send(res.__('Wrong answer to CAPTCHA. Please try again.'))
    }
  }).catch(() => {
    res.status(401).send(res.__('Something went wrong while submitting CAPTCHA. Please try again.'))
  })
}

module.exports = imageCaptchas
