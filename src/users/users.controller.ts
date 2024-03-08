import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getAllUSers(@Query('name') name?: string, @Query('age') age?: number) {
        return this.userService.getOurUsersByNameAndAge({ name, age });
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getUSerById(@Param('id', ParseIntPipe) id: number) {
        let user = this.userService.getUserById(id);
        if(!user){
            throw new NotFoundException("USer Not Found 🥸")
        }
        return user;
    }

    @Post()
    addUSer(@Body( new ValidationPipe) user: UsersDto) {
        return this.userService.addUser(user);
    }

    @Put(':id')
    updateUSer(@Param('id') id: number, @Body() updatedUSer: { name?: string, age?: number, email?: string }) {
        return this.userService.updateUserById(id, updatedUSer);

    }
    
    @Delete(':id')
    deleteById(@Param('id') id: number) {
        return this.userService.deleteUserById(id);
    }

}
