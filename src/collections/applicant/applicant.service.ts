import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Applicant } from 'src/entities/applicant.entity';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectModel(Applicant.name)
    private readonly applicantModel: Model<Applicant>,
  ) {}

  findUsersByApp() {
    try {
      const usersProfiles = this.applicantModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userID',
            foreignField: '_id',
            as: 'usersProfile',
          },
        },
      ]);
      return usersProfiles;
    } catch (error) {
      throw new NotFoundException('there is none what u looking for');
    }
  }

  findAppByUser() {
    try {
      const userApplications = this.applicantModel.aggregate([
        {
          $match: {
            
          }
        },
        {
          $group: {
            _id: '$userID',
            applications: {
              $push: '$advertisementID',
            },
          },
        },
        {
          $lookup: {
            from: 'advertisements',
            localField: 'advertisementID',
            foreignField: '_id',
            as: 'basvurularim',
          },
        },
      ]);
      return userApplications;
    } catch (error) {
      throw new NotFoundException('');
    }
  }

  create(createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    const createapplicant = new this.applicantModel(createApplicantDto);
    return createapplicant.save();
  }

  async updateApplicant(
    id: string,
    updateApplicantDto: UpdateApplicantDto,
  ): Promise<Applicant | undefined> {
    const exApplicant = await this.applicantModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateApplicantDto },
        { new: true },
      )
      .exec();
    if (!exApplicant) {
      throw new NotFoundException(`not found`);
    }
    return exApplicant;
  }

}
