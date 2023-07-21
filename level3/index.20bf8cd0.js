function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequiredf3e"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequiredf3e"] = parcelRequire;
}
parcelRequire.register("2RZ2r", function(module, exports) {

var $49pUz = parcelRequire("49pUz");

var $jgsti = parcelRequire("jgsti");

var $6mhZf = parcelRequire("6mhZf");

var $2Y9dv = parcelRequire("2Y9dv");

var $3vWij = parcelRequire("3vWij");

var $3tzMw = parcelRequire("3tzMw");

var $gSwgq = parcelRequire("gSwgq");
const sceneProperties = {
    cancelExecution: false,
    phase: 0,
    executing: false
};
let laserState;
let setLaserStates;
let setLaserStatesInterval;
let spikeTrapState;
let setSpikeTrapState;
let setSpikeTrapStateInterval;
const editor = (0, $jgsti.generateDefaultEditor)(document.getElementById("editorArea"));
const andarFrenteBtn = document.getElementById("andarFrente");
andarFrenteBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "andarFrente(?)\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "andarFrente(?)\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const andarTrasBtn = document.getElementById("andarTras");
andarTrasBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "andarTras(?)\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "andarTras(?)\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const girarEsquerdaBtn = document.getElementById("girarEsquerda");
girarEsquerdaBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "girarEsquerda()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "girarEsquerda()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const girarDireitaBtn = document.getElementById("girarDireita");
girarDireitaBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "girarDireita()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "girarDireita()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const darMeiaVoltaBtn = document.getElementById("darMeiaVolta");
darMeiaVoltaBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "darMeiaVolta()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "darMeiaVolta()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const desativarLaserAzulBtn = document.getElementById("desativarLaserAzul");
desativarLaserAzulBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "desativarLaserAzul()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "desativarLaserAzul()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const desativarLaserVermelhoBtn = document.getElementById("desativarLaserVermelho");
desativarLaserVermelhoBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "desativarLaserVermelho()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "desativarLaserVermelho()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const coletarCristalBtn = document.getElementById("coletarCristal");
coletarCristalBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "coletarCristal()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "coletarCristal()\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const laserAzulAtivoBtn = document.getElementById("laserAzulAtivo");
laserAzulAtivoBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "laserAzulAtivo()"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "laserAzulAtivo()"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const laserVermelhoAtivoBtn = document.getElementById("laserVermelhoAtivo");
laserVermelhoAtivoBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "laserVermelhoAtivo()"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "laserVermelhoAtivo()"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const condicaoFullBtn = document.getElementById("condicaoFull");
condicaoFullBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: "se(?){\n\n}\nsen\xe3o{\n\n}\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: "se(?){\n\n}\nsen\xe3o{\n\n}\n"
            }
        });
        actualLine = editor.state.doc.lineAt(cursorHead).number;
    }
    editor.dispatch(transaction);
    editor.focus();
    let nextLinePos = editor.state.doc.line(actualLine + 1).to;
    editor.dispatch({
        selection: {
            anchor: nextLinePos
        }
    });
});
const consoleElement = document.getElementById("consoleArea");
const { renderer , scene , camera , controls  } = (0, $6mhZf.generateDefaultSceneObjects)(document.getElementById("phaseView"));
const gridMapHelper = new (0, $2Y9dv.default)();
const plane = gridMapHelper.createGridPlane();
const actor = (0, $6mhZf.loadDefaultActor)();
let objectives;
let walls;
let traps;
let laserFences;
function changeLaserActiveStatus(index, status) {
    gridMapHelper.lasers[index].active = status;
    //lasers[index].visible = status;
    if (status == false) laserFences[index].setNotVisible();
    else if (gridMapHelper.lasers[index].state == "red") {
        laserFences[index].setVisible();
        laserFences[index].setRed();
    } else {
        laserFences[index].setVisible();
        laserFences[index].setBlue();
    }
}
function changeLaserStateStatus(index, status) {
    gridMapHelper.lasers.forEach((laser)=>{
        if (laser.type == "multiColor") laser.state = status;
    });
    if (status == "blue") laserFences.forEach((laser)=>{
        if (laser.type == "multiColor") laser.setBlue();
    });
    else if (status == "red") laserFences.forEach((laser)=>{
        if (laser.type == "multiColor") laser.setRed();
    });
}
function lasersVisualRestart() {
    for(let i = 0; i < laserFences.length; i++)laserFences[i].active = true;
}
scene.add(plane);
scene.add(actor);
async function andarFrente(amount) {
    let correctedAmount = amount > 10 ? 10 : amount;
    await (0, $6mhZf.translateActor)(actor, correctedAmount, gridMapHelper, sceneProperties, consoleElement);
}
async function andarTras(amount) {
    let correctedAmount = amount > 10 ? 10 : amount;
    await (0, $6mhZf.translateActor)(actor, -correctedAmount, gridMapHelper, sceneProperties, consoleElement);
}
async function girarEsquerda() {
    await (0, $6mhZf.rotateActor)(actor, 90, sceneProperties, 1);
}
async function girarDireita() {
    await (0, $6mhZf.rotateActor)(actor, 90, sceneProperties, -1);
}
async function darMeiaVolta() {
    await (0, $6mhZf.rotateActor)(actor, 180, sceneProperties, 1);
}
function laserAzulAtivo() {
    const vec = new $49pUz.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    if (gridMapHelper.detectLaser(vec, "blue") != null) return true;
    else return false;
}
function laserVermelhoAtivo() {
    const vec = new $49pUz.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    if (gridMapHelper.detectLaser(vec, "red") != null) return true;
    else return false;
}
function desativarLaserAzul() {
    const vec = new $49pUz.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec, "blue");
    if (laserIndex != null) changeLaserActiveStatus(laserIndex, false);
    else {
        consoleElement.innerText += "O rob\xf4 entrou em curto circuito por tentar desativar um laser azul que n\xe3o existe.\n";
        sceneProperties.cancelExecution = true;
    }
}
function desativarLaserVermelho() {
    const vec = new $49pUz.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec, "red");
    if (laserIndex != null) changeLaserActiveStatus(laserIndex, false);
    else {
        consoleElement.innerText += "O rob\xf4 entrou em curto circuito por tentar desativar um laser vermelho que n\xe3o existe.\n";
        sceneProperties.cancelExecution = true;
    }
}
function badLuck(position, state) {
    const vector = new $49pUz.Vector3(gridMapHelper.getGlobalXPositionFromCoord(position[0]), 0, gridMapHelper.getGlobalZPositionFromCoord(position[1]));
    let newLaserState = state == "blue" ? "red" : "blue";
    let laserIndex = gridMapHelper.detectLaser(vector, state);
    if (laserIndex != null) {
        if (gridMapHelper.lasers[laserIndex].type == "multiColor") {
            gridMapHelper.lasers[laserIndex].state = newLaserState;
            if (newLaserState == "blue") laserFences[laserIndex].setBlue();
            else laserFences[laserIndex].setRed();
        } else if (gridMapHelper.lasers[laserIndex].active) {
            gridMapHelper.lasers[laserIndex].active = false;
            laserFences[laserIndex].setNotVisible();
        } else {
            gridMapHelper.lasers[laserIndex].active = true;
            laserFences[laserIndex].setVisible();
            if (gridMapHelper.lasers[laserIndex].state == "blue") laserFences[laserIndex].setBlue();
            else laserFences[laserIndex].setRed();
        }
    }
}
let coletarCristal;
let resetLevel;
let winCondition;
const phaseGeneration = [];
//Phase 1
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 1 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(18, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    scene.add(walls[0]);
    scene.add(walls[1]);
    gridMapHelper.addObstacle(1, 9, 4, 4);
    gridMapHelper.addObstacle(1, 9, 6, 6);
    laserFences = [];
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addLaser(7, 5, laserFences[0]);
    scene.add(laserFences[0]);
    //laserFences[0].setBlue()
    // lasers = [];
    // const laserGeometry = new THREE.BoxGeometry(2,2,2);
    // const laserMaterial = new THREE.MeshLambertMaterial({color: 'rgb(0,0,255)'});
    // lasers.push(new THREE.Mesh(laserGeometry,laserMaterial));
    // lasers[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),0.1,gridMapHelper.getGlobalZPositionFromCoord(5));
    // gridMapHelper.addLaser(7,5);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) changeLaserStateStatus(0, "blue");
        else changeLaserStateStatus(0, "red");
    };
    // scene.add(lasers[0]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
            gridMapHelper.obstacles[0].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
});
//Phase 2
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 2 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0.0, gridMapHelper.getGlobalZPositionFromCoord(7));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0.0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addObstacle(4, 4, 7, 7);
    gridMapHelper.addObstacle(4, 4, 3, 3);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addTrap(3, 5, traps[0]);
    scene.add(traps[0]);
    (0, $gSwgq.trapsActivation)(traps);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].rotateY(Math.PI / 2);
    walls[3].rotateY(Math.PI / 2);
    walls[6].rotateY(Math.PI / 2);
    walls[7].rotateY(Math.PI / 2);
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
    gridMapHelper.addObstacle(1, 3, 4, 4);
    gridMapHelper.addObstacle(1, 3, 6, 6);
    gridMapHelper.addObstacle(3, 3, 6, 8);
    gridMapHelper.addObstacle(3, 3, 2, 4);
    gridMapHelper.addObstacle(4, 4, 8, 8);
    gridMapHelper.addObstacle(4, 4, 2, 2);
    gridMapHelper.addObstacle(5, 5, 2, 4);
    gridMapHelper.addObstacle(5, 5, 6, 8);
    gridMapHelper.addObstacle(6, 7, 6, 6);
    gridMapHelper.addObstacle(6, 7, 4, 4);
    laserFences = [];
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    gridMapHelper.addLaser(4, 4, laserFences[0]);
    gridMapHelper.addLaser(4, 6, laserFences[1]);
    laserFences[0].rotateY(Math.PI / 2);
    laserFences[1].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserActiveStatus(0, true);
            changeLaserActiveStatus(1, false);
        } else {
            changeLaserActiveStatus(0, false);
            changeLaserActiveStatus(1, true);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
//Phase 3
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 3 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(3));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    gridMapHelper.addObstacle(9, 9, 3, 3);
    gridMapHelper.addObstacle(9, 9, 6, 6);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    traps = [];
    const trapGeometry = new $49pUz.BoxGeometry(2, 1, 2);
    const trapMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(255,0,0)"
    });
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    gridMapHelper.addTrap(4, 2, traps[0]);
    gridMapHelper.addTrap(4, 7, traps[1]);
    gridMapHelper.addTrap(6, 4, traps[2]);
    gridMapHelper.addTrap(6, 5, traps[3]);
    gridMapHelper.addTrap(9, 2, traps[4]);
    gridMapHelper.addTrap(9, 7, traps[5]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    scene.add(traps[4]);
    scene.add(traps[5]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(12, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(4.5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4.5));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[2].rotateY(Math.PI / 2);
    walls[3].rotateY(Math.PI / 2);
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
    gridMapHelper.addObstacle(3, 7, 9, 9);
    gridMapHelper.addObstacle(3, 7, 0, 0);
    gridMapHelper.addObstacle(3, 3, 2, 7);
    gridMapHelper.addObstacle(5, 5, 4, 5);
    gridMapHelper.addObstacle(5, 5, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 2);
    gridMapHelper.addObstacle(7, 8, 7, 7);
    gridMapHelper.addObstacle(7, 8, 2, 2);
    gridMapHelper.addObstacle(7, 9, 4, 4);
    gridMapHelper.addObstacle(7, 9, 5, 5);
    laserFences = [];
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addLaser(3, 1, laserFences[0]);
    gridMapHelper.addLaser(3, 8, laserFences[1]);
    gridMapHelper.addLaser(7, 1, laserFences[2]);
    gridMapHelper.addLaser(7, 3, laserFences[3]);
    gridMapHelper.addLaser(7, 6, laserFences[4]);
    gridMapHelper.addLaser(7, 8, laserFences[5]);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    scene.add(laserFences[2]);
    scene.add(laserFences[3]);
    scene.add(laserFences[4]);
    scene.add(laserFences[5]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(0, true);
            changeLaserActiveStatus(1, true);
            changeLaserActiveStatus(2, false);
            changeLaserActiveStatus(5, false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(0, false);
            changeLaserActiveStatus(1, false);
            changeLaserActiveStatus(2, true);
            changeLaserActiveStatus(5, true);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
//Phase 4
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 4 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    gridMapHelper.addObstacle(8, 8, 9, 9);
    scene.add(objectives[0]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(1));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addTrap(0, 4, traps[0]);
    gridMapHelper.addTrap(3, 5, traps[1]);
    gridMapHelper.addTrap(5, 1, traps[2]);
    gridMapHelper.addTrap(7, 5, traps[3]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(12, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(8, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(20, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(4.5));
    gridMapHelper.addObstacle(0, 5, 0, 0);
    gridMapHelper.addObstacle(1, 1, 4, 8);
    gridMapHelper.addObstacle(1, 3, 2, 2);
    gridMapHelper.addObstacle(3, 3, 2, 4);
    gridMapHelper.addObstacle(3, 3, 6, 9);
    gridMapHelper.addObstacle(5, 5, 2, 4);
    gridMapHelper.addObstacle(5, 5, 6, 8);
    gridMapHelper.addObstacle(7, 7, 1, 4);
    gridMapHelper.addObstacle(7, 7, 6, 9);
    gridMapHelper.addObstacle(9, 9, 0, 9);
    walls[1].rotateY(Math.PI / 2);
    walls[3].rotateY(Math.PI / 2);
    walls[4].rotateY(Math.PI / 2);
    walls[5].rotateY(Math.PI / 2);
    walls[6].rotateY(Math.PI / 2);
    walls[7].rotateY(Math.PI / 2);
    walls[8].rotateY(Math.PI / 2);
    walls[9].rotateY(Math.PI / 2);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    gridMapHelper.addLaser(5, 5, laserFences[0]);
    gridMapHelper.addLaser(8, 7, laserFences[1]);
    gridMapHelper.addLaser(5, 9, laserFences[2]);
    laserFences[1].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    scene.add(laserFences[2]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(1, true);
            changeLaserActiveStatus(2, false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(1, false);
            changeLaserActiveStatus(2, true);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado com sucesso.\n";
            gridMapHelper.obstacles[0].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
//Phase 5
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 5 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(7));
    gridMapHelper.addObstacle(0, 0, 0, 0);
    gridMapHelper.addObstacle(9, 9, 7, 7);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(6));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(6));
    gridMapHelper.addTrap(0, 6, traps[0]);
    gridMapHelper.addTrap(3, 6, traps[1]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry6 = new $49pUz.BoxGeometry(12, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry6, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry6, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4.5), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addObstacle(1, 1, 4, 6);
    gridMapHelper.addObstacle(0, 2, 9, 9);
    gridMapHelper.addObstacle(2, 4, 4, 4);
    gridMapHelper.addObstacle(2, 7, 1, 1);
    gridMapHelper.addObstacle(4, 6, 3, 3);
    gridMapHelper.addObstacle(6, 6, 2, 2);
    gridMapHelper.addObstacle(3, 8, 7, 7);
    gridMapHelper.addObstacle(5, 6, 8, 8);
    gridMapHelper.addObstacle(8, 9, 9, 9);
    gridMapHelper.addObstacle(9, 9, 0, 6);
    gridMapHelper.addObstacle(1, 1, 2, 2);
    walls[0].rotateY(Math.PI / 2);
    walls[9].rotateY(Math.PI / 2);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addLaser(0, 2, laserFences[0]);
    gridMapHelper.addLaser(2, 0, laserFences[1]);
    gridMapHelper.addLaser(5, 9, laserFences[2]);
    gridMapHelper.addLaser(8, 1, laserFences[3]);
    gridMapHelper.addLaser(8, 8, laserFences[4]);
    laserFences[0].rotateY(Math.PI / 2);
    laserFences[3].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    scene.add(laserFences[2]);
    scene.add(laserFences[3]);
    scene.add(laserFences[4]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(2, true);
            changeLaserActiveStatus(4, false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(2, false);
            changeLaserActiveStatus(4, true);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
//Phase 6
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 6 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(9, 9, 9, 9);
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addTrap(3, 4, traps[0]);
    gridMapHelper.addTrap(7, 5, traps[1]);
    gridMapHelper.addTrap(8, 3, traps[2]);
    gridMapHelper.addTrap(1, 7, traps[3]);
    gridMapHelper.addTrap(3, 8, traps[4]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    scene.add(traps[4]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(12, 2, 2);
    const boxGeometry6 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry6, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addObstacle(0, 4, 9, 9);
    gridMapHelper.addObstacle(0, 0, 8, 8);
    gridMapHelper.addObstacle(0, 0, 1, 2);
    gridMapHelper.addObstacle(1, 1, 1, 3);
    gridMapHelper.addObstacle(0, 5, 0, 0);
    gridMapHelper.addObstacle(1, 2, 5, 5);
    gridMapHelper.addObstacle(3, 4, 6, 6);
    gridMapHelper.addObstacle(3, 4, 3, 3);
    gridMapHelper.addObstacle(5, 5, 2, 2);
    gridMapHelper.addObstacle(5, 5, 7, 7);
    gridMapHelper.addObstacle(6, 6, 2, 8);
    gridMapHelper.addObstacle(8, 9, 8, 8);
    gridMapHelper.addObstacle(8, 8, 7, 7);
    gridMapHelper.addObstacle(8, 9, 1, 1);
    gridMapHelper.addObstacle(8, 8, 2, 2);
    gridMapHelper.addObstacle(9, 9, 5, 5);
    walls[2].rotateY(Math.PI / 2);
    walls[3].rotateY(Math.PI / 2);
    walls[10].rotateY(Math.PI / 2);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addLaser(2, 3, laserFences[0]);
    gridMapHelper.addLaser(6, 9, laserFences[1]);
    gridMapHelper.addLaser(7, 7, laserFences[2]);
    gridMapHelper.addLaser(7, 2, laserFences[3]);
    gridMapHelper.addLaser(8, 9, laserFences[4]);
    gridMapHelper.addLaser(8, 0, laserFences[5]);
    laserFences[0].rotateY(Math.PI / 2);
    laserFences[2].rotateY(Math.PI / 2);
    laserFences[3].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    scene.add(laserFences[2]);
    scene.add(laserFences[3]);
    scene.add(laserFences[4]);
    scene.add(laserFences[5]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(2, true);
            changeLaserActiveStatus(3, false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(2, false);
            changeLaserActiveStatus(3, true);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
//Phase 7
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 7 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(2, 2, 6, 6);
    gridMapHelper.addObstacle(4, 4, 5, 5);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(6));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addTrap(1, 6, traps[0]);
    gridMapHelper.addTrap(7, 5, traps[1]);
    gridMapHelper.addTrap(9, 2, traps[2]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(12, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(8, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4.5));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(8.5));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    gridMapHelper.addObstacle(1, 1, 1, 3);
    gridMapHelper.addObstacle(1, 1, 7, 9);
    gridMapHelper.addObstacle(1, 1, 7, 9);
    gridMapHelper.addObstacle(1, 1, 7, 9);
    gridMapHelper.addObstacle(1, 1, 7, 9);
    gridMapHelper.addObstacle(3, 8, 6, 6);
    gridMapHelper.addObstacle(4, 4, 7, 8);
    gridMapHelper.addObstacle(5, 5, 4, 5);
    gridMapHelper.addObstacle(6, 6, 8, 9);
    gridMapHelper.addObstacle(8, 8, 7, 8);
    gridMapHelper.addObstacle(3, 3, 8, 8);
    gridMapHelper.addObstacle(8, 8, 4, 4);
    gridMapHelper.addObstacle(7, 7, 1, 4);
    walls[0].rotateY(Math.PI / 2);
    walls[1].rotateY(Math.PI / 2);
    walls[3].rotateY(Math.PI / 2);
    walls[6].rotateY(Math.PI / 2);
    walls[7].rotateY(Math.PI / 2);
    walls[8].rotateY(Math.PI / 2);
    walls[9].rotateY(Math.PI / 2);
    walls[12].rotateY(Math.PI / 2);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    gridMapHelper.addLaser(1, 4, laserFences[0]);
    gridMapHelper.addLaser(1, 0, laserFences[1]);
    gridMapHelper.addLaser(2, 8, laserFences[2]);
    gridMapHelper.addLaser(4, 4, laserFences[3]);
    gridMapHelper.addLaser(6, 7, laserFences[4]);
    laserFences[2].rotateY(Math.PI / 2);
    laserFences[3].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    scene.add(laserFences[2]);
    scene.add(laserFences[3]);
    scene.add(laserFences[4]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(2, true);
            changeLaserActiveStatus(3, false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(2, false);
            changeLaserActiveStatus(3, true);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
//Phase 8
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 3 - Fase 8 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(3);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(1));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addObstacle(0, 0, 0, 0);
    gridMapHelper.addObstacle(9, 9, 1, 1);
    gridMapHelper.addObstacle(9, 9, 3, 3);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    scene.add(objectives[2]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(1));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addTrap(0, 1, traps[0]);
    gridMapHelper.addTrap(8, 3, traps[1]);
    gridMapHelper.addTrap(9, 2, traps[2]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(1, 1, 2, 8);
    gridMapHelper.addObstacle(3, 3, 3, 9);
    gridMapHelper.addObstacle(5, 5, 2, 8);
    gridMapHelper.addObstacle(1, 5, 1, 1);
    gridMapHelper.addObstacle(6, 8, 8, 8);
    gridMapHelper.addObstacle(8, 9, 6, 6);
    gridMapHelper.addObstacle(7, 8, 4, 4);
    gridMapHelper.addObstacle(7, 8, 2, 2);
    gridMapHelper.addObstacle(6, 6, 6, 6);
    gridMapHelper.addObstacle(7, 7, 0, 0);
    walls[0].rotateY(Math.PI / 2);
    walls[1].rotateY(Math.PI / 2);
    walls[2].rotateY(Math.PI / 2);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    laserFences[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    gridMapHelper.addLaser(0, 6, laserFences[0]);
    gridMapHelper.addLaser(2, 8, laserFences[1]);
    gridMapHelper.addLaser(3, 0, laserFences[2]);
    gridMapHelper.addLaser(4, 3, laserFences[3]);
    gridMapHelper.addLaser(6, 9, laserFences[4]);
    gridMapHelper.addLaser(7, 6, laserFences[5]);
    gridMapHelper.addLaser(7, 1, laserFences[6]);
    laserFences[0].rotateY(Math.PI / 2);
    laserFences[1].rotateY(Math.PI / 2);
    laserFences[3].rotateY(Math.PI / 2);
    laserFences[5].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    scene.add(laserFences[2]);
    scene.add(laserFences[3]);
    scene.add(laserFences[4]);
    scene.add(laserFences[5]);
    scene.add(laserFences[6]);
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(2, true);
            changeLaserActiveStatus(3, false);
            changeLaserActiveStatus(4, true);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(2, false);
            changeLaserActiveStatus(3, true);
            changeLaserActiveStatus(4, false);
        }
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += "Cristal coletado.\n";
            gridMapHelper.obstacles[2].active = false;
        } else consoleElement.innerText += "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n";
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) consoleElement.innerText += "Todos os cristais coletados com sucesso!\n";
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        objectives[2].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.obstacles[2].active = true;
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) return true;
        else return false;
    };
    setLaserStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        laserState = (laserState + 1) % 2;
        setLaserStates();
    }, 1000);
    spikeTrapState = 0;
    setSpikeTrapState = ()=>{
        if (spikeTrapState == 0) (0, $gSwgq.trapsDeactivation)(traps);
        else (0, $gSwgq.trapsActivation)(traps);
    };
    setSpikeTrapStateInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        spikeTrapState = (spikeTrapState + 1) % 2;
        setSpikeTrapState();
    }, 1000);
});
function removeObjects(crystals, walls, traps, lasers) {
    if (crystals != undefined) for(let i = 0; i < crystals.length; i++)scene.remove(crystals[i]);
    if (walls != undefined) {
        for(let i1 = 0; i1 < walls.length; i1++)scene.remove(walls[i1]);
        gridMapHelper.clearObstacles();
    }
    if (traps != undefined) {
        for(let i2 = 0; i2 < traps.length; i2++)scene.remove(traps[i2]);
        gridMapHelper.clearTraps();
    }
    if (lasers != undefined) {
        for(let i3 = 0; i3 < lasers.length; i3++)scene.remove(lasers[i3]);
        gridMapHelper.clearLasers();
    }
    crystals = undefined;
    walls = undefined;
    traps = undefined;
    lasers = undefined;
}
function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}
window.addEventListener("resize", ()=>{
    (0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
});
const execBtn = document.getElementById("execBtn");
execBtn.addEventListener("click", async function() {
    const codeParsed = (0, $3vWij.default)(editor.state.doc.toString());
    console.log(codeParsed);
    sceneProperties.cancelExecution = false;
    if (traps != null) (0, $gSwgq.trapsDeactivation)(traps);
    if (codeParsed != null) {
        resetLevel();
        sceneProperties.executing = true;
        this.disabled = true;
        await eval(codeParsed);
        if (winCondition()) {
            (0, $jgsti.readOnlyState).doc = editor.state.doc;
            editor.setState((0, $jgsti.readOnlyState));
            document.getElementById("winMessage").classList.remove("invisible");
            document.getElementById("advanceBtn").classList.remove("invisible");
            document.getElementById("resetBtn").disabled = true;
        } else {
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", ()=>{
    sceneProperties.cancelExecution = true;
    resetLevel();
});
const advanceBtn = document.getElementById("advanceBtn");
advanceBtn.addEventListener("click", (e)=>{
    sceneProperties.phase++;
    if (sceneProperties.phase < phaseGeneration.length) {
        if (setLaserStatesInterval) {
            clearInterval(setLaserStatesInterval);
            setLaserStatesInterval = undefined;
        }
        removeObjects(objectives, walls, traps, laserFences);
        phaseGeneration[sceneProperties.phase]();
        editor.setState((0, $jgsti.editState));
        consoleElement.innerText = null;
        document.getElementById("winMessage").classList.add("invisible");
        document.getElementById("advanceBtn").classList.add("invisible");
        execBtn.disabled = false;
        resetBtn.disabled = false;
    } else {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        window.location.href = "../";
    }
});
(0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
animate();

});
parcelRequire.register("3vWij", function(module, exports) {

$parcel$export(module.exports, "default", () => $28f17c62ce377190$export$2e2bcd8739ae039);
const $28f17c62ce377190$var$functionFilter = [
    {
        filter: new RegExp("^andarFrente(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^andarTras(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    },
    {
        filter: new RegExp("^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "normal"
    },
    {
        filter: new RegExp("^desativarLaserAzul(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "mustCondition"
    },
    {
        filter: new RegExp("^desativarLaserVermelho(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "mustCondition"
    },
    {
        filter: new RegExp("^se(\\s+)?\\((\\s+)?.+\\)$"),
        type: "conditional"
    },
    {
        filter: new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$"),
        type: "conditional&&blockValidation"
    },
    {
        filter: new RegExp("^sen\xe3o$"),
        type: "elseValidation"
    },
    {
        filter: new RegExp("^sen\xe3o(\\s+)?{$"),
        type: "elseValidation&&blockValidation"
    },
    {
        filter: new RegExp("^}$"),
        type: "closeBlockValidation"
    },
    {
        filter: new RegExp("^{$"),
        type: "blockValidation"
    }
];
const $28f17c62ce377190$var$conditionalParameters = [
    new RegExp("true"),
    new RegExp("false"),
    new RegExp("^laserAzulAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$"),
    new RegExp("^laserVermelhoAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$")
];
function $28f17c62ce377190$var$ifValidation(line) {
    let trimLine = line.trim();
    let condition = line.substring(trimLine.indexOf("(") + 1, trimLine.lastIndexOf(")"));
    for(let i = 0; i < $28f17c62ce377190$var$conditionalParameters.length; i++){
        if ($28f17c62ce377190$var$conditionalParameters[i].test(condition.trim())) return true;
        else continue;
    }
    return false;
}
function $28f17c62ce377190$var$blockValidation(lines, index) {
    let valid = false;
    let ignoreClosure = 0;
    for(let i = index + 1; i < lines.length; i++){
        if (lines[i].includes("}")) {
            if (ignoreClosure == 0) {
                valid = true;
                break;
            } else ignoreClosure--;
        } else if (lines[i].includes("{")) ignoreClosure++;
        else continue;
    }
    return valid;
}
function $28f17c62ce377190$var$closeBlockValidation(lines, index) {
    let valid = false;
    for(let i = index - 1; i >= 0; i--){
        if (lines[i].includes("{")) {
            valid = true;
            break;
        } else continue;
    }
    return valid;
}
function $28f17c62ce377190$var$mustConditionValidation(lines, index) {
    let valid = false;
    let completeCommonIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?(\\s+)?$");
    let commonIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)$");
    let completeblockIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{[^}]*?$");
    let blockIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$");
    let commonElse = new RegExp("^sen\xe3o$");
    let blockElse = new RegExp("^sen\xe3o(\\s+)?{$");
    let completeCommonElse = new RegExp("^sen\xe3o(\\s+)?.+(\\s+)?$");
    let completeBlockElse = new RegExp("^sen\xe3o(\\s+)?{[^]*?$");
    let start = null;
    for(let i = index - 1; i >= 0; i--){
        if (commonIf.test(lines[i].trim()) || blockIf.test(lines[i].trim()) || commonElse.test(lines[i].trim()) || blockElse.test(lines[i].trim())) {
            start = i;
            break;
        } else continue;
    }
    if (start != null) {
        let codeTillFunction = "";
        for(let i1 = start; i1 < index; i1++)codeTillFunction += `${lines[i1].trim()}\n`;
        if (completeCommonIf.test(codeTillFunction.trim()) || completeblockIf.test(codeTillFunction.trim()) || completeCommonElse.test(codeTillFunction.trim()) || completeBlockElse.test(codeTillFunction.trim())) {
            valid = true;
            return valid;
        } else return valid;
    } else return valid;
}
function $28f17c62ce377190$var$elseValidation(lines, index) {
    let valid = false;
    let completeCommonIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?.+(\\s+)?$");
    let commonIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)$");
    let completeblockIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{[^]*?}$");
    let blockIf = new RegExp("^se(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$");
    let start = null;
    for(let i = index - 1; i >= 0; i--){
        if (commonIf.test(lines[i].trim()) || blockIf.test(lines[i].trim())) {
            start = i;
            break;
        } else continue;
    }
    if (start != null) {
        let codeTillElse = "";
        for(let i1 = start; i1 < index; i1++)codeTillElse += `${lines[i1].trim()}\n`;
        if (completeCommonIf.test(codeTillElse.trim()) || completeblockIf.test(codeTillElse.trim())) {
            valid = true;
            return valid;
        } else return valid;
    } else return valid;
}
function $28f17c62ce377190$var$predictFunction(lines, index) {
    const directionFilter = [
        new RegExp("^andarFrente(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),
        new RegExp("^andarTras(\\s+)?\\((\\s+)?\\d+(\\s+)?\\)(\\s+)?(;)?$"),
        new RegExp("^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        new RegExp("^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        new RegExp("^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$")
    ];
    let position = [
        0,
        5
    ];
    let axis = 0;
    let value = "+";
    let direction = 0;
    function calcDirection(direction) {
        const dirGuide = [
            {
                axis: 0,
                value: "+"
            },
            {
                axis: 1,
                value: "+"
            },
            {
                axis: 0,
                value: "-"
            },
            {
                axis: 1,
                value: "-"
            }
        ];
        return dirGuide[direction];
    }
    function correctRotation(index) {
        let i = index;
        if (i > 3) return 0;
        else if (i < 0) return 3;
        else return i;
    }
    for(let i = 0; i < index; i++){
        if (directionFilter[0].test(lines[i])) {
            let amount = parseInt(lines[i].substring(lines[i].indexOf("(") + 1, lines[i].indexOf(")")));
            if (value == "+") position[axis] += amount;
            else position[axis] -= amount;
        } else if (directionFilter[1].test(lines[i])) {
            let amount1 = parseInt(lines[i].substring(lines[i].indexOf("(") + 1, lines[i].indexOf(")")));
            if (value == "-") position[axis] += amount1;
            else position[axis] -= amount1;
        } else if (directionFilter[2].test(lines[i])) {
            direction--;
            direction = correctRotation(direction);
            const obj = calcDirection(direction);
            axis = obj.axis;
            value = obj.value;
        } else if (directionFilter[3].test(lines[i])) {
            direction++;
            direction = correctRotation(direction);
            const obj1 = calcDirection(direction);
            axis = obj1.axis;
            value = obj1.value;
        } else if (directionFilter[4].test(lines[i])) {
            direction--;
            direction = correctRotation(direction);
            direction--;
            direction = correctRotation(direction);
            const obj2 = calcDirection(direction);
            axis = obj2.axis;
            value = obj2.value;
        } else continue;
    }
    if (value == "+") position[axis]++;
    else position[axis]--;
    return position;
}
function $28f17c62ce377190$var$printError(text, line) {
    const consoleElement = document.getElementById("consoleArea");
    consoleElement.innerText += `Código inválido: ${text} linha: ${line}\n`;
}
function $28f17c62ce377190$export$2e2bcd8739ae039(code, limit = 0) {
    let codeParsed = "async function runCode(){\n";
    let badLuckFunctions = "\n";
    let lines = code.split("\n");
    let valid = true;
    let totalCommands = 0;
    for(let i = 0; i < lines.length; i++){
        let validLine = false;
        let lineType;
        if (lines[i].trim() != "") {
            for(let j = 0; j < $28f17c62ce377190$var$functionFilter.length; j++){
                validLine = $28f17c62ce377190$var$functionFilter[j].filter.test(lines[i].trim());
                if (validLine) {
                    lineType = $28f17c62ce377190$var$functionFilter[j].type;
                    break;
                } else continue;
            }
            if (validLine) {
                if (lineType === "sequential") {
                    let lineParsed = `await ${lines[i].trim()}\n`;
                    codeParsed += lineParsed;
                    totalCommands++;
                } else if (lineType === "conditional&&blockValidation") {
                    let validConditional = false;
                    if ($28f17c62ce377190$var$blockValidation(lines, i)) {
                        if ($28f17c62ce377190$var$ifValidation(lines[i])) validConditional = true;
                        else $28f17c62ce377190$var$printError(`${lines[i]} (Condição inválida)`, i + 1);
                    } else $28f17c62ce377190$var$printError(`${lines[i]} (Bloco é aberto mas nunca é fechado)`, i + 1);
                    if (validConditional) {
                        let line = lines[i].trim();
                        let lineParsed1 = `if${line.substring(line.indexOf("("))}\n`;
                        codeParsed += lineParsed1;
                        totalCommands++;
                    } else {
                        valid = false;
                        break;
                    }
                } else if (lineType === "conditional") {
                    if ($28f17c62ce377190$var$ifValidation(lines[i])) {
                        let line1 = lines[i].trim();
                        let lineParsed2 = `if${line1.substring(line1.indexOf("("))}\n`;
                        codeParsed += lineParsed2;
                        totalCommands++;
                    } else {
                        $28f17c62ce377190$var$printError(`${lines[i]} (Condição inválida)`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "elseValidation") {
                    if ($28f17c62ce377190$var$elseValidation(lines, i)) {
                        let lineParsed3 = "else\n";
                        codeParsed += lineParsed3;
                        totalCommands++;
                    } else {
                        $28f17c62ce377190$var$printError(`${lines[i]} (Condição inválida)`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "elseValidation&&blockValidation") {
                    let validElse = false;
                    if ($28f17c62ce377190$var$blockValidation(lines, i)) {
                        if ($28f17c62ce377190$var$elseValidation(lines, i)) validElse = true;
                        else $28f17c62ce377190$var$printError(`${lines[i]} (Condição inválida)`, i + 1);
                    } else $28f17c62ce377190$var$printError(`${lines[i]} (Bloco é aberto mas nunca é fechado)`, i + 1);
                    if (validElse) {
                        let lineParsed4 = "else{\n";
                        codeParsed += lineParsed4;
                        totalCommands++;
                    } else {
                        valid = false;
                        break;
                    }
                } else if (lineType === "blockValidation") {
                    if ($28f17c62ce377190$var$blockValidation(lines, i)) {
                        let lineParsed5 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed5;
                        totalCommands++;
                    } else {
                        $28f17c62ce377190$var$printError(`${lines[i]} (Bloco é aberto mas nunca é fechado)`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "closeBlockValidation") {
                    if ($28f17c62ce377190$var$closeBlockValidation(lines, i)) {
                        let lineParsed6 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed6;
                        totalCommands++;
                    } else {
                        $28f17c62ce377190$var$printError(`${lines[i]} (Bloco é fechado mas nunca é aberto)`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "mustCondition") {
                    if ($28f17c62ce377190$var$mustConditionValidation(lines, i)) {
                        let lineParsed7 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed7;
                        totalCommands++;
                    } else {
                        let state = $28f17c62ce377190$var$functionFilter[6].filter.test(lines[i].trim()) ? "blue" : "red";
                        let pos = $28f17c62ce377190$var$predictFunction(lines, i);
                        badLuckFunctions += `badLuck([${pos[0]},${pos[1]}],'${state}')\n`;
                        let lineParsed8 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed8;
                        totalCommands++;
                    }
                } else {
                    let lineParsed9 = `${lines[i].trim()}\n`;
                    codeParsed += lineParsed9;
                    totalCommands++;
                }
            } else {
                $28f17c62ce377190$var$printError(lines[i], i + 1);
                valid = false;
                break;
            }
            if (limit > 0 && totalCommands > limit) {
                document.getElementById("consoleArea").innerText += `Aviso: O código tem mais linhas do que o robô pode processar. Tente rescrever seu código em ${limit} linhas ou menos.\n`;
                valid = false;
                break;
            }
        } else continue;
    }
    if (valid) {
        codeParsed += `}${badLuckFunctions}runCode()\n`;
        return codeParsed;
    } else return null;
}

});

parcelRequire.register("3tzMw", function(module, exports) {

$parcel$export(module.exports, "default", () => $287fd608de0fa8e7$export$2e2bcd8739ae039);

var $49pUz = parcelRequire("49pUz");
parcelRequire("eKab5");
class $287fd608de0fa8e7$var$Fence extends $49pUz.Mesh {
    constructor(){
        super(new $49pUz.BoxGeometry(0.5, 2, 0.15), new $49pUz.MeshPhongMaterial({
            color: "white"
        }));
    }
}
class $287fd608de0fa8e7$var$FenceTorus extends $49pUz.Mesh {
    constructor(){
        super(new $49pUz.TorusGeometry(0.15, 0.05, 10, 20), new $49pUz.MeshPhongMaterial({
            color: "black"
        }));
    }
}
class $287fd608de0fa8e7$var$FenceBase extends $49pUz.Mesh {
    constructor(){
        super(new $49pUz.BoxGeometry(0.5, 2, 0.1), new $49pUz.MeshPhongMaterial({
            color: "white"
        }));
    }
}
class $287fd608de0fa8e7$var$Laser extends $49pUz.Mesh {
    constructor(color){
        super(new $49pUz.CylinderGeometry(0.1, 0.1, 2, 64, 64), new $49pUz.MeshPhongMaterial({
            emissive: color,
            color: color,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.7
        }));
    }
}
class $287fd608de0fa8e7$var$LaserFence extends $49pUz.Object3D {
    constructor(type){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        this.state = type;
        this.active = true;
        this.type = type;
        // fence base
        let fenceBase = new $287fd608de0fa8e7$var$FenceBase;
        fenceBase.rotateX(-Math.PI / 2);
        fenceBase.position.set(0, -0.95, 0);
        // fences
        let laserFence1 = new $287fd608de0fa8e7$var$Fence;
        laserFence1.position.set(0, 0, -0.93);
        let laserFence2 = new $287fd608de0fa8e7$var$Fence;
        laserFence2.position.set(0, 0, 0.93);
        // fence torus
        let fenceTorus1A = new $287fd608de0fa8e7$var$FenceTorus;
        fenceTorus1A.position.set(0, 0.6, 0.85);
        let fenceTorus1B = new $287fd608de0fa8e7$var$FenceTorus;
        fenceTorus1B.position.set(0, 0.6, -0.85);
        let fenceTorus2A = new $287fd608de0fa8e7$var$FenceTorus;
        fenceTorus2A.position.set(0, 0, 0.85);
        let fenceTorus2B = new $287fd608de0fa8e7$var$FenceTorus;
        fenceTorus2B.position.set(0, 0, -0.85);
        let fenceTorus3A = new $287fd608de0fa8e7$var$FenceTorus;
        fenceTorus3A.position.set(0, -0.6, 0.85);
        let fenceTorus3B = new $287fd608de0fa8e7$var$FenceTorus;
        fenceTorus3B.position.set(0, -0.6, -0.85);
        // blue lasers
        let laserBlue1 = new $287fd608de0fa8e7$var$Laser("blue");
        laserBlue1.rotateX(-Math.PI / 2);
        laserBlue1.position.set(0, 0.6, 0);
        let laserBlue2 = new $287fd608de0fa8e7$var$Laser("blue");
        laserBlue2.rotateX(-Math.PI / 2);
        laserBlue2.position.set(0, 0, 0);
        let laserBlue3 = new $287fd608de0fa8e7$var$Laser("blue");
        laserBlue3.rotateX(-Math.PI / 2);
        laserBlue3.position.set(0, -0.6, 0);
        this.blueLasers = [
            laserBlue1,
            laserBlue2,
            laserBlue3
        ];
        // red lasers
        let laserRed1 = new $287fd608de0fa8e7$var$Laser("red");
        laserRed1.rotateX(-Math.PI / 2);
        laserRed1.position.set(0, 0.6, 0);
        let laserRed2 = new $287fd608de0fa8e7$var$Laser("red");
        laserRed2.rotateX(-Math.PI / 2);
        laserRed2.position.set(0, 0, 0);
        let laserRed3 = new $287fd608de0fa8e7$var$Laser("red");
        laserRed3.rotateX(-Math.PI / 2);
        laserRed3.position.set(0, -0.6, 0);
        this.redLasers = [
            laserRed1,
            laserRed2,
            laserRed3
        ];
        if (type == "blue") {
            this.blueLasers.forEach((laser)=>laser.visible = true);
            this.redLasers.forEach((laser)=>laser.visible = false);
            this.state = "blue";
        } else if (type == "red" || type == "multiColor") {
            this.blueLasers.forEach((laser)=>laser.visible = false);
            this.state = "red";
        }
        this.add(fenceBase);
        this.add(laserFence1);
        this.add(laserFence2);
        this.add(fenceTorus1A);
        this.add(fenceTorus1B);
        this.add(fenceTorus2A);
        this.add(fenceTorus2B);
        this.add(fenceTorus3A);
        this.add(fenceTorus3B);
        this.add(laserBlue1);
        this.add(laserBlue2);
        this.add(laserBlue3);
        this.add(laserRed1);
        this.add(laserRed2);
        this.add(laserRed3);
        return this;
    }
    setVisible() {
        this.active = true;
    }
    setNotVisible() {
        this.blueLasers.forEach((laser)=>laser.visible = false);
        this.redLasers.forEach((laser)=>laser.visible = false);
        this.active = false;
    }
    setBlue() {
        if (this.active == true) {
            this.blueLasers.forEach((laser)=>laser.visible = true);
            this.redLasers.forEach((laser)=>laser.visible = false);
            this.state = "blue";
        }
    }
    setRed() {
        if (this.active == true) {
            this.blueLasers.forEach((laser)=>laser.visible = false);
            this.redLasers.forEach((laser)=>laser.visible = true);
            this.state = "red";
        }
    }
}
var $287fd608de0fa8e7$export$2e2bcd8739ae039 = $287fd608de0fa8e7$var$LaserFence;

});



parcelRequire("2RZ2r");

