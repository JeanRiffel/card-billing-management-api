import { Module } from "@nestjs/common"
import { ArtificialInteligenceController } from "./artificial-inteligence.controller";
import { ArtificialInteligenceService } from "./artificial-inteligence.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [ArtificialInteligenceService, PrismaService],
  controllers: [ArtificialInteligenceController],
})

export class ChatModule {}
