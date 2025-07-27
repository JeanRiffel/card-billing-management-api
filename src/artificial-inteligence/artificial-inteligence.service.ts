import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtificialInteligenceService {

  constructor(private prisma: PrismaService) {}

  async chat (prompt: string, userId: string): Promise<{response: string}> {
    
    await this.prisma.chatMessage.create({
      data: {
        userId, 
        role: 'user',
        content: prompt
      }
    })
  
    const history = await this.prisma.chatMessage.findMany({
      where: { userId },
      orderBy: {createdAt: 'asc'},
      take:10
    })

    const messages = history.map((msg) => ({
      role:msg.role,
      content: msg.content,
    }));

    const response = await axios.post('http://localhost:11434/api/generate', {
    	model: 'llama3',
      prompt,
      stream: false,
    })

    const reply = response.data.response

    await this.prisma.chatMessage.create({
      data: {
        userId,
        role: 'assistant',
        content: reply,
      }
    })

    return { response: reply}
  }
}