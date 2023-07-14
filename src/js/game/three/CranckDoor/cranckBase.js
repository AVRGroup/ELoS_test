import * as THREE from 'three';

class Fence extends THREE.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white") { 
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshPhongMaterial({color:color}));
    }
};

class CranckBase extends THREE.Object3D {  
    constructor(){
         super();
         this.index = 0
         this.x = 0
         this.z = 0

         // cranck base
         let cranckFence = new Fence(0.5, 0.5, 0.05, "lightgray");
         //cranckFence.position.set(0, 0, -0.25)
 
         this.add(cranckFence);

         return this;
    }
    
 }

export default CranckBase;
