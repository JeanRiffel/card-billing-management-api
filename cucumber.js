module.exports = {
  default: [
      "test/e2e-bdd/features/**/*.feature",
      "--require-module ts-node/register",
      "--require test/e2e-bdd/steps/**/*.ts",
      // "--publish-quiet"
  ].join(' '),
};
