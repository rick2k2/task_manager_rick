const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const message = document.querySelector(".message");
const date = new Date();
const dayList = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const dn = date.getDay();
const mn = date.getMonth()+1;
const month1 = monthList[mn];
const date1 = date.getDate();
const fullyear = date.getFullYear();
const currentdate = `(${dayList[dn]} | ${date1}-${month1}-${fullyear})`;


const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
showAllTasks();

function showAllTasks() {
  tasks.forEach((value, index) => {
    const div = document.createElement("div");
    div.setAttribute("class", "task");

    const innerDiv = document.createElement("div");
    div.append(innerDiv);

    const p = document.createElement("p");
    p.innerText = value.title;
    innerDiv.append(p);

    const span = document.createElement("span");
    span.innerText = value.description;
    innerDiv.append(span);

    const btn = document.createElement("button");
    btn.setAttribute("class", "deleteBtn");
    btn.innerText = "-";
    btn.addEventListener("click", () => {
      removeTasks();
      tasks.splice(index, 1);
      localStorage.setItem("tasks",JSON.stringify(tasks));
      showAllTasks();
      message.innerText = "Delete task Successfully";
    });
    div.append(btn);
    container.append(div);
  });
}

function removeTasks() {
  tasks.forEach(() => {
    const div = document.querySelector(".task");
    div.remove();
  });
}

function resetFields() {
  title.value = "";
  description.value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeTasks();
  tasks.push({
    title: `${title.value} | ${currentdate}`,
    description: description.value,
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
  message.innerText = "Add task successfully";
  resetFields();
  showAllTasks();
});
