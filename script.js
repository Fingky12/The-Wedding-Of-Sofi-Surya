// Countdown ke tanggal acara
const eventDate = new Date("September 22, 2025 10:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById("timer").innerHTML = "Acara Sedang Berlangsung 🎉";
        clearInterval(timer);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
    }, 1000);

    // RSVP form
    document.getElementById("rsvpForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const status = document.getElementById("status").value;

    if (nama && status) {
        document.getElementById("rsvpResult").innerHTML =
        `Terima kasih, ${nama}. Status Anda: ${status} ✅`;
        this.reset();
    } else {
        document.getElementById("rsvpResult").innerHTML =
        "Harap isi semua data!";
    }
    });
