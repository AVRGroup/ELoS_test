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
parcelRequire.register("1mCsO", function(module, exports) {

var $49pUz = parcelRequire("49pUz");

var $jgsti = parcelRequire("jgsti");

var $6mhZf = parcelRequire("6mhZf");

var $2Y9dv = parcelRequire("2Y9dv");

var $6dfM7 = parcelRequire("6dfM7");

var $9JB7Y = parcelRequire("9JB7Y");

var $dUbLs = parcelRequire("dUbLs");

var $3tzMw = parcelRequire("3tzMw");

var $gSwgq = parcelRequire("gSwgq");
parcelRequire("7qmAS");

var $8vOEa = parcelRequire("8vOEa");

var $c6e6z = parcelRequire("c6e6z");

var $1CqPx = parcelRequire("1CqPx");

var $dYLhF = parcelRequire("dYLhF");
const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0,
    executing: false,
    mult: 1,
    lang: window.location.href.includes("english") ? 1 : 0
};
function generatePhaseTitle() {
    switch(sceneProperties.lang){
        case 1:
            return `Level 4 - Round ${sceneProperties.phase + 1} of 8`;
        default:
            return `Nível 4 - Fase ${sceneProperties.phase + 1} de 8`;
    }
}
const textVariations = [
    [
        generatePhaseTitle,
        "Fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.",
        "Fa\xe7a o rob\xf4 chegar aos cristais, ap\xf3s isso, os colete.",
        "Rob\xf4 n\xe3o est\xe1 em frente ao cristal.\n",
        "Cristal coletado.\n",
        "Cristal coletado com sucesso.\n",
        "Todos os cristais coletados com sucesso!\n",
        "N\xedvel Conclu\xeddo",
        "Finalizar",
        "Deseja realmente finalizar a pr\xe1tica?",
        "O rob\xf4 entrou em curto circuito por tentar desativar um laser azul que n\xe3o existe.\n",
        "O rob\xf4 entrou em curto circuito por tentar desativar um laser vermelho que n\xe3o existe.\n",
        "Abra a porta, fa\xe7a o rob\xf4 chegar ao cristal, ap\xf3s isso, o colete.",
        "\xc9 preciso estar de frente de uma manivela para usar este comando.\n"
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
];
const commandsVariations = [
    [
        "andarFrente(?)\n",
        "andarTras(?)\n",
        "girarEsquerda()\n",
        "girarDireita()\n",
        "darMeiaVolta()\n",
        "coletarCristal()\n",
        "desativarLaserAzul()\n",
        "desativarLaserVermelho()\n",
        "laserAzulAtivo()",
        "laserVermelhoAtivo()",
        "se(?){\n\n}\nsen\xe3o{\n\n}\n",
        "girarManivela()\n",
        "portaFechada()",
        "enquanto(?){\n\n}\n",
        "se(?){\n\n}\n"
    ],
    [
        "moveForward(?)\n",
        "moveBackwards(?)\n",
        "rotateLeft()\n",
        "rotateRight()\n",
        "turnBack()",
        "collectCrystal()\n",
        "disableBlueLaser()\n",
        "disableRedLaser()\n",
        "isBlueLaserActive()",
        "isRedLaserActive()",
        "if(?){\n\n}\nelse{\n\n}\n",
        "turnCrank()\n",
        "isDoorClosed()",
        "while(?){\n\n}\n",
        "if(?){\n\n}\n"
    ]
];
const logModal = new (0, $1CqPx.Modal)(document.getElementById("logModal"));
let timerUpadate;
function updateTime() {
    sceneProperties.timer++;
}
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
                insert: commandsVariations[sceneProperties.lang][0]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][0]
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
                insert: commandsVariations[sceneProperties.lang][1]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][1]
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
                insert: commandsVariations[sceneProperties.lang][2]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][2]
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
                insert: commandsVariations[sceneProperties.lang][3]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][3]
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
                insert: commandsVariations[sceneProperties.lang][4]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][4]
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
                insert: commandsVariations[sceneProperties.lang][6]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][6]
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
                insert: commandsVariations[sceneProperties.lang][7]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][7]
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
const girarManivelaBtn = document.getElementById("girarManivela");
girarManivelaBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: commandsVariations[sceneProperties.lang][11]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][11]
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
                insert: commandsVariations[sceneProperties.lang][5]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][5]
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
                insert: commandsVariations[sceneProperties.lang][8]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][8]
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
                insert: commandsVariations[sceneProperties.lang][9]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][9]
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
const portaFechadaBtn = document.getElementById("portaFechada");
portaFechadaBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: commandsVariations[sceneProperties.lang][12]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][12]
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
const condicaoBtn = document.getElementById("condicao");
condicaoBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: commandsVariations[sceneProperties.lang][14]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][14]
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
                insert: commandsVariations[sceneProperties.lang][10]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][10]
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
const enquantoBtn = document.getElementById("enquanto");
enquantoBtn.addEventListener("click", ()=>{
    let cursorAnchor = editor.state.selection.main.anchor;
    let cursorHead = editor.state.selection.main.head;
    let transaction;
    let actualLine;
    if (cursorAnchor <= cursorHead) {
        transaction = editor.state.update({
            changes: {
                from: cursorAnchor,
                to: cursorHead,
                insert: commandsVariations[sceneProperties.lang][13]
            }
        });
        actualLine = editor.state.doc.lineAt(cursorAnchor).number;
    } else {
        transaction = editor.state.update({
            changes: {
                from: cursorHead,
                to: cursorAnchor,
                insert: commandsVariations[sceneProperties.lang][13]
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

const wallTexture = new $49pUz.TextureLoader().load(new URL((parcelRequire("9uuME"))).toString());
wallTexture.wrapS = $49pUz.RepeatWrapping;
wallTexture.wrapT = $49pUz.RepeatWrapping;
let objectives;
let walls;
let openDoors;
let crancks;
let cranckBases;
let cranckInteractionReferences;
let doors;
let traps;
let laserFences;
scene.add(plane);
scene.add(actor);
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
        consoleElement.innerText += textVariations[sceneProperties.lang][10];
        sceneProperties.cancelExecution = true;
    }
}
function desativarLaserVermelho() {
    const vec = new $49pUz.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec, "red");
    if (laserIndex != null) changeLaserActiveStatus(laserIndex, false);
    else {
        consoleElement.innerText += textVariations[sceneProperties.lang][11];
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
let girarManivela;
let portaFechada;
let coletarCristal;
let resetLevel;
let winCondition;
const phaseGeneration = [];
// Phase 1
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
    openDoors = [];
    doors = [];
    cranckBases = [];
    crancks = [];
    cranckInteractionReferences = [];
    cranckBases.push(new (0, $dUbLs.default)());
    crancks.push(new (0, $9JB7Y.default)());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    crancks[0].correctPos("right", cranckInteractionReferences[0], cranckBases[0]);
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(5, 5, 5, 5);
    scene.add(crancks[0]);
    scene.add(cranckBases[0]);
    scene.add(doors[0]);
    openDoors.push(false);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(18, 2, 2);
    const boxMaterial = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial[2].map.repeat.set(9, 1);
    boxMaterial[3].map.repeat.set(9, 1);
    boxMaterial[4].map.repeat.set(9, 1);
    boxMaterial[5].map.repeat.set(9, 1);
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    scene.add(walls[0]);
    scene.add(walls[1]);
    gridMapHelper.addObstacle(1, 9, 4, 4);
    gridMapHelper.addObstacle(1, 9, 6, 6);
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[1].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        for(let i = 0; i < openDoors.length; i++)openDoors[i] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
// Phase 2
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    //objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(9));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(0, 0, 9, 9);
    //gridMapHelper.addObstacle(9,9,9,9);
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    //scene.add(objectives[2]);
    openDoors = [];
    doors = [];
    crancks = [];
    cranckBases = [];
    cranckInteractionReferences = [];
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    scene.add(cranckBases[0]);
    scene.add(cranckBases[1]);
    scene.add(crancks[0]);
    scene.add(crancks[1]);
    crancks[0].correctPos("up", cranckInteractionReferences[0], cranckBases[0]);
    crancks[1].correctPos("down", cranckInteractionReferences[1], cranckBases[1]);
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    doors[0].rotateY(-Math.PI / 2);
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    doors[1].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(5, 5, 7, 7);
    gridMapHelper.addObstacle(5, 5, 3, 3);
    scene.add(doors[0]);
    scene.add(doors[1]);
    openDoors.push(false);
    openDoors.push(false);
    laserFences = [];
    laserFences.push(new (0, $3tzMw.default)("blue"));
    //laserFences.push(new LaserFence("blue"));
    //laserFences.push(new LaserFence("red"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    //laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    //laserFences[1].rotateY(Math.PI / 2);
    //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    //laserFences[2].rotateY(Math.PI / 2);
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addLaser(7, 9, laserFences[0]);
    //gridMapHelper.addLaser(9,2, laserFences[1]);
    //gridMapHelper.addLaser(9,7, laserFences[2]);
    gridMapHelper.addLaser(7, 0, laserFences[1]);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    //scene.add(laserFences[2]);
    //scene.add(laserFences[3]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addTrap(0, 7, traps[0]);
    gridMapHelper.addTrap(0, 2, traps[1]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    walls = [];
    const boxGeometry = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(8, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxMaterial = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial[2].map.repeat.set(3, 1);
    boxMaterial[3].map.repeat.set(3, 1);
    boxMaterial[4].map.repeat.set(3, 1);
    boxMaterial[5].map.repeat.set(3, 1);
    const boxMaterial1 = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(4, 1);
    boxMaterial2[3].map.repeat.set(4, 1);
    boxMaterial2[4].map.repeat.set(4, 1);
    boxMaterial2[5].map.repeat.set(4, 1);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(2, 1);
    boxMaterial3[3].map.repeat.set(2, 1);
    boxMaterial3[4].map.repeat.set(2, 1);
    boxMaterial3[5].map.repeat.set(2, 1);
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial1));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial1));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial1));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(6.5));
    walls[3].rotateY(Math.PI / 2);
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[4].rotateY(Math.PI / 2);
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[6].rotateY(Math.PI / 2);
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(3.5));
    walls[8].rotateY(Math.PI / 2);
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[9].rotateY(Math.PI / 2);
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(3.5));
    walls[10].rotateY(Math.PI / 2);
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
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
    gridMapHelper.addObstacle(2, 4, 6, 6);
    gridMapHelper.addObstacle(1, 3, 7, 7);
    gridMapHelper.addObstacle(3, 3, 8, 8);
    gridMapHelper.addObstacle(6, 6, 6, 6);
    gridMapHelper.addObstacle(7, 7, 6, 8);
    gridMapHelper.addObstacle(8, 8, 7, 7);
    gridMapHelper.addObstacle(3, 3, 1, 4);
    gridMapHelper.addObstacle(1, 2, 2, 2);
    gridMapHelper.addObstacle(4, 4, 4, 4);
    gridMapHelper.addObstacle(7, 7, 1, 4);
    gridMapHelper.addObstacle(6, 6, 4, 4);
    gridMapHelper.addObstacle(8, 8, 2, 2);
    const doorInteractionReference = new $49pUz.Object3D();
    doorInteractionReference.position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        for(let i = 0; i < objectives.length; i++)objectives[i].visible = true;
        for(let i1 = 0; i1 < openDoors.length; i1++)openDoors[i1] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserActiveStatus(0, true);
            changeLaserActiveStatus(1, false);
        //changeLaserActiveStatus(2,true);
        //changeLaserActiveStatus(3,false);
        } else {
            changeLaserActiveStatus(0, false);
            changeLaserActiveStatus(1, true);
        //changeLaserActiveStatus(2,false);
        //changeLaserActiveStatus(3,true);
        }
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
    timerUpadate = setInterval(updateTime, 1000);
});
// Phase 3
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    //objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0),0.0,gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    //gridMapHelper.addObstacle(0,0,0,0);
    gridMapHelper.addObstacle(9, 9, 9, 9);
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    //scene.add(objectives[2]);
    openDoors = [];
    doors = [];
    crancks = [];
    cranckBases = [];
    cranckInteractionReferences = [];
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    doors.push(new (0, $6dfM7.default)(crancks[2]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    scene.add(cranckBases[0]);
    scene.add(cranckBases[1]);
    scene.add(cranckBases[2]);
    scene.add(crancks[0]);
    scene.add(crancks[1]);
    scene.add(crancks[2]);
    crancks[0].correctPos("down", cranckInteractionReferences[0], cranckBases[0]);
    crancks[1].correctPos("right", cranckInteractionReferences[1], cranckBases[1]);
    crancks[2].correctPos("up", cranckInteractionReferences[2], cranckBases[2]);
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    doors[2].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(1, 1, 9, 9);
    gridMapHelper.addObstacle(8, 8, 7, 7);
    gridMapHelper.addObstacle(9, 9, 1, 1);
    scene.add(doors[0]);
    scene.add(doors[1]);
    scene.add(doors[2]);
    openDoors.push(false);
    openDoors.push(false);
    openDoors.push(false);
    laserFences = [];
    //laserFences.push(new LaserFence("red"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    //gridMapHelper.addLaser(5,9, laserFences[0]);
    gridMapHelper.addLaser(5, 5, laserFences[0]);
    gridMapHelper.addLaser(9, 6, laserFences[1]);
    //gridMapHelper.addLaser(6,2, laserFences[3]);
    //laserFences[0].rotateY(Math.PI / 2);
    laserFences[1].rotateY(Math.PI / 2);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    //scene.add(laserFences[2]);
    //scene.add(laserFences[3]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(1));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addTrap(0, 1, traps[0]);
    gridMapHelper.addTrap(3, 5, traps[1]);
    gridMapHelper.addTrap(9, 8, traps[2]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(8, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxGeometry6 = new $49pUz.BoxGeometry(12, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(3, 1);
    boxMaterial3[3].map.repeat.set(3, 1);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    const boxMaterial4 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[2].map.repeat.set(4, 1);
    boxMaterial4[3].map.repeat.set(4, 1);
    boxMaterial4[4].map.repeat.set(4, 1);
    boxMaterial4[5].map.repeat.set(4, 1);
    const boxMaterial6 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial6[2].map.repeat.set(6, 1);
    boxMaterial6[3].map.repeat.set(6, 1);
    boxMaterial6[4].map.repeat.set(6, 1);
    boxMaterial6[5].map.repeat.set(6, 1);
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry6, boxMaterial6));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[0].rotateY(Math.PI / 2);
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[1].rotateY(Math.PI / 2);
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[7].rotateY(Math.PI / 2);
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[10].rotateY(Math.PI / 2);
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[11].rotateY(Math.PI / 2);
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
    gridMapHelper.addObstacle(1, 1, 6, 8);
    gridMapHelper.addObstacle(1, 1, 1, 4);
    gridMapHelper.addObstacle(2, 3, 6, 6);
    gridMapHelper.addObstacle(2, 3, 4, 4);
    gridMapHelper.addObstacle(3, 8, 8, 8);
    gridMapHelper.addObstacle(5, 8, 6, 6);
    gridMapHelper.addObstacle(5, 8, 4, 4);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    gridMapHelper.addObstacle(3, 4, 3, 3);
    gridMapHelper.addObstacle(3, 3, 1, 1);
    gridMapHelper.addObstacle(7, 7, 0, 2);
    gridMapHelper.addObstacle(8, 8, 1, 2);
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        for(let i = 0; i < openDoors.length; i++)openDoors[i] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(0, true);
        //changeLaserActiveStatus(1,false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(0, false);
        //changeLaserActiveStatus(1,true);
        }
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
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 4
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    //objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),0.0,gridMapHelper.getGlobalZPositionFromCoord(4));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    gridMapHelper.addObstacle(6, 6, 9, 9);
    //gridMapHelper.addObstacle(6,6,4,4);
    gridMapHelper.addObstacle(9, 9, 9, 9);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    //scene.add(objectives[2]);
    openDoors = [];
    doors = [];
    crancks = [];
    cranckBases = [];
    cranckInteractionReferences = [];
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    doors.push(new (0, $6dfM7.default)(crancks[2]));
    //doors.push(new CranckDoor(crancks[3]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4),1,gridMapHelper.getGlobalZPositionFromCoord(1));
    crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
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
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(1));
    doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    doors[0].rotateY(Math.PI / 2);
    doors[1].rotateY(Math.PI / 2);
    doors[2].rotateY(Math.PI / 2);
    //doors[3].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(2, 2, 7, 7);
    gridMapHelper.addObstacle(2, 2, 1, 1);
    //gridMapHelper.addObstacle(6,6,1,1);
    gridMapHelper.addObstacle(6, 6, 8, 8);
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
    laserFences.push(new (0, $3tzMw.default)("red"));
    //laserFences.push(new LaserFence("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
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
    gridMapHelper.addLaser(1, 0, laserFences[0]);
    //gridMapHelper.addLaser(3,6, laserFences[2]);
    gridMapHelper.addLaser(3, 2, laserFences[1]);
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
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(6));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(9));
    traps[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(9));
    traps[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(6));
    traps[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    traps[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addTrap(1, 6, traps[0]);
    gridMapHelper.addTrap(1, 5, traps[1]);
    gridMapHelper.addTrap(1, 4, traps[2]);
    gridMapHelper.addTrap(1, 3, traps[3]);
    gridMapHelper.addTrap(3, 4, traps[4]);
    gridMapHelper.addTrap(5, 9, traps[5]);
    gridMapHelper.addTrap(5, 4, traps[6]);
    gridMapHelper.addTrap(7, 9, traps[7]);
    gridMapHelper.addTrap(7, 6, traps[8]);
    gridMapHelper.addTrap(7, 4, traps[9]);
    gridMapHelper.addTrap(9, 3, traps[10]);
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
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(2, 2, 4);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new $49pUz.BoxGeometry(8, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[0].map.repeat.set(2, 1);
    boxMaterial2[1].map.repeat.set(2, 1);
    boxMaterial2[2].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    boxMaterial2[3].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[0].map.repeat.set(3, 1);
    boxMaterial3[1].map.repeat.set(3, 1);
    boxMaterial3[2].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    boxMaterial3[3].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    const boxMaterial4 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[2].map.repeat.set(4, 1);
    boxMaterial4[3].map.repeat.set(4, 1);
    boxMaterial4[4].map.repeat.set(4, 1);
    boxMaterial4[5].map.repeat.set(4, 1);
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    //walls.push(new THREE.Mesh(boxGeometry2,boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(0.5));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    //walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(7.5));
    gridMapHelper.addObstacle(1, 1, 7, 8);
    gridMapHelper.addObstacle(1, 1, 1, 2);
    gridMapHelper.addObstacle(3, 3, 7, 8);
    gridMapHelper.addObstacle(3, 3, 5, 5);
    gridMapHelper.addObstacle(3, 3, 3, 3);
    gridMapHelper.addObstacle(3, 3, 0, 1);
    gridMapHelper.addObstacle(4, 4, 7, 7);
    gridMapHelper.addObstacle(5, 5, 7, 8);
    gridMapHelper.addObstacle(5, 8, 5, 5);
    gridMapHelper.addObstacle(5, 5, 1, 3);
    gridMapHelper.addObstacle(7, 7, 7, 8);
    gridMapHelper.addObstacle(7, 7, 1, 3);
    gridMapHelper.addObstacle(8, 8, 1, 1);
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
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        //objectives[2].visible = true;
        for(let i = 0; i < openDoors.length; i++)openDoors[i] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(0, true);
        //changeLaserActiveStatus(1,false);
        //changeLaserActiveStatus(4,true);
        //changeLaserActiveStatus(6,false);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(0, false);
        //changeLaserActiveStatus(1,true);
        //changeLaserActiveStatus(4,false);
        //changeLaserActiveStatus(6,true);
        }
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
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 5
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(3);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(7));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(3));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    //objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(7));
    //objectives[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addObstacle(2, 2, 7, 7);
    gridMapHelper.addObstacle(2, 2, 3, 3);
    gridMapHelper.addObstacle(8, 8, 5, 5);
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
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    //crancks.push(new Cranck());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    //cranckBases.push(new CranckBase());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    doors.push(new (0, $6dfM7.default)(crancks[2]));
    //doors.push(new CranckDoor(crancks[3]));
    //doors.push(new CranckDoor(crancks[4]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(5));
    crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
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
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6),1,gridMapHelper.getGlobalZPositionFromCoord(5));
    doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    //doors[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),1,gridMapHelper.getGlobalZPositionFromCoord(1));
    doors[0].rotateY(Math.PI / 2);
    doors[1].rotateY(Math.PI / 2);
    doors[2].rotateY(Math.PI / 2);
    //doors[4].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(2, 2, 8, 8);
    gridMapHelper.addObstacle(2, 2, 2, 2);
    //gridMapHelper.addObstacle(6,6,5,5);
    gridMapHelper.addObstacle(9, 9, 8, 8);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("blue"));
    //laserFences.push(new LaserFence("blue"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    //laserFences[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    //laserFences[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    //laserFences[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    //laserFences[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    //laserFences[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    //laserFences[0].rotateY(Math.PI / 2);
    laserFences[0].rotateY(Math.PI / 2);
    //laserFences[8].rotateY(Math.PI / 2);
    //laserFences[9].rotateY(Math.PI / 2);
    //gridMapHelper.addLaser(0,7, laserFences[0]);
    gridMapHelper.addLaser(0, 2, laserFences[0]);
    //gridMapHelper.addLaser(3,9, laserFences[2]);
    //gridMapHelper.addLaser(3,1, laserFences[3]);
    //gridMapHelper.addLaser(5,9, laserFences[4]);
    //gridMapHelper.addLaser(5,0, laserFences[5]);
    gridMapHelper.addLaser(7, 9, laserFences[1]);
    //gridMapHelper.addLaser(7,0, laserFences[7]);
    //gridMapHelper.addLaser(8,6, laserFences[8]);
    //gridMapHelper.addLaser(8,4, laserFences[9]);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    //scene.add(laserFences[2]);
    //scene.add(laserFences[3]);
    //scene.add(laserFences[4]);
    //scene.add(laserFences[5]);
    //scene.add(laserFences[6]);
    //scene.add(laserFences[7]);
    //scene.add(laserFences[8]);
    //scene.add(laserFences[9]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addTrap(1, 7, traps[0]);
    gridMapHelper.addTrap(1, 3, traps[1]);
    gridMapHelper.addTrap(3, 7, traps[2]);
    gridMapHelper.addTrap(3, 5, traps[3]);
    gridMapHelper.addTrap(3, 3, traps[4]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    scene.add(traps[4]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(6, 2, 6);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[0].map.repeat.set(3, 1);
    boxMaterial3[1].map.repeat.set(3, 1);
    boxMaterial3[2].map.repeat.set(3, 3);
    boxMaterial3[3].map.repeat.set(3, 3);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[16].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[17].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addObstacle(1, 1, 8, 8);
    gridMapHelper.addObstacle(1, 2, 6, 6);
    gridMapHelper.addObstacle(1, 2, 4, 4);
    gridMapHelper.addObstacle(1, 1, 2, 2);
    gridMapHelper.addObstacle(1, 2, 0, 0);
    gridMapHelper.addObstacle(3, 4, 8, 8);
    gridMapHelper.addObstacle(3, 4, 6, 6);
    gridMapHelper.addObstacle(3, 4, 4, 4);
    gridMapHelper.addObstacle(3, 4, 2, 2);
    gridMapHelper.addObstacle(3, 3, 0, 0);
    gridMapHelper.addObstacle(5, 7, 6, 8);
    gridMapHelper.addObstacle(5, 7, 2, 4);
    gridMapHelper.addObstacle(5, 5, 1, 1);
    gridMapHelper.addObstacle(7, 8, 1, 1);
    gridMapHelper.addObstacle(8, 8, 8, 8);
    gridMapHelper.addObstacle(8, 8, 2, 2);
    gridMapHelper.addObstacle(9, 9, 6, 6);
    gridMapHelper.addObstacle(9, 9, 4, 4);
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
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[5].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[2].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        objectives[2].visible = true;
        //objectives[3].visible = true;
        //objectives[4].visible = true;
        for(let i = 0; i < openDoors.length; i++)openDoors[i] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) return true;
        else return false;
    };
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) changeLaserStateStatus(0, "blue");
        else changeLaserStateStatus(0, "red");
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
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 6
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    gridMapHelper.addObstacle(0, 0, 0, 0);
    gridMapHelper.addObstacle(7, 7, 9, 9);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    openDoors = [];
    doors = [];
    crancks = [];
    cranckBases = [];
    cranckInteractionReferences = [];
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    //crancks.push(new Cranck());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    //cranckBases.push(new CranckBase());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    doors.push(new (0, $6dfM7.default)(crancks[2]));
    //doors.push(new CranckDoor(crancks[3]));
    //doors.push(new CranckDoor(crancks[4]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(9));
    //crancks[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(6));
    crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    crancks[0].correctPos("down", cranckInteractionReferences[0], cranckBases[0]);
    crancks[1].correctPos("down", cranckInteractionReferences[1], cranckBases[1]);
    //crancks[2].correctPos("down", cranckInteractionReferences[2], cranckBases[2]);
    //crancks[3].correctPos("up", cranckInteractionReferences[3], cranckBases[3]);
    crancks[2].correctPos("down", cranckInteractionReferences[2], cranckBases[2]);
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
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5),1,gridMapHelper.getGlobalZPositionFromCoord(8));
    //doors[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(7));
    doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    //doors[2].rotateY(Math.PI / 2);
    //doors[3].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(1, 1, 8, 8);
    gridMapHelper.addObstacle(3, 3, 0, 0);
    //gridMapHelper.addObstacle(5,5,8,8);
    //gridMapHelper.addObstacle(7,7,7,7);
    gridMapHelper.addObstacle(8, 8, 0, 0);
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
    //laserFences.push(new LaserFence("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences.push(new LaserFence("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
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
    gridMapHelper.addLaser(4, 6, laserFences[0]);
    //gridMapHelper.addLaser(5,4, laserFences[3]);
    //gridMapHelper.addLaser(6,1, laserFences[4]);
    //gridMapHelper.addLaser(8,3, laserFences[5]);
    gridMapHelper.addLaser(9, 6, laserFences[1]);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    //scene.add(laserFences[2]);
    //scene.add(laserFences[3]);
    //scene.add(laserFences[4]);
    //scene.add(laserFences[5]);
    //scene.add(laserFences[6]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    //traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(8));
    //traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addTrap(0, 2, traps[0]);
    gridMapHelper.addTrap(3, 5, traps[1]);
    gridMapHelper.addTrap(3, 3, traps[2]);
    gridMapHelper.addTrap(7, 2, traps[3]);
    //gridMapHelper.addTrap(9,8, traps[4]);
    //gridMapHelper.addTrap(9,4, traps[5]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    //scene.add(traps[4]);
    //scene.add(traps[5]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new $49pUz.BoxGeometry(2, 2, 4);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[0].map.repeat.set(3, 1);
    boxMaterial3[1].map.repeat.set(3, 1);
    boxMaterial3[2].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    boxMaterial3[3].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    const boxMaterial4 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[0].map.repeat.set(2, 1);
    boxMaterial4[1].map.repeat.set(2, 1);
    boxMaterial4[2].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    boxMaterial4[3].map.rotation = (0, $6mhZf.degreeToRadians)(90);
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(6.5));
    walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    gridMapHelper.addObstacle(1, 1, 9, 9);
    gridMapHelper.addObstacle(1, 2, 7, 7);
    gridMapHelper.addObstacle(1, 2, 2, 2);
    gridMapHelper.addObstacle(1, 1, 0, 0);
    gridMapHelper.addObstacle(3, 3, 6, 8);
    gridMapHelper.addObstacle(3, 4, 4, 4);
    gridMapHelper.addObstacle(3, 3, 1, 2);
    gridMapHelper.addObstacle(4, 4, 8, 8);
    gridMapHelper.addObstacle(5, 6, 6, 6);
    gridMapHelper.addObstacle(5, 6, 2, 2);
    gridMapHelper.addObstacle(6, 6, 7, 9);
    gridMapHelper.addObstacle(6, 6, 3, 5);
    gridMapHelper.addObstacle(6, 6, 0, 0);
    gridMapHelper.addObstacle(8, 8, 6, 7);
    gridMapHelper.addObstacle(8, 8, 4, 4);
    gridMapHelper.addObstacle(8, 8, 1, 2);
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
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        objectives[0].visible = true;
        objectives[1].visible = true;
        for(let i = 0; i < openDoors.length; i++)openDoors[i] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            changeLaserActiveStatus(0, true);
        //changeLaserActiveStatus(3,true);
        } else {
            changeLaserStateStatus(0, "red");
            changeLaserActiveStatus(0, false);
        //changeLaserActiveStatus(3,false);
        }
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
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 7
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(4);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    //objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0.0,gridMapHelper.getGlobalZPositionFromCoord(4));
    objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(0, 0, 8, 8);
    gridMapHelper.addObstacle(0, 0, 0, 0);
    gridMapHelper.addObstacle(7, 7, 9, 9);
    //gridMapHelper.addObstacle(9,9,4,4);
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    scene.add(objectives[2]);
    scene.add(objectives[3]);
    //scene.add(objectives[4]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    //traps.push(new SpikeTrap());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(8));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    //traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9),0,gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addTrap(0, 2, traps[0]);
    gridMapHelper.addTrap(0, 7, traps[1]);
    gridMapHelper.addTrap(6, 8, traps[2]);
    gridMapHelper.addTrap(8, 5, traps[3]);
    //gridMapHelper.addTrap(9,3, traps[4]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    //scene.add(traps[4]);
    openDoors = [];
    doors = [];
    crancks = [];
    cranckBases = [];
    cranckInteractionReferences = [];
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    doors.push(new (0, $6dfM7.default)(crancks[2]));
    doors.push(new (0, $6dfM7.default)(crancks[3]));
    //doors.push(new CranckDoor(crancks[4]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    crancks[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    //crancks[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(7),1,gridMapHelper.getGlobalZPositionFromCoord(3));
    crancks[0].correctPos("left", cranckInteractionReferences[0], cranckBases[0]);
    crancks[1].correctPos("right", cranckInteractionReferences[1], cranckBases[1]);
    crancks[2].correctPos("down", cranckInteractionReferences[2], cranckBases[2]);
    crancks[3].correctPos("right", cranckInteractionReferences[3], cranckBases[3]);
    //crancks[4].correctPos("down", cranckInteractionReferences[4], cranckBases[4]);
    scene.add(cranckBases[0]);
    scene.add(cranckBases[1]);
    scene.add(cranckBases[2]);
    scene.add(cranckBases[3]);
    //scene.add(cranckBases[4]);
    scene.add(crancks[0]);
    scene.add(crancks[1]);
    scene.add(crancks[2]);
    scene.add(crancks[3]);
    //scene.add(crancks[4]);
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    doors[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    //doors[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(2));
    doors[2].rotateY(Math.PI / 2);
    //doors[3].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(1, 1, 9, 9);
    gridMapHelper.addObstacle(1, 1, 1, 1);
    gridMapHelper.addObstacle(4, 4, 8, 8);
    gridMapHelper.addObstacle(8, 8, 7, 7);
    //gridMapHelper.addObstacle(8,8,2,2);
    scene.add(doors[0]);
    scene.add(doors[1]);
    scene.add(doors[2]);
    scene.add(doors[3]);
    //scene.add(doors[4]);
    openDoors.push(false);
    openDoors.push(false);
    openDoors.push(false);
    openDoors.push(false);
    //openDoors.push(false);
    laserFences = [];
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences.push(new LaserFence("multiColor"));
    laserFences[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    laserFences[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    //laserFences[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    //laserFences[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    laserFences[1].rotateY(Math.PI / 2);
    //laserFences[2].rotateY(Math.PI / 2);
    //laserFences[3].rotateY(Math.PI / 2);
    gridMapHelper.addLaser(5, 9, laserFences[0]);
    gridMapHelper.addLaser(6, 6, laserFences[1]);
    //gridMapHelper.addLaser(9,6, laserFences[2]);
    //gridMapHelper.addLaser(9,1, laserFences[3]);
    scene.add(laserFences[0]);
    scene.add(laserFences[1]);
    //scene.add(laserFences[2]);
    //scene.add(laserFences[3]);
    walls = [];
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(3, 1);
    boxMaterial3[3].map.repeat.set(3, 1);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(7.5));
    walls[0].rotateY(Math.PI / 2);
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(8.5));
    walls[1].rotateY(Math.PI / 2);
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[2].rotateY(Math.PI / 2);
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[6].rotateY(Math.PI / 2);
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[10].rotateY(Math.PI / 2);
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[15].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[16].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[17].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(1, 1, 7, 8);
    gridMapHelper.addObstacle(3, 3, 8, 9);
    gridMapHelper.addObstacle(1, 1, 2, 4);
    gridMapHelper.addObstacle(2, 3, 4, 4);
    gridMapHelper.addObstacle(2, 2, 2, 2);
    gridMapHelper.addObstacle(4, 4, 6, 6);
    gridMapHelper.addObstacle(5, 5, 6, 8);
    gridMapHelper.addObstacle(1, 3, 0, 0);
    gridMapHelper.addObstacle(4, 4, 2, 2);
    gridMapHelper.addObstacle(6, 6, 2, 2);
    gridMapHelper.addObstacle(5, 5, 1, 3);
    gridMapHelper.addObstacle(8, 8, 9, 9);
    gridMapHelper.addObstacle(7, 9, 8, 8);
    gridMapHelper.addObstacle(7, 8, 6, 6);
    gridMapHelper.addObstacle(7, 8, 4, 4);
    gridMapHelper.addObstacle(8, 8, 3, 3);
    gridMapHelper.addObstacle(8, 8, 1, 1);
    gridMapHelper.addObstacle(7, 8, 0, 0);
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
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[3], gridMapHelper)) return !openDoors[3];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[5].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[6].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[3], gridMapHelper)) {
                function translateDoor() {
                    doors[3].lerpDoor(0, -2);
                    doors[3].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[3].getDoorY().toFixed(1) == -2) {
                    openDoors[3] = true;
                    gridMapHelper.obstacles[7].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[2].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[3], gridMapHelper)) {
            objectives[3].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[3].active = false;
        } else {
            consoleElement.innerText += textVariations[sceneProperties.lang][3];
            if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
        }
        resetLevel = ()=>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
            actor.getObjectByName("eve").rotation.set(0, 0, 0);
            for(let i = 0; i < objectives.length; i++)objectives[i].visible = true;
            for(let i1 = 0; i1 < openDoors.length; i1++)openDoors[i1] = false;
            doors.forEach((door)=>door.resetPos());
            gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
            gridMapHelper.restartLasers();
            lasersVisualRestart();
            setLaserStates();
        };
        winCondition = ()=>{
            if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible) return true;
            else return false;
        };
        laserState = 0;
        setLaserStates = ()=>{
            if (laserState == 0) {
                changeLaserStateStatus(0, "blue");
                changeLaserActiveStatus(1, true);
            } else {
                changeLaserStateStatus(0, "red");
                changeLaserActiveStatus(1, false);
            }
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
        timerUpadate = setInterval(updateTime, 1000);
    };
});
//Phase 8
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][12];
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
    objectives = (0, $6mhZf.loadDefaultObjectives)(4);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    objectives[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    gridMapHelper.addObstacle(0, 0, 0, 0);
    gridMapHelper.addObstacle(9, 9, 0, 0);
    gridMapHelper.addObstacle(5, 5, 6, 6);
    gridMapHelper.addObstacle(9, 9, 9, 9);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    scene.add(objectives[2]);
    scene.add(objectives[3]);
    traps = [];
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps.push(new (0, $gSwgq.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(0));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addTrap(1, 3, traps[0]);
    gridMapHelper.addTrap(2, 3, traps[1]);
    gridMapHelper.addTrap(2, 0, traps[2]);
    gridMapHelper.addTrap(5, 7, traps[3]);
    gridMapHelper.addTrap(8, 4, traps[4]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    scene.add(traps[4]);
    openDoors = [];
    doors = [];
    crancks = [];
    cranckBases = [];
    cranckInteractionReferences = [];
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    crancks.push(new (0, $9JB7Y.default)());
    //crancks.push(new Cranck());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    cranckBases.push(new (0, $dUbLs.default)());
    //cranckBases.push(new CranckBase());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    cranckInteractionReferences.push(new $49pUz.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, $6dfM7.default)(crancks[0]));
    doors.push(new (0, $6dfM7.default)(crancks[1]));
    doors.push(new (0, $6dfM7.default)(crancks[2]));
    //doors.push(new CranckDoor(crancks[3]));
    //doors.push(new CranckDoor(crancks[4]));
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    crancks[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    //crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(7));
    crancks[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
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
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    doors[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    //doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3),1,gridMapHelper.getGlobalZPositionFromCoord(6));
    doors[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    //doors[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8),1,gridMapHelper.getGlobalZPositionFromCoord(0));
    doors[1].rotateY(Math.PI / 2);
    //doors[2].rotateY(Math.PI / 2);
    doors[2].rotateY(Math.PI / 2);
    //doors[3].rotateY(Math.PI / 2);
    gridMapHelper.addObstacle(2, 2, 9, 9);
    gridMapHelper.addObstacle(1, 1, 1, 1);
    //gridMapHelper.addObstacle(3,3,6,6);
    gridMapHelper.addObstacle(5, 5, 5, 5);
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
    laserFences.push(new (0, $3tzMw.default)("multiColor"));
    laserFences.push(new (0, $3tzMw.default)("red"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences.push(new LaserFence("red"));
    laserFences.push(new (0, $3tzMw.default)("blue"));
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
    gridMapHelper.addLaser(4, 9, laserFences[0]);
    gridMapHelper.addLaser(5, 2, laserFences[1]);
    //gridMapHelper.addLaser(7,5, laserFences[5]);
    //gridMapHelper.addLaser(8,8, laserFences[6]);
    gridMapHelper.addLaser(9, 5, laserFences[2]);
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
    const boxGeometry1 = new $49pUz.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new $49pUz.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new $49pUz.BoxGeometry(6, 2, 2);
    const boxGeometry4 = new $49pUz.BoxGeometry(8, 2, 2);
    const boxGeometry5 = new $49pUz.BoxGeometry(10, 2, 2);
    const boxMaterial = new $49pUz.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(3, 1);
    boxMaterial3[3].map.repeat.set(3, 1);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    const boxMaterial4 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[2].map.repeat.set(4, 1);
    boxMaterial4[3].map.repeat.set(4, 1);
    boxMaterial4[4].map.repeat.set(4, 1);
    boxMaterial4[5].map.repeat.set(4, 1);
    const boxMaterial5 = [
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new $49pUz.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial5[2].map.repeat.set(5, 1);
    boxMaterial5[3].map.repeat.set(5, 1);
    boxMaterial5[4].map.repeat.set(5, 1);
    boxMaterial5[5].map.repeat.set(5, 1);
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry5, boxMaterial5));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry1, boxMaterial));
    walls.push(new $49pUz.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new $49pUz.Mesh(boxGeometry2, boxMaterial2));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[0].rotateY(Math.PI / 2);
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[1].rotateY(Math.PI / 2);
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(1), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[2].rotateY(Math.PI / 2);
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[3].rotateY(Math.PI / 2);
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6.5));
    walls[5].rotateY(Math.PI / 2);
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[7].rotateY(Math.PI / 2);
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(9));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(5.5));
    walls[9].rotateY(Math.PI / 2);
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[11].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[12].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[12].rotateY(Math.PI / 2);
    walls[13].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[14].position.set(gridMapHelper.getGlobalXPositionFromCoord(8.5), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    gridMapHelper.addObstacle(0, 0, 7, 9);
    gridMapHelper.addObstacle(0, 0, 1, 3);
    gridMapHelper.addObstacle(1, 1, 5, 5);
    gridMapHelper.addObstacle(2, 2, 4, 8);
    gridMapHelper.addObstacle(2, 2, 1, 1);
    gridMapHelper.addObstacle(3, 3, 3, 3);
    gridMapHelper.addObstacle(4, 4, 5, 8);
    gridMapHelper.addObstacle(4, 4, 1, 3);
    gridMapHelper.addObstacle(8, 8, 9, 9);
    gridMapHelper.addObstacle(6, 9, 7, 7);
    gridMapHelper.addObstacle(6, 6, 5, 6);
    gridMapHelper.addObstacle(8, 8, 5, 5);
    gridMapHelper.addObstacle(6, 6, 0, 3);
    gridMapHelper.addObstacle(7, 8, 3, 3);
    gridMapHelper.addObstacle(8, 9, 1, 1);
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
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[5].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, $6mhZf.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[6].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else {
                consoleElement.innerText += textVariations[sceneProperties.lang][13];
                resolve();
            }
        });
    };
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[2].active = false;
        } else if ((0, $6mhZf.checkCollision)(actor.getObjectByName("interactionReference"), objectives[3], gridMapHelper)) {
            objectives[3].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[3].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, $6mhZf.degreeToRadians)(90), 0);
        actor.getObjectByName("eve").rotation.set(0, 0, 0);
        for(let i = 0; i < objectives.length; i++)objectives[i].visible = true;
        for(let i1 = 0; i1 < openDoors.length; i1++)openDoors[i1] = false;
        doors.forEach((door)=>door.resetPos());
        gridMapHelper.obstacles.forEach((obstacle)=>obstacle.active = true);
        gridMapHelper.restartLasers();
        lasersVisualRestart();
        setLaserStates();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible) return true;
        else return false;
    };
    laserState = 0;
    setLaserStates = ()=>{
        if (laserState == 0) {
            changeLaserStateStatus(0, "blue");
            //changeLaserActiveStatus(1,true);
            //changeLaserActiveStatus(2,true);
            changeLaserActiveStatus(1, true);
            //changeLaserActiveStatus(6,true);
            changeLaserActiveStatus(2, true);
        //changeLaserActiveStatus(8,true);
        } else {
            changeLaserStateStatus(0, "red");
            //changeLaserActiveStatus(1,false);
            //changeLaserActiveStatus(2,false);
            changeLaserActiveStatus(1, false);
            //changeLaserActiveStatus(6,false);
            changeLaserActiveStatus(2, false);
        //changeLaserActiveStatus(8,false);
        }
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
    document.getElementById("winMessage").innerText = textVariations[sceneProperties.lang][7];
    document.getElementById("advanceBtn").innerText = textVariations[sceneProperties.lang][8];
    timerUpadate = setInterval(updateTime, 1000);
});
function removeObjects(crystals, walls, traps, lasers, doors, crancks, cranckBases, cranckInteractionReferences) {
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
    if (doors != undefined) {
        for(let i4 = 0; i4 < doors.length; i4++)scene.remove(doors[i4]);
        gridMapHelper.clearDoors();
    }
    if (crancks != undefined) {
        for(let i5 = 0; i5 < crancks.length; i5++)scene.remove(crancks[i5]);
        gridMapHelper.clearDoors();
    }
    if (cranckBases != undefined) {
        for(let i6 = 0; i6 < cranckBases.length; i6++)scene.remove(cranckBases[i6]);
        gridMapHelper.clearDoors();
    }
    if (cranckInteractionReferences != undefined) {
        for(let i7 = 0; i7 < cranckInteractionReferences.length; i7++)scene.remove(cranckInteractionReferences[i7]);
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
function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
    (0, $c6e6z.displayTime)(sceneProperties.timer, document.getElementById("timer"));
}
window.addEventListener("resize", ()=>{
    (0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
});
const finishEarlierButton = document.getElementById("finishEarlier");
const execBtn = document.getElementById("execBtn");
execBtn.addEventListener("click", async function() {
    const codeParsed = (0, $8vOEa.default)((0, $dYLhF.convertCode)(sceneProperties.lang, editor.state.doc.toString()));
    console.log(codeParsed);
    cancelAnimationFrame((0, $6mhZf.corrID));
    cancelAnimationFrame((0, $6mhZf.requestID));
    cancelAnimationFrame((0, $6mhZf.changColorID));
    cancelAnimationFrame((0, $6mhZf.smokeAnimationFrame));
    (0, $6mhZf.smoke).deactiveSmokes();
    sceneProperties.cancelExecution = false;
    actor.getObjectByName("eve").position.y = 0;
    if (traps != null) (0, $gSwgq.trapsDeactivation)(traps);
    if (codeParsed != null) {
        (0, $jgsti.updateTheme)(editor, 1);
        resetLevel();
        this.disabled = true;
        sceneProperties.executing = true;
        await eval(codeParsed);
        if (winCondition()) {
            (0, $jgsti.readOnlyState).doc = editor.state.doc;
            editor.setState((0, $jgsti.readOnlyState));
            document.getElementById("winMessage").classList.remove("invisible");
            document.getElementById("advanceBtn").classList.remove("invisible");
            document.getElementById("resetBtn").disabled = true;
            finishEarlierButton.disabled = true;
            clearInterval(timerUpadate);
            if (sceneProperties.phase == phaseGeneration.length - 1) (0, $c6e6z.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", "N\xedvel 4/Completo", document.getElementById("second-user"));
        } else {
            (0, $jgsti.updateTheme)(editor, 0);
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", ()=>{
    cancelAnimationFrame((0, $6mhZf.corrID));
    cancelAnimationFrame((0, $6mhZf.requestID));
    cancelAnimationFrame((0, $6mhZf.changColorID));
    cancelAnimationFrame((0, $6mhZf.smokeAnimationFrame));
    (0, $6mhZf.smoke).deactiveSmokes();
    (0, $jgsti.updateTheme)(editor, 0);
    sceneProperties.cancelExecution = true;
    actor.getObjectByName("eve").position.y = 0;
    if ((0, $6mhZf.materialColor).length != 0) (0, $6mhZf.resetRobotColor)(actor);
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
        removeObjects(objectives, walls, traps, laserFences, doors, crancks, cranckBases, cranckInteractionReferences);
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
const reloadBtn = document.getElementById("reloadBtn");
reloadBtn.addEventListener("click", (e)=>{
    clearInterval(timerUpadate);
    if (sceneProperties.phase < phaseGeneration.length) {
        removeObjects(objectives, walls, traps);
        phaseGeneration[sceneProperties.phase]();
        editor.setState((0, $jgsti.editState));
        consoleElement.innerText = null;
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;
    } else sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
});
finishEarlierButton.addEventListener("click", (e)=>{
    if (confirm(textVariations[sceneProperties.lang][9])) {
        clearInterval(timerUpadate);
        (0, $c6e6z.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", `Nível 4/Fase ${sceneProperties.phase + 1}`, document.getElementById("second-user"));
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
(0, $6mhZf.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
animate();

});
parcelRequire.register("6dfM7", function(module, exports) {

$parcel$export(module.exports, "default", () => $486031900c58675e$export$2e2bcd8739ae039);

var $49pUz = parcelRequire("49pUz");
parcelRequire("9JB7Y");
let $486031900c58675e$var$loader = new $49pUz.TextureLoader();
// Function to set basic material or textures
// You can set just a color, just a texture or both
function $486031900c58675e$var$setMaterial(color, file = null, repeatU = 1, repeatV = 1) {
    if (!color) color = "rgb(255,255,255)";
    let mat;
    if (!file) mat = new $49pUz.MeshBasicMaterial({
        color: color
    });
    else {
        mat = new $49pUz.MeshBasicMaterial({
            map: $486031900c58675e$var$loader.load(file),
            color: color
        });
        mat.map.wrapS = mat.map.wrapT = $49pUz.RepeatWrapping;
        mat.map.minFilter = mat.map.magFilter = $49pUz.LinearFilter;
        mat.map.repeat.set(repeatU, repeatV);
    }
    return mat;
}

const $486031900c58675e$var$stonePath = new URL((parcelRequire("6K46K"))).toString();
let $486031900c58675e$var$cubeMaterials = [
    $486031900c58675e$var$setMaterial("lightgray", $486031900c58675e$var$stonePath),
    $486031900c58675e$var$setMaterial("lightgray", $486031900c58675e$var$stonePath),
    $486031900c58675e$var$setMaterial("gray"),
    $486031900c58675e$var$setMaterial("lightgray"),
    $486031900c58675e$var$setMaterial("lightgray"),
    $486031900c58675e$var$setMaterial("lightgray") //z-
];
class $486031900c58675e$var$Fence extends $49pUz.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white"){
        super(new $49pUz.BoxGeometry(width, height, depth), new $49pUz.MeshPhongMaterial({
            color: color
        }));
    }
}
class $486031900c58675e$var$CranckTorus extends $49pUz.Mesh {
    constructor(){
        super(new $49pUz.TorusGeometry(0.35, 0.05, 10, 20), new $49pUz.MeshPhongMaterial({
            color: "red"
        }));
    }
}
class $486031900c58675e$var$CranckCylinder extends $49pUz.Mesh {
    constructor(radTop = 0.03, radBot = 0.03, height = 0.4, radSeg = 12, HeigSeg = 12, color = "red"){
        super(new $49pUz.CylinderGeometry(radTop, radBot, height, radSeg, HeigSeg), new $49pUz.MeshPhongMaterial({
            color: color
        }));
    }
}
class $486031900c58675e$var$DoorBase extends $49pUz.Mesh {
    constructor(color = "white", width = 0.15, height = 2, depth = 0.1){
        super(new $49pUz.BoxGeometry(width, height, depth), new $49pUz.MeshLambertMaterial({
            color: color
        }));
    }
}
class $486031900c58675e$var$Door extends $49pUz.Mesh {
    constructor(color){
        super(new $49pUz.BoxGeometry(0.2, 1.9, 2), $486031900c58675e$var$cubeMaterials);
    }
}
class $486031900c58675e$var$CranckDoor extends $49pUz.Object3D {
    constructor(cranck){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        this.active = true;
        this.cranck = cranck;
        // door base
        let doorBase1 = new $486031900c58675e$var$DoorBase;
        doorBase1.rotateX(-Math.PI / 2);
        doorBase1.position.set(0.175, -0.95, 0);
        let doorBase2 = new $486031900c58675e$var$DoorBase;
        doorBase2.rotateX(-Math.PI / 2);
        doorBase2.position.set(-0.175, -0.95, 0);
        let doorBase3 = new $486031900c58675e$var$DoorBase("black", 0.2, 2, 0.01);
        doorBase3.rotateX(-Math.PI / 2);
        doorBase3.position.set(0, -0.95, 0);
        // door
        let door = new $486031900c58675e$var$Door;
        door.position.set(0, 0, 0);
        this.doorY = door.position.y;
        this.doors = [
            door
        ];
        // fences
        let doorFence1 = new $486031900c58675e$var$Fence(0.5, 2, 0.1);
        doorFence1.position.set(0, 0, -0.98);
        let doorFence2 = new $486031900c58675e$var$Fence(0.5, 2, 0.1);
        doorFence2.position.set(0, 0, 0.98);
        let doorFence3 = new $486031900c58675e$var$Fence(0.15, 2, 0.1);
        doorFence3.position.set(0.175, 0, 0.92);
        let doorFence4 = new $486031900c58675e$var$Fence(0.15, 2, 0.1);
        doorFence4.position.set(-0.175, 0, 0.92);
        let doorFence5 = new $486031900c58675e$var$Fence(0.15, 2, 0.1);
        doorFence5.position.set(0.175, 0, -0.92);
        let doorFence6 = new $486031900c58675e$var$Fence(0.15, 2, 0.1);
        doorFence6.position.set(-0.175, 0, -0.92);
        // cranck torus
        let cranckFence = new $486031900c58675e$var$Fence(0.5, 0.5, 0.05, "lightgray");
        cranckFence.position.set(-2, 0, -0.995);
        //let cranck = new Cranck;
        //this.cranck.position.set(-2, 0, -0.75)
        this.crancks = [
            this.cranck
        ];
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
    setVisible() {
        this.cranckDoors.forEach((door)=>door.visible = true);
        this.active = true;
    }
    setNotVisible() {
        this.cranckDoors.forEach((door)=>door.visible = false);
        this.active = false;
    }
    rotateCranckZ(angle) {
        this.crancks.forEach((cranck)=>cranck.rotateZ(angle));
    }
    lerpDoor(mode, height) {
        if (mode == 0) this.doors.forEach((door)=>door.position.lerp(new $49pUz.Vector3(door.position.x, height, door.position.z), 0.03));
        else this.doors.forEach((door)=>door.position.lerp(new $49pUz.Vector3(door.position.x, height, door.position.z), 0.03));
    }
    getDoorY() {
        return this.doors[0].position.y;
    }
    resetPos() {
        this.doors.forEach((door)=>door.position.y = 0);
    }
    cranckPosition(x, z) {
        this.cranck.position.x = x;
        this.cranck.position.z = z;
    }
}
var $486031900c58675e$export$2e2bcd8739ae039 = $486031900c58675e$var$CranckDoor;

});
parcelRequire.register("9JB7Y", function(module, exports) {

$parcel$export(module.exports, "default", () => $71651dcf84f1904a$export$2e2bcd8739ae039);

var $49pUz = parcelRequire("49pUz");
class $71651dcf84f1904a$var$CranckTorus extends $49pUz.Mesh {
    constructor(){
        super(new $49pUz.TorusGeometry(0.35, 0.05, 10, 20), new $49pUz.MeshPhongMaterial({
            color: "red"
        }));
    }
}
class $71651dcf84f1904a$var$CranckCylinder extends $49pUz.Mesh {
    constructor(radTop = 0.03, radBot = 0.03, height = 0.4, radSeg = 12, HeigSeg = 12, color = "red"){
        super(new $49pUz.CylinderGeometry(radTop, radBot, height, radSeg, HeigSeg), new $49pUz.MeshPhongMaterial({
            color: color
        }));
    }
}
class $71651dcf84f1904a$var$Fence extends $49pUz.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white"){
        super(new $49pUz.BoxGeometry(width, height, depth), new $49pUz.MeshPhongMaterial({
            color: color
        }));
    }
}
class $71651dcf84f1904a$var$Cranck extends $49pUz.Object3D {
    constructor(){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        this.active = true;
        // cranck torus
        let cranckTorus = new $71651dcf84f1904a$var$CranckTorus;
        cranckTorus.position.set(0, 0, 0);
        // cranck cylinders
        let CranckCylinder1 = new $71651dcf84f1904a$var$CranckCylinder;
        CranckCylinder1.position.set(0, 0.17, 0);
        let CranckCylinder2 = new $71651dcf84f1904a$var$CranckCylinder;
        CranckCylinder2.rotateZ(Math.PI / 3.5);
        CranckCylinder2.position.set(0.15, -0.12, 0);
        let CranckCylinder3 = new $71651dcf84f1904a$var$CranckCylinder;
        CranckCylinder3.rotateZ(Math.PI / -3.5);
        CranckCylinder3.position.set(-0.14, -0.11, 0);
        let CranckCylinder4 = new $71651dcf84f1904a$var$CranckCylinder(0.08, 0.08, 0.06, 12, 12, "red");
        CranckCylinder4.rotateX(Math.PI / 2);
        CranckCylinder4.position.set(0, 0, 0);
        let CranckCylinder5 = new $71651dcf84f1904a$var$CranckCylinder(0.065, 0.065, 0.061, 12, 12, "lightgray");
        CranckCylinder5.rotateX(Math.PI / 2);
        CranckCylinder5.position.set(0, 0, 0);
        let CranckCylinder6 = new $71651dcf84f1904a$var$CranckCylinder(0.045, 0.045, 0.075, 6, 12, "gray");
        CranckCylinder6.rotateX(Math.PI / 2);
        CranckCylinder6.position.set(0, 0, 0);
        let CranckCylinder7 = new $71651dcf84f1904a$var$CranckCylinder(0.02, 0.035, 0.2, 12, 12, "gray");
        CranckCylinder7.rotateX(Math.PI / 2);
        CranckCylinder7.position.set(0, 0, -0.1);
        let CranckCylinder8 = new $71651dcf84f1904a$var$CranckCylinder(0.05, 0.05, 0.07, 6, 12, "gray");
        CranckCylinder8.rotateX(Math.PI / 2);
        CranckCylinder8.position.set(0, 0, -0.2);
        let cranckFence = new $71651dcf84f1904a$var$Fence(0.5, 0.5, 0.05, "lightgray");
        cranckFence.position.set(0, 0, -0.25);
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
    correctPos(dir, reference, base) {
        if (dir == "right") {
            this.position.set(this.position.x, this.position.y, this.position.z - 0.72);
            reference.position.set(this.position.x, this.position.y, this.position.z - 2);
            base.position.set(this.position.x, this.position.y, this.position.z - 0.25);
        } else if (dir == "left") {
            this.rotateY(Math.PI);
            this.position.set(this.position.x, this.position.y, this.position.z + 0.72);
            reference.position.set(this.position.x, this.position.y, this.position.z + 1);
            base.position.set(this.position.x, this.position.y, this.position.z + 0.25);
        } else if (dir == "down") {
            this.rotateY(-Math.PI / 2);
            this.position.set(this.position.x + 0.72, this.position.y, this.position.z);
            reference.position.set(this.position.x + 1, this.position.y, this.position.z);
            base.position.set(this.position.x + 0.25, this.position.y, this.position.z);
            base.rotateY(Math.PI / 2);
        } else if (dir == "up") {
            this.rotateY(Math.PI / 2);
            this.position.set(this.position.x - 0.72, this.position.y, this.position.z);
            reference.position.set(this.position.x - 2, this.position.y, this.position.z);
            base.position.set(this.position.x - 0.25, this.position.y, this.position.z);
            base.rotateY(Math.PI / 2);
        }
    }
}
var $71651dcf84f1904a$export$2e2bcd8739ae039 = $71651dcf84f1904a$var$Cranck;

});

parcelRequire.register("6K46K", function(module, exports) {

module.exports = new URL("../" + (parcelRequire("2JpsI")).resolve("cWmqK"), import.meta.url).toString();

});


parcelRequire.register("dUbLs", function(module, exports) {

$parcel$export(module.exports, "default", () => $a1f9a1829dff046e$export$2e2bcd8739ae039);

var $49pUz = parcelRequire("49pUz");
class $a1f9a1829dff046e$var$Fence extends $49pUz.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white"){
        super(new $49pUz.BoxGeometry(width, height, depth), new $49pUz.MeshPhongMaterial({
            color: color
        }));
    }
}
class $a1f9a1829dff046e$var$CranckBase extends $49pUz.Object3D {
    constructor(){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        // cranck base
        let cranckFence = new $a1f9a1829dff046e$var$Fence(0.5, 0.5, 0.05, "lightgray");
        //cranckFence.position.set(0, 0, -0.25)
        this.add(cranckFence);
        return this;
    }
}
var $a1f9a1829dff046e$export$2e2bcd8739ae039 = $a1f9a1829dff046e$var$CranckBase;

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

parcelRequire.register("8vOEa", function(module, exports) {

$parcel$export(module.exports, "default", () => $63288163d0e35ed8$export$2e2bcd8739ae039);
const $63288163d0e35ed8$var$errorVariations = [
    [
        "C\xf3digo inv\xe1lido:",
        "linha:",
        "(Condi\xe7\xe3o inv\xe1lida)",
        "(Bloco \xe9 aberto mas nunca \xe9 fechado)",
        "(Bloco \xe9 fechado mas nunca \xe9 aberto)",
        "Aviso: O c\xf3digo tem mais linhas do que o rob\xf4 pode processar. Tente rescrever seu c\xf3digo em",
        "linhas ou menos."
    ],
    [
        "Invalid code:",
        "line:",
        "(Invalid condition)",
        "(Block is opened but never closed)",
        "(Block is closed but never opened)",
        "Warning: The code has more lines than the robot can process. Try rewriting your code in",
        "lines or less."
    ]
];
let $63288163d0e35ed8$var$langSelector = window.location.href.includes("english") ? 1 : 0;
const $63288163d0e35ed8$var$functionFilter = [
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
    },
    {
        filter: new RegExp("^enquanto(\\s+)?\\((\\s+)?.+\\)$"),
        type: "loop"
    },
    {
        filter: new RegExp("^enquanto(\\s+)?\\((\\s+)?.+\\)(\\s+)?{$"),
        type: "loop&&blockValidation"
    },
    {
        filter: new RegExp("^girarManivela(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
        type: "sequential"
    }
];
const $63288163d0e35ed8$var$conditionalParameters = [
    new RegExp("^laserAzulAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$"),
    new RegExp("^laserVermelhoAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$"),
    new RegExp("^portaFechada(\\s+)?\\((\\s+)?\\)(\\s+)?$")
];
function $63288163d0e35ed8$var$ifValidation(line) {
    let trimLine = line.trim();
    let condition = line.substring(trimLine.indexOf("(") + 1, trimLine.lastIndexOf(")"));
    for(let i = 0; i < $63288163d0e35ed8$var$conditionalParameters.length; i++){
        if ($63288163d0e35ed8$var$conditionalParameters[i].test(condition.trim())) return true;
        else continue;
    }
    return false;
}
function $63288163d0e35ed8$var$blockValidation(lines, index) {
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
function $63288163d0e35ed8$var$closeBlockValidation(lines, index) {
    let valid = false;
    for(let i = index - 1; i >= 0; i--){
        if (lines[i].includes("{")) {
            valid = true;
            break;
        } else continue;
    }
    return valid;
}
function $63288163d0e35ed8$var$mustConditionValidation(lines, index) {
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
function $63288163d0e35ed8$var$elseValidation(lines, index) {
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
function $63288163d0e35ed8$var$predictFunction(lines, index) {
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
function $63288163d0e35ed8$var$printError(text, line) {
    const consoleElement = document.getElementById("consoleArea");
    consoleElement.innerText += `${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][0]} ${text} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][1]} ${line}\n`;
}
function $63288163d0e35ed8$export$2e2bcd8739ae039(code, limit = 0) {
    let codeParsed = "const delay = (milisecs) => {return new Promise((resolve) => setTimeout(resolve,milisecs));}\nasync function runCode(){\n";
    let badLuckFunctions = "\n";
    let lines = code.split("\n");
    let valid = true;
    let totalCommands = 0;
    let nonblockcmd = false;
    for(let i = 0; i < lines.length; i++){
        let validLine = false;
        let lineType;
        if (lines[i].trim() != "") {
            for(let j = 0; j < $63288163d0e35ed8$var$functionFilter.length; j++){
                validLine = $63288163d0e35ed8$var$functionFilter[j].filter.test(lines[i].trim());
                if (validLine) {
                    lineType = $63288163d0e35ed8$var$functionFilter[j].type;
                    break;
                } else continue;
            }
            if (validLine) {
                if (lineType === "sequential") {
                    let lineParsed = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});\n`;
                    lineParsed += "await " + lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                    codeParsed += lineParsed;
                    totalCommands++;
                    nonblockcmd = false;
                } else if (lineType === "conditional&&blockValidation") {
                    let validConditional = false;
                    if ($63288163d0e35ed8$var$blockValidation(lines, i)) {
                        if ($63288163d0e35ed8$var$ifValidation(lines[i])) validConditional = true;
                        else $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][2]}`, i + 1);
                    } else $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][3]}`, i + 1);
                    if (validConditional) {
                        let line = lines[i].trim();
                        let lineParsed1 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed1 += `if${line.substring(line.indexOf("("))}\n`;
                        codeParsed += lineParsed1;
                        totalCommands++;
                    } else {
                        valid = false;
                        break;
                    }
                } else if (lineType === "conditional") {
                    if ($63288163d0e35ed8$var$ifValidation(lines[i])) {
                        let line1 = lines[i].trim();
                        let lineParsed2 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed2 += `if${line1.substring(line1.indexOf("("))}{\n`;
                        codeParsed += lineParsed2;
                        totalCommands++;
                        nonblockcmd = true;
                    } else {
                        $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][2]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "elseValidation") {
                    if ($63288163d0e35ed8$var$elseValidation(lines, i)) {
                        let lineParsed3 = "else{\n";
                        codeParsed += lineParsed3;
                        totalCommands++;
                        nonblockcmd = true;
                    } else {
                        $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][2]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "elseValidation&&blockValidation") {
                    let validElse = false;
                    if ($63288163d0e35ed8$var$blockValidation(lines, i)) {
                        if ($63288163d0e35ed8$var$elseValidation(lines, i)) validElse = true;
                        else $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][2]}`, i + 1);
                    } else $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][3]}`, i + 1);
                    if (validElse) {
                        let lineParsed4 = "else{\n";
                        codeParsed += lineParsed4;
                        totalCommands++;
                    } else {
                        valid = false;
                        break;
                    }
                } else if (lineType === "blockValidation") {
                    if ($63288163d0e35ed8$var$blockValidation(lines, i)) {
                        let lineParsed5 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed5;
                        totalCommands++;
                    } else {
                        $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][3]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "closeBlockValidation") {
                    if ($63288163d0e35ed8$var$closeBlockValidation(lines, i)) {
                        let lineParsed6 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed6;
                        totalCommands++;
                    } else {
                        $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][4]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "mustCondition") {
                    if ($63288163d0e35ed8$var$mustConditionValidation(lines, i)) {
                        let lineParsed7 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed7 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                        codeParsed += lineParsed7;
                        totalCommands++;
                        nonblockcmd = false;
                    } else {
                        let state = $63288163d0e35ed8$var$functionFilter[6].filter.test(lines[i].trim()) ? "blue" : "red";
                        let pos = $63288163d0e35ed8$var$predictFunction(lines, i);
                        badLuckFunctions += `badLuck([${pos[0]},${pos[1]}],'${state}')\n`;
                        let lineParsed8 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed8 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                        codeParsed += lineParsed8;
                        totalCommands++;
                        nonblockcmd = false;
                    }
                } else if (lineType === "loop") {
                    if ($63288163d0e35ed8$var$ifValidation(lines[i])) {
                        let line2 = lines[i].trim();
                        let lineParsed9 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed9 += `while${line2.substring(line2.indexOf("("))}{\n`;
                        lineParsed9 += `while(true){break;\n`;
                        codeParsed += lineParsed9;
                        totalCommands++;
                        nonblockcmd = true;
                    } else {
                        $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][2]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "loop&&blockValidation") {
                    let validConditional1 = false;
                    if ($63288163d0e35ed8$var$blockValidation(lines, i)) {
                        if ($63288163d0e35ed8$var$ifValidation(lines[i])) validConditional1 = true;
                        else $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][2]}`, i + 1);
                    } else $63288163d0e35ed8$var$printError(`${lines[i]} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][3]}`, i + 1);
                    if (validConditional1) {
                        let line3 = lines[i].trim();
                        let lineParsed10 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        console.log("tste");
                        let isEmpty = true;
                        for(let j1 = i; j1 < lines.length && !lines[j1].includes("}"); j1++)if (lines[j1] != "" && j1 != i) {
                            isEmpty = false;
                            break;
                        }
                        if (isEmpty) lineParsed10 += `while(true){break;`;
                        else lineParsed10 += `while${line3.substring(line3.indexOf("("))}\n`;
                        codeParsed += lineParsed10;
                        totalCommands++;
                    } else {
                        valid = false;
                        break;
                    }
                } else {
                    let lineParsed11 = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                    await delay(250);\n`;
                    lineParsed11 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                    codeParsed += lineParsed11;
                    totalCommands++;
                    nonblockcmd = false;
                }
            } else {
                $63288163d0e35ed8$var$printError(lines[i], i + 1);
                valid = false;
                break;
            }
            if (limit > 0 && totalCommands > limit) {
                document.getElementById("consoleArea").innerText += `${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][5]} ${limit} ${$63288163d0e35ed8$var$errorVariations[$63288163d0e35ed8$var$langSelector][6]}\n`;
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

parcelRequire.register("9uuME", function(module, exports) {

module.exports = new URL("../" + (parcelRequire("2JpsI")).resolve("6itYu"), import.meta.url).toString();

});


var $f513c3a1714014d3$exports = {};

(parcelRequire("2JpsI")).register(JSON.parse('{"jv3CK":"index.9af025a2.js","cWmqK":"door2.e849dc7b.jpg","6itYu":"metalWallLvl4.dd3a34a6.jpg","kJhXF":"index.bb171f7c.js","cOLmr":"index.8c12255d.js"}'));


parcelRequire("1mCsO");

