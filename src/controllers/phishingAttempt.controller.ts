import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtRegularAuthGuard } from 'src/guards/regular.auth';
import { PhishingAttempt } from 'src/schemas/PhishingAttempt';
import { PhishingAttemptService } from 'src/services/phishingAttempt.service';
import { IResponseBody, responseBody } from 'src/utils/response.body';
import { areSameDomain } from 'src/utils/utils';

@Controller('phishing-attempts')
export class PhishingAttemptController {
    constructor(private readonly phishingAttemptService: PhishingAttemptService) { }

    @Get()
    @UseGuards(JwtRegularAuthGuard)
    async getListByUserId(@Request() req: any): Promise<IResponseBody> {
        try {
            let userId = req.user.id
            const listOfEmails = await this.phishingAttemptService.getListByUserId(userId);
            return responseBody(listOfEmails, null, null)
        } catch (error) {
            console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    @UseGuards(JwtRegularAuthGuard)
    async sendPhishingAttempt(@Request() req: any, @Body('username') username: string, @Body('body') body: string,): Promise<IResponseBody> {
        try {
            let userId = req.user.id
            const isValid = areSameDomain(username, req.user.username)
            if (!isValid) {
                throw new Error('You cannot send notification to current domain')
            }
            await this.phishingAttemptService.sendPhishingAttempt(username, body, userId, req.user.username);
            return responseBody('Phishing Email is Sent Successfully', null, null)
        } catch (error) {
            console.log(error)
            return responseBody(null, 'Phishing Email is Sent Successfully', null)
        }
    }

    @Get('/:id')
    async varidyUserClickedUrl(@Param('id') id: string): Promise<IResponseBody> {
        try {
            await this.phishingAttemptService.updateClickedStatus(id)
            return responseBody('successfully updated', null, null)
        } catch (error) {
            console.log(error)
            return responseBody(null, 'Error during updateing clicked status', null)
        }
    }

}
