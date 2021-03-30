import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public modalTitle: string = "Авторизация";
  public activateLoginComp: boolean = false;

  constructor(private as: AuthService, 
    private permissionsService: NgxPermissionsService,
    private router: Router) { }

  ngOnInit(): void {
    const roles = this.as.getRole()
    this.permissionsService.loadPermissions(roles);
  }
 
  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated();
  }

  public closeClick() {
    this.activateLoginComp = false;
  }

  public loginClick() {
    this.closeClick();
    location.reload();
  }
  
  login(){
    this.activateLoginComp = true;
  }

  logout() {
    this.as.logout();
    location.reload();
  }

}
