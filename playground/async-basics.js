console.log('starting app')

setTimeout(() => {
  console.log('Inside of callback')
}, 1000);

setTimeout(() => {
  console.log('Second timeout')
}, 0)

console.log('finishing up')
