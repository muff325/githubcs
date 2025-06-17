document.getElementById('startButton').addEventListener('click', () => {
  const goal = parseInt(document.getElementById('taskGoalInput').value);

  if (goal && goal > 0) {
    localStorage.setItem('dailyTaskGoal', goal);
    localStorage.setItem('tasksCompleted', 0);
    window.location.href = 'main.html';
  } else {
    alert('Please enter a valid task goal!');
  }
});
