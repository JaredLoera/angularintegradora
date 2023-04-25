import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private refreshHeader = new Subject<void>();

  get refreshHeader$() {
    return this.refreshHeader.asObservable();
  }
  
  triggerRefreshHeader() {
    this.refreshHeader.next();
  }
}
