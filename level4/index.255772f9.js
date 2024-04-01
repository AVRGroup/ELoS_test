// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4O5wh":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "f4ecb70d255772f9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"c1rFl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _editor = require("../editor");
var _util = require("../three/util");
var _gridMapHelper = require("../three/GridMapHelper");
var _gridMapHelperDefault = parcelHelpers.interopDefault(_gridMapHelper);
var _cranckDoor = require("../three/CranckDoor");
var _cranckDoorDefault = parcelHelpers.interopDefault(_cranckDoor);
var _cranck = require("../three/CranckDoor/cranck");
var _cranckDefault = parcelHelpers.interopDefault(_cranck);
var _cranckBase = require("../three/CranckDoor/cranckBase");
var _cranckBaseDefault = parcelHelpers.interopDefault(_cranckBase);
var _laserFence = require("../three/LaserFence");
var _laserFenceDefault = parcelHelpers.interopDefault(_laserFence);
var _spikeTrap = require("../three/SpikeTrap");
var _smoke = require("../three/Smoke");
var _parser = require("./parser");
var _parserDefault = parcelHelpers.interopDefault(_parser);
var _timer = require("../timer");
var _bootstrap = require("bootstrap");
var _multilangcode = require("../multilangcode");
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
const logModal = new (0, _bootstrap.Modal)(document.getElementById("logModal"));
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
const editor = (0, _editor.generateDefaultEditor)(document.getElementById("editorArea"));
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
const { renderer , scene , camera , controls  } = (0, _util.generateDefaultSceneObjects)(document.getElementById("phaseView"));
const gridMapHelper = new (0, _gridMapHelperDefault.default)();
const plane = gridMapHelper.createGridPlane();
const actor = (0, _util.loadDefaultActor)();
const wallTexture = new _three.TextureLoader().load(new URL(require("7373ca1be8d3e629")).toString());
wallTexture.wrapS = _three.RepeatWrapping;
wallTexture.wrapT = _three.RepeatWrapping;
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
    const vec = new _three.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    if (gridMapHelper.detectLaser(vec, "blue") != null) return true;
    else return false;
}
function laserVermelhoAtivo() {
    const vec = new _three.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    if (gridMapHelper.detectLaser(vec, "red") != null) return true;
    else return false;
}
function desativarLaserAzul() {
    const vec = new _three.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec, "blue");
    if (laserIndex != null) changeLaserActiveStatus(laserIndex, false);
    else {
        consoleElement.innerText += textVariations[sceneProperties.lang][10];
        sceneProperties.cancelExecution = true;
    }
}
function desativarLaserVermelho() {
    const vec = new _three.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    let laserIndex = gridMapHelper.detectLaser(vec, "red");
    if (laserIndex != null) changeLaserActiveStatus(laserIndex, false);
    else {
        consoleElement.innerText += textVariations[sceneProperties.lang][11];
        sceneProperties.cancelExecution = true;
    }
}
function badLuck(position, state) {
    const vector = new _three.Vector3(gridMapHelper.getGlobalXPositionFromCoord(position[0]), 0, gridMapHelper.getGlobalZPositionFromCoord(position[1]));
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
    await (0, _util.translateActor)(actor, correctedAmount, gridMapHelper, sceneProperties, consoleElement);
}
async function andarTras(amount) {
    let correctedAmount = amount > 10 ? 10 : amount;
    await (0, _util.translateActor)(actor, -correctedAmount, gridMapHelper, sceneProperties, consoleElement);
}
async function girarEsquerda() {
    await (0, _util.rotateActor)(actor, 90, sceneProperties, 1);
}
async function girarDireita() {
    await (0, _util.rotateActor)(actor, 90, sceneProperties, -1);
}
async function darMeiaVolta() {
    await (0, _util.rotateActor)(actor, 180, sceneProperties, 1);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
    openDoors = [];
    doors = [];
    cranckBases = [];
    crancks = [];
    cranckInteractionReferences = [];
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    cranckInteractionReferences.push(new _three.Object3D());
    crancks[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    crancks[0].correctPos("right", cranckInteractionReferences[0], cranckBases[0]);
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(5, 5, 5, 5);
    scene.add(crancks[0]);
    scene.add(cranckBases[0]);
    scene.add(doors[0]);
    openDoors.push(false);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(18, 2, 2);
    const boxMaterial = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial[2].map.repeat.set(9, 1);
    boxMaterial[3].map.repeat.set(9, 1);
    boxMaterial[4].map.repeat.set(9, 1);
    boxMaterial[5].map.repeat.set(9, 1);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    scene.add(walls[0]);
    scene.add(walls[1]);
    gridMapHelper.addObstacle(1, 9, 4, 4);
    gridMapHelper.addObstacle(1, 9, 6, 6);
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("blue"));
    //laserFences.push(new LaserFence("blue"));
    //laserFences.push(new LaserFence("red"));
    laserFences.push(new (0, _laserFenceDefault.default)("red"));
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addTrap(0, 7, traps[0]);
    gridMapHelper.addTrap(0, 2, traps[1]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(6, 2, 2);
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(8, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(4, 2, 2);
    const boxMaterial = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial[2].map.repeat.set(3, 1);
    boxMaterial[3].map.repeat.set(3, 1);
    boxMaterial[4].map.repeat.set(3, 1);
    boxMaterial[5].map.repeat.set(3, 1);
    const boxMaterial1 = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(4, 1);
    boxMaterial2[3].map.repeat.set(4, 1);
    boxMaterial2[4].map.repeat.set(4, 1);
    boxMaterial2[5].map.repeat.set(4, 1);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(2, 1);
    boxMaterial3[3].map.repeat.set(2, 1);
    boxMaterial3[4].map.repeat.set(2, 1);
    boxMaterial3[5].map.repeat.set(2, 1);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial1));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial1));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial1));
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
    const doorInteractionReference = new _three.Object3D();
    doorInteractionReference.position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    portaFechada = ()=>{
        if (sceneProperties.cancelExecution) return false;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
        if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
        else (0, _spikeTrap.trapsActivation)(traps);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[2]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("blue"));
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(6, 2, 2);
    const boxGeometry4 = new _three.BoxGeometry(8, 2, 2);
    const boxGeometry5 = new _three.BoxGeometry(10, 2, 2);
    const boxGeometry6 = new _three.BoxGeometry(12, 2, 2);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(3, 1);
    boxMaterial3[3].map.repeat.set(3, 1);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    const boxMaterial4 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[2].map.repeat.set(4, 1);
    boxMaterial4[3].map.repeat.set(4, 1);
    boxMaterial4[4].map.repeat.set(4, 1);
    boxMaterial4[5].map.repeat.set(4, 1);
    const boxMaterial6 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial6[2].map.repeat.set(6, 1);
    boxMaterial6[3].map.repeat.set(6, 1);
    boxMaterial6[4].map.repeat.set(6, 1);
    boxMaterial6[5].map.repeat.set(6, 1);
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry6, boxMaterial6));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
        if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
        else (0, _spikeTrap.trapsActivation)(traps);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[2]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("red"));
    //laserFences.push(new LaserFence("multiColor"));
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 4);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new _three.BoxGeometry(8, 2, 2);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[0].map.repeat.set(2, 1);
    boxMaterial2[1].map.repeat.set(2, 1);
    boxMaterial2[2].map.rotation = (0, _util.degreeToRadians)(90);
    boxMaterial2[3].map.rotation = (0, _util.degreeToRadians)(90);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[0].map.repeat.set(3, 1);
    boxMaterial3[1].map.repeat.set(3, 1);
    boxMaterial3[2].map.rotation = (0, _util.degreeToRadians)(90);
    boxMaterial3[3].map.rotation = (0, _util.degreeToRadians)(90);
    const boxMaterial4 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[2].map.repeat.set(4, 1);
    boxMaterial4[3].map.repeat.set(4, 1);
    boxMaterial4[4].map.repeat.set(4, 1);
    boxMaterial4[5].map.repeat.set(4, 1);
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
        if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
        else (0, _spikeTrap.trapsActivation)(traps);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(3);
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    //crancks.push(new Cranck());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    //cranckBases.push(new CranckBase());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[2]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("blue"));
    //laserFences.push(new LaserFence("blue"));
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(6, 2, 6);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[0].map.repeat.set(3, 1);
    boxMaterial3[1].map.repeat.set(3, 1);
    boxMaterial3[2].map.repeat.set(3, 3);
    boxMaterial3[3].map.repeat.set(3, 3);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[2].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
        if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
        else (0, _spikeTrap.trapsActivation)(traps);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    //crancks.push(new Cranck());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    //cranckBases.push(new CranckBase());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[2]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("blue"));
    //laserFences.push(new LaserFence("red"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences.push(new LaserFence("multiColor"));
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new _three.BoxGeometry(2, 2, 4);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[0].map.repeat.set(3, 1);
    boxMaterial3[1].map.repeat.set(3, 1);
    boxMaterial3[2].map.rotation = (0, _util.degreeToRadians)(90);
    boxMaterial3[3].map.rotation = (0, _util.degreeToRadians)(90);
    const boxMaterial4 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[0].map.repeat.set(2, 1);
    boxMaterial4[1].map.repeat.set(2, 1);
    boxMaterial4[2].map.rotation = (0, _util.degreeToRadians)(90);
    boxMaterial4[3].map.rotation = (0, _util.degreeToRadians)(90);
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[2].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[3].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
        if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
        else (0, _spikeTrap.trapsActivation)(traps);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(4);
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[2]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[3]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
    laserFences.push(new (0, _laserFenceDefault.default)("blue"));
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
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(6, 2, 2);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(3, 1);
    boxMaterial3[3].map.repeat.set(3, 1);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[3], gridMapHelper)) return !openDoors[3];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[5].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[2].getDoorY().toFixed(1) == -2) {
                    openDoors[2] = true;
                    gridMapHelper.obstacles[6].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[3], gridMapHelper)) {
                function translateDoor() {
                    doors[3].lerpDoor(0, -2);
                    doors[3].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[2].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[3], gridMapHelper)) {
            objectives[3].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[3].active = false;
        } else {
            consoleElement.innerText += textVariations[sceneProperties.lang][3];
            if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
        }
        resetLevel = ()=>{
            actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
            actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
            if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
            else (0, _spikeTrap.trapsActivation)(traps);
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
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(4);
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    crancks.push(new (0, _cranckDefault.default)());
    //crancks.push(new Cranck());
    //crancks.push(new Cranck());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    cranckBases.push(new (0, _cranckBaseDefault.default)());
    //cranckBases.push(new CranckBase());
    //cranckBases.push(new CranckBase());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    cranckInteractionReferences.push(new _three.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    //cranckInteractionReferences.push(new THREE.Object3D());
    doors.push(new (0, _cranckDoorDefault.default)(crancks[0]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[1]));
    doors.push(new (0, _cranckDoorDefault.default)(crancks[2]));
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
    laserFences.push(new (0, _laserFenceDefault.default)("multiColor"));
    laserFences.push(new (0, _laserFenceDefault.default)("red"));
    //laserFences.push(new LaserFence("multiColor"));
    //laserFences.push(new LaserFence("red"));
    laserFences.push(new (0, _laserFenceDefault.default)("blue"));
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
    const boxGeometry1 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(6, 2, 2);
    const boxGeometry4 = new _three.BoxGeometry(8, 2, 2);
    const boxGeometry5 = new _three.BoxGeometry(10, 2, 2);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
    const boxMaterial2 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial2[2].map.repeat.set(2, 1);
    boxMaterial2[3].map.repeat.set(2, 1);
    boxMaterial2[4].map.repeat.set(2, 1);
    boxMaterial2[5].map.repeat.set(2, 1);
    const boxMaterial3 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial3[2].map.repeat.set(3, 1);
    boxMaterial3[3].map.repeat.set(3, 1);
    boxMaterial3[4].map.repeat.set(3, 1);
    boxMaterial3[5].map.repeat.set(3, 1);
    const boxMaterial4 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial4[2].map.repeat.set(4, 1);
    boxMaterial4[3].map.repeat.set(4, 1);
    boxMaterial4[4].map.repeat.set(4, 1);
    boxMaterial4[5].map.repeat.set(4, 1);
    const boxMaterial5 = [
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        }),
        new _three.MeshLambertMaterial({
            map: wallTexture.clone()
        })
    ];
    boxMaterial5[2].map.repeat.set(5, 1);
    boxMaterial5[3].map.repeat.set(5, 1);
    boxMaterial5[4].map.repeat.set(5, 1);
    boxMaterial5[5].map.repeat.set(5, 1);
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry5, boxMaterial5));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) return !openDoors[0];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) return !openDoors[1];
        else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) return !openDoors[2];
        else {
            consoleElement.innerText += textVariations[sceneProperties.lang][13];
            return false;
        }
    };
    girarManivela = ()=>{
        return new Promise((resolve)=>{
            if (sceneProperties.cancelExecution) resolve();
            if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[0], gridMapHelper)) {
                function translateDoor() {
                    doors[0].lerpDoor(0, -2);
                    doors[0].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[0].getDoorY().toFixed(1) == -2) {
                    openDoors[0] = true;
                    gridMapHelper.obstacles[4].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[1], gridMapHelper)) {
                function translateDoor() {
                    doors[1].lerpDoor(0, -2);
                    doors[1].rotateCranckZ((0, _util.degreeToRadians)(-5));
                    resolve();
                }
                if (doors[1].getDoorY().toFixed(1) == -2) {
                    openDoors[1] = true;
                    gridMapHelper.obstacles[5].active = false;
                    resolve();
                } else requestAnimationFrame(translateDoor);
            } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), cranckInteractionReferences[2], gridMapHelper)) {
                function translateDoor() {
                    doors[2].lerpDoor(0, -2);
                    doors[2].rotateCranckZ((0, _util.degreeToRadians)(-5));
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
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[2].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[3], gridMapHelper)) {
            objectives[3].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][5];
            gridMapHelper.obstacles[3].active = false;
        } else consoleElement.innerText += textVariations[sceneProperties.lang][3];
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible && !objectives[3].visible) consoleElement.innerText += textVariations[sceneProperties.lang][6];
    };
    resetLevel = ()=>{
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
        if (spikeTrapState == 0) (0, _spikeTrap.trapsDeactivation)(traps);
        else (0, _spikeTrap.trapsActivation)(traps);
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
    (0, _timer.displayTime)(sceneProperties.timer, document.getElementById("timer"));
}
window.addEventListener("resize", ()=>{
    (0, _util.resizeCanvasToDisplaySize)(renderer, camera);
});
const finishEarlierButton = document.getElementById("finishEarlier");
const execBtn = document.getElementById("execBtn");
execBtn.addEventListener("click", async function() {
    const codeParsed = (0, _parserDefault.default)((0, _multilangcode.convertCode)(sceneProperties.lang, editor.state.doc.toString()));
    console.log(codeParsed);
    cancelAnimationFrame((0, _util.corrID));
    cancelAnimationFrame((0, _util.requestID));
    cancelAnimationFrame((0, _util.changColorID));
    cancelAnimationFrame((0, _util.smokeAnimationFrame));
    (0, _util.smoke).deactiveSmokes();
    sceneProperties.cancelExecution = false;
    actor.getObjectByName("eve").position.y = 0;
    if (traps != null) (0, _spikeTrap.trapsDeactivation)(traps);
    if (codeParsed != null) {
        (0, _editor.updateTheme)(editor, 1);
        resetLevel();
        this.disabled = true;
        sceneProperties.executing = true;
        await eval(codeParsed);
        if (winCondition()) {
            (0, _editor.readOnlyState).doc = editor.state.doc;
            editor.setState((0, _editor.readOnlyState));
            document.getElementById("winMessage").classList.remove("invisible");
            document.getElementById("advanceBtn").classList.remove("invisible");
            document.getElementById("resetBtn").disabled = true;
            finishEarlierButton.disabled = true;
            clearInterval(timerUpadate);
            if (sceneProperties.phase == phaseGeneration.length - 1) (0, _timer.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", "N\xedvel 4/Completo", document.getElementById("second-user"));
        } else {
            (0, _editor.updateTheme)(editor, 0);
            sceneProperties.executing = false;
            this.disabled = false;
        }
    }
});
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", ()=>{
    cancelAnimationFrame((0, _util.corrID));
    cancelAnimationFrame((0, _util.requestID));
    cancelAnimationFrame((0, _util.changColorID));
    cancelAnimationFrame((0, _util.smokeAnimationFrame));
    (0, _util.smoke).deactiveSmokes();
    (0, _editor.updateTheme)(editor, 0);
    sceneProperties.cancelExecution = true;
    actor.getObjectByName("eve").position.y = 0;
    if ((0, _util.materialColor).length != 0) (0, _util.resetRobotColor)(actor);
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
        editor.setState((0, _editor.editState));
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
        editor.setState((0, _editor.editState));
        consoleElement.innerText = null;
        execBtn.disabled = false;
        resetBtn.disabled = false;
        finishEarlierButton.disabled = false;
    } else sceneProperties.phase = sceneProperties.phase > phaseGeneration.length ? phaseGeneration.length : sceneProperties.phase;
});
finishEarlierButton.addEventListener("click", (e)=>{
    if (confirm(textVariations[sceneProperties.lang][9])) {
        clearInterval(timerUpadate);
        (0, _timer.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", `Nível 4/Fase ${sceneProperties.phase + 1}`, document.getElementById("second-user"));
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
(0, _util.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
animate();

},{"three":"3XrwE","../editor":"l6wfL","../three/util":"fiv5b","../three/GridMapHelper":"1niVU","../three/CranckDoor":"9ZMeo","../three/CranckDoor/cranck":"JDM9K","../three/CranckDoor/cranckBase":"ivPoA","../three/LaserFence":"jGUvy","../three/SpikeTrap":"eDrLo","../three/Smoke":"lrVPR","./parser":"gVuzm","../timer":"iJc7h","bootstrap":"10mMR","../multilangcode":"jHYlP","7373ca1be8d3e629":"iBZ2R","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"9ZMeo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _three = require("three");
var _cranck = require("./cranck");
let loader = new _three.TextureLoader();
// Function to set basic material or textures
// You can set just a color, just a texture or both
function setMaterial(color, file = null, repeatU = 1, repeatV = 1) {
    if (!color) color = "rgb(255,255,255)";
    let mat;
    if (!file) mat = new _three.MeshBasicMaterial({
        color: color
    });
    else {
        mat = new _three.MeshBasicMaterial({
            map: loader.load(file),
            color: color
        });
        mat.map.wrapS = mat.map.wrapT = _three.RepeatWrapping;
        mat.map.minFilter = mat.map.magFilter = _three.LinearFilter;
        mat.map.repeat.set(repeatU, repeatV);
    }
    return mat;
}
const stonePath = new URL(require("d4f90dfdc59b4fdb")).toString();
let cubeMaterials = [
    setMaterial("lightgray", stonePath),
    setMaterial("lightgray", stonePath),
    setMaterial("gray"),
    setMaterial("lightgray"),
    setMaterial("lightgray"),
    setMaterial("lightgray") //z-
];
class Fence extends _three.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white"){
        super(new _three.BoxGeometry(width, height, depth), new _three.MeshPhongMaterial({
            color: color
        }));
    }
}
class CranckTorus extends _three.Mesh {
    constructor(){
        super(new _three.TorusGeometry(0.35, 0.05, 10, 20), new _three.MeshPhongMaterial({
            color: "red"
        }));
    }
}
class CranckCylinder extends _three.Mesh {
    constructor(radTop = 0.03, radBot = 0.03, height = 0.4, radSeg = 12, HeigSeg = 12, color = "red"){
        super(new _three.CylinderGeometry(radTop, radBot, height, radSeg, HeigSeg), new _three.MeshPhongMaterial({
            color: color
        }));
    }
}
class DoorBase extends _three.Mesh {
    constructor(color = "white", width = 0.15, height = 2, depth = 0.1){
        super(new _three.BoxGeometry(width, height, depth), new _three.MeshLambertMaterial({
            color: color
        }));
    }
}
class Door extends _three.Mesh {
    constructor(color){
        super(new _three.BoxGeometry(0.2, 1.9, 2), cubeMaterials);
    }
}
class CranckDoor extends _three.Object3D {
    constructor(cranck){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        this.active = true;
        this.cranck = cranck;
        // door base
        let doorBase1 = new DoorBase;
        doorBase1.rotateX(-Math.PI / 2);
        doorBase1.position.set(0.175, -0.95, 0);
        let doorBase2 = new DoorBase;
        doorBase2.rotateX(-Math.PI / 2);
        doorBase2.position.set(-0.175, -0.95, 0);
        let doorBase3 = new DoorBase("black", 0.2, 2, 0.01);
        doorBase3.rotateX(-Math.PI / 2);
        doorBase3.position.set(0, -0.95, 0);
        // door
        let door = new Door;
        door.position.set(0, 0, 0);
        this.doorY = door.position.y;
        this.doors = [
            door
        ];
        // fences
        let doorFence1 = new Fence(0.5, 2, 0.1);
        doorFence1.position.set(0, 0, -0.98);
        let doorFence2 = new Fence(0.5, 2, 0.1);
        doorFence2.position.set(0, 0, 0.98);
        let doorFence3 = new Fence(0.15, 2, 0.1);
        doorFence3.position.set(0.175, 0, 0.92);
        let doorFence4 = new Fence(0.15, 2, 0.1);
        doorFence4.position.set(-0.175, 0, 0.92);
        let doorFence5 = new Fence(0.15, 2, 0.1);
        doorFence5.position.set(0.175, 0, -0.92);
        let doorFence6 = new Fence(0.15, 2, 0.1);
        doorFence6.position.set(-0.175, 0, -0.92);
        // cranck torus
        let cranckFence = new Fence(0.5, 0.5, 0.05, "lightgray");
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
        if (mode == 0) this.doors.forEach((door)=>door.position.lerp(new _three.Vector3(door.position.x, height, door.position.z), 0.03));
        else this.doors.forEach((door)=>door.position.lerp(new _three.Vector3(door.position.x, height, door.position.z), 0.03));
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
exports.default = CranckDoor;

},{"three":"3XrwE","./cranck":"JDM9K","d4f90dfdc59b4fdb":"4dqGk","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"JDM9K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _three = require("three");
class CranckTorus extends _three.Mesh {
    constructor(){
        super(new _three.TorusGeometry(0.35, 0.05, 10, 20), new _three.MeshPhongMaterial({
            color: "red"
        }));
    }
}
class CranckCylinder extends _three.Mesh {
    constructor(radTop = 0.03, radBot = 0.03, height = 0.4, radSeg = 12, HeigSeg = 12, color = "red"){
        super(new _three.CylinderGeometry(radTop, radBot, height, radSeg, HeigSeg), new _three.MeshPhongMaterial({
            color: color
        }));
    }
}
class Fence extends _three.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white"){
        super(new _three.BoxGeometry(width, height, depth), new _three.MeshPhongMaterial({
            color: color
        }));
    }
}
class Cranck extends _three.Object3D {
    constructor(){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        this.active = true;
        // cranck torus
        let cranckTorus = new CranckTorus;
        cranckTorus.position.set(0, 0, 0);
        // cranck cylinders
        let CranckCylinder1 = new CranckCylinder;
        CranckCylinder1.position.set(0, 0.17, 0);
        let CranckCylinder2 = new CranckCylinder;
        CranckCylinder2.rotateZ(Math.PI / 3.5);
        CranckCylinder2.position.set(0.15, -0.12, 0);
        let CranckCylinder3 = new CranckCylinder;
        CranckCylinder3.rotateZ(Math.PI / -3.5);
        CranckCylinder3.position.set(-0.14, -0.11, 0);
        let CranckCylinder4 = new CranckCylinder(0.08, 0.08, 0.06, 12, 12, "red");
        CranckCylinder4.rotateX(Math.PI / 2);
        CranckCylinder4.position.set(0, 0, 0);
        let CranckCylinder5 = new CranckCylinder(0.065, 0.065, 0.061, 12, 12, "lightgray");
        CranckCylinder5.rotateX(Math.PI / 2);
        CranckCylinder5.position.set(0, 0, 0);
        let CranckCylinder6 = new CranckCylinder(0.045, 0.045, 0.075, 6, 12, "gray");
        CranckCylinder6.rotateX(Math.PI / 2);
        CranckCylinder6.position.set(0, 0, 0);
        let CranckCylinder7 = new CranckCylinder(0.02, 0.035, 0.2, 12, 12, "gray");
        CranckCylinder7.rotateX(Math.PI / 2);
        CranckCylinder7.position.set(0, 0, -0.1);
        let CranckCylinder8 = new CranckCylinder(0.05, 0.05, 0.07, 6, 12, "gray");
        CranckCylinder8.rotateX(Math.PI / 2);
        CranckCylinder8.position.set(0, 0, -0.2);
        let cranckFence = new Fence(0.5, 0.5, 0.05, "lightgray");
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
exports.default = Cranck;

},{"three":"3XrwE","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"4dqGk":[function(require,module,exports) {
module.exports = require("ef4acdd2a7deba14").getBundleURL("l1J9r") + "../door2.3ff487ff.jpg" + "?" + Date.now();

},{"ef4acdd2a7deba14":"hPpBg"}],"ivPoA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _three = require("three");
class Fence extends _three.Mesh {
    constructor(width = 0.5, height = 2, depth = 0.15, color = "white"){
        super(new _three.BoxGeometry(width, height, depth), new _three.MeshPhongMaterial({
            color: color
        }));
    }
}
class CranckBase extends _three.Object3D {
    constructor(){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        // cranck base
        let cranckFence = new Fence(0.5, 0.5, 0.05, "lightgray");
        //cranckFence.position.set(0, 0, -0.25)
        this.add(cranckFence);
        return this;
    }
}
exports.default = CranckBase;

},{"three":"3XrwE","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"jGUvy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _three = require("three");
var _csgmesh = require("../FireBase/CSGMesh");
class Fence extends _three.Mesh {
    constructor(){
        super(new _three.BoxGeometry(0.5, 2, 0.15), new _three.MeshPhongMaterial({
            color: "white"
        }));
    }
}
class FenceTorus extends _three.Mesh {
    constructor(){
        super(new _three.TorusGeometry(0.15, 0.05, 10, 20), new _three.MeshPhongMaterial({
            color: "black"
        }));
    }
}
class FenceBase extends _three.Mesh {
    constructor(){
        super(new _three.BoxGeometry(0.5, 2, 0.1), new _three.MeshPhongMaterial({
            color: "white"
        }));
    }
}
class Laser extends _three.Mesh {
    constructor(color){
        super(new _three.CylinderGeometry(0.1, 0.1, 2, 64, 64), new _three.MeshPhongMaterial({
            emissive: color,
            color: color,
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.7
        }));
    }
}
class LaserFence extends _three.Object3D {
    constructor(type){
        super();
        this.index = 0;
        this.x = 0;
        this.z = 0;
        this.state = type;
        this.active = true;
        this.type = type;
        // fence base
        let fenceBase = new FenceBase;
        fenceBase.rotateX(-Math.PI / 2);
        fenceBase.position.set(0, -0.95, 0);
        // fences
        let laserFence1 = new Fence;
        laserFence1.position.set(0, 0, -0.93);
        let laserFence2 = new Fence;
        laserFence2.position.set(0, 0, 0.93);
        // fence torus
        let fenceTorus1A = new FenceTorus;
        fenceTorus1A.position.set(0, 0.6, 0.85);
        let fenceTorus1B = new FenceTorus;
        fenceTorus1B.position.set(0, 0.6, -0.85);
        let fenceTorus2A = new FenceTorus;
        fenceTorus2A.position.set(0, 0, 0.85);
        let fenceTorus2B = new FenceTorus;
        fenceTorus2B.position.set(0, 0, -0.85);
        let fenceTorus3A = new FenceTorus;
        fenceTorus3A.position.set(0, -0.6, 0.85);
        let fenceTorus3B = new FenceTorus;
        fenceTorus3B.position.set(0, -0.6, -0.85);
        // blue lasers
        let laserBlue1 = new Laser("blue");
        laserBlue1.rotateX(-Math.PI / 2);
        laserBlue1.position.set(0, 0.6, 0);
        let laserBlue2 = new Laser("blue");
        laserBlue2.rotateX(-Math.PI / 2);
        laserBlue2.position.set(0, 0, 0);
        let laserBlue3 = new Laser("blue");
        laserBlue3.rotateX(-Math.PI / 2);
        laserBlue3.position.set(0, -0.6, 0);
        this.blueLasers = [
            laserBlue1,
            laserBlue2,
            laserBlue3
        ];
        // red lasers
        let laserRed1 = new Laser("red");
        laserRed1.rotateX(-Math.PI / 2);
        laserRed1.position.set(0, 0.6, 0);
        let laserRed2 = new Laser("red");
        laserRed2.rotateX(-Math.PI / 2);
        laserRed2.position.set(0, 0, 0);
        let laserRed3 = new Laser("red");
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
exports.default = LaserFence;

},{"three":"3XrwE","../FireBase/CSGMesh":"g1O9j","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"gVuzm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const errorVariations = [
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
let langSelector = window.location.href.includes("english") ? 1 : 0;
const functionFilter = [
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
const conditionalParameters = [
    new RegExp("^laserAzulAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$"),
    new RegExp("^laserVermelhoAtivo(\\s+)?\\((\\s+)?\\)(\\s+)?$"),
    new RegExp("^portaFechada(\\s+)?\\((\\s+)?\\)(\\s+)?$")
];
function ifValidation(line) {
    let trimLine = line.trim();
    let condition = line.substring(trimLine.indexOf("(") + 1, trimLine.lastIndexOf(")"));
    for(let i = 0; i < conditionalParameters.length; i++){
        if (conditionalParameters[i].test(condition.trim())) return true;
        else continue;
    }
    return false;
}
function blockValidation(lines, index) {
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
function closeBlockValidation(lines, index) {
    let valid = false;
    for(let i = index - 1; i >= 0; i--){
        if (lines[i].includes("{")) {
            valid = true;
            break;
        } else continue;
    }
    return valid;
}
function mustConditionValidation(lines, index) {
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
function elseValidation(lines, index) {
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
function predictFunction(lines, index) {
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
function printError(text, line) {
    const consoleElement = document.getElementById("consoleArea");
    consoleElement.innerText += `${errorVariations[langSelector][0]} ${text} ${errorVariations[langSelector][1]} ${line}\n`;
}
function parseCode(code, limit = 0) {
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
            for(let j = 0; j < functionFilter.length; j++){
                validLine = functionFilter[j].filter.test(lines[i].trim());
                if (validLine) {
                    lineType = functionFilter[j].type;
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
                    if (blockValidation(lines, i)) {
                        if (ifValidation(lines[i])) validConditional = true;
                        else printError(`${lines[i]} ${errorVariations[langSelector][2]}`, i + 1);
                    } else printError(`${lines[i]} ${errorVariations[langSelector][3]}`, i + 1);
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
                    if (ifValidation(lines[i])) {
                        let line1 = lines[i].trim();
                        let lineParsed2 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed2 += `if${line1.substring(line1.indexOf("("))}{\n`;
                        codeParsed += lineParsed2;
                        totalCommands++;
                        nonblockcmd = true;
                    } else {
                        printError(`${lines[i]} ${errorVariations[langSelector][2]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "elseValidation") {
                    if (elseValidation(lines, i)) {
                        let lineParsed3 = "else{\n";
                        codeParsed += lineParsed3;
                        totalCommands++;
                        nonblockcmd = true;
                    } else {
                        printError(`${lines[i]} ${errorVariations[langSelector][2]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "elseValidation&&blockValidation") {
                    let validElse = false;
                    if (blockValidation(lines, i)) {
                        if (elseValidation(lines, i)) validElse = true;
                        else printError(`${lines[i]} ${errorVariations[langSelector][2]}`, i + 1);
                    } else printError(`${lines[i]} ${errorVariations[langSelector][3]}`, i + 1);
                    if (validElse) {
                        let lineParsed4 = "else{\n";
                        codeParsed += lineParsed4;
                        totalCommands++;
                    } else {
                        valid = false;
                        break;
                    }
                } else if (lineType === "blockValidation") {
                    if (blockValidation(lines, i)) {
                        let lineParsed5 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed5;
                        totalCommands++;
                    } else {
                        printError(`${lines[i]} ${errorVariations[langSelector][3]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "closeBlockValidation") {
                    if (closeBlockValidation(lines, i)) {
                        let lineParsed6 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed6;
                        totalCommands++;
                    } else {
                        printError(`${lines[i]} ${errorVariations[langSelector][4]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "mustCondition") {
                    if (mustConditionValidation(lines, i)) {
                        let lineParsed7 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed7 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                        codeParsed += lineParsed7;
                        totalCommands++;
                        nonblockcmd = false;
                    } else {
                        let state = functionFilter[6].filter.test(lines[i].trim()) ? "blue" : "red";
                        let pos = predictFunction(lines, i);
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
                    if (ifValidation(lines[i])) {
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
                        printError(`${lines[i]} ${errorVariations[langSelector][2]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "loop&&blockValidation") {
                    let validConditional1 = false;
                    if (blockValidation(lines, i)) {
                        if (ifValidation(lines[i])) validConditional1 = true;
                        else printError(`${lines[i]} ${errorVariations[langSelector][2]}`, i + 1);
                    } else printError(`${lines[i]} ${errorVariations[langSelector][3]}`, i + 1);
                    if (validConditional1) {
                        let line3 = lines[i].trim();
                        let lineParsed10 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        console.log("tste");
                        isEmpty = true;
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
                printError(lines[i], i + 1);
                valid = false;
                break;
            }
            if (limit > 0 && totalCommands > limit) {
                document.getElementById("consoleArea").innerText += `${errorVariations[langSelector][5]} ${limit} ${errorVariations[langSelector][6]}\n`;
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
exports.default = parseCode;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"iBZ2R":[function(require,module,exports) {
module.exports = require("46b9cd72d05db2d0").getBundleURL("l1J9r") + "../metalWallLvl4.cc707688.jpg" + "?" + Date.now();

},{"46b9cd72d05db2d0":"hPpBg"}]},["4O5wh","c1rFl"], "c1rFl", "parcelRequiredf3e")

