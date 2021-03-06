import * as lgl from '../lglexample';
import { mat4 } from 'gl-matrix';

// Textures
const earthmap1k : string = require('../resources/textures/earthmap1k.jpg');
const earthbump1k : string = require('../resources/textures/earthbump1k.jpg');

// Loads file system implementation in parcel
// * can only call synchronous functions *
const fs : any = require('fs');

var __dirname : string;

function main() {
  let gl = lgl.setup(render);

  // Compile our shaders.
  let program = lgl.compileProgram(gl,
    require('./vertex.lgl'),
    require('./fragment.lgl')
  );

  // Uniform and attribute locations.
  let loc_uProjection = lgl.uniformLoc(gl, program, 'uProjection');
  let loc_uView = lgl.uniformLoc(gl, program, 'uView');
  let loc_uModel = lgl.uniformLoc(gl, program, 'uModel');
  let loc_aPosition = lgl.attribLoc(gl, program, 'aPosition');
  let loc_uNormal = lgl.attribLoc(gl, location, 'uNormal');

  
  // Texture things
  let loc_aTexCoord = lgl.attribLoc(gl, program, 'aTexCoord');
  let loc_uTexture = lgl.uniformLoc(gl, program, 'uTexture');
  let loc_aDerivU = lgl.uniformLoc(gl, program, 'aDerivU');
  let loc_aDerivV = lgl.uniformLoc(gl, program, 'aDerivV');
  let loc_aNormal = lgl.uniformLoc(gl, program, 'aNormal');
  let loc_aUv = lgl.uniformLoc(gl, program, 'aUv');



  // Read in lpshead obj
  // URL must be statically analyzable other than (__dirname) and (__filename)
  let src = fs.readFileSync(__dirname + './../resources/OBJ/sphere_highres.obj', 'utf8');

  let mesh = lgl.load_obj (gl, src);

  // Initialize the model position.
  let model = mat4.create();

  // Load image texture
  lgl.load_texture(gl, earthmap1k);

  function render(view: mat4, projection: mat4) {
    // Rotate the model a little bit on each frame.
    mat4.rotateY(model, model, .01);

    // Use our shader pair.
    gl.useProgram(program);

    // Set the shader "uniform" parameters.
    gl.uniformMatrix4fv(loc_uProjection, false, projection);
    gl.uniformMatrix4fv(loc_uView, false, view);
    gl.uniformMatrix4fv(loc_uModel, false, model);
    
    // Use texture unit 0 for uTexture
    gl.uniform1i(loc_uTexture, 0);
  
    // Set the attribute arrays.
    lgl.bind_attrib_buffer(gl, loc_aPosition, mesh.positions, 3);
    lgl.bind_attrib_buffer(gl, loc_aTexCoord, mesh.texcoords, 2);
    // lgl.bind_attrib_buffer(gl, loc_aDerivU, mesh.derivU, 2); // TODO 
   
    // Draw the object.
    lgl.drawMesh(gl, mesh);
  }
}

main();
