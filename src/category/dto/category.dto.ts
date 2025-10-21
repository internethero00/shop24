import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString({
		message: 'title is required',
	})
	title: string

	@IsString({
		message: 'description is required',
	})
	description: string
}