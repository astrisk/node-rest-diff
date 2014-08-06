node-rest-diff
===============

Comparison of REST API response for Node.js.  
  
This library is used to perform a comparison of the response of REST API.  
(Corresponding to only json format at the moment)

Install
---------

Install from npm:

    $ npm install node-rest-diff


Usage
------

### Using the method.

```javascript
var restdiff = require('node-rest-diff');

var args = {
};

// Registering a comparison
// httpMethod : GET or POST or PUT or PATCH or DELETE
// target1 : Resources to be compared
// target2 : Resources to be compared
// args : Required settings in node-rest-client
restdiff.add(httpMethod, target1, target2, args);

// Comparison start
restdiff.compare();
```

### Comparison of simple REST API response.

```javascript
var restdiff = require('node-rest-diff');

var args = {
  headers:{
    "Content-Type": "application/json"
  }
};

restdiff.add('GET', 'http://localhost:3000/v1/users/1', 'http://localhost:3000/v2/users/1', args);

restdiff.compare();
```

### Compare REST API multiple responses.

```javascript
var restdiff = require('node-rest-diff');

var args = {
  headers:{
    "Content-Type": "application/json"
  }
};

restdiff.add('GET', 'http://localhost:3000/v1/users/1', 'http://localhost:3000/v2/users/1', args);
restdiff.add('GET', 'http://localhost:3000/v1/roles/1', 'http://localhost:3000/v2/roles/1', args);
restdiff.add('GET', 'http://localhost:3000/v1/groups/1', 'http://localhost:3000/v2/groups/1', args);

restdiff.compare();
```

### Result

![result](https://pbs.twimg.com/media/BuX3xH1CUAECOg4.jpg:large)

Link
------

* https://github.com/aacerox/node-rest-client
* https://github.com/benjamine/jsondiffpatch
* https://github.com/caolan/async
* https://github.com/marak/colors.js/

