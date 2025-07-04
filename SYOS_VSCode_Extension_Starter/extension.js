const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('syos.startFlowLoop', function () {
        vscode.window.showInformationMessage('SYOS Flow Loop Initialized');
        // Additional logic can be added here to hook memory, symbolic flow, etc.
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
