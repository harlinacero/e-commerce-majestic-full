import { Component, HostListener } from '@angular/core';
import { ChatService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-floating-chat',
  templateUrl: './floating-chat.component.html',
  styleUrls: ['./floating-chat.component.scss']
})
export class FloatingChatComponent {
  chatVisible$ = this.chatService.chatVisible$;

  constructor(private chatService: ChatService) {}

  toggleChat() {
    this.chatService.toggleChat();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  resetInactivityTimer() {
    if (this.chatService.chatVisibleSubject.value) {
      this.chatService.resetInactivityTimer();
    }
  }
}
