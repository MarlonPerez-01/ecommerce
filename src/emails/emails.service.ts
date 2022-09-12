import { Injectable } from '@nestjs/common';
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

  async sendCambiarContrasenia(confirmacionCorreo: ConfirmacionCorreo) {
    return this.mailerService.sendMail({
      to: confirmacionCorreo.to,
      subject: 'Cambio de contraseña',
      template: __dirname + '/templates/confirmation',
      context: {
        nombre: confirmacionCorreo.nombre,
        url: `http://localhost:3000/auth/cambiar-contrasenia/${confirmacionCorreo.codigo}`,
      },
    });
  }
}
