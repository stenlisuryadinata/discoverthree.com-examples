import {
  WebGLRenderTarget,
} from './vendor/three/three.module.js';

function initRenderTarget() {

  const target = new WebGLRenderTarget( 1024, 1024 );

  // You could enable this for an addition performance gain
  // but only if your sceneRT doesn't contain any overlapping geometry
  // target.depthBuffer = false;

  console.log( 'Here\'s the target you just created: ', target );

  console.log( 'And here\'s the target.texture, which we can treat like any other texture (e.g., assign to it a material.map): ', target.texture );

  return target;

}
