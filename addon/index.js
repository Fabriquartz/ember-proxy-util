import Ember from 'ember';

const {
  ArrayProxy,
  ObjectProxy,
  get,
  isArray,
  isEqual
} = Ember;

const { max } = Math;

export function isProxy(object) {
  return (object instanceof ObjectProxy) ||
         (object instanceof ArrayProxy);
}

export function withoutProxies(object) {
  while (isProxy(object)) {
    object = get(object, 'content');
  }

  return object;
}

export function proxyIsEqual(a, b) {
  // HACK: If both are Ember Data models, compare ID.
  if (a && b && get(a, 'id') != null) {
    return get(a, 'id') === get(b, 'id');
  }

  return isEqual(withoutProxies(a), withoutProxies(b));
}

function itemAt(arr, index) {
  if (typeof arr.objectAt === 'function') {
    return arr.objectAt(index);
  } else {
    return arr[index];
  }
}

export function proxyIndexOf(haystack, needle, fromIndex = 0) {
  if (fromIndex < 0) {
    fromIndex = max(0, this.length + fromIndex);
  }

  haystack = withoutProxies(haystack);

  if (isArray(haystack)) {
    for (let i = fromIndex; i < haystack.length; i++) {
      const item = itemAt(haystack, i);
      if (proxyIsEqual(item, needle)) {
        return i;
      }
    }
  }

  return -1;
}
