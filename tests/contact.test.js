// Regression-Tests für das Kontaktformular: Feld-Validierung.
// RESEND-Key wird gescrubbt — gültige Requests enden im Fehlerpfad,
// nie bei einem echten Mailversand.
import test from 'node:test';
import assert from 'node:assert/strict';

// Dummy-Werte (KEINE echten Credentials), damit der Handler die
// Validierungslogik erreicht; echte Mails werden nie gesendet.
process.env.RESEND_API_KEY = 'test-key-not-real';
process.env.CONTACT_EMAIL = 'test@example.com';

const { default: handler } = await import('../api/contact.js');
const { mockRes, mockReq } = await import('./helpers.js');

test('Produktions-Origin passiert den Origin-Guard', async () => {
  const res = mockRes();
  await handler(mockReq({
    headers: { origin: 'https://ainzigartig.sejerlaenner.tech' },
    body: {},
  }), res);
  assert.equal(res.code, 400);
  assert.notEqual(res.body?.error, 'Origin not allowed');
});

test('fremder Browser-Origin → 403 vor Validierung oder Provider-Arbeit', async () => {
  const res = mockRes();
  await handler(mockReq({
    headers: { origin: 'https://evil-site.example' },
    body: { website: 'https://bot.example' },
  }), res);
  assert.equal(res.code, 403);
  assert.equal(res.body?.error, 'Origin not allowed');
});

test('fehlender Origin-Header bleibt für Nicht-Browser-Clients erlaubt', async () => {
  const res = mockRes();
  await handler(mockReq({
    headers: { origin: undefined },
    body: {},
  }), res);
  assert.equal(res.code, 400);
  assert.notEqual(res.body?.error, 'Origin not allowed');
});

test('Nicht-POST → 405', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'GET' }), res);
  assert.equal(res.code, 405);
});

test('fehlender Name → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { email: 'a@b.de', message: 'Das ist eine ausreichend lange Nachricht.' } }), res);
  assert.equal(res.code, 400);
});

test('fehlende E-Mail → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { name: 'Test', message: 'Das ist eine ausreichend lange Nachricht.' } }), res);
  assert.equal(res.code, 400);
});

test('Nachricht unter 10 Zeichen → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { name: 'Test', email: 'a@b.de', message: 'kurz' } }), res);
  assert.equal(res.code, 400);
  assert.match(res.body.error, /mindestens 10 Zeichen/);
});

test('gültige Daten mit Dummy-Key → Provider-Fehler 502, kein echter Mailversand', async () => {
  const res = mockRes();
  await handler(
    mockReq({ body: { name: 'Test', email: 'test@example.com', message: 'Das ist eine ausreichend lange Nachricht.' } }),
    res
  );
  assert.equal(res.code, 502, `erwartet 502, war ${res.code}: ${JSON.stringify(res.body)}`);
});

test('Honeypot: gesetztes website-Feld → stiller 200 ohne Validierung oder Mailversand', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { website: 'http://spam.example' } }), res);
  assert.equal(res.code, 200);
});
