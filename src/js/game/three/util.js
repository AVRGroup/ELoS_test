import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {Smoke} from "./Smoke/index.js"

export let materialColor = [];
export let corrID;
export let requestID;
export let changColorID;
export let smokeAnimationFrame;
export let smokeAnimationFrame2

export let smoke = new Smoke();
export let smoke2 = new Smoke();

export function degreeToRadians(angle)
{
    return angle * (Math.PI / 180);
}

export function generateDefaultSceneObjects(canvasElement)
{
    const renderer = new THREE.WebGLRenderer({canvas: canvasElement});
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 1, 1000);
    camera.position.set(0,15,30);
    const controls = new OrbitControls(camera,renderer.domElement);
    
    const ambientLight = new THREE.HemisphereLight('white','darkslategrey',0.5);
    const mainLight = new THREE.DirectionalLight('white',0.7);
    mainLight.position.set(2,1,1);

    scene.add(ambientLight);
    scene.add(mainLight);

    return {
        renderer: renderer,
        scene: scene,
        camera: camera,
        controls: controls,
        ambientLight: ambientLight,
        mainLight: mainLight
    };
}

export function resizeCanvasToDisplaySize(renderer,camera)
{
    if(renderer.domElement.width !== renderer.domElement.clientWidth || renderer.domElement.height !== renderer.domElement.clientHeight)
    {
        renderer.setSize(renderer.domElement.clientWidth,renderer.domElement.clientHeight,false);
        camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        camera.updateProjectionMatrix();
    }
}

function getMaxSize(object)
{
    let maxSize;

    const box = new THREE.Box3().setFromObject(object);
    const min = box.min;
    const max = box.max;

    const size = new THREE.Box3();
    size.x = max.x - min.x;
    size.y = max.y - min.y;
    size.z = max.z - min.z;

    if(size.x >= size.y && size.x >= size.z)
    {
        maxSize = size.x;
    }
    else
    {
        if(size.y >= size.z)
        {
            maxSize = size.y;
        }
        else
        {
            maxSize = size.z;
        }
    }
    
    return maxSize;
}

function normalizeAndRescale(object,newScale)
{
    const scale = getMaxSize(object);
    object.scale.set(newScale * 1.0/scale, newScale * 1.0/scale, newScale * 1.0/scale);
}

export function loadGLBFile(path,modelName,scale)
{
    const objectToAdd = new THREE.Object3D();
    const loader = new GLTFLoader();
    loader.load(path,function(gltf){
        const obj = gltf.scene;
        obj.name = modelName;
        obj.visible = true;
        obj.traverse(function(child){
            if(child)
            {
                child.castShadow = true;
            }
        });
        obj.traverse(function(node){
            if(node.material)
            {
                node.material.side = THREE.DoubleSide;
            }
        });
        normalizeAndRescale(obj,scale);
        objectToAdd.add(obj);
    });

    return objectToAdd;
}

export function loadDefaultActor()
{
    const path = new URL("../../../assets/models/eve.glb",import.meta.url).toString();
    const obj = loadGLBFile(path,"eve",2.0);
    const interactionReference = new THREE.Object3D();
    interactionReference.name = 'interactionReference';
    interactionReference.translateZ(2);
    obj.rotateY(degreeToRadians(90));
    obj.add(interactionReference);
    return obj;
}

export function loadOBJFile(path,modelName,texture,scale)
{
    const objectToAdd = new THREE.Object3D();
    const objLoader = new OBJLoader();
    objLoader.load(path,function(object){
        object.name = modelName;
        object.visible = true;
        object.traverse(function(child){
            if(child)
            {
                child.castShadow = true;
            }
        });
        object.traverse(function(node){
            if(node.material)
            {
                node.material.side = THREE.DoubleSide;
                if(texture)
                {
                    node.material.map = texture;
                }
            }
        })
        normalizeAndRescale(object,scale);
        objectToAdd.add(object);
    });

    return objectToAdd;
}

export function loadDefaultObjectives(amount)
{
    const objectives = [];
    const texPath = new URL("../../../assets/textures/crystal.jpg",import.meta.url).toString();
    const objPath = new URL("../../../assets/models/crystal.obj",import.meta.url).toString();
    const texture = new THREE.TextureLoader().load(texPath);

    for(let i = 0; i < amount; i++)
    {
        objectives.push(loadOBJFile(objPath,"crystal",texture,2.0));
        objectives[i].rotateX(degreeToRadians(-90));
    }

    return objectives;
}

function leanMovement(actor,mode)
{
    let angleRotated = 0;
    let totalRotation = 15;
    let requestID;

    function rotate()
    {
        if(angleRotated < totalRotation)
        {
            if(mode == 0)
            {
                actor.rotateX(degreeToRadians(3));
            }
            else
            {
                actor.rotateX(degreeToRadians(-3));
            }
            angleRotated += 3;
            requestID = requestAnimationFrame(rotate);
        }
        else
        {
            cancelAnimationFrame(requestID);
        }
    }

    requestID = requestAnimationFrame(rotate);
}

function DeathMovement(actor,mode,direction)
{
    let angleRotated = 0;
    let totalRotation = 90;
    
    function rotate()
    {
        if(angleRotated < totalRotation)
        {
            if(mode == 0)
            {
                if(direction == "X")
                    actor.rotateX(degreeToRadians(3));
                else if(direction == "Z")
                    actor.rotateZ(degreeToRadians(3));
            }
            else
            {
                if(direction == "X")
                    actor.rotateX(degreeToRadians(-3));
                else if(direction == "Z")
                    actor.rotateZ(degreeToRadians(-3));
            }
            angleRotated += 3;
            requestID = requestAnimationFrame(rotate);
        }
        else
        {
            cancelAnimationFrame(requestID);
        }
    }

    requestID = requestAnimationFrame(rotate);
    actor.position.y = -0.5
}

export function saveRobotColor(actor){
    actor.getObjectByName('eve').traverse((child) => {
        if (child.material) {
            materialColor.push(child.material.color.getHex())
        }
      });
}

function changeRobotColor(actor, hex){
    let red = 200;
    let c1 = new THREE.Color("white");
    let c2 = new THREE.Color(0xff4547);
    let alpha3 = 0.0005;

    actor.getObjectByName('eve').traverse((child) => {
        if (child.material ) {
            function correct()
            {
                if(!alpha3 < 0.5)
                {
                    child.material.color.lerpColors(c1, c2, alpha3);
                    alpha3 = alpha3 + 0.0003
                    if(alpha3 > 0.8)
                        return;
                    changColorID = requestAnimationFrame(correct);
                }
                else
                {
                    cancelAnimationFrame(changColorID);
                }
            }
            changColorID = requestAnimationFrame(correct);

        }
        });

}


export function resetRobotColor(actor){
    let count = 0;
    actor.getObjectByName('eve').traverse((child) => {
        if (child.material) {
            child.material.color.setHex(materialColor[count]);
          count ++;
        }
      });
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


export function translateActor(actor, amount, gridMapHelper, sceneProperties, consoleElement)
{
    let langSelector = window.location.href.includes('english') ? 1 : 0;
    const messageVariations = [
        [
            "Aviso: Não é possível avançar mais por este caminho, seguindo para o próximo comando.\n",
            "Aviso: Robô caiu na armadilha.\n",
            "Aviso: Robô foi queimado!\n",
            "Aviso: Robô foi queimado pelo laser!\n"  
        ],
        [
            "Warning: It is not possible to advance further along this path, moving on to the next command.\n",
            "Warning: Robot has fallen into the trap.\n",
            "Warning: Robot was burned!\n",
            "Warning: Robot was burned by the laser!\n"
        ]
    ];

    const objCopy = actor.clone(false);
    objCopy.translateZ(amount * gridMapHelper.getMultiplier());
    let finalPosition = objCopy.position;
    let requestID;
    let alpha = sceneProperties.mult == 1 ? 0.01 : 0.1;
    let modeGo = amount > 0 ? 0 : 1;
    let modeBack = amount > 0 ? 1 : 0;

    function positionAlmostEqual(positionA,positionB)
    {
        if(positionA.x.toFixed(2) == positionB.x.toFixed(2) && positionA.z.toFixed(2) == positionB.z.toFixed(2))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    
    function correctPositionOnCancel(positionToStop)
    {
        let corrID;
        function correct()
        {
            if(!positionAlmostEqual(actor.position,positionToStop))
            {
                actor.position.lerp(positionToStop,0.15);
                corrID = requestAnimationFrame(correct);
            }
            else
            {
                cancelAnimationFrame(corrID);
            }
        }

        corrID = requestAnimationFrame(correct);
    }

    function correctPositionOnDeath(positionToStop, type)
    {
        if(type == "fire"){
            function correct()
            {
                if(!positionAlmostEqual(actor.position,positionToStop))
                {
                    actor.position.lerp(positionToStop,0.15);
                    corrID = requestAnimationFrame(correct);
                }
                else
                {
                    cancelAnimationFrame(corrID);
                }
            }

            corrID = requestAnimationFrame(correct);

            DeathMovement(actor.getObjectByName('eve'),modeGo,"X")
            if(materialColor.length == 0)
                saveRobotColor(actor)
            changeRobotColor(actor, 0xff6242)
        }
        else if(type == "trap"){
            function correct()
            {
                if(!positionAlmostEqual(actor.position,positionToStop))
                {
                    actor.position.lerp(positionToStop,0.15);
                    corrID = requestAnimationFrame(correct);
                }
                else
                {
                    cancelAnimationFrame(corrID);
                }
            }

            corrID = requestAnimationFrame(correct);

            DeathMovement(actor.getObjectByName('eve'),modeGo,"Z")
        }
        else if(type == "laser"){
            actor.add(smoke)
            actor.add(smoke2) 
            
            corrID = requestAnimationFrame(correct);

            let rightPos = false;
            function correct()
            {
                if(!positionAlmostEqual(actor.position,positionToStop))
                {
                    actor.position.lerp(positionToStop,0.15);
                    corrID = requestAnimationFrame(correct);
                }
                else
                {
                    let actorX = actor.position.x
                    let actorY = actor.position.y
                    let actorZ = actor.position.z
                    cancelAnimationFrame(corrID);
                    function robotShake()
                    {
                        let rngX = actorX + getRandom(-0.25, 0.25)
                        let rngY = actorY + getRandom(-0.25, 0.25)
                        let rngZ = actorZ + getRandom(-0.25, 0.25)
                            actor.position.lerp(new THREE.Vector3(rngX, rngY, rngZ),0.1);
                            corrID = requestAnimationFrame(robotShake);
                        
                        
                    }
                    corrID = requestAnimationFrame(robotShake);

                }
            }
            corrID = requestAnimationFrame(correct);

            //DeathMovement(actor.getObjectByName('eve'),modeGo,"X")
            let k = 0
                function animateSmoke()
                {
                    if(smoke.smokes[k].position.y.toFixed(1) < 5)
                    {
                        smoke.smokes[k].visible = true
                        smoke.smokes[k].material.opacity = smoke.smokes[k].material.opacity - 0.02
                        smoke.smokes[k].position.lerp(new THREE.Vector3(getRandom(-3,3),5,getRandom(-3,3)), 0.02)
                        if(smoke.smokes[k].position.y.toFixed(1) > 4){
                            smoke.smokes[k].position.y = 0
                            smoke.smokes[k].material.opacity = 0.7
                            smoke.smokes[k].visible = false
                            smoke.smokes.push(smoke.smokes[k])
                            k++
                        }                    
                        smokeAnimationFrame = requestAnimationFrame(animateSmoke);
                    }
                    else
                    {
                        cancelAnimationFrame(smokeAnimationFrame);
                    }
                }
                smokeAnimationFrame = requestAnimationFrame(animateSmoke);
        }
    }

    leanMovement(actor.getObjectByName('eve'),modeGo);
    return new Promise(function(resolve){
        function translate()
        {
            let newPosition = gridMapHelper.collisionTests(actor.position,finalPosition);
            if(!positionAlmostEqual(finalPosition,newPosition))
            {
                finalPosition = newPosition;
                consoleElement.innerText += messageVariations[langSelector][0];
            }
            
            if(gridMapHelper.trapCollision(actor.position))
            {
                consoleElement.innerText += messageVariations[langSelector][1];
                sceneProperties.cancelExecution = true;
                correctPositionOnDeath(gridMapHelper.trapCollision(actor.position), "trap");
                //correctPositionOnCancel(gridMapHelper.trapCollision(actor.position));
            }

            if(gridMapHelper.fireCollision(actor.position))
            {
                consoleElement.innerText += messageVariations[langSelector][2];
                sceneProperties.cancelExecution = true;
                correctPositionOnDeath(gridMapHelper.fireCollision(actor.position), "fire");
                ///correctPositionOnCancel(gridMapHelper.fireCollision(actor.position));
            }

            if(gridMapHelper.laserCollision(actor.position))
            {
                consoleElement.innerText += messageVariations[langSelector][3];
                sceneProperties.cancelExecution = true;
                correctPositionOnDeath(gridMapHelper.laserCollision(actor.position), "laser");
            }

            if(!positionAlmostEqual(actor.position,finalPosition) && !sceneProperties.cancelExecution)
            {
                actor.position.lerp(finalPosition,alpha);
                alpha += 0.001;
                requestID = requestAnimationFrame(translate);
            }
            else
            {
                leanMovement(actor.getObjectByName('eve'),modeBack);
                cancelAnimationFrame(requestID);
                resolve();
            }
        }

        requestAnimationFrame(translate);
    });
}

export function rotateActor(actor, amount, sceneProperties, direction)
{
    let angleRotated = 0;
    let requestID;
    const totalRotation = Math.abs(amount);
    const directionCorrected = direction > 0 ? 1 : -1;
    const multOnCall = sceneProperties.mult;

    return new Promise(function(resolve){
        function rotate()
        {
            if(angleRotated < totalRotation && !sceneProperties.cancelExecution)
            {
                actor.rotateY(degreeToRadians(1*directionCorrected*multOnCall));
                angleRotated = angleRotated + 1*multOnCall;
                requestID = requestAnimationFrame(rotate);
            }
            else
            {
                cancelAnimationFrame(requestID);
                resolve();
            }
        }

        requestID = requestAnimationFrame(rotate);
    });
}

export function checkCollision(objectA,objectB,gridMapHelper)
{
    const vec = new THREE.Vector3();
    objectA.getWorldPosition(vec);
    if(gridMapHelper.getXCoordFromGlobalPosition(vec.x) == gridMapHelper.getXCoordFromGlobalPosition(objectB.position.x) && gridMapHelper.getZCoordFromGlobalPosition(vec.z) == gridMapHelper.getZCoordFromGlobalPosition(objectB.position.z) && objectB.visible)
    {
        return true;
    }
    else
    {
        return false;
    }
}