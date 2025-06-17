const habits = [];

function addHabit() {
  const name = document.getElementById("habit-name").value;
  const days = Array.from(document.querySelectorAll(".day-checkbox:checked")).map(cb => cb.value);
  const estimated = parseInt(document.getElementById("estimated-time").value);

  if (!name || days.length === 0 || isNaN(estimated)) {
    alert("Please fill out all fields.");
    return;
  }

  habits.push({ name, days, estimated, actual: {}, completedDays: [] });
  renderHabits();
}

function markCompleted(index, day) {
  const time = parseInt(prompt(`How long did it actually take to complete this habit on ${day}? (in minutes)`));
  if (!isNaN(time)) {
    habits[index].actual[day] = time;
    habits[index].completedDays.push(day);
    updateChart(index);
    renderHabits();
  }
}

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${habit.name}</strong><br>
      Days: ${habit.days.join(", ")}<br>
      Estimated Time: ${habit.estimated} mins<br>
      Completed: ${habit.completedDays.join(", ") || "None"}<br>
      ${habit.days.map(day => 
        !habit.completedDays.includes(day)
          ? `<button onclick="markCompleted(${index}, '${day}')">Mark ${day} Complete</button>` 
          : ""
      ).join("")}
    `;
    list.appendChild(li);
  });
}

// Chart.js setup
let chart;
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("habitChart").getContext("2d");
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Estimated Time (min)',
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.1)',
          fill: false,
          data: []
        },
        {
          label: 'Actual Time (min)',
          borderColor: 'green',
          backgroundColor: 'rgba(0,255,0,0.1)',
          fill: false,
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

function updateChart(index) {
  const habit = habits[index];
  const labels = habit.days;
  const estData = labels.map(() => habit.estimated);
  const actData = labels.map(day => habit.actual[day] ?? null);

  chart.data.labels = labels;
  chart.data.datasets[0].data = estData;
  chart.data.datasets[1].data = actData;
  chart.update();
}

function clearAll() {
  if (confirm("Are you sure you want to clear all habits and chart data?")) {
    habits.length = 0;
    chart.data.labels = [];
    chart.data.datasets.forEach(dataset => dataset.data = []);
    chart.update();
    renderHabits();
  }
}
