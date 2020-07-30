import { dialog, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';

export function open(win: BrowserWindow): void {
    // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
    dialog.showOpenDialog(win, {
        properties: ['openFile'],
        filters: [
            { name: 'DyBoard\'s', extensions: ['dyb'] }
        ]
    }).then((result) => {
        if (result.canceled) {
            return;
        }
        if (result.filePaths.length > 0) {
            const file = result.filePaths[0];
            const buffer = fs.readFileSync(file);
            const str = buffer.toString();
            const json = JSON.parse(str);
            win.webContents.send('loaded', { path: file, data: json });
        }
    });
}

export function save(win: BrowserWindow): void {
    dialog.showSaveDialog(win, {
        filters: [
            { name: 'DyBoard\'s', extensions: ['dyb'] }
        ]
    }).then((result) => {
        if (result.canceled) {
            return;
        }
        win.webContents.send('request-save', { path: result.filePath });
    });
}

export function registerIO(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ipcMain.on('save', (event, arg: { data: string; path: string; }) => {
        let myPath = arg.path;
        if (!myPath.endsWith('.dyb')) {
            myPath = `${arg.path}.dyb`;
        }
        fs.writeFileSync(myPath, arg.data);
        event.reply('saved');
    });
}
