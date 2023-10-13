/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: vuln-lines.service.ts
*    
*    Copyrights:
*      copyright © by bjoern kimminich & the owasp juice shop contributors
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
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

export interface result {
  verdict: boolean
  hint: string
}

@Injectable({
  providedIn: 'root'
  })
export class VulnLinesService {
  private readonly hostServer = environment.hostServer
  private readonly host = this.hostServer + '/snippets/verdict'

  constructor (private readonly http: HttpClient) { }

  check (key: string, selectedLines: number[]): any {
    return this.http.post(this.host, {
      key: key,
      selectedLines: selectedLines
    }).pipe(map((response: result) => response), catchError((error: any) => { throw error }))
  }
}
