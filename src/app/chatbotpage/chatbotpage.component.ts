import { Component } from '@angular/core';
import { AIGenerationService } from '../aigeneration.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIcon } from '@angular/material/icon';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatMiniFabButton } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-chatbotpage',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatGridList, MatGridTile, MatCardContent, MatCard, MatMiniFabButton, MatSelect, NgForOf, MatOption, MatCardHeader],
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
