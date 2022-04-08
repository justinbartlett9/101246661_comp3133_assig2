import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '101246661_comp3133_assig2';
  username = localStorage.getItem('username');
  user_type = localStorage.getItem('user_type');

  signout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('user_type');
    localStorage.removeItem('email');
    localStorage.removeItem('session');
  }
}
