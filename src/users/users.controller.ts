import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('users')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  // @Roles(Role.SUPERADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user with DTO:', createUserDto);
  
    try {
      const data ={}
        this.usersService.create(createUserDto);
       return ResponseUtil.success(data,'Berhasil membuat user');
    } catch (error) {
      return ResponseUtil.error(error.message || 'Failed to create user');
      
    }
  }

  @Get('getAll')
  // @Roles(Role.SUPERADMIN)
  async findAll() {
   

    try {
       const users= await  this.usersService.findAll();
       return ResponseUtil.success(users, 'Berhasil mengambil semua user');
    } catch (error) {
      return ResponseUtil.error(error.message || 'Failed to retrieve users');
    }
  }

  @Get(':id')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.SUPERADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('company/:companyId/admins')
  @Roles(Role.SUPERADMIN)
  findCompanyAdmins(@Param('companyId') companyId: string) {
    return this.usersService.findCompanyAdmins(companyId);
  }

  @Get('company/:companyId/employees')
  @Roles(Role.SUPERADMIN, Role.ADMIN)
  findCompanyEmployees(@Param('companyId') companyId: string) {
    return this.usersService.findCompanyEmployees(companyId);
  }
}