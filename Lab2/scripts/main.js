import * as THREE from '/lib/three.module.js';


var x = 0;
var y = 0;
var z = 5;
var renderer, camera, scene;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    var box = getBox(1, 1, 1);
    var plane = getPlane(5);
    var sphere = getSphere(0.5);
    var prism = getPrism(2, 2);
    plane.position.z = -2;
    sphere.position.y = 1;
    prism.position.y = 1;
    prism.position.x = 2;
    scene.add(box);
    scene.add(plane);
    scene.add(sphere);
    scene.add(prism);
    var light = getPointLight(100);
    light.position.set(1, 0, 5);
    scene.add(light);

    camera.position.z = z;
    camera.position.y = y;
    camera.position.x = x;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webGL').appendChild(renderer.domElement);
    updateScene();


}

init();

function getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({ color: 0xA03F28 });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;

}

function getPlane(size) {
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getSphere(size) {
    var geometry = new THREE.SphereGeometry(size, 24, 24);
    var material = new THREE.MeshPhongMaterial({ color: 0xF9E09F });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function getPrism(height, radius) {
    var geometry = new THREE.CylinderGeometry(0, radius, height, 3);
    var material = new THREE.MeshPhongMaterial({ color: 0x496727 });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
}
function getPointLight(intensity) {
    var light = new THREE.PointLight(0xffffff, intensity);
    return light;
}














var changePersitve = function (keyCode, distanceToMove) {
    if (keyCode === 87) { // W key
        camera.position.y -= distanceToMove;
    } else if (keyCode === 83) { // S key
        camera.position.y += distanceToMove;
    } else if (keyCode === 65) { // A key
        camera.position.x += distanceToMove;
    } else if (keyCode === 68) { // D key
        camera.position.x -= distanceToMove;
    } else if (keyCode === 81) { // Q key
        camera.position.z += distanceToMove;
    } else if (keyCode === 69) { // E key
        camera.position.z -= distanceToMove;
    } else if (keyCode === 70) { // F key
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    updateScene();
}


var getInput = function (event) {
    {
        var keyCode = event.keyCode;
        changePersitve(keyCode, 0.1);
    }
    console.log(Math.round(camera.position.x * 10) / 10 + " " + Math.round(camera.position.y * 10) / 10 + " " + Math.round(camera.position.z * 10) / 10);
};




function updateScene() {
    renderer.render(scene, camera);
}



document.addEventListener('keydown', getInput);

var mouseDown = false;
var lastY = 0;
var lastX = 0;

document.addEventListener('mousedown', function (e) {
    mouseDown = true;
    lastY = e.clientY;
    lastX = e.clientX;
});

document.addEventListener('mouseup', function (e) {
    mouseDown = false;
});

document.addEventListener('mousemove', function (e) {
    if (mouseDown) {
        var deltaY = e.clientY - lastY;
        var deltaX = e.clientX - lastX;
        var speed = 0.1;
        if (deltaY < 0) changePersitve('W'.charCodeAt(0), speed);

        else if (deltaY > 0) changePersitve('S'.charCodeAt(0), speed);


        if (deltaX < 0) changePersitve('A'.charCodeAt(0), speed);
        else if (deltaX > 0) changePersitve('D'.charCodeAt(0), speed);

        camera.lookAt(new THREE.Vector3(0, 0, 0));

        lastY = e.clientY;
        lastX = e.clientX;
    }
});

document.addEventListener('wheel', function (e) {
    var speed = 1;
    if (e.deltaY > 0) changePersitve('Q'.charCodeAt(0), speed);
    else if (e.deltaY < 0) changePersitve('E'.charCodeAt(0), speed);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

});