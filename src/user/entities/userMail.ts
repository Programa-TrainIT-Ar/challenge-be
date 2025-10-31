/**
 * Interfaz para operaciones de correo relacionadas con el usuario.
 *
 * Intención:
 * - Definir las operaciones de alto nivel (confirmación de cuenta, restablecimiento de contraseña, correo de prueba)
 *   sin acoplar el código de negocio a una implementación concreta de envío de correo.
 *
 * Principio de Inversión de Dependencias (DIP):
 * - Esta interfaz actúa como abstracción que los módulos de alto nivel consumen.
 * - Las implementaciones concretas (por ejemplo SMTP, SendGrid, Amazon SES) deben implementar esta interfaz.
 * - La implementación concreta se inyecta en los consumidores (constructor, contenedor IoC, fábrica, etc.),
 *   permitiendo sustituir o mockear el envío de correo sin modificar la lógica de negocio.
 */
export interface UserMail {
  /**
   * Enviar un correo de confirmación de cuenta.
   *
   * @param email - Dirección de correo del destinatario.
   * @param first_name - Nombre del destinatario (para personalizar el mensaje).
   * @param token - Token de confirmación que se incluirá en la URL de confirmación.
   * @returns Promise que se resuelve cuando el envío se ha procesado o se rechaza en caso de error.
   */
  sendEmailConfirmation(
    email: string,
    first_name: string,
    token: string,
  ): Promise<void>;

  /**
   * Enviar un correo para restablecer la contraseña.
   *
   * @param email - Dirección de correo del destinatario.
   * @param name - Nombre del destinatario (para personalizar el mensaje).
   * @param token - Token de restablecimiento que se incluirá en la URL de recuperación.
   * @returns Promise que se resuelve cuando el envío se ha procesado o se rechaza en caso de error.
   */
  sendPasswordResetEmail(
    email: string,
    name: string,
    token: string,
  ): Promise<void>;

  /**
   * Enviar un correo de prueba para verificar la configuración del sistema de correo.
   *
   * @param email - Dirección de correo del destinatario.
   * @returns Promise que se resuelve cuando el envío se ha procesado o se rechaza en caso de error.
   */
  sendTestEmail(email: string): Promise<void>;
}