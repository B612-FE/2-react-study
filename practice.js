//todo에 추가된 item을 클릭하면 done으로, done에 추가된 항목을 다시 클릭하면 todo로 이동할 수 있는 토글 기능

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("#inputField"),
  toDoList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos";
const DONES_LS = "dones";

let toDos = [];
let dones = [];

function handleClick(event) {}

function deleteToDos(event) {
  //event.target - > 버튼이 클릭되었는지 알 수 있지만 어떤 li인지 모름
  //버튼을 li안에 넣어줬었음.
  // 걔의 부모를 찾아야함 -> event.target.parentNode
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li); //html 삭제
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  //filter : array의 모든 아이템을 통해 함수를 실행하고 true인것들만 뽑아서 새로운 array 반환
  //li에 없는 id인 toDos를 체크
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li"); //createElement로 element 추가
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1; // li에도 id를 만들어주기 위해 상수 생성
  delBtn.innerText = "🧹";
  delBtn.addEventListener("click", deleteToDos);
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
  li.addEventListener("click", handle);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadDones() {
  const loadedDones = localStorage.getItem(DONES_LS);
  if (dones !== null) {
    const parsedDones = JSON.parse(loadDones);
    parsedDones.forEach(function (done) {
      paintDone(done.text);
    });
  }
}

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS); //저장된 TODO를 가져와서
  if (toDos !== null) {
    //빈 배열이 아니라면 화면에 표시
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  loadDones();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
