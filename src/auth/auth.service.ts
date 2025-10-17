import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'
import { AuthDto } from './dto/auth.dto'
import { UserDB } from '../types/user_db'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {

	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(private jwt: JwtService,
				private userService: UserService,
				private prisma: PrismaService,
				private configService: ConfigService) {
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)
		return {user, ...tokens}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)
		const tokens = this.issueTokens(user.id)
		return {user, ...tokens}
	}

	async getNewTokens(refreshToken: string) {
		const result = this.jwt.verify<UserDB>(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid token')

		const user = await this.userService.getById(result.id)
		const tokens = this.issueTokens(user!.id)
		return {user, ...tokens}
	}

	issueTokens(userId: string) {
		const data = {id: userId}
		const accessToken = this.jwt.sign(data, {expiresIn: '1h'})
		const refreshToken = this.jwt.sign(data, {expiresIn: '7d'})

		return {accessToken, refreshToken}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			expires: expiresIn,
			httpOnly: true,
			domain: this.configService.get('SERVER_DOMAIN'),
			secure: true,
			sameSite: 'none'
			}
		)
	}

	removeRefreshTokenFromResponse(res: Response) {

		res.cookie(this.REFRESH_TOKEN_NAME, '', {
				expires: new Date(0),
				httpOnly: true,
				domain: this.configService.get('SERVER_DOMAIN'),
				secure: true,
				sameSite: 'none'
			}
		)
	}
}
