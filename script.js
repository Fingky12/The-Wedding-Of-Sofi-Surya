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

// const slider = document.getElementById('slider');
// const dotsContainer = document.getElementById('dots');
// const images = slider.querySelectorAll('img');

// let currentIndex = 0;

// // Buat dots sesuai jumlah gambar
// images.forEach((_, i) => {
//     const dot = document.createElement('button');
//     if (i === 0) dot.classList.add('active');
//     dot.addEventListener('click', () => goToSlide(i));
//     dotsContainer.appendChild(dot);
// });

// // Fungsi ke slide tertentu
// function goToSlide(index) {
//     currentIndex = index;
//     const scrollAmount = images[index].offsetLeft - slider.offsetLeft;
//     slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
//     updateDots();
// }

// // Update warna dot aktif
// function updateDots() {
//     dotsContainer.querySelectorAll('button').forEach((dot, i) => {
//         dot.classList.toggle('active', i === currentIndex);
//     });
// }

// // Tombol prev/next
// document.querySelector('.prev').addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + images.length) % images.length;
//     goToSlide(currentIndex);
//     });
// document.querySelector('.next').addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % images.length;
//     goToSlide(currentIndex);
// });

// // Update dot saat di-scroll manual
// slider.addEventListener('scroll', () => {
//     let closest = 0;
//     let minDiff = Infinity;
//     images.forEach((img, i) => {
//         const diff = Math.abs(slider.scrollLeft - img.offsetLeft);
//         if (diff < minDiff) {
//         minDiff = diff;
//         closest = i;
//         }
//     });
//     currentIndex = closest;
//     updateDots();
// });


document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const mainContent = document.getElementById("mainContent");
    const openBtn = document.getElementById("openBtn");
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    const musicIcon = document.getElementById("musicIcon");

  // Kunci scroll saat splash tampil
    document.body.style.overflow = "hidden";

    openBtn.addEventListener("click", () => {
    
        // Hilangkan splash screen
        splash.style.opacity = "0";
        splash.style.visibility = "hidden";

        setTimeout(() => {
        splash.style.display = "none";
        mainContent.classList.remove("hidden");
        mainContent.classList.add("show");

        // Buka scroll
        document.body.style.overflow = "auto";

        // Mulai musik
        music.play().catch(() => {
            console.log("Musik belum bisa diputar otomatis, tunggu interaksi user");
        });
        Music.volume = 1.0;

        // Tampilkan tombol musik
        musicBtn.classList.remove("hidden");
        }, 1000);
    });

  // Tombol toggle musik (mute/unmute)
    let isPlaying = true;
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            music.pause();
            musicIcon.className = "bx bxs-volume-mute";
        } else {
            music.play();
            musicIcon.className = "bx bxs-music";
        }
        isPlaying = !isPlaying;
    });
});

    // ambil parameter "guest" dari URL
    const params = new URLSearchParams(window.location.search);
    const guest = params.get("guest");

    const guestName = document.getElementById("guest-name");

    if (guest) {
        // decode nama agar bisa menampilkan spasi atau simbol dari URL
        guestName.textContent = decodeURIComponent(guest);
    };


    // Tabel Komentar
    const form = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');
    const hadirCount = document.getElementById('hadirCount');
    const tidakCount = document.getElementById('tidakCount');
    const raguCount = document.getElementById('raguCount');

    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let stats = { hadir: 0, tidak: 0, ragu: 0 };

    comments.forEach(c => {
    tampilKomentar(c, commentList);
    stats[c.status]++;
    });
    updateCounts();

    form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const pesan = document.getElementById('pesan').value.trim();
    const status = document.getElementById('status').value;

    if (!nama || !pesan || !status) return;

    const newComment = {
        id: Date.now(),
        nama,
        pesan,
        status,
        waktu: Date.now(),
        replies: []
    };

    comments.unshift(newComment);
    saveComments();

    tampilKomentar(newComment, commentList, true);
    stats[status]++;
    updateCounts();

    form.reset();
    });

    function tampilKomentar(c, container, prepend = false) {
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
        <div class="name">${c.nama}</div>
        <p class="message">${c.pesan}</p>
        <small class="time">${formatWaktu(c.waktu)} • ${statusLabel(c.status)}</small>
        <div class="comment-actions">
            <button class="reply-btn">Balas</button>
            <button class="delete-btn">Hapus</button>
        </div>
    `;

    div.querySelector('.delete-btn').addEventListener('click', () => hapusKomentar(c.id, div));
    div.querySelector('.reply-btn').addEventListener('click', () => replyKomentar(c.id, div));

    if (c.replies && c.replies.length > 0) {
        c.replies.forEach(r => tampilReply(r, div));
    }

    prepend ? container.prepend(div) : container.appendChild(div);
    }

    function tampilReply(r, parentDiv) {
    const replyDiv = document.createElement('div');
    replyDiv.className = 'comment reply';
    replyDiv.innerHTML = `
        <strong>${r.nama}</strong>
        <p>${r.pesan}</p>
        <small>${formatWaktu(r.waktu)} • Balasan</small>
        <div class="comment-actions">
        <button class="delete-btn">Hapus</button>
        </div>
    `;
    replyDiv.querySelector('.delete-btn').addEventListener('click', () => hapusReply(r.id, replyDiv));
    parentDiv.appendChild(replyDiv);
    }

    let currentParentId = null;
    let currentParentDiv = null;

    function replyKomentar(id, parentDiv) {
    currentParentId = id;
    currentParentDiv = parentDiv;

    const parentComment = comments.find(c => c.id === id);
    document.getElementById("replyToName").textContent = `Balasan untuk : ${parentComment.nama}`;
    document.getElementById("replyNama").value = "";
    document.getElementById("replyPesan").value = "";

    document.getElementById("replyPopup").style.display = "block";
    }

    document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("replyPopup").style.display = "none";
    });

    window.addEventListener("click", (e) => {
    const popup = document.getElementById("replyPopup");
    if (e.target === popup) popup.style.display = "none";
    });

    document.getElementById("sendReplyBtn").addEventListener("click", () => {
    const nama = document.getElementById("replyNama").value.trim();
    const pesan = document.getElementById("replyPesan").value.trim();
    if (!nama || !pesan) return alert("Nama dan balasan tidak boleh kosong!");

    const reply = { id: Date.now(), nama, pesan, waktu: Date.now() };

    const parentComment = comments.find(c => c.id === currentParentId);
    parentComment.replies.push(reply);
    saveComments();

    tampilReply(reply, currentParentDiv);
    document.getElementById("replyPopup").style.display = "none";
    });


    function hapusKomentar(id, div) {
    if (confirm('Yakin ingin hapus komentar ini?')) {
        comments = comments.filter(c => c.id !== id);
        saveComments();
        div.remove();
    }
    }

    function hapusReply(id, div) {
    comments.forEach(c => {
        c.replies = c.replies.filter(r => r.id !== id);
    });
    saveComments();
    div.remove();
    }

    function updateCounts() {
    hadirCount.textContent = stats.hadir;
    tidakCount.textContent = stats.tidak;
    raguCount.textContent = stats.ragu;
    }

    function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
    }

    function statusLabel(status) {
    return status === 'hadir'
        ? '✅ Hadir'
        : status === 'tidak'
        ? '❌ Tidak Hadir'
        : '🤔 Ragu';
    }

    function formatWaktu(time) {
    const diff = Math.floor((Date.now() - time) / 1000);
    if (diff < 60) return `${diff} detik lalu`;
    if (diff < 3600) return `${Math.floor(diff/60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff/3600)} jam lalu`;
    if (diff < 2592000) return `${Math.floor(diff/86400)} hari lalu`;
    return `${Math.floor(diff/2592000)} bulan lalu`;
    }


      // === TOMBOL SALIN ===
    document.querySelector('.btn-copy').addEventListener('click', function () {
        const rekening = document.getElementById('nomerRek').innerText.trim();
        const alertBox = document.getElementById('copyAlert');
        
        navigator.clipboard.writeText(rekening)
        .then(() => {
            alertBox.textContent = 'Nomor rekening berhasil disalin!';
            alertBox.classList.add('show');
            setTimeout(() => alertBox.classList.remove('show'), 2000);
        })
        .catch(() => {
            alertBox.textContent = 'Gagal menyalin nomor rekening!';
            alertBox.style.color = 'red';
            alertBox.classList.add('show');
            setTimeout(() => {
            alertBox.classList.remove('show');
            alertBox.style.color = '#2ecc71';
            }, 2000);
        });
    });