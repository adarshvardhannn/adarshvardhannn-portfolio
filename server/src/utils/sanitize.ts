/**
 * Escapes HTML special characters to prevent XSS attacks.
 * Used when embedding user input in HTML email templates.
 */
const htmlEscapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

const htmlEscapeRegex = /[&<>"'/]/g;

export function escapeHtml(str: string): string {
  return str.replace(htmlEscapeRegex, (char) => htmlEscapeMap[char] || char);
}
