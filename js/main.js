// gsap.registerPlugin(ScrollTrigger);
// scroller.on("scroll", ScrollTrigger.update);
//

window.addEventListener("load", function () {


});

(function () {
    setInterval(updateDateTime, 1000);
})();

function updateDateTime() {
    const dt = luxon.DateTime.now();

    const week = dt.toFormat('EEE');
    const day = dt.toFormat('dd');
    const hours = dt.toFormat('HH');
    const minutes = dt.toFormat('mm');

    const weekEl = document.querySelector('.day_of_week');
    const dayEl = document.querySelector('.day_of_month');
    const hoursEl = document.querySelector('.time__h');
    const minutesEl = document.querySelector('.time__m');

    weekEl.textContent = week;
    dayEl.textContent = day;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
}