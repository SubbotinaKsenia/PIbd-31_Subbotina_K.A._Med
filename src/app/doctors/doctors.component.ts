import { Component, OnInit } from '@angular/core';
import { Doctor } from '../admin/doctor'
import { DoctorsService } from '../admin/doctors.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.less']
})
export class DoctorsComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor(private doctorsService: DoctorsService) { 
    this.observable.pipe(debounceTime(1000))
    .subscribe(val =>{
      this.doctorsService.getResult(val).subscribe(result => {
        console.log("res ", result.list);
        this.doctors = result.list;
      });
    })
  }
  
  doctors: Doctor[];

  observable = new Subject<string>()
  text: string;  

  ngOnInit() {
    this.doctorsService.getDoctors().subscribe(doctors => {
      this.doctors = doctors.list;
      for (let doctor of doctors.list) {
        for (let image of doctor.images){        
          this.doctorsService.getImage(image.original).subscribe(res => {
            if (res.link){
              image.original = res.link;
            }
          });       
        }}  
      console.log(this.doctors);
    })
  }

  change(value: string){
    this.observable.next(value);
    console.log("dsfs: " + value);
  }
}
