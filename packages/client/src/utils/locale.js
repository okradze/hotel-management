export const months = [
    'იანვარი',
    'თებერვალი',
    'მარტი',
    'აპრილი',
    'მაისი',
    'ივნისი',
    'ივლისი',
    'აგვისტო',
    'სექტემბერი',
    'ოქტომბერი',
    'ნოემბერი',
    'დეკემბერი',
]

export const weekdays = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვ']

export function renderMonthAndYear(date) {
    return `${months[date.getMonth()]} - ${date.getFullYear()}`
}

export function handleNext(date, setDate) {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1))
}

export function handleBack(date, setDate) {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1))
}
