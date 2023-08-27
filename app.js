class Timer {
  constructor(workTime, restTime) {
    this.workTime = workTime;
    this.restTime = restTime;
    this.remainingTime = workTime * 60; // Convert minutes to seconds
    this.task = '';
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      this.remainingTime--;
      this.displayTime();

      if (this.remainingTime === 0) {
        this.pause();
        this.displayTask();
        this.switchTask();
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  resume() {
    if (!this.interval) {
      this.start();
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.remainingTime = this.workTime * 60;
    this.displayTime();
    this.displayTask();
  }

  modifyWorkTime(duration) {
    this.workTime = duration;
    this.remainingTime = this.workTime * 60;
    this.displayTime();
  }

  modifyRestTime(duration) {
    this.restTime = duration;
  }

  updateTask(task) {
    this.task = task;
    this.displayTask();
  }

  displayTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    const timeDisplay = document.getElementById('time');
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  displayTask() {
    const taskDisplay = document.getElementById('task');
    taskDisplay.textContent = this.task;
    const taskContainer = document.getElementById('task-container');
    taskContainer.style.display = this.task ? 'block' : 'none';
  }

  switchTask() {
    if (this.task) {
      this.task = '';
      this.remainingTime = this.restTime * 60;
      this.start();
    }
  }
}

class UI {
  constructor(timer) {
    this.timer = timer;
    this.startButton = document.getElementById('start');
    this.pauseButton = document.getElementById('pause');
    this.stopButton = document.getElementById('stop');
    this.modifyButton = document.getElementById('modify');
    this.taskInput = document.getElementById('task-input');
    this.workTimeInput = document.getElementById('work-time-input');
    this.restTimeInput = document.getElementById('rest-time-input');

    this.startButton.addEventListener('click', this.startButtonListener.bind(this));
    this.pauseButton.addEventListener('click', this.pauseButtonListener.bind(this));
    this.stopButton.addEventListener('click', this.stopButtonListener.bind(this));
    this.modifyButton.addEventListener('click', this.modifyButtonListener.bind(this));
  }

  startButtonListener() {
    this.timer.start();
  }

  pauseButtonListener() {
    this.timer.pause();
  }

  stopButtonListener() {
    this.timer.stop();
  }

  modifyButtonListener() {
    const task = this.taskInput.value;
    const workTime = parseInt(this.workTimeInput.value);
    const restTime = parseInt(this.restTimeInput.value);

    if (isNaN(workTime) || isNaN(restTime) || workTime <= 0 || restTime <= 0) {
      this.displayErrorMessage('Invalid work or rest time.');
      return;
    }

    this.timer.modifyWorkTime(workTime);
    this.timer.modifyRestTime(restTime);
    this.timer.updateTask(task);
    this.taskInput.value = '';
    this.workTimeInput.value = '';
    this.restTimeInput.value = '';
  }

  displayErrorMessage(message) {
    alert(message);
  }
}

const workTime = 30; // Default work time in minutes
const restTime = 5; // Default rest time in minutes

const timer = new Timer(workTime, restTime);
const ui = new UI(timer);
