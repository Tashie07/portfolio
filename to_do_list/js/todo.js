function setUpEvents() {

    // Get date from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('date') || new Date().toISOString().split('T')[0];

    // Use this date to filter/show todos for the selected date
    console.log('Selected Date:', selectedDate);

    var addTask = document.getElementById("add");
    var input = document.getElementById("input-task");
    var listContainer = document.getElementById("list-container");
    const backBtn = document.getElementById("back-button");

    addTask.onclick = function() {
        if (input.value.trim().length === 0) {
            alert("Please enter a task");
        } else {
            var li = document.createElement("li");
            var text = document.createTextNode(input.value);
            li.appendChild(text);
            
            // Create delete button
            let span = document.createElement("span");
            span.innerHTML = '<i class="bi bi-trash"></i>';
            li.appendChild(span);
            
            // Use existing listContainer reference
            listContainer.appendChild(li);
            input.value = "";
            saveData();
        }
    };

    listContainer.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            // Use classList.toggle instead of className manipulation
            event.target.classList.toggle("checked");
            saveData();
        }
        else if (event.target.tagName === "SPAN") {
            event.target.parentElement.remove();
            saveData();
        }
    }, false);

    // add eventlistener for navigating back to the calendar
    backBtn.addEventListener('click', () => {
        const calendarAppPath = '../../Calendar/html/calendar.html';
        window.location.href = `${calendarAppPath}`;
    })

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML)
    }

    function showTask() {
        listContainer.innerHTML = localStorage.getItem("data");
    }
    showTask();

    
}

window.onload = function() {
    setUpEvents();
};  // Added missing closing brace and parenthesis