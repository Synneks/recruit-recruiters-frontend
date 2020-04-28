import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('optionsMenu', { static: true }) trigger: MatMenuTrigger;
  isLoggedIn = false;

  constructor() {}

  ngOnInit(): void {}

  dropDown() {
    this.trigger.openMenu();
  }
}
