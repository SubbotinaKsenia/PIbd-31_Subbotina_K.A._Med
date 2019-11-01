import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.less']
})
export class RecordComponent implements OnInit {

  constructor(private cookieService: CookieService, private userService: UserService, private router: Router) { }

  ngOnInit() {
     this.userService.getAuth().subscribe(result =>{
       if (result.status = 200){
       this.cookieService.set('token', result.list.token);
       this.cookieService.set('user_name', result.list.user_name);
       }
     });
  }
}
