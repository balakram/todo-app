document.addEventListener("DOMContentLoaded", function () {
    const calendarElement = document.getElementById('calendar');
    const currentDateElement = document.getElementById('current-date');
    const taskListElement = document.getElementById('task-list');
    const monthYearElement = document.getElementById('calendar-month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const viewWeekButton = document.getElementById('view-week');
    const viewMonthButton = document.getElementById('view-month');
    const viewYearButton = document.getElementById('view-year');
    const backButton = document.getElementById('back-button');

    let view = 'month'; // Default view
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentWeekStartDate = new Date();

    // Sample tasks data
    const tasks = {
        "2024-07-25": ["Task 1", "Task 2"],
        "2024-07-26": ["Task 3"],
        "2024-07-27": ["Task 4", "Task 5", "Task 6"]
    };

    function renderCalendar() {
        let days = '';
        let title = '';
        let firstDayOfWeek, lastDayOfMonth;

        const today = new Date();
        const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const headerRow = daysOfWeek.map(day => `<div class="calendar-day-header">${day}</div>`).join('');

        switch (view) {
            case 'week':
                title = `Week of ${currentWeekStartDate.toLocaleDateString()}`;
                for (let i = 0; i < 7; i++) {
                    const day = new Date(currentWeekStartDate);
                    day.setDate(day.getDate() + i);
                    const dateString = day.toISOString().split('T')[0];
                    const isToday = day.toDateString() === today.toDateString();
                    days += `
                        <div class="calendar-day${isToday ? ' today' : ''}" data-date="${dateString}">
                            ${day.getDate()}
                        </div>
                    `;
                }
                break;

            case 'month':
                firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
                lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                title = `${today.toLocaleString('default', { month: 'long' })} ${currentYear}`;
                days += headerRow; // Add the days of the week header

                // Add padding for days of the week from the previous month
                for (let i = 0; i < firstDayOfWeek; i++) {
                    days += '<div class="calendar-day empty"></div>';
                }
                for (let i = 1; i <= lastDayOfMonth; i++) {
                    const day = new Date(currentYear, currentMonth, i);
                    const dateString = day.toISOString().split('T')[0];
                    const isToday = day.toDateString() === today.toDateString();
                    days += `
                        <div class="calendar-day${isToday ? ' today' : ''}" data-date="${dateString}">
                            ${i}
                        </div>
                    `;
                }
                break;

            case 'year':
                title = `${currentYear}`;
                days += headerRow; // Add the days of the week header

                for (let i = 0; i < 12; i++) {
                    const firstDay = new Date(currentYear, i, 1);
                    const lastDay = new Date(currentYear, i + 1, 0).getDate();
                    const monthName = firstDay.toLocaleString('default', { month: 'short' });
                    days += `
                        <div class="calendar-month">
                            <div class="calendar-month-header">${monthName}</div>
                            <div class="calendar-days">
                                ${Array.from({ length: lastDay }, (_, j) => {
                                    const day = new Date(currentYear, i, j + 1);
                                    const dateString = day.toISOString().split('T')[0];
                                    return `<div class="calendar-day" data-date="${dateString}">${j + 1}</div>`;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }
                break;
        }

        calendarElement.innerHTML = `
            <div class="calendar-days-header">${headerRow}</div>
            <div class="calendar-days">${days}</div>
        `;
        monthYearElement.textContent = title;

        // Add event listeners to each day
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', function () {
                const selectedDate = this.getAttribute('data-date');
                currentDateElement.textContent = selectedDate;
                updateTaskList(selectedDate);
            });
        });
    }

    function updateTaskList(date) {
        taskListElement.innerHTML = '';
        if (tasks[date]) {
            tasks[date].forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                taskListElement.appendChild(li);
            });
        } else {
            taskListElement.innerHTML = '<li>No tasks for this date</li>';
        }
    }

    function changeMonth(offset) {
        currentMonth += offset;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        } else if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    }

    function changeWeek(offset) {
        currentWeekStartDate.setDate(currentWeekStartDate.getDate() + (offset * 7));
        renderCalendar();
    }

    function setView(newView) {
        view = newView;
        renderCalendar();
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));
    viewWeekButton.addEventListener('click', () => setView('week'));
    viewMonthButton.addEventListener('click', () => setView('month'));
    viewYearButton.addEventListener('click', () => setView('year'));

    backButton.addEventListener('click', () => {
        window.history.back(); // Replace with actual navigation logic
    });

    // Initialize calendar
    renderCalendar();
});
