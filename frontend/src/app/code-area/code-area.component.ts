/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://owasp-juice.shop
*    Release: https://github.com/juice-shop/juice-shop/releases/tag/v13.3.0
*    Source File: code-area.component.ts
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
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core'

interface LineMarker {
  marked: boolean
  lineNumber: number
}

@Component({
  selector: 'app-code-area',
  templateUrl: './code-area.component.html',
  styleUrls: ['./code-area.component.scss']
  })
export class CodeAreaComponent implements OnInit {
  @Input('code')
  public code: string = ''

  @Input('vulnLines')
  public vulnLines: number[]

  public lineMarkers: LineMarker[]

  @Output()
  addLine = new EventEmitter<number[]>()

  public langs = ['javascript', 'typescript', 'json', 'yaml']

  ngOnInit (): void {
    this.lineMarkers = this.code.split('\n').map((line, lineIndex) => {
      return {
        lineNumber: lineIndex + 1,
        marked: false
      }
    })
  }

  selectLines (lineNumber): void {
    // need to get the marker from index lineNumber - 1 as the array index start at 0, while the lineNumbers start at 1
    const marker = this.lineMarkers[lineNumber - 1]
    marker.marked = !marker.marked

    // convert lineMarkers to array of markedLineNumber
    const markedLineNumbers: number[] = []
    for (const { marked, lineNumber } of this.lineMarkers) {
      if (marked) {
        markedLineNumbers.push(lineNumber)
      }
    }
    this.addLine.emit(markedLineNumbers)
  }
}
