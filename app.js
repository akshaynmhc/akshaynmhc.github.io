// Variables for setup

let container;
let camera;
let renderer;
let scene;
let hoodie;
let controls;

function init(){
    container = document.querySelector('.scene');

    //Create Scene
    scene = new THREE.Scene();
    
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    //Camera Setup

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,5,10);

    const ambient = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10,10,30);
    scene.add(light);

    // Orbit Control

   // controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', renderer)

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    // Load Model
    let loader = new THREE.GLTFLoader();
    loader.load('./hoodie/mhcscene.gltf', function(gltf){
        scene.add(gltf.scene);
        hoodie = gltf.scene.children[0];
        animate();
    })
}

function animate(){
    requestAnimationFrame(animate);
    hoodie.rotation.z += .01;
    renderer.render(scene, camera);
}

init()