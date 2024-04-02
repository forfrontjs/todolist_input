let arr = [
    {id:1,title:'задание 1',isDone:false,color:"green"},
    {id:2,title:'задание 2',isDone:false,color:"green"},
    
]
let ul = document.querySelector('.tasks')
let form = document.querySelector('form')
let taks__done = document.querySelector('.task__done')
let taks__all = document.querySelector('.task__all')
let progress = document.querySelector('.progress__done')





let showTodo = ()=>{
    progress.style.width = 100 / arr.length * arr.filter((el)=>{
        return el.isDone === true
    }).length + '%'

    taks__all.textContent = arr.length
    taks__done.textContent = arr.filter((el)=>{
        return el.isDone === true
    }).length
    ul.innerHTML =''
arr.forEach((el)=>{
    ul.innerHTML +=`
    <li style="text-decoration: ${el.isDone===true? "line-through":'none'}">${el.title} 
    <div class="btns">
    <button class="btn__done" data-id="${el.id}">
        <span class="material-symbols-outlined">
            check
            </span>
    </button>
    <button class="btn__del" data-id="${el.id}">
        <span class="material-symbols-outlined">
            delete
            </span>
    </button>
    </div>
</li>
    `
})
let btns__del = document.querySelectorAll('.btn__del')
btns__del.forEach((el)=>{
    el.addEventListener('click',()=>{
      arr = arr.filter((item)=>{
            return item.id !== +el.dataset.id
      })
      showTodo()
    })
})

let btns__done = document.querySelectorAll('.btn__done')
btns__done.forEach((el)=>{
    el.addEventListener('click',()=>{
        arr = arr.map((item)=>{
           if(item.id === +el.dataset.id){
            return {...item,isDone:!item.isDone}
           }
           return item
        })
        showTodo()
    })
})
}


form[1].addEventListener('click',(event)=>{
event.preventDefault()
if(form[0].value.trim()==='' || /^\d/.test(form[0].value)){
     return alert('введите текст')
}
arr = [...arr,{id:arr.length +1,title:form[0].value,isDone:false}]
form[0].value = ''
showTodo()
})


showTodo()
