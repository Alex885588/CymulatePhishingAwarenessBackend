import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from 'src/enums/user.role';
import { PhishingAttempt } from './PhishingAttempt';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: UserRole.Admin })
    userRole: UserRole;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'PhishingAttempt' }] })
    phishingAttempts: PhishingAttempt[];
}

export const UserSchema = SchemaFactory.createForClass(User);
