import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotpageComponent } from "./chatbotpage/chatbotpage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatbot';
}
