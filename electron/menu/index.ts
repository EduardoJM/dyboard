import {
    Menu,
    MenuItemConstructorOptions,
    BrowserWindow
} from 'electron';

import { open, save } from '../io';

const isMac = process.platform === 'darwin';

export default function registerMenu(win: BrowserWindow): void {
    const template: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New'
                },
                {
                    label: 'Open',
                    click: () => open(win)
                },
                {
                    label: 'Save',
                    click: () => save(win)
                },
                {
                    role: isMac ? 'close' : 'quit'
                }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: () => {
                        alert('oiee');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
