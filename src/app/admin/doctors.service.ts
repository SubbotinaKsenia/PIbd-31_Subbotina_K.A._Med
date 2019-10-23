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

    getDoctors(): Observable<any> {
        return this.http
            .get('api/doctors')
            .pipe(catchError(this.handleError('getDoctors')))
    }

    getDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .get(url)
            .pipe(catchError(this.handleError('getDoctor', id)))
    }

    addDoctor(doctor: Doctor): Observable<any> {
        return this.http
            .post('api/doctors', doctor)
            .pipe(catchError(this.handleError('addDoctor', doctor)))
    }

    deleteDoctor(id: number): Observable<any> {
        const url = 'api/doctors/' + id;
        return this.http
            .delete(url)
            .pipe(catchError(this.handleError('deleteDoctor', id)))
    }

    updateDoctor(doctor: Doctor): Observable<any> {
        const url = 'api/doctors/' + doctor.id;
        return this.http
            .put(url, doctor)
            .pipe(catchError(this.handleError('updateDoctor', doctor)))
    }
}