import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() loginClickEvent = new EventEmitter();
  @Output() closeClickEvent = new EventEmitter();

  constructor(private as: AuthService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string)  {
    this.as.login(email, password)
    .subscribe(res => {
     this.loginClickEvent.emit();
    }, error  => {
        alert('Неверный логин или пароль!!!')
        this.closeClickEvent.emit();
      })
  }
}
