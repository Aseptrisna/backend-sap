import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
// import { Company } from './schemas/company.schemas';
import { ResponseUtil } from 'src/utils/response.util';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}
  /**
   * Create a new company
   * @param createCompanyDto - Data transfer object for creating a company
   * @returns The created company
   */

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      const Company = await this.companyService.create(createCompanyDto);
      return ResponseUtil.success(Company, 'Berhasil membuat perusahaan');
    } catch (error) {
      return ResponseUtil.error(error.message || 'Failed to create company');
    }
  }

  /**
   * Find all companies
   * @returns An array of all companies
   * */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('findAll')
  async findAll() {
    try {
      const data = await this.companyService.findAll();
      return ResponseUtil.success(data, 'Berhasil mendapatkan perusahaan');
    } catch (error) {
      return ResponseUtil.error(
        error.message || 'Failed to retrieve companies',
      );
    }
  }

  /**
   * Delete a company by ID
   * @param id - The ID of the company to delete
   * @returns A success message or an error message
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    try {
      this.companyService.removeData(id);
      return ResponseUtil.success(null, 'Berhasil menghapus perusahaan');
    } catch (error) {
      return ResponseUtil.error(error.message || 'Failed to delete company');
    }
  }

  /**
   * Update a company by ID
   * @param id - The ID of the company to update
   * @param updateCompanyDto - Data transfer object for updating a company
   * @returns The updated company or an error message
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    try {
      const updatedCompany = this.companyService.update(id, updateCompanyDto);
      return ResponseUtil.success(
        updatedCompany,
        'Berhasil memperbarui perusahaan',
      );
    } catch (error) {
      return ResponseUtil.error(error.message || 'Failed to update company');
    }
  }
}
