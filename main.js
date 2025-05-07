// Initialisation de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Ajout d'un effet de grille futuriste
const gridHelper = new THREE.GridHelper(50, 50, 0x00ff00, 0x00ff00);
scene.add(gridHelper);

// Lumières futuristes
const pointLight = new THREE.PointLight(0x00ffcc, 2, 50);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Création d'un réseau de particules (points lumineux)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0x00ffcc, size: 0.2 });
const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleMesh);

// Liste des technologies avec leur image
const technologies = [
    { name: "Docker", img: "docker.png", position: { x: -6, y: 3, z: -10 } },
    { name: "Kubernetes", img: "kubernetes.png", position: { x: -2, y: 3, z: -10 } },
    { name: "Nextcloud", img: "nextcloud.png", position: { x: 2, y: 3, z: -10 } },
    { name: "Ansible", img: "ansible.png", position: { x: 6, y: 3, z: -10 } },
    { name: "Terraform", img: "terraform.png", position: { x: -4, y: -1, z: -10 } },
    { name: "Réseau", img: "network.png", position: { x: 0, y: -1, z: -10 } },
    { name: "SDN", img: "sdn.png", position: { x: 4, y: -1, z: -10 } },
    { name: "SD-WAN", img: "sd-wan.png", position: { x: 8, y: -1, z: -10 } }
];

// Charger les textures et créer les panneaux 3D
const textureLoader = new THREE.TextureLoader();
const panels = [];

technologies.forEach((tech) => {
    const texture = textureLoader.load(tech.img);
    const geometry = new THREE.PlaneGeometry(3, 3);  // Panneaux carrés 3D
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const panel = new THREE.Mesh(geometry, material);

    // Position des panneaux
    panel.position.set(tech.position.x, tech.position.y, tech.position.z);
    scene.add(panel);
    panels.push(panel);
});

// Animation principale
function animate() {
    requestAnimationFrame(animate);

    // Faire tourner chaque panneau sur l'axe Y
    panels.forEach(panel => {
        panel.rotation.y += 0.01;  // Ajuste la vitesse de rotation ici
    });

    particleMesh.rotation.y += 0.001;  // Rotation des particules
    renderer.render(scene, camera);
}
animate();

// Ajustement de la caméra
camera.position.z = 12;
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Interaction : Rotation et Zoom sur un élément au clic
document.addEventListener('click', (event) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    // Convertir les coordonnées de la souris
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Vérifier s'il y a un panneau cliqué
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(panels);

    if (intersects.length > 0) {
        const targetPanel = intersects[0].object;

        // Animation du zoom et rotation
        gsap.to(camera.position, {
            z: 6,
            x: targetPanel.position.x,
            y: targetPanel.position.y,
            duration: 1
        });

        // Retour automatique après 3 secondes
        setTimeout(() => {
            gsap.to(camera.position, {
                z: 12,
                x: 0,
                y: 0,
                duration: 1
            });
        }, 3000);
    }
});
