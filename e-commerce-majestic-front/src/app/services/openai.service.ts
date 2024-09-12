import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ChatCompletionChunk, ChatRequest } from '../models/ChatMessage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.openaiApiKey;
  private httpClient: HttpClient;
  
  constructor(httpBackend: HttpBackend) { 
    this.httpClient = new HttpClient(httpBackend);
  }

  getChatResponse(prompt: string): Observable<ChatCompletionChunk> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body: ChatRequest = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      // stream: false
    };

    return this.httpClient.post<ChatCompletionChunk>(this.apiUrl, body, { headers: headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}