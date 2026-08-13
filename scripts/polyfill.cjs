if (typeof URL.parse !== 'function') {
  URL.parse = function(url, base) {
    try {
      return new URL(url, base);
    } catch (e) {
      return null;
    }
  };
}
