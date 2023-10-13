/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.0.3
*    Source File: server-started-notification.component.ts
*    
*    Copyrights:
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
/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { TranslateService } from '@ngx-translate/core'
import { ChallengeService } from '../Services/challenge.service'
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie'
import { SocketIoService } from '../Services/socket-io.service'

interface HackingProgress {
  autoRestoreMessage: string | null
  cleared: boolean
}

@Component({
  selector: 'app-server-started-notification',
  templateUrl: './server-started-notification.component.html',
  styleUrls: ['./server-started-notification.component.scss']
  })
export class ServerStartedNotificationComponent implements OnInit {
  public hackingProgress: HackingProgress = {} as HackingProgress

  constructor (private readonly ngZone: NgZone, private readonly challengeService: ChallengeService, private readonly translate: TranslateService, private readonly cookieService: CookieService, private readonly ref: ChangeDetectorRef, private readonly io: SocketIoService) {
  }

  ngOnInit () {
    this.ngZone.runOutsideAngular(() => {
      this.io.socket().on('server started', () => {
        const continueCode = this.cookieService.get('continueCode')
        const continueCodeFindIt = this.cookieService.get('continueCodeFindIt')
        const continueCodeFixIt = this.cookieService.get('continueCodeFixIt')
        if (continueCode) {
          this.challengeService.restoreProgress(encodeURIComponent(continueCode)).subscribe(() => {
            this.translate.get('AUTO_RESTORED_PROGRESS').subscribe((notificationServerStarted) => {
              this.hackingProgress.autoRestoreMessage = notificationServerStarted
            }, (translationId) => {
              this.hackingProgress.autoRestoreMessage = translationId
            })
          }, (error) => {
            console.log(error)
            this.translate.get('AUTO_RESTORE_PROGRESS_FAILED', { error: error }).subscribe((notificationServerStarted) => {
              this.hackingProgress.autoRestoreMessage = notificationServerStarted
            }, (translationId) => {
              this.hackingProgress.autoRestoreMessage = translationId
            })
          })
        }
        if (continueCodeFindIt) {
          this.challengeService.restoreProgressFindIt(encodeURIComponent(continueCodeFindIt)).subscribe(() => {
          }, (error) => {
            console.log(error)
          })
        }
        if (continueCodeFixIt) {
          this.challengeService.restoreProgressFixIt(encodeURIComponent(continueCodeFixIt)).subscribe(() => {
          }, (error) => {
            console.log(error)
          })
        }
        this.ref.detectChanges()
      })
    })
  }

  closeNotification () {
    this.hackingProgress.autoRestoreMessage = null
  }

  clearProgress () {
    this.cookieService.remove('continueCode')
    this.cookieService.remove('continueCodeFixIt')
    this.cookieService.remove('continueCodeFindIt')
    this.cookieService.remove('token')
    sessionStorage.removeItem('bid')
    sessionStorage.removeItem('itemTotal')
    localStorage.removeItem('token')
    localStorage.removeItem('displayedDifficulties')
    localStorage.removeItem('showSolvedChallenges')
    localStorage.removeItem('showDisabledChallenges')
    localStorage.removeItem('showOnlyTutorialChallenges')
    localStorage.removeItem('displayedChallengeCategories')
    this.hackingProgress.cleared = true
  }
}
