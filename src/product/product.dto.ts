import { ArrayMinSize, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductDto {
	@IsString({
		message: 'title have to be string'
	})
	@IsNotEmpty({
		message: 'title is required'
	})
	title: string

	@IsString({
		message: 'description have to be string'
	})
	@IsNotEmpty({
		message: 'description is required'
	})
	description: string

	@IsNumber({}, {
		message: 'price have to be number'
	})
	@IsNotEmpty({
		message: 'price is required'
	})
	price: number

	@IsString({
		each: true,
		message: 'image have to be string'
	})
	@ArrayMinSize(1, {message: 'image is required'})
	@IsNotEmpty({
		each: true,
		message: 'image is required'
	})
	images: string[]

	@IsString({
		message: 'category id have to be string'
	})
	@IsNotEmpty({
		message: 'category id is required'
	})
	categoryId: string

	@IsString({
		message: 'color id have to be string'
	})
	@IsNotEmpty({
		message: 'color id is required'
	})
	colorId: string


}
