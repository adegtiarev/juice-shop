/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: index.ts
*    
*    Copyrights:
*      copyright © by bjoern kimminich 2014-2021
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
import confetti from 'canvas-confetti'

const timeout = (ms: number) => {
    return new Promise((resolve,reject) => {
        setTimeout(resolve,ms)
    })
}
export const shootConfetti = () => {
    const canvas = document.createElement('canvas')
    canvas.style.position = "fixed"
    canvas.style.left = "0"
    canvas.style.right = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "2000"

    document.body.appendChild(canvas)

    const shoot = confetti.create(canvas,{
        resize: true
    })
    shoot({
        origin:{
            x:1,
            y:1
        },
        particleCount: 225
    })

    shoot({
        origin:{
            y:1,
            x:0
        },
        particleCount: 225
    })

    timeout(6000).then(() => {
        canvas.remove()
    })
}