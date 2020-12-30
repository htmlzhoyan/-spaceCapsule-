
const mathrandom = function mathradom(m,n){
  let w = n-m
  return Math.round(Math.random()*w+m);
}


export {
  mathrandom
}