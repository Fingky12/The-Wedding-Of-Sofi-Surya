document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

const sliders = document.querySelectorAll('.slide-bottom');
const zooms = document.querySelectorAll('.zoom-in');

const slideOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};
const zoomOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const slideOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');   // muncul
        } else {
            entry.target.classList.remove('show'); // keluar layar → reset
        }
    });
}, slideOptions);

const zoomOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');   // muncul
        } else {
            entry.target.classList.remove('show'); // keluar layar → reset
        }
    });
}, zoomOptions);

zooms.forEach(zoom => zoomOnScroll.observe(zoom));
sliders.forEach(slide => slideOnScroll.observe(slide));
