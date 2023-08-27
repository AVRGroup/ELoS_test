import * as THREE from 'three';

let alpha2 = 0.1

class Spheres extends THREE.Mesh {
    constructor(radius, color, opacity) { 
        super(new THREE.SphereGeometry(radius, 16, 16), new THREE.MeshLambertMaterial({
            color:color, 
            transparent: true,
            opacity: opacity
        })); 
    }
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

export class Smoke extends THREE.Object3D {  
   constructor(){
        super();
        this.index = 0
        this.x = 0
        this.z = 0
        this.smokes;
        this.alpha = 0.01
        let color = "gray"
        let radius = 0.65
        let opacity = getRandom(0.90, 0.97)
        let rotation = getRandom(1, 25)


        // Smokes
        let smoke1 = new Spheres(radius, color, opacity);
        //smoke1.position.set(0, 3, 0)
        //smoke1.rotateX(degreesToRadians(40))
        //smoke1.rotateOnAxis(degreesToRadians(0))
        smoke1.visible = false
        let smoke2 = new Spheres(getRandom(0.25, 0.45), color, getRandom(0.85, 0.95));
        //smoke2.position.set(0, 4, 0)
        smoke2.visible = false
        let smoke3 = new Spheres(getRandom(0.25, 0.45), color, getRandom(0.85, 0.95));
        //smoke3.position.set(0, 5, 0)
        smoke3.visible = false

        let smoke4 = new Spheres(getRandom(0.25, 0.45), color, getRandom(0.85, 0.95));
        //smoke4.position.set(0, 6, 0)
        smoke4.visible = false


        this.smokes = [smoke1, smoke2, smoke3, smoke4]
        //this.smokes.forEach(smoke => this.visible = false)
        //this.deactiveSmokes()
        //this.smokesAnimation()

        this.add(smoke1);
        this.add(smoke2);
        this.add(smoke3);
        this.add(smoke4);

        
        return this;
   }
   deactiveSmokes(smokes = this.smokes) {
        smokes.forEach(smoke => smoke.visible = false)
   }
   activeSmokes(smokes = this.smokes) {
    smokes.forEach(smoke => smoke.visible = true)
    }
    deactiveThisSmoke(k) {
        this.smokes[k].visible = false
    }
    activeThisSmoke(k) {
        this.smokes[k].visible = true
    }
}





