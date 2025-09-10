document.addEventListener('DOMContentLoaded', function () {
    var priceBtns = document.querySelectorAll('.pricing-card button');
    priceBtns.forEach(btn => {
        btn.onclick = function () {
            var val = this.parentElement.querySelector('h3').innerText.toLowerCase();
            val = val.replace(/\s+/g, '-');
            val = val.replace(/\++/g, '');
            val = val.replace(/\-\-+/g, '-');
            openDemo(val);
            // console.log(val);
        }
    });
});

// Demo modal functionality
function openDemo(value) {
    document.getElementById('demoModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (value) {
        document.querySelector('select[name="system_type"]').value = value;
    };

    // Track conversion event
    gtag('event', 'demo_requested', {
        'event_category': 'conversion',
        'event_label': `business_pos_demo opened at ${window.location.pathname}`
    });
};

function closeDemo() {
    document.getElementById('demoModal').style.display = 'none';
    document.querySelector('select[name="system_type"]').value = "";
    document.body.style.overflow = 'auto';
}

// set countdown target
let targetDate = null;
let timerInterval = null;

// set the end date (DD/MM/YYYY)
function setEndDate(dateStr) {
    if (!dateStr) {
        // hide countdown
        document.getElementById('countDownSec').style.display = "none";
        clearInterval(timerInterval);
        targetDate = null;
        return;
    }

    const [month, day, year] = dateStr.split('/').map(Number);
    targetDate = new Date(year, month - 1, day, 0, 0, 0).getTime();

    // show countdown again
    document.getElementById('countDownSec').style.display = "block";

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function updateTimer() {
    if (!targetDate) return;

    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        console.log("Countdown Over!");
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setEndDate("");  // runs countdown until 30th Aug 2025 midnight Format: MM/DD/YYYY

// Initialize everything
function init() {

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .roi-stat').forEach(card => {
        observer.observe(card);
    });

    // Add ripple effects to buttons
    document.querySelectorAll('.btn-hero, .btn-pricing, .floating-cta').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;
            this.style.position = 'relative';
            document.querySelector('.floating-cta').style.position = 'fixed';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (isMobile()) {
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.01}px)`;
                hero.style.transition = `transform 1s ease`;
            }
        } else {
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
                hero.style.transition = `transform 1s ease`;
            }
        }
    });

    // Dynamic stat animations
    const stats = document.querySelectorAll('.stat-number, .roi-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Close modal when clicking outside
    document.getElementById('demoModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeDemo();
        }
    });

    // Form validation and styling
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 15px rgba(0, 174, 239, 0.3)';
        });

        input.addEventListener('blur', function () {
            this.style.borderColor = 'rgba(0, 174, 239, 0.3)';
            this.style.boxShadow = 'none';
        });

        // Placeholder color for inputs
        input.style.setProperty('--placeholder-color', 'rgba(255, 255, 255, 0.6)');
    });
}

// Animate numbers counting up
function animateNumber(element) {
    const target = element.textContent;
    const isX = target.includes('x');
    const isSlash = target.includes('/');
    const isPercent = target.includes('%');
    const isDollar = target.includes('$');
    const isStar = target.includes('★');
    const isTime = target.includes('min');
    const isTimeHrs = target.includes('hrs');

    let endValue;
    let rightValue;
    if (isPercent || isStar) {
        endValue = parseFloat(target.replace(/[^\d.]/g, ''));
    } else if (isDollar) {
        endValue = parseInt(target.replace(/[^\d]/g, ''));
    } else if (isTime) {
        endValue = parseInt(target.replace(/[^\d]/g, ''));
    } else if (isTimeHrs) {
        endValue = parseInt(target.replace(/[^\d]/g, ''));
    } else if (isX) {
        endValue = parseInt(target.replace(/[^\d.]/g, ''));
    } else if (isSlash) {
        const parts = target.split('/');
        endValue = parseInt(parts[0].replace(/[^\d]/g, ''));
        rightValue = parts[1]; // keep “7”
    } else {
        endValue = parseInt(target.replace(/[^\d]/g, '')) || parseFloat(target.replace(/[^\d.]/g, ''));
    }

    if (isNaN(endValue)) return;

    let startValue = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = startValue + (endValue - startValue) * easeOutCubic(progress);
        const rightValuex = startValue + (rightValue - startValue) * easeOutCubic(progress);

        if (isDollar) {
            element.textContent = `$${Math.floor(currentValue).toLocaleString()}`;
        } else if (isPercent) {
            element.textContent = `${Math.floor(currentValue)}%`;
        } else if (isStar) {
            element.textContent = `${currentValue.toFixed(1)}★`;
        } else if (isTime) {
            element.textContent = `${Math.floor(currentValue)} min`;
        } else if (isTimeHrs) {
            element.textContent = `${Math.floor(currentValue)} hrs`;
        } else if (isX) {
            element.textContent = `${currentValue.toFixed(0)}x`;
        } else if (isSlash) {
            element.textContent = `${currentValue.toFixed(0)}/${rightValuex.toFixed(0)}`;
        } else {
            element.textContent = `${Math.floor(currentValue).toLocaleString()}+`;
        }

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

document.addEventListener('DOMContentLoaded', () => {
    const btnGridOne = document.getElementById('btnGridOne');
    const btnGridTwo = document.getElementById('btnGridTwo');
    const gridOne = document.getElementById('gridOne');
    const gridTwo = document.getElementById('gridTwo');

    if (btnGridOne && gridOne && btnGridTwo && gridTwo) {
        btnGridOne.onclick = () => {
            gridOne.style.display = 'grid';
            gridTwo.style.display = 'none';
            btnGridOne.classList.add('active');
            btnGridTwo.classList.remove('active');
        };

        btnGridTwo.onclick = () => {
            gridOne.style.display = 'none';
            gridTwo.style.display = 'grid';
            btnGridTwo.classList.add('active');
            btnGridOne.classList.remove('active');
        };

        const urlHash = window.location.hash;
        if (urlHash === '#gridTwo') {
            btnGridTwo.click();
        } else {
            btnGridOne.click();
        }
    }
});