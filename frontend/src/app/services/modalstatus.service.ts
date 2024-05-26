import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private registerModalVisibleSubject = new BehaviorSubject<boolean>(true);
  registerModalVisible$ = this.registerModalVisibleSubject.asObservable();

  showRegisterModal() {
    this.registerModalVisibleSubject.next(true);
  }

  //hideRegisterModal() {
    //this.registerModalVisibleSubject.next(false);
  //}
}