import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginService } from '../service/login.service';
import { SignInResolverInputType } from './types/sign-in/sign-in.resolver.input-type';
import { SignInResolverObjectType } from './types/sign-in/sign-in.resolver.object-type';

@ApiTags('Login')
@Controller('login')
export class LoginResolver {
  constructor(private loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Sign In' })
  async signIn(@Body() credentials: SignInResolverInputType): Promise<SignInResolverObjectType> {
    const logIn = await this.loginService.execute(credentials);
    return logIn;
  }
}
