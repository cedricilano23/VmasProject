import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import * as search from '../../utils/data/search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: any;

  constructor() { }

  ngOnInit() {
  }

  fileChanged(e){
    this.file = e.target.files[0];
  }

  uploadDocument(file){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.createExcel2(search(fileReader.result));
    }
    var result = fileReader.readAsText(this.file)
  }

  createExcel2(results) {
    var wb = XLSX.utils.book_new()
    wb.Props = { 
      Title: "VMAS",
      Subject: "VMAS",
      Author: "VMAS",
      CreatedDate: new Date()
    }

    var books = Object.keys(results)
    books.forEach(book => {
      wb.SheetNames.push(book)
      var wbData = []
      var typeData = results[book].words
      var words = Object.keys(typeData)
      var morphemeCountTotal = 0

      wbData.push([
        "Word",
        "Stem",
        "Breakdown",
        "Affix 1",
        "Affix 2",
        "Affix 3",
        "Affix 4",
        "Classification 1",
        "Classification 2",
        "Adult Form",
        "",
        "Count of Word",
        "Count of Morpheme"
      ])

      words.forEach(word => {
        var wordObject = typeData[word]
        var morphemeCount = this.morphemeCounter(wordObject.data)

        morphemeCountTotal += morphemeCount
        wbData.push([
          word,
          wordObject.data.stem || "",
          wordObject.data.breakdown || "",
          wordObject.data.affix1 || "",
          wordObject.data.affix2 || "",
          wordObject.data.affix3 || "",
          wordObject.data.affix4 || "",
          wordObject.data.classification || "",
          wordObject.data.classification2 || "",
          wordObject.data.adult || "",
          "",
          wordObject.count,
          morphemeCount
        ])
      })

      wbData.push([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "TOTAL:",
        results[book].count,
        morphemeCountTotal
      ])

      var wbDataSheet = XLSX.utils.aoa_to_sheet(wbData);
      wb.Sheets[book] = wbDataSheet
    })

    var wbout = XLSX.write(
      wb, 
      { 
        bookType:'xlsx', 
        type: 'binary' 
      }
    ); 

    saveAs(
      new Blob(
        [ this.generateExcel(wbout) ], 
        { type: "application/octet-stream" }
      ),
      'test.xlsx'
    );
  }

  generateExcel(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for(var i = 0; i < s.length ; i++){
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  morphemeCounter(wordData) {
    var morphemeCount = 1
    if (wordData.affix1 !== undefined)
      morphemeCount++
    if (wordData.affix2 !== undefined)
      morphemeCount++
    if (wordData.affix3 !== undefined)
      morphemeCount++
    if (wordData.affix4 !== undefined)
      morphemeCount++

    return morphemeCount
  }
} 