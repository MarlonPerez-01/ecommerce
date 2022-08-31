import { Injectable } from '@nestjs/common';
import { UpdateEmailDto } from './dto/update-email.dto';
import { MailerService } from '@nestjs-modules/mailer';

interface ConfirmacionCorreo {
  to: string;
  nombre: string;
  codigo: string;
}

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAccountConfirmation(confirmacionCorreo: ConfirmacionCorreo) {
    return this.mailerService.sendMail({
      to: confirmacionCorreo.to,
      subject: 'Confirmación de correo',
      template: __dirname + '/templates/confirmation',
      context: {
        nombre: confirmacionCorreo.nombre,
        url: `http://localhost:3000/auth/verify/${confirmacionCorreo.codigo}`,
      },
    });
  }

  findAll() {
    return `This action returns all emails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
