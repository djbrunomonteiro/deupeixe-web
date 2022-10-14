import { Component, OnInit, HostListener } from '@angular/core';
import { MENUROUTES } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;

  public sidebarnavItems: any = [];

  isOPen = false;

  constructor() { }

  ngOnInit(): void {
    this.sidebarnavItems = MENUROUTES.filter(sidebarnavItem => sidebarnavItem);
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  openMenu(){
    this.isOPen = !this.isOPen;
  }

}
