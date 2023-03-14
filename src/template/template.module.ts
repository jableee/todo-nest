import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemplateEntity } from "src/_entities/template.entity";
import { TemplateRepository } from "src/_repository/template.repository";
import { TemplateController } from "./template.controller";
import { TemplateService } from "./template.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy:'jwt' }),
    TypeOrmModule.forFeature([TemplateEntity])
  ],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository]
})

export class TemplateModule {}