import * as THREE from  'three';
import KeyboardState from '../libs/util/KeyboardState.js'
import {TeapotGeometry} from '../build/jsm/geometries/TeapotGeometry.js';
import {initRenderer, 
        initDefaultSpotlight,
        createGroundPlaneXZ,
        SecondaryBox, 
        onWindowResize} from "../libs/util/util.js";

let scene, renderer, light, camera, keyboard;
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // View function in util/utils
light = initDefaultSpotlight(scene, new THREE.Vector3(5.0, 5.0, 5.0)); // Use default light    
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );
keyboard = new KeyboardState();

var groundPlane = createGroundPlaneXZ(10, 10, 40, 40); // width, height, resolutionW, resolutionH
scene.add(groundPlane);

// Create objects
createTeapot( 2.0,  0.4,  0.0, Math.random() * 0xffffff);
createTeapot(0.0,  0.4,  2.0, Math.random() * 0xffffff);  
createTeapot(0.0,  0.4, -2.0, Math.random() * 0xffffff);    

let camPos  = new THREE.Vector3(3.0, 4.0, 8.0);
let camUp   = new THREE.Vector3(0.0, 1.0, 0.0);
let camLook = new THREE.Vector3(0.0, 0.0, 0.0);
var message = new SecondaryBox("");

// Main camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.copy(camPos);
   camera.up.copy( camUp );
   camera.lookAt(camLook);

render();

function updateCamera()
{
   // DICA: Atualize a câmera aqui!
   if(keyboard.pressed("W")){
      camLook.z += 0.1;
      camera.lookAt(camLook);
   }
   if(keyboard.pressed("S")){
      camLook.z -= 0.1;
      camera.lookAt(camLook);
   }
   if(keyboard.pressed("D")){
      camLook.x += 0.1;
      camera.lookAt(camLook);
   }
   if(keyboard.pressed("A")){
      camLook.x -= 0.1;
      camera.lookAt(camLook);
   }
   if(keyboard.pressed("Q")){
      camLook.y += 0.1;
      camera.lookAt(camLook);
   }
   if(keyboard.pressed("E")){
      camLook.y -= 0.1;
      camera.lookAt(camLook);
   }

   message.changeMessage("Pos: {" + camPos.x.toFixed(4) + ", " + camPos.y.toFixed(4) + ", " + camPos.z.toFixed(4) + "} " + 
                         "/ LookAt: {" + camLook.x.toFixed(4) + ", " + camLook.y.toFixed(4) + ", " + camLook.z.toFixed(4) + "}");
}

function keyboardUpdate() {

   keyboard.update();
   
   // DICA: Insira aqui seu código para mover a câmera
   if(keyboard.pressed("up")){
      camPos.y += 0.02;
      camera.position.set(camPos.x, camPos.y, camPos.z)
   }
   if(keyboard.pressed("down")){
      camPos.y -= 0.02;
      camera.position.set(camPos.x, camPos.y, camPos.z)
   }
   if(keyboard.pressed("right")){
      camPos.x += 0.02;
      camera.position.set(camPos.x, camPos.y, camPos.z)
   }
   if(keyboard.pressed("left")){
      camPos.x -= 0.02;
      camera.position.set(camPos.x, camPos.y, camPos.z)
   }
   if(keyboard.pressed("pageup")){
      camPos.z += 0.02;
      camera.position.set(camPos.x, camPos.y, camPos.z)
   }
   if(keyboard.pressed("pagedown")){
      camPos.z -= 0.02;
      camera.position.set(camPos.x, camPos.y, camPos.z)
   }
   
   updateCamera();
}

function createTeapot(x, y, z, color )
{
   var geometry = new TeapotGeometry(0.5);
   var material = new THREE.MeshPhongMaterial({color, shininess:"200"});
      material.side = THREE.DoubleSide;
   var obj = new THREE.Mesh(geometry, material);
      obj.castShadow = true;
      obj.position.set(x, y, z);
   scene.add(obj);
}

function render()
{
   requestAnimationFrame(render);
   keyboardUpdate();
   renderer.render(scene, camera) // Render scene
}