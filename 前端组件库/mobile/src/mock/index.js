

function mockName() {
  const res = { name: 'jack' }
  return new Promise((resolve) => setTimeout(() => resolve(res), 500))
}

function mockAge() {
  const res = { age: '12' }
  return new Promise((resolve) => setTimeout(() => resolve(res), 1000))
}

export {
  mockName,
  mockAge,
};