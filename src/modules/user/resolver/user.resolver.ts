import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UpdatePassInput } from './types/update-password-user/update-password-user.input-type';
import { CreateUserInput } from './types/create-user/create-user.resolver.input-type';
import { CreateUserObjectType } from './types/create-user/create-user.resolver.object-type';
import { CreateUserService } from '../service/create-user.service';
import { FindUserService } from '../service/find-user.service';
import { FindUserInput } from './types/find-user/find-user.resolver.input-type';
import { FindUserObjectType } from './types/find-user/find-user.resolver.object-type';
import { ChangePasswordUserService } from '../service/change-password-user.service';
import { UpdatePasswordUserObjectType } from './types/update-password-user/update-password-user.object-type';

@ApiTags('User')
@ApiBearerAuth('Authorization')
@Controller('user')
export class UserResolver {
  constructor(
    private createUserService: CreateUserService,
    private findUserService: FindUserService,
    private changePasswordUserService: ChangePasswordUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  async createUser(@Body() createUserInput: CreateUserInput): Promise<CreateUserObjectType> {
    const response = await this.createUserService.execute(createUserInput);
    return response;
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Change password' })
  async updateUser(
    @Query() email: FindUserInput,
    @Body() updatePassInput: UpdatePassInput,
  ): Promise<UpdatePasswordUserObjectType> {
    const response = await this.changePasswordUserService.execute(updatePassInput, email);
    return response;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Searching user' })
  async searchUser(@Query() email: FindUserInput): Promise<FindUserObjectType> {
    const response = await this.findUserService.execute(email);
    return response;
  }
}
