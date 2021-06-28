const taskContainer=document.querySelector(".task__container");
let globalStore=[];
const newCard=(taskData)=> `<div class="col-md-6 col-lg-4" id=${taskData.id}>
            <div class="card rounded-3 border-dark ">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"id=${taskData.id} onclick="editCard.apply(this,arguments)"><i id=${taskData.id} onclick="editCard.apply(this,arguments)" class="fas fa-user-edit"></i></button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i id=${taskData.id} onclick="deleteCard.apply(this,arguments)" class="fas fa-dumpster"></i></button>
  </div>
  <img src=${taskData.imageUrl} class="card-img-top" alt="car">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <span class="badge bg-primary">${taskData.taskType}</span>
  </div>
  <div class="card-footer text-muted ">
    <button type="button" id=${taskData.id}  onclick="opent(${taskData.id})" class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#example">Open Task </button>
  </div>
</div>
 </div>`;


const loadData = () =>{
  const intialData=localStorage.getItem("tasky");
  if(!intialData) return;

  const {cards} = JSON.parse(intialData);
   cards.map((card) =>{const createNewCard =newCard(card);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globalStore.push(card);

});
  
};

const SaveChanges = () => {
    const taskData ={
       id:`${Date.now()}`,
       imageUrl: document.getElementById("imageurl").value,
       taskTitle:document.getElementById("tasktitle").value,
       taskType:document.getElementById("tasktype").value,
       taskDescription:document.getElementById("taskdescription").value, 


    };
    const createNewCard =newCard(taskData);
        taskContainer.insertAdjacentHTML("beforeend",createNewCard);
        globalStore.push(taskData);
        localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) =>{
 // event=window.event;
  const targetID=event.target.id;
 const tagname=event.target.tagName;
 

globalStore=globalStore.filter((taskData)=>taskData.id!==targetID);
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
 
if (tagname==="BUTTON"){
  return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
};

return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

 };


const editCard=(event)=>{
  event=window.event;
  const targetID=event.target.id;
  const tagname=event.target.tagName;
   
  let parentElement;

 if(tagname==="BUTTON"){
   parentElement=event.target.parentNode.parentNode;
 } else{
  parentElement=event.target.parentNode.parentNode.parentNode;}

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskType = parentElement.childNodes[5].childNodes[3];
  let taskDescription = parentElement.childNodes[5].childNodes[5];
  let submit=parentElement.childNodes[7].childNodes[1];
  
  
  taskTitle.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  submit.setAttribute("onclick","saveEditchanges.apply(this,arguments)");
  submit.innerHTML="Save Changes";
 

};

const saveEditchanges = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  let parentElement;

  if (tagname === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle = parentElement.childNodes[5].childNodes[1];
  let taskDescription = parentElement.childNodes[5].childNodes[3];
  let taskType = parentElement.childNodes[5].childNodes[5];
  let submit = parentElement.childNodes[7].childNodes[1];

  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };

  globalStore = globalStore.map((task) => {
    if (task.id === targetID) {
      return {
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task;
  });
  
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
  taskTitle.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  submit.removeAttribute("onclick");
  submit.innerHTML="Open Task";
  
};

function opent(x) {
 
  let a = localStorage.getItem("tasky");
  let t = JSON.parse(a);
  let Task1 = t.cards.map(Task1 => Task1.id);
  let index = Task1.findIndex(id => id == x);
  
  
  document.getElementsByClassName("c1")[0].setAttribute("src",t.cards[index].imageUrl);
  document.getElementsByClassName("c2")[0].innerHTML=t.cards[index].taskTitle;
  document.getElementsByClassName("c3")[0].innerHTML=t.cards[index].taskDescription;
  document.getElementsByClassName("c4")[0].innerHTML=t.cards[index].taskType;

};