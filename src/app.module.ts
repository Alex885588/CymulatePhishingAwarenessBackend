import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { User, UserSchema } from 'src/schemas/User';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { UserMapper } from 'src/mapper/user.mapper';
import { PhishingAttemptModule } from './modules/phishing.attempt.module';
import { PhishingAttempt, PhishingAttemptSchema } from 'src/schemas/PhishingAttempt';
import { PhishingAttemptController } from 'src/controllers/phishingAttempt.controller';
import { PhishingAttemptService } from 'src/services/phishingAttempt.service';
import { EmailService } from 'src/services/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb://localhost:27017/${process.env.DB_NAME}`),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_ExpiresIn },
    }),
    UserModule,
    PhishingAttemptModule
  ],
  controllers: [
    UserController,
    PhishingAttemptController
  ],
  providers: [
    UserService,
    UserMapper,
    PhishingAttemptService,
    EmailService
  ],
  exports: [
    UserService,
    PhishingAttemptService
  ],
})
export class AppModule { }
