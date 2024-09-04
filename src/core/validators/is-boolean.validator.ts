import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsBoolean(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsBoolean',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const regex = /^(true|false|1|0)$/;

          return regex.test(value);
        },
      },
    });
  };
}
