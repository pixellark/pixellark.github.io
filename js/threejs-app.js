// Main Three.js Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main background scene
    initBackgroundScene();
    
    // Initialize 3D service icons
    initServiceIcons();
    
    // Initialize data visualization
    initDataVisualization();
    
    // Initialize office visualization
    initOfficeVisualization();
    
    // Initialize particles
    initParticles();
});

function initBackgroundScene() {
    const container = document.getElementById('threejs-container');
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Add floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00aeef,
        emissive: 0x003b6f,
        specular: 0x00d4ff,
        shininess: 30,
        transparent: true,
        opacity: 0.6
    });
    
    const shapes = [];
    const numShapes = 15;
    
    for (let i = 0; i < numShapes; i++) {
        const shape = new THREE.Mesh(geometry, material.clone());
        shape.position.x = Math.random() * 40 - 20;
        shape.position.y = Math.random() * 40 - 20;
        shape.position.z = Math.random() * 40 - 20;
        shape.scale.setScalar(Math.random() * 3 + 1);
        shape.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        scene.add(shape);
        shapes.push(shape);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Camera position
    camera.position.z = 30;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        shapes.forEach(shape => {
            shape.rotation.x += 0.002;
            shape.rotation.y += 0.003;
            
            // Float up and down
            shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initServiceIcons() {
    // Implementation for 3D service icons
    const services = [
        { id: 'implementation-icon', color: 0x00aeef, shape: 'box' },
        { id: 'support-icon', color: 0xff6c00, shape: 'sphere' },
        { id: 'optimization-icon', color: 0x00d4ff, shape: 'cylinder' }
    ];
    
    services.forEach(service => {
        const container = document.getElementById(service.id);
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);
        
        let geometry;
        switch(service.shape) {
            case 'box':
                geometry = new THREE.BoxGeometry(2, 2, 2);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                break;
            case 'cylinder':
                geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
                break;
        }
        
        const material = new THREE.MeshPhongMaterial({ 
            color: service.color,
            emissive: 0x003b6f,
            specular: 0xffffff,
            shininess: 50
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(service.color, 0.5);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);
        
        camera.position.z = 5;
        
        // Add hover effect
        container.addEventListener('mouseenter', () => {
            gsap.to(mesh.rotation, { 
                y: mesh.rotation.y + Math.PI * 2, 
                duration: 2,
                ease: "power2.out"
            });
            
            gsap.to(mesh.scale, {
                x: 1.2,
                y: 1.2,
                z: 1.2,
                duration: 0.3
            });
        });
        
        container.addEventListener('mouseleave', () => {
            gsap.to(mesh.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.3
            });
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        
        animate();
    });
}

function initDataVisualization() {
    const container = document.getElementById('data-viz-canvas');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Create data bars
    const bars = [];
    const barWidth = 0.8;
    const barDepth = 0.8;
    const gap = 1.2;
    const numBars = 10;
    
    for (let i = 0; i < numBars; i++) {
        const height = Math.random() * 5 + 1;
        const geometry = new THREE.BoxGeometry(barWidth, height, barDepth);
        const material = new THREE.MeshPhongMaterial({ 
            color: i % 2 === 0 ? 0x00aeef : 0xff6c00,
            emissive: 0x003b6f,
            specular: 0xffffff,
            shininess: 30
        });
        
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = (i - numBars / 2) * gap;
        bar.position.y = height / 2;
        scene.add(bar);
        bars.push({ mesh: bar, targetHeight: height });
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(15, 15, 0xffffff, 0xffffff);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);
    
    // Camera position
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    
    // Handle data type switching
    const vizButtons = document.querySelectorAll('.viz-btn');
    vizButtons.forEach(button => {
        button.addEventListener('click', () => {
            vizButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Animate bars to new heights
            bars.forEach(bar => {
                bar.targetHeight = Math.random() * 5 + 1;
                gsap.to(bar.mesh.scale, {
                    y: bar.targetHeight / bar.mesh.geometry.parameters.height,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });
                
                gsap.to(bar.mesh.position, {
                    y: bar.targetHeight / 2,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate scene slightly
        scene.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function initOfficeVisualization() {
    const container = document.getElementById('office-viz');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Create simple office layout
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
    
    // Add walls
    const wallGeometry = new THREE.BoxGeometry(20, 5, 0.2);
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        roughness: 0.6
    });
    
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -10;
    backWall.position.y = 2.5;
    scene.add(backWall);
    
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -10;
    leftWall.position.y = 2.5;
    scene.add(leftWall);
    
    // Add desks
    const deskGeometry = new THREE.BoxGeometry(3, 0.5, 1.5);
    const deskMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.7
    });
    
    for (let i = 0; i < 4; i++) {
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.x = -6 + i * 4;
        desk.position.z = -5;
        desk.position.y = 0.25;
        scene.add(desk);
        
        // Add computers
        const computerGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
        const computerMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x333333,
            emissive: 0x00aeef,
            emissiveIntensity: 0.2
        });
        
        const computer = new THREE.Mesh(computerGeometry, computerMaterial);
        computer.position.set(desk.position.x, 0.8, desk.position.z - 0.5);
        computer.rotation.y = Math.PI;
        scene.add(computer);
        
        // Add chairs
        const chairGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
        const chairMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x00aeef,
            roughness: 0.5,
            metalness: 0.3
        });
        
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.set(desk.position.x, 0.5, desk.position.z + 1.2);
        scene.add(chair);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Add point lights for computer screens
    const pointLight1 = new THREE.PointLight(0x00aeef, 0.5, 2);
    pointLight1.position.set(-6, 0.8, -5.5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x00aeef, 0.5, 2);
    pointLight2.position.set(-2, 0.8, -5.5);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x00aeef, 0.5, 2);
    pointLight3.position.set(2, 0.8, -5.5);
    scene.add(pointLight3);
    
    const pointLight4 = new THREE.PointLight(0x00aeef, 0.5, 2);
    pointLight4.position.set(6, 0.8, -5.5);
    scene.add(pointLight4);
    
    // Camera position
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate camera around the scene
        camera.position.x = Math.sin(Date.now() * 0.001) * 15;
        camera.position.z = Math.cos(Date.now() * 0.001) * 15;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

function initParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: container, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const posArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
        if (i % 3 === 0) {
            sizeArray[i / 3] = Math.random() * 0.5 + 0.1;
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}