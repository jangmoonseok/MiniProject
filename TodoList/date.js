
const DateFunc = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + today.getDate()).slice(-2)
    const hours = ('0' + today.getHours()).slice(-2)
    const minutes = ('0' + today.getMinutes()).slice(-2)
    let seconds = ('0' + today.getSeconds()).slice(-2)
    document.querySelector('.ymd').innerHTML = year + "-" + month + "-" + day 
    document.querySelector('.time').innerHTML = hours + ':' + minutes + ':' + seconds
}

const init = () => {
    DateFunc()
    setInterval(DateFunc, 1000);
}

init()