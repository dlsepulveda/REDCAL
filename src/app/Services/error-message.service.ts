import { Injectable } from '@angular/core';
import {
  FormGroup,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Injectable()
export class ErrorMessageService {
  //TODO : Se debe usar los valores desde el texto
  public static readonly ERRORMESSAGES = {
    //! Form input Error Messages
    required: () => 'Este campo es requerido.',
    pattern: () => 'No cumple con el patrón!',
    email: () => 'Formato de correo incorrecto (ej. correo@mail.com).',
    emailAlreadyUsed: () => 'Ya existe un usuario registrado con ese correo.',
    only_alphabet: () => 'Solo se aceptan caracteres alfabéticos.',
    only_numbers: () => 'Solo se aceptan caracteres numéricos.',
    only_alphanumeric: () =>
      'Solo se aceptan caracteres alfabéticos y numéricos.',
    onlyImages: () => 'Solo se aceptan imágenes.',
    requireImage: () => 'Debe seleccionar una imagen.',
    password: () =>
      'La contraseña debe contener al menos: un número, una letra mayúscula, una letra minúscula y un símbolo (ej. !@#$%^&*) ',
    childrenNotEqual: () => 'Este valor debe ser igual al anterior.',
    minlength: (requiredLength: unknown) => {
      return requiredLength
        ? `El número mínimo de caracteres debe ser ${requiredLength}.`
        : 'No cumple el número mínimo de caracteres.';
    },
    maxlength: (requiredLength: unknown) => {
      return requiredLength
        ? `El número máximo de caracteres es ${requiredLength}.`
        : 'No cumple el número máximo de caracteres.';
    },
    hasLowercase: 'Debe tener una letra minúscula.',
    hasNumeric: 'Debe tener una número.',
    hasUppercase: 'Debe tener una letra mayúscula.',
    hasSpecial: 'Debe tener un caracter especial (ej. !@#$%^&*).',
    default: () => 'Error en campo',
    /*'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
    
    case 'required': text = `${error.control_name} is required!`; break;
      case 'pattern': text = `${error.control_name} has wrong pattern!`; break;
      case 'email': text = `${error.control_name} has wrong email format!`; break;
      case 'minlength': text = `${error.control_name} has wrong length! Required length: ${error.error_value.requiredLength}`; break;
      case 'areEqual': text = `${error.control_name} must be equal!`; break;
    */
    //! AWS Error Messages (Confirmation Code)
    //TODO : Assign text according to i18n rules
    AWS: {
      SignUp: {
        FormUnfilledException: 'Por favor llenar los campos solicitados.',
        LimitExceededException:
          'Ha excedido el límite de peticiones. Inténtelo más tarde.',
        UsernameExistsException:
          'Ya existe un usuario registrado con ese correo.',
      },
      ConfirmationCode: {
        NotAuthorizedException:
          'Usuario ya ha sido confirmado. Ya puede iniciar sesión.',
        LimitExceededException:
          'Se excedió el límite de peticiones. Inténtelo más tarde.',
        CodeMismatchException:
          'Código de verificación inválido. Por favor intente nuevamente.',
        ExpiredCodeException:
          'Código de verificación inválido. Por favor solicite nuevamente un código.',
      },
      LogIn: {
        LoginException: 'Ingrese el correo electrónico y contraseña',
        ConfirmCodeException: 'Ingrese el correo electrónico y el código',
        NoUserException: 'Ingrese el correo electrónico',
        NotAuthorizedException: 'Usuario o clave incorrecta',
        LimitExceededException:
          'Límite de peticiones excedido. Inténtelo más tarde',
        CodeMismatchException:
          'Código de verificación invalido, Por favor intentelo nuevamente',
        ConfirmEmailException:
          'Por favor confirme la cuenta desde su correo electrónico.',
      },
      ChangePassword: {
        CodeSentToEmail:
          'Consulte el código en su correo y escriba la nueva contraseña.',
        LimitExceededException:
          'Límite de peticiones excedido. Inténtelo más tarde',
        SuccessPasswordChanged: 'Cambio de constraseña exitoso.',
      },
    },
  };

  static readonly REGEXPS = {
    ONLY_ALPHABET: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$',
    ONLY_NUMBERS: '^[0-9]*$',
    ONLY_ALPHANUMERIC: '^[a-zA-ZáéíóúÁÉÍÓÚñÑ 0-9]*$',
    PASSWORD:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]*$',
    //? Decompose password
    HAS_CAPITAL: '[A-ZÑ]',
    HAS_LOWERCASE: '^([a-z])$',
    //(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
  };

  static createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[!@#$%^&*]+/.test(value);
      const passwordValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      const error: IValidacionConstrasena = {
        passwordStrength: {
          hasUpperCase,
          hasLowerCase,
          hasNumeric,
          hasSpecial,
        },
      };
      return !passwordValid ? error : null;
    };
  }
  static customImageRequired(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = control.value;
      return isValid ? null : { requireImage: true };
    };
  }

  static customOnlyImages(model: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /image\/*/.test(model.mymeType);
      return isValid ? null : { onlyImages: { value: model.mymeType } };
    };
  }

  static customConfirmValidator = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(
      formGroup.controls || {}
    );
    const isValid = otherControlNames.every((controlName) => {
      const isEqual =
        formGroup.get(controlName)?.value ===
        formGroup.get(firstControlName)?.value;
      // Append error on control
      if (!isEqual) {
        const validations: ValidationErrors =
          formGroup.get(controlName)?.errors || {};
        validations['childrenNotEqual'] = true;
        formGroup.get(controlName)?.setErrors(validations);
      }
      return isEqual;
    });
    return isValid ? null : { childrenNotEqual: true };
  };

  constructor() {}

  getErrorMessage(control: AbstractControl | null): string {
    const errorMessage = [];
    if (control?.hasError('required')) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.required());
    }

    if (control?.hasError('email')) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.email());
    }

    if (control?.hasError('emailAlreadyUsed')) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.emailAlreadyUsed());
    }

    if (control?.hasError('minlength')) {
      errorMessage.push(
        ErrorMessageService.ERRORMESSAGES.minlength(
          control?.errors?.['minlength'].requiredLength
        )
      );
    }

    if (control?.hasError('maxlength')) {
      errorMessage.push(
        ErrorMessageService.ERRORMESSAGES.maxlength(
          control?.errors?.['maxlength'].requiredLength
        )
      );
    }

    if (control?.hasError('childrenNotEqual')) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.childrenNotEqual());
    }

    if (control?.hasError('onlyImages')) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.onlyImages());
    }

    if (control?.hasError('requireImage')) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.requireImage());
    }

    //? Mensaje de error para la validacion de contraseña
    if (control?.hasError('passwordStrength')) {
      const { passwordStrength } =
        (control?.errors as IValidacionConstrasena) || {};
      if (!passwordStrength.hasLowerCase)
        errorMessage.push(ErrorMessageService.ERRORMESSAGES.hasLowercase);
      if (!passwordStrength.hasUpperCase)
        errorMessage.push(ErrorMessageService.ERRORMESSAGES.hasUppercase);
      if (!passwordStrength.hasNumeric)
        errorMessage.push(ErrorMessageService.ERRORMESSAGES.hasNumeric);
      if (!passwordStrength.hasSpecial)
        errorMessage.push(ErrorMessageService.ERRORMESSAGES.hasSpecial);
    }

    if (control?.hasError('pattern')) {
      switch (control?.errors?.['pattern'].requiredPattern) {
        case ErrorMessageService.REGEXPS.ONLY_ALPHABET:
          errorMessage.push(ErrorMessageService.ERRORMESSAGES.only_alphabet());
          break;
        case ErrorMessageService.REGEXPS.ONLY_NUMBERS:
          errorMessage.push(ErrorMessageService.ERRORMESSAGES.only_numbers());
          break;
        case ErrorMessageService.REGEXPS.ONLY_ALPHANUMERIC:
          errorMessage.push(
            ErrorMessageService.ERRORMESSAGES.only_alphanumeric()
          );
          break;
        case ErrorMessageService.REGEXPS.PASSWORD:
          errorMessage.push(ErrorMessageService.ERRORMESSAGES.password());
          break;
        default:
          errorMessage.push(ErrorMessageService.ERRORMESSAGES.pattern());
      }
    }

    if (control?.errors && !errorMessage.length) {
      errorMessage.push(ErrorMessageService.ERRORMESSAGES.default());
    }

    return errorMessage.join(' ');
  }

  getObtenerMensajeErrorForm(control: string, form: FormGroup): string {
    if (form) {
      const formControl = form.get(control);
      return this.getErrorMessage(formControl);
    }
    return '';
  }
}

interface IValidacionConstrasena {
  passwordStrength: {
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumeric: boolean;
    hasSpecial: boolean;
  };
}
