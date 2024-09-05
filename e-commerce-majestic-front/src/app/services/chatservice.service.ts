import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  chatVisibleSubject = new BehaviorSubject<boolean>(false);
  chatVisible$ = this.chatVisibleSubject.asObservable();
  private inactivityTimeout: any;

  toggleChat() {
    this.chatVisibleSubject.next(!this.chatVisibleSubject.value);
    this.resetInactivityTimer();
  }

  openChat() {
    this.chatVisibleSubject.next(true);
    this.resetInactivityTimer();
  }

  closeChat() {
    this.chatVisibleSubject.next(false);
    this.clearInactivityTimer();
  }

  resetInactivityTimer() {
    this.clearInactivityTimer();
    this.inactivityTimeout = setTimeout(() => {
      this.closeChat();
    }, 20000); // 20 segundos
  }

  private clearInactivityTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
  }
}
