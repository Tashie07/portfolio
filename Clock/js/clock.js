function setUpEvents() {
    // Get the DOM elements
    const clockFace = document.getElementById("clock-face");
    const theme = document.getElementById("theme");
    const format = document.getElementById("format");

    // Function for updating the clock
    function updateClock() {
        let currentTime = new Date();
        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();
        let currentSecond = currentTime.getSeconds();

        // get the saved timeformat from localstorage (default is 12hr)
        const is24HourFormat = localStorage.getItem('timeFormat') === '24-hour';

        // convert to 12-hour format if needed
        let period = '';
        if (!is24HourFormat) {
            period = currentHour >= 12 ? ' PM' : ' AM';
            currentHour = currentHour % 12 || 12; // convert 0 to 12
        }

        // Display the time in the webpage with leading zeros
        clockFace.innerHTML = 
            String(currentHour).padStart(2, '0') + ':' + 
            String(currentMinute).padStart(2, '0') + ':' + 
            String(currentSecond).padStart(2, '0');
    }

    // toggle betweeen 24hr and 12hr formats
    function toggleTimeFormat() {
        const is24HourFormat = localStorage.getItem('timeFormat') === '24-hour';
        localStorage.setItem('timeFormat', is24HourFormat ? '12-hour' : '24-hour');
        updateClock(); // immediately aplly the new format
    }

    // Theme toggle function
    function toggleTheme() {
        document.querySelectorAll('.dark-mode, .light-mode').forEach(element => {
            if (element.classList.contains('dark-mode')) {
                element.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('theme', 'light-mode'); // Save to localStorage
            } else {
                element.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('theme', 'dark-mode'); // Save to localStorage
            }
        });
    }

    // Function to load the saved theme from localStorage
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme'); // Retrieve theme from localStorage
        if (savedTheme) {
            document.querySelectorAll('.dark-mode, .light-mode').forEach(element => {
                element.classList.replace('dark-mode', savedTheme);
                element.classList.replace('light-mode', savedTheme);
            });
        }
    }

    loadTheme();

    // Add a single event listener for theme switching
    theme.addEventListener('click', toggleTheme);
    if (format) {
        format.addEventListener('click', toggleTimeFormat);
    }

    // Update the clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to set clock immediately
}

// Run the setup function on page load
window.onload = setUpEvents;
