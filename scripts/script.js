
//resgatar o botão
var btnAdd = document.getElementById('btnAdd');
var arrayTasks = new Array();
var _local_storage = localStorage.getItem('tasks');


window.onload = function(){
    
    _local_storage = localStorage.getItem('tasks')
    arrayTasks = JSON.parse(_local_storage);

    for(var i = 0; i < arrayTasks.tasks.length; i++ ){
        var ul = document.getElementById('task-list'); 
        var div = document.createElement('div')
        div.className = 'tasks'
        ul.appendChild(div)
        var span = document.createElement('span')
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'checktask'
        checkbox.id = 'checktask'
        span.appendChild(checkbox)
        span.appendChild(document.createTextNode(arrayTasks.tasks[i]))
        div.appendChild(span);
        var button = document.createElement('button');
        button.innerText = "Excluir";
        button.className = "btnDel";
        button.setAttribute("id", arrayTasks.tasks[i])
        span.appendChild(button)
        button.onclick = function() {del(this)};
    }
    
    
    
}

btnAdd.onclick = function(){
    //resgatar o valor do input
    var taskValue = document.getElementById('addTask');
    _local_storage = localStorage.getItem('tasks');

    if(taskValue.value === ""){
        alert('Adicione uma tarefa')
    }else{

        if(_local_storage === null){
            var jsonTasks = '{"tasks" : ["' + taskValue.value + '"]}'
            var objeto = JSON.parse(jsonTasks); 
            var jsonTasks_local_storage = JSON.stringify(objeto)
            localStorage.setItem('tasks', jsonTasks_local_storage)
        } else{

            arrayTasks = JSON.parse(_local_storage);
            arrayTasks['tasks'].push(taskValue.value)//adicionar valor a um array
            jsonTasks_local_storage = JSON.stringify(arrayTasks);
            localStorage.setItem('tasks', jsonTasks_local_storage)
        
        }
        var ul = document.getElementById('task-list'); 
        var div = document.createElement('div')
        div.className = 'tasks'
        ul.appendChild(div)
        var span = document.createElement('span')
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'checktask'
        checkbox.id = 'checktask'
        span.appendChild(checkbox)
        span.appendChild(document.createTextNode(taskValue.value))
        div.appendChild(span);
        var button = document.createElement('button');
        button.innerText = "Excluir";
        button.className = "btnDel";
        button.setAttribute("id", taskValue.value)
        span.appendChild(button)
        button.onclick = function() {del(this)};
        taskValue.value = ""
}}

function del(elemento){
    if(window.confirm("Você deseja excluir a tarefa?")){

        _local_storage = localStorage.getItem('tasks')
        var objeto = JSON.parse(_local_storage);
        arrayTasks = objeto.tasks

        var resultado = arrayTasks.filter(valor => valor !== elemento.id) 

        objeto.tasks = resultado
        _local_storage = JSON.stringify(objeto)
        localStorage.setItem('tasks', _local_storage)

        elemento.parentElement.remove()
    }

}

