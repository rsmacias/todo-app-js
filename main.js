
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");

    formValidation();
});

let formValidation = () => {
    if (!textInput || textInput.value === "") {
        msg.innerHTML = "Task cannot be blank";
        console.log("failure");
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();

        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

// Collect data from the inputs and store in memory object
let acceptData = () => {
    data.push({ 
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    console.log(data);

    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, index) => {
        return (tasks.innerHTML += `
            <div id=${index}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
        
                <span class="options">
                    <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `);
    }) 

    resetForm();
};

let deleteTask = (e) => {
    // 1.- remove the HTML element from the screen
    e.parentElement.parentElement.remove();
    // 2.- remove the task from the data array
    data.splice(e.parentElement.parentElement.id, 1);
    // 3.- remove the task from the local storage
    localStorage.setItem("data", JSON.stringify(data));
    
    console.log(data);
};

let editPost = (e) => {
    input.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};