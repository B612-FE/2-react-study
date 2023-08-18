const input = document.querySelector('input');
const btn = document.querySelector('.add-text > button');

btn.addEventListener('click', addList);

function addList(e){
	const todoList = document.querySelector('.todo-list');
	const doneList = document.querySelector('.done-list');

	const newtext = document.createElement('li');

	const checkBtn = document.createElement('button');
    checkBtn.classList.add('check');
    checkBtn.innerText = 'Check';

	const xBtn = document.createElement('button');
    xBtn.classList.add("delete");
    xBtn.innerHTML = "Delete"

	if(input.value !==''){
		newtext.textContent = input.value;
		input.value = '';
		todoList.appendChild(newtext);
		newtext.appendChild(checkBtn);
		newtext.appendChild(xBtn);
	}
    else{
        alert("text is empty!");
    }

	checkBtn.addEventListener('click', function(){
		const parent = this.parentNode;
		parent.remove();
		doneList.appendChild(parent);
		checkBtn.style.display = 'none';
	});

	xBtn.addEventListener('click', function(){
		const parent = this.parentNode;
		parent.remove();
	});
}
