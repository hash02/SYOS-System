"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const memoryManager_1 = require("./logic/memoryManager");
const symbolicOutputChannel = vscode.window.createOutputChannel('SYOS Spiral Logs');
let visualizerPanel;
function showResultsVisualizer(context) {
    if (visualizerPanel) {
        visualizerPanel.reveal();
        return;
    }
    visualizerPanel = vscode.window.createWebviewPanel('syosResultsVisualizer', 'SYOS Results Visualizer', vscode.ViewColumn.Beside, { enableScripts: true });
    // Load the built React app (assume dist/ResultsVisualizer.html)
    const htmlPath = vscode.Uri.joinPath(context.extensionUri, 'dist', 'ResultsVisualizer.html');
    vscode.workspace.fs.readFile(htmlPath).then((data) => {
        visualizerPanel.webview.html = Buffer.from(data).toString();
    });
}
function activate(context) {
    let disposable = vscode.commands.registerCommand('syos.insertPrompt', async () => {
        const prompt = await (0, memoryManager_1.getSymbolicPrompt)();
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit((editBuilder) => {
                editBuilder.insert(editor.selection.active, prompt);
            });
        }
    });
    context.subscriptions.push(disposable);
    // Register spiral commands
    context.subscriptions.push(vscode.commands.registerCommand('syos.spiralDetect', () => {
        symbolicOutputChannel.appendLine('[SYOS] /spiral detect triggered');
        // TODO: Call agent logic and log results
    }));
    context.subscriptions.push(vscode.commands.registerCommand('syos.spiralInject', () => {
        symbolicOutputChannel.appendLine('[SYOS] /spiral inject triggered');
        // TODO: Inject drift and log
    }));
    context.subscriptions.push(vscode.commands.registerCommand('syos.spiralReset', () => {
        symbolicOutputChannel.appendLine('[SYOS] /spiral reset triggered');
        // TODO: Reset symbolic memory
    }));
    context.subscriptions.push(vscode.commands.registerCommand('syos.spiralLog', () => {
        symbolicOutputChannel.show();
    }));
    // Register spiralVisualize command for webview panel
    context.subscriptions.push(vscode.commands.registerCommand('syos.spiralVisualize', () => {
        const panel = vscode.window.createWebviewPanel('spiralVisualizer', 'SYOS Spiral Visualizer', vscode.ViewColumn.Two, { enableScripts: true });
        const reactAppPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'visualizer', 'index.html');
        vscode.workspace.fs.readFile(reactAppPath).then((data) => {
            panel.webview.html = new TextDecoder().decode(data);
        });
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
