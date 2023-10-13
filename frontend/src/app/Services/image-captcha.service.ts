/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.0.3
*    Source File: image-captcha.service.ts
*    
*    Copyrights:
*      copyright (c) 2014-2021 bjoern kimminich & the owasp juice shop contributors
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

import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
  })
export class ImageCaptchaService {
  private readonly hostServer = environment.hostServer

  constructor (private readonly http: HttpClient) { }

  getCaptcha () {
    return this.http.get(this.hostServer + '/rest/image-captcha/').pipe(catchError((err) => { throw err }))
  }
}
