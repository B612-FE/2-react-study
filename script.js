const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

//로컬 스토리지에 저장된 객체 불러서 변수에 저장
let storedTodo = JSON.parse(localStorage.getItem("Todo")) || []; //배열 안에 객체로 저장 됨. ||[] 생략 시 localstorage가 빈 상태에서 handleClick을 실행하면 push에 대한 에러 발생
//toggleTodo 구현
const toggleTodo = (event) => {
  const li = event.target.parentElement;

  storedTodo = storedTodo.map((todo) =>
    todo.id === li.id ? { ...todo, done: !li.done } : todo
  );
  if (li.done) {
    li.done = !li.done;
    doneList.removeChild(li);
    todoList.appendChild(li);
  } else {
    li.done = !li.done;
    todoList.removeChild(li);
    doneList.appendChild(li);
  }
  localStorage.setItem("Todo", JSON.stringify(storedTodo));
};

//removeTodo 구현
const removeTodo = (event) => {
  const li = event.target.parentElement;
  storedTodo = storedTodo.filter((ele) => ele.id !== li.id);
  localStorage.setItem("Todo", JSON.stringify(storedTodo));
  if (li.done) {
    doneList.removeChild(li);
  } else {
    todoList.removeChild(li);
  }
};

//DOM에 리스트 추가하는 코드 -> done의 값을 체크해서 0이면 todo에 1이면 done에 추가
const appendList = (_todo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  li.id = _todo.id;
  li.done = _todo.done;
  span.innerText = _todo.task;
  button.innerText = "삭제";
  button.addEventListener("click", removeTodo);
  span.addEventListener("click", toggleTodo);
  li.appendChild(span);
  li.appendChild(button);
  if (_todo.done) {
    doneList.appendChild(li);
  } else {
    todoList.appendChild(li);
  }
};

//화면에 로컬 스토리지에 저장되어 있던 todo 뿌리기
const renderTodo = (_storedTodo) => {
  _storedTodo.forEach((_todo) => {
    appendList(_todo);
  });
};
if (storedTodo) renderTodo(storedTodo);

//추가 버튼 클릭하는 경우 실행 (사용자가 입력한 값을 받아와 local에 저장하고, 화면에 렌더링)
const handleClick = (event) => {
  event.preventDefault();
  if (!todoInput.value) {
    todoInput.focus(); //사용자가 입력하지 않은 경우 입력창 포커싱
  } else {
    const newTodo = { id: new Date(), task: todoInput.value, done: false };
    storedTodo.push(newTodo);
    localStorage.setItem("Todo", JSON.stringify(storedTodo));
    appendList(newTodo);
    todoInput.value = "";
  }
};
todoButton.addEventListener("click", handleClick);
