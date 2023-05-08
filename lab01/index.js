const sum = require('./sum')

console.log(sum.mySum(5, 5))

const myArr = [1, 2, 3, 4, 5]
const result = sum.mySum(...myArr)
console.log(result)

const mySecondArr = myArr.map((val) => val * 2)
console.log(mySecondArr)

const average =
  mySecondArr.reduce((total, curr) => {
    return total + curr
  }, 0) / mySecondArr.length

const overAve = mySecondArr.filter((val) => {
  if (val > average) {
    console.log(val)
    return true
  }
})

console.log(overAve)

setTimeout(() => console.log('Goodbye'), 3000)

const employee = {
  name: 'hoge',
  email: 'hoge@hoge.com',
  department: 'Sales',
  startDate: '2023-05-08',
}

const { name, email } = employee
const person = { name, email }

console.log(person)
