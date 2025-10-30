import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UserMail } from './entities/userMail';

@Injectable()
export class EmailJsImplementation implements UserMail {
  private readonly logger = new Logger(EmailJsImplementation.name);
  private readonly emailJsServiceId: string;
  private readonly emailJsUserId: string;
  private readonly emailJsAccessToken: string;
  private readonly frontendUrl: string;
  private readonly emailJsApiUrl =
    'https://api.emailjs.com/api/v1.0/email/send';

  constructor(private configService: ConfigService) {
    this.emailJsServiceId = 'service_cko0x5h';
    this.emailJsUserId = 'y1i8PfNMX-tnmNF8D';
    this.emailJsAccessToken = 'q1o8hgRqw4yFjUMjgm2Jd';
    this.frontendUrl = this.configService.get('FRONTEND_URL');

    // Validar credenciales
    if (
      !this.emailJsServiceId ||
      !this.emailJsUserId ||
      !this.emailJsAccessToken
    ) {
      this.logger.error('❌ Credenciales de EmailJS incompletas en .env');
      this.logger.error(
        'Necesitas: EMAILJS_SERVICE_ID, EMAILJS_USER_ID, EMAILJS_ACCESS_TOKEN',
      );
    } else {
      this.logger.log('✅ EmailJS configurado correctamente');
      this.logger.log(`📧 Service ID: ${this.emailJsServiceId}`);
      this.logger.log(`👤 User ID: ${this.emailJsUserId.substring(0, 10)}...`);
    }
  }
  async sendTestEmail(email: string): Promise<void> {
    await this.sendEmailViaEmailJS('template_epp9lg2', {
      name: 'Test User',
      to_email: email,
      confirmationUrl: 'https://example.com/confirm',
    });
  }

  /**
   * Método privado para enviar emails con EmailJS
   */
  private async sendEmailViaEmailJS(
    templateId: string,
    templateParams: Record<string, any>,
  ) {
    this.logger.log(`📤 Enviando email con template: ${templateId}`);
    this.logger.log(`📊 Parámetros:`, JSON.stringify(templateParams, null, 2));

    const payload = {
      service_id: this.emailJsServiceId,
      template_id: templateId,
      user_id: this.emailJsUserId,
      accessToken: this.emailJsAccessToken,
      template_params: templateParams,
    };

    this.logger.log(`🔍 Payload completo:`, JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(this.emailJsApiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.logger.log('✅ Email enviado exitosamente via EmailJS');
      this.logger.log(`📬 Response:`, response.data);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      this.logger.error('❌ Error al enviar email via EmailJS');

      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Data:`, error.response.data);
        this.logger.error(`Headers:`, error.response.headers);

        // Errores comunes
        if (error.response.status === 400) {
          this.logger.error('💡 Error 400 - Posibles causas:');
          this.logger.error('  1. Service ID incorrecto');
          this.logger.error('  2. Template ID no existe');
          this.logger.error('  3. User ID incorrecto');
          this.logger.error('  4. Access Token inválido');
          this.logger.error('  5. Parámetros del template incorrectos');
        } else if (error.response.status === 403) {
          this.logger.error(
            '💡 Error 403 - EmailJS no permite llamadas desde servidor',
          );
          this.logger.error(
            '  Necesitas habilitar "Allow API calls" en tu cuenta de EmailJS',
          );
        }
      } else if (error.request) {
        this.logger.error('❌ No se recibió respuesta del servidor');
        this.logger.error(error.request);
      } else {
        this.logger.error('❌ Error al configurar la petición:', error.message);
      }

      throw new Error(`Error al enviar email: ${error.message}`);
    }
  }

  /**
   * Enviar email de restablecimiento de contraseña
   */
  async sendPasswordResetEmail(email: string, name: string, token: string) {
    this.logger.log(`🔐 Enviando email de reset a: ${email}`);

    const resetUrl = `${this.frontendUrl}/reset-password?token=${token}`;

    try {
      await this.sendEmailViaEmailJS('template_bmk0tlr', {
        to_email: email,
        recoverUrl: resetUrl,
        name: name,
      });
      this.logger.log('✅ Email de reset enviado');
    } catch (error) {
      this.logger.error('❌ Error al enviar email de reset:', error.message);
      throw error;
    }
  }

  /**
   * Enviar email de confirmación
   */
  async sendEmailConfirmation(email: string, name: string, token: string) {
    this.logger.log(`📧 Enviando email de confirmación a: ${email}`);

    const confirmationUrl = `${this.frontendUrl}/verify-email?token=${token}`;

    try {
      console.log('enviando mail');
      await this.sendEmailViaEmailJS('template_epp9lg2', {
        name: name,
        confirmationUrl: confirmationUrl,
        to_email: email,
      });
      this.logger.log('✅ Email de confirmación enviado');
    } catch (error) {
      this.logger.error(
        '❌ Error al enviar email de confirmación:',
        error.message,
      );
      throw error;
    }
  }
}
