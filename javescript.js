const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const todoScreen = document.getElementById("todo-screen");
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("new-task");
const taskQuantityInput = document.getElementById("task-quantity");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");
const congratulationsMessage = document.getElementById(
  "congratulations-message"
);
const closeMessageBtn = document.getElementById("close-message");

let activeTaskCount = 0;

// Skift fra forside til To-Do Liste
startBtn.addEventListener("click", function () {
  welcomeScreen.style.display = "none";
  todoScreen.style.display = "block";
});

// Håndter tilføjelse af nye opgaver
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value;
  const taskQuantity = taskQuantityInput.value;

  if (taskText.trim() !== "" && taskQuantity > 0) {
    const taskId = crypto.randomUUID();
    const li = document.createElement("li");

    // Tilføj data-attributter til li-elementet
    li.setAttribute("data-id", taskId);
    li.setAttribute("data-status", "active");
    li.setAttribute("data-quantity", taskQuantity);

    // Opret kryds (✗) til at markere opgaven som færdig
    const toggleButton = document.createElement("span");
    toggleButton.className = "task-toggle";
    toggleButton.textContent = "X";
    li.appendChild(toggleButton);

    // Formatér tekst til aktive opgaver
    const taskTextNode = document.createTextNode(
      `${taskText} (${taskQuantity})`
    );
    li.appendChild(taskTextNode);

    // Tilføj klassen for aktive opgaver
    li.classList.add("active-task");
    activeTaskCount++;

    // Opret "Slet"-knap
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Slet";
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    // Nulstil inputfelter
    taskInput.value = "";
    taskQuantityInput.value = "";

    // Håndter klik på krydset for at markere som færdig/ufærdig
    toggleButton.addEventListener("click", function () {
      if (li.classList.contains("active-task")) {
        li.classList.remove("active-task");
        li.classList.add("completed-task");
        toggleButton.textContent = "✔";
        activeTaskCount--;
        li.setAttribute("data-status", "completed");

        // Tjek om der ikke er flere aktive opgaver
        if (activeTaskCount === 0) {
          congratulationsMessage.style.display = "block";
        }
      } else {
        li.classList.remove("completed-task");
        li.classList.add("active-task");
        toggleButton.textContent = "X";
        activeTaskCount++;
        li.setAttribute("data-status", "active");
      }
    });

    // Håndter sletning af opgave
    deleteButton.addEventListener("click", function () {
      taskList.removeChild(li);
      if (li.classList.contains("active-task")) {
        activeTaskCount--;
      } else {
        activeTaskCount++;
      }
    });
  }
});

// Luk beskedboksen og gå tilbage til forsiden
closeMessageBtn.addEventListener("click", function () {
  congratulationsMessage.style.display = "none";
  todoScreen.style.display = "none";
  welcomeScreen.style.display = "block";
  taskList.innerHTML = "";
  activeTaskCount = 0;
});
