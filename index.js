// Unsplash API for background image. Image changes on page refresh:
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.full})`
		document.getElementById("author-container").innerHTML = `
        <p id="author">By: 
        <a href="https://unsplash.com/@${data.user.name}?utm_source=tech_and_elegance&utm_medium=referral" 
        target="_blank">${data.user.name}</a>
        on <a href="https://unsplash.com/">Unsplash</a>
        </p>
        `
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage =
        `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })

// Generates random inspirational quote from quotable API:
fetch("https://api.quotable.io/quotes/random")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("quote-top").innerHTML = `
            <p>${data[0].content}</p>
        `
    })
    .catch(err => console.error(err))

//Built-in date contructor to get the current time, only display hours+minutes(short)
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
//Clock updates without refreshing page
setInterval(getCurrentTime, 1000)

//getCurrentPosition method applies position to open weather API
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});
