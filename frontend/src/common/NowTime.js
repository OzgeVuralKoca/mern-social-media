const nowTime = () => {

    let nowTime = ""
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    let day = days[today.getDay()];
    const hour = today.getHours()
    const minute = today.getMinutes()
    if (minute < 10) {
        nowTime = `${day} ${hour}:0${minute}`
    } else {
        nowTime = `${day} ${hour}:${minute}`
    }

    return nowTime
}

export default nowTime