import { UserDto } from "src/dto/user.dto";
import { User } from "src/schemas/User";

export class UserMapper {
    toDto(user: User): UserDto {
        const userDto: UserDto = new UserDto();
        userDto.id = user.id;
        userDto.username = user.username;
        userDto.userRole = user.userRole;
        return userDto;
    }

    toEntity(userDto: UserDto): User {
        const user: User = new User();
        user.id = userDto.id;
        user.username = userDto.username;
        user.password = userDto.password;
        user.userRole = userDto.userRole;
        return user;
    }
}
