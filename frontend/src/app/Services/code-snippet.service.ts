/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: code-snippet.service.ts
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
import { Observable } from 'rxjs'

export interface CodeSnippet {
  vulnLines?: number[]
  snippet: string
}

export interface Solved {
  challenges: string[]
}

@Injectable({
  providedIn: 'root'
  })
export class CodeSnippetService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/snippets'

  constructor (private readonly http: HttpClient) { }

  get (key: string): Observable<CodeSnippet> {
    return this.http.get<CodeSnippet>(`${this.host}/${key}`).pipe(map((response: CodeSnippet) => response), catchError((err) => { throw err }))
  }

  challenges () {
    return this.http.get(`${this.host}`).pipe(map((response: any) => response.challenges), catchError((err) => { throw err }))
  }
}
