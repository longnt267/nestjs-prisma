import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/auth.dto';
import { ErrorHelper } from 'src/helpers';
import { User } from '@prisma/client';
import { EncryptHelper } from 'src/helpers/encrypt.helper';

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
}
