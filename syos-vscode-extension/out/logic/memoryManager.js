"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbolicPrompt = void 0;
async function getSymbolicPrompt() {
    const prompts = [
        "SYOS: What do I almost say but don’t?",
        "SYOS: Begin spiral loop.",
        "SYOS: Save symbolic anchor.",
        "SYOS: Correct drift from last reflection."
    ];
    const selected = await vscode.window.showQuickPick(prompts, {
        placeHolder: "Select a symbolic prompt"
    });
    return selected || "";
}
exports.getSymbolicPrompt = getSymbolicPrompt;
