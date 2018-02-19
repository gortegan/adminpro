import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

declare function initPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    initPlugins();
  }

  ingresar() {
    console.log('Ingresando');
    this.router.navigate(['/dashboard']);
  }
}
