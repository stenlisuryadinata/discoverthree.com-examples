// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 100 );
  camera.position.set( -5, 5, 7 );

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 2 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function createMeshes() {

  // create a Group to hold the pieces of the train
  const train = new THREE.Group();
  scene.add( train );

  const bodyMaterial = new THREE.MeshStandardMaterial( {
    color: 0xff3333, // red
    flatShading: true,
  } );

  const detailMaterial = new THREE.MeshStandardMaterial( {
    color: 0x333333, // darkgrey
    flatShading: true,
  } );

  const noseGeometry = new THREE.CylinderBufferGeometry( 0.75, 0.75, 3, 12 );
  const nose = new THREE.Mesh( noseGeometry, bodyMaterial );
  nose.rotation.z = Math.PI / 2;
  nose.position.x = -1;

  const cabinGeometry = new THREE.BoxBufferGeometry( 2, 2.25, 1.5 );
  const cabin = new THREE.Mesh( cabinGeometry, bodyMaterial );
  cabin.position.set( 1.5, 0.4, 0 );

  train.add( nose, cabin );

  const wheelGeo = new THREE.CylinderBufferGeometry( 0.4, 0.4, 1.75, 16 );
  wheelGeo.rotateX( Math.PI / 2 );

  const smallWheelRear = new THREE.Mesh( wheelGeo, detailMaterial );
  smallWheelRear.position.set( 0, -0.5, 0 );

  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;

  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;

  const bigWheel = smallWheelRear.clone();
  bigWheel.scale.set( 2, 2, 1.25 );
  bigWheel.position.set( 1.5, -0.1, 0 );

  train.add( smallWheelRear, smallWheelCenter, smallWheelFront, bigWheel );

  const chimneyGeometry = new THREE.CylinderBufferGeometry( 0.3, 0.1, 0.5 );
  const chimney = new THREE.Mesh( chimneyGeometry, detailMaterial );
  chimney.position.set( -2, 0.9, 0 );

  train.add( chimney );

}

function createRenderer() {

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  // add the automatically created <canvas> element to the page
  container.appendChild( renderer.domElement );

}

function update() {}

function render() {

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();
