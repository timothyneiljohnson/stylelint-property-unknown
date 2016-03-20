const ruleTester = require('stylelint-rule-tester');
const propertyUnknown = require('..');

const messages = propertyUnknown.messages;
const testRule = ruleTester(propertyUnknown.rule, propertyUnknown.ruleName);

const basics = (tr) => {
  tr.ok('');
  tr.ok('a {}');
  tr.ok('@import \'foo.css\';');
  tr.ok('a { margin-bottom: 0; }');
}

testRule(true, (tr) => {
  basics(tr);

  tr.ok('a { margin-bottom: 0; }');
  tr.notOk('a { bottom-margin: 0; }', messages.rejected);

  tr.ok('@media print { a { margin-bottom: 0; }}');
  tr.notOk('@media print { a { bottom-margin: 0; }}', messages.rejected);
});
