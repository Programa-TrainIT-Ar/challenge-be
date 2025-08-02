import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private resendClient;
    constructor(private configService:ConfigService) {
        this.resendClient = new Resend(this.configService.get('RESEND_API'));
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
                console.log('Resend client initialized with API key:', this.configService.get('RESEND_API'));
                console.log('Correo de restablecimiento enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de restablecimiento:', error);
            }
        }
        
        async sendEmailConfirmation(email: string, token: string) {
            const confirmationUrl = `${this.configService.get('FRONTEND_URL')}/sign-up?token=${token}`;
            const mailOptions = {
                from: 'Train IT <onboarding@resend.dev>',
                to: email,
                subject: 'Confirmación de Email',
                html: `<p>Por favor, confirma tu email haciendo clic en el siguiente enlace: ${confirmationUrl}</p>`,
            };

            try {
                await this.resendClient.emails.send(mailOptions);
                console.log('Correo de confirmación enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de confirmación:', error);
            }
        }
    }