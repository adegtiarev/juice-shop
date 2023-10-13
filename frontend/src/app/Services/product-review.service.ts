/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: product-review.service.ts
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

import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
  })
export class ProductReviewService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/rest/products'

  constructor (private readonly http: HttpClient) { }

  get (id: number) {
    return this.http.get(`${this.host}/${id}/reviews`).pipe(
      map((response: any) => response.data), catchError((err: Error) => {
        throw err
      })
    )
  }

  create (id: number, review: { message: string, author: string }) {
    return this.http.put(`${this.host}/${id}/reviews`, review).pipe(map((response: any) => response.data),
      catchError((err) => { throw err })
    )
  }

  patch (review: { id: string, message: string }) {
    return this.http.patch(this.host + '/reviews', review).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }

  like (_id?: string) {
    return this.http.post(this.host + '/reviews', { id: _id }).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }
}
