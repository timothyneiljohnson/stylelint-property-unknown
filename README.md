# stylelint-property-unknown

A [stylelint](https://github.com/stylelint/stylelint) custom rule to catch usage of unknown properties.

This rule will cause stylelint to warn you whenever an unknown property is used.

## Installation

```
npm install stylelint-unknown-property
```

This plugin is compatible with v5.0.1+.

## Details

Preprocessers like Sass, Less, and Stylus have nesting. Nesting can be enabled via PostCSS with [postcss-nested](https://github.com/postcss/postcss-nested) or [postcss-nesting](https://github.com/jonathantneal/postcss-nesting).

Example:

```css
a { /* OK */
  margin-bottom: 0
}

a { /* Not OK */
  bottom-margin: 0
}
```

### This ignores vendor-prefixed properties and variables.

Any property beginning `$` or `-` is ignored. This will allow for variables or vendor specific properties to be used without error.

```css
a {
  -webkit-foo: bar
}

a {
  @variableProperty: value
}
```

I did this because performance would be affected by including vendor-prefixed properties in the [property whitelist](#), and that list would be much more difficult to maintain.

## Usage

Add `"stylelint-property-unknown"` to your stylelint config `plugins` array, then add `property-unknown` to your rules, set to `true`.

As follows:

```js
{
  "plugins": [
    "stylelint-property-unknown"
  ],
  "rules": {
    "property-unknown": true
  },
};
```
