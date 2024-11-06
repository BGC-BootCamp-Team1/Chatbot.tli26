import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

const instruments = [
  '钢琴', '吉他', '小提琴', '鼓', '萨克斯'
];

// 定义接口类型来描述响应结构
interface TextGenerationResponse {
  output: {
    choices: [
      {
        finish_reason: string;
        message: {
          role: string;
          content: string;
        }
      }
    ];
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIGenerationService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  // 定义方法并只返回 content 字段
  generateContent(inputText: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = 
      {
        "model": "qwen-max",
        "input": {
          "messages": [
            { "role": "system", "content": "你是一个从业多年的专业音乐人,我会给你一些话，你根据这些话给出专业回复，回复中只能出现一种乐器的名字。" },
            { "content": inputText, "role": "user" }
          ]
        },
        "parameters": {
          "temperature": 0.8,
          "seed": this.getRandomNum(),
          "result_format": "message"
        }
      };

    // 使用 map 操作符从响应中提取 content 字段
    return this.http.post<TextGenerationResponse>(this.apiUrl, body, { headers }).pipe(
      map(response => response.output.choices[0].message.content)
    );
  }

  private getRandomNum(): number {
    // Generate two random 32-bit integers and combine them into a 64-bit integer
    const high = Math.floor(Math.random() * 2 ** 32);
    console.log(high)
    return high;
  }

  findFirstInstrument(text: string): string | null {
    for (const instrument of instruments) {
      const regex = new RegExp(instrument, 'i'); // 使用正则表达式匹配乐器名称，忽略大小写
      const match = text.match(regex);
      if (match) {
        return match[0];
      }
    }
    return null;
  }
}

