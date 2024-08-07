import { validateEmail } from './validate';

describe('validateEmail', () => {
  const invalidEmails = [
    'plainaddress', // 도메인 없음
    '@no-local-part.com', // 로컬 부분 없음
    'Outlook Contact <outlook-contact@domain.com>', // 불필요한 텍스트 포함
    'no-at.domain.com', // @ 기호 없음
    'user@.com', // 도메인 부분 없음
    'user@domain..com', // 연속된 점 있음
    'user@domain.com.', // 마지막에 점이 있음
    '.user@domain.com', // 로컬 부분 시작에 점 있음
    'user@domain_com', // 밑줄이 도메인 부분에 있음
    'user@domain.c', // 도메인 최상위 부분이 너무 짧음
  ];
  const validEmails = [
    'example@example.com',
    'user.name@domain.co',
    'user_name@sub.domain.com',
    'firstname.lastname@domain.com',
    '1234567890@domain.com',
    'email@domain-one.com',
    'email@domain.name',
    'email@domain.co.jp',
    'firstname-lastname@domain.com',
    'email@domain.web',
  ];

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
