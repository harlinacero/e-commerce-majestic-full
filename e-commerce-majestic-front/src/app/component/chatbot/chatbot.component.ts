import { Component, OnInit } from '@angular/core';
import { Base64 } from 'js-base64';
import { CharObject } from 'src/app/models/ChatMessage';
import { SessionUser } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chatservice.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  userInput: string = '';
  chatHistory: string[] = [];
  user: SessionUser | null = null;

  constructor(private openaiService: OpenaiService, private storageService: StorageService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    if (this.user) {
      this.chatHistory.push(`Bienvenido, ${this.user.username} soy tu asistente virtual, ¿en qué puedo ayudarte?`)
      this.loadChatHistory();
    } else {
      this.chatHistory.push(`Bienvenido, soy Ema, tu asistente virtual, ¿en qué puedo ayudarte?`)
    }
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.chatHistory.push(`${this.user?.username}: ${this.userInput}`);
    this.openaiService.getChatResponse(this.userInput).subscribe(
      response => {
        this.userInput = '';
        const botResponse = response.choices[0].message.content;
        this.chatHistory.push(`Ema: ${botResponse}`);
        this.saveChatHistory();
      },
      error => {
        this.userInput = '';
        console.error('Error:', error);
        this.chatHistory.push('Bot: Lo siento, algo no funcionó. Intente más tarde.');
      }
    );
  }

  saveChatHistory() {
    if (this.user) {
      const chatHistoryBase64 = Base64.encode(JSON.stringify(this.chatHistory));
      // sessionStorage.setItem(`chatHistory_${this.user.userid}`, JSON.stringify(chatHistoryBase64));
      this.chatService.sendMessage(chatHistoryBase64).subscribe({
        next: (response: any) => {
        },
        error: (error: any) => {
          console.error('No se pudo guardar el historial del chat:', error);
        }
      });

    }
  }

  loadChatHistory() {
    if (this.user) {
      // const savedHistoryBase64 = sessionStorage.getItem(`chatHistory_${this.user.userid}`);
      this.chatService.getChatHistory().subscribe({
        next: (response: CharObject[]) => {
          if (response != null) {
            response.forEach(resp => {
              this.chatHistory.push(Base64.decode(resp.Message));
            });
          }
        },
        error: (error: any) => {
          console.error('No se pudo cargar el historial del chat:', error);
        }
      });

    }
  }
}
