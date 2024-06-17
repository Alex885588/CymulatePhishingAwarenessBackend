import { UserRole } from "src/enums/user.role";

export class UserDto {
    id?: number
    username?: string;
    password?: string;
    userRole?: UserRole
}
