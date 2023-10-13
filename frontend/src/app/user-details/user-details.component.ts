/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v12.9.0
*    Source File: user-details.component.ts
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

import { UserService } from '../Services/user.service'
import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowCircleLeft)
dom.watch()

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
  })
export class UserDetailsComponent implements OnInit {
  public user: any
  constructor (@Inject(MAT_DIALOG_DATA) public dialogData: any, private readonly userService: UserService) { }

  ngOnInit () {
    this.userService.get(this.dialogData.id).subscribe((user) => {
      this.user = user
    }, (err) => console.log(err))
  }
}
