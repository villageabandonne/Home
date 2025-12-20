import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

let pyramid;

loader.load( 'static/pyramid.glb', function ( gltf ) {
    console.log(gltf)
    pyramid = gltf.scene;
    pyramid.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            const edges = new THREE.EdgesGeometry(child.geometry);
            const lines = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({ color: 0x000000 })
            );
            child.add(lines);
        }
    });
    scene.add( pyramid );
}, undefined, function ( error ) {
    console.error( error );
} );

camera.position.z = 8;
camera.position.y = 1.5;

function animate() {
    if (pyramid) {
        pyramid.rotation.y += 0.01;
    }
    renderer.render( scene, camera );
}