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
        'Authorization': 'Bearer ' + this.cookieService.get('dropbox_token'),
        'Content-Type': 'application/json'
    })};

    link: string = 'https://ipmedbackend.herokuapp.com/';

    getDoctors(): Observable<any> {
        return this.http
            .get(this.link + 'api/doctors', this.options)
            //.get('api/doctors', this.options)
            .pipe(catchError(this.handleError('getDoctors')))
    }

    getDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .get(this.link + url, this.options)
            //.get(url, this.options)
            .pipe(catchError(this.handleError('getDoctor', id)))
    }

    addDoctor(doctor: Doctor): Observable<any> {
        return this.http
            .post(this.link + 'api/doctors', doctor, this.options)
            //.post('api/doctors', doctor, this.options)
            .pipe(catchError(this.handleError('addDoctor', doctor)));
    }

    deleteDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .delete(this.link + url, this.options)
            //.delete(url, this.options)
            .pipe(catchError(this.handleError('deleteDoctor', id)))
    }

    updateDoctor(doctor: Doctor): Observable<any> {
        const url = 'api/doctors/' + doctor.id;
        return this.http
            .put(this.link + url, doctor, this.options)
            //.put(url, doctor, this.options)
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
            .post(this.link + 'api/upload_to_dropbox', formData, this.options)
            //.post('api/upload_to_dropbox', formData, this.options)
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

    getResult(text: string): Observable<any>{
        const data: any = { 
            "text": text
        };

        return this.http
        .post(this.link + 'api/searchby', <JSON>data, this.options)
        //.post('api/search', <JSON>data, this.options)
        .pipe(catchError(this.handleError('getResult', text)));
    }

    getDT(): Observable<any>{
        return this.http
        .get(this.link + 'api/dropbox', this.options)
        //.get('api/dropbox', this.options)
        .pipe(catchError(this.handleError('getDropboxToken')));
    }
}