import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;
    constructor(private configService:ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
        });
    }
        async sendPasswordResetEmail(email: string, token: string) {
            const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
            const mailOptions = {
                from: this.configService.get('EMAIL_USER'),
                to: email,
                subject: 'Restablecimiento de contraseña',
                text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}`,
            };

            try {
                await this.transporter.sendMail(mailOptions);
                console.log('Correo de restablecimiento enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de restablecimiento:', error);
            }
        }
        
        async sendEmailConfirmation(email: string, token: string) {
            const confirmationUrl = `${this.configService.get('FRONTEND_URL')}/confirm-email?token=${token}`;
            const mailOptions = {
                from: this.configService.get('EMAIL_USER'),
                to: email,
                subject: 'Confirmación de Email',
                text: `Por favor, confirma tu email haciendo clic en el siguiente enlace: ${confirmationUrl}`,
            };

            try {
                await this.transporter.sendMail(mailOptions);
                console.log('Correo de confirmación enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de confirmación:', error);
            }
        }
    }