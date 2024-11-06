import { Component } from '@angular/core';
import { AIGenerationService } from '../aigeneration.service';

@Component({
  selector: 'app-chatbotpage',
  standalone: true,
  imports: [],
  templateUrl: './chatbotpage.component.html',
  styleUrl: './chatbotpage.component.css'
})
export class ChatbotpageComponent {
  inputText = '我喜欢摇滚乐，给我推荐一个乐器吧';
  question = 'Loading...';
  response = 'Loading...';
  constructor(
    private aiGenerationService: AIGenerationService,
  ) {}

  onEnter(event: any): void {
    this.question = '你：'+ event.target.value;
    // this.response = 'Bot:'+ 
    this.generateResponse(this.inputText);
    event.target.value = '';
  }

  private generateResponse(inputText: string){
    this.aiGenerationService.generateContent(inputText).subscribe({
      next: (data: string) => {
        this.response = '小乐：' + data
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
    
  }

}
