import { Component, OnInit } from '@angular/core';
import { Base64 } from 'js-base64';
import { SessionUser } from 'src/app/models/User';
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
  user: SessionUser| null = null;

  constructor(private openaiService: OpenaiService, private storageService: StorageService) {
  }
  
  ngOnInit(): void {
    this.user = this.storageService.getUser();
    if(this.user) {
      this.chatHistory.push(`Bienvenido, ${this.user.username} soy tu asistente virtual, ¿en qué puedo ayudarte?`)
      this.loadChatHistory();
    } else {
      this.chatHistory.push(`Bienvenido, soy tu asistente virtual, ¿en qué puedo ayudarte?`)
    }
  }

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.chatHistory.push(`User: ${this.userInput}`);
    this.openaiService.getChatResponse(this.userInput).subscribe(
      response => {
        this.userInput = '';
        const botResponse = response.choices[0].message.content;
        this.chatHistory.push(`Bot: ${botResponse}`);
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
    if(this.user) {
      const chatHistoryBase64 = Base64.encode(JSON.stringify(this.chatHistory));      
      sessionStorage.setItem(`chatHistory_${this.user.userid}`, JSON.stringify(chatHistoryBase64));
    }
  }

  loadChatHistory() {
    if (this.user) {
      const savedHistoryBase64 = sessionStorage.getItem(`chatHistory_${this.user.userid}`);
      if (savedHistoryBase64) {
        this.chatHistory = JSON.parse(Base64.decode(savedHistoryBase64));      
      }
    }
  }
}
