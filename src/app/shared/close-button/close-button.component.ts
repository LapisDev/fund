import { Component, OnInit } from '@angular/core';

declare let electron: any

@Component({
  selector: 'close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.css']
})
export class CloseButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    let window = electron.remote.getCurrentWindow();
    window.close();
  }

}
