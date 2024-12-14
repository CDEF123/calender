let currentDate = new Date();
let currentEvents = {};  // Store events by month and day
let alertTone = 'default';
let vibrate = false;

// Event colors
const eventColors = ['#FF4081', '#FFEB3B', '#4CAF50', '#2196F3'];

// Function to display the current day
function displayCurrentDay() {
    const currentDayText = document.getElementById("current-date");
    currentDayText.textContent = currentDate.toDateString();
}

// Function to display the current month
function displayCurrentMonth() {
    const currentMonthText = document.getElementById("current-month");
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    currentMonthText.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

// Function to generate calendar days
function updateCalendar() {
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = '';  // Clear current calendar
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    // Empty slots before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        calendarGrid.appendChild(emptyDiv);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.textContent = day;
        dayDiv.onclick = () => openEventModal(day);
        calendarGrid.appendChild(dayDiv);
        
        // Show event names and color if any
        if (currentEvents[currentDate.getMonth() + 1] && currentEvents[currentDate.getMonth() + 1][day]) {
            const eventName = document.createElement("div");
            eventName.classList.add("event");
            eventName.textContent = currentEvents[currentDate.getMonth() + 1][day].title;
            eventName.style.backgroundColor = currentEvents[currentDate.getMonth() + 1][day].color;
            dayDiv.appendChild(eventName);
        }
    }
}

// Function to open the event modal for a specific day
function openEventModal(day) {
    const modal = document.getElementById("event-modal");
    const eventTitle = document.getElementById("event-title");
    const eventDescription = document.getElementById("event-description");
    const eventTime = document.getElementById("event-time");

    // Pre-fill the form if there's an existing event for that day
    if (currentEvents[currentDate.getMonth() + 1] && currentEvents[currentDate.getMonth() + 1][day]) {
        const event = currentEvents[currentDate.getMonth() + 1][day];
        eventTitle.value = event.title;
        eventDescription.value = event.description;
        eventTime.value = event.time;
    } else {
        eventTitle.value = '';
        eventDescription.value = '';
        eventTime.value = '';
    }

    modal.style.display = "flex";
    modal.dataset.selectedDay = day;
}

// Function to save the event
function saveEvent() {
    const modal = document.getElementById("event-modal");
    const day = modal.dataset.selectedDay;
    const eventTitle = document.getElementById("event-title").value;
    const eventDescription = document.getElementById("event-description").value;
    const eventTime = document.getElementById("event-time").value;
    
    // Initialize the event structure for the current month if not already present
    if (!currentEvents[currentDate.getMonth() + 1]) {
        currentEvents[currentDate.getMonth() + 1] = {};
    }

    // Randomly select an event color
    const color = eventColors[Math.floor(Math.random() * eventColors.length)];

    // Save the event
    currentEvents[currentDate.getMonth() + 1][day] = {
        title: eventTitle,
        description: eventDescription,
        time: eventTime,
        color: color,
    };

    modal.style.display = "none";
    updateCalendar();
}

// Function to close the event modal
function closeModal() {
    const modal = document.getElementById("event-modal");
    modal.style.display = "none";
}

// Function to navigate between months
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    displayCurrentMonth();
    updateCalendar();
}

// Function to update the day from the settings
function updateDay() {
    const dateInput = document.getElementById("day-input").value;
    currentDate = new Date(dateInput);
    displayCurrentDay();
    updateCalendar();
}

// Function to open settings page
function openSettings() {
    document.getElementById("calendar-page").style.display = "none";
    document.getElementById("settings-page").style.display = "block";
}

// Function to go back to the main calendar
function goBack() {
    document.getElementById("calendar-page").style.display = "block";
    document.getElementById("settings-page").style.display = "none";
}

// Update settings (alert tone and vibration)
function updateSettings() {
    alertTone = document.getElementById("alert-tone").value;
    vibrate = document.getElementById("vibrate-toggle").checked;
}

// Initial page load
document.addEventListener("DOMContentLoaded", () => {
    displayCurrentDay();
    displayCurrentMonth();
    updateCalendar();
});
