/** Check if a value is a valid email address */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** Check if a value is a valid phone number (10-15 digits, optional + at start) */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone);
}
