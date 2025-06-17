const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;
  calendarBody.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendarBody.innerHTML += `<div></div>`;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateKey = `${year}-${month + 1}-${i}`;
    const priority = localStorage.getItem(`${dateKey}-priority`);
    const priorityClass = priority ? priority.toLowerCase() : "";
    calendarBody.innerHTML += `
      <div class="calendar-day ${priorityClass}" onclick="openTodoModal('${dateKey}')">${i}</div>
    `;
  }
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
}

renderCalendar(currentDate);

function openTodoModal(dateKey) {
  const existingTodo = localStorage.getItem(dateKey) || "";
  const existingPriority = localStorage.getItem(`${dateKey}-priority`) || "Low";

  const modal = document.createElement("div");
  modal.classList.add("todo-modal");
  modal.innerHTML = `
    <div class="todo-content">
      <h3>To-Do for ${dateKey}</h3>
      <textarea id="todoInput">${existingTodo}</textarea>
      <label for="prioritySelect">Priority:</label>
      <select id="prioritySelect">
        <option value="Low" ${existingPriority === "Low" ? "selected" : ""}>Low</option>
        <option value="Medium" ${existingPriority === "Medium" ? "selected" : ""}>Medium</option>
        <option value="High" ${existingPriority === "High" ? "selected" : ""}>High</option>
      </select>
      <div class="todo-buttons">
        <button onclick="saveTodo('${dateKey}')">Save</button>
        <button onclick="closeTodoModal()">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function saveTodo(dateKey) {
  const input = document.getElementById("todoInput").value;
  const priority = document.getElementById("prioritySelect").value;

  localStorage.setItem(dateKey, input);
  localStorage.setItem(`${dateKey}-priority`, priority);

  closeTodoModal();
  renderCalendar(currentDate);
}

function closeTodoModal() {
  const modal = document.querySelector(".todo-modal");
  if (modal) modal.remove();
}

function clearAllTodos() {
  if (confirm("Are you sure you want to clear all saved to-dos?")) {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (/^\d{4}-\d{1,2}-\d{1,2}(-priority)?$/.test(key)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    renderCalendar(currentDate);
  }
}




