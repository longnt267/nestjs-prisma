import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ErrorHelper, TokenHelper } from 'src/helpers';
import { User } from '@prisma/client';
import { EncryptHelper } from 'src/helpers/encrypt.helper';
import { TOKEN_SECRET_KEY } from 'src/environments';
import { IToken } from 'src/interface';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(payload: RegisterDto): Promise<Partial<User>> {
    const { email, name, password, phone } = payload;
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [{ email }, { password }],
      },
    });

    if (users.length) {
      ErrorHelper.BadRequestException('Existing user');
    }

    const hashedPassword = await EncryptHelper.hash(password);
    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phone,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async login(payload: LoginDto): Promise<IToken> {
    const { email, password } = payload;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      ErrorHelper.BadRequestException('Not found user');
    }

    if (!user.status) {
      ErrorHelper.BadRequestException('User is inactivate');
    }

    const isPasswordValid = await EncryptHelper.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      ErrorHelper.UnauthorizedException('Password is not correct');
    }

    return this.generateToken(user.id);
  }

  private generateToken(id: number): IToken {
    const payload = {
      id,
    };
    const { token: accessToken, expires: expiresAccessToken } = TokenHelper.generate(
      payload,
      TOKEN_SECRET_KEY,
      '1h',
    );
    const { token: refreshToken, expires: expiresRefreshToken } = TokenHelper.generate(
      payload,
      TOKEN_SECRET_KEY,
      '24h',
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
