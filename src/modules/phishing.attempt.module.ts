import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingAttemptController } from 'src/controllers/phishingAttempt.controller';
import { PhishingAttempt, PhishingAttemptSchema } from 'src/schemas/PhishingAttempt';
import { EmailService } from 'src/services/email.service';
import { PhishingAttemptService } from 'src/services/phishingAttempt.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }]),
        JwtModule
    ],
    controllers: [PhishingAttemptController],
    providers: [PhishingAttemptService, EmailService],
    exports: [MongooseModule],
})
export class PhishingAttemptModule { }