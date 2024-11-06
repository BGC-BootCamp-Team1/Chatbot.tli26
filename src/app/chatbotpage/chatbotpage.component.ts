import { Component } from '@angular/core';
import { AIGenerationService } from '../aigeneration.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-chatbotpage',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule, 
    NgForOf],
  templateUrl: './chatbotpage.component.html',
  styleUrl: './chatbotpage.component.css',
})
export class ChatbotpageComponent {
  inputText = '我喜欢摇滚乐，给我推荐一个乐器吧';
  question = 'Loading...';
  response = 'Loading...';
  constructor(private aiGenerationService: AIGenerationService) {}

  onEnter(event: any): void {
    this.question = '你：' + event.target.value;
    // this.response = 'Bot:'+
    this.generateResponse(this.inputText);
    event.target.value = '';
  }

  private generateResponse(inputText: string) {
    this.aiGenerationService.generateContent(inputText).subscribe({
      next: (data: string) => {
        this.response = '小乐：' + data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
