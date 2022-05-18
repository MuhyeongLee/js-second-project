// 1. 유저가 값을 입력한다.
// 2. +버튼을 클릭하면, 할일이 추가된다.
// 3. delete버튼을 누르면 할일이 삭제된다.
// 4. check버튼을 누르면 할일이 끝나면서 줄이생긴다.
// 5. 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 6. 끝난탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 보인다.
// 7/ 전체탭을 누르면 전체 아이템이 보임.


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener("click", addTask);

for(let i = 1; i < tabs.length; i++) {
	tabs[i].addEventListener("click", function(event) {filter(event)})
}

tabs.forEach(menu => menu.addEventListener('click', (e) => tabsIndicator(e)));

function tabsIndicator(e) {
	underLine.style.left = e.currentTarget.offsetLeft + "px";
	underLine.style.width = e.currentTarget.offsetWidth + "px";
	underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

function addTask() {
	let task = {
		id: randomIdGenerate(),
		taskContent : taskInput.value,
		isComplete: false
	}
	taskList.push(task)
	console.log(taskList);
	render();
}

function render() {
	let list = [];
	if(mode === 'all') {
		list = taskList;
	} else if(mode === 'ongoing' || mode === "done") {
		list = filterList;
	} 

	let resultHTML = '';
	for(let i = 0; i < list.length; i++) {
		if(list[i].isComplete === true) {
			resultHTML += 
			`<div class="task">
				<div class="task-done">${list[i].taskContent}</div>
				<div>
					<button onclick="toggleComplete('${list[i].id}')">check</button>
					<button onclick="deleteTask('${list[i].id}')">delete</button>
				</div>
			</div>`	
		} else {
			resultHTML += 
			`<div class="task">
				<div>${list[i].taskContent}</div>
				<div>
					<button onclick="toggleComplete('${list[i].id}')">check</button>
					<button onclick="deleteTask('${list[i].id}')">delete</button>
				</div>
			</div>`
		}	
	}

	document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
	for(let i = 0; i < taskList.length; i ++) {
		if(taskList[i].id === id) {
			taskList[i].isComplete = !taskList[i].isComplete;
			break;
		}
	}
	console.log(taskList);
	render();
}

function deleteTask(id) {
	for(let i = 0; i < taskList.length; i ++) {
		if(taskList[i].id === id) {
			taskList.splice(i,1)
			break;
		}
	}
	console.log(taskList)
	render();
}

function filter(event) {
	mode = event.target.id;
	filterList = [];
	if(mode === 'all') {
		render()
	} else if(mode === 'ongoing') {
			for(let i = 0; i < taskList.length; i++) {
				if(taskList[i].isComplete === false) {
					filterList.push(taskList[i])
				}
			}
			render();
	} else if(mode === 'done') {
		for(let i = 0; i < taskList.length; i++) {
			if(taskList[i].isComplete === true) {
				filterList.push(taskList[i])
			}
		}
		render();
	}
}

function randomIdGenerate() {
	return ('_' + Math.random().toString(36).substr(2, 9));
}

