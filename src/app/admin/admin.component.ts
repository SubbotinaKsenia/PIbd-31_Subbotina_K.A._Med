import { Component, OnInit } from '@angular/core';
import { Doctor } from './doctor'
import { DoctorsService } from './doctors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(private doctorsService: DoctorsService, private router: Router) { }
  doctors: Doctor[];

  deleteDoctor(id: number) {
    this.doctorsService.deleteDoctor(id).subscribe(status => {
      if (status == '204') {
        console.log("Doctor deleted successfully: ", id)
      }
    });
    location.reload();
  }

  getDoctor(id: number) {
    this.doctorsService.getDoctor(id).subscribe(result => {
      console.log(result.list.fio);
    });
  }
  

  ngOnInit() {
    this.doctorsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors.list;
      console.log(this.doctors);
    })
  }

  ngOnChanges(){
    this.ngOnInit();
  }
}
