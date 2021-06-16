// Test

it('adds 1 + 2 to equal 3 in TScript', () => {
  // Generally, `import` should be used for TypeScript
  // as using `require` will not return any type information.
  // const sum = require('../sum.ts').default;
  expect(1 + 2).toBe(3);
});
