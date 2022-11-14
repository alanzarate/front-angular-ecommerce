import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log("Los tokens que llegan");
        console.log(response);
        
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          let completeMes:string = response.user.userFirstName + " "+ response.user.userLastName;
          this.router.navigate(['/admin',  {completeName:completeMes }]);
        } else {
          let completeMes:string = response.user.userFirstName + " "+ response.user.userLastName;
         
          this.router.navigate(['/user', {completeName:completeMes }]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
