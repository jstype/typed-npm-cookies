/// <reference path="../out/lib/cookies.d.ts" />
import test = require('blue-tape');

import * as Cookies from 'cookies';
import * as http from 'http';

test('set cookie', t => {
    t.plan(1);
    http
        .createServer((req, res) => {
            let cookies = new Cookies(req, res, { keys: ['a', 'b']});

            if (req.url === '/set') {
                cookies
                    // set a regular cookie
                    .set('unsigned', 'foo', { signed: false, httpOnly: false })

                    // set a signed cookie
                    .set('signed', 'bar', { signed: true })

                    // mimic a signed cookie, but with a bogus signature
                    .set('tampered', 'baz')
                    .set('tampered.sig', 'bogus')

                    // set a cookie that will be overwritten
                    .set('overwrite', 'old-value', { signed: true })
                    .set('overwrite', 'new-value', { overwrite: true, signed: true });

                res.writeHead(302, { Location: '/' });
                return res.end('Now let\'s check.');
            }

            res.end();
        })
        .listen(3000)
        .on('listening', () => {
            http.get('http://localhost:3000/set', res => {
                let header = res.headers['set-cookie'];
                t.equal(header.length, 7);
                t.end();
                process.exit();
            });
        });
});
