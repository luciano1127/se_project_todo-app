import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
// const todoDeleteBtn = document.querySelector(".todo__delete-btn");
// const todoCheckbox = document.querySelector(".todo__completed");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheckbox(isChecked) {
  todoCounter.updateCompleted(isChecked);
}

function handleDelete(isChecked) {
  if (isChecked) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}




const addTodoPopup = new PopupWithForm({
  selector: "#add-todo-popup",
  submitHandler: (values) => {
      console.log("Form submitted");
  const name = values.name;
  const dateInput = values.date;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  // const values = { name, date, id };

  const todo = generateTodo(values);

  section.addItem(todo);
   todoCounter.updateTotal(true);
 
newTodoValidator.resetValidation();
addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer:(item) => {
    const element = generateTodo(item);
    section.addItem(element);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

// The logic in this function should all be handled in the Todo class.
function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheckbox, handleDelete);


  const todoElement = todo.getView();

  return todoElement;
  // todoCounter.updateTotal(true);
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

