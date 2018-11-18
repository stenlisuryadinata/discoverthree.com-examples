// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

function init() {

  container = document.querySelector( '#container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  initCamera();
  initControls();
  initLights();
  initMeshes();
  initRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function initCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 100 );
  camera.position.set( -5, 5, 7 );

}

function initControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function initLights() {

  const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
  scene.add( ambientLight );

  const frontLight = new THREE.DirectionalLight( 0xffffff, 1 );
  frontLight.position.set( 10, 10, 10 );

  const backLight = new THREE.DirectionalLight( 0xffffff, 1 );
  backLight.position.set( -10, 10, -10 );

  scene.add( frontLight, backLight );

}

function initMaterials() {

  const textureLoader = new THREE.TextureLoader();

  // const diffuseMap = textureLoader.load( 'textures/uv_test.png' );
  const diffuseMap = textureLoader.load( 'textures/greasy-pan-2-albedo.png' );
  diffuseMap.anisotropy = 16;

  const normalMap = textureLoader.load( 'textures/greasy-pan-2-normal.png' );
  const roughnessMap = textureLoader.load( 'textures/greasy-pan-2-roughness.png' );
  const metalnessMap = textureLoader.load( 'textures/greasy-pan-2-metal.png' );

  const materials = {};

  materials.body = new THREE.MeshStandardMaterial( {
    color: 0x551111,
    map: diffuseMap,
    normalMap,
    roughnessMap,
    metalnessMap,
    roughness: 1,
    metalness: 1,
  } );

  materials.detail = new THREE.MeshStandardMaterial( {
    color: 0x333333,
    // normalMap,
    // roughnessMap,
    roughness: 0.25,
    metalness: 0,
  } );

  return materials;

}

function initMeshes() {

  // create a Group to hold the pieces of the train
  const train = new THREE.Group();
  scene.add( train );

  const materials = initMaterials();

  const noseGeometry = new THREE.CylinderBufferGeometry( 0.75, 0.75, 3, 12 );
  const nose = new THREE.Mesh( noseGeometry, materials.body );
  nose.rotation.set( Math.PI / 2, 0, Math.PI / 2 );
  nose.position.x = -1;

  const cabinGeometry = new THREE.BoxBufferGeometry( 2, 2.25, 1.5 );
  const cabin = new THREE.Mesh( cabinGeometry, materials.body );
  cabin.position.set( 1.5, 0.4, 0 );

  train.add( cabin, nose );

  const wheelGeo = new THREE.CylinderBufferGeometry( 0.4, 0.4, 1.75, 16 );
  wheelGeo.rotateX( Math.PI / 2 );

  const smallWheelRear = new THREE.Mesh( wheelGeo, materials.detail );
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
  const chimney = new THREE.Mesh( chimneyGeometry, materials.detail );
  chimney.position.set( -2, 0.9, 0 );

  train.add( chimney );

}

function initRenderer() {

  // create a WebGLRenderer and set its width and height
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