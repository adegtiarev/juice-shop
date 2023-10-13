/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v12.9.0
*    Source File: two-factor-auth-service.ts
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
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'

interface TwoFactorVerifyResponse {
  authentication: AuthenticationPayload
}

interface AuthenticationPayload {
  token: string
  bid: number
  umail: string
}

interface TwoFactorAuthStatusPayload {
  setup: boolean
  secret?: string
  setupToken?: string
  email?: string
}

@Injectable({
  providedIn: 'root'
  })
export class TwoFactorAuthService {
  constructor (private readonly http: HttpClient) {}

  verify (totpToken: String): Observable<AuthenticationPayload> {
    return this.http.post<TwoFactorVerifyResponse>(`${environment.hostServer}/rest/2fa/verify`, {
      tmpToken: localStorage.getItem('totp_tmp_token'),
      totpToken: totpToken
    }).pipe(map((response: TwoFactorVerifyResponse) => response.authentication), catchError((error) => { throw error }))
  }

  status (): Observable<TwoFactorAuthStatusPayload> {
    return this.http.get<TwoFactorAuthStatusPayload>(`${environment.hostServer}/rest/2fa/status`)
      .pipe(map((response: TwoFactorAuthStatusPayload) => response), catchError((error) => { throw error }))
  }

  setup (password: string, initialToken: string, setupToken?: string): Observable<void> {
    return this.http.post(`${environment.hostServer}/rest/2fa/setup`, {
      password,
      setupToken,
      initialToken
    }).pipe(map(() => undefined), catchError((error) => { throw error }))
  }

  disable (password: string): Observable<void> {
    return this.http.post(`${environment.hostServer}/rest/2fa/disable`, { password })
      .pipe(map(() => undefined), catchError((error) => { throw error }))
  }
}
