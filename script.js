// Define categories and tasks
let categories = [
  { title: "Personal", img: "boy.png" },
  { title: "Work", img: "briefcase.png" },
  { title: "Shopping", img: "shopping.png" },
  { title: "Coding", img: "web-design.png" },
  { title: "Health", img: "healthcare.png" },
  { title: "Fitness", img: "dumbbell.png" },
  { title: "Education", img: "education.png" },
  { title: "Finance", img: "saving.png" },
];

let tasks = [
  { id: 1, task: "Go to market", category: "Shopping", completed: false },
  { id: 2, task: "Read a book", category: "Personal", completed: false },
  { id: 3, task: "Prepare meeting notes", category: "Work", completed: false },
  { id: 4, task: "Debug code", category: "Coding", completed: false },
  { id: 5, task: "Go for a walk", category: "Health", completed: false },
  { id: 6, task: "Do a workout", category: "Fitness", completed: false },
  { id: 7, task: "Watch a tutorial", category: "Education", completed: false },
  { id: 8, task: "Review budget", category: "Finance", completed: false },
];

// DOM Elements
const categoriesContainer = document.querySelector(".categories");
const tasksContainer = document.querySelector(".tasks");
const numTasks = document.getElementById("num-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const categorySelect = document.getElementById("menu-select");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.getElementById("total-tasks");
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");

let selectedCategory = categories[0]; // Default selected category

// Save tasks to local storage
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load tasks from local storage
const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal) {
    tasks = tasksLocal;
  }
};

// Toggle between screens
const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

// Toggle add task form
const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

// Add a new task
const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();
  const category = categorySelect.value;

  if (task === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  }
};

// Render tasks for the selected category
const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const taskWrapper = document.createElement("div");
      taskWrapper.classList.add("task-wrapper");

      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });

      const checkmark = document.createElement("span");
      checkmark.classList.add("checkmark");
      checkmark.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      `;

      const taskText = document.createElement("p");
      taskText.textContent = task.task;

      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("delete");
      deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      `;
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
      });

      label.appendChild(checkbox);
      label.appendChild(checkmark);
      label.appendChild(taskText);
      taskWrapper.appendChild(label);
      taskWrapper.appendChild(deleteBtn);
      tasksContainer.appendChild(taskWrapper);
    });
  }
  updateTotals();
};

// Render categories
const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.addEventListener("click", () => {
      selectedCategory = category;
      categoryTitle.textContent = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
      toggleScreen();
    });

    categoryDiv.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasks.length} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
      </div>
    `;

    categoriesContainer.appendChild(categoryDiv);
  });
};

// Update total tasks
const updateTotals = () => {
  const categoryTasks = tasks.filter(
    (task) => task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  numTasks.textContent = `${categoryTasks.length} Tasks`;
  totalTasks.textContent = tasks.length;
};

// Initialize the app
const init = () => {
  getLocal();
  renderCategories();
  renderTasks();

  // Populate category select options
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title;
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });
};

// Event Listeners
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);

// Initialize the app
init();
