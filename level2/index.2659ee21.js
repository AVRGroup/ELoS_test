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
})({"87XUX":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "7528287b2659ee21";
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

},{}],"eo4tS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _editor = require("../editor");
var _util = require("../three/util");
var _gridMapHelper = require("../three/GridMapHelper");
var _gridMapHelperDefault = parcelHelpers.interopDefault(_gridMapHelper);
var _fireBase = require("../three/FireBase");
var _fireBaseDefault = parcelHelpers.interopDefault(_fireBase);
var _spikeTrap = require("../three/SpikeTrap");
var _parser = require("./parser");
var _parserDefault = parcelHelpers.interopDefault(_parser);
var _timer = require("../timer");
var _bootstrap = require("bootstrap");
var _multilangcode = require("../multilangcode");
//Defining Level 2 Scene's Properties
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
            return `Level 2 - Round ${sceneProperties.phase + 1} of 8`;
        default:
            return `Nível 2 - Fase ${sceneProperties.phase + 1} de 8`;
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
        "Aviso: Rob\xf4 est\xe1 sem extintores!\n"
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
        "Warining: Robot is out of fire extinguishers!\n"
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
        "apagarFogo()\n",
        "pegandoFogo()",
        "se(?){\n\n}\n"
    ],
    [
        "moveForward(?)\n",
        "moveBackwards(?)\n",
        "rotateLeft()\n",
        "rotateRight()\n",
        "turnBack()",
        "collectCrystal()\n",
        "extinguishFire()\n",
        "isOnFire()",
        "if(?){\n\n}\n"
    ]
];
const logModal = new (0, _bootstrap.Modal)(document.getElementById("logModal"));
let timerUpadate;
function updateTime() {
    sceneProperties.timer++;
}
let extinguisherUses;
function displayExtinguisherUses() {
    document.getElementById("extinguisherUses").innerText = `x${extinguisherUses}`;
}
let fireState;
let setFireStates;
let setFireStatesInterval;
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
const apagarFogoBtn = document.getElementById("apagarFogo");
apagarFogoBtn.addEventListener("click", ()=>{
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
const pegandoFogoBtn = document.getElementById("pegandoFogo");
pegandoFogoBtn.addEventListener("click", ()=>{
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
const consoleElement = document.getElementById("consoleArea");
const { renderer , scene , camera , controls  } = (0, _util.generateDefaultSceneObjects)(document.getElementById("phaseView"));
const gridMapHelper = new (0, _gridMapHelperDefault.default)();
const plane = gridMapHelper.createGridPlane();
const actor = (0, _util.loadDefaultActor)();
const wallTexture = new _three.TextureLoader().load(new URL(require("43a85bc06c5241e4")).toString());
wallTexture.wrapS = _three.RepeatWrapping;
wallTexture.wrapT = _three.RepeatWrapping;
let objectives;
let walls;
let traps;
const fireClock = new _three.Clock();
let fires;
function changeFireActiveStatus(index, status) {
    gridMapHelper.fires[index].active = status;
    fires[index].setFireVisibility(status);
}
function firesVisualRestart() {
    for(let i = 0; i < fires.length; i++)fires[i].setFireVisibility(true);
}
scene.add(plane);
scene.add(actor);
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
function pegandoFogo() {
    const vec = new _three.Vector3();
    actor.getObjectByName("interactionReference").getWorldPosition(vec);
    if (gridMapHelper.detectFire(vec) != null) return true;
    else return false;
}
function apagarFogo() {
    if (extinguisherUses > 0) {
        const vec = new _three.Vector3();
        actor.getObjectByName("interactionReference").getWorldPosition(vec);
        let fireIndex = gridMapHelper.detectFire(vec);
        if (fireIndex != null) changeFireActiveStatus(fireIndex, false);
        extinguisherUses--;
        displayExtinguisherUses();
    } else consoleElement.innerText += textVariations[sceneProperties.lang][10];
}
function badLuck(position) {
    const vector = new _three.Vector3(gridMapHelper.getGlobalXPositionFromCoord(position[0]), 0, gridMapHelper.getGlobalZPositionFromCoord(position[1]));
    let fireIndex = gridMapHelper.detectFire(vector, false);
    if (fireIndex != null) changeFireActiveStatus(fireIndex, true);
}
let coletarCristal;
let resetLevel;
let winCondition;
const phaseGeneration = [];
//Functions to create the phases
//Phase 1
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][1];
    extinguisherUses = 1;
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
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
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addFire(7, 5);
    scene.add(fires[0]);
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.restartFires();
        fires[0].setFireVisibility(true);
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 2
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][1];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(14, 2, 2);
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
    boxMaterial[2].map.repeat.set(7, 1);
    boxMaterial[3].map.repeat.set(7, 1);
    boxMaterial[4].map.repeat.set(7, 1);
    boxMaterial[5].map.repeat.set(7, 1);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addObstacle(2, 8, 2, 2);
    gridMapHelper.addObstacle(2, 8, 4, 4);
    gridMapHelper.addObstacle(2, 8, 6, 6);
    gridMapHelper.addObstacle(2, 8, 8, 8);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(6));
    gridMapHelper.addFire(3, 3);
    gridMapHelper.addFire(6, 3);
    gridMapHelper.addFire(3, 7);
    gridMapHelper.addFire(6, 7);
    gridMapHelper.addFire(9, 6);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(0, false);
            changeFireActiveStatus(3, false);
            changeFireActiveStatus(1, true);
            changeFireActiveStatus(4, true);
        } else {
            changeFireActiveStatus(0, true);
            changeFireActiveStatus(3, true);
            changeFireActiveStatus(1, false);
            changeFireActiveStatus(4, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    scene.add(fires[2]);
    scene.add(fires[3]);
    scene.add(fires[4]);
    traps = [];
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(2));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addTrap(9, 2, traps[0]);
    gridMapHelper.addTrap(8, 5, traps[1]);
    gridMapHelper.addTrap(9, 8, traps[2]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
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
//Phase 3
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    gridMapHelper.addObstacle(0, 0, 0, 0);
    gridMapHelper.addObstacle(9, 9, 9, 9);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(12, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 14);
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
    boxMaterial[2].map.repeat.set(6, 1);
    boxMaterial[3].map.repeat.set(6, 1);
    boxMaterial[4].map.repeat.set(6, 1);
    boxMaterial[5].map.repeat.set(6, 1);
    const boxMaterial2 = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
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
    boxMaterial3[0].map.repeat.set(7, 1);
    boxMaterial3[1].map.repeat.set(7, 1);
    boxMaterial3[2].map.repeat.set(1, 7);
    boxMaterial3[3].map.repeat.set(1, 7);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(1, 6, 2, 2);
    gridMapHelper.addObstacle(2, 2, 1, 1);
    gridMapHelper.addObstacle(8, 8, 7, 7);
    gridMapHelper.addObstacle(7, 7, 3, 8);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 0.1, gridMapHelper.getGlobalZPositionFromCoord(2));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.1, gridMapHelper.getGlobalZPositionFromCoord(0));
    fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    gridMapHelper.addFire(0, 2);
    gridMapHelper.addFire(2, 0);
    gridMapHelper.addFire(9, 7);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(1, false);
            changeFireActiveStatus(2, true);
        } else {
            changeFireActiveStatus(1, true);
            changeFireActiveStatus(2, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    scene.add(fires[2]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
    }, 1000);
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 4
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(9));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(9, 9, 9, 9);
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(16, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 6);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 8);
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
    boxMaterial[2].map.repeat.set(8, 1);
    boxMaterial[3].map.repeat.set(8, 1);
    boxMaterial[4].map.repeat.set(8, 1);
    boxMaterial[5].map.repeat.set(8, 1);
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
    boxMaterial2[0].map.repeat.set(3, 1);
    boxMaterial2[1].map.repeat.set(3, 1);
    boxMaterial2[2].map.repeat.set(1, 3);
    boxMaterial2[3].map.repeat.set(1, 3);
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
    boxMaterial3[0].map.repeat.set(4, 1);
    boxMaterial3[1].map.repeat.set(4, 1);
    boxMaterial3[2].map.repeat.set(1, 4);
    boxMaterial3[3].map.repeat.set(1, 4);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(4.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    gridMapHelper.addObstacle(1, 8, 4, 4);
    gridMapHelper.addObstacle(1, 8, 6, 6);
    gridMapHelper.addObstacle(8, 8, 7, 9);
    gridMapHelper.addObstacle(8, 8, 0, 3);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    gridMapHelper.addFire(9, 3);
    gridMapHelper.addFire(9, 7);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(0, false);
            changeFireActiveStatus(1, true);
        } else {
            changeFireActiveStatus(0, true);
            changeFireActiveStatus(1, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
    }, 1000);
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 5
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.0, gridMapHelper.getGlobalZPositionFromCoord(7));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addObstacle(5, 5, 7, 7);
    gridMapHelper.addObstacle(5, 5, 3, 3);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(10, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new _three.BoxGeometry(4, 2, 6);
    const boxGeometry5 = new _three.BoxGeometry(12, 2, 2);
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
    boxMaterial[2].map.repeat.set(5, 1);
    boxMaterial[3].map.repeat.set(5, 1);
    boxMaterial[4].map.repeat.set(5, 1);
    boxMaterial[5].map.repeat.set(5, 1);
    const boxMaterial2 = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
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
    boxMaterial3[2].map.repeat.set(1, 3);
    boxMaterial3[3].map.repeat.set(1, 3);
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
    boxMaterial4[0].map.repeat.set(3, 1);
    boxMaterial4[1].map.repeat.set(3, 1);
    boxMaterial4[2].map.repeat.set(2, 3);
    boxMaterial4[3].map.repeat.set(2, 3);
    boxMaterial4[4].map.repeat.set(2, 1);
    boxMaterial4[5].map.repeat.set(2, 1);
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
    boxMaterial5[2].map.repeat.set(6, 1);
    boxMaterial5[3].map.repeat.set(6, 1);
    boxMaterial5[4].map.repeat.set(6, 1);
    boxMaterial5[5].map.repeat.set(6, 1);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry5, boxMaterial5));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(3.5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addObstacle(3, 7, 8, 8);
    gridMapHelper.addObstacle(7, 7, 6, 6);
    gridMapHelper.addObstacle(3, 4, 4, 6);
    gridMapHelper.addObstacle(6, 6, 4, 6);
    gridMapHelper.addObstacle(3, 8, 2, 2);
    gridMapHelper.addObstacle(7, 7, 4, 4);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    scene.add(walls[4]);
    scene.add(walls[5]);
    traps = [];
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addTrap(5, 5, traps[0]);
    scene.add(traps[0]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addFire(3, 7);
    gridMapHelper.addFire(7, 7);
    gridMapHelper.addFire(7, 3);
    gridMapHelper.addFire(3, 3);
    gridMapHelper.addFire(9, 2);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(1, false);
            changeFireActiveStatus(2, true);
        } else {
            changeFireActiveStatus(1, true);
            changeFireActiveStatus(2, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    scene.add(fires[2]);
    scene.add(fires[3]);
    scene.add(fires[4]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
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
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.0, gridMapHelper.getGlobalZPositionFromCoord(7));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(5, 5, 7, 7);
    gridMapHelper.addObstacle(7, 7, 0, 0);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new _three.BoxGeometry(4, 2, 2);
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
    boxMaterial[2].map.repeat.set(7, 1);
    boxMaterial[3].map.repeat.set(7, 1);
    boxMaterial[4].map.repeat.set(7, 1);
    boxMaterial[5].map.repeat.set(7, 1);
    const boxMaterial2 = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
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
    boxMaterial3[2].map.repeat.set(1, 3);
    boxMaterial3[3].map.repeat.set(1, 3);
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
    boxMaterial4[2].map.repeat.set(2, 1);
    boxMaterial4[3].map.repeat.set(2, 1);
    boxMaterial4[4].map.repeat.set(2, 1);
    boxMaterial4[5].map.repeat.set(2, 1);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[4].rotateY((0, _util.degreeToRadians)(90));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[5].rotateY((0, _util.degreeToRadians)(90));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addObstacle(2, 8, 8, 8);
    gridMapHelper.addObstacle(2, 2, 6, 6);
    gridMapHelper.addObstacle(4, 4, 6, 6);
    gridMapHelper.addObstacle(5, 5, 4, 6);
    gridMapHelper.addObstacle(4, 6, 2, 2);
    gridMapHelper.addObstacle(8, 8, 1, 7);
    gridMapHelper.addObstacle(6, 6, 1, 1);
    gridMapHelper.addObstacle(2, 3, 4, 4);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    scene.add(walls[3]);
    scene.add(walls[4]);
    scene.add(walls[5]);
    scene.add(walls[6]);
    scene.add(walls[7]);
    traps = [];
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(6));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addTrap(2, 5, traps[0]);
    gridMapHelper.addTrap(2, 3, traps[1]);
    gridMapHelper.addTrap(2, 7, traps[2]);
    gridMapHelper.addTrap(6, 6, traps[3]);
    gridMapHelper.addTrap(5, 3, traps[4]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    scene.add(traps[4]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(5));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.1, gridMapHelper.getGlobalZPositionFromCoord(0));
    fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(0));
    fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addFire(7, 5);
    gridMapHelper.addFire(5, 0);
    gridMapHelper.addFire(9, 0);
    gridMapHelper.addFire(7, 2);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(0, false);
            changeFireActiveStatus(3, true);
        } else {
            changeFireActiveStatus(0, true);
            changeFireActiveStatus(3, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    scene.add(fires[2]);
    scene.add(fires[3]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
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
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addObstacle(3, 3, 5, 5);
    gridMapHelper.addObstacle(7, 7, 3, 3);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 6);
    const boxGeometry4 = new _three.BoxGeometry(4, 2, 2);
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
    boxMaterial[2].map.repeat.set(7, 1);
    boxMaterial[3].map.repeat.set(7, 1);
    boxMaterial[4].map.repeat.set(7, 1);
    boxMaterial[5].map.repeat.set(7, 1);
    const boxMaterial2 = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
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
    boxMaterial3[2].map.repeat.set(1, 3);
    boxMaterial3[3].map.repeat.set(1, 3);
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
    boxMaterial4[2].map.repeat.set(2, 1);
    boxMaterial4[3].map.repeat.set(2, 1);
    boxMaterial4[4].map.repeat.set(2, 1);
    boxMaterial4[5].map.repeat.set(2, 1);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls.push(new _three.Mesh(boxGeometry4, boxMaterial4));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(8));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(3));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(1));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(2.5), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(7));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(7.5), 1, gridMapHelper.getGlobalZPositionFromCoord(5));
    walls[10].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[10].rotateY((0, _util.degreeToRadians)(90));
    gridMapHelper.addObstacle(2, 8, 8, 8);
    gridMapHelper.addObstacle(2, 2, 7, 7);
    gridMapHelper.addObstacle(2, 2, 3, 3);
    gridMapHelper.addObstacle(5, 5, 4, 6);
    gridMapHelper.addObstacle(2, 3, 6, 6);
    gridMapHelper.addObstacle(8, 8, 1, 7);
    gridMapHelper.addObstacle(5, 5, 2, 2);
    gridMapHelper.addObstacle(2, 3, 4, 4);
    gridMapHelper.addObstacle(8, 8, 7, 7);
    gridMapHelper.addObstacle(7, 8, 5, 5);
    gridMapHelper.addObstacle(8, 8, 2, 3);
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
    traps = [];
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0, gridMapHelper.getGlobalZPositionFromCoord(3));
    gridMapHelper.addTrap(2, 5, traps[0]);
    gridMapHelper.addTrap(5, 3, traps[1]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.1, gridMapHelper.getGlobalZPositionFromCoord(9));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.1, gridMapHelper.getGlobalZPositionFromCoord(0));
    fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.1, gridMapHelper.getGlobalZPositionFromCoord(5));
    fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.1, gridMapHelper.getGlobalZPositionFromCoord(6));
    fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.1, gridMapHelper.getGlobalZPositionFromCoord(4));
    fires[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0.1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addFire(2, 9);
    gridMapHelper.addFire(2, 0);
    gridMapHelper.addFire(6, 5);
    gridMapHelper.addFire(8, 6);
    gridMapHelper.addFire(8, 4);
    gridMapHelper.addFire(4, 5);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(2, false);
            changeFireActiveStatus(3, false);
            changeFireActiveStatus(4, false);
            changeFireActiveStatus(0, true);
            changeFireActiveStatus(1, true);
            changeFireActiveStatus(5, true);
        } else {
            changeFireActiveStatus(2, true);
            changeFireActiveStatus(3, true);
            changeFireActiveStatus(4, true);
            changeFireActiveStatus(0, false);
            changeFireActiveStatus(1, false);
            changeFireActiveStatus(5, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    scene.add(fires[2]);
    scene.add(fires[3]);
    scene.add(fires[4]);
    scene.add(fires[5]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible) return true;
        else return false;
    };
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
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
//Phase 8
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    extinguisherUses = 1;
    displayExtinguisherUses();
    sceneProperties.executing = false;
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(3);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    objectives[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(3, 3, 5, 5);
    gridMapHelper.addObstacle(5, 5, 5, 5);
    gridMapHelper.addObstacle(7, 7, 5, 5);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    scene.add(objectives[2]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(2, 2, 4);
    const boxGeometry2 = new _three.BoxGeometry(2, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 6);
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
    boxMaterial[0].map.repeat.set(2, 1);
    boxMaterial[1].map.repeat.set(2, 1);
    boxMaterial[2].map.repeat.set(1, 2);
    boxMaterial[3].map.repeat.set(1, 2);
    const boxMaterial2 = new _three.MeshLambertMaterial({
        map: wallTexture.clone()
    });
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
    boxMaterial3[2].map.repeat.set(1, 3);
    boxMaterial3[3].map.repeat.set(1, 3);
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(6.5));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(3.5));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1, gridMapHelper.getGlobalZPositionFromCoord(0.5));
    walls[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(1.5));
    walls[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6.5), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    walls[4].rotateY((0, _util.degreeToRadians)(90));
    walls[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(6));
    walls[7].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[8].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1, gridMapHelper.getGlobalZPositionFromCoord(4));
    walls[9].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 1, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addObstacle(2, 2, 6, 7);
    gridMapHelper.addObstacle(2, 2, 3, 4);
    gridMapHelper.addObstacle(2, 2, 0, 1);
    gridMapHelper.addObstacle(4, 4, 1, 2);
    gridMapHelper.addObstacle(6, 7, 2, 2);
    gridMapHelper.addObstacle(8, 8, 1, 3);
    gridMapHelper.addObstacle(4, 4, 6, 6);
    gridMapHelper.addObstacle(6, 6, 6, 6);
    gridMapHelper.addObstacle(4, 4, 4, 4);
    gridMapHelper.addObstacle(6, 6, 4, 4);
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
    traps = [];
    const trapGeometry = new _three.BoxGeometry(2, 1, 2);
    const trapMaterial = new _three.MeshLambertMaterial({
        color: "rgb(255,0,0)"
    });
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(7));
    traps[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(4), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    traps[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addTrap(4, 7, traps[0]);
    gridMapHelper.addTrap(6, 7, traps[1]);
    gridMapHelper.addTrap(2, 5, traps[2]);
    gridMapHelper.addTrap(4, 5, traps[3]);
    gridMapHelper.addTrap(6, 5, traps[4]);
    gridMapHelper.addTrap(8, 5, traps[5]);
    gridMapHelper.addTrap(6, 0, traps[6]);
    scene.add(traps[0]);
    scene.add(traps[1]);
    scene.add(traps[2]);
    scene.add(traps[3]);
    scene.add(traps[4]);
    scene.add(traps[5]);
    scene.add(traps[6]);
    fires = [];
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires.push(new (0, _fireBaseDefault.default)());
    fires[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(7));
    fires[3].position.set(gridMapHelper.getGlobalXPositionFromCoord(3), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[4].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[5].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.1, gridMapHelper.getGlobalZPositionFromCoord(3));
    fires[6].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.1, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addFire(3, 7);
    gridMapHelper.addFire(5, 7);
    gridMapHelper.addFire(7, 7);
    gridMapHelper.addFire(3, 3);
    gridMapHelper.addFire(5, 3);
    gridMapHelper.addFire(7, 3);
    gridMapHelper.addFire(9, 5);
    fireState = 0;
    setFireStates = ()=>{
        if (fireState == 0) {
            changeFireActiveStatus(3, false);
            changeFireActiveStatus(5, false);
            changeFireActiveStatus(4, true);
            changeFireActiveStatus(6, true);
        } else {
            changeFireActiveStatus(3, true);
            changeFireActiveStatus(5, true);
            changeFireActiveStatus(4, false);
            changeFireActiveStatus(6, false);
        }
    };
    scene.add(fires[0]);
    scene.add(fires[1]);
    scene.add(fires[2]);
    scene.add(fires[3]);
    scene.add(fires[4]);
    scene.add(fires[5]);
    scene.add(fires[6]);
    coletarCristal = ()=>{
        if (sceneProperties.cancelExecution) return;
        if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[0], gridMapHelper)) {
            objectives[0].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[0].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[1], gridMapHelper)) {
            objectives[1].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
            gridMapHelper.obstacles[1].active = false;
        } else if ((0, _util.checkCollision)(actor.getObjectByName("interactionReference"), objectives[2], gridMapHelper)) {
            objectives[2].visible = false;
            consoleElement.innerText += textVariations[sceneProperties.lang][4];
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
        gridMapHelper.obstacles[0].active = true;
        gridMapHelper.obstacles[1].active = true;
        gridMapHelper.obstacles[2].active = true;
        gridMapHelper.restartFires();
        firesVisualRestart();
        setFireStates();
        extinguisherUses = 1;
        displayExtinguisherUses();
    };
    winCondition = ()=>{
        if (!objectives[0].visible && !objectives[1].visible && !objectives[2].visible) return true;
        else return false;
    };
    document.getElementById("winMessage").innerText = textVariations[sceneProperties.lang][7];
    document.getElementById("advanceBtn").innerText = textVariations[sceneProperties.lang][8];
    setFireStatesInterval = setInterval(()=>{
        if (sceneProperties.executing) return;
        fireState = (fireState + 1) % 2;
        setFireStates();
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
//Defining function that remove objects, scene render and button's functions
function removeObjects(crystals, walls, traps, fires) {
    if (crystals != undefined) for(let i = 0; i < crystals.length; i++)scene.remove(crystals[i]);
    if (walls != undefined) {
        for(let i1 = 0; i1 < walls.length; i1++)scene.remove(walls[i1]);
        gridMapHelper.clearObstacles();
    }
    if (traps != undefined) {
        for(let i2 = 0; i2 < traps.length; i2++)scene.remove(traps[i2]);
        gridMapHelper.clearTraps();
    }
    if (fires != undefined) {
        for(let i3 = 0; i3 < fires.length; i3++)scene.remove(fires[i3]);
        gridMapHelper.clearFires();
    }
    crystals = undefined;
    walls = undefined;
    traps = undefined;
    fires = undefined;
}
function animate() {
    if (fires) for(let i = 0; i < fires.length; i++)fires[i].update(fireClock);
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
    cancelAnimationFrame((0, _util.corrID));
    cancelAnimationFrame((0, _util.requestID));
    const codeParsed = (0, _parserDefault.default)((0, _multilangcode.convertCode)(sceneProperties.lang, editor.state.doc.toString()));
    actor.getObjectByName("eve").position.y = 0;
    if ((0, _util.materialColor).length != 0) (0, _util.resetRobotColor)(actor);
    if (traps != null) (0, _spikeTrap.trapsDeactivation)(traps);
    sceneProperties.cancelExecution = false;
    if (codeParsed != null) {
        (0, _editor.updateTheme)(editor, 1);
        resetLevel();
        sceneProperties.executing = true;
        this.disabled = true;
        await eval(codeParsed);
        if (winCondition()) {
            (0, _editor.readOnlyState).doc = editor.state.doc;
            editor.setState((0, _editor.readOnlyState));
            document.getElementById("winMessage").classList.remove("invisible");
            document.getElementById("advanceBtn").classList.remove("invisible");
            document.getElementById("resetBtn").disabled = true;
            finishEarlierButton.disabled = true;
            clearInterval(timerUpadate);
            if (sceneProperties.phase == phaseGeneration.length - 1) (0, _timer.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", "N\xedvel 2/Completo", document.getElementById("second-user"));
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
        if (setFireStatesInterval) {
            clearInterval(setFireStatesInterval);
            setFireStatesInterval = undefined;
        }
        removeObjects(objectives, walls, traps, fires);
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
        (0, _timer.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", `Nível 2/Fase ${sceneProperties.phase + 1}`, document.getElementById("second-user"));
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
//Running level 2
(0, _util.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
displayExtinguisherUses();
animate();

},{"three":"3XrwE","../editor":"l6wfL","../three/util":"fiv5b","../three/GridMapHelper":"1niVU","../three/FireBase":"7t6IN","../three/SpikeTrap":"eDrLo","./parser":"2wWvM","../timer":"iJc7h","bootstrap":"10mMR","../multilangcode":"jHYlP","43a85bc06c5241e4":"cJMIp","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"7t6IN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _three = require("three");
var _fire = require("./Fire");
var _fireDefault = parcelHelpers.interopDefault(_fire);
var _csgmesh = require("./CSGMesh");
class FireBase extends _three.Object3D {
    constructor(){
        super();
        // Load Textures
        const firePath = new URL(require("ef3beea4a43700c7")).toString();
        const stonePath = new URL(require("b1cb9b31fe77146a")).toString();
        let textureLoader = new _three.TextureLoader();
        let fireTex = textureLoader.load(firePath);
        let cylinderTex = textureLoader.load(stonePath);
        let ringTex = textureLoader.load(stonePath);
        // Config Textures
        this.setFilters(fireTex, cylinderTex, ringTex);
        cylinderTex.repeat.set(5, 0.1);
        ringTex.repeat.set(1.3, 1.3);
        // External cylinder --------------------------------------------------------------------
        let ch = 0.15; // CylinderHeight
        const cylinderMesh1 = new _three.Mesh(new _three.CylinderGeometry(1, 1, ch, 32));
        const cylinderMesh2 = new _three.Mesh(new _three.CylinderGeometry(0.8, 0.8, ch, 32));
        const cylinderCSG1 = (0, _csgmesh.CSG).fromMesh(cylinderMesh1);
        const cylinderCSG2 = (0, _csgmesh.CSG).fromMesh(cylinderMesh2);
        const cylindersSubtractCSG = cylinderCSG1.subtract(cylinderCSG2);
        const cylindersSubtractMesh = (0, _csgmesh.CSG).toMesh(cylindersSubtractCSG, new _three.Matrix4());
        cylindersSubtractMesh.material.map = cylinderTex;
        // Cylinder top cover -------------------------------------------------------------------
        const geometry = new _three.RingGeometry(0.8, 1.0, 64);
        const material = new _three.MeshBasicMaterial();
        const cover = new _three.Mesh(geometry, material);
        cover.rotateX(-Math.PI / 2);
        cover.position.y += ch / 2 + 0.001;
        cover.material.map = ringTex;
        // Internal cylinder --------------------------------------------------------------------      
        let ch2 = ch + 0.05; // CylinderHeight
        const cylinderMesh3 = new _three.Mesh(new _three.CylinderGeometry(0.8, 0.8, ch2, 32));
        const cylinderMesh4 = new _three.Mesh(new _three.CylinderGeometry(0.65, 0.7, ch2, 32));
        const cylinderCSG3 = (0, _csgmesh.CSG).fromMesh(cylinderMesh3);
        const cylinderCSG4 = (0, _csgmesh.CSG).fromMesh(cylinderMesh4);
        const cylindersSubtractCSG1 = cylinderCSG3.subtract(cylinderCSG4);
        const cylindersSubtractMesh1 = (0, _csgmesh.CSG).toMesh(cylindersSubtractCSG1, new _three.Matrix4());
        cylindersSubtractMesh1.material = new _three.MeshLambertMaterial({
            color: "darkgray"
        });
        // The fire itself ----------------------------------------------------------------------
        this.fire = new (0, _fireDefault.default)(fireTex);
        this.fire.scale.set(0.9, 3.0, 0.9);
        this.fire.position.set(0, 1.2, 0);
        this.add(this.fire);
        this.add(cover);
        this.add(cylindersSubtractMesh);
        this.add(cylindersSubtractMesh1);
        return this;
    }
    setFilters(t1, t2, t3) {
        t1.wrapS = t2.wrapS = t3.wrapS = _three.RepeatWrapping;
        t1.wrapT = t2.wrapT = t3.wrapT = _three.RepeatWrapping;
        t1.minFilter = t2.minFilter = t3.minFilter = _three.LinearFilter;
        t1.magFilter = t2.magFilter = t3.magFilter = _three.LinearFilter;
    }
    update(clock) {
        this.fire.update(clock);
    }
    setFireVisibility(visibility) {
        this.fire.visible = visibility;
    }
}
exports.default = FireBase;

},{"three":"3XrwE","./Fire":"d4JaV","./CSGMesh":"g1O9j","ef3beea4a43700c7":"bTld0","b1cb9b31fe77146a":"iF1UZ","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"d4JaV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _three = require("three");
var _fireShaderJs = require("./fireShader.js");
var _fireShaderJsDefault = parcelHelpers.interopDefault(_fireShaderJs);
class Fire extends _three.Mesh {
    constructor(fireTex){
        var fireMaterial = new _three.ShaderMaterial({
            defines: (0, _fireShaderJsDefault.default).defines,
            uniforms: _three.UniformsUtils.clone((0, _fireShaderJsDefault.default).uniforms),
            vertexShader: (0, _fireShaderJsDefault.default).vertexShader,
            fragmentShader: (0, _fireShaderJsDefault.default).fragmentShader,
            transparent: true,
            depthWrite: true,
            depthTest: true
        });
        // initialize uniforms 
        fireMaterial.uniforms.fireTex.value = fireTex;
        fireMaterial.uniforms.invModelMatrix.value = new _three.Matrix4();
        super(new _three.BoxGeometry(1.0, 1.0, 1.0), fireMaterial);
        this.setFileScale();
    }
    setFileScale(value = new _three.Vector3(1.0, 2.5, 1.0)) {
        this.fireScale = value;
    }
    update(clock) {
        clock.getDelta();
        var time = clock.elapsedTime;
        var invModelMatrix = this.material.uniforms.invModelMatrix.value;
        this.updateMatrixWorld();
        invModelMatrix.copy(this.matrixWorld).invert();
        if (time !== undefined) this.material.uniforms.time.value = time;
        this.material.uniforms.invModelMatrix.value = invModelMatrix;
        this.material.uniforms.scale.value = this.fireScale;
    }
}
exports.default = Fire;

},{"three":"3XrwE","./fireShader.js":"kpwtQ","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"kpwtQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
let FireShader = {
    defines: {
        "ITERATIONS": "20",
        "OCTIVES": "3"
    },
    uniforms: {
        "fireTex": {
            type: "t",
            value: null
        },
        "color": {
            type: "c",
            value: null
        },
        "time": {
            type: "f",
            value: 0.0
        },
        "invModelMatrix": {
            type: "m4",
            value: null
        },
        "scale": {
            type: "v3",
            value: null
        },
        "magnitude": {
            type: "f",
            value: 1.3
        },
        "lacunarity": {
            type: "f",
            value: 2.0
        },
        "gain": {
            type: "f",
            value: 0.5
        }
    },
    vertexShader: [
        "varying vec3 vWorldPos;",
        "void main() {",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
        "vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;",
        "}"
    ].join("\n"),
    fragmentShader: [
        "uniform vec3 color;",
        "uniform float time;",
        "uniform float seed;",
        "uniform mat4 invModelMatrix;",
        "uniform vec3 scale;",
        "uniform float magnitude;",
        "uniform float lacunarity;",
        "uniform float gain;",
        "uniform sampler2D fireTex;",
        "varying vec3 vWorldPos;",
        // GLSL simplex noise function by ashima / https://github.com/ashima/webgl-noise/blob/master/src/noise3D.glsl
        // -------- simplex noise
        "vec3 mod289(vec3 x) {",
        "return x - floor(x * (1.0 / 289.0)) * 289.0;",
        "}",
        "vec4 mod289(vec4 x) {",
        "return x - floor(x * (1.0 / 289.0)) * 289.0;",
        "}",
        "vec4 permute(vec4 x) {",
        "return mod289(((x * 34.0) + 1.0) * x);",
        "}",
        "vec4 taylorInvSqrt(vec4 r) {",
        "return 1.79284291400159 - 0.85373472095314 * r;",
        "}",
        "float snoise(vec3 v) {",
        "const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);",
        "const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);",
        // First corner
        "vec3 i  = floor(v + dot(v, C.yyy));",
        "vec3 x0 = v - i + dot(i, C.xxx);",
        // Other corners
        "vec3 g = step(x0.yzx, x0.xyz);",
        "vec3 l = 1.0 - g;",
        "vec3 i1 = min(g.xyz, l.zxy);",
        "vec3 i2 = max(g.xyz, l.zxy);",
        //   x0 = x0 - 0.0 + 0.0 * C.xxx;
        //   x1 = x0 - i1  + 1.0 * C.xxx;
        //   x2 = x0 - i2  + 2.0 * C.xxx;
        //   x3 = x0 - 1.0 + 3.0 * C.xxx;
        "vec3 x1 = x0 - i1 + C.xxx;",
        "vec3 x2 = x0 - i2 + C.yyy;",
        "vec3 x3 = x0 - D.yyy;",
        // Permutations
        "i = mod289(i); ",
        "vec4 p = permute(permute(permute( ",
        "i.z + vec4(0.0, i1.z, i2.z, 1.0))",
        "+ i.y + vec4(0.0, i1.y, i2.y, 1.0)) ",
        "+ i.x + vec4(0.0, i1.x, i2.x, 1.0));",
        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        "float n_ = 0.142857142857;",
        "vec3  ns = n_ * D.wyz - D.xzx;",
        "vec4 j = p - 49.0 * floor(p * ns.z * ns.z);",
        "vec4 x_ = floor(j * ns.z);",
        "vec4 y_ = floor(j - 7.0 * x_);",
        "vec4 x = x_ * ns.x + ns.yyyy;",
        "vec4 y = y_ * ns.x + ns.yyyy;",
        "vec4 h = 1.0 - abs(x) - abs(y);",
        "vec4 b0 = vec4(x.xy, y.xy);",
        "vec4 b1 = vec4(x.zw, y.zw);",
        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
        "vec4 s0 = floor(b0) * 2.0 + 1.0;",
        "vec4 s1 = floor(b1) * 2.0 + 1.0;",
        "vec4 sh = -step(h, vec4(0.0));",
        "vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;",
        "vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;",
        "vec3 p0 = vec3(a0.xy, h.x);",
        "vec3 p1 = vec3(a0.zw, h.y);",
        "vec3 p2 = vec3(a1.xy, h.z);",
        "vec3 p3 = vec3(a1.zw, h.w);",
        //Normalise gradients
        "vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));",
        "p0 *= norm.x;",
        "p1 *= norm.y;",
        "p2 *= norm.z;",
        "p3 *= norm.w;",
        // Mix final noise value
        "vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);",
        "m = m * m;",
        "return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));",
        "}",
        // simplex noise --------
        "float turbulence(vec3 p) {",
        "float sum = 0.0;",
        "float freq = 1.0;",
        "float amp = 1.0;",
        "for(int i = 0; i < OCTIVES; i++) {",
        "sum += abs(snoise(p * freq)) * amp;",
        "freq *= lacunarity;",
        "amp *= gain;",
        "}",
        "return sum;",
        "}",
        "vec4 samplerFire (vec3 p, vec4 scale) {",
        "vec2 st = vec2(sqrt(dot(p.xz, p.xz)), p.y);",
        "if(st.x <= 0.0 || st.x >= 1.0 || st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);",
        "p.y -= (seed + time) * scale.w;",
        "p *= scale.xyz;",
        "st.y += sqrt(st.y) * magnitude * turbulence(p);",
        "if(st.y <= 0.0 || st.y >= 1.0) return vec4(0.0);",
        "return texture2D(fireTex, st);",
        "}",
        "vec3 localize(vec3 p) {",
        "return (invModelMatrix * vec4(p, 1.0)).xyz;",
        "}",
        "void main() {",
        "vec3 rayPos = vWorldPos;",
        "vec3 rayDir = normalize(rayPos - cameraPosition);",
        "float rayLen = 0.0288 * length(scale.xyz);",
        "vec4 col = vec4(0.0);",
        "vec4 noiseScale = vec4(1, 2, 1, 0.3);",
        "for(int i = 0; i < ITERATIONS; i++) {",
        "rayPos += rayDir * rayLen;",
        "vec3 lp = localize(rayPos);",
        "lp.y += 0.5;",
        "lp.xz *= 2.0;",
        "col += samplerFire(lp, noiseScale);",
        "}",
        "col.a = col.r;",
        "gl_FragColor = col;",
        "}"
    ].join("\n")
};
exports.default = FireShader;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"bTld0":[function(require,module,exports) {
module.exports = require("f18c8c8d60476c3f").getBundleURL("a3CDN") + "../fire.19cbcb57.png" + "?" + Date.now();

},{"f18c8c8d60476c3f":"hPpBg"}],"iF1UZ":[function(require,module,exports) {
module.exports = require("3f4cec3966fe3610").getBundleURL("a3CDN") + "../stone.68031b21.jpg" + "?" + Date.now();

},{"3f4cec3966fe3610":"hPpBg"}],"2wWvM":[function(require,module,exports) {
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
        filter: new RegExp("^apagarFogo(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$"),
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
        filter: new RegExp("^}$"),
        type: "closeBlockValidation"
    },
    {
        filter: new RegExp("^{$"),
        type: "blockValidation"
    }
];
const conditionalParameters = [
    new RegExp("^pegandoFogo(\\s+)?\\((\\s+)?\\)(\\s+)?$")
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
    let start = null;
    for(let i = index - 1; i >= 0; i--){
        if (commonIf.test(lines[i].trim()) || blockIf.test(lines[i].trim())) {
            start = i;
            break;
        } else continue;
    }
    if (start != null) {
        let codeTillFunction = "";
        for(let i1 = start; i1 < index; i1++)codeTillFunction += `${lines[i1].trim()}\n`;
        if (completeCommonIf.test(codeTillFunction.trim()) || completeblockIf.test(codeTillFunction.trim())) {
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
                } else if (lineType === "blockValidation") {
                    if (blockValidation(lines, i)) {
                        let lineParsed3 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed3;
                        totalCommands++;
                    } else {
                        printError(`${lines[i]} ${errorVariations[langSelector][3]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "closeBlockValidation") {
                    if (closeBlockValidation(lines, i)) {
                        let lineParsed4 = `${lines[i].trim()}\n`;
                        codeParsed += lineParsed4;
                        totalCommands++;
                    } else {
                        printError(`${lines[i]} ${errorVariations[langSelector][4]}`, i + 1);
                        valid = false;
                        break;
                    }
                } else if (lineType === "mustCondition") {
                    if (mustConditionValidation(lines, i)) {
                        let lineParsed5 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed5 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                        codeParsed += lineParsed5;
                        totalCommands++;
                        nonblockcmd = false;
                    } else {
                        let pos = predictFunction(lines, i);
                        badLuckFunctions += `badLuck([${pos[0]},${pos[1]}])\n`;
                        let lineParsed6 = `editor.focus();
                        editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                        await delay(250);\n`;
                        lineParsed6 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                        codeParsed += lineParsed6;
                        totalCommands++;
                        nonblockcmd = false;
                    }
                } else {
                    let lineParsed7 = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                    await delay(250);\n`;
                    lineParsed7 += lines[i].trim() + (nonblockcmd ? "}" : "") + "\n";
                    codeParsed += lineParsed7;
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"cJMIp":[function(require,module,exports) {
module.exports = require("c4feac720d94a1a8").getBundleURL("a3CDN") + "../stoneWallLvl2.04461dd1.png" + "?" + Date.now();

},{"c4feac720d94a1a8":"hPpBg"}]},["87XUX","eo4tS"], "eo4tS", "parcelRequiredf3e")

