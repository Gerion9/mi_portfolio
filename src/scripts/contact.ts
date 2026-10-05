/**
 * Contact form: inline validation (on blur, cleared as soon as it's fixed) and
 * AJAX submission to Netlify Forms (URL-encoded POST incl. form-name and the
 * honeypot), with accessible success / error states. Without JS the browser's
 * native validation applies and the form posts to Netlify's success page.
 */
const MIN_MESSAGE = 20;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initContactForm(form: HTMLFormElement) {
  // Custom inline messages replace the native bubbles once the script runs
  form.noValidate = true;
  const messages = {
    required: form.dataset.msgRequired || 'Required',
    email: form.dataset.msgEmail || 'Invalid email',
    short: (form.dataset.msgShort || 'Too short').replace('{min}', String(MIN_MESSAGE)),
    sending: form.dataset.msgSending || 'Sending…',
  };
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const submitLabel = submit?.querySelector<HTMLElement>('[data-submit-label]');
  const success = document.querySelector<HTMLElement>('[data-form-success]');
  const failure = document.querySelector<HTMLElement>('[data-form-error]');
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-validate]'));
  const touched = new Set<string>();

  const errorFor = (field: HTMLInputElement | HTMLTextAreaElement): string => {
    const value = field.value.trim();
    if (field.required && !value) return messages.required;
    if (field.type === 'email' && value && !EMAIL.test(value)) return messages.email;
    if (field.name === 'message' && value && value.length < MIN_MESSAGE) return messages.short;
    return '';
  };

  const show = (field: HTMLInputElement | HTMLTextAreaElement, error: string) => {
    const slot = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
    field.setAttribute('aria-invalid', error ? 'true' : 'false');
    if (slot) {
      slot.textContent = error;
      slot.hidden = !error;
    }
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (!field.value.trim() && !touched.has(field.name)) return; // don't nag on an untouched empty field
      touched.add(field.name);
      show(field, errorFor(field));
    });
    field.addEventListener('input', () => {
      touched.add(field.name);
      // Remove an error as soon as it's fixed; never add one while typing
      if (field.getAttribute('aria-invalid') === 'true' && !errorFor(field)) show(field, '');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstInvalid: HTMLElement | null = null;
    fields.forEach((field) => {
      const error = errorFor(field);
      show(field, error);
      if (error && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      (firstInvalid as HTMLElement).focus();
      return;
    }

    const original = submitLabel?.textContent;
    if (submit) {
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
    }
    if (submitLabel) submitLabel.textContent = messages.sending;
    if (failure) failure.hidden = true;

    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    } catch {
      if (failure) {
        failure.hidden = false;
        failure.focus();
      }
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
      if (submitLabel && original) submitLabel.textContent = original;
    }
  });
}
