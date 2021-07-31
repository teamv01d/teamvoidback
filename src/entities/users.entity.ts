import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: null })
  birthdate: Date;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  about: string;

  @Prop({ default: null })
  university: string;

  @Prop({ default: null })
  faculty: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  cv: string;

  @Prop({ default: true })
  isActive: boolean;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
