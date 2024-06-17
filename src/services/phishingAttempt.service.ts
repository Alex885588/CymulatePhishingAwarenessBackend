import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt } from 'src/schemas/PhishingAttempt';
import { EmailService } from './email.service';
import { PhishingAttemptDto } from 'src/dto/phishingAttempt.dto';

@Injectable()
export class PhishingAttemptService {
    constructor(
        @InjectModel(PhishingAttempt.name)
        private readonly phishingAttemptModel: Model<PhishingAttempt>,
        private readonly emailService: EmailService
    ) { }

    async getListByUserId(userId: string): Promise<PhishingAttempt[]> {
        return await this.phishingAttemptModel.find({ user_id: userId }).exec();
    }

    async sendPhishingAttempt(username: string, body: string, userId: string, senderEmail: string) {
        const item = await this.create({
            username: username, content: body, user_id: userId
        })
        await this.emailService.sendEmail(senderEmail, username, "Phishing Attempt Notification", body, item.id)
    }

    async setClicked(id: string) {
        return this.phishingAttemptModel.findByIdAndUpdate(id, {
            isClicked: true,
        });
    }

    async create(phishingAttemptModel: PhishingAttemptDto): Promise<PhishingAttempt> {
        const createdPhishingAttemptModel = new this.phishingAttemptModel(phishingAttemptModel);
        return createdPhishingAttemptModel.save();
    }

    async updateClickedStatus(id: string): Promise<PhishingAttempt> {
        const phishingAttempt = await this.phishingAttemptModel.findById(id);
        if (!phishingAttempt) {
            throw new Error(`Phishing attempt with id ${id} not found.`);
        }
        phishingAttempt.isClicked = true;
        await phishingAttempt.save();
        return phishingAttempt;
    }
}
