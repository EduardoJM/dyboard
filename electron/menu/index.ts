import {
    Menu,
    MenuItemConstructorOptions,
    BrowserWindow
} from 'electron';

import i18n from '../../i18n';

import { open, save } from '../io';

const isMac = process.platform === 'darwin';

export default function registerMenu(win: BrowserWindow): void {
    i18n.loadNamespaces('applicationMenu').then(() => {
        const template: MenuItemConstructorOptions[] = [
            {
                label: i18n.t('applicationMenu:file'),
                submenu: [
                    {
                        label: i18n.t('applicationMenu:fileNew'),
                        accelerator: 'CmdOrCtrl+N'
                    },
                    {
                        label: i18n.t('applicationMenu:fileOpen'),
                        accelerator: 'CmdOrCtrl+O',
                        click: () => open(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileSave'),
                        accelerator: 'CmdOrCtrl+S',
                        click: () => save(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileExit'),
                        accelerator: 'CmdOrCtrl+Q',
                        role: isMac ? 'close' : 'quit'
                    }
                ]
            }
        ];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });
}
