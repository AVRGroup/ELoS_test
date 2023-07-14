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
import CranckDoor from "../three/CranckDoor";
import Cranck from "../three/CranckDoor/cranck";
import CranckBase from "../three/CranckDoor/cranckBase";
import LaserFence from "../three/LaserFence";
import {SpikeTrap, trapsActivation, trapsDeactivation} from "../three/SpikeTrap";
import parseCode from "./parser";

const sceneProperties = {
    cancelExecution: false,
    phase: 0
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

const girarManivelaBtn = document.getElementById('girarManivela');
girarManivelaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "girarManivela()\n"}})
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

const portaFechadaBtn = document.getElementById('portaFechada');
portaFechadaBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "portaFechada()"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "portaFechada()"}})
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

const enquantoBtn = document.getElementById('enquanto');
enquantoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  "enquanto(?){\n\n}\n"}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  "enquanto(?){\n\n}\n"}})
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

let objectives;
let walls;
let openDoors;
let crancks;
let cranckBases;
let cranckInteractionReferences;
let doors;
let traps;
let laserFences

scene.add(plane);
scene.add(actor);

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

let girarManivela;

let portaFechada;

let coletarCristal;

let resetLevel;

let winCondition;

const phaseGeneration = [];


// Phase 1
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 4 - Fase 2 de 8";
        document.getElementById('phaseObjective').innerText = "Abra a porta, faça o robô chegar ao cristal, após isso, o colete.";
        
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(1);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(9,9,5,5);
        scene.add(objectives[0]);
        
        openDoors = [];
        doors = [];
        cranckBases = [];
        crancks = [];
        cranckInteractionReferences = [];
        cranckBases.push(new CranckBase())
        crancks.push(new Cranck());
        cranckInteractionReferences.push(new THREE.Object3D())
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        crancks[0].correctPos('right', cranckInteractionReferences[0], cranckBases[0])
        doors.push(new CranckDoor(crancks[0]));
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        gridMapHelper.addObstacle(5,5,5,5);
        scene.add(crancks[0]);
        scene.add(doors[0]);
        openDoors.push(false);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(18,2,2);
        const boxMaterial = new THREE.MeshLambertMaterial({color: "rgb(0,255,0)"});
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        scene.add(walls[0]);
        scene.add(walls[1]);
        gridMapHelper.addObstacle(1,9,4,4);
        gridMapHelper.addObstacle(1,9,6,6);

        portaFechada = () => {
            if(sceneProperties.cancelExecution)
            {
                return false;
            }

            if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[0],gridMapHelper))
            {
                return !openDoors[0];
            }
            else
            {
                consoleElement.innerText += "É preciso estar de frente de uma manivela para usar este comando.\n";
                return false;
            }
        }

        girarManivela = () => {
            
            return new Promise((resolve) =>{

                if(sceneProperties.cancelExecution)
                {
                    resolve();
                }
                if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[0],gridMapHelper))
                {
                    function translateDoor()
                    {
                        doors[0].lerpDoor(0, -2)
                        doors[0].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[0].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[0] = true;
                        gridMapHelper.obstacles[1].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else
                {
                    consoleElement.innerText += "É preciso estar de frente de uma manivela para usar este comando.\n";
                    resolve();   
                }
            });
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
            for(let i = 0; i < openDoors.length; i++){
                openDoors[i] = false;
            }
            doors.forEach(door => door.resetPos());
            gridMapHelper.obstacles[0].active = true;
            gridMapHelper.obstacles[1].active = true;
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
    }
);

// Phase 2
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 4 - Fase 2 de 8";
        document.getElementById('phaseObjective').innerText = "Abra a porta, faça o robô chegar ao cristal, após isso, o colete.";
        
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(3);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(0,0,9,9);
        gridMapHelper.addObstacle(9,9,9,9);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = [];
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        cranckBases.push(new CranckBase())
        cranckBases.push(new CranckBase())
        cranckInteractionReferences.push(new THREE.Object3D())
        cranckInteractionReferences.push(new THREE.Object3D())
        doors.push(new CranckDoor(crancks[0]));
        doors.push(new CranckDoor(crancks[1]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        scene.add(cranckBases[0]);
        scene.add(cranckBases[1]);
        scene.add(crancks[0]);
        scene.add(crancks[1]);
        crancks[0].correctPos("up", cranckInteractionReferences[0], cranckBases[0])
        crancks[1].correctPos("down", cranckInteractionReferences[1], cranckBases[1])
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        doors[0].rotateY(-Math.PI / 2)
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        doors[1].rotateY(Math.PI / 2)
        gridMapHelper.addObstacle(5,5,7,7);
        gridMapHelper.addObstacle(5,5,3,3);
        scene.add(doors[0]);
        scene.add(doors[1]);
        openDoors.push(false);
        openDoors.push(false);

        laserFences = [];
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("red"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        laserFences[1].rotateY(Math.PI / 2);
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        laserFences[2].rotateY(Math.PI / 2);
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addLaser(7,9, laserFences[0]);
        gridMapHelper.addLaser(9,2, laserFences[1]);
        gridMapHelper.addLaser(9,7, laserFences[2]);
        gridMapHelper.addLaser(7,0, laserFences[3]);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        gridMapHelper.addTrap(0,7, traps[0]);
        gridMapHelper.addTrap(0,2, traps[1]);
        scene.add(traps[0]);
        scene.add(traps[1]);

        walls = [];
        const boxGeometry = new THREE.BoxGeometry(6,2,2);
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(8,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(4,2,2);
        const boxMaterial = new THREE.MeshLambertMaterial({color: "rgb(0,255,0)"});
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(6.5));
        walls[3].rotateY(Math.PI / 2)
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[4].rotateY(Math.PI / 2)
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[6].rotateY(Math.PI / 2)
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(3.5));
        walls[8].rotateY(Math.PI / 2)
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[9].rotateY(Math.PI / 2)
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(3.5));
        walls[10].rotateY(Math.PI / 2)
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2));
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
        gridMapHelper.addObstacle(2,4,6,6);
        gridMapHelper.addObstacle(1,3,7,7);
        gridMapHelper.addObstacle(3,3,8,8);
        gridMapHelper.addObstacle(6,6,6,6);
        gridMapHelper.addObstacle(7,7,6,8);
        gridMapHelper.addObstacle(8,8,7,7);
        gridMapHelper.addObstacle(3,3,1,4);
        gridMapHelper.addObstacle(1,2,2,2);
        gridMapHelper.addObstacle(4,4,4,4);
        gridMapHelper.addObstacle(7,7,1,4);
        gridMapHelper.addObstacle(6,6,4,4);
        gridMapHelper.addObstacle(8,8,2,2);

        const doorInteractionReference = new THREE.Object3D();
        doorInteractionReference.position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(4));

        portaFechada = () => {
            if(sceneProperties.cancelExecution)
            {
                return false;
            }

            if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[0],gridMapHelper))
            {
                return !openDoors[0];
            }
            else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[1],gridMapHelper))
            {
                return !openDoors[1];
            }
            else
            {
                consoleElement.innerText += "É preciso estar de frente de uma manivela para usar este comando.\n";
                return false;
            }
        }

        girarManivela = () => {
            
            return new Promise((resolve) =>{

                if(sceneProperties.cancelExecution)
                {
                    resolve();
                }
                if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[0],gridMapHelper))
                {
                    function translateDoor()
                    {
                        doors[0].lerpDoor(0, -2)
                        doors[0].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[0].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[0] = true;
                        gridMapHelper.obstacles[3].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[1],gridMapHelper)){
                    function translateDoor()
                    {
                        doors[1].lerpDoor(0, -2)
                        doors[1].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[1].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[1] = true;
                        gridMapHelper.obstacles[4].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else
                {
                    consoleElement.innerText += "É preciso estar de frente de uma manivela para usar este comando.\n";
                    resolve();   
                }
            });
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
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado com sucesso.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                objectives[2].visible = false;
                consoleElement.innerText += "Cristal coletado com sucesso.\n";
                gridMapHelper.obstacles[2].active = false;
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
            for(let i = 0; i < openDoors.length; i++){
                openDoors[i] = false;
            }
            doors.forEach(door => door.resetPos());
            gridMapHelper.obstacles.forEach(obstacle => obstacle.active = true);
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

        laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserActiveStatus(0,true);
                changeLaserActiveStatus(1,false);
                changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(3,false);
            }
            else
            {
                changeLaserActiveStatus(0,false);
                changeLaserActiveStatus(1,true);
                changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(3,true);
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
    }
);

// Phase 3
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = "Nível 4 - Fase 3 de 8";
        document.getElementById('phaseObjective').innerText = "Abra a porta, faça o robô chegar ao cristal, após isso, o colete.";
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(3);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(0,0,0,0);
        gridMapHelper.addObstacle(9,9,9,9);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = [];
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        cranckBases.push(new CranckBase())
        cranckBases.push(new CranckBase())
        cranckBases.push(new CranckBase())
        cranckInteractionReferences.push(new THREE.Object3D())
        cranckInteractionReferences.push(new THREE.Object3D())
        cranckInteractionReferences.push(new THREE.Object3D())
        doors.push(new CranckDoor(crancks[0]));
        doors.push(new CranckDoor(crancks[1]));
        doors.push(new CranckDoor(crancks[2]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        scene.add(cranckBases[0]);
        scene.add(cranckBases[1]);
        scene.add(cranckBases[2]);
        scene.add(crancks[0]);
        scene.add(crancks[1]);
        scene.add(crancks[2]);
        crancks[0].correctPos("down", cranckInteractionReferences[0], cranckBases[0])
        crancks[1].correctPos("right", cranckInteractionReferences[1], cranckBases[1])
        crancks[2].correctPos("up", cranckInteractionReferences[2], cranckBases[2])
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        doors[2].rotateY(Math.PI / 2)
        gridMapHelper.addObstacle(1,1,9,9);
        gridMapHelper.addObstacle(8,8,7,7);
        gridMapHelper.addObstacle(9,9,1,1);
        scene.add(doors[0]);
        scene.add(doors[1]);
        scene.add(doors[2]);
        openDoors.push(false);
        openDoors.push(false);
        openDoors.push(false);

        laserFences = [];
        laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        gridMapHelper.addLaser(5,9, laserFences[0]);
        gridMapHelper.addLaser(5,5, laserFences[1]);
        gridMapHelper.addLaser(9,6, laserFences[2]);
        gridMapHelper.addLaser(6,2, laserFences[3]);
        laserFences[2].rotateY(Math.PI / 2);
        laserFences[3].rotateY(Math.PI / 2);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        scene.add(laserFences[3]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(1));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(8));
        gridMapHelper.addTrap(0,1, traps[0]);
        gridMapHelper.addTrap(3,5, traps[1]);
        gridMapHelper.addTrap(9,8, traps[2]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(8,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(10,2,2);
        const boxGeometry6 = new THREE.BoxGeometry(12,2,2);
        const boxMaterial = new THREE.MeshLambertMaterial({color: "rgb(0,255,0)"});
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry6,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[0].rotateY(Math.PI / 2)
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[1].rotateY(Math.PI / 2)
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2.5));
        walls[7].rotateY(Math.PI / 2)
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[10].rotateY(Math.PI / 2)
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[11].rotateY(Math.PI / 2)
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
        gridMapHelper.addObstacle(1,1,6,8);
        gridMapHelper.addObstacle(1,1,1,4);
        gridMapHelper.addObstacle(2,3,6,6);
        gridMapHelper.addObstacle(2,3,4,4);
        gridMapHelper.addObstacle(3,8,8,8);
        gridMapHelper.addObstacle(5,8,6,6);
        gridMapHelper.addObstacle(5,8,4,4);
        gridMapHelper.addObstacle(5,5,2,3);
        gridMapHelper.addObstacle(3,4,3,3);
        gridMapHelper.addObstacle(3,3,1,1);
        gridMapHelper.addObstacle(7,7,0,2);
        gridMapHelper.addObstacle(8,8,1,2);

        portaFechada = () => {
            if(sceneProperties.cancelExecution)
            {
                return false;
            }

            if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[0],gridMapHelper))
            {
                return !openDoors[0];
            }
            else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[1],gridMapHelper))
            {
                return !openDoors[1];
            }
            else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[2],gridMapHelper))
            {
                return !openDoors[2];
            }
            else
            {
                consoleElement.innerText += "É preciso estar de frente de uma manivela para usar este comando.\n";
                return false;
            }
        }

        girarManivela = () => {
            
            return new Promise((resolve) =>{

                if(sceneProperties.cancelExecution)
                {
                    resolve();
                }
                if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[0],gridMapHelper))
                {
                    function translateDoor()
                    {
                        doors[0].lerpDoor(0, -2)
                        doors[0].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[0].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[0] = true;
                        gridMapHelper.obstacles[3].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[1],gridMapHelper)){
                    function translateDoor()
                    {
                        doors[1].lerpDoor(0, -2)
                        doors[1].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[1].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[1] = true;
                        gridMapHelper.obstacles[4].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[2],gridMapHelper)){
                    function translateDoor()
                    {
                        doors[2].lerpDoor(0, -2)
                        doors[2].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[2].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[2] = true;
                        gridMapHelper.obstacles[5].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else
                {
                    consoleElement.innerText += "É preciso estar de frente de uma manivela para usar este comando.\n";
                    resolve();   
                }
            });
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
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                objectives[1].visible = false;
                consoleElement.innerText += "Cristal coletado com sucesso.\n";
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                objectives[2].visible = false;
                consoleElement.innerText += "Cristal coletado com sucesso.\n";
                gridMapHelper.obstacles[2].active = false;
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
            for(let i = 0; i < openDoors.length; i++){
                openDoors[i] = false;
            }
            doors.forEach(door => door.resetPos());
            gridMapHelper.obstacles.forEach(obstacle => obstacle.active = true);
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

        laserState = 0;
        setLaserStates = () => {
            if(laserState == 0)
            {
                changeLaserStateStatus(0, 'blue');
                changeLaserActiveStatus(0,true);
                changeLaserActiveStatus(1,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(0,false);
                changeLaserActiveStatus(1,true);
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
    }
);

function removeObjects(crystals, walls, traps, lasers, doors, crancks, cranckBases, cranckInteractionReferences)
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

    if(doors != undefined)
    {
        for(let i = 0; i < doors.length; i++)
        {
            scene.remove(doors[i]);
        }   
        gridMapHelper.clearDoors();   
    }

    if(crancks != undefined)
    {
        for(let i = 0; i < crancks.length; i++)
        {
            scene.remove(crancks[i]);
        }   
        gridMapHelper.clearDoors();   
    }

    if(cranckBases != undefined)
    {
        for(let i = 0; i < cranckBases.length; i++)
        {
            scene.remove(cranckBases[i]);
        }   
        gridMapHelper.clearDoors();   
    }

    if(cranckInteractionReferences != undefined)
    {
        for(let i = 0; i < cranckInteractionReferences.length; i++)
        {
            scene.remove(cranckInteractionReferences[i]);
        }   
        gridMapHelper.clearDoors();   
    }

    crystals = undefined;
    walls = undefined;
    traps = undefined;
    lasers = undefined;
    doors = undefined;
    crancks = undefined;
    cranckBases = undefined;
    cranckInteractionReferences = undefined;
}

function animate()
{
    renderer.render(scene,camera);
    controls.update();
    requestAnimationFrame(animate);
}

window.addEventListener('resize',() => {
    resizeCanvasToDisplaySize(renderer,camera);
});

const execBtn = document.getElementById("execBtn")
execBtn.addEventListener("click",async function() {
    const codeParsed = parseCode(editor.state.doc.toString());
    console.log(codeParsed);
    sceneProperties.cancelExecution = false;

    if(codeParsed != null)
    {
        resetLevel();
        this.disabled = true;
        await eval(codeParsed);
        if(winCondition())
        {
            readOnlyState.doc = editor.state.doc;
            editor.setState(readOnlyState);
            document.getElementById('winMessage').classList.remove('invisible');
            document.getElementById('advanceBtn').classList.remove('invisible');
            document.getElementById("resetBtn").disabled = true;
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
        removeObjects(objectives,walls,traps,laserFences, doors, crancks, cranckBases, cranckInteractionReferences);
        phaseGeneration[sceneProperties.phase]();
        editor.setState(editState);
        consoleElement.innerText = null;
        document.getElementById('winMessage').classList.add('invisible');
        document.getElementById('advanceBtn').classList.add('invisible');
        execBtn.disabled = false;
        resetBtn.disabled = false;
    }
    else
    {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        window.location.href = "../";
    }
});

resizeCanvasToDisplaySize(renderer,camera);
phaseGeneration[sceneProperties.phase]();
animate();