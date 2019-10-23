import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { Doctor } from './doctor'
import { HttpErrorHandler, HandleError } from '../http-error-handler.service'

@Injectable()
export class DoctorsService {
    private handleError: HandleError

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('DoctorsService')
    }

    link: string = 'https://ipmedbackend.herokuapp.com/';

    getDoctors(): Observable<any> {
        return this.http
            .get(this.link + 'api/doctors')
            .pipe(catchError(this.handleError('getDoctors')))
    }

    getDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .get(this.link + url)
            .pipe(catchError(this.handleError('getDoctor', id)))
    }

    addDoctor(doctor: Doctor): Observable<any> {
        return this.http
            .post(this.link + 'api/doctors', doctor)
            .pipe(catchError(this.handleError('addDoctor', doctor)))
    }

    deleteDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .delete(this.link + url)
            .pipe(catchError(this.handleError('deleteDoctor', id)))
    }

    updateDoctor(doctor: Doctor): Observable<any> {
        const url = 'api/doctors/' + doctor.id;
        return this.http
            .put(this.link + url, doctor)
            .pipe(catchError(this.handleError('updateDoctor', doctor)))
    }
}