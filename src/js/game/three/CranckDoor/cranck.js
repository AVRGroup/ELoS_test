import * as THREE from 'three';

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

class Fence extends THREE.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white") { 
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshPhongMaterial({color:color}));
    }
};

class Cranck extends THREE.Object3D {  
    constructor(){
         super();
         this.index = 0
         this.x = 0
         this.z = 0
         this.active = true
 
         // cranck torus
         let cranckTorus = new CranckTorus;
         cranckTorus.position.set(0,0,0)

         // cranck cylinders
         let CranckCylinder1 = new CranckCylinder;
         CranckCylinder1.position.set(0,0.17,0)
         let CranckCylinder2 = new CranckCylinder;
         CranckCylinder2.rotateZ(Math.PI/3.5)
         CranckCylinder2.position.set(0.15,-0.12,0)
         let CranckCylinder3 = new CranckCylinder;
         CranckCylinder3.rotateZ(Math.PI/-3.5)
         CranckCylinder3.position.set(-0.14,-0.11,0)
         let CranckCylinder4 = new CranckCylinder(0.08,0.08, 0.06, 12, 12, "red");
         CranckCylinder4.rotateX(Math.PI/2)
         CranckCylinder4.position.set(0,0,0)
         let CranckCylinder5 = new CranckCylinder(0.065,0.065, 0.061, 12, 12, "lightgray");
         CranckCylinder5.rotateX(Math.PI/2)
         CranckCylinder5.position.set(0,0,0)
         let CranckCylinder6 = new CranckCylinder(0.045,0.045, 0.075, 6, 12, "gray");
         CranckCylinder6.rotateX(Math.PI/2)
         CranckCylinder6.position.set(0,0,0)
         let CranckCylinder7 = new CranckCylinder(0.02,0.035, 0.2, 12, 12, "gray");
         CranckCylinder7.rotateX(Math.PI/2)
         CranckCylinder7.position.set(0,0,-0.1)
         let CranckCylinder8 = new CranckCylinder(0.05,0.05, 0.07, 6, 12, "gray");
         CranckCylinder8.rotateX(Math.PI/2)
         CranckCylinder8.position.set(0,0,-0.2)
         let cranckFence = new Fence(0.5, 0.5, 0.05, "lightgray");
         cranckFence.position.set(0, 0, -0.25)
 
         this.add(cranckTorus);
         this.add(CranckCylinder1);
         this.add(CranckCylinder2);
         this.add(CranckCylinder3);
         this.add(CranckCylinder4);
         this.add(CranckCylinder5);
         this.add(CranckCylinder6);
         this.add(CranckCylinder7);
         this.add(CranckCylinder8);
         //this.add(cranckFence);

         return this;
    }
    correctPos(dir, reference, base){
        if(dir == 'right'){
            this.position.set(this.position.x, this.position.y, this.position.z-0.72)
            reference.position.set(this.position.x, this.position.y, this.position.z-2)
            base.position.set(this.position.x, this.position.y, this.position.z-0.25)
        }
        else if(dir == 'left'){
            this.rotateY(Math.PI)
            this.position.set(this.position.x, this.position.y, this.position.z+0.72)
            reference.position.set(this.position.x, this.position.y, this.position.z+2)
            base.position.set(this.position.x, this.position.y, this.position.z+0.25)
        }
        else if(dir == 'down'){
            this.rotateY(-Math.PI/2)
            this.position.set(this.position.x+0.72, this.position.y, this.position.z)
            reference.position.set(this.position.x+1, this.position.y, this.position.z)
            base.position.set(this.position.x+0.25, this.position.y, this.position.z)
            base.rotateY(Math.PI/2)
        }
        else if(dir == 'up'){
            this.rotateY(Math.PI/2)
            this.position.set(this.position.x-0.72, this.position.y, this.position.z)
            reference.position.set(this.position.x-2, this.position.y, this.position.z)
            base.position.set(this.position.x-0.25, this.position.y, this.position.z)
            base.rotateY(Math.PI/2)
        }
    }
 }

export default Cranck;
