const assign = require('object-assign');
const stylelint = require('stylelint');
const ruleName = 'plugin/property-unknown';
const knownProperties = require('./data/knownProperties');
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: 'Property is unknown',
});

const arrayContains = (searchItem, array) =>
  array.indexOf(searchItem) > -1;

module.exports = stylelint.createPlugin(ruleName, (actual) =>
  (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, { actual });
    const checkProperty = (decl) => {
      const propertyName = decl.prop;

      // Check if prop is in known prop list
      if (!arrayContains(propertyName, knownProperties) &&
        // Allow variables
        propertyName.substr(0, 1) !== '$' &&
        // Allow vendor prefixes
        propertyName.substr(0, 1) !== '-') {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: decl,
          message: messages.rejected
        });
      }
    };

    if (!validOptions) {
      return;
    }

    root.walkDecls(checkProperty);
  }
);

module.exports.ruleName = ruleName;
module.exports.messages = messages;
