
// Global Scope Variables
const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearButton = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const formButton = itemForm.querySelector('button')
let isEditMode = false;

// Functions
function displayItems() {
    const itemsFromStorage = getItemsFromStorage()

    itemsFromStorage.forEach(item => addItemToDOM(item))

    checkUI()
}

function onAddItemSubmit(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')
        
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    } else {
        if (checkIfItemExists(newItem)) {
            alert('That item already exists!')
            return
        }
    }

    // Create item DOM element
    addItemToDOM(newItem)

    // Add item to local storage
    addItemToStorage(newItem)

    checkUI()

    // Clear the value of the user's input
    itemInput.value = ''
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li')

    // Add the value of the new item to the li
    li.appendChild(document.createTextNode(item))

    // Create button with the icon
    const button = createButton('remove-item btn-link text-red')

    // Add the button to the li
    li.appendChild(button)

    // Add the li to the item list
    itemList.appendChild(li)
}

function createButton(classes) {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes) {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage()

    // Add new item to array
    itemsFromStorage.push(item)

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
    let itemsFromStorage

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsFromStorage
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage()
    return itemsFromStorage.includes(item)
}

function setItemToEdit(item) {
    isEditMode = true

    itemList
        .querySelectorAll('li')
        .forEach(i => i.classList.remove('edit-mode'))

    item.classList.add('edit-mode')
    formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formButton.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove()

        // Remove item from local storage
        removeItemFromStorage(item.textContent)

        checkUI()
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage()

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }

    // Clear from local storage
    localStorage.removeItem('items')

    checkUI()
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase()

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

function checkUI() {
    itemInput.value = ''

    const items = document.querySelectorAll('li')

    if (items.length === 0) {
        clearButton.style.display = 'none'
        itemFilter.style.display = 'none'
    } else {
        clearButton.style.display = 'block'
        itemFilter.style.display = 'block'
    }

    formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formButton.style.backgroundColor = '#333'

    isEditMode = false;
}


// Initialize app
function init() {
    // Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearButton.addEventListener('click', clearItems)
    itemFilter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()
}

init()