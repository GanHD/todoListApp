var todoList = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log('Your Todo List is Empty');
    } else {
      console.log('my Todos:');

      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].completed === false) {
          console.log('( )', this.todos[i].todoText);
        } else {
          console.log('(x)', this.todos[i].todoText);
        }
      }
    }
  },
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
    this.displayTodos();
  },
  changeTodos: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var totalCompleted = 0;
    //gets the amount of var completed
    this.todos.forEach(function(todo){
      if(todo.completed === true){
        totalCompleted++;
      }
    })
    this.todos.forEach(function(todo){
      if(totalCompleted === totalTodos){
        todo.completed = false;
      }else{
        todo.completed = true;
      }
    })
  },
};

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodos: function() {
    var addTodoTextInput = document.getElementById('addTodoText');
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodos: function() {
    var changeTodoNumber = document.getElementById('changeTodoNumber');
    var changeTodoText = document.getElementById('changeTodoText');
    todoList.changeTodos(changeTodoNumber.valueAsNumber, changeTodoText.value);
    changeTodoNumber.valueAsNumber = '';
    changeTodoText.value = '';
    view.displayTodos();
  },
  deleteTodos: function(input) {
      todoList.deleteTodos(input);
      view.displayTodos();
  },
  toggleTodos: function() {
    var toggleTodoNumber = document.getElementById('toggleTodoNumber');
    todoList.toggleCompleted(toggleTodoNumber.valueAsNumber);
    toggleTodoNumber.valueAsNumber = '';
    view.displayTodos();
  },
};

var view = {
  displayTodos: function() {
    var todoOl = document.querySelector('ul');
    todoOl.innerHTML = '';

    if (todoList.todos.length != 0) {
      todoList.todos.forEach(function(todo, position){
        var todoLi = document.createElement('li');
        todoLi.className = 'todoText';
        todoLi.id = position;
        var todoP = document.createElement('p');
        todoP.className = 'todoP';
        var todoTextWithCompleted = '';

        if (todo.completed === true) {
          todoTextWithCompleted = '(x) ' + todo.todoText;
        } else {
          todoTextWithCompleted = '( ) ' + todo.todoText;
        }
        todoP.textContent = todoTextWithCompleted;
        todoOl.appendChild(todoLi);
          todoLi.appendChild(todoP);
          todoLi.appendChild(this.createDeleteButton(position));
      }, this)
    } else {
      var emptyListText = document.createElement('p');
      emptyListText.textContent = "It's Empty!";
      todoOl.appendChild(emptyListText);
    }
  },
  createDeleteButton: function(id) {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';
    return deleteButton;
  },
  setupEventListeners: function(){
    let todosUl = document.getElementById('todoListUl');

    todosUl.addEventListener('click', function(event){
      let deleteTarget = event.target;
      if (deleteTarget.className === 'deleteButton'){
        handlers.deleteTodos(parseInt(deleteTarget.parentNode.id));
          }
      })
    },
};
view.setupEventListeners();