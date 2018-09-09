const fetch = require('node-fetch');
const {spawn} = require('child_process');
const path = require('path');

test("load route", async done => {
    const fastifyClient = spawn(process.execPath, [path.join(__dirname, './example.js')]);

    fastifyClient.on('error', done);

    await new Promise((resolve, reject) => {
        fastifyClient.stdout.on('data', data => {
            if (data.toString('utf8').includes('1337')) {
                resolve();
            }
        });
    });

    const response = await fetch('http://127.0.0.1:1337/test');
    const data = await response.json();

    expect(data).toBeTruthy();

    expect(data).toHaveProperty('success');

    expect(data.success).toBeTruthy();

    fastifyClient.on('exit', (code) => code === 0 ? done() : done(code));

    fastifyClient.kill();
});

test('load nested route', async done => {
    const fastifyClient = spawn(process.execPath, [path.join(__dirname, './example.js')]);

    fastifyClient.on('error', done);

    await new Promise((resolve, reject) => {
        fastifyClient.stdout.on('data', data => {
            if (data.toString('utf8').includes('1337')) {
                resolve();
            }
        });
    });

    const response = await fetch('http://127.0.0.1:1337/nested/test');
    const data = await response.json();

    expect(data).toBeTruthy();

    expect(data).toHaveProperty('success');

    expect(data.success).toBeTruthy();

    fastifyClient.on('exit', (code) => code === 0 ? done() : done(code));

    fastifyClient.kill();
});

test("other instance name", async done => {
    const fastifyClient = spawn(process.execPath, [path.join(__dirname, './alternative.js')]);

    fastifyClient.on('error', done);

    await new Promise((resolve, reject) => {
        fastifyClient.stdout.on('data', data => {
            if (data.toString('utf8').includes('1337')) {
                resolve();
            }
        });
    });

    const response = await fetch('http://127.0.0.1:1337/test');
    const data = await response.json();

    expect(data).toBeTruthy();

    expect(data).toHaveProperty('success');

    expect(data.success).toBeTruthy();

    fastifyClient.on('exit', (code) => code === 0 ? done() : done(code));

    fastifyClient.kill();
});

test("optional injections", async done => {
    const fastifyClient = spawn(process.execPath, [path.join(__dirname, './example.js')]);

    fastifyClient.on('error', done);

    await new Promise((resolve, reject) => {
        fastifyClient.stdout.on('data', data => {
            if (data.toString('utf8').includes('1337')) {
                resolve();
            }
        });
    });

    const response = await fetch('http://127.0.0.1:1337/test');
    const data = await response.json();

    expect(data).toBeTruthy();

    expect(data).toHaveProperty('success');

    expect(data).toHaveProperty('test');

    expect(data.test).toEqual(1337);

    expect(data.success).toBeTruthy();

    fastifyClient.on('exit', (code) => code === 0 ? done() : done(code));

    fastifyClient.kill();
});