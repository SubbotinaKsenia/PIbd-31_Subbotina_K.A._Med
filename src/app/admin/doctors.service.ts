import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { Doctor } from './doctor'
import { HttpErrorHandler, HandleError } from '../http-error-handler.service'
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class DoctorsService {
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, private cookieService: CookieService) {
        this.handleError = httpErrorHandler.createHandleError('DoctorsService')
    }

    options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('token'))
    };

    dropbox = {
        headers: new HttpHeaders({
        'Authorization': 'Bearer OsCo0aVepGAAAAAAAAAAHbMMyiYwemY9RzjO97pkfH6wJhmOSaBzY84UTLTE4Fs0',
        'Content-Type': 'application/json'
    })};

      //link: string = 'https://ipmedbackend.herokuapp.com/';

    getDoctors(): Observable<any> {
        return this.http
            .get('api/doctors', this.options)
            .pipe(catchError(this.handleError('getDoctors')))
    }

    getDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .get(url, this.options)
            .pipe(catchError(this.handleError('getDoctor', id)))
    }

    addDoctor(doctor: Doctor): Observable<any> {
        return this.http
            .post('api/doctors', doctor, this.options)
            .pipe(catchError(this.handleError('addDoctor', doctor)));
    }

    deleteDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .delete(url, this.options)
            .pipe(catchError(this.handleError('deleteDoctor', id)))
    }

    updateDoctor(doctor: Doctor): Observable<any> {
        const url = 'api/doctors/' + doctor.id;
        return this.http
            .put(url, doctor, this.options)
            .pipe(catchError(this.handleError('updateDoctor', doctor)))
    }

    addImages(doctor: Doctor, id: string, mode: string) : Observable<any> {
        const formData: FormData = new FormData();
        const id_json = JSON.stringify(id); 
        const mode_json = JSON.stringify(mode); 
        const doctor_id = new Blob([id_json], {
              type: 'application/json'
        });        
        const img_mode = new Blob([mode_json], {
              type: 'application/json'
        });
        formData.append(id, doctor_id);
        formData.append(mode, img_mode);
        for(var i = 0; i < doctor.images_files.length; i++){ 
            formData.append('images_files_'+i, doctor.images_files[i]);
        }
        return this.http
            .post('api/upload_to_dropbox', formData, this.options)
            .pipe(catchError(this.handleError('addImages', formData)));
    }

    getImage(path: string) : Observable<any>{
        const data: any = { 
            "path": path
        };
        
        return this.http
            .post('https://api.dropboxapi.com/2/files/get_temporary_link', <JSON>data, this.dropbox)
            .pipe(catchError(this.handleError('getImage', <JSON>data)));
    }
}