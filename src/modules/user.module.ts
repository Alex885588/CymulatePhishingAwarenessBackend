import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserMapper } from 'src/mapper/user.mapper';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule],
    providers: [UserService, UserMapper],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }
