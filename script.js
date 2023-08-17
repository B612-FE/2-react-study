const todoList = document.querySelector(".todo_list");

function handleSubmit(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodoItem();
  }
}

function addTodoItem() {
  const input = document.querySelector(".todo_input");
  const value = input.value;

  if (value) {
    input.value = "";
    listUpTodoItem(value);
    saveTodoList();
  } else {
    alert("내용을 입력해 주세요");
  }
}

function listUpTodoItem(value) {
  const listItem = document.createElement("li");
  const todoButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  todoButton.style.backgroundImage = 'url("./img/1.png")';
  todoButton.addEventListener("click", toggleDone);
  listItem.appendChild(todoButton);

  const textSpan = document.createElement("span");
  textSpan.innerText = value;
  listItem.appendChild(textSpan);

  deleteButton.innerText = "x";
  deleteButton.classList.add("delete_button");
  deleteButton.addEventListener("click", removeTodoItem);
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);
}

function toggleDone(event) {
  const button = event.target;
  const item = button.parentElement;
  const textSpan = item.querySelector("span");
  const doneList = document.querySelector(".todo_done");

  if (item.parentElement.classList.contains("todo_list")) {
    button.style.backgroundImage = "url('./img/2.png')";
    todoList.appendChild(item);
    textSpan.classList.add("done");
    doneList.appendChild(item);
  } else {
    button.style.backgroundImage = "url('./img/1.png')";
    todoList.appendChild(item);
    textSpan.classList.remove("done");
  }
  saveTodoList();
}

function removeTodoItem(event) {
  const item = event.target.parentElement;
  item.remove();
  saveTodoList();
}

function saveTodoList() {
  const todoItems = todoList.querySelectorAll("li");
  const doneItems = document.querySelector(".todo_done").querySelectorAll("li");
  const todos = [];

  todoItems.forEach((item) => {
    todos.push({
      text: item.querySelector("span").innerText,
      done: false,
    });
  });

  doneItems.forEach((item) => {
    todos.push({
      text: item.querySelector("span").innerText,
      done: true,
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodoList() {
  const loadedTodos = localStorage.getItem("todos");
  if (loadedTodos !== null) {
    const todos = JSON.parse(loadedTodos);
    todos.forEach((todo) => {
      listUpTodoItem(todo.text);
      if (todo.done) {
        const lastItem = todoList.querySelector("li:last-child");
        const button = lastItem.querySelector("button");
        button.click();
      }
    });
  }
}

loadTodoList();
