const isAndroid = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;

  return /android/i.test(window.navigator.userAgent.toLowerCase());
};