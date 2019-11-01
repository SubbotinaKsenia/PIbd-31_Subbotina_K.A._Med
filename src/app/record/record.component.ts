import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { authService } from '../authService';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService, private router: Router, private authService: authService) { }

  ngOnInit() {
     this.userService.getAuth().subscribe(result =>{
       if (result.status = 200){
        this.authService.sendToken(result.list.token);
        this.authService.sendUserName(result.list.user_name);
       }
     });
  }
}
