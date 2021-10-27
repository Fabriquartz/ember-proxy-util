import { module, test } from 'qunit';
import { A as emberArray } from '@ember/array';
import ObjectProxy from '@ember/object/proxy';
import ArrayProxy from '@ember/array/proxy';

import {
  isProxy,
  withoutProxies,
  proxyIsEqual,
  proxyIndexOf,
} from 'ember-proxy-util';

module('proxy utils', function () {
  test('isProxy', function (assert) {
    let objectProxy = ObjectProxy.create();
    let arrayProxy = ArrayProxy.create();

    assert.ok(isProxy(objectProxy));
    assert.ok(isProxy(arrayProxy));
  });

  test('withoutProxies', function (assert) {
    let object = {};
    let objectProxy = ObjectProxy.create({ content: object });
    let doubleProxy = ObjectProxy.create({ content: objectProxy });

    assert.equal(withoutProxies(objectProxy), object);
    assert.equal(withoutProxies(doubleProxy), object);
  });

  test('proxyIsEqual', function (assert) {
    let object = {};
    let one = ObjectProxy.create({ content: object });
    let two = ObjectProxy.create({ content: object });
    let three = ObjectProxy.create({ content: {} });

    assert.ok(proxyIsEqual(one, two), 'One and Two are equal');
    assert.notOk(proxyIsEqual(one, three), 'One and Three are not equal');
  });

  test('proxyIsEqual with Ids', function (assert) {
    let a = { id: 1 };
    let b = { id: 1 };
    let c = { id: 2 };

    let one = ObjectProxy.create({ content: a });
    let two = ObjectProxy.create({ content: b });
    let three = ObjectProxy.create({ content: c });

    assert.ok(proxyIsEqual(one, two), 'One and Two are equal');
    assert.notOk(proxyIsEqual(one, three), 'One and Three are not equal');
  });

  test('proxyIndexOf', function (assert) {
    let a = {};
    let b = {};
    let c = {};

    let array = ArrayProxy.create({ content: emberArray([a, b]) });
    assert.strictEqual(proxyIndexOf(array, a), 0);
    assert.strictEqual(proxyIndexOf(array, b), 1);
    assert.strictEqual(proxyIndexOf(array, c), -1);
    assert.strictEqual(proxyIndexOf(array, a, 1), -1);
  });
});
