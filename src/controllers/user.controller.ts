import { Controller, Get, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { User } from 'src/schemas/User';
import { IResponseBody, responseBody } from 'src/utils/response.body';
import { JwtRegularAuthGuard } from 'src/guards/regular.auth';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("/register")
    async createUser(
        @Body("username") username: string,
        @Body("password") password: string,
    ): Promise<IResponseBody> {
        try {
            const toReturn = await this.userService.registerUser({ username, password });
            return responseBody(toReturn, null, 'successfully created')
        } catch (error) {
            console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('signin')
    async signIn(@Body('username') username: string, @Body('password') password: string): Promise<IResponseBody> {
        try {
            const token = await this.userService.signIn(username, password);
            return responseBody(token, null, 'successfully');
        } catch (error) {
            console.log(error)
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }

    @Post('isTokenValid')
    @UseGuards(JwtRegularAuthGuard)
    async isTokenValid(): Promise<boolean> {
        return true;
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
