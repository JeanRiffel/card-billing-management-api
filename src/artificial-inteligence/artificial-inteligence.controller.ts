import  { Controller, Body, Post } from '@nestjs/common'
import { Public } from 'src/common/decorators/public.decorator'
import { ArtificialInteligenceService } from './artificial-inteligence.service'
import { ChatDto } from './dto/chat.dto'
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('ai')
export class ArtificialInteligenceController {

	constructor(private readonly artificialInteligenceService: ArtificialInteligenceService) {}


	@Post('chat')
	async chat(
		@Body() chatDto: ChatDto, 
		@CurrentUser() user: { userId: string } 
	){
			const { prompt } = chatDto
			return this.artificialInteligenceService.chat(prompt, user.userId)
	}

}
