function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile|WPDesktop/i
        .test(navigator.userAgent);
}

document.querySelector('.backxx').addEventListener('click', () => {
    consultus();
    hideMenuItems();
});

// Global toggle for canvas animations
// Initialize the enableCanvasAnimations variable from localStorage or default to true
let enableCanvasAnimations = true;

function startCanvas() {
    if (!enableCanvasAnimations) return;
    init3D();
    animate();
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function showMenuItems() {
    if (isMobile()) {
        var navLinks = document.querySelector('.nav-links');
        var navLink = document.querySelectorAll('.nav-link');
        var logo = document.querySelector('.logo');
        var navTog = document.querySelector('.nav-toggle');

        navLink.forEach(link => {
            link.style.display = 'block';
        });

        navLinks.style.height = '25vh';
        navLinks.style.opacity = '1';

        logo.style.position = 'relative';
        logo.style.top = '0';

        navTog.setAttribute("onclick", "hideMenuItems()");
        navTog.style.transform = "rotateZ(180deg)";
    }
}

function hideMenuItems() {
    if (isMobile()) {
        var navLinks = document.querySelector('.nav-links');
        var navLink = document.querySelectorAll('.nav-link');
        var logo = document.querySelector('.logo');
        var navTog = document.querySelector('.nav-toggle');
        navLinks.style.height = '0';
        navLinks.style.opacity = '0';

        setTimeout(() => {
            navLink.forEach(link => {
                link.style.display = 'none';
            });
        }, 600);

        logo.style.position = 'relative';
        logo.style.top = '0';

        navTog.setAttribute("onclick", "showMenuItems()");
        navTog.style.transform = "rotateZ(0deg)";
    }
}

function consultus() {
    document.getElementById('consult-us').classList.toggle('showx');
}

function setupConsultButtons() {
    document.getElementById("mobile1").onclick = function () {
        if (isMobile()) {
            window.location.href = "tel:+94789797988";
        } else {
            window.open("https://wa.me/94789797988", "_blank");
        }
    };

    document.getElementById("mobile2").onclick = function () {
        if (isMobile()) {
            window.location.href = "tel:+94778941889";
        } else {
            window.open("https://wa.me/94778941889", "_blank");
        }
    };

    document.getElementById("email").onclick = function () {
        window.location.href = "mailto:team@pixellark.com";
    };
}

window.onload = setupConsultButtons;

// Loading screen
window.addEventListener('load', () => {
    // Hide loading screen quickly
    setTimeout(() => {
        var loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 500);

    // Run scripts in smaller chunks
    requestIdleCallback(() => initOtherScripts());
    if (typeof init === "function") {
        requestAnimationFrame(init);
    }
});

// Global variables
let scene, camera, renderer, particles, particleSystem;
let mouse = { x: 0, y: 0 };
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let cubes = [];
let aboutScene, aboutCamera, aboutRenderer;
var i = 0;

// Initialize 3D Scene
function init3D() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded – skipping 3D initialization.');
        return; // 🚀 Stop here safely
    }
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvasContainer').appendChild(renderer.domElement);

    // Create particle system
    createParticleSystem();

    // Create floating cubes
    createFloatingCubes();

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00AEEF, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xFF6C00, 1, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);
}

// Create particle system
function createParticleSystem() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded – skipping 3D initialization.');
        return; // 🚀 Stop here safely
    }

    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (var i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        // Color variation between primary and secondary colors
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.6);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

// Create floating cubes
function createFloatingCubes() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded – skipping 3D initialization.');
        return; // 🚀 Stop here safely
    }

    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (var i = 0; i < 15; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: i % 2 === 0 ? 0x00AEEF : 0xFF6C00,
            transparent: true,
            opacity: 0.8
        });

        const cube = new THREE.Mesh(cubeGeometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );

        // Add random rotation
        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        cube.userData = {
            originalPosition: cube.position.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        };

        cubes.push(cube);
        scene.add(cube);
    }
}

function animate() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded – skipping 3D initialization.');
        return; // 🚀 Stop here safely
    }

    requestAnimationFrame(animate);

    const time = Date.now() * 0.0005;

    // Animate particles
    if (particleSystem) {
        particleSystem.rotation.x = time * 0.1;
        particleSystem.rotation.y = time * 0.2;

        // Move particles based on mouse position
        const positions = particleSystem.geometry.attributes.position.array;
        for (var i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + positions[i] * 0.01) * 0.01;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    // Animate floating cubes
    cubes.forEach((cube, index) => {
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
        cube.rotation.z += cube.userData.rotationSpeed.z;

        // Floating motion
        cube.position.y = cube.userData.originalPosition.y + Math.sin(time + index) * 0.5;
        cube.position.x = cube.userData.originalPosition.x + Math.cos(time * 0.5 + index) * 0.3;

        // Mouse interaction
        const distance = Math.sqrt(
            Math.pow(mouse.x - cube.position.x, 2) +
            Math.pow(mouse.y - cube.position.y, 2)
        );

        if (distance < 5) {
            cube.scale.setScalar(1 + (5 - distance) * 0.1);
        } else {
            cube.scale.setScalar(1);
        }
    });

    // Camera movement based on mouse
    camera.position.x += (mouse.x * 0.001 - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * 0.001 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Render main scene
    renderer.render(scene, camera);
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
        faqAnswer.classList.add('active');
    }
}

// Mouse move handler
function onMouseMove(event) {
    mouse.x = (event.clientX - windowHalfX) / 100;
    mouse.y = (event.clientY - windowHalfY) / 100;
}

// Window resize handler
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded – skipping 3D initialization.');
        return; // 🚀 Stop here safely
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize Common Scripts
function initOtherScripts() {
    startCanvas();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Handle mobile touch events
document.addEventListener('touchmove', function (event) {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX - windowHalfX) / 100;
        mouse.y = (touch.clientY - windowHalfY) / 100;
    }
});

// Advanced interaction tracking
document.addEventListener('DOMContentLoaded', function () {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function () {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0 && maxScroll > 0) {
                gtag('event', 'scroll_depth', {
                    'event_category': 'engagement',
                    'event_label': `${maxScroll}% for the page ${window.location.pathname}`
                });
            }
        }
    });

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function () {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'value': timeSpent,
            'event_label': `for the page ${window.location.pathname}`
        });
    });

    // Track feature card interactions
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            gtag('event', 'feature_hover', {
                'event_category': 'engagement',
                'event_label': `feature_${index + 1} for the page ${window.location.pathname}`
            });
        });
    });

    // Track pricing card interactions
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            gtag('event', 'pricing_hover', {
                'event_category': 'engagement',
                'event_label': `pricing_${index + 1} for the page ${window.location.pathname}`
            });
        });
    });

    // Track CTA button clicks
    document.querySelectorAll('.btn-primary-hero, .btn-pricing-primary').forEach(btn => {
        btn.addEventListener('click', function () {
            gtag('event', 'cta_click', {
                'event_category': 'conversion',
                'event_label': this.textContent.trim() + 'for the page ${window.location.pathname}'
            });
        });
    });
});

// Optional JavaScript for enhanced mobile experience
document.addEventListener('DOMContentLoaded', function () {
    // Add touch-friendly class to body for better touch detection
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('is-touch-device');
    }
});

// Init EmailJS
setTimeout(() => {
    (function () {
        emailjs.init("I28JrTOYr1FeVEz0N"); // Replace with your EmailJS Public Key
    })()
    window.onerror = function (message, source, lineno, colno, error) {
        const errorDetails = `
 Error: ${message}
 Source: ${source}
 Line: ${lineno}, Column: ${colno}
 Stack: ${error?.stack || "N/A"}
   `
        emailjs.send("service_cpnnvze", "template_u56u7no", {
            error_report: errorDetails,
            user_site: window.location.hostname,
            report_time: new Date().toLocaleString()
        }).then(
            () => console.log("Error report sent via EmailJS"),
            (err) => console.error("Failed to send error report", err)
        );
    };
}, 60000);

document.querySelectorAll('.clickable').forEach(el => {
    el.addEventListener('click', consultus);

});

