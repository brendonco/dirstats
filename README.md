# dirstats
File System Statistics Dashboard for Webpack

##Drop me a line if your interested to contribute.

**Tech Stack:**

* React with Sass pre-processor.
* Socket IO.
* [Recharts](http://recharts.org/) Charts.
* [Polka](https://github.com/lukeed/polka) Server.

## Installation

```
$ npm i -D dirstats
```

In your webpack config file:

```js
const Dirstats = require("dirstats");

/* the rest of your webpack configs */

plugins: [
  new Dirstats({
    port: 1338 // optional: set a port
  })
];
```

In your browser open:

```
localhost:1338
```

and you are all set!

## Help & Contribute

Setting up the dev environment

Install Dependencies:

```
$ npm install
```

Run Dirstats in your browser, Dirstats root:

```
$ npm run watch
```

Finally, open a browser to `http://localhost:1338`


## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/6521691?s=96&v=4" width="100px;"/><br /><sub><b>Brendon 💖</b></sub>](https://github.com/brendonco)<br />[💻](https://github.com/brendonco/dirstats/commits?author=brendonco "Code") [🤔](#ideas-brendonco "Ideas, Planning, & Feedback") | | | | | | |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!


## License

[MIT © Brendon Co](https://oss.ninja/mit/brendonco)
