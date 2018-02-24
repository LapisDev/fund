import { Component, OnInit } from '@angular/core';

declare let electron: any

@Component({
  selector: 'minimize-button',
  templateUrl: './minimize-button.component.html',
  styleUrls: ['./minimize-button.component.css']
})
export class MinimizeButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    let window = electron.remote.getCurrentWindow();
    window.minimize(); 
  }

}
