import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class SignupService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    const { nickname, password, confirmPassword } = signupDto;

    // 비밀번호와 확인 비밀번호 일치 검사
    if (password !== confirmPassword) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    // 닉네임 중복 검사
    const existingUser = await this.userModel.findOne({ nickname });
    if (existingUser) {
      throw new ConflictException('중복된 닉네임입니다.');
    }

    // 비밀번호 유효성 검사 (닉네임 포함 여부 확인)
    if (password.includes(nickname)) {
      throw new BadRequestException('비밀번호에 닉네임을 포함할 수 없습니다.');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 유저 생성 및 저장
    const user = new this.userModel({ nickname, password: hashedPassword });
    await user.save();

    return { message: '회원가입이 완료되었습니다.' };
  }
}
