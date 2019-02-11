import {
  Color,
} from './vendor/three/three.module.js';

import App from './vendor/App.module.js';

import createLights from './lights.js';
import createMeshes from './meshes.js';
import loadModels from './models.js';

async function initScene() {

  const app = new App( '#scene-container' );

  app.init();

  app.scene.background = new Color( 0x8FBCD4 );
  app.camera.position.set( -20, 30, 30 );

  setupRenderer( app.renderer );

  const lights = createLights();
  app.scene.add( lights.ambient, lights.main );

  app.scene.add( new PointLightHelper( lights.main ) );
  app.scene.add( new THREE.CameraHelper( lights.main.shadow.camera ) );

  const meshes = createMeshes();
  app.scene.add( meshes.plinth, meshes.shapes );

  const models = await loadModels();
  app.scene.add( ...models.horsesArray );

  app.start();
}

initScene();
