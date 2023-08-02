import * as THREE from 'three';
import {Cranck} from './cranck';

let loader = new THREE.TextureLoader();


// Function to set basic material or textures
// You can set just a color, just a texture or both
function setMaterial(color, file = null, repeatU = 1, repeatV = 1){
    if(!color) color = 'rgb(255,255,255)';
  
    let mat;
    if(!file){
      mat = new THREE.MeshBasicMaterial ({color:color});
    } else {
      mat = new THREE.MeshBasicMaterial({ map: loader.load(file),color:color});
      mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
      mat.map.minFilter = mat.map.magFilter = THREE.LinearFilter;
      mat.map.repeat.set(repeatU,repeatV); 
    }
    return mat;
  }
  const stonePath = new URL('../../../../assets/textures/door2.jpg',import.meta.url).toString();
  let cubeMaterials = [
    setMaterial('lightgray',stonePath), //x+
    setMaterial('lightgray',stonePath), //x-
    setMaterial('gray'), //y+
    setMaterial('lightgray'), //y-
    setMaterial('lightgray'), //z+
    setMaterial('lightgray') //z-
];

class Fence extends THREE.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white") { 
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshPhongMaterial({color:color}));
    }
};

class CranckTorus extends THREE.Mesh {
    constructor() { 
        super(new THREE.TorusGeometry(0.35, 0.05 , 10, 20), new THREE.MeshPhongMaterial({color:"red"})); 
    }
};

class CranckCylinder extends THREE.Mesh {
    constructor(radTop = 0.03, radBot = 0.03, height = 0.4, radSeg = 12, HeigSeg = 12, color = "red") { 
        super(new THREE.CylinderGeometry(radTop, radBot, height, radSeg, HeigSeg), new THREE.MeshPhongMaterial({color:color})); 
    }
};

class DoorBase extends THREE.Mesh {
    constructor(color = "white", width = 0.15, height = 2,  depth = 0.1) { 
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshLambertMaterial({color: color}));
    }
};

class Door extends THREE.Mesh {
    constructor(color) { 
        super(new THREE.BoxGeometry(0.2, 1.9, 2), cubeMaterials);
    }
};

class CranckDoor extends THREE.Object3D {  
   constructor(cranck){
        super();
        this.index = 0
        this.x = 0
        this.z = 0
        this.active = true
        this.cranck = cranck

        // door base
        let doorBase1 = new DoorBase;
        doorBase1.rotateX(-Math.PI / 2)
        doorBase1.position.set(0.175, -0.95, 0)

        let doorBase2 = new DoorBase;
        doorBase2.rotateX(-Math.PI / 2)
        doorBase2.position.set(-0.175, -0.95, 0)

        let doorBase3 = new DoorBase("black", 0.2, 2, 0.01);
        doorBase3.rotateX(-Math.PI / 2)
        doorBase3.position.set(0, -0.95, 0)
        
        // door
        let door = new Door
        door.position.set(0,0,0)
        this.doorY = door.position.y
        this.doors = [door]
        
        // fences
        let doorFence1 = new Fence(0.5, 2, 0.1);
        doorFence1.position.set(0, 0, -0.98)
        
        let doorFence2 = new Fence(0.5, 2, 0.1);
        doorFence2.position.set(0, 0, 0.98)
        
        let doorFence3 = new Fence(0.15, 2, 0.1);
        doorFence3.position.set(0.175, 0, 0.92)

        let doorFence4 = new Fence(0.15, 2, 0.1);
        doorFence4.position.set(-0.175, 0, 0.92)

        let doorFence5 = new Fence(0.15, 2, 0.1);
        doorFence5.position.set(0.175, 0, -0.92)

        let doorFence6 = new Fence(0.15, 2, 0.1);
        doorFence6.position.set(-0.175, 0, -0.92)

        // cranck torus
        let cranckFence = new Fence(0.5, 0.5, 0.05, "lightgray");
        cranckFence.position.set(-2, 0, -0.995)

        //let cranck = new Cranck;
        //this.cranck.position.set(-2, 0, -0.75)
        this.crancks = [this.cranck]


        this.add(doorBase1);
        this.add(doorBase2);
        this.add(doorBase3);
        this.add(door);
        this.add(doorFence1);
        this.add(doorFence2);
        this.add(doorFence3);
        this.add(doorFence4);
        this.add(doorFence5);
        this.add(doorFence6);
        //this.add(cranck);

        return this;
   }

   setVisible()
   {
        this.cranckDoors.forEach(door => door.visible = true)
        this.active = true
   }

   setNotVisible(){
        this.cranckDoors.forEach(door => door.visible = false)
        this.active = false
   }
   rotateCranckZ(angle){
    this.crancks.forEach(cranck => cranck.rotateZ(angle))
   }
   lerpDoor(mode, height){
    if(mode == 0)    
        this.doors.forEach(door => door.position.lerp(new THREE.Vector3(door.position.x, height, door.position.z), 0.03))
    else 
        this.doors.forEach(door => door.position.lerp(new THREE.Vector3(door.position.x, height, door.position.z), 0.03))
   }
   getDoorY(){
        return this.doors[0].position.y
   }
   resetPos(){
        this.doors.forEach(door => door.position.y = 0)
   }
   cranckPosition(x, z){
        this.cranck.position.x =  x
        this.cranck.position.z =  z
   }
}

export default CranckDoor;

