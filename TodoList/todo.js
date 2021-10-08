// HTML 요소 불러오기
const todoForm = document.querySelector('#TodoForm')
const input = document.querySelector('.input_list')
const list = document.querySelector('.todo_list')
const memoModal = document.querySelector('#Memo')
const memoTitle = document.querySelector('.memo_title')
const saveMemoBtn = document.querySelector('.saveMemo')
const inputMemo = document.querySelector('.input_memo')

let toDoList = []
let memoList = []

const todoFormHandler = (e) => {
        e.preventDefault()
        const currentValue = input.value
        addTodo(currentValue)
        input.value = "";
}

const memoFormHandler = (e) => {
        const memoId = e.target.parentNode.children[1].id
        const currentValue = inputMemo.value
        addMemo(memoId, currentValue)
}

const addMemo = (id, memo) => {
        const memoObj = {
                id:id,
                memo:memo
        }
        if(memoList[id - 1]){
                memoList[id - 1].memo = memo
        }else{
                memoList.push(memoObj)
        }
        

        
        saveMemo(memoList)
        memoModal.style.display = 'none'
}

const addTodo = (text) => {
        const liEle = document.createElement('li')
        const spanEle = document.createElement('span')
        const delBtn = document.createElement('button')
        const memoBtn = document.createElement('button')
        const newId = toDoList.length + 1
        delBtn.innerHTML = "❌"
        delBtn.addEventListener('click', deleteTodo)
        memoBtn.innerHTML = "📄"
        memoBtn.addEventListener('click', memoTodo)
        spanEle.innerHTML = text
        liEle.id = newId
        liEle.appendChild(spanEle)
        liEle.appendChild(memoBtn)
        liEle.appendChild(delBtn)
        list.appendChild(liEle)
        const todoObj = {
                id:newId,
                todo:text
        }
        toDoList.push(todoObj)
        saveTodo(toDoList)        
}

const saveTodo = (toDos) => {
        arrToString = JSON.stringify(toDos)
        window.localStorage.setItem("ToDos", arrToString)
}

const deleteTodo = (e) => {
        const removeEle = e.currentTarget.parentNode
        list.removeChild(removeEle)
        const removedToDos = toDoList.filter( todo => {
                return todo.id !== parseInt(removeEle.id)
        })
        toDoList = removedToDos
        saveTodo(toDoList)

}

const memoTodo = (e) => {
        const memoEle = e.target.parentNode
        inputMemo.id = memoEle.id
        memoModal.style.display = 'flex'
        memoTitle.innerHTML = toDoList[memoEle.id - 1].todo
        saveMemoBtn.addEventListener('click', memoFormHandler)
        readMemo(memoEle.id)
}


const saveMemo = (memos) => {
        arrToString = JSON.stringify(memos)
        window.localStorage.setItem("Memos", arrToString)
}

const readMemo = (id) => {
        if(memoList.length !== 0){
                let memoValue = memoList.find(memo => {
                        return memo.id === id
                })
                inputMemo.value = memoValue ? memoValue.memo : null 
                
        }
}

const closeModal = () => {
        memoModal.style.display = 'none'
}

const loadToDos = () => {
        const ToDos = window.localStorage.getItem("ToDos")
        if(ToDos !== null){
                const parseToDos = JSON.parse(ToDos)
                parseToDos.forEach((todo) => {
                        addTodo(todo.todo)
                })
        }
}

const loadMemos = () => {
        const Memos = window.localStorage.getItem("Memos")
        if(Memos !== null){
                const parseMemos = JSON.parse(Memos)
                parseMemos.forEach((memo) => {
                        addMemo(memo.id, memo.memo)
                })
        }
}

todoForm.addEventListener('submit', todoFormHandler)
loadToDos()
loadMemos()
