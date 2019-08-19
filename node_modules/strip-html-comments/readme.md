# strip-html-comments [![Build Status](https://secure.travis-ci.org/johnotander/strip-html-comments.png?branch=master)](https://travis-ci.org/johnotander/strip-html-comments) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Remove HTML comments from a string. This is intended to be a simple utility for the most trivial of comment stripping.

## Installation

```bash
npm install --save strip-html-comments
```

## Usage

```javascript
var stripHtmlComments = require('strip-html-comments')

stripHtmlComments('<span>foo<!--bar--></span>')  // => '<span>foo</span>
```

## Known Limitations

It will remove comments in `<textarea>`s:

```html
<textarea><!-- comment in a textarea --></textarea>
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
