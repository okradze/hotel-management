export function getWeeksForMonth(month, year) {
    const firstOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstOfMonth.getDay();
    const weeks = [[]];

    let currentWeek = weeks[0];
    let currentDate = firstOfMonth;

    for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push(null);
    }

    while (currentDate.getMonth() === month) {
        if (currentWeek.length === 7) {
            currentWeek = [];
            weeks.push(currentWeek);
        }

        currentWeek.push(currentDate);
        currentDate = new Date(year, month, currentDate.getDate() + 1);
    }

    while (currentWeek.length < 7) {
        currentWeek.push(null);
    }

    return weeks;
}

export function renderInfo(currentDate) {
    return `${currentDate.getFullYear()}/${(currentDate
        .getMonth() + 1)
        .pad(2)}/${currentDate.getDate().pad(2)}`;
}
