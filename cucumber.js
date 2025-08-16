module.exports = {
  default: [
    '--require-module', 'ts-node/register',
    '--require', 'test/steps/bootstrap.ts',
    '--require', 'test/steps/**/*.ts',
    'test/**/*.feature',
  ].join(' '),
};
