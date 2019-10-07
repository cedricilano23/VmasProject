import { Component, OnInit } from '@angular/core';
import { wordProcess } from '../../utils/classifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(wordProcess('pinaglalaruan'))
  }

}
