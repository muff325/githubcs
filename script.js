let xp = parseInt(localStorage.getItem('xp')) || 0;
let streak = parseInt(localStorage.getItem('streak')) || 0;
let tasksCompleted = parseInt(localStorage.getItem('tasksCompleted')) || 0;
let taskGoal = parseInt(localStorage.getItem('dailyTaskGoal')) || 0;

document.getElementById('xp').textContent = xp;
document.getElementById('streak').textContent = streak;

document.getElementById('logWinBtn').addEventListener('click', logWin);

function logWin() {
  const input = document.getElementById('winInput');
  const journal = document.getElementById('journalEntries');
  const encouragement = document.getElementById('encouragementMsg');
  const winText = input.value.trim();

  if (winText === "") return;

  
  const entry = document.createElement('p');
  entry.textContent = `✅ ${winText}`;
  journal.appendChild(entry);

  xp += 10;
  tasksCompleted += 1;
  encouragement.textContent = getEncouragement();

  if (tasksCompleted === taskGoal) {
    xp += 50;
    encouragement.textContent = "🎉 Goal complete! Bonus XP awarded!";
    streak += 1;
    localStorage.setItem('streak', streak);
    document.getElementById('streak').textContent = streak;
  }

  document.getElementById('xp').textContent = xp;
  input.value = "";

  
  localStorage.setItem('xp', xp);
  localStorage.setItem('tasksCompleted', tasksCompleted);
}

function getEncouragement() {
  const messages = [
    "Keep going!",
    "You're doing amazing!",
    "Nice win!",
    "You're on fire!",
    "Proud of you!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
