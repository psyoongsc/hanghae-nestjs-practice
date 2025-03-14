import { IsString, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(3, { message: '닉네임은 최소 3자 이상이어야 합니다.' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: '닉네임은 알파벳 대소문자와 숫자로만 구성되어야 합니다.',
  })
  nickname: string;

  @IsString()
  @MinLength(4, { message: '비밀번호는 최소 4자 이상이어야 합니다.' })
  password: string;

  @IsString()
  confirmPassword: string;
}
