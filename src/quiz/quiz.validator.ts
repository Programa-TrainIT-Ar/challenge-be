import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { QuestionType } from '@prisma/client'; 

@ValidatorConstraint({ name: 'correctOptionValidator', async: false })
export class CorrectOptionValidator implements ValidatorConstraintInterface {
  validate(value: number[], args: ValidationArguments) {
    const { type } = args.object as { type: QuestionType };
    
    // Validar que sea un array de números enteros
    if (!Array.isArray(value) || !value.every(num => Number.isInteger(num))) {
      return false;
    }

    switch (type) {
      case QuestionType.multiple_choice:
        return value.length >= 2;
      
      case QuestionType.simple_choice:
      case QuestionType.true_false:
        return value.length === 1;
      
      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const { type } = args.object as { type: QuestionType };
    
    switch (type) {
      case QuestionType.multiple_choice:
        return 'Para preguntas de opción múltiple, debes seleccionar al menos 2 respuestas correctas';
      
      case QuestionType.simple_choice:
        return 'Para preguntas de opción simple, debes seleccionar exactamente 1 respuesta correcta';
      
      case QuestionType.true_false:
        return 'Para preguntas de verdadero/falso, debes seleccionar exactamente 1 respuesta correcta';
      
      default:
        return 'Formato de respuesta inválido';
    }
  }
}

export function ValidateCorrectOption(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'correctOptionValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CorrectOptionValidator,
    });
  };
}