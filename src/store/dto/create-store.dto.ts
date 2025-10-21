import { IsString } from 'class-validator'

export class CreateStoreDto {
	@IsString({
		message: 'name is required',
	})
	title: string
}