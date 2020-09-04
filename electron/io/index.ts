import { dialog, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';

export default class IO {
    private filePath: string;

    constructor() {
        this.filePath = '';
    }

    public open(win: BrowserWindow): void {
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
                this.filePath = file;
                const buffer = fs.readFileSync(file);
                const str = buffer.toString();
                const json = JSON.parse(str);
                win.webContents.send('loaded', { path: file, data: json });
            }
        });
    }

    public saveAs(win: BrowserWindow): void {
        dialog.showSaveDialog(win, {
            filters: [
                { name: 'DyBoard\'s', extensions: ['dyb'] }
            ]
        }).then((result) => {
            if (result.canceled || !result.filePath) {
                return;
            }
            this.filePath = result.filePath;
            win.webContents.send('request-save', { path: result.filePath });
        });
    }

    public save(win: BrowserWindow): void {
        if (this.filePath === '') {
            this.saveAs(win);
        } else {
            win.webContents.send('request-save', { path: this.filePath });
        }
    }

    public static registerIO(): void {
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
}
