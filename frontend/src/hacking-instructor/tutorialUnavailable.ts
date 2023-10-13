/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.0.3
*    Source File: tutorialUnavailable.ts
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

import {
  waitInMs
} from './helpers/helpers'
import { ChallengeInstruction } from './'

export const TutorialUnavailableInstruction: ChallengeInstruction = {
  name: null,
  hints: [
    {
      text:
        '😓 Sorry, this hacking challenge does not have a step-by-step tutorial (yet) ... 🧭 Can you find your own way to solve it?',
      fixture: 'app-navbar',
      resolved: waitInMs(15000)
    },
    {
      text:
        '✍️ Do you want to contribute a tutorial for this challenge? [Check out our documentation](https://pwning.owasp-juice.shop/part3/tutorials.html) to learn how! 🏫',
      fixture: 'app-navbar',
      resolved: waitInMs(15000)
    },
    {
      text:
        'And now: 👾 **GLHF** with this challenge!',
      fixture: 'app-navbar',
      resolved: waitInMs(10000)
    }
  ]
}
