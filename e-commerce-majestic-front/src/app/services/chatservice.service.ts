import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CharObject } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  chatVisibleSubject = new BehaviorSubject<boolean>(false);
  chatVisible$ = this.chatVisibleSubject.asObservable();
  private inactivityTimeout: any;

  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(message: string) {
    const body = {message: message}
    return this.http.post(`${this.apiUrl}/chatbot/`, body);
  }

  getChatHistory(): Observable<CharObject[]> {
    return this.http.get<CharObject[]>(`${this.apiUrl}/chatbot/`);
  }

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
