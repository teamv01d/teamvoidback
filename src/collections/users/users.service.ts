import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async findUserByEmail(email: string): Promise<Users | undefined> {
    return this.usersModel.findOne({ email });
  }

  findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<Users[]> {
    const user = await this.usersModel.find({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(createUserDTO: CreateUserDto): Promise<Users> {
    const user = new this.usersModel(createUserDTO);
    return user.save();
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto,): Promise<Users | undefined> {
    const exUser = await this.usersModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();
    if (!exUser) {
      throw new NotFoundException(`not found`);
    }
    return exUser;
  }

  async delete(id: string): Promise<Users> {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      return user.deleteOne();
    } catch (error) {
      throw new NotFoundException(`User ${id} cant delete cause there is none`);
    }
  }
}