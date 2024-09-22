import * as bcrypt from 'bcryptjs';

export class EncryptHelper {
  static async hash(str, saltRounds = 10): Promise<string> {
    return await bcrypt.hash(str, saltRounds);
  }
  static compare(str, hash): Promise<boolean> {
    return bcrypt.compare(str, hash);
  }
}
