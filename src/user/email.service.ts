import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

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
            }
        });
    }

    async sendPasswordResetEmail(email: string, token: string) {
        const templatePath = path.join(
            process.cwd(),
            'dist',
            'templates', 
            'correo', 
            'pages', 
            'recover-pass.html'
        );
        
        let htmlContent = fs.readFileSync(templatePath, 'utf8');
            
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;

        htmlContent = htmlContent.replace('{{confirmationUrl}}', resetUrl);

        const mailOptions = {
            from: `Train IT <${this.gmailUser}>`,
            to: email,
            subject: 'Restablecimiento de contraseña',
            html: htmlContent,
        };
        
        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Correo de restablecimiento enviado a:', email);
        } catch (error) {
            console.error('Error al enviar el correo de restablecimiento:', error);
            }
        } 
        
        async sendEmailConfirmation(email: string, name: string, token: string) {
            
            const templatePath = path.join(
                process.cwd(),
                'dist',
                'templates', 
                'correo', 
                'pages', 
                'verify-email.html'
            );
            
            let htmlContent = fs.readFileSync(templatePath, 'utf8');

            const confirmationUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
            // const confirmationUrl = `${this.configService.get('FRONTEND_URL')}/sign-up?token=${token}`;

            htmlContent = htmlContent
                .replace('{{confirmationUrl}}', confirmationUrl)
                .replace('{{name}}', name)


            const mailOptions = {
                from: `"Train IT" <${this.gmailUser}>`,
                to: email,
                subject: "Confirmación de Email ✔",
                html: htmlContent,
            };

            try {
                await this.transporter.sendMail(mailOptions);
                console.log('Correo de confirmación enviado a:', email);
            } catch (error) {
                console.error('Error al enviar el correo de confirmación:', error);
            }
        }
    }
