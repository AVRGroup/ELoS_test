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
    resetRobotColor,
    materialColor,
    corrID,
    requestID,
    changColorID,
    smokeAnimationFrame,
    smoke
} from "../three/util";
import GridMapHelper from "../three/GridMapHelper";
import CranckDoor from "../three/CranckDoor";
import Cranck from "../three/CranckDoor/cranck";
import CranckBase from "../three/CranckDoor/cranckBase";
import LaserFence from "../three/LaserFence";
import {SpikeTrap, trapsActivation, trapsDeactivation} from "../three/SpikeTrap";
import {Smoke} from "../three/Smoke";
import parseCode from "./parser";
import { displayTime, configureDataAndUpload } from "../timer";
import { Modal } from "bootstrap";
import { convertCode } from "../multilangcode";
import crystalSound from "../three/Crystal/crystalSound";

const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0,
    executing: false,
    mult: 1,
    lang: window.location.href.includes('english') ? 1 : 0
}

function generatePhaseTitle()
{
    switch(sceneProperties.lang)
    {
        case 1:
            return `Level 4 - Round ${sceneProperties.phase + 1} of 8`
        default:
            return `Nível 4 - Fase ${sceneProperties.phase + 1} de 8`

    }
}

const textVariations = [
    [
        generatePhaseTitle,
        "Faça o robô chegar ao cristal, após isso, o colete.",
        "Faça o robô chegar aos cristais, após isso, os colete.",
        "Robô não está em frente ao cristal.\n",
        "Cristal coletado.\n",
        "Cristal coletado com sucesso.\n",
        "Todos os cristais coletados com sucesso!\n",
        "Nível Concluído",
        "Finalizar",
        "Deseja realmente finalizar a prática?",
        "O robô entrou em curto circuito por tentar desativar um laser azul que não existe.\n",
        "O robô entrou em curto circuito por tentar desativar um laser vermelho que não existe.\n",
        "Abra a porta, faça o robô chegar ao cristal, após isso, o colete.",
        "É preciso estar de frente de uma manivela para usar este comando.\n"
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
        "Do you really want to finish the practice?",
        "The robot short-circuited after trying to deactivate a blue laser that doesn't exist.\n",
        "The robot short-circuited after trying to deactivate a red laser that doesn't exist.\n",
        "Open the door, make the robot reach the crystal and collect it.",
        "You must be in front of a crank to use this command.\n"
    ]
]

const commandsVariations = [
    [
        'andarFrente(?)\n',
        'andarTras(?)\n',
        'girarEsquerda()\n',
        'girarDireita()\n',
        'darMeiaVolta()\n',
        'coletarCristal()\n',
        'desativarLaserAzul()\n',
        'desativarLaserVermelho()\n',
        'laserAzulAtivo()',
        'laserVermelhoAtivo()',
        'se(?){\n\n}\nsenão{\n\n}\n',
        'girarManivela()\n',
        'portaFechada()',
        'enquanto(?){\n\n}\n',
        'se(?){\n\n}\n'
    ],
    [
        'moveForward(?)\n',
        'moveBackwards(?)\n',
        'rotateLeft()\n',
        'rotateRight()\n',
        'turnBack()',
        'collectCrystal()\n',
        'disableBlueLaser()\n',
        'disableRedLaser()\n',
        'isBlueLaserActive()',
        'isRedLaserActive()',
        'if(?){\n\n}\nelse{\n\n}\n',
        'turnCrank()\n',
        'isDoorClosed()',
        'while(?){\n\n}\n',
        'if(?){\n\n}\n'
    ]
]

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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][0]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][0]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][1]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][1]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][2]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][2]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][3]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][3]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][4]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][4]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][6]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][6]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][7]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][7]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][11]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][11]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][5]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][5]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][8]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][8]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][9]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][9]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][12]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][12]}})
        actualLine = editor.state.doc.lineAt(cursorHead).number
    }
    editor.dispatch(transaction)
    editor.focus()
    let nextLinePos = editor.state.doc.line(actualLine+1).to
    editor.dispatch({selection:{anchor: nextLinePos}})
});

const condicaoBtn = document.getElementById('condicao');
condicaoBtn.addEventListener("click",() => { 
    let cursorAnchor = editor.state.selection.main.anchor
    let cursorHead = editor.state.selection.main.head
    let transaction
    let actualLine
    if(cursorAnchor <= cursorHead){
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert: commandsVariations[sceneProperties.lang][14]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert: commandsVariations[sceneProperties.lang][14]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][10]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][10]}})
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
        transaction = editor.state.update({changes: {from: cursorAnchor, to: cursorHead, insert:  commandsVariations[sceneProperties.lang][13]}})
        actualLine = editor.state.doc.lineAt(cursorAnchor).number
    }
    else {
        transaction = editor.state.update({changes: {from: cursorHead, to: cursorAnchor, insert:  commandsVariations[sceneProperties.lang][13]}})
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

const wallTexture = new THREE.TextureLoader().load(new URL('../../../assets/textures/metalWallLvl4.jpg', import.meta.url).toString());
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;

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
        consoleElement.innerText += textVariations[sceneProperties.lang][10];
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
        consoleElement.innerText += textVariations[sceneProperties.lang][11];
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
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
        
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
        scene.add(cranckBases[0]);
        scene.add(doors[0]);
        openDoors.push(false);

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
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
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
        timerUpadate = setInterval(updateTime,1000);
    }
);

// Phase 2
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
        
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        //objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(0,0,9,9);
        //gridMapHelper.addObstacle(9,9,9,9);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        //scene.add(objectives[2]);

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
        //laserFences.push(new LaserFence("blue"));
        //laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("red"));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        //laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        //laserFences[1].rotateY(Math.PI / 2);
        //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        //laserFences[2].rotateY(Math.PI / 2);
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addLaser(7,9, laserFences[0]);
        //gridMapHelper.addLaser(9,2, laserFences[1]);
        //gridMapHelper.addLaser(9,7, laserFences[2]);
        gridMapHelper.addLaser(7,0, laserFences[1]);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        //scene.add(laserFences[2]);
        //scene.add(laserFences[3]);

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

        const boxMaterial1 = new THREE.MeshLambertMaterial({map:wallTexture.clone()});

        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[2].map.repeat.set(4,1);
        boxMaterial2[3].map.repeat.set(4,1);
        boxMaterial2[4].map.repeat.set(4,1);
        boxMaterial2[5].map.repeat.set(4,1);

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

        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial1));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial1));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial1));
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
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                        gridMapHelper.obstacles[2].active = false;
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
                        gridMapHelper.obstacles[3].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else
                {
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[1].active = false;
            }
            //else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            //{
            //    objectives[2].visible = false;
            //    consoleElement.innerText += "Cristal coletado com sucesso.\n";
            //    gridMapHelper.obstacles[2].active = false;
            //}
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
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            for(let i = 0; i < objectives.length; i++){
                objectives[i].visible = true;
            }
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
            if(!objectives[0].visible && !objectives[1].visible)
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
                //changeLaserActiveStatus(2,true);
                //changeLaserActiveStatus(3,false);
            }
            else
            {
                changeLaserActiveStatus(0,false);
                changeLaserActiveStatus(1,true);
                //changeLaserActiveStatus(2,false);
                //changeLaserActiveStatus(3,true);
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

// Phase 3
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        //objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        //gridMapHelper.addObstacle(0,0,0,0);
        gridMapHelper.addObstacle(9,9,9,9);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        //scene.add(objectives[2]);

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
        //laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        //gridMapHelper.addLaser(5,9, laserFences[0]);
        gridMapHelper.addLaser(5,5, laserFences[0]);
        gridMapHelper.addLaser(9,6, laserFences[1]);
        //gridMapHelper.addLaser(6,2, laserFences[3]);
        //laserFences[0].rotateY(Math.PI / 2);
        laserFences[1].rotateY(Math.PI / 2);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        //scene.add(laserFences[2]);
        //scene.add(laserFences[3]);

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

        const boxMaterial = new THREE.MeshLambertMaterial({map:wallTexture.clone()});

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
        boxMaterial4[2].map.repeat.set(4,1);
        boxMaterial4[3].map.repeat.set(4,1);
        boxMaterial4[4].map.repeat.set(4,1);
        boxMaterial4[5].map.repeat.set(4,1);

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

        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry6,boxMaterial6));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));

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
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                        gridMapHelper.obstacles[2].active = false;
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
                        gridMapHelper.obstacles[3].active = false;
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
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[1].active = false;
            }
            //else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            //{
            //    objectives[2].visible = false;
            //    consoleElement.innerText += "Cristal coletado com sucesso.\n";
            //    gridMapHelper.obstacles[2].active = false;
            //}
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
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
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
            if(!objectives[0].visible && !objectives[1].visible)
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
                //changeLaserActiveStatus(1,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(0,false);
                //changeLaserActiveStatus(1,true);
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
    },
);

//Phase 4
phaseGeneration.push(
    () => {
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        //objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(4));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        gridMapHelper.addObstacle(6,6,9,9);
        //gridMapHelper.addObstacle(6,6,4,4);
        gridMapHelper.addObstacle(9,9,9,9);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        //scene.add(objectives[2]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = [];
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        //crancks.push(new Cranck());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        doors.push(new CranckDoor(crancks[0]));
        doors.push(new CranckDoor(crancks[1]));
        doors.push(new CranckDoor(crancks[2]));
        //doors.push(new CranckDoor(crancks[3]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        crancks[0].correctPos("up", cranckInteractionReferences[0], cranckBases[0]);
        crancks[1].correctPos("down", cranckInteractionReferences[1], cranckBases[1]);
        //crancks[2].correctPos("down", cranckInteractionReferences[2], cranckBases[2]);
        crancks[2].correctPos("up", cranckInteractionReferences[2], cranckBases[2]);
        scene.add(cranckBases[0]);
        scene.add(cranckBases[1]);
        scene.add(cranckBases[2]);
        //scene.add(cranckBases[3]);
        scene.add(crancks[0]);
        scene.add(crancks[1]);
        scene.add(crancks[2]);
        //scene.add(crancks[3]);
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        doors[0].rotateY(Math.PI / 2);
        doors[1].rotateY(Math.PI / 2);
        doors[2].rotateY(Math.PI / 2);
        //doors[3].rotateY(Math.PI / 2);
        gridMapHelper.addObstacle(2,2,7,7);
        gridMapHelper.addObstacle(2,2,1,1);
        //gridMapHelper.addObstacle(6,6,1,1);
        gridMapHelper.addObstacle(6,6,8,8);
        scene.add(doors[0]);
        scene.add(doors[1]);
        scene.add(doors[2]);
        //scene.add(doors[3]);
        openDoors.push(false);
        openDoors.push(false);
        openDoors.push(false);
        //openDoors.push(false);

        laserFences = [];
        //laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        //laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
        //laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        //laserFences[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        //laserFences[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        //laserFences[4].rotateY(Math.PI / 2);
        //laserFences[5].rotateY(Math.PI / 2);
        //laserFences[6].rotateY(Math.PI / 2);
        //laserFences[7].rotateY(Math.PI / 2);
        //gridMapHelper.addLaser(1,9, laserFences[0]);
        gridMapHelper.addLaser(1,0, laserFences[0]);
        //gridMapHelper.addLaser(3,6, laserFences[2]);
        gridMapHelper.addLaser(3,2, laserFences[1]);
        //gridMapHelper.addLaser(6,3, laserFences[4]);
        //gridMapHelper.addLaser(8,7, laserFences[5]);
        //gridMapHelper.addLaser(9,5, laserFences[6]);
        //gridMapHelper.addLaser(9,1, laserFences[7]);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        //scene.add(laserFences[2]);
        //scene.add(laserFences[3]);
        //scene.add(laserFences[4]);
        //scene.add(laserFences[5]);
        //scene.add(laserFences[6]);
        //scene.add(laserFences[7]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(6));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(9));
        traps[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(9));
        traps[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(6));
        traps[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        traps[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addTrap(1,6, traps[0]);
        gridMapHelper.addTrap(1,5, traps[1]);
        gridMapHelper.addTrap(1,4, traps[2]);
        gridMapHelper.addTrap(1,3, traps[3]);
        gridMapHelper.addTrap(3,4, traps[4]);
        gridMapHelper.addTrap(5,9, traps[5]);
        gridMapHelper.addTrap(5,4, traps[6]);
        gridMapHelper.addTrap(7,9, traps[7]);
        gridMapHelper.addTrap(7,6, traps[8]);
        gridMapHelper.addTrap(7,4, traps[9]);
        gridMapHelper.addTrap(9,3, traps[10]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        scene.add(traps[4]);
        scene.add(traps[5]);
        scene.add(traps[6]);
        scene.add(traps[7]);
        scene.add(traps[8]);
        scene.add(traps[9]);
        scene.add(traps[10]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(2,2,4);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,6);
        const boxGeometry4 = new THREE.BoxGeometry(8,2,2);

        const boxMaterial = new THREE.MeshLambertMaterial({map:wallTexture.clone()});

        const boxMaterial2 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial2[0].map.repeat.set(2,1);
        boxMaterial2[1].map.repeat.set(2,1);
        boxMaterial2[2].map.rotation = degreeToRadians(90);
        boxMaterial2[3].map.rotation = degreeToRadians(90);

        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.rotation = degreeToRadians(90);
        boxMaterial3[3].map.rotation = degreeToRadians(90);

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

        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        //walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(0.5));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        //walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        gridMapHelper.addObstacle(1,1,7,8);
        gridMapHelper.addObstacle(1,1,1,2);
        gridMapHelper.addObstacle(3,3,7,8);
        gridMapHelper.addObstacle(3,3,5,5);
        gridMapHelper.addObstacle(3,3,3,3);
        gridMapHelper.addObstacle(3,3,0,1);
        gridMapHelper.addObstacle(4,4,7,7);
        gridMapHelper.addObstacle(5,5,7,8);
        gridMapHelper.addObstacle(5,8,5,5);
        gridMapHelper.addObstacle(5,5,1,3);
        gridMapHelper.addObstacle(7,7,7,8);
        gridMapHelper.addObstacle(7,7,1,3);
        gridMapHelper.addObstacle(8,8,1,1);
        //gridMapHelper.addObstacle(9,9,7,8);
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
        //scene.add(walls[13]);

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
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper))
            //{
            //    return !openDoors[3];
            //}
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                        gridMapHelper.obstacles[2].active = false;
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
                        gridMapHelper.obstacles[3].active = false;
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
                        gridMapHelper.obstacles[4].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[3].lerpDoor(0, -2)
                //        doors[3].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[3].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[3] = true;
                //        gridMapHelper.obstacles[6].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                else
                {
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[1].active = false;
            }
            //else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            //{
            //    objectives[2].visible = false;
            //    consoleElement.innerText += "Cristal coletado com sucesso.\n";
            //    gridMapHelper.obstacles[2].active = false;
            //}
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
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            //objectives[2].visible = true;
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
            if(!objectives[0].visible && !objectives[1].visible)
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
                //changeLaserActiveStatus(1,false);
                //changeLaserActiveStatus(4,true);
                //changeLaserActiveStatus(6,false);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(0,false);
                //changeLaserActiveStatus(1,true);
                //changeLaserActiveStatus(4,false);
                //changeLaserActiveStatus(6,true);
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
    ()=>{
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(3);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        //objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
        //objectives[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addObstacle(2,2,7,7);
        gridMapHelper.addObstacle(2,2,3,3);
        gridMapHelper.addObstacle(8,8,5,5);
        //gridMapHelper.addObstacle(9,9,7,7);
        //gridMapHelper.addObstacle(9,9,3,3);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);
        //scene.add(objectives[3]);
        //scene.add(objectives[4]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = [];
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        //crancks.push(new Cranck());
        //crancks.push(new Cranck());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        doors.push(new CranckDoor(crancks[0]));
        doors.push(new CranckDoor(crancks[1]));
        doors.push(new CranckDoor(crancks[2]));
        //doors.push(new CranckDoor(crancks[3]));
        //doors.push(new CranckDoor(crancks[4]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        //crancks[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        crancks[0].correctPos("down", cranckInteractionReferences[0], cranckBases[0]);
        crancks[1].correctPos("right", cranckInteractionReferences[1], cranckBases[1]);
        //crancks[2].correctPos("right", cranckInteractionReferences[2], cranckBases[2]);
        crancks[2].correctPos("right", cranckInteractionReferences[2], cranckBases[2]);
        //crancks[4].correctPos("up", cranckInteractionReferences[4], cranckBases[4]);
        scene.add(cranckBases[0]);
        scene.add(cranckBases[1]);
        scene.add(cranckBases[2]);
        //scene.add(cranckBases[3]);
        //scene.add(cranckBases[4]);
        scene.add(crancks[0]);
        scene.add(crancks[1]);
        scene.add(crancks[2]);
        //scene.add(crancks[3]);
        //scene.add(crancks[4]);
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        //doors[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        doors[0].rotateY(Math.PI / 2);
        doors[1].rotateY(Math.PI / 2);
        doors[2].rotateY(Math.PI / 2);
        //doors[4].rotateY(Math.PI / 2);
        gridMapHelper.addObstacle(2,2,8,8);
        gridMapHelper.addObstacle(2,2,2,2);
        //gridMapHelper.addObstacle(6,6,5,5);
        gridMapHelper.addObstacle(9,9,8,8);
        //gridMapHelper.addObstacle(9,9,1,1);
        scene.add(doors[0]);
        scene.add(doors[1]);
        scene.add(doors[2]);
        //scene.add(doors[3]);
        //scene.add(doors[4]);
        openDoors.push(false);
        openDoors.push(false);
        openDoors.push(false);
        //openDoors.push(false);
        //openDoors.push(false);

        laserFences = [];
        //laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("blue"));
        //laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        //laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        //laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        // laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        //laserFences[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
        //laserFences[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        //laserFences[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
        //laserFences[0].rotateY(Math.PI / 2);
        laserFences[0].rotateY(Math.PI / 2);
        //laserFences[8].rotateY(Math.PI / 2);
        //laserFences[9].rotateY(Math.PI / 2);
        //gridMapHelper.addLaser(0,7, laserFences[0]);
        gridMapHelper.addLaser(0,2, laserFences[0]);
        //gridMapHelper.addLaser(3,9, laserFences[2]);
        //gridMapHelper.addLaser(3,1, laserFences[3]);
        //gridMapHelper.addLaser(5,9, laserFences[4]);
        //gridMapHelper.addLaser(5,0, laserFences[5]);
        // gridMapHelper.addLaser(7,9, laserFences[1]);
        //gridMapHelper.addLaser(7,0, laserFences[7]);
        //gridMapHelper.addLaser(8,6, laserFences[8]);
        //gridMapHelper.addLaser(8,4, laserFences[9]);
        scene.add(laserFences[0]);
        // scene.add(laserFences[1]);
        //scene.add(laserFences[2]);
        //scene.add(laserFences[3]);
        //scene.add(laserFences[4]);
        //scene.add(laserFences[5]);
        //scene.add(laserFences[6]);
        //scene.add(laserFences[7]);
        //scene.add(laserFences[8]);
        //scene.add(laserFences[9]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addTrap(1,7, traps[0]);
        gridMapHelper.addTrap(1,3, traps[1]);
        gridMapHelper.addTrap(3,7, traps[2]);
        gridMapHelper.addTrap(3,5, traps[3]);
        gridMapHelper.addTrap(3,3, traps[4]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        scene.add(traps[4]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(6,2,6);

        const boxMaterial = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        
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

        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.repeat.set(3,3);
        boxMaterial3[3].map.repeat.set(3,3);
        boxMaterial3[4].map.repeat.set(3,1);
        boxMaterial3[5].map.repeat.set(3,1);

        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[16].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[17].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        gridMapHelper.addObstacle(1,1,8,8);
        gridMapHelper.addObstacle(1,2,6,6);
        gridMapHelper.addObstacle(1,2,4,4);
        gridMapHelper.addObstacle(1,1,2,2);
        gridMapHelper.addObstacle(1,2,0,0);
        gridMapHelper.addObstacle(3,4,8,8);
        gridMapHelper.addObstacle(3,4,6,6);
        gridMapHelper.addObstacle(3,4,4,4);
        gridMapHelper.addObstacle(3,4,2,2);
        gridMapHelper.addObstacle(3,3,0,0);
        gridMapHelper.addObstacle(5,7,6,8);
        gridMapHelper.addObstacle(5,7,2,4);
        gridMapHelper.addObstacle(5,5,1,1);
        gridMapHelper.addObstacle(7,8,1,1);
        gridMapHelper.addObstacle(8,8,8,8);
        gridMapHelper.addObstacle(8,8,2,2);
        gridMapHelper.addObstacle(9,9,6,6);
        gridMapHelper.addObstacle(9,9,4,4);
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
        scene.add(walls[16]);
        scene.add(walls[17]);

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
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper))
            //{
            //    return !openDoors[3];
            //}
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper))
            //{
            //    return !openDoors[4];
            //}
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[3].lerpDoor(0, -2)
                //        doors[3].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[3].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[3] = true;
                //        gridMapHelper.obstacles[8].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[4].lerpDoor(0, -2)
                //        doors[4].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[4].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[4] = true;
                //        gridMapHelper.obstacles[9].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                else
                {
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                objectives[2].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[2].active = false;
            }
            //else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[3],gridMapHelper))
            //{
            //    objectives[3].visible = false;
            //    consoleElement.innerText += "Cristal coletado com sucesso.\n";
            //    gridMapHelper.obstacles[3].active = false;
            //}
            //else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[4],gridMapHelper))
            //{
            //    objectives[4].visible = false;
            //    consoleElement.innerText += "Cristal coletado com sucesso.\n";
            //    gridMapHelper.obstacles[4].active = false;
            //}
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
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
            objectives[2].visible = true;
            //objectives[3].visible = true;
            //objectives[4].visible = true;
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
                //changeLaserActiveStatus(2,true);
                //changeLaserActiveStatus(3,true);
                //changeLaserActiveStatus(4,false);
                //changeLaserActiveStatus(5,false);
                //changeLaserActiveStatus(7,true);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                //changeLaserActiveStatus(2,false);
                //changeLaserActiveStatus(3,false);
                //changeLaserActiveStatus(4,true);
                //changeLaserActiveStatus(5,true);
                //changeLaserActiveStatus(7,false);
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
    () =>{
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(2);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        gridMapHelper.addObstacle(0,0,0,0);
        gridMapHelper.addObstacle(7,7,9,9);
        scene.add(objectives[0]);
        scene.add(objectives[1]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = [];
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        // crancks.push(new Cranck());
        crancks.push(new Cranck());
        //crancks.push(new Cranck());
        //crancks.push(new Cranck());
        cranckBases.push(new CranckBase());
        // cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        cranckInteractionReferences.push(new THREE.Object3D());
        // cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        doors.push(new CranckDoor(crancks[0]));
        // doors.push(new CranckDoor(crancks[1]));
        doors.push(new CranckDoor(crancks[1]));
        //doors.push(new CranckDoor(crancks[3]));
        //doors.push(new CranckDoor(crancks[4]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        // crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        //crancks[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        crancks[0].correctPos("down", cranckInteractionReferences[0], cranckBases[0]);
        // crancks[0].correctPos("down", cranckInteractionReferences[1], cranckBases[1]);
        //crancks[2].correctPos("down", cranckInteractionReferences[2], cranckBases[2]);
        //crancks[3].correctPos("up", cranckInteractionReferences[3], cranckBases[3]);
        crancks[1].correctPos("down", cranckInteractionReferences[1], cranckBases[1]);
        scene.add(cranckBases[0]);
        // scene.add(cranckBases[1]);
        scene.add(cranckBases[1]);
        //scene.add(cranckBases[3]);
        //scene.add(cranckBases[4]);
        scene.add(crancks[0]);
        // scene.add(crancks[1]);
        scene.add(crancks[1]);
        //scene.add(crancks[3]);
        //scene.add(crancks[4]);
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        // doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        //doors[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        //doors[2].rotateY(Math.PI / 2);
        //doors[3].rotateY(Math.PI / 2);
        gridMapHelper.addObstacle(1,1,8,8);
        // gridMapHelper.addObstacle(3,3,0,0);
        //gridMapHelper.addObstacle(5,5,8,8);
        //gridMapHelper.addObstacle(7,7,7,7);
        gridMapHelper.addObstacle(8,8,0,0);
        scene.add(doors[0]);
        // scene.add(doors[1]);
        scene.add(doors[1]);
        //scene.add(doors[3]);
        //scene.add(doors[4]);
        openDoors.push(false);
        // openDoors.push(false);
        openDoors.push(false);
        //openDoors.push(false);
        //openDoors.push(false);

        laserFences = [];
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("multiColor"));
        //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        //laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
        //laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        //laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        laserFences[0].rotateY(Math.PI / 2);
        //laserFences[3].rotateY(Math.PI / 2);
        laserFences[1].rotateY(Math.PI / 2);
        //gridMapHelper.addLaser(1,1, laserFences[0]);
        //gridMapHelper.addLaser(3,9, laserFences[1]);
        gridMapHelper.addLaser(4,6, laserFences[0]);
        //gridMapHelper.addLaser(5,4, laserFences[3]);
        //gridMapHelper.addLaser(6,1, laserFences[4]);
        //gridMapHelper.addLaser(8,3, laserFences[5]);
        gridMapHelper.addLaser(9,6, laserFences[1]);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        //scene.add(laserFences[2]);
        //scene.add(laserFences[3]);
        //scene.add(laserFences[4]);
        //scene.add(laserFences[5]);
        //scene.add(laserFences[6]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(5));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        //traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(8));
        //traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        gridMapHelper.addTrap(0,2, traps[0]);
        gridMapHelper.addTrap(3,5, traps[1]);
        gridMapHelper.addTrap(3,3, traps[2]);
        gridMapHelper.addTrap(7,2, traps[3]);
        //gridMapHelper.addTrap(9,8, traps[4]);
        //gridMapHelper.addTrap(9,4, traps[5]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        scene.add(traps[3]);
        //scene.add(traps[4]);
        //scene.add(traps[5]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(2,2,6);
        const boxGeometry4 = new THREE.BoxGeometry(2,2,4);

        const boxMaterial = new THREE.MeshLambertMaterial({map:wallTexture.clone()});
        
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

        const boxMaterial3 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial3[0].map.repeat.set(3,1);
        boxMaterial3[1].map.repeat.set(3,1);
        boxMaterial3[2].map.rotation = degreeToRadians(90);
        boxMaterial3[3].map.rotation = degreeToRadians(90);

        const boxMaterial4 = [
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
            new THREE.MeshLambertMaterial({map:wallTexture.clone()}),
        ];
        boxMaterial4[0].map.repeat.set(2,1);
        boxMaterial4[1].map.repeat.set(2,1);
        boxMaterial4[2].map.rotation = degreeToRadians(90);
        boxMaterial4[3].map.rotation = degreeToRadians(90);
        
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        // walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        // walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        // walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        // walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(6.5));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        gridMapHelper.addObstacle(1,1,9,9);
        gridMapHelper.addObstacle(1,2,7,7);
        gridMapHelper.addObstacle(1,2,2,2);
        // gridMapHelper.addObstacle(1,1,0,0);
        gridMapHelper.addObstacle(3,3,6,8);
        gridMapHelper.addObstacle(3,4,4,4);
        gridMapHelper.addObstacle(3,3,1,2);
        gridMapHelper.addObstacle(5,6,6,6);
        gridMapHelper.addObstacle(5,6,2,2);
        gridMapHelper.addObstacle(6,6,7,9);
        gridMapHelper.addObstacle(6,6,3,5);
        // gridMapHelper.addObstacle(6,6,0,0);
        gridMapHelper.addObstacle(8,8,6,7);
        gridMapHelper.addObstacle(8,8,4,4);
        gridMapHelper.addObstacle(8,8,1,2);
        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        // scene.add(walls[3]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        scene.add(walls[9]);
        // scene.add(walls[11]);
        scene.add(walls[10]);
        scene.add(walls[11]);
        scene.add(walls[12]);

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
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper))
            //{
            //    return !openDoors[3];
            //}
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper))
            //{
            //    return !openDoors[4];
            //}
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                        gridMapHelper.obstacles[2].active = false;
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
                        gridMapHelper.obstacles[3].active = false;
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
                        gridMapHelper.obstacles[4].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[3].lerpDoor(0, -2)
                //        doors[3].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[3].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[3] = true;
                //        gridMapHelper.obstacles[5].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[4].lerpDoor(0, -2)
                //        doors[4].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[4].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[4] = true;
                //        gridMapHelper.obstacles[6].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                else
                {
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
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
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            objectives[0].visible = true;
            objectives[1].visible = true;
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
            if(!objectives[0].visible && !objectives[1].visible)
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
                //changeLaserActiveStatus(3,true);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                changeLaserActiveStatus(0,false);
                //changeLaserActiveStatus(3,false);
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

    () =>{
        
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(4);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(8));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(1));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        //objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(4));
        objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        gridMapHelper.addObstacle(0,0,8,8);
        gridMapHelper.addObstacle(0,0,1,1);
        gridMapHelper.addObstacle(7,7,9,9);
        //gridMapHelper.addObstacle(9,9,4,4);
        gridMapHelper.addObstacle(9,9,0,0);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);
        scene.add(objectives[3]);
        //scene.add(objectives[4]);

        traps = [];
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        // traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        //traps.push(new SpikeTrap());
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(9));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        // traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0,gridMapHelper.getGlobalZPositionFromCoord(8));
        // traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(2));
        //traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        gridMapHelper.addTrap(0,2, traps[0]);
        gridMapHelper.addTrap(1,9, traps[1]);
        // gridMapHelper.addTrap(6,8, traps[2]);
        // gridMapHelper.addTrap(8,2, traps[2]);
        //gridMapHelper.addTrap(9,3, traps[4]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        // scene.add(traps[2]);
        // scene.add(traps[2]);
        //scene.add(traps[4]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = []; 
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        // crancks.push(new Cranck());
        // crancks.push(new Cranck());
        //crancks.push(new Cranck());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        // cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        // cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        doors.push(new CranckDoor(crancks[0]));
        doors.push(new CranckDoor(crancks[1]));
        doors.push(new CranckDoor(crancks[2]));
        // doors.push(new CranckDoor(crancks[3]));
        //doors.push(new CranckDoor(crancks[4]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        // crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        // crancks[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        //crancks[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        crancks[0].correctPos("left", cranckInteractionReferences[0], cranckBases[0]);
        crancks[1].correctPos("right", cranckInteractionReferences[1], cranckBases[1]);
        // crancks[2].correctPos("down", cranckInteractionReferences[2], cranckBases[2]);
        // crancks[3].correctPos("right", cranckInteractionReferences[3], cranckBases[3]);
        //crancks[4].correctPos("down", cranckInteractionReferences[4], cranckBases[4]);
        scene.add(cranckBases[0]);
        scene.add(cranckBases[1]);
        // scene.add(cranckBases[2]);
        // scene.add(cranckBases[3]);
        //scene.add(cranckBases[4]);
        scene.add(crancks[0]);
        scene.add(crancks[1]);
        scene.add(crancks[2]);
        scene.add(crancks[3]);
        //scene.add(crancks[4]);
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        // doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        // doors[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        //doors[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        doors[0].rotateY(Math.PI / 2);
        // doors[2].rotateY(Math.PI / 2);
        //doors[3].rotateY(Math.PI / 2);
        gridMapHelper.addObstacle(0,0,7,7);
        gridMapHelper.addObstacle(1,1,1,1);
        // gridMapHelper.addObstacle(4,4,8,8);
        // gridMapHelper.addObstacle(8,8,7,7);
        //gridMapHelper.addObstacle(8,8,2,2);
        scene.add(doors[0]);
        scene.add(doors[1]);
        // scene.add(doors[2]);
        // scene.add(doors[3]);
        //scene.add(doors[4]);
        openDoors.push(false);
        openDoors.push(false);
        // openDoors.push(false);
        // openDoors.push(false);
        //openDoors.push(false);

        laserFences = [];
        // laserFences.push(new LaserFence("multiColor"));
        laserFences.push(new LaserFence("blue"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("multiColor"));
        // laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
        //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        laserFences[0].rotateY(Math.PI / 2);
        //laserFences[2].rotateY(Math.PI / 2);
        //laserFences[3].rotateY(Math.PI / 2);
        // gridMapHelper.addLaser(5,9, laserFences[0]);
        gridMapHelper.addLaser(6,6, laserFences[0]);
        //gridMapHelper.addLaser(9,6, laserFences[2]);
        //gridMapHelper.addLaser(9,1, laserFences[3]);
        // scene.add(laserFences[0]);
        scene.add(laserFences[0]);
        //scene.add(laserFences[2]);
        //scene.add(laserFences[3]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(6,2,2);

        const boxMaterial = new THREE.MeshLambertMaterial({map:wallTexture.clone()});

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

        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        // walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
        walls[0].rotateY(Math.PI / 2);
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(8.5));
        walls[1].rotateY(Math.PI / 2);
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[2].rotateY(Math.PI / 2);
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[6].rotateY(Math.PI / 2);
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        // walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[9].rotateY(Math.PI / 2);
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[16].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(0));

        gridMapHelper.addObstacle(1,1,7,8);
        gridMapHelper.addObstacle(3,3,8,9);
        gridMapHelper.addObstacle(1,1,2,4);
        gridMapHelper.addObstacle(2,3,4,4);
        gridMapHelper.addObstacle(2,2,2,2);
        gridMapHelper.addObstacle(4,4,6,6);
        gridMapHelper.addObstacle(5,5,6,8);
        gridMapHelper.addObstacle(1,3,0,0);
        gridMapHelper.addObstacle(4,4,2,2);
        // gridMapHelper.addObstacle(6,6,2,2);
        gridMapHelper.addObstacle(5,5,1,3);
        gridMapHelper.addObstacle(8,8,9,9);
        gridMapHelper.addObstacle(7,9,8,8);
        gridMapHelper.addObstacle(7,8,6,6);
        gridMapHelper.addObstacle(7,8,4,4);
        gridMapHelper.addObstacle(8,8,3,3);
        gridMapHelper.addObstacle(8,8,1,1);
        gridMapHelper.addObstacle(7,8,0,0);

        scene.add(walls[0]);
        scene.add(walls[1]);
        scene.add(walls[2]);
        scene.add(walls[3]);
        scene.add(walls[4]);
        scene.add(walls[5]);
        scene.add(walls[6]);
        scene.add(walls[7]);
        scene.add(walls[8]);
        // scene.add(walls[9]);
        scene.add(walls[9]);
        scene.add(walls[10]);
        scene.add(walls[11]);
        scene.add(walls[12]);
        scene.add(walls[13]);
        scene.add(walls[14]);
        scene.add(walls[15]);
        scene.add(walls[16]);


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
            else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper))
            {
                return !openDoors[3];
            }
            else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper))
            {
               return !openDoors[4];
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                        gridMapHelper.obstacles[4].active = false;
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
                        gridMapHelper.obstacles[5].active = false;
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
                        gridMapHelper.obstacles[6].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper)){
                    function translateDoor()
                    {
                        doors[3].lerpDoor(0, -2)
                        doors[3].rotateCranckZ(degreeToRadians(-5));
                        resolve();
                    }
                    if(doors[3].getDoorY().toFixed(1) == -2)
                    {
                        openDoors[3] = true;
                        gridMapHelper.obstacles[7].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[4].lerpDoor(0, -2)
                //        doors[4].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[4].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[4] = true;
                //        gridMapHelper.obstacles[9].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                else
                {
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[2].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[2].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[3],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[3].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[3].active = false;
            }
            //else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[4],gridMapHelper))
            //{
            //    objectives[4].visible = false;
            //    consoleElement.innerText += "Cristal coletado com sucesso.\n";
            //    gridMapHelper.obstacles[4].active = false;
            //}
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];

            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
            }
        }
        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            for(let i = 0; i < objectives.length; i++){
                objectives[i].visible = true;
            }
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
            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible)
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
                // changeLaserActiveStatus(1,true);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                // changeLaserActiveStatus(1,false);
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
    () =>{
        document.getElementById('phaseTitle').innerText = textVariations[sceneProperties.lang][0]();
        document.getElementById('phaseObjective').innerText = textVariations[sceneProperties.lang][12];
    
        sceneProperties.executing = false;
        camera.position.set(0,15,30);

        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0,degreeToRadians(90),0);

        objectives = loadDefaultObjectives(4);
        objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
        objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0.0,gridMapHelper.getGlobalZPositionFromCoord(6));
        objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
        gridMapHelper.addObstacle(0,0,1,1);
        gridMapHelper.addObstacle(9,9,0,0);
        gridMapHelper.addObstacle(5,5,6,6);
        gridMapHelper.addObstacle(9,9,9,9);
        scene.add(objectives[0]);
        scene.add(objectives[1]);
        scene.add(objectives[2]);
        scene.add(objectives[3]);

        traps = [];
        // traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        traps.push(new SpikeTrap());
        // traps.push(new SpikeTrap());
        // traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(3));
        traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),0,gridMapHelper.getGlobalZPositionFromCoord(0));
        traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),0,gridMapHelper.getGlobalZPositionFromCoord(7));
        // traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),0,gridMapHelper.getGlobalZPositionFromCoord(4));
        // gridMapHelper.addTrap(1,3, traps[0]);
        gridMapHelper.addTrap(2,3, traps[0]);
        gridMapHelper.addTrap(2,0, traps[1]);
        gridMapHelper.addTrap(5,7, traps[2]);
        // gridMapHelper.addTrap(8,4, traps[3]);
        // scene.add(traps[0]);
        scene.add(traps[0]);
        scene.add(traps[1]);
        scene.add(traps[2]);
        // scene.add(traps[3]);

        openDoors = [];
        doors = [];
        crancks = [];
        cranckBases = [];
        cranckInteractionReferences = [];
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        crancks.push(new Cranck());
        //crancks.push(new Cranck());
        //crancks.push(new Cranck());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        //cranckBases.push(new CranckBase());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        //cranckInteractionReferences.push(new THREE.Object3D());
        doors.push(new CranckDoor(crancks[0]));
        doors.push(new CranckDoor(crancks[1]));
        doors.push(new CranckDoor(crancks[2]));
        //doors.push(new CranckDoor(crancks[3]));
        //doors.push(new CranckDoor(crancks[4]));
        crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(4));
        //crancks[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        crancks[0].correctPos("up", cranckInteractionReferences[0], cranckBases[0]);
        crancks[1].correctPos("right", cranckInteractionReferences[1], cranckBases[1]);
        //crancks[2].correctPos("up", cranckInteractionReferences[2], cranckBases[2]);
        crancks[2].correctPos("right", cranckInteractionReferences[2], cranckBases[2]);
        //crancks[4].correctPos("down", cranckInteractionReferences[4], cranckBases[4]);
        scene.add(cranckBases[0]);
        scene.add(cranckBases[1]);
        scene.add(cranckBases[2]);
        //scene.add(cranckBases[3]);
        //scene.add(cranckBases[4]);
        scene.add(crancks[0]);
        scene.add(crancks[1]);
        scene.add(crancks[2]);
        //scene.add(crancks[3]);
        //scene.add(crancks[4]);
        doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        //doors[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(0));
        doors[1].rotateY(Math.PI / 2);
        //doors[2].rotateY(Math.PI / 2);
        doors[2].rotateY(Math.PI / 2);
        //doors[3].rotateY(Math.PI / 2);
        gridMapHelper.addObstacle(2,2,9,9);
        gridMapHelper.addObstacle(1,1,1,1);
        //gridMapHelper.addObstacle(3,3,6,6);
        gridMapHelper.addObstacle(5,5,5,5);
        //gridMapHelper.addObstacle(8,8,0,0);
        scene.add(doors[0]);
        scene.add(doors[1]);
        scene.add(doors[2]);
        //scene.add(doors[3]);
        //scene.add(doors[4]);
        openDoors.push(false);
        openDoors.push(false);
        openDoors.push(false);
        //openDoors.push(false);
        //openDoors.push(false);

        laserFences = [];
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("blue"));
        //laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("blue"));
        laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences.push(new LaserFence("red"));
        laserFences.push(new LaserFence("blue"));
        //laserFences.push(new LaserFence("red"));
        //laserFences.push(new LaserFence("multiColor"));
        //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
        //laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
        //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
        laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
        laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        //laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        //laserFences[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
        laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
        //laserFences[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
        //laserFences[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
        //laserFences[0].rotateY(Math.PI / 2);
        //laserFences[1].rotateY(Math.PI / 2);
        //laserFences[2].rotateY(Math.PI / 2);
        laserFences[1].rotateY(Math.PI / 2);
        //laserFences[5].rotateY(Math.PI / 2);
        laserFences[2].rotateY(Math.PI / 2);
        //laserFences[8].rotateY(Math.PI / 2);
        //gridMapHelper.addLaser(1,7, laserFences[0]);
        //gridMapHelper.addLaser(3,8, laserFences[1]);
        //gridMapHelper.addLaser(3,1, laserFences[2]);
        gridMapHelper.addLaser(4,9, laserFences[0]);
        gridMapHelper.addLaser(5,2, laserFences[1]);
        //gridMapHelper.addLaser(7,5, laserFences[5]);
        //gridMapHelper.addLaser(8,8, laserFences[6]);
        gridMapHelper.addLaser(9,5, laserFences[2]);
        //gridMapHelper.addLaser(9,3, laserFences[8]);
        //gridMapHelper.addLaser(8,2, laserFences[9]);
        scene.add(laserFences[0]);
        scene.add(laserFences[1]);
        scene.add(laserFences[2]);
        //scene.add(laserFences[3]);
        //scene.add(laserFences[4]);
        //scene.add(laserFences[5]);
        //scene.add(laserFences[6]);
        //scene.add(laserFences[7]);
        //scene.add(laserFences[8]);
        //scene.add(laserFences[9]);

        walls = [];
        const boxGeometry1 = new THREE.BoxGeometry(2,2,2);
        const boxGeometry2 = new THREE.BoxGeometry(4,2,2);
        const boxGeometry3 = new THREE.BoxGeometry(6,2,2);
        const boxGeometry4 = new THREE.BoxGeometry(8,2,2);
        const boxGeometry5 = new THREE.BoxGeometry(10,2,2);

        const boxMaterial = new THREE.MeshLambertMaterial({map:wallTexture.clone()});

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
        boxMaterial5[2].map.repeat.set(5,1);
        boxMaterial5[3].map.repeat.set(5,1);
        boxMaterial5[4].map.repeat.set(5,1);
        boxMaterial5[5].map.repeat.set(5,1);

        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        // walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry5,boxMaterial5));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));

        walls.push(new THREE.Mesh(boxGeometry3,boxMaterial3));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry1,boxMaterial));
        walls.push(new THREE.Mesh(boxGeometry4,boxMaterial4));
        walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));
        // walls.push(new THREE.Mesh(boxGeometry2,boxMaterial2));

        walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(8));
        walls[0].rotateY(Math.PI / 2);
        walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[1].rotateY(Math.PI / 2);
        // walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        // walls[2].rotateY(Math.PI / 2);
        walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(6));
        walls[2].rotateY(Math.PI / 2);
        walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(2),1,gridMapHelper.getGlobalZPositionFromCoord(1));
        walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(6.5));
        walls[4].rotateY(Math.PI / 2);
        walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(3));

        walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(2));
        walls[6].rotateY(Math.PI / 2);
        walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(9));
        walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(5.5));
        walls[8].rotateY(Math.PI / 2);
        walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(7));
        walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(5));
        walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(1.5));
        walls[11].rotateY(Math.PI / 2);
        walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5),1,gridMapHelper.getGlobalZPositionFromCoord(3));
        // walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5),1,gridMapHelper.getGlobalZPositionFromCoord(1));

        gridMapHelper.addObstacle(0,0,7,9);
        gridMapHelper.addObstacle(0,0,1,3);
        // gridMapHelper.addObstacle(1,1,5,5);
        gridMapHelper.addObstacle(2,2,4,8);
        gridMapHelper.addObstacle(2,2,1,1);
        gridMapHelper.addObstacle(3,3,3,3);
        gridMapHelper.addObstacle(4,4,5,8);
        gridMapHelper.addObstacle(4,4,1,3);
        gridMapHelper.addObstacle(8,8,9,9);
        gridMapHelper.addObstacle(6,9,7,7);
        gridMapHelper.addObstacle(6,6,5,6);
        gridMapHelper.addObstacle(8,8,5,5);
        gridMapHelper.addObstacle(6,6,0,3);
        gridMapHelper.addObstacle(7,8,3,3);
        // gridMapHelper.addObstacle(8,9,1,1);


        scene.add(walls[0]);
        scene.add(walls[1]);
        // scene.add(walls[2]);
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
        // scene.add(walls[13]);


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
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper))
            //{
            //    return !openDoors[3];
            //}
            //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper))
            //{
            //    return !openDoors[4];
            //}
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                        gridMapHelper.obstacles[4].active = false;
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
                        gridMapHelper.obstacles[5].active = false;
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
                        gridMapHelper.obstacles[6].active = false;
                        resolve();
                    }
                    else
                    {
                        requestAnimationFrame(translateDoor);
                    } 
                }
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[3],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[3].lerpDoor(0, -2)
                //        doors[3].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[3].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[3] = true;
                //        gridMapHelper.obstacles[7].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                //else if(checkCollision(actor.getObjectByName("interactionReference"),cranckInteractionReferences[4],gridMapHelper)){
                //    function translateDoor()
                //    {
                //        doors[4].lerpDoor(0, -2)
                //        doors[4].rotateCranckZ(degreeToRadians(-5));
                //        resolve();
                //    }
                //    if(doors[4].getDoorY().toFixed(1) == -2)
                //    {
                //        openDoors[4] = true;
                //        gridMapHelper.obstacles[8].active = false;
                //        resolve();
                //    }
                //    else
                //    {
                //        requestAnimationFrame(translateDoor);
                //    } 
                //}
                else
                {
                    consoleElement.innerText += textVariations[sceneProperties.lang][13];
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
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[0].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[0].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[1],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[1].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[1].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[2],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[2].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[2].active = false;
            }
            else if(checkCollision(actor.getObjectByName('interactionReference'),objectives[3],gridMapHelper))
            {
                const som = new crystalSound();
                som.playAudio('crystal');  
                objectives[3].visible = false;
                consoleElement.innerText += textVariations[sceneProperties.lang][5];
                gridMapHelper.obstacles[3].active = false;
            }
            else
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][3];
            }

            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible)
            {
                consoleElement.innerText += textVariations[sceneProperties.lang][6];
            }
        }

        resetLevel = () =>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0),1.0,gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0,degreeToRadians(90),0);
            actor.getObjectByName('eve').rotation.set(0,0,0);
            for(let i = 0; i < objectives.length; i++){
                objectives[i].visible = true;
            }
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
            if(!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible)
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
                //changeLaserActiveStatus(1,true);
                //changeLaserActiveStatus(2,true);
                changeLaserActiveStatus(1,true);
                //changeLaserActiveStatus(6,true);
                changeLaserActiveStatus(2,true);
                //changeLaserActiveStatus(8,true);
            }
            else
            {
                changeLaserStateStatus(0, 'red');
                //changeLaserActiveStatus(1,false);
                //changeLaserActiveStatus(2,false);
                changeLaserActiveStatus(1,false);
                //changeLaserActiveStatus(6,false);
                changeLaserActiveStatus(2,false);
                //changeLaserActiveStatus(8,false);
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
        document.getElementById('winMessage').innerText = textVariations[sceneProperties.lang][7];
        document.getElementById('advanceBtn').innerText = textVariations[sceneProperties.lang][8];
        timerUpadate = setInterval(updateTime,1000);
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
    displayTime(sceneProperties.timer,document.getElementById("timer"));
}

window.addEventListener('resize',() => {
    resizeCanvasToDisplaySize(renderer,camera);
});

const finishEarlierButton = document.getElementById('finishEarlier');

const execBtn = document.getElementById("execBtn")
execBtn.addEventListener("click",async function() {
    const codeParsed = parseCode(convertCode(sceneProperties.lang,editor.state.doc.toString()));
    console.log(codeParsed);
    cancelAnimationFrame(corrID);    
    cancelAnimationFrame(requestID);
    cancelAnimationFrame(changColorID);
    cancelAnimationFrame(smokeAnimationFrame);
    smoke.deactiveSmokes();
    sceneProperties.cancelExecution = false;
    actor.getObjectByName('eve').position.y = 0;
    if(traps != null)
        trapsDeactivation(traps)
    if(codeParsed != null)
    {
        updateTheme(editor,1);
        resetLevel();
        this.disabled = true;
        sceneProperties.executing = true;
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
                configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender',document.getElementById("subBtn"),sceneProperties.timer,'../','Nível 4/Completo', document.getElementById('second-user'));
            }
        }
        else
        {
            updateTheme(editor,0);
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click",() => {
    cancelAnimationFrame(corrID);
    cancelAnimationFrame(requestID);
    cancelAnimationFrame(changColorID);
    cancelAnimationFrame(smokeAnimationFrame);
    smoke.deactiveSmokes();
    updateTheme(editor,0);
    sceneProperties.cancelExecution = true;
    actor.getObjectByName('eve').position.y = 0
    if(materialColor.length != 0)
        resetRobotColor(actor);
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
        finishEarlierButton.disabled = false;
    }
    else
    {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        logModal.show();
    }
});

const reloadBtn = document.getElementById('reloadBtn');
reloadBtn.addEventListener('click',(e) => {

    if (typeof setLaserStatesInterval !== 'undefined') {
        clearInterval(setLaserStatesInterval);
        setLaserStatesInterval = undefined;
    }

    if (typeof setSpikeTrapStateInterval !== 'undefined') {
        clearInterval(setSpikeTrapStateInterval);
        setSpikeTrapStateInterval = undefined;
    }

    if (typeof timerUpadate !== 'undefined') {
        clearInterval(timerUpadate);
        timerUpadate = undefined;
    }

    cancelAnimationFrame(corrID);
    cancelAnimationFrame(requestID);
    cancelAnimationFrame(changColorID);
    cancelAnimationFrame(smokeAnimationFrame);


    if (sceneProperties.phase < phaseGeneration.length) {
        removeObjects(objectives,walls,traps,laserFences, doors, crancks, cranckBases, cranckInteractionReferences);
        phaseGeneration[sceneProperties.phase]();
        editor.setState(editState);
        consoleElement.innerText = null;
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;

        smoke.deactiveSmokes();
        updateTheme(editor, 0);
        sceneProperties.cancelExecution = true;
        actor.getObjectByName('eve').position.y = 0;
        resetLevel();

    } else {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;

    }
});


finishEarlierButton.addEventListener('click', (e) => {
    if(confirm(textVariations[sceneProperties.lang][9]))
    {
        clearInterval(timerUpadate);
        configureDataAndUpload(document.getElementById("name"),document.getElementById("age"),'gender',document.getElementById("subBtn"),sceneProperties.timer,'../',`Nível 4/Fase ${sceneProperties.phase + 1}`, document.getElementById('second-user'));
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

resizeCanvasToDisplaySize(renderer,camera);
phaseGeneration[sceneProperties.phase]();
animate();