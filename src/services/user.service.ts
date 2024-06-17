import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/User';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/enums/user.role';
import { validateEmail } from 'src/utils/utils';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly jwtService: JwtService) { }

    async isUsernameTaken(username: string): Promise<boolean> {
        const user = await this.userModel.findOne({ username }).exec();
        return !!user;
    }

    async getUserByUsername(username: string): Promise<UserDto> {
        const user = await this.userModel.findOne({ username })
        return user;
    }

    async signIn(username: string, password: string): Promise<{ token: string }> {
        const user = await this.getUserByUsername(username);
        const isCredentailsTrue = await bcrypt.compare(password, user.password);
        if (!user || !isCredentailsTrue) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ id: user.id, username: user.username, role: user.userRole });
        return { token };
    }

    async registerUser({ username, password }: UserDto): Promise<User> {
        const isEmailValid = validateEmail(username)
        if (!isEmailValid) {
            throw new Error("Please enter a valid email.");
        }
        const isUserExists =
            await this.isUsernameTaken(username);
        if (isUserExists) {
            throw new Error("The given username is taken");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = { username: username, password: hashPassword, userRole: UserRole.Regular };
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
