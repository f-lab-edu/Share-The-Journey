import { validateEmail } from './validate';

describe('validateEmail', () => {
  const invalidEmails = ['aaaemail.com', 'email@com', 'email@.com', 'email'];
  const validEmails = ['aaa@email.com', '1@email.com', '1234@email.com'];

  it.each(invalidEmails)(
    '유효하지 않은 이메일은 false를 반환해야 한다.',
    (email) => {
      expect(validateEmail(email)).toBe(false);
    }
  );

  it.each(validEmails)('유효한 이메일은 true를 반환해야 한다.', (email) => {
    expect(validateEmail(email)).toBe(true);
  });
});
