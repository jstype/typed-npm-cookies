import { IncomingMessage, ServerResponse } from 'http';
import Keygrip = require('keygrip');

declare class Cookies {
    secure: boolean;
    request: IncomingMessage;
    response: ServerResponse;

    constructor(request: IncomingMessage, response: ServerResponse);
    constructor(request: IncomingMessage, response: ServerResponse, options: string[]);
    constructor(request: IncomingMessage, response: ServerResponse, options: Keygrip);
    constructor(request: IncomingMessage, response: ServerResponse, options: Cookies.CookiesOption);

    get(name: string): string;
    get(name: string, opts: { signed: boolean; }): string;

    set(name: string): this;
    set(name: string, value: string): this;
    set(name: string, value: string, opts): this;
}

declare namespace Cookies {
    export interface CookiesOption {
        keys: string[] | Keygrip;
        secure?: boolean;
    }

    export interface CookiesGetOption {
        signed: boolean;
    }

    export interface CookiesSetOption {
        maxAge?: number;
        expires?: Date;
        path?: string;
        domain?: string;
        secure?: boolean;
        httpOnly?: boolean;
        signed?: boolean;
        overwrite?: boolean;
    }

    export type CookieAttr = CookiesSetOption;

    export class Cookie {
        name: string;
        value: string;
        /**
         * back-compat so maxage mirrors maxAge
         */
        maxage: number;
        maxAge: number;
        expires: Date;
        path: string;
        domain: string;
        secure: boolean;
        httpOnly: boolean;
        overwrite: boolean;

        constructor(name: string);
        constructor(name: string, value: string);
        constructor(name: string, value: string, attrs: CookieAttr);

        toString(): string;
        toHeader(): string;
    }
}

export = Cookies;
