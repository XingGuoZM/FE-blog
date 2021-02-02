function getData() {
  return new Promise((resolve, reject) => {
    const res = [1, 2, 3, 4];
    setTimeout(() => {
      resolve(res);
    }, 150)

  })
}

export { getData }