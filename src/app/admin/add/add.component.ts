import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor'
import { DoctorsService } from '../doctors.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {

  public Editor = ClassicEditor;

  constructor(private doctorsService: DoctorsService, private route: ActivatedRoute, private router: Router) { }
  doctor: Doctor = { id: null, fio: null, description: null, price: null, images: [], images_files: []};

  createOrupdate() {
    if (this.route.snapshot.data['mode'] == "edit") {
      this.updateDoctor(this.doctor);
    }
    else {
      this.addDoctor(this.doctor);
    }
    this.router.navigateByUrl('/admin');
  }

  updateDoctor(doctor: Doctor) {
    this.doctorsService.updateDoctor(doctor).subscribe(result => {
      if (result.status == '201') {
        console.log("Doctor updated successfully: ", result.doc.fio)
        this.doctorsService.addImages(doctor, result.doc.id, 'edit').subscribe(result => {
          console.log("Images added successfully: ", result.list)
        });
      }
    });
    
  }

  addDoctor(doctor: Doctor) {    
    this.doctorsService.addDoctor(doctor).subscribe(result => {
      if (result.status == '201') {
        console.log("Doctor added successfully: ", result.list)
        this.doctorsService.addImages(doctor, result.list, 'add').subscribe(result => {
          console.log("Images added successfully: ", result.list)
        });
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
  
  handleFileInput(files: FileList) {    
      this.doctor.images_files.push(files.item(0));    
    console.log("files ", this.doctor.images_files);
  }
}
