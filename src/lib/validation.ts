export interface BookingValidationInput {
  clientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}

export type BookingFieldErrorKey =
  | "errNameRequired"
  | "errPhoneInvalid"
  | "errDateRequired"
  | "errTimeRequired";

export function normalizeUzPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 12 && /^998[2-9]\d{8}$/.test(digits)) {
    return `+${digits}`;
  }

  if (digits.length === 9 && /^[2-9]\d{8}$/.test(digits)) {
    return `+998${digits}`;
  }

  return null;
}

export function validateBookingInput(
  input: BookingValidationInput,
): Partial<Record<keyof BookingValidationInput, BookingFieldErrorKey>> {
  const errors: Partial<
    Record<keyof BookingValidationInput, BookingFieldErrorKey>
  > = {};

  if (input.clientName.trim().length < 2) {
    errors.clientName = "errNameRequired";
  }

  if (!normalizeUzPhone(input.phone)) {
    errors.phone = "errPhoneInvalid";
  }

  if (!input.preferredDate.trim()) {
    errors.preferredDate = "errDateRequired";
  }

  if (!input.preferredTime.trim()) {
    errors.preferredTime = "errTimeRequired";
  }

  return errors;
}
