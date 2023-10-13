/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v12.9.0
*    Source File: welcome.component.ts
*    
*    Copyrights:
*      copyright (c) 2014-2021 bjoern kimminich
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

import { Component, OnInit } from '@angular/core'
import { ConfigurationService } from '../Services/configuration.service'
import { MatDialog } from '@angular/material/dialog'
import { WelcomeBannerComponent } from '../welcome-banner/welcome-banner.component'
import { CookieService } from 'ngx-cookie'

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.component.html',
  styleUrls: ['./welcome.component.scss']
  })

export class WelcomeComponent implements OnInit {
  private readonly welcomeBannerStatusCookieKey = 'welcomebanner_status'

  constructor (private readonly dialog: MatDialog, private readonly configurationService: ConfigurationService, private readonly cookieService: CookieService) { }

  ngOnInit (): void {
    const welcomeBannerStatus = this.cookieService.get(this.welcomeBannerStatusCookieKey)
    if (welcomeBannerStatus !== 'dismiss') {
      this.configurationService.getApplicationConfiguration().subscribe((config: any) => {
        if (config?.application?.welcomeBanner && !config.application.welcomeBanner.showOnFirstStart) {
          return
        }
        this.dialog.open(WelcomeBannerComponent, {
          minWidth: '320px',
          width: '35%',
          position: {
            top: '50px'
          }
        })
      }, (err) => console.log(err))
    }
  }
}
