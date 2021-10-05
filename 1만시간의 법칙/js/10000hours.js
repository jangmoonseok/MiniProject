// js file
const startBtn = document.querySelector('.start_btn')
const loadingImg = document.querySelector('.result_loading')
const result = document.querySelector('.result')
const fieldInput = document.querySelector('#field_value')
const timeInput = document.querySelector('#time_value')
const fieldResult = document.querySelector('#field_result')
const timeResult = document.querySelector('#time_result')
const modalBtn = document.querySelector('.modal_btn')
const modal = document.querySelector('#modal')
const closeBtn = document.querySelector('.close_btn')

function calculator(){
    if(!fieldInput.value || !timeInput.value){
        return alert('입력되지 않았습니다.')
    }
    loadingImg.style.display = "block"
    result.style.display = 'none'
    setTimeout(() => {
        loadingImg.style.display = 'none'
        result.style.display = 'block'
        fieldResult.innerHTML = fieldInput.value
        timeResult.innerHTML = Math.ceil(10000 / timeInput.value)
    }, 2000);
}

function modalOpen(){
    modal.style.display = 'flex'
}

function modalClose(){
    modal.style.display = 'none'
}

startBtn.addEventListener('click', calculator)
modalBtn.addEventListener('click', modalOpen)
closeBtn.addEventListener('click', modalClose)
