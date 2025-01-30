function setUpEvents() {
    // create constant variables
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // get the DOM elements
    const yearElement = document.getElementById("year");
    const monthElement = document.getElementById("month");
    const calendarHeader = document.getElementById("calendar-header");
    const calendarGrid = document.getElementById("calendar-grid");
    const prevYearBtn = document.getElementById("prev-year");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextYearBtn = document.getElementById("next-year");
    const nextMonthBtn = document.getElementById("next-month");

    // Initialize the current date
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Set up day headers
    calendarHeader.innerHTML = dayNames.map(day =>
        `<div class="day-header">${day}</div>`
    ).join('');

    // Calendar generation function
    function UpdateCalendar() {
        // clear the existing grid
        calendarGrid.innerHTML = '';

        // update the month/year display
        yearElement.innerHTML = currentYear;
        monthElement.innerHTML = monthNames[currentMonth];

        // Get the first and last day of the month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const today = new Date();

        // get the previous months trailing days
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = firstDay.getDay(); i > 0; i--) {
            const dayNumber = prevMonthLastDay - i + 1;
            calendarGrid.appendChild(createDayElement(dayNumber, 'other-month'));
        }

        // Current Months days
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayDate = new Date(currentYear, currentMonth, day);
            const isToday = dayDate.toDateString() === today.toDateString();
            const className = isToday ? 'day-today' : 'day';
            calendarGrid.appendChild(createDayElement(day, className, dayDate));
        }

        // Next Months leading days
        const totalCells = 42;
        const daysShown = firstDay.getDay() + lastDay.getDate(); // Corrected line
        const nextMonthsDays = totalCells - daysShown;

        for (let day = 1; day <= nextMonthsDays; day++) {
            calendarGrid.appendChild(createDayElement(day, 'other-month'));
        }
    }

    // helper function to create day elements
    function createDayElement(number, className, date = null) {
        const dayElement = document.createElement('div');
        dayElement.className = className;
        dayElement.innerHTML = number;

        if (date) {
            dayElement.dataset.date = date.toISOString().split('T')[0];

            // add click handler for date navigation
            dayElement.addEventListener('click', () => {
                const todoAppPath = '../../to_do_list/html/todo.html';
                const dateParam = `?date=${dayElement.dataset.date}`;
                window.location.href = `${todoAppPath}${dateParam}`;
            });
        }

        return dayElement;
    }

    // Event Listeners
    prevYearBtn.addEventListener('click', () => {
        currentYear--;
        currentDate = new Date(currentYear, currentMonth);
        UpdateCalendar();
    });

    nextYearBtn.addEventListener('click', () => {
        currentYear++;
        currentDate = new Date(currentYear, currentMonth);
        UpdateCalendar();
    });

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if(currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        currentDate = new Date(currentYear, currentMonth);
        UpdateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if(currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        currentDate = new Date(currentYear, currentMonth);
        UpdateCalendar();
    });

    // initialize the calendar setup
    UpdateCalendar();
}

window.onload = function() {
    setUpEvents();
}