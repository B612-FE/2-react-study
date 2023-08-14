const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const listDone = document.getElementById("list-done");

function addTask(){
    if(inputBox.value ===''){
        alert("Write something!!");
    }
    else{
        let li =document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        let li =document.createElement("li");
        li.innerHTML = e.target.innerHTML;
        listDone.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
        e.target.remove();
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

listDone.addEventListener("click",function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();}
    else if(e.target.tagName === "LI"){
            let li =document.createElement("li");
            li.innerHTML = e.target.innerHTML;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML="\u00d7";
            li.appendChild(span);
            e.target.remove();
            saveData();
        }
},false);

function saveData(){
    localStorage.setItem("listContainerData",listContainer.innerHTML);
    localStorage.setItem("listDoneData",listDone.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("listContainerData");
    listDone.innerHTML = localStorage.getItem("listDoneData");
}


showTask();
