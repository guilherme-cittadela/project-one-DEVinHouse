
//variáveis globais
var btnAdd = document.getElementById('btnAdd'); //resgata o botão que adiciona as tarefas
var arrayTasks = new Array(); //cria array vazia
var _local_storage = localStorage.getItem('tasks'); //busca no localstorage os dados cadastrados 


//função que carrega os dados do local storage ao carregar a página
window.onload = function(){
    
    _local_storage = localStorage.getItem('tasks')
    arrayTasks = JSON.parse(_local_storage); 

    for(var i = 0; i < arrayTasks.tasks.length; i++ ){ //percorre o local storage e carrega os dados existentes
        createList(arrayTasks.tasks[i])
    }
}


//função para criar a lista de tarefas
function createList(element){
    var ul = document.getElementById('task-list'); 
        var div = document.createElement('div')
        div.className = 'tasks'
        ul.appendChild(div)
        var span = document.createElement('span')
        var checkbox = document.createElement('input')
        console.log(checkbox)
        checkbox.type = 'checkbox'
        checkbox.name = 'checktask'
        checkbox.onchange = function(eve) {check(eve, this)}
        span.appendChild(checkbox)
        span.appendChild(document.createTextNode(element))
        div.appendChild(span);
        var button = document.createElement('button');
        button.innerText = "Excluir";
        button.className = "btnDel";
        button.setAttribute("id", element)
        div.appendChild(button)
        button.onclick = function() {del(this)};
}



//adiciona o html para as tarefas digitadas
btnAdd.onclick = function(){  
    //resgatar o valor do input
    var taskValue = document.getElementById('addTask');
    _local_storage = localStorage.getItem('tasks');

    if(taskValue.value === ""){    //validação do input, verifica se algo foi digitado
        alert('Adicione uma tarefa')
    }else{

        if(_local_storage === null){
            var jsonTasks = '{"tasks" : ["' + taskValue.value + '"]}'
            var objeto = JSON.parse(jsonTasks); 
            var jsonTasks_local_storage = JSON.stringify(objeto)
            localStorage.setItem('tasks', jsonTasks_local_storage)
        } else{

            arrayTasks = JSON.parse(_local_storage);
            arrayTasks['tasks'].push(taskValue.value)  //adicionar valor a um array
            jsonTasks_local_storage = JSON.stringify(arrayTasks);
            localStorage.setItem('tasks', jsonTasks_local_storage)
        
        }
        //criação da estrutura html que exibe as tarefas
        createList(taskValue.value)
        taskValue.value = ''

}}



//função para verificar se a tarefa está 'checada', e caso esteja, risca o texto
function check(eve, element) {
    if(eve.currentTarget.checked){
        element.parentElement.style["text-decoration"] = 'line-through';
        
    }
    else{element.parentElement.style["text-decoration"] = 'none';}
}



//deleta determinado item do localstorage
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


