setTimeout(() => {
  console.log(1)
}, 0)
new Promise((resolve, reject) => {
  console.log(2)
  for (let i = 0; i < 100000000000; i++) {
    i === 999999999 && resolve()
  }
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)
