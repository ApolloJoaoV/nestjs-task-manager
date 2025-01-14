import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";


@Injectable()
export class UsersRepository extends Repository<User> {
    // constructor(private dataSource: DataSource) {
    //     super(User, dataSource.createEntityManager());
    // }

    async createUser(AuthCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = AuthCredentialsDto;
        
        const user = this.create({ username, password });
        await this.save(user);
    }
}