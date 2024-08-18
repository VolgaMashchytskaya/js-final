localStorage.clear();

let tasksArray = [];
let doneArray = [];
let imgArray = ['l(img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/7.jpg', 'img/10.jpg', 'img/11/jpg', 'img/12.jpg', 'img/14.jpg', 'img/15.jpg', 'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png']
let text = document.querySelector('.text');
let tasks = document.querySelector('.tasks');
let ntm = document.querySelector('.no-tasks-message');
let del = document.querySelector('.button-delete');
let countAll = document.querySelector('.tasks-all');
let countCompleted = document.querySelector('.tasks-completed-count');




function mousedawn() {
  let block = document.getElementById('switch')
  block.classList.add('button-down')
  let ind = Math.floor(Math.random() * imgArray.length)
  console.log(ind)
  let body = document.getElementsByTagName('body')[0];
  console.log(imgArray[13])
  body.style.backgroundImage = 'url' + '(' + imgArray[ind] + ')'

}

function mouseup() {
  let block = document.getElementById('switch')
  block.classList.remove('button-down')
}


window.onload = currentTasksUpload



function msg(el) {
  let mess = document.createElement('div');
  mess.innerHTML = "Помечайте выполненные задачи двойным кликом";
  mess.classList.add('js-mess');
  document.body.appendChild(mess);
}

function hideMsg() {
  let mess = document.querySelector('.js-mess');
  mess.remove();
}


function currentTasksUpload() {
  if (localStorage.getItem('tasks') !== null) {
    let t = localStorage.getItem('tasks')
    t = JSON.parse(t)
    tasksArray = t
  }

  if (localStorage.getItem('done-tasks') !== null) {
    let d = localStorage.getItem('done-tasks')
    d = JSON.parse(d)
    doneArray = d
  }

  if (tasksArray.length != 0) {
    creationTasksList()
  }
}


function contains(arr, el) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === el) {
      return true;
    }
  }
  return false;
}


function creationTasksList() {
  tasks.innerHTML = ''
  tasksArray.length == 0 ? ntm.className = 'no-tasks-message' : ntm.className = 'exist-tasks-message';

  for (let x in tasksArray) {
    if (contains(doneArray, tasksArray[x])) {
      tasks.innerHTML += `<li class="task">
     <span class="сompleted-task-name">${tasksArray[x]}</span>
     <button class="button-delete">DELETE</button>
     </li>`
    }
    else {
      tasks.innerHTML += `<li class="task">
           <span class="task-name" onmouseover = 'msg(this)' onmouseout = 'hideMsg()'>${tasksArray[x]}</span>
           <button class="button-delete">DELETE</button>
          </li>`
    }
  }
  numberOfTasks(tasksArray)
  completedTasks(doneArray)
  updateTask()
  delTask()
}



function addTask() {
  let taskName = document.querySelector('.inp').value
  tasksArray.push(taskName)
  localStorage.setItem('tasks', JSON.stringify(tasksArray))

  creationTasksList()

  document.querySelector('.inp').value = ''
}



function delTask() {

  let allTasks = document.querySelectorAll('.task')

  for (let i of allTasks) {

    i.children[1].onclick = function () {
      let taskname = i.children[0].innerHTML
      let newarray1 = tasksArray.slice(0, tasksArray.indexOf(taskname))
      let newarray2 = tasksArray.slice(tasksArray.indexOf(taskname) + 1)
      let newarray = newarray1.concat(newarray2)
      tasksArray = newarray
      console.log('ПОСЛЕ ' + tasksArray)
      if (doneArray.length > 0 && doneArray.includes(taskname)) {

        let newdonearray1 = doneArray.slice(0, doneArray.indexOf(taskname))
        let newdonearray2 = doneArray.slice(doneArray.indexOf(taskname) + 1)
        let newdonearray = newdonearray1.concat(newdonearray2)
        doneArray = newdonearray

      }

      localStorage.setItem('tasks', JSON.stringify(tasksArray))
      localStorage.setItem('done-tasks', JSON.stringify(doneArray))
      creationTasksList()
    }

  }

}




function updateTask() {
  let allTasksName = document.querySelectorAll('.task-name')
  for (let i = 0; i < allTasksName.length; i++) {
    allTasksName[i].ondblclick = function () {
      let name = allTasksName[i].innerHTML
      doneArray.push(name)

      localStorage.setItem('tasks', JSON.stringify(tasksArray))
      localStorage.setItem('done-tasks', JSON.stringify(doneArray))

      creationTasksList()

    }

  }
}



function numberOfTasks(array) {
  if (array === null) {
    countAll.innerHTML = '0'
  }
  else {
    countAll.innerHTML = array.length
  }
}

function completedTasks(array) {
  if (array === null) {
    countCompleted.innerHTML = '0'
  }
  else {

    countCompleted.innerHTML = doneArray.length
  }

}



