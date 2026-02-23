/**
 * Returns true if `email` matches a basic RFC-like pattern.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Smooth-scrolls to the element matching `selector`.
 */
export function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}
