import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'deupeixe-web';

  constructor(){}

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(){
    const token =  localStorage.getItem('token_dp');

    if(token){
      console.log(token);
      
    }
  }
}
