import { parseOneAddress } from "email-addresses"

export const isValidEmail = (email: string) =>
  typeof email === "string" && !!parseOneAddress(email.toLowerCase())
