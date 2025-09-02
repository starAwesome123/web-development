const inp = document.getElementById("myInput");
const addBtn = document.getElementById("add");
const list = document.getElementById("tasks");

    function saveData() {
    localStorage.setItem("tasks", list.innerHTML);
}

// Function to load tasks from local storage
function showTasks() {
    list.innerHTML = localStorage.getItem("tasks");
}

function addTasks(){
    let txt=inp.value.trim();
    if (txt==""){
        alert("please enter a text");
    }
    else{
        var task=document.createElement("li");
        var spanList=document.createElement("span");
        var delBtn=document.createElement("span");
        var checked= document.createElement("span");

        delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        spanList.innerHTML=txt;

        task.appendChild(checked);
        task.appendChild(spanList);
        task.appendChild(delBtn);
        list.appendChild(task);
        saveData();

        spanList.addEventListener("click",()=> {spanList.classList.toggle("checked");
            checked.classList.toggle("checkedd");
            saveData();
        })

        delBtn.addEventListener("click",()=>{
            var result = confirm("Are you sure to delete?");
            if(result){
                task.remove();
                saveData();
            } 
            saveData();    
        })
    }
    inp.value="";
}

addBtn.addEventListener("click", addTasks);
inp.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTasks();
    }
  });
    showTasks();