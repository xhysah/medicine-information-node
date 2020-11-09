function time(){
  const time = new Date()
  const addTime = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  return addTime
}
module.exports = time