async function initScene() {

  const app = new THREE_APP( '#container' );

  app.init();

  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.camera.position.set( -20, 30, 50 );

  setupRenderer( app.renderer );

  const lights = createLights();
  app.scene.add( lights.ambient, lights.main );

  app.scene.add( new THREE.DirectionalLightHelper( lights.main ) );
  app.scene.add( new THREE.CameraHelper( lights.main.shadow.camera ) );

  const meshes = createMeshes();
  app.scene.add( meshes.plinth, meshes.shapes );

  const models = await loadModels();
  app.scene.add( ...models.horsesArray );

  const shadowMesh = initGroundShadow();
  app.scene.add( shadowMesh );

  initMaterialControl( shadowMesh.material );

  app.start();
}

initScene();
