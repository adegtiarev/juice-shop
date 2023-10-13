/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: basket.component.ts
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

import { Component, NgZone } from '@angular/core'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'

library.add(faCartArrowDown)
dom.watch()

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
  })
export class BasketComponent {
  public productCount: number = 0
  public bonus: number = 0

  constructor (private readonly router: Router, private readonly ngZone: NgZone) {}

  checkout () {
    this.ngZone.run(async () => await this.router.navigate(['/address/select']))
  }

  getProductCount (total) {
    this.productCount = total
  }

  getBonusPoints (total) {
    sessionStorage.setItem('itemTotal', total[0])
    this.bonus = total[1]
  }
}
