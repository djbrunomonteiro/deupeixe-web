import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  navs = ['Home', 'Criar Viveiro','Meus Viveiros']

  constructor() { }

  ngOnInit(): void {
  }

}
