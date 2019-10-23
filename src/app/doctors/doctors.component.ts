import { Component, OnInit } from '@angular/core';
import { Doctor } from '../admin/doctor'
import { DoctorsService } from '../admin/doctors.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.less']
})
export class DoctorsComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor(private doctorsService: DoctorsService) { }
  doctors: Doctor[];

  ngOnInit() {
    this.doctorsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors.list;
      console.log(this.doctors);
    })
  }
}