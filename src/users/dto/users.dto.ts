import { IsEmail, MinLength } from "class-validator"

export class UsersDto{

    @MinLength(3)
    name:string
    age:number
    @IsEmail()
    email: string
}