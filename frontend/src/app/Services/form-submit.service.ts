/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: form-submit.service.ts
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

import { Inject, Injectable } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Injectable({
  providedIn: 'root'
  })
export class FormSubmitService {
  constructor (@Inject(DOCUMENT) private readonly _document: HTMLDocument) { }

  attachEnterKeyHandler (formId: string, submitButtonId: string, onSubmit: Function) {
    const form = this._document.getElementById(formId) as HTMLFormElement
    const submitButton = this._document.getElementById(submitButtonId) as HTMLInputElement

    form.addEventListener('keyup', function (event) {
      event.preventDefault()
      // eslint-disable-next-line import/no-deprecated
      if (event.keyCode === 13 && !submitButton.disabled) {
        onSubmit()
      }
    })
  }
}
