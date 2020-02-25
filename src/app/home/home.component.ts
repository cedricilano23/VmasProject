import { Component, OnInit } from '@angular/core';
import { wordProcess } from '../../utils/classifier';
import format from '../../utils/classifier/format';
import wordCounter from '../../utils/counter';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { element } from 'protractor';





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
      console.log(wordCounter(fileReader.result))
      this.createExcel(wordCounter(fileReader.result));
    }
    var result = fileReader.readAsText(this.file)
  }


  createExcel(result){
    var wb = XLSX.utils.book_new();
    wb.Props = { 
      Title: "VMAS",
      Subject: "VMAS",
      Author: "VMAS",
      CreatedDate: new Date()
    };
    wb.SheetNames.push("Known Words");
    var wb_data_known = [];
    wb_data_known.push(new Array("Word", "Stem", "Affixes", "Code"));
    result.known.forEach(element => {
      var affixes = element.unlapi.concat(element.gitlapi.concat(element.hulapi)).toString();
      wb_data_known.push(new Array(element.word.whole, element.word.root, affixes));
    });  
    var ws_known = XLSX.utils.aoa_to_sheet(wb_data_known);
    wb.Sheets["Known Words"] = ws_known;


    wb.SheetNames.push("Unknown Words");
    var wb_data_unknown = [];
    wb_data_unknown.push(new Array("Unknown Words"))

    result.unknown.forEach(element => {
      var unknownWord = element.word.whole;
      unknownWord.replace(/[^a-zA-Z ]/g, "")
      if(element.word.whole){
        
        wb_data_unknown.push(new Array(unknownWord));
      }
    });
    var ws_unknown = XLSX.utils.aoa_to_sheet(wb_data_unknown);
    wb.Sheets["Unknown Words"] = ws_unknown;



    var wbout = XLSX.write(wb, {bookType:'xlsx', type: 'binary'}); 


    // this.generateExcel(wbout);

    saveAs(new Blob([this.generateExcel(wbout)],{type:"application/octet-stream"}),'test.xlsx');
  }

  generateExcel(s){
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for(var i = 0; i < s.length ; i++){
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }




} 