/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: token-sale.component.ts
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

import { ConfigurationService } from '../Services/configuration.service'
import { Component, OnInit } from '@angular/core'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'
import { faCommentAlt, faComments, faGraduationCap, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt as farCommentAlt, faComments as farComments } from '@fortawesome/free-regular-svg-icons'

library.add(faBitcoin, faUniversity, faGraduationCap, faCommentAlt, faComments, farCommentAlt, farComments)
dom.watch()

@Component({
  selector: 'app-token-sale',
  templateUrl: './token-sale.component.html',
  styleUrls: ['./token-sale.component.scss']
  })
export class TokenSaleComponent implements OnInit {
  public altcoinName = 'Juicycoin'
  constructor (private readonly configurationService: ConfigurationService) { }

  ngOnInit () {
    this.configurationService.getApplicationConfiguration().subscribe((config: any) => {
      if (config?.application?.altcoinName) {
        this.altcoinName = config.application.altcoinName
      }
    }, (err) => console.log(err))
  }
}
