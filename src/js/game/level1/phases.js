import * as THREE from "three";
import { generateDefaultEditor, readOnlyState, editState, updateTheme } from "../editor";
import {
    generateDefaultSceneObjects,
    resizeCanvasToDisplaySize,
    loadDefaultActor,
    loadDefaultObjectives,
    translateActor,
    rotateActor,
    checkCollision,
    degreeToRadians,
    corrID,
    requestID
} from "../three/util";
import GridMapHelper from "../three/GridMapHelper";
import parseCode from "./parser";
import { displayTime, configureDataAndUpload } from "../timer";
import { Modal } from "bootstrap";
import {SpikeTrap, trapsActivation, trapsDeactivation} from "../three/SpikeTrap";

//Defining Level 1 Scene's Properties

const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0,
    mult: 1,
    lang: window.location.href.includes('english') ? 1 : 0
}

function generatePhaseTitle()
{
    switch(sceneProperties.lang)
    {
        case 1:
            return `Level 1 - Round ${sceneProperties.phase + 1} of 8`
        default:
            return `Nível 1 - Fase ${sceneProperties.phase + 1} de 8`

    }
}

const textVariations = [
    [
        generatePhaseTitle,
        "Faça o robô chegar ao cristal, após isso, o colete.",
        "Faça o robô chegar aos cristais, após isso, os colete.",
        "Robô não está em frente ao cristal.\n",
        "Cristal coletado.",
        "Cristal coletado com sucesso.\n",
        "Todos os cristais coletados com sucesso!\n",
        "Nível Concluído",
        "Finalizar",
        "Deseja realmente finalizar a prática?"
    ],
    [
        generatePhaseTitle,
        "Make the robot reach the crystal and collect it.",
        "Make the robot reach the crystals and collect them.",
        "Robot is not in front of the crystal.\n",
        "Crystal collected.\n",
        "Crystal successfully collected.\n",
        "All crystals collected successfully!\n",
        "Level Completed",
        "Finish",
        "Do you really want to finish the practice?"
    ]
]

//Generating default Level 1 Objects

const logModal = new Modal(document.getElementById("logModal"));

let timerUpadate;

function updateTime()
{
    sceneProperties.timer++;
}

const editor = generateDefaultEditor(document.getElementById("editorArea"), {
    lineNumbers: true,
});

const andarFrenteBtn = document.getElementById('andarFrente');
andarFrenteBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: "andarFrente(?)\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: "andarFrente(?)\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const andarTrasBtn = document.getElementById('andarTras');
andarTrasBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: "andarTras(?)\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: "andarTras(?)\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const girarEsquerdaBtn = document.getElementById('girarEsquerda');
girarEsquerdaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: "girarEsquerda()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: "girarEsquerda()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const girarDireitaBtn = document.getElementById('girarDireita');
girarDireitaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: "girarDireita()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: "girarDireita()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const darMeiaVoltaBtn = document.getElementById('darMeiaVolta');
darMeiaVoltaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: "darMeiaVolta()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: "darMeiaVolta()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const coletarCristalBtn = document.getElementById('coletarCristal');
coletarCristalBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: "coletarCristal()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: "coletarCristal()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const consoleElement = document.getElementById('consoleArea');

const {renderer, scene, camera, controls} = generateDefaultSceneObjects(document.getElementById("phaseView"));

const gridMapHelper = new GridMapHelper();

const plane = gridMapHelper.createGridPlane();

const actor = loadDefaultActor();

const wallTexture = new THREE.TextureLoader().load(new URL("../../../assets/textures/stone_wallLvl1.jpg",import.meta.url).toString());
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;

let objectives;
let walls;
let traps;

let spikeTrapState;

let setSpikeTrapState;

let setSpikeTrapStateInterval;

scene.add(plane);
scene.add(actor);

async function andarFrente(amount)
{
    let correctedAmount = amount > 10 ? 10 : amount;
    await translateActor(actor,correctedAmount,gridMapHelper,sceneProperties,consoleElement);
}

async function andarTras(amount)
{
    let correctedAmount = amount > 10 ? 10 : amount;
    await translateActor(actor,-correctedAmount,gridMapHelper,sceneProperties,consoleElement);
}

async function girarEsquerda()
{
    await rotateActor(actor,90,sceneProperties,1);
}

async function girarDireita()
{
    await rotateActor(actor,90,sceneProperties,-1);
}

async function darMeiaVolta()
{
    await rotateActor(actor,180,sceneProperties,1);
}

let coletarCristal;

let resetLevel;

let winCondition;

const phaseGeneration = [];

//Functions to create the phases

//Phase 1
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];

        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(9,9,5,5);
        scene.add(objectives[0]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 2
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        gridMapHelper.addObstacle(8,8,2,2);
        scene.add(objectives[0]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 3
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(6));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(1));
        gridMapHelper.addObstacle(2,2,6,6);
        gridMapHelper.addObstacle(7,7,1,1);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 4
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(9,9,5,5);
        scene.add(objectives[0]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(2,2,2);
        const boxMaterial = new THREE.MeshLambertMaterial({map: wallTexture});
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1.0,gridMapHelper.getGlobalXPositionFromCoord(5));
        gridMapHelper.addObstacle(7,7,5,5);
        scene.add(walls[0]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 5
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(8));
        gridMapHelper.addObstacle(6,6,2,2);
        gridMapHelper.addObstacle(7,7,8,8);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(6,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(3,1);
        boxMaterial[3].map.repeat.set(3,1);
        boxMaterial[4].map.repeat.set(3,1);
        boxMaterial[5].map.repeat.set(3,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(2,1);
        boxMaterial2[3].map.repeat.set(2,1);
        boxMaterial2[4].map.repeat.set(2,1);
        boxMaterial2[5].map.repeat.set(2,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1.0,gridMapHelper.getGlobalXPositionFromCoord(7));
        walls[1].rotateY(degreeToRadians(90));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalXPositionFromCoord(2.5));
        gridMapHelper.addObstacle(5,7,7,7);
        gridMapHelper.addObstacle(5,5,2,3);
        scene.add(walls[0]);
        scene.add(walls[1]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 6
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(8,8,0,0);
        scene.add(objectives[0]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(14,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(16,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,4);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(7,1);
        boxMaterial[3].map.repeat.set(7,1);
        boxMaterial[4].map.repeat.set(7,1);
        boxMaterial[5].map.repeat.set(7,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(8,1);
        boxMaterial2[3].map.repeat.set(8,1);
        boxMaterial2[4].map.repeat.set(8,1);
        boxMaterial2[5].map.repeat.set(8,1);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(2,1);
        boxMaterial3[1].map.repeat.set(2,1);
        boxMaterial3[2].map.repeat.set(1,2);
        boxMaterial3[3].map.repeat.set(1,2);
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1.0,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1.0,gridMapHelper.getGlobalZPositionFromCoord(0.5));
        gridMapHelper.addObstacle(2,8,2,2);
        gridMapHelper.addObstacle(2,9,4,4);
        gridMapHelper.addObstacle(7,7,0,1);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 7
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][1];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(14,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(16,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,8);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(7,1);
        boxMaterial[3].map.repeat.set(7,1);
        boxMaterial[4].map.repeat.set(7,1);
        boxMaterial[5].map.repeat.set(7,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(8,1);
        boxMaterial2[3].map.repeat.set(8,1);
        boxMaterial2[4].map.repeat.set(8,1);
        boxMaterial2[5].map.repeat.set(8,1);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(4,1);
        boxMaterial3[1].map.repeat.set(4,1);
        boxMaterial3[2].map.repeat.set(1,4);
        boxMaterial3[3].map.repeat.set(1,4);
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1.0,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1.0,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalZPositionFromCoord(6));
        gridMapHelper.addObstacle(2,8,4,4);
        gridMapHelper.addObstacle(2,8,6,6);
        gridMapHelper.addObstacle(8,8,0,3);
        gridMapHelper.addObstacle(2,9,8,8);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);

        traps = [];
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addTrap(8,5,traps[0]);
        scene.add(traps[0]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 8
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][2];

        camera.position.set(0,15,30);
        camera.rotation.set(0,0,0);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(3);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(2));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(8));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(6,6,2,2);
        gridMapHelper.addObstacle(7,7,8,8);
        gridMapHelper.addObstacle(2,2,5,5);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(6,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(3,1);
        boxMaterial[3].map.repeat.set(3,1);
        boxMaterial[4].map.repeat.set(3,1);
        boxMaterial[5].map.repeat.set(3,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(2,1);
        boxMaterial2[3].map.repeat.set(2,1);
        boxMaterial2[4].map.repeat.set(2,1);
        boxMaterial2[5].map.repeat.set(2,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1.0,gridMapHelper.getGlobalXPositionFromCoord(7));
        walls[1].rotateY(degreeToRadians(90));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1.0,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1.0,gridMapHelper.getGlobalZPositionFromCoord(4));
        gridMapHelper.addObstacle(5,7,7,7);
        gridMapHelper.addObstacle(5,5,2,3);
        gridMapHelper.addObstacle(1,3,4,4);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(8));
        gridMapHelper.addTrap(1,5,traps[0]);
        gridMapHelper.addTrap(6,3,traps[1]);
        gridMapHelper.addTrap(5,8,traps[2]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                objectives[2].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][4];
                gridMapHelper.obstacles[2].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(2));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            objectives[2].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.obstacles[2].active = true;
        }

        winCondition = () =>{
            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        spikeTrapState = 0;
        setSpikeTrapState = () => {
            if(spikeTrapState == 0)
            {
                trapsDeactivation(traps)
            }
            else
            {
                trapsActivation(traps)

            }
        }

        setSpikeTrapStateInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            spikeTrapState = (spikeTrapState + 1) % 2;
            setSpikeTrapState();
        },1000);

        document.getElementById('winMessage').innerText = textVariations[sceneProperties.lang][7];
        document.getElementById('advanceBtn').innerText = textVariations[sceneProperties.lang][8];

        timerUpadate = setInterval(updateTime,1000);
    }
);

//Defining function that remove objects, scene render and button's functions

function removeObjects(crystals, walls, traps)
{
    if(crystals != undefined)
    {
        for(let i = 0; i < crystals.length; i++)
        {
            scene.remove(crystals[i]);
        }
    }

    if(walls != undefined)
    {
        for(let i = 0; i < walls.length; i++)
        {
            scene.remove(walls[i]);
        }
        gridMapHelper.clearObstacles();   
    }

    if(traps != undefined)
    {
        for(let i = 0; i < traps.length; i++)
        {
            scene.remove(traps[i]);
        }   
        gridMapHelper.clearTraps();
    }

    crystals = undefined;
    walls = undefined;
    traps = undefined;
}

function animate()
{
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
    displayTime(sceneProperties.timer,document.getElementById("timer"));
}

window.addEventListener('resize',() => {
    resizeCanvasToDisplaySize(renderer,camera);
});

const finishEarlierButton = document.getElementById('finishEarlier');

const execBtn = document.getElementById("execBtn")
execBtn.addEventListener("click",async function() {
    cancelAnimationFrame(corrID);
    cancelAnimationFrame(requestID);
    const codeParsed = parseCode(editor.state.doc.toString());
    sceneProperties.cancelExecution = false;
    actor.getObjectByName('eve').position.y = 0;
    if(traps != null)
        trapsDeactivation(traps)
    if(codeParsed != null)
    {
        updateTheme(editor,1)
        resetLevel();
        sceneProperties.executing = true;
        this.disabled = true;
        await eval(codeParsed);
        if(winCondition())
        {
            readOnlyState.doc = editor.state.doc;
            editor.setState(readOnlyState);
            document.getElementById('winMessage').classList.remove('invisible');
            document.getElementById('advanceBtn').classList.remove('invisible');
            document.getElementById("resetBtn").disabled = true;
            finishEarlierButton.disabled = true;
            clearInterval(timerUpadate);
            if(sceneProperties.phase == phaseGeneration.length - 1)
            {
                configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender','prog-exp',document.getElementById("subBtn"),sceneProperties.timer,'../','Nível 1/Completo');
            }
        }
        else
        {
            updateTheme(editor,0)
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click",() => {
    cancelAnimationFrame(corrID);
    cancelAnimationFrame(requestID);
    updateTheme(editor,0)
    sceneProperties.cancelExecution = true;
    resetLevel();
});

const advanceBtn = document.getElementById('advanceBtn');
advanceBtn.addEventListener('click',(e) => {
    sceneProperties.phase++;
    if(sceneProperties.phase < phaseGeneration.length)
    {
        removeObjects(objectives,walls,traps);
        phaseGeneration[sceneProperties.phase]();
        editor.setState(editState);
        consoleElement.innerText = null;
        document.getElementById('winMessage').classList.add('invisible');
        document.getElementById('advanceBtn').classList.add('invisible');
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;
    }
    else
    {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        logModal.show();
    }
});

finishEarlierButton.addEventListener('click', (e) => {
    if(confirm(textVariations[sceneProperties.lang][9]))
    {
        clearInterval(timerUpadate);
        configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender','prog-exp',document.getElementById("subBtn"),sceneProperties.timer,'../',`Nível 1/Fase ${sceneProperties.phase + 1}`);
        logModal.show();
    }
});

let normalSpeedBtn = document.getElementById("normalSpeed");
let fastSpeedBtn = document.getElementById("fastSpeed");
normalSpeedBtn.addEventListener("click", function() {
    this.disabled = true;
    fastSpeedBtn.disabled = false;
    sceneProperties.mult = 1; 
});

fastSpeedBtn.addEventListener("click", function() {
    this.disabled = true;
    normalSpeedBtn.disabled = false;
    sceneProperties.mult = 6; 
});

//Running level 1

resizeCanvasToDisplaySize(renderer,camera);
phaseGeneration[sceneProperties.phase]();
animate();