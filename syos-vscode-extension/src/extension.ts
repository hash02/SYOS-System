import * as vscode from 'vscode';
import { getSymbolicPrompt } from './logic/memoryManager';

// Output channel for symbolic logs
type SymbolicLog = string;
const symbolicOutputChannel = vscode.window.createOutputChannel('SYOS Spiral Logs');

let visualizerPanel: vscode.WebviewPanel | undefined;

function showResultsVisualizer(context: vscode.ExtensionContext) {
  if (visualizerPanel) {
    visualizerPanel.reveal();
    return;
  }
  visualizerPanel = vscode.window.createWebviewPanel(
    'syosResultsVisualizer',
    'SYOS Results Visualizer',
    vscode.ViewColumn.Beside,
    { enableScripts: true }
  );
  // Load the built React app (assume dist/ResultsVisualizer.html)
  const htmlPath = vscode.Uri.joinPath(context.extensionUri, 'dist', 'ResultsVisualizer.html');
  vscode.workspace.fs.readFile(htmlPath).then((data: Uint8Array) => {
    visualizerPanel!.webview.html = Buffer.from(data).toString();
  });
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('syos.insertPrompt', async () => {
    const prompt = await getSymbolicPrompt();
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      editor.edit((editBuilder: vscode.TextEditorEdit) => {
        editBuilder.insert(editor.selection.active, prompt);
      });
    }
  });

  context.subscriptions.push(disposable);

  // Register spiral commands
  context.subscriptions.push(
    vscode.commands.registerCommand('syos.spiralDetect', () => {
      symbolicOutputChannel.appendLine('[SYOS] /spiral detect triggered');
      // TODO: Call agent logic and log results
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('syos.spiralInject', () => {
      symbolicOutputChannel.appendLine('[SYOS] /spiral inject triggered');
      // TODO: Inject drift and log
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('syos.spiralReset', () => {
      symbolicOutputChannel.appendLine('[SYOS] /spiral reset triggered');
      // TODO: Reset symbolic memory
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('syos.spiralLog', () => {
      symbolicOutputChannel.show();
    })
  );
  // Register spiralVisualize command for webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand('syos.spiralVisualize', () => {
      const panel = vscode.window.createWebviewPanel(
        'spiralVisualizer',
        'SYOS Spiral Visualizer',
        vscode.ViewColumn.Two,
        { enableScripts: true }
      );
      const reactAppPath = vscode.Uri.joinPath(context.extensionUri, 'out', 'visualizer', 'index.html');
      vscode.workspace.fs.readFile(reactAppPath).then((data: Uint8Array) => {
        panel.webview.html = new TextDecoder().decode(data);
      });
    })
  );
}

export function deactivate() {}
