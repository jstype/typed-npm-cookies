import { IncomingMessage, ServerResponse } from 'http';
import Keygrip = require('keygrip');

declare interface Cookies {
    secure: boolean;
    request: IncomingMessage;
    response: ServerResponse;

    get(name: string): string;
    get(name: string, opts: Cookies.GetOption): string;

    set(name: string): this;
    set(name: string, value: string): this;
    set(name: string, value: string, opts: Cookies.SetOption): this;
}

declare namespace Cookies {
    export interface Option {
        keys: string[] | Keygrip;
        secure?: boolean;
    }

    export interface GetOption {
        signed: boolean;
    }

    export interface SetOption {
        maxAge?: number;
        expires?: Date;
        path?: string;
        domain?: string;
        secure?: boolean;
        httpOnly?: boolean;
        signed?: boolean;
        overwrite?: boolean;
    }

    export type CookieAttr = SetOption;

    export interface Cookie {
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

        toString(): string;
        toHeader(): string;
    }
}

declare interface createCookies {
    (request: IncomingMessage, response: ServerResponse): Cookies;
    (request: IncomingMessage, response: ServerResponse, options: string[]): Cookies;
    (request: IncomingMessage, response: ServerResponse, options: Keygrip): Cookies;
    (request: IncomingMessage, response: ServerResponse, options: Cookies.Option): Cookies;

    new (request: IncomingMessage, response: ServerResponse): Cookies;
    new (request: IncomingMessage, response: ServerResponse, options: string[]): Cookies;
    new (request: IncomingMessage, response: ServerResponse, options: Keygrip): Cookies;
    new (request: IncomingMessage, response: ServerResponse, options: Cookies.Option): Cookies;

    Cookie: {
        new (name: string): Cookies.Cookie;
        new (name: string, value: string): Cookies.Cookie;
        new (name: string, value: string, attrs: Cookies.CookieAttr): Cookies.Cookie;
    };
}

declare const Cookies: createCookies;

export = Cookies;
