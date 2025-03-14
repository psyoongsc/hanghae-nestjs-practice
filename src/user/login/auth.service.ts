import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../signup/schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto, res: any): Promise<void> {
        const { nickname, password } = loginDto;

        const user = await this.userModel.findOne({ nickname });
        if (!user) {
            throw new UnauthorizedException('닉네임 또는 패스워드를 확인해주세요.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('❌ 비밀번호 불일치');
            throw new UnauthorizedException('닉네임 또는 패스워드를 확인해주세요.');
        }

        const payload = { nickname: user.nickname, sub: user._id };
        const token = this.jwtService.sign(payload);

        res.cookie('Authorization', `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        res.status(200).send({ message: '로그인 성공!' });
    }

}
