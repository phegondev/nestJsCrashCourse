import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    ourUsers: any[] = [
        { id: 1, name: "dennis", age: 50, email: "admin@gmail.com" },
        { id: 2, name: "mercy", age: 68, email: "mercy@gmail.com" },
        { id: 3, name: "souvik", age: 20, email: "souvik@gmail.com" }
    ]


    // Add a new user
    addUser(newUser: { name: string, age: number, email: string }): any {
        const newId = this.ourUsers.length + 1;
        const user = { id: newId, ...newUser };
        this.ourUsers.push(user);
        return user;
    }

    // Update user by id
    updateUserById(id: number, updatedUser: { name?: string, age?: number, email?: string }): any {
        const index = this.ourUsers.findIndex(user => user.id == id);
        if (index !== -1) {
            this.ourUsers[index] = { ...this.ourUsers[index], ...updatedUser };
            return this.ourUsers[index];
        }
        return null;
    }

    // Delete user by id
    deleteUserById(id: number): any {
        const index = this.ourUsers.findIndex(user => user.id == id);
        if (index !== -1) {
            const deletedUser = this.ourUsers.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }

    // Fetch user by id
    getUserById(id: number): any {
        const result = this.ourUsers.find(user => user.id == id) || null;
        return result;
    }


    // Fetch ourUsers by name and/or age
    getOurUsersByNameAndAge(query: { name?: string, age?: number }): any[] {
        const { name, age } = query;

        if (name && age) {
            // Fetch ourUsers by both name and age
            return this.ourUsers.filter(user => user.name.toLowerCase() == name.toLowerCase() && user.age === age);
        } else if (name) {
            // Fetch ourUsers by name only
            return this.ourUsers.filter(user => user.name.toLowerCase() == name.toLowerCase());
        } else if (age) {
            // Fetch ourUsers by age only
            return this.ourUsers.filter(user => user.age == age);
        } else {
            // If neither name nor age is provided, return all ourUsers
            return this.ourUsers;
        }
    }

    getAllUsers(): any[] {
        return this.ourUsers;
    }

}
