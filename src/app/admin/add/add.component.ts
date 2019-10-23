import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor'
import { DoctorsService } from '../doctors.service';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor(private doctorsService: DoctorsService, private route: ActivatedRoute) { }
  doctor: Doctor = { id: null, fio: null, description: null, price: null, images: [] };

  createOrupdate() {
    if (this.route.snapshot.data['mode'] == "edit") {
      this.updateDoctor(this.doctor);
    }
    else {
      this.addDoctor(this.doctor);
    }
  }

  updateDoctor(doctor: Doctor) {
    this.doctorsService.updateDoctor(doctor).subscribe(result => {
      if (result.status == '201') {
        console.log("Doctor updated successfully: ", result.doc.fio)
      }
    });
  }

  addDoctor(doctor: Doctor) {
    this.doctorsService.addDoctor(doctor).subscribe(result => {
      if (result.status == '201') {
        console.log("Doctor added successfully: ", result.list)
      }
    });
  }

  addImage() {
    this.doctor.images.push({ id: null, original: "", small: null, doctor_id: this.doctor.id });
  }

  delImage(i: number) {
    this.doctor.images.splice(i, 1);
  }

  ngOnInit() {
    console.log(this.route.snapshot);
    this.doctor.id = this.route.snapshot.params['id'] * 1;
    this.doctorsService.getDoctor(this.doctor.id).subscribe(result => {
      if (result.status == '200') {
        this.doctor.fio = result.list.fio;
        this.doctor.description = result.list.description;
        this.doctor.price = result.list.price;
        this.doctor.images = result.list.images;
      }
    });
  }
}
