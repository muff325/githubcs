
const calendarGrid = document.getElementById('calendarGrid');
const insightBox = document.getElementById('insightBox');
const clearBtn = document.getElementById('clear-btn');
const moodSelect = document.getElementById('mood-select');
const energySelect = document.getElementById('energy-select');


let moodData = JSON.parse(localStorage.getItem('moodEnergyLog') || '{}');

function saveEntry() {
  const date = document.getElementById('date').value;
  const mood = document.getElementById('mood').value;
  const energy = document.getElementById('energy').value;

  if (!date) {
    alert("Please select a date.");
    return;
  }


  moodData[date] = { mood, energy };
  localStorage.setItem('moodEnergyLog', JSON.stringify(moodData));

  showCalendar();
  showInsight();
}

function showCalendar() {
  calendarGrid.innerHTML = ''; 


  const allDates = Object.keys(moodData).sort();

  for (let date of allDates) {
    const entry = moodData[date];

 
    const box = document.createElement('div');
    box.className = 'calendar-cell';
    box.innerHTML = `
      <div>${date}</div>
      <div>${entry.mood} ${entry.energy}</div>
    `;

    calendarGrid.appendChild(box);
  }
}


function showInsight() {
  let bestDays = 0;
  let totalDays = 0;

  for (let date in moodData) {
    const { mood, energy } = moodData[date];
    if (mood === '😊' && energy === '⚡') {
      bestDays++;
    }
    totalDays++;
  }

  if (totalDays === 0) {
    insightBox.textContent = "No entries yet.";
  } else {
    const percent = ((bestDays / totalDays) * 100).toFixed(1);
    insightBox.textContent = `You're most productive when your energy is high and mood is happy — this happened on ${percent}% of days.`;
  }
}

clearBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear?")) {
    moodSelect.value = '';
    energySelect.value = '';
  }
});

showCalendar();
showInsight();
