import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resendClient: Resend;
  private resendAudience: string;
  
  constructor(private configService: ConfigService) {
      this.resendClient = new Resend(this.configService.get('RESEND_API'));
      this.resendAudience = this.configService.get('RESEND_AUDIENCE');
    }
  async addContact(email: string) {
    this.resendClient.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: this.resendAudience,
    });
    console.log('Contacto agregado')
  }
  
  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Train IT <onboarding@resend.dev>',
      to: [email],
      subject: 'Restablecimiento de contraseña',
      html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}</p>`,
    };

    try {
      await this.resendClient.emails.send(mailOptions);
      console.log(
        'Resend client initialized with API key:',
        this.configService.get('RESEND_API'),
      );
      console.log('Correo de restablecimiento enviado a:', email);
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento:', error);
    }
  }

  async sendEmailConfirmation(email: string, token: string) {
    const confirmationUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
    const mailOptions = {
      from: 'Train IT <onboarding@resend.dev>',
      to: email,
      subject: 'Confirmación de Email',
      html: `<p>Por favor, confirma tu email haciendo clic en el siguiente enlace:
      <a href="${confirmationUrl}">Confirmar Email</a>
    </p>`,
    };

    try {
      const result = await this.resendClient.emails.send(mailOptions);
      return { success: true, result };
    } catch (error) {
      return { success: false, error };
    }
  }
}
