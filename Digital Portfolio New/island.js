import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//get the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: the_island });
renderer.outputColorSpace = THREE.SRGBColorSpace;

//make render box
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
renderer.setClearColor(0x2b2b2b);
renderer.setPixelRatio(window.devicePixelRatio);

//create shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

//create scene
const scene = new THREE.Scene();

//create camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(3, 2, 2);
camera.lookAt(0,0,0);


//move camera around

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.autoRotate = false;
controls.update();


//make ground plane
const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555, //is gray
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;
//scene.add(groundMesh);

//make spotlight
const spotLight = new THREE.SpotLight(0xffffff, 3, 100, .22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -.001;
scene.add(spotLight);

//make spotlight
const spotLight2 = new THREE.DirectionalLight(0x241109, 3, 60, .22, 1);
spotLight2.castShadow = true;
spotLight2.shadow.bias = -.001;
spotLight2.position.set(0,-40,0);
scene.add(spotLight2);

//hemispheric light?
const upColor = 0xffffff;
const downColor = 0x777777;
const light = new THREE.HemisphereLight(upColor, downColor, 0.5);
scene.add(light)

let mixer;

//get the obj
const loader = new GLTFLoader();
loader.load('/Digital Portfolio New/3D Assets/lopoly island 3.glb', (gltf) => {
    const mesh = gltf.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    //add animation
    mixer = new THREE.AnimationMixer(mesh);
    const clips = gltf.animations;
    //const clip = THREE.AnimationClip.findByName(clips,'Cube.085Action');
    //const action = mixer.clipAction(clip);
    //action.play();
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });
});

const clock = new THREE.Clock();
//function for loading the scene
function animate() {
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (mixer)
        mixer.update(clock.getDelta());controls.update();
  }
  
  //call the function
  animate();