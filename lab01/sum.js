// const mySum = (num1, num2) => {
//   return num1 + num2
// }

const mySum = (...args) => {
  return args.reduce((total, curr) => total + curr, 0)
}

module.exports = {
  mySum,
}
