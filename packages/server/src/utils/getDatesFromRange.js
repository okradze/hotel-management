Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

export default (startDate, stopDate) => {
    const dateArray = []

    let currentDate = startDate

    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate))
        currentDate = new Date(currentDate).addDays(1).toISOString()
    }
    return dateArray
}
