import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SubjectClass extends Document {
  @Prop()
  subject: string;
}

export const UsersSchema = SchemaFactory.createForClass(SubjectClass);