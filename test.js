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

test("relative require", async done => {
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

    expect(data).toHaveProperty('pi');

    expect(data.pi).toEqual(3.14);

    expect(data.success).toBeTruthy();

    fastifyClient.on('exit', (code) => code === 0 ? done() : done(code));

    fastifyClient.kill();
});

test("multiple fastify instance", async done => {
    const fastifyClient = spawn(process.execPath, [path.join(__dirname, './multi-instance-test.js')]);

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

    const response2 = await fetch('http://127.0.0.1:1338/test');
    const data2 = await response2.json();

    expect(data2).toBeTruthy();

    expect(data2).toHaveProperty('success');

    expect(data2).toHaveProperty('test');

    expect(data2.test).toEqual(1338);

    expect(data2.success).toBeTruthy();

    fastifyClient.on('exit', (code) => code === 0 ? done() : done(code));

    fastifyClient.kill();
});