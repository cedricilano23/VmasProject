import { Component, OnInit } from '@angular/core';
import { wordProcess } from '../../utils/classifier';
import format from '../../utils/classifier/format';
import wordCounter from '../../utils/counter';

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
    }

    var result = fileReader.readAsText(this.file)
  }
}