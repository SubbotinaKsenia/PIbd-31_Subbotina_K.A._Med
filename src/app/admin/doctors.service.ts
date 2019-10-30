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
            .pipe(catchError(this.handleError('addDoctor', doctor)))
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
}