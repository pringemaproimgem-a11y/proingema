export type ContactFormInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(input: ContactFormInput): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const digits = input.phone.replace(/\D/g, "");
  const message = input.message.trim();

  if (name.length < 3 || !name.includes(" ")) {
    errors.name = "Ingresa tu nombre completo.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Ingresa un correo válido.";
  }

  if (input.phone.trim() && (digits.length < 7 || digits.length > 15)) {
    errors.phone = "Ingresa un teléfono válido.";
  }

  if (message.length < 20) {
    errors.message = "Cuéntanos un poco más sobre tu proyecto.";
  }

  return errors;
}
