
// Global Scope Variables
const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

// Functions
function addItem(e) {
    e.preventDefault()

    const newItem = itemInput.value

    // Validate Input
    if (newItem === '') {
        alert('Please add an item')
        return
    }

    // Create list item
    const li = document.createElement('li')

    // Add the value of the new item to the li
    li.appendChild(document.createTextNode(newItem))

    // Create button with the icon
    const button = createButton('remove-item btn-link text-red')

    // Add the button to the li
    li.appendChild(button)

    // Add the li to the item list
    itemList.appendChild(li)

    // Clear the value of the user's input
    itemInput.value = ''
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

// Event Listeners
itemForm.addEventListener('submit', addItem)