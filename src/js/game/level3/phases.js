import * as THREE from "three";
import { generateDefaultEditor, readOnlyState, editState } from "../editor";
import {
    generateDefaultSceneObjects,
    resizeCanvasToDisplaySize,
    loadDefaultActor,
    loadDefaultObjectives,
    translateActor,
    rotateActor,
    checkCollision,
    degreeToRadians
} from "../three/util";
import GridMapHelper from "../three/GridMapHelper";
import parseCode from "./parser";
import LaserFence from "../three/LaserFence";
import {SpikeTrap, trapsActivation, trapsDeactivation} from "../three/SpikeTrap";
import { displayTime, configureDataAndUpload } from "../timer";
import { Modal } from "bootstrap";

const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0,
    executing: false
}

const logModal = new Modal(document.getElementById("logModal"));

let timerUpadate;

function updateTime()
{
    sceneProperties.timer++;
}

let laserState;

let setLaserStates;

let setLaserStatesInterval;

let spikeTrapState;

let setSpikeTrapState;

let setSpikeTrapStateInterval;

const editor = generateDefaultEditor(document.getElementById("editorArea"));

const andarFrenteBtn = document.getElementById('andarFrente');
andarFrenteBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "andarFrente(?)\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "andarFrente(?)\n"}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "andarTras(?)\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "andarTras(?)\n"}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "girarEsquerda()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "girarEsquerda()\n"}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "girarDireita()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "girarDireita()\n"}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "darMeiaVolta()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "darMeiaVolta()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const desativarLaserAzulBtn = document.getElementById('desativarLaserAzul');
desativarLaserAzulBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "desativarLaserAzul()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "desativarLaserAzul()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const desativarLaserVermelhoBtn = document.getElementById('desativarLaserVermelho');
desativarLaserVermelhoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "desativarLaserVermelho()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "desativarLaserVermelho()\n"}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "coletarCristal()\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "coletarCristal()\n"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const laserAzulAtivoBtn = document.getElementById('laserAzulAtivo');
laserAzulAtivoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "laserAzulAtivo()"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "laserAzulAtivo()"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const laserVermelhoAtivoBtn = document.getElementById('laserVermelhoAtivo');
laserVermelhoAtivoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "laserVermelhoAtivo()"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "laserVermelhoAtivo()"}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const condicaoFullBtn = document.getElementById('condicaoFull');
condicaoFullBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "se(?){\n\n}\nsenão{\n\n}\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "se(?){\n\n}\nsenão{\n\n}\n"}})
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

const wallTexture = new THREE.TextureLoader().load(new URL('../../../assets/textures/metalWallLvl3.png', import.meta.url).toString());
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;

let objectives;
let walls;
let traps;
let laserFences

function changeLaserActiveStatus(index,status)
{
    gridMapHelper.lasers[index].active = status;
    //lasers[index].visible = status;
    if(status == false)
        laserFences[index].setNotVisible();
    else
    {
        if(gridMapHelper.lasers[index].state == 'red')
        {
            laserFences[index].setVisible();
            laserFences[index].setRed();
        }
        else
        {
            laserFences[index].setVisible();
            laserFences[index].setBlue();   
        }
    }
}
function changeLaserStateStatus(index, status)
{
    gridMapHelper.lasers.forEach(laser => {if(laser.type == "multiColor")laser.state = status});
    if (status == 'blue'){
        laserFences.forEach(laser => {
            if(laser.type == "multiColor")
                laser.setBlue()
        });
    } else if (status == 'red'){
        laserFences.forEach(laser => {
            if(laser.type == "multiColor")
                laser.setRed()
        });
    }
}
function lasersVisualRestart()
{
    for(let i = 0;i < laserFences.length;i++)
    {
        laserFences[i].active = true;
    }
}

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

function laserAzulAtivo()
{
    const vec = new THREE.Vector3();
    actor.getObjectByName('interactionReference').getWorldPosition(vec);
    if(gridMapHelper.detectLaser(vec,'blue') != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function laserVermelhoAtivo()
{
    const vec = new THREE.Vector3();
    actor.getObjectByName('interactionReference').getWorldPosition(vec);
    if(gridMapHelper.detectLaser(vec,'red') != null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function desativarLaserAzul()
{
    const vec = new THREE.Vector3();
    actor.getObjectByName('interactionReference').getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec,'blue');
    
    if(laserIndex != null)
    {
        changeLaserActiveStatus(laserIndex,false);
    }
    else
    {
        consoleElement.innerText += "O robô entrou em curto circuito por tentar desativar um laser azul que não existe.\n";
        sceneProperties.cancelExecution = true;
    }
}

function desativarLaserVermelho()
{
    const vec = new THREE.Vector3();
    actor.getObjectByName('interactionReference').getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec,'red');
    
    if(laserIndex != null)
    {
        changeLaserActiveStatus(laserIndex,false);
    }
    else
    {
        consoleElement.innerText += "O robô entrou em curto circuito por tentar desativar um laser vermelho que não existe.\n";
        sceneProperties.cancelExecution = true;
    }
}

function badLuck(position,state)
{
    const vector = new THREE.Vector3(gridMapHelper.getGlobalXPositionFromCoord(position[0]),0,gridMapHelper.getGlobalZPositionFromCoord(position[1]));
    let newLaserState = state == 'blue' ? 'red' : 'blue';
    let laserIndex = gridMapHelper.detectLaser(vector,state);

    if(laserIndex != null)
    {
        if(gridMapHelper.lasers[laserIndex].type == 'multiColor')
        {
            gridMapHelper.lasers[laserIndex].state = newLaserState;
            if(newLaserState == 'blue')
            {
                laserFences[laserIndex].setBlue();
            }
            else
            {
                laserFences[laserIndex].setRed();
            }
        }
        else
        {
            if(gridMapHelper.lasers[laserIndex].active)
            {
                gridMapHelper.lasers[laserIndex].active = false;
                laserFences[laserIndex].setNotVisible();
            }
            else
            {
                gridMapHelper.lasers[laserIndex].active = true;
                laserFences[laserIndex].setVisible();
                if(gridMapHelper.lasers[laserIndex].state == 'blue')
                {
                    laserFences[laserIndex].setBlue();
                }
                else
                {
                    laserFences[laserIndex].setRed();
                }   
            }
        }
    }
}

let coletarCristal;

let resetLevel;

let winCondition;

const phaseGeneration = [];

//Phase 1
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 1 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar ao cristal, após isso, o colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(9,9,5,5);
        scene.add(objectives[0]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(18,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(9,1);
        boxMaterial[3].map.repeat.set(9,1);
        boxMaterial[4].map.repeat.set(9,1);
        boxMaterial[5].map.repeat.set(9,1);
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        scene.add(walls[0]);
        scene.add(walls[1]);
        gridMapHelper.addObstacle(1,9,4,4);
        gridMapHelper.addObstacle(1,9,6,6);

        laserFences = [];
        laserFences.push(new LaserFence("multiColor"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addLaser(7,5, laserFences[0]);
        scene.add(laserFences[0]);
        //laserFences[0].setBlue()


        // lasers = [];
        // const laserGeometry = new THREE.BoxGeometry(2,2,2);
        // const laserMaterial = new THREE.MeshLambertMaterial({color: 'rgb(0,0,255)'});
        // lasers.push(new THREE.Mesh(laserGeometry,laserMaterial));
        // lasers[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
        // gridMapHelper.addLaser(7,5);
         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
            }
            else
            {
                changeLaserStateStatus(0, 'red');
            }
        }
        // scene.add(lasers[0]);

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado com sucesso.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);
        timerUpadate = setInterval(updateTime,1000);
    }
);

//Phase 2
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 2 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar aos cristais, após isso, os colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addObstacle(4,4,7,7);
        gridMapHelper.addObstacle(4,4,3,3);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        traps = [];
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addTrap(3,5, traps[0]);
        scene.add(traps[0]);

        trapsActivation(traps)

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(6,2,2);
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
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));        
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].rotateY(Math.PI/2)
        walls[3].rotateY(Math.PI/2)
        walls[6].rotateY(Math.PI/2)
        walls[7].rotateY(Math.PI/2)
        scene.add(walls[0]);
        scene.add(walls[1]);        
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);

        gridMapHelper.addObstacle(1,3,4,4);
        gridMapHelper.addObstacle(1,3,6,6);
        gridMapHelper.addObstacle(3,3,6,8);
        gridMapHelper.addObstacle(3,3,2,4);
        gridMapHelper.addObstacle(4,4,8,8);
        gridMapHelper.addObstacle(4,4,2,2);
        gridMapHelper.addObstacle(5,5,2,4);
        gridMapHelper.addObstacle(5,5,6,8);
        gridMapHelper.addObstacle(6,7,6,6);
        gridMapHelper.addObstacle(6,7,4,4);

        laserFences = [];
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        gridMapHelper.addLaser(4,4, laserFences[0]);
        gridMapHelper.addLaser(4,6, laserFences[1]);
        laserFences[0].rotateY(Math.PI/2)
        laserFences[1].rotateY(Math.PI/2)

        scene.add(laserFences[0]);
        scene.add(laserFences[1]);

         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserActiveStatus(0,true);
                changeLaserActiveStatus(1,false);
            }
            else
            {
                changeLaserActiveStatus(0,false);
                changeLaserActiveStatus(1,true);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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

//Phase 3
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 3 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar aos cristais, após isso, os colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(6));
        gridMapHelper.addObstacle(9,9,3,3);
        gridMapHelper.addObstacle(9,9,6,6);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        traps = [];
        const trapGeometry = new THREE.BoxGeometry(2,1,2);
        const trapMaterial = new THREE.MeshLambertMaterial({color: "rgb(255,0,0)"});
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(7));

        gridMapHelper.addTrap(4,2, traps[0]);
        gridMapHelper.addTrap(4,7, traps[1]);
        gridMapHelper.addTrap(6,4, traps[2]);
        gridMapHelper.addTrap(6,5, traps[3]);
        gridMapHelper.addTrap(9,2, traps[4]);
        gridMapHelper.addTrap(9,7, traps[5]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        scene.add(traps[4]);
        scene.add(traps[5]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(10,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(12,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(2,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(5,1);
        boxMaterial[3].map.repeat.set(5,1);
        boxMaterial[4].map.repeat.set(5,1);
        boxMaterial[5].map.repeat.set(5,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(6,1);
        boxMaterial2[3].map.repeat.set(6,1);
        boxMaterial2[4].map.repeat.set(6,1);
        boxMaterial2[5].map.repeat.set(6,1);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[2].map.repeat.set(2,1);
        boxMaterial3[3].map.repeat.set(2,1);
        boxMaterial3[4].map.repeat.set(2,1);
        boxMaterial3[5].map.repeat.set(2,1);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[2].map.repeat.set(3,1);
        boxMaterial4[3].map.repeat.set(3,1);
        boxMaterial4[4].map.repeat.set(3,1);
        boxMaterial4[5].map.repeat.set(3,1);
        const boxMaterial5 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(4.5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4.5));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7));

        walls[2].rotateY(Math.PI/2)
        walls[3].rotateY(Math.PI/2)

        scene.add(walls[0]);
        scene.add(walls[1]);        
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);


        gridMapHelper.addObstacle(3,7,9,9);
        gridMapHelper.addObstacle(3,7,0,0);
        gridMapHelper.addObstacle(3,3,2,7);
        gridMapHelper.addObstacle(5,5,4,5);
        gridMapHelper.addObstacle(5,5,7,7);
        gridMapHelper.addObstacle(5,5,2,2);
        gridMapHelper.addObstacle(7,8,7,7);
        gridMapHelper.addObstacle(7,8,2,2);
        gridMapHelper.addObstacle(7,9,4,4);
        gridMapHelper.addObstacle(7,9,5,5);

        laserFences = [];
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
        laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
        gridMapHelper.addLaser(3,1, laserFences[0]);
        gridMapHelper.addLaser(3,8, laserFences[1]);
        gridMapHelper.addLaser(7,1, laserFences[2]);
        gridMapHelper.addLaser(7,3, laserFences[3]);
        gridMapHelper.addLaser(7,6, laserFences[4]);
        gridMapHelper.addLaser(7,8, laserFences[5]);

        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);
        scene.add(laserFences[4]);
        scene.add(laserFences[5]);

         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(0,true);
                changeLaserActiveStatus(1,true);
                changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(5,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(0,false);
                changeLaserActiveStatus(1,false);
                changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(5,true);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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

//Phase 4
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 4 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar ao cristal, após isso, o colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        gridMapHelper.addObstacle(8,8,9,9);
        scene.add(objectives[0]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(1));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(5));

        gridMapHelper.addTrap(0,4, traps[0]);
        gridMapHelper.addTrap(3,5, traps[1]);
        gridMapHelper.addTrap(5,1, traps[2]);
        gridMapHelper.addTrap(7,5, traps[3]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(12,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(10,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(8,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(20,2,2);
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(6,1);
        boxMaterial[3].map.repeat.set(6,1);
        boxMaterial[4].map.repeat.set(6,1);
        boxMaterial[5].map.repeat.set(6,1);
        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(3,1);
        boxMaterial2[3].map.repeat.set(3,1);
        boxMaterial2[4].map.repeat.set(3,1);
        boxMaterial2[5].map.repeat.set(3,1);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[2].map.repeat.set(5,1);
        boxMaterial3[3].map.repeat.set(5,1);
        boxMaterial3[4].map.repeat.set(5,1);
        boxMaterial3[5].map.repeat.set(5,1);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[2].map.repeat.set(4,1);
        boxMaterial4[3].map.repeat.set(4,1);
        boxMaterial4[4].map.repeat.set(4,1);
        boxMaterial4[5].map.repeat.set(4,1);
        const boxMaterial5 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial5[2].map.repeat.set(10,1);
        boxMaterial5[3].map.repeat.set(10,1);
        boxMaterial5[4].map.repeat.set(10,1);
        boxMaterial5[5].map.repeat.set(10,1);
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(4.5));
        gridMapHelper.addObstacle(0,5,0,0);
        gridMapHelper.addObstacle(1,1,4,8);
        gridMapHelper.addObstacle(1,3,2,2);
        gridMapHelper.addObstacle(3,3,2,4);
        gridMapHelper.addObstacle(3,3,6,9);
        gridMapHelper.addObstacle(5,5,2,4);
        gridMapHelper.addObstacle(5,5,6,8);
        gridMapHelper.addObstacle(7,7,1,4);
        gridMapHelper.addObstacle(7,7,6,9);
        gridMapHelper.addObstacle(9,9,0,9);
        walls[1].rotateY(Math.PI/2)
        walls[3].rotateY(Math.PI/2)
        walls[4].rotateY(Math.PI/2)
        walls[5].rotateY(Math.PI/2)
        walls[6].rotateY(Math.PI/2)
        walls[7].rotateY(Math.PI/2)
        walls[8].rotateY(Math.PI/2)
        walls[9].rotateY(Math.PI/2)

        scene.add(walls[0]);
        scene.add(walls[1]);        
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);


        laserFences = [];
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        gridMapHelper.addLaser(5,5, laserFences[0]);
        gridMapHelper.addLaser(8,7, laserFences[1]);
        gridMapHelper.addLaser(5,9, laserFences[2]);
        laserFences[1].rotateY(Math.PI/2)
        scene.add(laserFences[0]);
        scene.add(laserFences[1]); 
        scene.add(laserFences[2]); 

         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(1,true);
                changeLaserActiveStatus(2,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(1,false);
                changeLaserActiveStatus(2,true);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado com sucesso.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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

//Phase 5
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 5 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar aos cristais, após isso, os colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
        gridMapHelper.addObstacle(0,0,0,0);
        gridMapHelper.addObstacle(9,9,7,7);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());

        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(6));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(6));


        gridMapHelper.addTrap(0,6, traps[0]);
        gridMapHelper.addTrap(3,6, traps[1]);

        scene.add(traps[0]);
        scene.add(traps[1]);


        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(14,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(10,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry6 = new THREE.BoxGeometry(12,2,2);
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
        boxMaterial2[2].map.repeat.set(7,1);
        boxMaterial2[3].map.repeat.set(7,1);
        boxMaterial2[4].map.repeat.set(7,1);
        boxMaterial2[5].map.repeat.set(7,1);
        const boxMaterial3 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial5 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial5[2].map.repeat.set(2,1);
        boxMaterial5[3].map.repeat.set(2,1);
        boxMaterial5[4].map.repeat.set(2,1);
        boxMaterial5[5].map.repeat.set(2,1);
        const boxMaterial6 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial6[2].map.repeat.set(6,1);
        boxMaterial6[3].map.repeat.set(6,1);
        boxMaterial6[4].map.repeat.set(6,1);
        boxMaterial6[5].map.repeat.set(6,1);
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry6,boxMaterial6));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry6,boxMaterial6));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));



        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4.5),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(2));


        gridMapHelper.addObstacle(1,1,4,6);
        gridMapHelper.addObstacle(0,2,9,9);
        gridMapHelper.addObstacle(2,4,4,4);
        gridMapHelper.addObstacle(2,7,1,1);
        gridMapHelper.addObstacle(4,6,3,3);
        gridMapHelper.addObstacle(6,6,2,2);
        gridMapHelper.addObstacle(3,8,7,7);
        gridMapHelper.addObstacle(5,6,8,8);
        gridMapHelper.addObstacle(8,9,9,9);
        gridMapHelper.addObstacle(9,9,0,6);
        gridMapHelper.addObstacle(1,1,2,2);


        walls[0].rotateY(Math.PI/2)
        walls[9].rotateY(Math.PI/2)



        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);
        scene.add(walls[10]);




        laserFences = [];
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));

        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(8));

        gridMapHelper.addLaser(0,2, laserFences[0]);
        gridMapHelper.addLaser(2,0, laserFences[1]);
        gridMapHelper.addLaser(5,9, laserFences[2]);
        gridMapHelper.addLaser(8,1, laserFences[3]);
        gridMapHelper.addLaser(8,8, laserFences[4]);

        laserFences[0].rotateY(Math.PI/2)
        laserFences[3].rotateY(Math.PI/2)
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);
        scene.add(laserFences[4]);


         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(4,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(4,true);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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

//Phase 6
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 6 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar aos cristais, após isso, os colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(9,9,9,9);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());

        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(8));


        gridMapHelper.addTrap(3,4,traps[0]);
        gridMapHelper.addTrap(7,5,traps[1]);
        gridMapHelper.addTrap(8,3,traps[2]);
        gridMapHelper.addTrap(1,7,traps[3]);
        gridMapHelper.addTrap(3,8,traps[4]);

        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        scene.add(traps[4]);


        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(10,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(12,2,2);
        const boxGeometry6 = new THREE.BoxGeometry(14,2,2);
        
        const boxMaterial = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial[2].map.repeat.set(5,1);
        boxMaterial[3].map.repeat.set(5,1);
        boxMaterial[4].map.repeat.set(5,1);
        boxMaterial[5].map.repeat.set(5,1);
        const boxMaterial2 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[2].map.repeat.set(2,1);
        boxMaterial3[3].map.repeat.set(2,1);
        boxMaterial3[4].map.repeat.set(2,1);
        boxMaterial3[5].map.repeat.set(2,1);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[2].map.repeat.set(3,1);
        boxMaterial4[3].map.repeat.set(3,1);
        boxMaterial4[4].map.repeat.set(3,1);
        boxMaterial4[5].map.repeat.set(3,1);
        const boxMaterial5 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial5[2].map.repeat.set(6,1);
        boxMaterial5[3].map.repeat.set(6,1);
        boxMaterial5[4].map.repeat.set(6,1);
        boxMaterial5[5].map.repeat.set(6,1);
        const boxMaterial6 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial6[2].map.repeat.set(7,1);
        boxMaterial6[3].map.repeat.set(7,1);
        boxMaterial6[4].map.repeat.set(7,1);
        boxMaterial6[5].map.repeat.set(7,1);
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry6,boxMaterial6));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2));

        gridMapHelper.addObstacle(0,4,9,9);
        gridMapHelper.addObstacle(0,0,8,8);
        gridMapHelper.addObstacle(0,0,1,2);
        gridMapHelper.addObstacle(1,1,1,3);
        gridMapHelper.addObstacle(0,5,0,0);
        gridMapHelper.addObstacle(1,2,5,5);
        gridMapHelper.addObstacle(3,4,6,6);
        gridMapHelper.addObstacle(3,4,3,3);
        gridMapHelper.addObstacle(5,5,2,2);        
        gridMapHelper.addObstacle(5,5,7,7);
        gridMapHelper.addObstacle(6,6,2,8);
        gridMapHelper.addObstacle(8,9,8,8);
        gridMapHelper.addObstacle(8,8,7,7);
        gridMapHelper.addObstacle(8,9,1,1);
        gridMapHelper.addObstacle(8,8,2,2);
        gridMapHelper.addObstacle(9,9,5,5);

        walls[2].rotateY(Math.PI/2)
        walls[3].rotateY(Math.PI/2)
        walls[10].rotateY(Math.PI/2)



        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);
        scene.add(walls[10]);
        scene.add(walls[11]);
        scene.add(walls[12]);
        scene.add(walls[13]);
        scene.add(walls[14]);
        scene.add(walls[15]);

        laserFences = [];
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));

        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(0));

        gridMapHelper.addLaser(2,3, laserFences[0]);
        gridMapHelper.addLaser(6,9, laserFences[1]);
        gridMapHelper.addLaser(7,7, laserFences[2]);
        gridMapHelper.addLaser(7,2, laserFences[3]);
        gridMapHelper.addLaser(8,9, laserFences[4]);
        gridMapHelper.addLaser(8,0, laserFences[5]);

        laserFences[0].rotateY(Math.PI/2)
        laserFences[2].rotateY(Math.PI/2)
        laserFences[3].rotateY(Math.PI/2)
        
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);
        scene.add(laserFences[4]);
        scene.add(laserFences[5]);


         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(3,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(3,true);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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

//Phase 7
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 7 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar aos cristais, após isso, os colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(6));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(2,2,6,6);
        gridMapHelper.addObstacle(4,4,5,5);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());

        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(6));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(2));

        gridMapHelper.addTrap(1,6,traps[0]);
        gridMapHelper.addTrap(7,5,traps[1]);
        gridMapHelper.addTrap(9,2,traps[2]);

        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(12,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(8,2,2);
        
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
        boxMaterial2[2].map.repeat.set(6,1);
        boxMaterial2[3].map.repeat.set(6,1);
        boxMaterial2[4].map.repeat.set(6,1);
        boxMaterial2[5].map.repeat.set(6,1);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[2].map.repeat.set(2,1);
        boxMaterial3[3].map.repeat.set(2,1);
        boxMaterial3[4].map.repeat.set(2,1);
        boxMaterial3[5].map.repeat.set(2,1);
        const boxMaterial4 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        const boxMaterial5 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial5[2].map.repeat.set(4,1);
        boxMaterial5[3].map.repeat.set(4,1);
        boxMaterial5[4].map.repeat.set(4,1);
        boxMaterial5[5].map.repeat.set(4,1);
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4.5));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(8.5));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));

        gridMapHelper.addObstacle(1,1,1,3);
        gridMapHelper.addObstacle(1,1,7,9);
        gridMapHelper.addObstacle(1,1,7,9);
        gridMapHelper.addObstacle(1,1,7,9);
        gridMapHelper.addObstacle(1,1,7,9);
        gridMapHelper.addObstacle(3,8,6,6);
        gridMapHelper.addObstacle(4,4,7,8);
        gridMapHelper.addObstacle(5,5,4,5);
        gridMapHelper.addObstacle(6,6,8,9);
        gridMapHelper.addObstacle(8,8,7,8);
        gridMapHelper.addObstacle(3,3,8,8);
        gridMapHelper.addObstacle(8,8,4,4);
        gridMapHelper.addObstacle(7,7,1,4);

        walls[0].rotateY(Math.PI/2)
        walls[1].rotateY(Math.PI/2)
        walls[3].rotateY(Math.PI/2)
        walls[6].rotateY(Math.PI/2)
        walls[7].rotateY(Math.PI/2)
        walls[8].rotateY(Math.PI/2)
        walls[9].rotateY(Math.PI/2)
        walls[12].rotateY(Math.PI/2)

        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);
        scene.add(walls[10]);
        scene.add(walls[11]);
        scene.add(walls[12]);

        laserFences = [];
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("multiColor"));

        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
        laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(7));

        gridMapHelper.addLaser(1,4, laserFences[0]);
        gridMapHelper.addLaser(1,0, laserFences[1]);
        gridMapHelper.addLaser(2,8, laserFences[2]);
        gridMapHelper.addLaser(4,4, laserFences[3]);
        gridMapHelper.addLaser(6,7, laserFences[4]);

        laserFences[2].rotateY(Math.PI/2)
        laserFences[3].rotateY(Math.PI/2)
        
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);
        scene.add(laserFences[4]);


         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(3,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(3,true);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }

            if(!objectives[0].visible && !objectives[1].visible)
            {
                consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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
        document.getElementById('phaseTitle').innerText = "Nível 3 - Fase 8 de 8";
        document.getElementById('phaseObjective').innerText = "Faça o robô chegar aos cristais, após isso, os colete.";
        
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(3);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(1));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addObstacle(0,0,0,0);
        gridMapHelper.addObstacle(9,9,1,1);
        gridMapHelper.addObstacle(9,9,3,3);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());

        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(1));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(2));

        gridMapHelper.addTrap(0,1,traps[0]);
        gridMapHelper.addTrap(8,3,traps[1]);
        gridMapHelper.addTrap(9,2,traps[2]);

        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);


        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(14,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(10,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(2,2,2);
 
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
        boxMaterial2[2].map.repeat.set(5,1);
        boxMaterial2[3].map.repeat.set(5,1);
        boxMaterial2[4].map.repeat.set(5,1);
        boxMaterial2[5].map.repeat.set(5,1);
        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[2].map.repeat.set(3,1);
        boxMaterial3[3].map.repeat.set(3,1);
        boxMaterial3[4].map.repeat.set(3,1);
        boxMaterial3[5].map.repeat.set(3,1);
        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[2].map.repeat.set(2,1);
        boxMaterial4[3].map.repeat.set(2,1);
        boxMaterial4[4].map.repeat.set(2,1);
        boxMaterial4[5].map.repeat.set(2,1);
        const boxMaterial5 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(0));

        gridMapHelper.addObstacle(1,1,2,8);
        gridMapHelper.addObstacle(3,3,3,9);
        gridMapHelper.addObstacle(5,5,2,8);
        gridMapHelper.addObstacle(1,5,1,1);
        gridMapHelper.addObstacle(6,8,8,8);
        gridMapHelper.addObstacle(8,9,6,6);
        gridMapHelper.addObstacle(7,8,4,4);
        gridMapHelper.addObstacle(7,8,2,2);
        gridMapHelper.addObstacle(6,6,6,6);
        gridMapHelper.addObstacle(7,7,0,0);

        walls[0].rotateY(Math.PI/2)
        walls[1].rotateY(Math.PI/2)
        walls[2].rotateY(Math.PI/2)

        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);

        laserFences = [];
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));

        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
        laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        laserFences[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(1));

        gridMapHelper.addLaser(0,6, laserFences[0]);
        gridMapHelper.addLaser(2,8, laserFences[1]);
        gridMapHelper.addLaser(3,0, laserFences[2]);
        gridMapHelper.addLaser(4,3, laserFences[3]);
        gridMapHelper.addLaser(6,9, laserFences[4]);
        gridMapHelper.addLaser(7,6, laserFences[5]);
        gridMapHelper.addLaser(7,1, laserFences[6]);

        laserFences[0].rotateY(Math.PI/2)
        laserFences[1].rotateY(Math.PI/2)
        laserFences[3].rotateY(Math.PI/2)
        laserFences[5].rotateY(Math.PI/2)
        
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);
        scene.add(laserFences[4]);
        scene.add(laserFences[5]);
        scene.add(laserFences[6]);


         laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(3,false);
                changeLaserActiveStatus(4,true);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(3,true);
                changeLaserActiveStatus(4,false);
            }
        }

        coletarCristal = () => {
            if(sceneProperties.cancelExecution)
            {
                return;
            }

            if(checkCollision(actor.getObjectByName('interactionReference'),objectives[0],gridMapHelper))
            {
                objectives[0].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                objectives[2].visible = false;
                consoleElement.innerText += "Cristal coletado.\n";
                gridMapHelper.obstacles[2].active = false;
            }
            else
            {
                consoleElement.innerText += "Robô não está em frente ao cristal.\n";
            }

            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible)
            {
                consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            objectives[2].visible = true;
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
            gridMapHelper.obstacles[2].active = true;
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
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

        setLaserStatesInterval = setInterval(() => {
            if(sceneProperties.executing)
            {
                return;
            }

            laserState = (laserState + 1) % 2;
            setLaserStates();
        },1000);

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
        document.getElementById('winMessage').innerText = "Nível Concluído";
        document.getElementById('advanceBtn').innerText = "Finalizar";
        timerUpadate = setInterval(updateTime,1000);
    }
);

function removeObjects(crystals, walls, traps, lasers)
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

    if(lasers != undefined)
    {
        for(let i = 0; i < lasers.length; i++)
        {
            scene.remove(lasers[i]);
        }   
        gridMapHelper.clearLasers();   
    }

    crystals = undefined;
    walls = undefined;
    traps = undefined;
    lasers = undefined;
}

function animate()
{
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(animate);
    displayTime(sceneProperties.timer,document.getElementById("timer"));
}

window.addEventListener('resize',() => {
    resizeCanvasToDisplaySize(renderer,camera);
});

const finishEarlierButton = document.getElementById('finishEarlier');

const execBtn = document.getElementById("execBtn")
execBtn.addEventListener("click",async function() {
    const codeParsed = parseCode(editor.state.doc.toString());
    console.log(codeParsed);
    sceneProperties.cancelExecution = false;
    if(traps != null)
        trapsDeactivation(traps)
    if(codeParsed != null)
    {
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
                configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender','prog-exp',document.getElementById("subBtn"),sceneProperties.timer,'../','Nível 3/Completo');
            }
        }
        else
        {
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click",() => {
    sceneProperties.cancelExecution = true;
    resetLevel();
});

const advanceBtn = document.getElementById('advanceBtn');
advanceBtn.addEventListener('click',(e) => {
    sceneProperties.phase++;
    if(sceneProperties.phase < phaseGeneration.length)
    {
        if(setLaserStatesInterval)
        {
            clearInterval(setLaserStatesInterval);
            setLaserStatesInterval = undefined;
        }
        removeObjects(objectives,walls,traps,laserFences);
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
    if(confirm("Deseja realmente finalizar a prática?"))
    {
        clearInterval(timerUpadate);
        configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender','prog-exp',document.getElementById("subBtn"),sceneProperties.timer,'../',`Nível 3/Fase ${sceneProperties.phase + 1}`);
        logModal.show();
    }
});

resizeCanvasToDisplaySize(renderer,camera);
phaseGeneration[sceneProperties.phase]();
animate();