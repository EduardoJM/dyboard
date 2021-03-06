import {
    Menu,
    MenuItemConstructorOptions,
    BrowserWindow
} from 'electron';

import i18n from '../../i18n';

import IO from '../io';

const isMac = process.platform === 'darwin';

function setLanguage(win: BrowserWindow, lang: string) {
    i18n.changeLanguage(lang).then(() => {
        registerMenu(win);
        win.webContents.send('setlanguage', { lang });
    });
}

export default function registerMenu(win: BrowserWindow): void {
    i18n.loadNamespaces('applicationMenu').then(() => {
        const fileIO = new IO();
        const template: MenuItemConstructorOptions[] = [
            {
                label: i18n.t('applicationMenu:file'),
                submenu: [
                    {
                        label: i18n.t('applicationMenu:fileItems.new'),
                        accelerator: 'CmdOrCtrl+N',
                        click: () => fileIO.newBoard(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.open'),
                        accelerator: 'CmdOrCtrl+O',
                        click: () => fileIO.open(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.save'),
                        accelerator: 'CmdOrCtrl+S',
                        click: () => fileIO.save(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.saveAs'),
                        accelerator: 'CmdOrCtrl+Shift+S',
                        click: () => fileIO.saveAs(win)
                    },
                    {
                        label: i18n.t('applicationMenu:fileItems.exit'),
                        accelerator: 'CmdOrCtrl+Q',
                        role: isMac ? 'close' : 'quit'
                    }
                ]
            },
            {
                label: i18n.t('applicationMenu:config'),
                submenu: [
                    {
                        label: i18n.t('applicationMenu:configItems.language'),
                        submenu: i18n.languages.map((lang) => {
                            return {
                                label: i18n.t(`applicationMenu:configItems.languageItems.${lang}`),
                                click: () => setLanguage(win, lang)
                            };
                        })
                    }
                ]
            }
        ];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });
}
