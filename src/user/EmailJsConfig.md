## GUIA PARA CONFIGURAR EMAIL.JS
En el .env, agregar las siguientes variables de entorno:

``` .dotenv
EMAILJS_SERVICE_ID=service_xxx
EMAILJS_USER_ID=account_public_key
EMAILJS_ACCESS_TOKEN=account_private_key
EMAILJS_EMAIL_TEMPLATE_ID=template_mail_id
EMAILJS_PASSWORD_TEMPLATE_ID=tempate_password_id
```

Generar las claves en https://www.emailjs.com/
1. Crear una cuenta en EmailJS.
2. Configurar un servicio de correo electrónico (por ejemplo, Gmail, Outlook, etc.).
3. Crear plantillas de correo electrónico para los diferentes tipos de mensajes que deseas enviar (por ejemplo, confirmación de registro, restablecimiento de contraseña, etc.).
4. Obtener el Service ID, User ID, Access Token y Template IDs desde el panel de control de EmailJS.
5. Agregar las variables de entorno al archivo .env de tu proyecto.
6. Guardar los cambios y reiniciar la aplicación para que las nuevas configuraciones surtan efecto.

Con estos pasos, tu aplicación estará configurada para enviar correos electrónicos utilizando EmailJS.

### Plantillas de correo electrónico
- **template_mail_id**: Utilizada para enviar correos de confirmación de registro,
- **template_password_id**: Utilizada para enviar correos de restablecimiento de contraseña.
Desde el código, debes mandar las variables necesarias para cada plantilla según lo configurado en EmailJS. Si no estás seguro de qué variables enviar, revisa la configuración de las plantillas en el panel de EmailJS. Hay una sección donde puedes ver las variables que has definido para cada plantilla y probarlas.
