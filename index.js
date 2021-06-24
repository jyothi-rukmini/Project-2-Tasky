const taskContainer = document.querySelector(".task_container")
console.log(taskContainer);

//global store
const globalStore = [];



const newCard = ({id,imageurl,tasktitle,tasktype,taskdescription}) => 
        ` 
        <div class="col-md-6 col-lg-4 " id=${id}>
            <div class="card">
              <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">
                <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                <i class="fas fa-trash-alt"></i>
                </button>
              </div>
              <img src="${imageurl}" 
              class="card-img-top rounded-end"
               alt="..."/>
              <div class="card-body">
                <h5 class="card-title">${tasktitle}</h5>
                <p class="card-text">${tasktype}</p>
                <span class="badge bg-primary">${taskdescription}</span>
              </div>
              <div class="card-footer text-muted">
                <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
              </div>
            </div>
          </div>`;


          const loadInitialTaskCards = () => {
            // access localstorage
            const getInitialData = localStorage.getItem("tasky"); // null
            if (!getInitialData) return;
          
            // convert stringified-object to object
            const { cards } = JSON.parse(getInitialData);
          
            // map around the array to generate HTML card and inject it to DOM
            cards.map((cardObject) => {
              const createNewCard = newCard(cardObject);
              taskContainer.insertAdjacentHTML("beforeend", createNewCard);
              globalStore.push(cardObject);
            });
          };

const saveChanges = () => {
    const taskData = {
        id : `$(Date.now())`,    //unique no for card id
        imageurl : document.getElementById("imageurl").value,
        tasktitle : document.getElementById("tasktitle").value,
        tasktype : document.getElementById("tasktype").value,
        taskdescription : document.getElementById("taskdescription").value,
    };
    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards : globalStore}));
};


