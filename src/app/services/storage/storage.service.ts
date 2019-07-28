import {Inject, Injectable} from '@angular/core';
import {WINDOW} from '../../providers/window.providers';
import {CommonInterfaces} from '../../interfaces/common.interfaces';

interface ILocalStorage extends Storage {
    setItem(key: string, value: string, time?: number): void;
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private sessionData: CommonInterfaces.IMapOfString = {};

    private get sessionLength() {
        return Object.keys(this.sessionData).length;
    }

    public session: Storage;

    private localData: CommonInterfaces.IMapOfString = {};

    private get localLength() {
        return Object.keys(this.localData).length;
    }

    public local: ILocalStorage;

    constructor(@Inject(WINDOW) private window: Window) {

        this.initSession();
        this.initLocal();
    }

    private initSession() {

        this.session = {
            length: this.sessionLength,
            clear: () => {
                this.sessionData = {};
            },
            getItem: (key: string) => {
                return this.sessionData[key];
            },
            key: (index: number) => {
                return Object.keys(this.sessionData)[index];
            },
            removeItem: (key: string) => {
                delete this.sessionData[key];
            },
            setItem: (key: string, value: string) => {
                this.sessionData[key] = value;
            },
        };
    }

    private initLocal() {

        const currentTime = (): number => {
            // time in minutes
            return Math.floor((new Date().getTime()) / (60 * 1000));
        };

        const expirationKey = (key: string): string => {
            return key + '-cacheexpiration';
        };

        let localStorageWork = false;

        try {
            localStorageWork = (typeof this.window.localStorage === 'object');
        } catch (e) {
            localStorageWork = false;
        }

        if (localStorageWork) {
            try {
                this.window.localStorage.setItem('localStorage', '');
                this.window.localStorage.removeItem('localStorage');
            } catch (e) {
                localStorageWork = false;
            }
        }

        if (localStorageWork) {

            // override setItem & getItem
            const _setItem = Storage.prototype.setItem;
            const _getItem = Storage.prototype.getItem;

            const localStorage = this.window.localStorage;

            Storage.prototype.setItem = function (key: string, value: string, time?: number): void {

                _setItem.call(this, key, value);

                if (time) {
                    _setItem.call(this, expirationKey(key), (currentTime() + time).toString(10));
                } else {
                    localStorage.removeItem(expirationKey(key));
                }
            };

            Storage.prototype.getItem = function (key: string): string | null {

                const value = _getItem.call(this, key);
                const expValue = _getItem.call(this, expirationKey(key));

                if (expValue) {

                    const expirationTime = parseInt(expValue, 10);

                    if (currentTime() >= expirationTime) {

                        localStorage.removeItem(key);
                        localStorage.removeItem(expirationKey(key));

                        return null;
                    }
                }

                return value;
            };
            // overrides

            this.local = localStorage;
            return;
        }

        this.local = {
            length: this.localLength,
            clear: () => {
                this.localData = {};
            },
            getItem: (key: string) => {
                return this.localData[key];
            },
            key: (index: number) => {
                return Object.keys(this.localData)[index];
            },
            removeItem: (key: string) => {
                delete this.localData[key];
            },
            setItem: (key: string, value: string) => {
                this.localData[key] = value;
            },
        };
    }
}
