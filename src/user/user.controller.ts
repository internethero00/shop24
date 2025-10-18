import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async getProfile() {}

}
