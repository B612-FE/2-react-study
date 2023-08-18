const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = document.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const doneList = document.querySelector(".js-doneList");
const btn = document.querySelector("button");

const TODO_CN = "todo";
const TODO_LS = "toDos";
const DONE_LS = "dones";
let toDos = [];
let dones = [];

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}
function saveDones() {
  localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function doneTo(event) {
  const span = event.target;
  const li = span.parentNode;
  doneList.removeChild(li); //html에서 todo지우고
  const newDone = dones.filter(function (done) {
    return done.id !== parseInt(li.id); //js상 todo 배열 갱신하고
  });
  dones = newDone;
  saveDones(); //local storage에도 갱신한 todo새로 저장하고
  paintToDo(span.innerText); //html에서 done 보이게하고
  const tmpToDo = { text: span.innerText, id: dones.length + 1 };
  saveToDos(); //local storage에 갱신한 done 새로 저장
}

function toDone(event) {
  const span = event.target;
  const li = span.parentNode;
  toDoList.removeChild(li); //html에서 todo지우고
  const newToDo = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id); //js상 todo 배열 갱신하고
  });
  toDos = newToDo;
  saveToDos(); //local storage에도 갱신한 todo새로 저장하고
  paintDone(span.innerText); //html에서 done 보이게하고
  const tmpDone = { text: span.innerText, id: dones.length + 1 };
  saveDones(); //local storage에 갱신한 done 새로 저장
}

function handleDelete(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const hasToDo = ul.classList.contains(TODO_CN);
  if (hasToDo) {
    toDoList.removeChild(li); //html 삭제
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
  } else {
    doneList.removeChild(li);
    const cleanDones = dones.filter(function (done) {
      return done.id !== parseInt(li.id);
    });
    dones = cleanDones;
  }
    saveToDos();
    saveDones();
}

function paintToDo(text) {
  const li = document.createElement("li"); //li element 추가
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  span.addEventListener("click", toDone);
  const newId = toDos.length + 1; // li에 id를 만들어주기 위해 상수 생성
  delBtn.innerText = "🧹";
  delBtn.addEventListener("click", handleDelete);
  span.innerText = text; //입력한 값으로 innerText 변경하고
  li.appendChild(span); //appendChild : 넘겨주는 값을 father element 안에 넣는것
  li.appendChild(delBtn); // li의 자식으로 span, 삭제버튼 추가 - span을 li안에, 버튼을 li안에
  li.id = newId;
  toDoList.appendChild(li); //마지막으로 li를 ul에 추가!~
  const toDoObj = {
    text: text,
    id: newId, //array 목록이 비어있을때 length가 1
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintDone(text) {
  const li = document.createElement("li"); //createElement로 element 추가
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  span.addEventListener("click", doneTo);
  const newId = dones.length + 1; // li에도 id를 만들어주기 위해 상수 생성
  delBtn.innerText = "🧹";
  delBtn.addEventListener("click", handleDelete);
  span.innerText = text; //입력한 값으로 innerText 변경하고
  li.appendChild(span); //appendChild : 넘겨주는 값을 father element 안에 넣는것
  li.appendChild(delBtn); // li의 자식으로 span, 삭제버튼 추가 - span을 li안에, 버튼을 li안에
  li.id = newId;
  doneList.appendChild(li); //마지막으로 li를 ul에 추가!~
  const doneObj = {
    text: text,
    id: newId, //array 목록이 비어있을때 length가 1
  };
  dones.push(doneObj);
  saveDones();
}

function addToDo(event) {
  //button click시 조작
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue == "") {
    alert("Enter at least one word!!");
  } else {
    paintToDo(currentValue);
  }
  toDoInput.value = "";
}

function handleSubmit(event) {
  // enter시 조작
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (currentValue == "") {
    alert("Enter at least one word!!");
  } else {
    paintToDo(currentValue);
  }
  toDoInput.value = "";
}

function loadStorage() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  const loadedDones = localStorage.getItem(DONE_LS);
  if (loadedDones !== null) {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach(function (done) {
      paintDone(done.text);
    });
  }
}

function init() {
  loadStorage();
  toDoForm.addEventListener("submit", handleSubmit);
  btn.addEventListener("click", addToDo);
}
init();
