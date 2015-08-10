import Ember from 'ember';

const get = Ember.get;

export function isProxy(object) {
  return (object instanceof Ember.ObjectProxy) ||
         (object instanceof Ember.ArrayProxy);
}

export function withoutProxies(object) {
  while (isProxy(object)) {
    object = object.get('content');
  }

  return object;
}

export function proxyIsEqual(a, b) {
  // HACK: If both are Ember Data models, compare ID.
  if (a && b && get(a, 'id') != null) {
    return get(a, 'id') === get(b, 'id');
  }

  return Ember.isEqual(withoutProxies(a), withoutProxies(b));
}

function itemAt(arr, index) {
  if (typeof arr.objectAt === 'function') {
    return arr.objectAt(index);
  } else {
    return arr[index];
  }
}

export function proxyIndexOf(haystack, needle, fromIndex) {
  if (fromIndex == null) {
    fromIndex = 0;
  } else if (fromIndex < 0) {
    fromIndex = Math.max(0, this.length + fromIndex);
  }

  haystack = withoutProxies(haystack);

  if (haystack != null && haystack.length) {
    for (let i = fromIndex; i < haystack.length; i++) {
      const item = itemAt(haystack, i);
      if (proxyIsEqual(item, needle)) {
        return i;
      }
    }
  }

  return -1;
}
