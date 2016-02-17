# ember-proxy-util
[![npm version](https://badge.fury.io/js/ember-proxy-util.svg)](http://badge.fury.io/js/ember-proxy-util)
[![Build Status](https://travis-ci.org/Fabriquartz/ember-proxy-util.svg?branch=master)](https://travis-ci.org/Fabriquartz/ember-proxy-util)
[![Ember Observer Score](http://emberobserver.com/badges/ember-proxy-util.svg)](http://emberobserver.com/addons/ember-proxy-util)

This addon adds util functions that helps you deal with `Ember.ObjectProxy` and `Ember.ArrayProxy`.

### Installing

```
ember install ember-proxy-util
```

### Usage

#### `isProxy`

You can use this function to see if an object is a proxy

```js
import { isProxy } from 'ember-proxy-util';

isProxy(object) // => true or false
```

#### `withoutProxies`

Use this function to get the content of a proxy

```js
import { withoutProxies } from 'ember-proxy-util';

withoutProxies(object) // => content of proxy
```

#### `proxyIsEqual`

Use this function to compare two objects that might be a proxy

```js
import { proxyIsEqual } from 'ember-proxy-util';

proxyIsEqual(objectA, objectB) // => true or false
```

#### `proxyIndexOf`

Use this function to get the index of an item that might be a proxy

```js
import { proxyIndexOf } from 'ember-proxy-util';

proxyIndexOf(array, object) // => The index of where object is in array or -1
```

## Legal

Fabriquartz B.V. &copy; 2015

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
