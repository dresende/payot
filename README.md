## Payot

![Node.js CI](https://github.com/dresende/payot/workflows/Node.js%20CI/badge.svg)

```js
const payot = require("payot");

console.log(payot("10:00-12:00,18")); // [{ from: 36000, to: 43200 }, { from: 64800, to: 68400 }]
```
