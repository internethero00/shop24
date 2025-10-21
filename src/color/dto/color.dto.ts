import { IsString } from 'class-validator'

export class ColorDto {
	@IsString({
		message: 'name is required',
	})
	name: string

	@IsString({
		message: 'value is required',
	})
	value: string
}