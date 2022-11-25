module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'footer-max-length': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
    'body-max-line-length': [0, 'always'],
  },
};
