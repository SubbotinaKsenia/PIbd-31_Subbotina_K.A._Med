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

  flag = false;

  constructor(private doctorsService: DoctorsService) {
    this.observable.pipe(debounceTime(1000))
    .subscribe(val =>{
      this.doctorsService.getResult(val).subscribe(result => {
        console.log("res ", result.list);
        this.doctors = result.list;
      });
    });

    this.observable_id.subscribe(val => {
      if (this.doctors){
        this.deleteDoctor(val);
      }
    });
    this.observable_doctor.subscribe(val =>{
      if (this.doctors){
        this.addDoctor(val);
      }
    });
  }
  
  doctors: Doctor[];

  observable_id = new Subject<Number>();
  observable_doctor = new Subject<any>();

  observable = new Subject<string>();
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
    });

    var socket = new WebSocket("wss://ipmedwebsocket.herokuapp.com/");

    let doctor = this.observable_doctor;
    let id = this.observable_id;
    socket.onmessage = function(event) {     
      process(event.data);
    };

    function process(data){
      if (Number(data)){
        id.next(Number(data));
      }
      else {
        doctor.next(JSON.parse(data));
      }
    };
  }

  change(value: string){
    this.observable.next(value);
    console.log("next: " + value);
  }

  deleteDoctor(id: Number){
    for(var i = 0; i < this.doctors.length; i++){
      if (this.doctors[i].id == id){
        this.doctors.splice(i, 1);
      }
    };
    console.log(this.doctors);
  }

  addDoctor(data: any){
    console.log(data);
    let doctor = {id: data.id, fio: data.fio, description: data.description, price: data.price, images: [], images_files: []};
    if (!(this.doctors.some(doc => doc === doctor))){
      this.doctors.push(doctor);
    }
  }
}