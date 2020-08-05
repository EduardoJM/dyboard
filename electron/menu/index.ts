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
                        label: i18n.t('applicationMenu:fileItems.new'),
                        accelerator: 'CmdOrCtrl+N'
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.open'),
                        accelerator: 'CmdOrCtrl+O',
                        click: () => open(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.save'),
                        accelerator: 'CmdOrCtrl+S',
                        click: () => save(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.exit'),
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
