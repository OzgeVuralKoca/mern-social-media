const DateFormat = (date) => {

    const myDate = new Date(date)
    const formattedDate = myDate.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })

  return formattedDate
}

export default DateFormat