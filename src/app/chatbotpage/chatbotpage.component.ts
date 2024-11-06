import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIGenerationService } from '../aigeneration.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForOf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbotpage',
  standalone: true,
  imports: [
    CommonModule,
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
  instrument = 'music';

  private domSanitizer = inject(DomSanitizer);
  private matIconRegistry = inject(MatIconRegistry);
  constructor(private aiGenerationService: AIGenerationService) {
    this.matIconRegistry.addSvgIcon(
      'piano',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/piano.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'guitar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/guitar.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'violin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/violin.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'drum',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/drum.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'saxophone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/saxophone.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'music',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/music.svg')
    );
  }

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
        this.instrument = this.aiGenerationService.findFirstInstrument(this.response) || 'music'
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  
}
