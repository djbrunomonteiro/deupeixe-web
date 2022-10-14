import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public getScreenWidth: any;
  public getScreenHeight: any;

  public sidebarnavItems: any = [];

  isOPen = false;

  constructor() { }

  ngOnInit(): void {

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
