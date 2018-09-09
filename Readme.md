# fastify-loader

_The route loader for the cool kids!_

[![NpmLicense](https://img.shields.io/npm/l/fastify-loader.svg?style=for-the-badge)](https://www.npmjs.com/package/fastify-loader)
[![David](https://img.shields.io/david/TheNoim/fastify-loader.svg?style=for-the-badge)](https://github.com/TheNoim/fastify-loader)
[![GitHub package version](https://img.shields.io/github/package-json/v/TheNoim/fastify-loader.svg?style=for-the-badge)](https://github.com/TheNoim/fastify-loader)
[![NPM Link](https://img.shields.io/badge/npm-fastify--loader-red.svg?style=for-the-badge)](https://www.npmjs.com/package/fastify-loader)

Do you also want an easy way to load routes for fastify? YEAH me too! This is why I made this module.

`fastify-loader` makes it easy to load routes from a directory.

#### Features

- Looks cool
- No need to `module.export = (fastify) => { /* your code here */ }` 
- No need to export the fastify instance itself
- No `module.export = { path: '/api/test', handler: (req, reply) => {} }`

#### Please, give me an example!

```javascript
// File: ./api/hello.js

// YES, really! You don't need to require anything here. 
// The fastify instance gets injected in any file matched by the glob.
fastify.get('/api/hello', async () => {
    // Complex code here
    return { hello: true };
})
```

```javascript
// File: ./server.js

const fastify = require('fastify')();

// Just register the plugin and add glob array which files to loud
fastify.register(require('fastify-loader'), {
    paths: ['./api/**/*.js'], // A glob array
    name: "fastify" // [Optional] if you want to do something like this: YOURNAMEHERE.get('/api/test')
});

fastify.listen(1337, err => {
    if (err) console.trace(err);
    console.log('http://127.0.0.1:1337');
});
```

#### Installation

Like any other npm module.

```bash
yarn add fastify-loader
# or with npm
npm i fastify-loader --save
```

#### How does this work?

I used [this post](https://blog.sqreen.io/one-easy-way-to-inject-malicious-code-in-any-node-js-application/) by [Vladimir](https://blog.sqreen.io/author/vladimir/) to hack Module.prototype._compile to append the fastify instance before the file gets loaded.

This is why I want to thank Vladimir.

#### Does this affect any other module?

No, only files matched by the glob are affected. 

#### WebStorm/{INSERT OTHER IDE HERE} says that fastify is an unknown variable. What can I do?

If your IDE supports [JSDoc](http://usejsdoc.org/), you can append this to the file.

```diff
// File: ./api/hello.js
+ /**
+  * @var {fastify.FastifyInstance} fastify
+  */

fastify.get('/api/hello', async () => {
    // Complex code here
    return { hello: true };
})
```

#### Do tests exist?

Yes. You can run `yarn test` or `npm run test` after you installed the dependencies.

#### Inject more than just fastify

```javascript
fastify.register(require('fastify-loader'), {
    paths: ['./api/**/*.js'], // A glob array
    inject: {
        pi: 1.14 // pi is now available as var in each js file in ./api
    }
});
```

#### License

The MIT License (MIT)

Copyright (c) 2018 Nils Bergmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


