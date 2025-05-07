// Initialisation de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Couleur de fond professionnelle (bleu foncé/gris)
scene.background = new THREE.Color(0x0a192f);

// Ajout d'un effet de grille subtil
const gridHelper = new THREE.GridHelper(30, 30, 0x1a3a6e, 0x1a3a6e);
gridHelper.position.y = -5;
scene.add(gridHelper);

// Éclairage doux et professionnel
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Particules discrètes (représentant des données financières)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 150;
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 40;
    colors[i] = Math.random() * 0.5 + 0.5; // Nuances de bleu/blanc
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleMesh);

// Icônes professionnelles pour un fiscaliste
const technologies = [
    { name: "Comptabilité", img: "accounting.png", position: { x: -6, y: 2, z: -8 } },
    { name: "Fiscalité", img: "tax.png", position: { x: -2, y: 2, z: -8 } },
    { name: "TVA", img: "vat.png", position: { x: 2, y: 2, z: -8 } },
    { name: "Bilan", img: "balance.png", position: { x: 6, y: 2, z: -8 } },
    { name: "Excel", img: "excel.png", position: { x: -4, y: -2, z: -8 } },
    { name: "Sage", img: "sage.png", position: { x: 0, y: -2, z: -8 } },
    { name: "Législation", img: "law.png", position: { x: 4, y: -2, z: -8 } },
    { name: "Audit", img: "audit.png", position: { x: 8, y: -2, z: -8 } }
];

// Charger les textures
const textureLoader = new THREE.TextureLoader();
const panels = [];

technologies.forEach((tech) => {
    textureLoader.load(tech.img, (texture) => {
        const geometry = new THREE.PlaneGeometry(2.5, 2.5);
        const material = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true,
            opacity: 0.9
        });
        const panel = new THREE.Mesh(geometry, material);
        
        panel.position.set(tech.position.x, tech.position.y, tech.position.z);
        scene.add(panel);
        panels.push(panel);
    });
});

// Animation fluide et professionnelle
function animate() {
    requestAnimationFrame(animate);

    // Rotation très lente des icônes
    panels.forEach(panel => {
        panel.rotation.y += 0.002;
    });

    // Mouvement subtil des particules
    particleMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
}
animate();

// Position initiale de la caméra
camera.position.z = 15;
camera.position.y = 2;

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Interaction professionnelle au survol
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Déplacement léger de la caméra
    camera.position.x = mouseX * 0.5;
    camera.position.y = mouseY * 0.5 + 2;
    camera.lookAt(0, 0, 0);
});
