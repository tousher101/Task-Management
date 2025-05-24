
let board= JSON.parse(localStorage.getItem('kaj')) ||  [{
    name: 'My Board',
    tasks:[{
        id: '1',
        title: 'Book Flight',
        status: 'todo'
    },
    {
        id:'2',
        title: 'Bug Fix',
        status: 'progress'
    },
    {
        id: '3',
        title: 'Review Code',
        status: 'done'
    }]
}]

const inputData = document.querySelector('.filterElm');


  function downloadFilteredCSV() {
    const targetDate = inputData.value;
    if (!targetDate) {
      alert('Please select a date!');
      return;
    }

    const board = JSON.parse(localStorage.getItem('kaj')) || [];
    const filtered = board.filter(item => item.name === targetDate);

    if (filtered.length === 0) {
      alert('No data found for this date!');
      return;
    }

    const headers = Object.keys(filtered[0]).join(',');
    const rows = filtered.map(obj => Object.values(obj).join(','));
    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sell-data-${targetDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }








/* This One Direct Download or Selected Data Download System Not Filterd
const data = [
  { date: '2025-05-05', product: 'Shampoo', quantity: 2, price: 120 },
  { date: '2025-05-05', product: 'Soap', quantity: 5, price: 200 },
  { date: '2025-05-05', product: 'Toothpaste', quantity: 3, price: 150 }
];

// Function to convert JSON to CSV and trigger download
function downloadCSV(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(','));
  const csvContent = [headers, ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'sell-report.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Call this function on button click or any event
downloadCSV(data);*/




    /* this jsn Method Download system
    const rowData  = localStorage.getItem('kaj');
    if(!rowData){return alert('No Data Available')}
    const filted=  board.filter(b=> b.name === inputData.value);
    if (filted.length === 0) return alert('No Data Available This Name')
        const blob = new Blob([JSON.stringify(filted, null, 2)], {type: 'application/json'})

    const url= URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Task Board-${inputData}.json`;
    link.click();
    URL.revokeObjectURL(url);*/



document.querySelector('.download-btn').addEventListener('click', ()=>{
    downloadFilteredCSV();
    inputData.value = '';
})

function filterBoard(board){
  const filted=  board.filter(b=> b.name === inputData.value)
  return filted
}
document.querySelector('.filter-btn').addEventListener('click', ()=>{
  const filtered =   filterBoard(board);
   if(filtered.length>0){
    renderBoard(board.indexOf(filtered[0]))
   } else alert('Board Not found')

   inputData.value = '';
    
})


function boardDisplay(){
    
document.querySelector('.add-board').addEventListener('click',()=>{

document.querySelector('.Add-board-modal').style.display='flex';

document.querySelector('.submit-new-board').addEventListener('click',()=>{
    const addNew =  document.querySelector('.input-board-name');
const addNewBoard = addNew.value.trim();
    if(addNewBoard === "") {return;}
    board.push({
        name: addNewBoard,
        tasks: [],
        
    });
    saveStoarge();
    renderBoard(board.length-1);
    showSideBar();

board.forEach((bro, index)=>{renderBoard(index); })


document.querySelector('.Add-board-modal').style.display='none'
const removeName =  document.querySelector('.input-board-name');
removeName.value = '';


});

document.querySelector('.cancel-new-board').addEventListener('click',()=>{
    document.querySelector('.Add-board-modal').style.display='none'
        });

});

}


function renderBoard(index){
    if (index === null || !board[index]) return;
    const bro = board[index];

    localStorage.setItem('currentBoard',index);
    
 const newBoardHTML=
   
    `   
    <div class="colum" >
    <div class="elm-wrapper">
            <span class="col-headre"> TO-DO</span>
            <div class="js-todo-task js-drag-task add-new-todo-${index}"></div>
    </div>
                
                    
                  
                <button class="new-board-btn add-new-task-${index}"> Add Task+ </button>
        </div>
            

        <div class="colum">
        <div class="elm-wrapper">
            <span class="col-headre"> In Progress</span>
            <div class="js-progress-task js-drag-task add-new-progress-${index}"></div>
        </div>
                
                   
                    <button class="new-board-btn add-new-task-${index}"> Add Task+ </button>
        </div>
            
             

        <div class="colum">
        <div class="elm-wrapper">
            <span class="col-headre"> Done </span>
            <div class="js-done-task js-drag-task add-new-done-${index}"></div>

        </div>
                
                  
            <button class="new-board-btn add-new-task-${index}"> Add Task+ </button>  
        </div>
           
    
    `
document.querySelector('.main-section').innerHTML = newBoardHTML;
document.querySelector('.board-name').innerHTML = ` ${bro.name}`


saveStoarge();
addTask(index);
displayTask(index);

}



function displayTask(index){
    const todoTask = document.querySelector(`.add-new-todo-${index}`);
 const progressTask = document.querySelector(`.add-new-progress-${index}`);
const doneTask = document.querySelector(`.add-new-done-${index}`);
    todoTask.innerHTML = '';
    progressTask.innerHTML = '';
    doneTask.innerHTML = '';
    if(!todoTask || !progressTask || !doneTask){
        console.warn(`some task container not found for board index ${index}`); return;
    }

    board[index].tasks.forEach((task)=>{
        const taksID = Number(task.id);
        const divelm = document.createElement('div');
        divelm.classList.add('name-task');
        divelm.setAttribute('draggable', true);
        divelm.setAttribute('data-id', taksID)

   
        divelm.innerHTML = 
        `
          ${task.title}
                    <button class="delete-btn dlt-btn-${taksID}${index}"><img class=" delete-img" src="assets/trash.svg"></button>
                    <button class="edit-btn edt-btn-${taksID}${index}" > <img class=" delete-img" src="assets/pencil.svg"></button>
        
        `
        if(task.status === 'todo'){todoTask.appendChild(divelm)}
            else if (task.status === 'progress'){progressTask.appendChild(divelm)}
                else if (task.status === 'done'){doneTask.appendChild(divelm)}
            
                document.querySelector(`.dlt-btn-${taksID}${index}`).addEventListener(('click'),()=>{
                    deleteTask(taksID,index);
                    displayTask(index);
                    saveStoarge();

                    });
                    document.querySelector(`.edt-btn-${taksID}${index}`).addEventListener(('click'),()=>{
                       editTask(taksID, index);
                         displayTask(index);
                         saveStoarge();
                          });


});
}







function addTask(index){

    document.querySelectorAll(`.add-new-task-${index}`).forEach((addbtn)=>{
        addbtn.addEventListener('click',()=>{
      document.querySelector('.modal-task-add').style.display='flex' });
    
      
    
        });
    
    
        document.querySelector('.js-modal-cancel').addEventListener('click',()=>{
            document.querySelector('.modal-task-add').style.display = 'none';
        });
    

    document.querySelector('.btn-modal').addEventListener('click',()=>{
    
        const newTile = document.querySelector('.modal-input-newtask');
        let orginalTitle = newTile.value;
        const newStatus = document.querySelector('.task-status-modal');
        let orginalStatus = newStatus.value;
        if (orginalTitle.trim()=== ''){return}
        const newTask = {
            id: Date.now(),
            title: orginalTitle,
            status: orginalStatus
        }
        board[index].tasks.push(newTask);
    
   
    saveStoarge();
    displayTask(index);
    
    
    const clearModalText = document.querySelector('.modal-input-newtask');
    clearModalText.value = '';
    
    const clearModalOption = document.querySelector('.task-status-modal');
    clearModalOption.value= 'todo';
    document.querySelector('.modal-task-add').style.display = 'none';
    
    });

    
    }

   function deleteTask(taksID,index){
    
        board[index].tasks = board[index].tasks.filter((main)=>
            main.id !== taksID)
    }
    
 function editTask(taksID, index){
        const newTask = prompt('Enter New Task:');
        if(!newTask) return
      const edit = board[index].tasks.find((task)=>
            task.id === taksID
        );
        if (!edit){console.error('Task not found with id', taksID); return}
        edit.title  = newTask;
        
    }

document.querySelector('.user-logo').addEventListener('click',()=>{
    const sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('show');
});


function saveStoarge(){
    localStorage.setItem('kaj',JSON.stringify(board))
}




function showSideBar(){
    
    const sideElm = document.querySelector('.Board-list');
    sideElm.innerHTML = '';
    const latestBoard = board.slice(-3);
    latestBoard.forEach((b,idx)=>{
        if(idx>=3){idx -1; return}
        const btnEml = document.createElement('button');
        btnEml.classList.add('list-board');
        btnEml.innerHTML = b.name;
        btnEml.addEventListener('click',()=>{
        renderBoard(board.length - 3 + idx);
        });
        sideElm.appendChild(btnEml);
       
        
    }) 
}
showSideBar();




let currentDeletedBoard = null;
let currentDeletedIndex = null;
function deleteBoard(){
    const currentIndex = JSON.parse( localStorage.getItem('currentBoard'));
    const newIndex = currentIndex>0 ?currentIndex-1 : 0;
    currentDeletedBoard = board[currentIndex];
    currentDeletedIndex = currentIndex
    
    if(currentIndex === null || !board[currentIndex]) return;
    board.splice(currentIndex, 1)
    if(board.length === 0){
        localStorage.removeItem('currentBoard'); document.querySelector('.board-name').innerHTML = ''; 
        document.querySelector('.main-section').innerHTML = `<p>No More Board Available</p>`
    } else{newIndex;
     localStorage.setItem('currentBoard', JSON.stringify( newIndex)); 
     renderBoard(newIndex)}
    saveStoarge();
    showSideBar();
    
}

document.querySelector('.Delete-Board').addEventListener('click',()=>{
    document.querySelector('.delete-confim-modal').style.display = 'flex';
    document.querySelector('.yes-confirm').addEventListener('click',()=>{
        deleteBoard();
        document.querySelector('.delete-confim-modal').style.display = 'none';
        document.querySelector('.undo-btn').style.display = 'block';
    });
    document.querySelector('.no-confirm').addEventListener('click',()=>{
        document.querySelector('.delete-confim-modal').style.display = 'none';
    })

});


function undoBoard(){
    if(currentDeletedBoard !== null && currentDeletedIndex !== null) {
    board.splice(currentDeletedIndex, 0 , currentDeletedBoard);
    localStorage.setItem('currentBoard', JSON.stringify(currentDeletedIndex));
    renderBoard(currentDeletedIndex);
    saveStoarge();
    showSideBar();

    currentDeletedBoard=null;
    currentDeletedIndex=null;
    document.querySelector('.undo-btn').style.display='none'
    }
}


document.querySelector('.undo-btn').addEventListener('click',()=>{
    undoBoard();
    
});
/*
function dragingTask(){
    const tasks = document.querySelectorAll('.name-task');
    const colums = document.querySelectorAll('.elm-wrapper');
    tasks.forEach((task)=>{
        task.addEventListener('dragstart',(e)=>{
            e.dataTransfer.setData('text/plain',e.target.id);
            e.target.classList.add('dragging');
        });
        task.addEventListener('dragend',(e)=>{
            e.target.classList.remove('dragging');
        });
    });
    
    colums.forEach((col)=>{
    col.addEventListener('dragover',(e)=>{
    e.preventDefault();
    
});
    col.addEventListener('drop',(e)=>{
        e.preventDefault();
    const task= document.querySelector('.dragging');
    col.appendChild(task);
   


        });
   
    });

    
    }

*/
window.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('kaj');
  board = saved ?JSON.parse(saved) :[];
  const currentIndex =JSON.parse( localStorage.getItem('currentBoard'))
  renderBoard(currentIndex);
  showSideBar();
  boardDisplay();

 
 
})

/*      // Title Text
  const titleText = document.createElement('span');
  titleText.textContent = task.title;

  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add(`delete-btn${taksID}`);
  deleteBtn.innerHTML = `<img class="delete-img" src="assets/trash.svg">`;

  // Edit Button
  const editBtn = document.createElement('button');
  editBtn.classList.add(`edit-btn${taksID}`);
  editBtn.innerHTML = `<img class="delete-img" src="assets/pencil.svg">`;

  // Append buttons to div
  divelm.appendChild(titleText);
  divelm.appendChild(deleteBtn);
  divelm.appendChild(editBtn);
  */