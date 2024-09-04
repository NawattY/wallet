import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isNotEmpty,
} from 'class-validator';
import * as moment from 'moment';

export function LessThanDateValidator(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'LessThanDateValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          if (
            isNotEmpty(value) &&
            isNotEmpty(relatedValue) &&
            value !== relatedValue
          ) {
            return moment(new Date(value)).isAfter(new Date(relatedValue));
          }

          return true;
        },
      },
    });
  };
}
