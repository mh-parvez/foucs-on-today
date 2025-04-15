const checkboxs = document.querySelectorAll(".checkbox");
const inputs = document.querySelectorAll(".goal-box input");
const error = document.querySelector(".error");
const progress = document.querySelector(".progress");
const progressValue = document.querySelector(".progress span");
const progressQuotes = document.querySelector(".progress-quoutes");

allQuotes = [
  "Raise the bar by completing your goal!",
  "Well begun in half done!",
  "Just a step away, keep going!",
  "Whoa! You just compeletd all the goal, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: '',
    completed: false,
  },
  second: {
    name: '',
    completed: false,
  },
  third: {
    name: '',
    completed: false,
  },
};

let countCompleted = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressQuotes.innerText = allQuotes[countCompleted];

progress.style.width = `${100 * (countCompleted / 3)}%`;
progressValue.innerText = `${countCompleted}/3 Completed`;

checkboxs.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allGoalsAdded = [...inputs].every((input) => input.value);

    if (allGoalsAdded === true) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id;

      allGoals[inputId].completed = !allGoals[inputId].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));

      countCompleted = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progress.style.width = `${100 * (countCompleted / 3)}%`;
      progressValue.innerText = `${countCompleted}/3 Completed`;
      progressQuotes.innerText = allQuotes[countCompleted];

    } else {
      error.classList.add("show-error");
    }
  });
});

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    error.classList.remove("show-error");
  });

  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id].name = e.target.value;
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
