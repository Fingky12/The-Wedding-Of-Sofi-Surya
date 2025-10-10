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

// Countdown Timer dengan Lingkaran
const targetDate = new Date("2026-03-28 10:00:00").getTime();
const radius = 45;
const circumference = 2 * Math.PI * radius;

function setProgress(circle, value) {
    const offset = circumference - (value * circumference);
    circle.style.strokeDashoffset = offset;
    circle.style.strokeDasharray = circumference;
}

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "<h2>Acara Dimulai 🎉</h2>";
        return;
    }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update angka
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

  // Update progress lingkaran
    setProgress(document.getElementById("daysCircle"), days / 365);
    setProgress(document.getElementById("hoursCircle"), hours / 24);
    setProgress(document.getElementById("minutesCircle"), minutes / 60);
    setProgress(document.getElementById("secondsCircle"), seconds / 60);

}, 1000);


document.getElementById("save").addEventListener("click", () => {
    document.querySelector(".hal2").scrollIntoView({
        behavior: "smooth"  // biar scroll halus
    });
});

const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');
const images = slider.querySelectorAll('img');

let currentIndex = 0;

// Buat dots sesuai jumlah gambar
images.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

// Fungsi ke slide tertentu
function goToSlide(index) {
    currentIndex = index;
    const scrollAmount = images[index].offsetLeft - slider.offsetLeft;
    slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    updateDots();
}

// Update warna dot aktif
function updateDots() {
    dotsContainer.querySelectorAll('button').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Tombol prev/next
document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(currentIndex);
    });
document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    goToSlide(currentIndex);
});

// Update dot saat di-scroll manual
slider.addEventListener('scroll', () => {
    let closest = 0;
    let minDiff = Infinity;
    images.forEach((img, i) => {
        const diff = Math.abs(slider.scrollLeft - img.offsetLeft);
        if (diff < minDiff) {
        minDiff = diff;
        closest = i;
        }
    });
    currentIndex = closest;
    updateDots();
});
