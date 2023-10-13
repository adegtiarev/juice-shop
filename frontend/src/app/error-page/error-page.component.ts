/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.0.3
*    Source File: error-page.component.ts
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

import { TranslateService } from '@ngx-translate/core'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faUserSlash, faHandPaper } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSlash, faHandPaper)
dom.watch()

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
  })
export class ErrorPageComponent implements OnInit {
  public error: string | null = null

  constructor (private readonly route: ActivatedRoute, private readonly translate: TranslateService) {
  }

  ngOnInit () {
    const errorKey = this.route.snapshot.queryParams.error
    if (errorKey) {
      this.translate.get(errorKey).subscribe((errorMessage) => {
        this.error = errorMessage
      }, (translationId) => {
        this.error = translationId
      })
    }
  }
}
