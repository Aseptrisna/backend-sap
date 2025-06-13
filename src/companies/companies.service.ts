import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schemas';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  async removeData (id:string) {
    return this.companyModel.findOneAndDelete({ _id: id }).exec();
  }

   async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

    async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const updated = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return updated;
  }
}
