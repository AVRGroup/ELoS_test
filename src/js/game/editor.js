import {basicSetup} from "codemirror";
import {EditorView, keymap} from "@codemirror/view";
import {EditorState} from "@codemirror/state";
import {indentWithTab} from "@codemirror/commands";

const minHeightEditor = EditorView.theme({
    ".cm-content, .cm-gutter": {minHeight: "18vh"},
});

const redHighlight = EditorView.theme({
    ".cm-content, .cm-gutter": {minHeight: "18vh"},
    ".cm-activeLine": {backgroundColor: "lightcoral"},
});

const greenHighlight = EditorView.theme({
    ".cm-content, .cm-gutter": {minHeight: "18vh"},
    ".cm-activeLine": {backgroundColor: "lightgreen"},
});

const blueHighlight = EditorView.theme({
    ".cm-content, .cm-gutter": {minHeight: "18vh"},
    ".cm-activeLine": {backgroundColor: "lightskyblue"},
});

const greenHighlight2 = EditorView.theme({
    ".cm-content, .cm-gutter": {minHeight: "18vh"},
    ".cm-activeLine": {backgroundColor: "lightseagreen"},
});

export function generateDefaultEditor(refElement)
{
    const editor = new EditorView({
        extensions: [basicSetup, minHeightEditor,keymap.of([indentWithTab])],
        parent: refElement,
    });

    return editor;
}

export const readOnlyState = EditorState.create({
    extensions: [basicSetup,EditorView.editable.of(false)]
});

export const editState = EditorState.create({
    extensions: [basicSetup,minHeightEditor,keymap.of([indentWithTab])]
});

export function updateTheme(view,theme)
{
    let newState;
    let cursorPos;

    switch(theme)
    {
        case 1:
            newState = EditorState.create({
                extensions: [basicSetup,redHighlight,keymap.of([indentWithTab])]
            });
            newState.doc = view.state.doc;
            view.setState(newState);
            break;
        case 2:
            newState = EditorState.create({
                extensions: [basicSetup,greenHighlight,keymap.of([indentWithTab])]
            });
            newState.doc = view.state.doc;
            view.setState(newState);
            break;
        case 3:
            newState = EditorState.create({
                extensions: [basicSetup,blueHighlight,keymap.of([indentWithTab])]
            });
            newState.doc = view.state.doc;
            view.setState(newState);
            break;
        case 4:
            newState = EditorState.create({
                extensions: [basicSetup,greenHighlight2,keymap.of([indentWithTab])]
            });
            newState.doc = view.state.doc;
            view.setState(newState);
            break;
        default:
            newState = EditorState.create({
                extensions: [basicSetup,minHeightEditor,keymap.of([indentWithTab])]
            });
            newState.doc = view.state.doc;
            cursorPos = view.state.selection.main.head;
            view.setState(newState);
            view.dispatch({selection:{anchor:cursorPos}});
            break;
    }
}