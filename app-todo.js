function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }

    return element;
}

function createTodoItem(title, date, hour, comment) {
    const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });

    const label = createElement('label', { className: 'title' }, title);
    const editInput = createElement('input', { type: 'text', className: 'textfield' });

    const label2 = createElement('label2', { className: 'date' }, date);
    const editInput2 = createElement('input', { type: 'text', className: 'textfield2' });

    const label3 = createElement('label3', { className: 'hour' }, hour);
    const editInput3 = createElement('input', { type: 'text', className: 'textfield3' });

    const label4 = createElement('label4', { className: 'comment' }, comment);
    const editInput4 = createElement('input', { type: 'text', className: 'textfield4' });

    const editButton = createElement('button', { className: 'edit' }, 'Edit');
    const deleteButton = createElement('button', { className: 'delete' }, 'Delete');
    const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, label2, label3, label4, editInput, editInput2, editInput3, editInput4, editButton, deleteButton);

    bindEvents(listItem);

    return listItem;
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === '') {
        return alert('You have to enter task.');
    }

    if (addInputDate.value === '') {
        return alert('You have to enter date.');
    }

    const todoItem = createTodoItem(addInput.value, addInputDate.value, addInputHour.value, addInputComment.value);
    todoList.appendChild(todoItem);

    storeTodoItemInLocalStorage(addInput.value, addInputDate.value, addInputHour.value, addInputComment.value);

    addInput.value = '';
    addInputDate.value = '';
    addInputHour.value = '';
    addInputComment.value = '';
}

function storeTodoItemInLocalStorage(title2, date2, hour2, comment2) {
    var obj = {
        title: title2, 
        date: date2, 
        hour: hour2,
        comment: comment2,
    }
    localStorage.setItem('TodoItem', JSON.stringify(obj));
}

function loadTodoItems() {
    var returnObj = JSON.parse(localStorage.getItem('TodoItem'));
    const todoItem = createTodoItem(returnObj.title, returnObj.date, returnObj.hour, returnObj.comment);
    todoList.appendChild(todoItem);
}

function toggleTodoItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem() {
    const listItem = this.parentNode;

    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');

    const date = listItem.querySelector('.date');
    const editInput2 = listItem.querySelector('.textfield2');

    const hour = listItem.querySelector('.hour');
    const editInput3 = listItem.querySelector('.textfield3');

    const comment = listItem.querySelector('.comment');
    const editInput4 = listItem.querySelector('.textfield4');

    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Change';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Save';
    }
    
    if (isEditing) {
        date.innerText = editInput2.value;
        this.innerText = 'Change';
    } else {
        editInput2.value = date.innerText;
        this.innerText = 'Save';
    }

    if (isEditing) {
        hour.innerText = editInput3.value;
        this.innerText = 'Change';
    } else {
        editInput3.value = hour.innerText;
        this.innerText = 'Save';
    }

    if (isEditing) {
        comment.innerText = editInput4.value;
        this.innerText = 'Change';
    } else {
        editInput4.value = comment.innerText;
        this.innerText = 'Save';
    }

    storeTodoItemInLocalStorage(title.textContent, date.textContent, hour.textContent, comment.textContent)

    listItem.classList.toggle('editing');
}


function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}

function filterTodoItems() {
    const fil = addInputFilter.textContent;
    todoItems.forEach(function(toDoItem){
        item = toDoItem.firstChild.textContent;
        if (item.includes(fil)){
            toDoItem.style.display = 'block';
        } else {
            toDoItem.style.display = 'none';
        }
    })
}

const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const addInputDate = document.getElementById('add-input-date');
const addInputHour = document.getElementById('add-input-hour');
const addInputComment = document.getElementById('add-input-comment');
const addInputFilter = document.getElementById('add-input-filter');
const filter = document.getElementById('filter');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main() {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
    document.addEventListener('DOMContentLoaded', loadTodoItems);
    filter.addEventListener('keyup', filterTodoItems);
}

main();