# babelrc-rollup

Builds a babel configuration for rollup-plugin-babel by reading .babelrc.

## Install

```
$ npm install --save-dev babelrc-rollup
```

## Usage

Create a `.babelrc` file at the root of your project as normal:

```json
{
  "presets": ["es2015"]
}
```

Inside your `rollup.config.js`, do this:

```js
import babelrc from 'babelrc-rollup';
import babel from 'rollup-plugin-babel';

export default {
  …
  plugins: [
    babel(babelrc())
  ]
  …
};
```

### Options

#### `path` (default: `'.babelrc'`)

If you'd like to customize the path of your babelrc file, pass this option with
a string path that can be read using `fs.readFile`.

#### `config`

Use this to avoid reading a babelrc file at all. You could use this to pull the
config from `package.json` instead, for example.

#### `addModuleOptions` (default: `true`)

Disable this option if you do not want the `modules: false` option to be given
to presets in your babel config. You probably don't want to change this unless
you're using `findRollupPresets`.

#### `findRollupPresets` (default: `false`)

Enable this to replace presets with the equivalent rollup-compatible preset, if
available. When this option is enabled, babelrc-rollup will try to resolve e.g.
`es2015-rollup` instead of `es2015`. If no such preset can be found the original
will be used.

#### `addExternalHelpersPlugin` (default: `true`)

By default, babelrc-rollup adds the [`external-helpers` plugin][external-helpers],
which ensures that only one copy of each helper ends up in your bundle. Disable
this option to prevent adding this plugin.


## A note on babel versions

Since babel [v6.13.0][6-13-0], presets may be given options by using a tuple of
`[name, opts]`. For example, instead of

```js
{
  "presets": ["es2015"]
}
```

You can do this:

```js
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

babelrc-rollup is meant to work with this version of babel or later, but earlier
versions are supported by using the right options. The old way to configure the
`es2015` preset for use with rollup was to use the `es2015-rollup` preset
instead. To continue doing that, call `babelrc` like so:

```js
babelrc({
  addModuleOptions: false,
  findRollupPresets: true,
  addExternalHelpersPlugin: false
})
```

If you use the `es2015` preset, make sure you install `es2015-rollup` too. If
you can use babel v6.13.0 or later, you should do so.

[external-helpers]: https://babeljs.io/docs/plugins/external-helpers/
[6-13-0]: https://github.com/babel/babel/blob/master/CHANGELOG.md#v6130-2016-08-04
[rollup-config]: https://github.com/eventualbuddha/babelrc-rollup/blob/master/rollup.config.js
