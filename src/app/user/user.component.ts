import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  message:string ="";
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
 
    this.message =  this.activatedRoute.snapshot.paramMap.get('completeName')!;
    
  }
  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

}
