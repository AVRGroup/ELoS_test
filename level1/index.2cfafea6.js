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
})({"aAmVL":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "f8a696462cfafea6";
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

},{}],"ewxrA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _editor = require("../editor");
var _util = require("../three/util");
var _gridMapHelper = require("../three/GridMapHelper");
var _gridMapHelperDefault = parcelHelpers.interopDefault(_gridMapHelper);
var _parser = require("./parser");
var _parserDefault = parcelHelpers.interopDefault(_parser);
var _timer = require("../timer");
var _bootstrap = require("bootstrap");
var _spikeTrap = require("../three/SpikeTrap");
var _multilangcode = require("../multilangcode");
//Defining Level 1 Scene's Properties
const sceneProperties = {
    cancelExecution: false,
    timer: 0,
    phase: 0,
    mult: 1,
    lang: window.location.href.includes("english") ? 1 : 0
};
function generatePhaseTitle() {
    switch(sceneProperties.lang){
        case 1:
            return `Level 1 - Round ${sceneProperties.phase + 1} of 8`;
        default:
            return `Nível 1 - Fase ${sceneProperties.phase + 1} de 8`;
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
        "Deseja realmente finalizar a pr\xe1tica?"
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
];
const commandsVariations = [
    [
        "andarFrente(?)\n",
        "andarTras(?)\n",
        "girarEsquerda()\n",
        "girarDireita()\n",
        "darMeiaVolta()\n",
        "coletarCristal()\n"
    ],
    [
        "moveForward(?)\n",
        "moveBackwards(?)\n",
        "rotateLeft()\n",
        "rotateRight()\n",
        "turnBack()",
        "collectCrystal()\n"
    ]
];
//Generating default Level 1 Objects
const logModal = new (0, _bootstrap.Modal)(document.getElementById("logModal"));
let timerUpadate;
function updateTime() {
    sceneProperties.timer++;
}
const editor = (0, _editor.generateDefaultEditor)(document.getElementById("editorArea"), {
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
const consoleElement = document.getElementById("consoleArea");
const { renderer , scene , camera , controls  } = (0, _util.generateDefaultSceneObjects)(document.getElementById("phaseView"));
const gridMapHelper = new (0, _gridMapHelperDefault.default)();
const plane = gridMapHelper.createGridPlane();
const actor = (0, _util.loadDefaultActor)();
const wallTexture = new _three.TextureLoader().load(new URL(require("9f230ecc81dc5842")).toString());
wallTexture.wrapS = _three.RepeatWrapping;
wallTexture.wrapT = _three.RepeatWrapping;
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
let coletarCristal;
let resetLevel;
let winCondition;
const phaseGeneration = [];
//Functions to create the phases
//Phase 1
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][1];
    camera.position.set(0, 15, 30);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
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
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    gridMapHelper.addObstacle(8, 8, 2, 2);
    scene.add(objectives[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 3
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 0.0, gridMapHelper.getGlobalZPositionFromCoord(6));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(1));
    gridMapHelper.addObstacle(2, 2, 6, 6);
    gridMapHelper.addObstacle(7, 7, 1, 1);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
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
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][1];
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addObstacle(9, 9, 5, 5);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(2, 2, 2);
    const boxMaterial = new _three.MeshLambertMaterial({
        map: wallTexture
    });
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 1.0, gridMapHelper.getGlobalXPositionFromCoord(5));
    gridMapHelper.addObstacle(7, 7, 5, 5);
    scene.add(walls[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 5
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][2];
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(2);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 0.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    objectives[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(7), 0.0, gridMapHelper.getGlobalZPositionFromCoord(8));
    gridMapHelper.addObstacle(6, 6, 2, 2);
    gridMapHelper.addObstacle(7, 7, 8, 8);
    scene.add(objectives[0]);
    scene.add(objectives[1]);
    walls = [];
    const boxGeometry = new _three.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
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
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1.0, gridMapHelper.getGlobalXPositionFromCoord(7));
    walls[1].rotateY((0, _util.degreeToRadians)(90));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalXPositionFromCoord(2.5));
    gridMapHelper.addObstacle(5, 7, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    scene.add(walls[0]);
    scene.add(walls[1]);
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
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][1];
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(8, 8, 0, 0);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry1 = new _three.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(16, 2, 2);
    const boxGeometry3 = new _three.BoxGeometry(2, 2, 4);
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
    boxMaterial2[2].map.repeat.set(8, 1);
    boxMaterial2[3].map.repeat.set(8, 1);
    boxMaterial2[4].map.repeat.set(8, 1);
    boxMaterial2[5].map.repeat.set(8, 1);
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
    boxMaterial3[0].map.repeat.set(2, 1);
    boxMaterial3[1].map.repeat.set(2, 1);
    boxMaterial3[2].map.repeat.set(1, 2);
    boxMaterial3[3].map.repeat.set(1, 2);
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
    timerUpadate = setInterval(updateTime, 1000);
});
//Phase 7
phaseGeneration.push(()=>{
    document.getElementById("phaseTitle").innerText = textVariations[sceneProperties.lang][0]();
    document.getElementById("phaseObjective").innerText = textVariations[sceneProperties.lang][1];
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(5));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(1);
    objectives[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(9), 0.0, gridMapHelper.getGlobalZPositionFromCoord(0));
    gridMapHelper.addObstacle(9, 9, 0, 0);
    scene.add(objectives[0]);
    walls = [];
    const boxGeometry1 = new _three.BoxGeometry(14, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(16, 2, 2);
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
    boxMaterial[2].map.repeat.set(7, 1);
    boxMaterial[3].map.repeat.set(7, 1);
    boxMaterial[4].map.repeat.set(7, 1);
    boxMaterial[5].map.repeat.set(7, 1);
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
    boxMaterial2[2].map.repeat.set(8, 1);
    boxMaterial2[3].map.repeat.set(8, 1);
    boxMaterial2[4].map.repeat.set(8, 1);
    boxMaterial2[5].map.repeat.set(8, 1);
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
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry3, boxMaterial3));
    walls.push(new _three.Mesh(boxGeometry1, boxMaterial));
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
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(8), 0, gridMapHelper.getGlobalZPositionFromCoord(5));
    gridMapHelper.addTrap(8, 5, traps[0]);
    scene.add(traps[0]);
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
    };
    winCondition = ()=>{
        if (!objectives[0].visible) return true;
        else return false;
    };
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
    camera.position.set(0, 15, 30);
    camera.rotation.set(0, 0, 0);
    actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
    actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
    objectives = (0, _util.loadDefaultObjectives)(3);
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
    const boxGeometry = new _three.BoxGeometry(6, 2, 2);
    const boxGeometry2 = new _three.BoxGeometry(4, 2, 2);
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
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls.push(new _three.Mesh(boxGeometry2, boxMaterial2));
    walls.push(new _three.Mesh(boxGeometry, boxMaterial));
    walls[0].position.set(gridMapHelper.getGlobalXPositionFromCoord(6), 1.0, gridMapHelper.getGlobalXPositionFromCoord(7));
    walls[1].rotateY((0, _util.degreeToRadians)(90));
    walls[1].position.set(gridMapHelper.getGlobalXPositionFromCoord(5), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2.5));
    walls[2].position.set(gridMapHelper.getGlobalXPositionFromCoord(2), 1.0, gridMapHelper.getGlobalZPositionFromCoord(4));
    gridMapHelper.addObstacle(5, 7, 7, 7);
    gridMapHelper.addObstacle(5, 5, 2, 3);
    gridMapHelper.addObstacle(1, 3, 4, 4);
    scene.add(walls[0]);
    scene.add(walls[1]);
    scene.add(walls[2]);
    traps = [];
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
    traps.push(new (0, _spikeTrap.SpikeTrap)());
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
        actor.position.set(gridMapHelper.getGlobalXPositionFromCoord(0), 1.0, gridMapHelper.getGlobalZPositionFromCoord(2));
        actor.rotation.set(0, (0, _util.degreeToRadians)(90), 0);
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
    sceneProperties.cancelExecution = false;
    actor.getObjectByName("eve").position.y = 0;
    if (traps != null) (0, _spikeTrap.trapsDeactivation)(traps);
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
            if (sceneProperties.phase == phaseGeneration.length - 1) (0, _timer.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", "N\xedvel 1/Completo", document.getElementById("second-user"));
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
    (0, _editor.updateTheme)(editor, 0);
    sceneProperties.cancelExecution = true;
    resetLevel();
});
const advanceBtn = document.getElementById("advanceBtn");
advanceBtn.addEventListener("click", (e)=>{
    sceneProperties.phase++;
    if (sceneProperties.phase < phaseGeneration.length) {
        removeObjects(objectives, walls, traps);
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
        (0, _timer.configureDataAndUpload)(document.getElementById("name"), document.getElementById("age"), "gender", "prog-exp", document.getElementById("subBtn"), sceneProperties.timer, "../", `Nível 1/Fase ${sceneProperties.phase + 1}`, document.getElementById("second-user"));
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
(0, _util.resizeCanvasToDisplaySize)(renderer, camera);
phaseGeneration[sceneProperties.phase]();
animate();

},{"three":"3XrwE","../editor":"l6wfL","../three/util":"fiv5b","../three/GridMapHelper":"1niVU","./parser":"9icGm","../timer":"iJc7h","bootstrap":"10mMR","../three/SpikeTrap":"eDrLo","../multilangcode":"jHYlP","9f230ecc81dc5842":"1YsiS","@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"9icGm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const errorVariations = [
    [
        "C\xf3digo inv\xe1lido:",
        "linha:"
    ],
    [
        "Invalid code:",
        "line:"
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
    }
];
function printError(text, line) {
    const consoleElement = document.getElementById("consoleArea");
    consoleElement.innerText += `${errorVariations[langSelector][0]} ${text} ${errorVariations[langSelector][1]} ${line}\n`;
}
function parseCode(code) {
    let codeParsed = "const delay = (milisecs) => {return new Promise((resolve) => setTimeout(resolve,milisecs));}\nasync function runCode(){\n";
    const lines = code.split("\n");
    let valid = true;
    for(let i = 0; i < lines.length; i++){
        let validLine = false;
        let lineType;
        if (lines[i].trim() != "") {
            for(let j = 0; j < functionFilter.length; j++){
                validLine = functionFilter[j].filter.test(lines[i].trim());
                if (validLine) {
                    lineType = functionFilter[j].type;
                    break;
                }
            }
            if (validLine) {
                if (lineType === "sequential") {
                    let lineParsed = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});\n`;
                    lineParsed += "await " + lines[i].trim() + "\n";
                    codeParsed += lineParsed;
                } else {
                    let lineParsed1 = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i + 1}).from}});
                    await delay(250);\n`;
                    lineParsed1 += lines[i].trim() + "\n";
                    codeParsed += lineParsed1;
                }
            } else {
                printError(lines[i], i + 1);
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
exports.default = parseCode;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"j7FRh"}],"1YsiS":[function(require,module,exports) {
module.exports = require("fa09612e5a73e027").getBundleURL("llyQl") + "../stone_wallLvl1.9acf7316.jpg" + "?" + Date.now();

},{"fa09612e5a73e027":"hPpBg"}],"hPpBg":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}]},["aAmVL","ewxrA"], "ewxrA", "parcelRequiredf3e")

