import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from 'src/schemas/User';

@Schema()
export class PhishingAttempt extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: false })
    isClicked: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: User;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
