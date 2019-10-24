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

  constructor() { }

  ngOnInit() {
    console.log(wordCounter('Ako ay pinaglalaruan'))
    console.log(wordProcess(format('pinaglalaruan')))
  }
}