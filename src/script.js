import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshStandardMaterial, MeshPhongMaterial } from "three";
import "./style.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Черный цвет фона
const canvas = document.querySelector(".canvas");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

// Объект
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.CircleGeometry(1, 20, 0, Math.PI)
// const geometry = new THREE.PlaneGeometry(1,1,10,10)
// const geometry = new THREE.ConeGeometry(1,2,32,3, true, 0, Math.PI)
// const geometry = new THREE.CylinderGeometry(1,1,2, 66, 4, true)
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100)
// const geometry = new THREE.TorusKnotGeometry(1, 0.25, 190, 16, 1, 5);
// const geometry = new THREE.DodecahedronGeometry(1,0)
// const geometry = new THREE.OctahedronGeometry(1,0)
// const geometry = new THREE.TetrahedronGeometry(1,0)
// const geometry = new THREE.IcosahedronGeometry(1,0)
// const geometry = new THREE.SphereGeometry(1,32,16,0, )


// const amount = 50
// const points = new Float32Array(amount *3*3)
// for(let i = 0; i <amount*3*3; i++){
//     points[i] = (Math.random() - 0.5)*4
// }

// const pointsBuffer = new THREE.BufferAttribute(points, 3)
// geometry.setAttribute('position',pointsBuffer)

// const material = new THREE.MeshBasicMaterial({
//   color: "pink",
//   wireframe: true,
// });

const light = new THREE.PointLight(0xff00ff, 1, 90);
light.position.set(-1, 1, 2); // Позиция света (слева вверху)
scene.add(light);

const lightTarget = new THREE.Object3D();
lightTarget.position.set(0, 0, 0); // Позиция цели света (середина сцены)
scene.add(lightTarget);

light.target = lightTarget; // Назначаем цель свету

scene.add(light); // Добавляем свет в сцену

// Создаем второй источник света
const light2 = new THREE.PointLight(0xff0000, 1, 10); // Цвет, интенсивность и расстояние
light2.position.set(1, -1, -2); // Позиция света (справа снизу сзади)
scene.add(light2);

// Создаем цель второго источника света
const lightTarget2 = new THREE.Object3D();
lightTarget2.position.set(0, 0, 0); // Позиция цели в середине сцены
scene.add(lightTarget2);

light2.target = lightTarget2; // Назначаем цель второму источнику света

scene.add(light2); // Добавляем второй источник света в сцену

const ambientLight = new THREE.AmbientLight(0x402080); // Цвет окружающего света
scene.add(ambientLight);


// Создаем третий источник света
const light3 = new THREE.PointLight(0x00ff00, 1, 90); // Зеленый цвет, интенсивность и расстояние
light3.position.set(1, 1, 2); // Позиция света (справа вверху)
scene.add(light3);

// Создаем цель третьего источника света
const lightTarget3 = new THREE.Object3D();
lightTarget3.position.set(0, 0, 0); // Позиция цели в середине сцены
scene.add(lightTarget3);

light3.target = lightTarget3; // Назначаем цель третьему источнику света

scene.add(light3); // Добавляем третий источник света в сцену

// Создаем третий источник света
const light4 = new THREE.PointLight(0x00ff00, 1, 10); // Зеленый цвет, интенсивность и расстояние
light4.position.set(-1, 1, -2); // Позиция света (справа вверху)
scene.add(light4);

// Создаем цель третьего источника света
const lightTarget4 = new THREE.Object3D();
lightTarget4.position.set(0, 0, 0); // Позиция цели в середине сцены
scene.add(lightTarget4);

light3.target = lightTarget4; // Назначаем цель третьему источнику света

scene.add(light4); // Добавляем третий источник света в сцену



const material = new THREE.MeshPhongMaterial({
  color: "pink", // цвет объекта
  shininess:490,  // степень блеска (меньше значение, больше блеска)
  specular: "pink", // цвет блеска
  side: THREE.DoubleSide, // Применить материал к обеим сторонам
  flatShading: false ,
  roughness: 0.2,  
  metalness: 1, 
});
// const material = new THREE.MeshStandardMaterial({
//   color: "pink", // цвет объекта
//   metalness: 1,    // степень металличности (от 0 до 1)
//   roughness: 0.2,  // шероховатость поверхности (меньше значение, гладче)
// });

const mesh = new THREE.Mesh(geometry, material);


scene.add(mesh);


const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  console.log("ops");
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
