import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new Subject<string>();
  alert$ = this.alertSubject.asObservable();

  constructor() { }

  // getAlert() {
  //   return this.alertSubject.asObservable();
  // }

  success(message: string) {
    this.alertSubject.next(message);
  }

  error(message: string) {
    this.alertSubject.next(message);
  }

}
