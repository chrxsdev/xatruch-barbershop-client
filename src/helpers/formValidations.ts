interface ValidationRule {
  required?: {
    value: boolean;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  min?: {
    value: number;
    message: string;
  };
}

export const fullNameValidations: ValidationRule = {
  required: {
    value: true,
    message: 'Nombre Completo es requerido.',
  },
  minLength: {
    value: 2,
    message: 'Nombre Completo debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 64,
    message: 'Nombre Completo debe contener menos de 64 caracteres.',
  },
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: 'Nombre Completo inválido.',
  },
};

export const emailValidations: ValidationRule = {
  required: {
    value: true,
    message: 'Email es requerido.',
  },
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Formato de Email inválido.',
  },
};

export const passwordValidations = (field = 'Password'): ValidationRule => {
  return {
    required: {
      value: true,
      message: `${field} es requerida.`,
    },
    minLength: {
      value: 8,
      message: `${field} debe contener al menos 8 caracteres.`,
    },
  };
};

export const titleValidations: ValidationRule = {
  required: {
    value: true,
    message: 'Título de la Review es requerida.',
  },
  minLength: {
    value: 2,
    message: 'Título de la Review debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 20,
    message: 'Título de la Review debe contener menos de 20 caracteres.',
  },
};

export const reviewValidations: ValidationRule = {
  required: {
    value: true,
    message: 'Review es requerida.',
  },
  minLength: {
    value: 2,
    message: 'Review debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 100,
    message: 'Review debe contener menos de 100 caracteres.',
  },
};

export const serviceNameValidations: ValidationRule = {
  required: {
    value: true,
    message: 'Nombre del Servicio es requerido.',
  },
  minLength: {
    value: 2,
    message: 'Nombre del Servicio debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 30,
    message: 'Nombre del Servicio debe contener menos de 30 caracteres.',
  },
  pattern: {
    value: /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/,
    message: 'Nombre del Servicio inválido.',
  },
};

export const priceValidations: ValidationRule = {
  required: {
    value: true,
    message: 'Precio del Servicio es requerido.',
  },
  min: {
    value: 0,
    message: 'Precio debe ser mayor o igual cero en caso de servicio gratuito.',
  },
  pattern: {
    value: /^\d+(\.\d{1,2})?$/,
    message: 'Máximo de 2 cifras decimales permitidas, separados por punto.',
  },
};
