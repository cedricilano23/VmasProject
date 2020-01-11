import { Component, OnInit } from '@angular/core';
import { wordProcess } from '../../utils/classifier';
import format from '../../utils/classifier/format';
import wordCounter from '../../utils/counter';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  file: any;

  constructor() { }

  ngOnInit() {
    console.log(wordCounter('Ako ay pinaglalaruan'))
    console.log(wordProcess(format('pinaglalaruan')))
  }

  fileChanged(e){
    this.file = e.target.files[0];
  }

  uploadDocument(file){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(wordCounter(fileReader.result));
      this.createExcel();
    }

    var result = fileReader.readAsText(this.file)
  }


  createExcel(){
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "VMAS",
      Subject: "test",
      Author: "Nayeon",
      CreatedDate: new Date()
    };
    wb.SheetNames.push("Test Sheet");
    var wb_data = [
      ['hello', 'world'],
      ['new', 'line']
  
    ];
    var ws = XLSX.utils.aoa_to_sheet(wb_data);
    wb.Sheets["Test Sheet"] = ws;

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