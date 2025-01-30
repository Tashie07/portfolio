function setUpEvents() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // DOM Elements
    const yearElement = document.getElementById('year');
    const monthElement = document.getElementById('month');
    const calendarHeader = document.getElementById('calendar-header');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevYearBtn = document.getElementById('prev-year');
    const nextYearBtn = document.getElementById('next-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // Initialize current date
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    // Set up day headers
    calendarHeader.innerHTML = dayNames.map(day => 
        `<div class="day-header">${day}</div>`
    ).join('');

    // Calendar generation function
    function updateCalendar() {
        // Clear existing grid
        calendarGrid.innerHTML = '';

        // Update month/year display
        yearElement.textContent = currentYear;
        monthElement.textContent = monthNames[currentMonth];

        // Get first/last days of month
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const today = new Date();

        // Previous month's trailing days
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = firstDay.getDay(); i > 0; i--) {
            const dayNumber = prevMonthLastDay - i + 1;
            calendarGrid.appendChild(createDayElement(dayNumber, 'other-month'));
        }

        // Current month's days
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayDate = new Date(currentYear, currentMonth, day);
            const isToday = dayDate.toDateString() === today.toDateString();
            const className = isToday ? 'day today' : 'day';
            calendarGrid.appendChild(createDayElement(day, className, dayDate));
        }

        // Next month's leading days
        const totalCells = 42; // 6 weeks × 7 days
        const daysShown = firstDay.getDay() + lastDay.getDate();
        const nextMonthDays = totalCells - daysShown;
        
        for (let day = 1; day <= nextMonthDays; day++) {
            calendarGrid.appendChild(createDayElement(day, 'other-month'));
        }
    }

    // Helper function to create day elements
    function createDayElement(number, className, date = null) {
        const dayElement = document.createElement('div');
        dayElement.className = className;
        dayElement.textContent = number;
        
        if(date) {
            dayElement.dataset.date = date.toISOString().split('T')[0];
        }
        
        return dayElement;
    }

    // Event Listeners
    prevYearBtn.addEventListener('click', () => {
        currentYear--;
        currentDate = new Date(currentYear, currentMonth);
        updateCalendar();
    });

    nextYearBtn.addEventListener('click', () => {
        currentYear++;
        currentDate = new Date(currentYear, currentMonth);
        updateCalendar();
    });

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if(currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        currentDate = new Date(currentYear, currentMonth);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if(currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        currentDate = new Date(currentYear, currentMonth);
        updateCalendar();
    });

    // Initial calendar setup
    updateCalendar();
}

window.onload = function() {
    setUpEvents();
};