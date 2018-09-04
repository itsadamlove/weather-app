const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('Arguments must be numbers')
      }
    }, 1500)
  })
}

//asyncAdd(13, 5).then((res) => {
  //console.log('Result: ', res)
  //return asyncAdd(res, 33)
//}, (errorMessage) => {
  //console.log(errorMessage)
//}).then((res) => {
  //console.log('should be something: ', res)
//}, (errorMessage) => {
  //console.log(errorMessage)
//})

//console.log('\n\n\n')

// Rather than having these calls to then for each error, you can use catch to catch any error throughout the promise chain
asyncAdd(5, '7').then((res) => {
  console.log('Result: ', res)
  return asyncAdd(res, 33)
}).then((res) => {
  console.log('Should be 45', res)
}).catch((errorMessage) => {
  console.log(errorMessage)

})

//let somePromise = new Promise((resolve, reject) => {
  //setTimeout(() => {
    //resolve('Hey, it worked!')
    //reject('Unable to do stuff')
  //}, 2500)
//})

//somePromise.then((message) => {
  //console.log('Success: ', message)
//}, (errorMessage) => {
  //console.log('Error: ', errorMessage)
//})
