import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorHelper {
  static BadRequestException(msg: string | string[]) {
    throw new HttpException(msg, HttpStatus.BAD_REQUEST);
  }
  static UnauthorizedException(msg: string) {
    throw new HttpException(msg, HttpStatus.UNAUTHORIZED);
  }
  static NotFoundException(msg: string) {
    throw new HttpException(msg, HttpStatus.NOT_FOUND);
  }
  static ForbiddenException(msg: string) {
    throw new HttpException(msg, HttpStatus.FORBIDDEN);
  }
  static InternalServerErrorException(msg: string) {
    throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static ConflictException(msg: string) {
    throw new HttpException(msg, HttpStatus.CONFLICT);
  }

  static CustomException(
    msg: string,
    code: number,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(JSON.stringify({ code: code, message: msg, statusCode }), statusCode);
  }

  static CustomExceptionCode(
    msg: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    throw new HttpException(msg, statusCode);
  }
}
