/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v12.9.0
*    Source File: product.service.ts
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

import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
  })
export class ProductService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/api/Products'

  constructor (private readonly http: HttpClient) { }

  search (criteria: string) {
    return this.http.get(`${this.hostServer}/rest/products/search?q=${criteria}`).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }

  find (params: any) {
    return this.http.get(this.host + '/', { params: params }).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }

  get (id: number) {
    return this.http.get(`${this.host}/${id}?d=${encodeURIComponent(new Date().toDateString())}`).pipe(map((response: any) =>
      response.data), catchError((err) => { throw err }))
  }

  put (id: number, params) {
    return this.http.put(`${this.host}/${id}`, params).pipe(map((response: any) => response.data), catchError((err) => { throw err }))
  }
}
