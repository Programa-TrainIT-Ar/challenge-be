import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
    private readonly resendApiKey: string;
    private readonly transporter: Transporter;
    private readonly gmailApikey: string;
    private readonly gmailUser: string;
    
    constructor(private configService: ConfigService) {
        this.resendApiKey = this.configService.get('RESEND_API');
        this.gmailApikey = this.configService.get('GMAIL_API');
        this.gmailUser = this.configService.get('GMAIL_USER');
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.gmailUser,
                pass: this.gmailApikey,
            },
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
        const mailOptions = {
            from: `Train IT <${this.gmailUser}>`,
            to: email,
            subject: 'Restablecimiento de contraseña',
            html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}</p>`,
        };
        
        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Correo de restablecimiento enviado a:', email);
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error);
            }
        } 
        
        async sendEmailConfirmation(email: string, token: string) {
           
            const confirmationUrl = `${this.configService.get('FRONTEND_URL')}/sign-up?token=${token}`;
            const mailOptions = {
                from: `"Train IT" <${this.gmailUser}>`,
                to: email,
                subject: "Confirmación de Email ✔",
                html: `<p>Por favor, confirma tu email haciendo clic en el siguiente enlace: ${confirmationUrl}</p>`,
            };

            try {
                await this.transporter.sendMail(mailOptions);
                console.log('Correo de confirmación enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de confirmación:', error);
            }
        }
    }
