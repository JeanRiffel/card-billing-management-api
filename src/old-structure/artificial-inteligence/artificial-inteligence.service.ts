import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/infra/orm/prisma/prisma.service';

interface OllamaGenerateResponse {
  response: string;
}

@Injectable()
export class ArtificialInteligenceService {
  constructor(private prisma: PrismaService) {}

  async chat(prompt: string, userId: string): Promise<{ response: string }> {
    await this.prisma.chatMessage.create({
      data: {
        userId,
        role: 'user',
        content: prompt,
      },
    });

    const response = await axios.post<OllamaGenerateResponse>(
      `${process.env.OLLAMA_HOST}/api/generate`,
      {
        model: 'llama3',
        prompt,
        stream: false,
      },
    );

    const reply = response.data.response;

    await this.prisma.chatMessage.create({
      data: {
        userId,
        role: 'assistant',
        content: reply,
      },
    });

    return { response: reply };
  }
}
