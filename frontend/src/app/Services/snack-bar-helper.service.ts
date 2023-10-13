/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v12.9.0
*    Source File: snack-bar-helper.service.ts
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

import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
  })
export class SnackBarHelperService {
  constructor (private readonly translateService: TranslateService,
    private readonly snackBar: MatSnackBar) { }

  open (message: string, cssClass?: string) {
    this.translateService.get(message).subscribe((translatedMessage) => {
      this.snackBar.open(translatedMessage, 'X', {
        duration: 5000,
        panelClass: cssClass
      })
    }, () => {
      this.snackBar.open(message, 'X', {
        duration: 5000,
        panelClass: cssClass
      })
    })
  }
}
