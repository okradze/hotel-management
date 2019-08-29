function runAfterDatePick(startDate, date, roomId, setTempBooking, color) {
    const booking = {
        checkIn: startDate.toISOString(),
        checkOut: date.toISOString(),
        room: {
            id: roomId,
        },
        color,
    }

    setTempBooking(booking)
}

export { runAfterDatePick }
