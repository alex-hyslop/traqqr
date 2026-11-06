// ⚑ NOT WIRED YET: where contact messages go (support inbox or ticket tool, with or without attachments)
// and the server-side spam protection (honeypot check + rate limit) are still to be decided (Kev, 6 Nov).
// Until then this sends nothing and resolves false, so the form shows its "send failed" state and keeps
// what was typed. To wire it: POST the FormData (multipart: email, topic, subject, message, attachments,
// locale and the honeypot `website`) to the chosen endpoint and resolve whether it was accepted.

/** Sends the contact form. Resolves true when the message was accepted. */
export async function submitContact(data: FormData): Promise<boolean> {
  void data;
  return false;
}
