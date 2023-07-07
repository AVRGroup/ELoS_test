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
parcelRequire.register("hO50i", function(module, exports) {

var $49pUz = parcelRequire("49pUz");

var $jgsti = parcelRequire("jgsti");

var $6mhZf = parcelRequire("6mhZf");

var $2Y9dv = parcelRequire("2Y9dv");

var $4UvU9 = parcelRequire("4UvU9");

var $c6e6z = parcelRequire("c6e6z");

var $1CqPx = parcelRequire("1CqPx");

var $gSwgq = parcelRequire("gSwgq");
//Defining Level 1 Scene's Properties
const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0
};
//Generating default Level 1 Objects
const logModal = new (0, $1CqPx.Modal)(document.getElementById("logModal"));
let timerUpadate;
function updateTime() {
    sceneProperties.timer++;
}
const editor = (0, $jgsti.generateDefaultEditor)(document.getElementById("editorArea"), {
    lineNumbers: true
});
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
const consoleElement = document.getElementById("consoleArea");
const { renderer , scene , camera , controls  } = (0, $6mhZf.generateDefaultSceneObjects)(document.getElementById("phaseView"));
const gridMapHelper = new (0, $2Y9dv.default)();
const plane = gridMapHelper.createGridPlane();
const actor = (0, $6mhZf.loadDefaultActor)();
let objectives;
let walls;
let traps;
let spikeTrapState;
let setSpikeTrapState;
let setSpikeTrapStateInterval;
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
let coletarCristal;
let resetLevel;
let winCondition;
const phaseGeneration = [];
//Functions to create the phases
//Phase 1
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 1 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 2
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 2 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addObstacle(8, 8, 2, 2);
    scene.add(objectives[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 3
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 3 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(1));
    gridMapHelper.addObstacle(2, 2, 6, 6);
    gridMapHelper.addObstacle(7, 7, 1, 1);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
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
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 4
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 4 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(2, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1.0, gridMapHelper.getGlobalXPositionFromCoord(5));
    gridMapHelper.addObstacle(7, 7, 5, 5);
    scene.add(walls[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 5
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 5 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addObstacle(6, 6, 2, 2);
    gridMapHelper.addObstacle(7, 7, 8, 8);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1.0, gridMapHelper.getGlobalXPositionFromCoord(7));
    walls[1].rotateY((0, $6mhZf.degreeToRadians)(90));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalXPositionFromCoord(2.5));
    gridMapHelper.addObstacle(5, 7, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    scene.add(walls[0]);
    scene.add(walls[1]);
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
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 6
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 6 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(8, 8, 0, 0);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(16, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 4);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1.0, gridMapHelper.getGlobalZPositionFromCoord(0.5));
    gridMapHelper.addObstacle(2, 8, 2, 2);
    gridMapHelper.addObstacle(2, 9, 4, 4);
    gridMapHelper.addObstacle(7, 7, 0, 1);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 7
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 7 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(16, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 8);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1.0, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    gridMapHelper.addObstacle(2, 8, 4, 4);
    gridMapHelper.addObstacle(2, 8, 6, 6);
    gridMapHelper.addObstacle(8, 8, 0, 3);
    gridMapHelper.addObstacle(2, 9, 8, 8);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addTrap(8, 5, traps[0]);
    scene.add(traps[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
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
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 8
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = "N\xedvel 1 - Fase 8 de 8";
    document.getElementById("phaseObjective").innerText = "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.";
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(3);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(6, 6, 2, 2);
    gridMapHelper.addObstacle(7, 7, 8, 8);
    gridMapHelper.addObstacle(2, 2, 5, 5);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    scene.add(objectives[2]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        color: "rgb(0,255,0)"
    });
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1.0, gridMapHelper.getGlobalXPositionFromCoord(7));
    walls[1].rotateY((0, $6mhZf.degreeToRadians)(90));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addObstacle(5, 7, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    gridMapHelper.addObstacle(1, 3, 4, 4);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addTrap(1, 5, traps[0]);
    gridMapHelper.addTrap(6, 3, traps[1]);
    gridMapHelper.addTrap(5, 8, traps[2]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
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
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        objectives[2].visible = true;
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.obstacles[2].active = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) return true;
        else return false;
    };
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
    document.getElementById("winMessage").innerText = "N\xedvel Conclu\xeddo";
    document.getElementById("advanceBtn").innerText = "Finalizar";
    timerUpadate = setInterval(updateTime, 1000);
});
//Defining function that remove objects, scene render and button's functions
function removeObjects(crystals, walls, traps) {
    if (crystals != undefined) for(let i = 0; i < crystals.length; i++)scene.remove(crystals[i]);
    if (walls != undefined) {
        for(let i1 = 0; i1 < walls.length; i1++)scene.remove(walls[i1]);
        gridMapHelper.clearObstacles();
    }
    if (traps != undefined) {
        for(let i2 = 0; i2 < traps.length; i2++)scene.remove(traps[i2]);
        gridMapHelper.clearTraps();
    }
    crystals = undefined;
    walls = undefined;
    traps = undefined;
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    (0, $c6e6z.displayTime)(sceneProperties.timer, document.getElementById("timer"));
}
window.addEventListener("resize", ()=>{
    (0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
});
const finishEarlierButton = document.getElementById("finishEarlier");
const execBtn = document.getElementById("execBtn");
execBtn.addEventListener("click", async function() {
    const codeParsed = (0, $4UvU9.default)(editor.state.doc.toString());
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
            finishEarlierButton.disabled = true;
            clearInterval(timerUpadate);
            if (sceneProperties.phase == phaseGeneration.length - 1) (0, $c6e6z.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", "N\xedvel 1/Completo");
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
        removeObjects(objectives, walls, traps);
        phaseGeneration[sceneProperties.phase]();
        editor.setState((0, $jgsti.editState));
        consoleElement.innerText = null;
        document.getElementById("winMessage").classList.add("invisible");
        document.getElementById("advanceBtn").classList.add("invisible");
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;
    } else {
        sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
        logModal.show();
    }
});
finishEarlierButton.addEventListener("click", (e)=>{
    if (confirm("Deseja realmente finalizar a pr\xe1tica?")) {
        clearInterval(timerUpadate);
        (0, $c6e6z.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", `Nível 1/Fase ${sceneProperties.phase + 1}`);
        logModal.show();
    }
});
//Running level 1
(0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
animate();

});
parcelRequire.register("4UvU9", function(module, exports) {

$parcel$export(module.exports, "default", () => $39352400bed78e43$export$2e2bcd8739ae039);
const $39352400bed78e43$var$functionFilter = [
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
    }
];
function $39352400bed78e43$var$printError(text, line) {
    const consoleElement = document.getElementById("consoleArea");
    consoleElement.innerText += `Código inválido: ${text} linha: ${line}\n`;
}
function $39352400bed78e43$export$2e2bcd8739ae039(code) {
    let codeParsed = "async function runCode(){\n";
    const lines = code.split("\n");
    let valid = true;
    for(let i = 0; i < lines.length; i++){
        let validLine = false;
        let lineType;
        if (lines[i].trim() != "") {
            for(let j = 0; j < $39352400bed78e43$var$functionFilter.length; j++){
                validLine = $39352400bed78e43$var$functionFilter[j].filter.test(lines[i].trim());
                if (validLine) {
                    lineType = $39352400bed78e43$var$functionFilter[j].type;
                    break;
                }
            }
            if (validLine) {
                if (lineType === "sequential") {
                    let lineParsed = "await " + lines[i].trim() + "\n";
                    codeParsed += lineParsed;
                } else {
                    let lineParsed1 = lines[i].trim() + "\n";
                    codeParsed += lineParsed1;
                }
            } else {
                $39352400bed78e43$var$printError(lines[i], i + 1);
                valid = false;
                break;
            }
        } else continue;
    }
    if (valid) {
        codeParsed += "}\nrunCode()";
        return codeParsed;
    } else return null;
}

});

parcelRequire.register("c6e6z", function(module, exports) {

$parcel$export(module.exports, "displayTime", () => $8cf0fc8944b9cdfc$export$cbae8a5783c0845c);
$parcel$export(module.exports, "configureDataAndUpload", () => $8cf0fc8944b9cdfc$export$ce33b877b675017a);
const $8cf0fc8944b9cdfc$var$FORM_ACCESS = "https://docs.google.com/forms/d/e/1FAIpQLSeTbA3iFSmgcNeCaFKuXEKQ0mOBg74mow2ISXzESXOI4afhOQ/formResponse";
function $8cf0fc8944b9cdfc$export$cbae8a5783c0845c(time, timerElement) {
    let hour = Math.floor(time / 3600);
    let min = Math.floor(time / 60) % 60;
    let seg = Math.floor(time % 60);
    timerElement.innerText = `Tempo: ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`;
}
async function $8cf0fc8944b9cdfc$var$uploadLog(data) {
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", $8cf0fc8944b9cdfc$var$FORM_ACCESS, true);
        let formData = new FormData();
        for(let i = 0; i < data.length; i++)formData.append(data[i][0], data[i][1]);
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === XMLHttpRequest.DONE) resolve(true);
        };
        xhr.send(formData);
    });
}
async function $8cf0fc8944b9cdfc$export$ce33b877b675017a(nameInput, ageInput, genderRadioName, progExpRadioName, subBtn, time, redirectPath, level) {
    subBtn.addEventListener("click", async ()=>{
        let genderInput = document.querySelector(`input[name="${genderRadioName}"]:checked`);
        let progExpInput = document.querySelector(`input[name="${progExpRadioName}"]:checked`);
        let hour = Math.floor(time / 3600);
        let min = Math.floor(time / 60) % 60;
        let seg = Math.floor(time % 60);
        let name = nameInput.value;
        let age = ageInput.value;
        let gender = genderInput != null ? genderInput.value : null;
        let progExp = progExpInput != null ? progExpInput.value : null;
        if (name != null && name != "" && age != null && age != "" && gender != null && gender != "" && progExp != null && progExp != "") {
            if (parseFloat(age) >= 1) {
                subBtn.disabled = true;
                let data = [
                    [
                        "entry.1867777838",
                        level
                    ],
                    [
                        "entry.746491928",
                        name
                    ],
                    [
                        "entry.1029337756",
                        age
                    ],
                    [
                        "entry.1806882852",
                        gender
                    ],
                    [
                        "entry.1585862028",
                        progExp
                    ],
                    [
                        "entry.2140863999",
                        `${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${seg < 10 ? "0" + seg : seg}`
                    ]
                ];
                let success = await $8cf0fc8944b9cdfc$var$uploadLog(data);
                if (success) {
                    console.log(data);
                    window.location.href = redirectPath;
                } else {
                    alert("Ops! Algo deu errado!");
                    subBtn.disabled = false;
                }
            } else alert("Valor da idade incorreto.");
        } else alert("\xc9 necess\xe1rio preencher o formul\xe1rio para avan\xe7ar.");
    });
}

});



parcelRequire("hO50i");

