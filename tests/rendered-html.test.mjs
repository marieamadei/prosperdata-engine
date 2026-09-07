import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the generic ProsperData Engine website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>ProsperData Engine — Decision intelligence per il fundraising<\/title>/i);
  assert.match(html, /Sistema di intelligence, segmentazione e attivazione/);
  assert.match(html, /Sei modelli specialistici/);
  assert.match(html, /Modello Lapsed/);
  assert.match(html, /Propensione ai Regolari/);
  assert.match(html, /Engagement Online/);
  assert.match(html, /Modello HVD/);
  assert.match(html, /Lasciti Lookalike/);
  assert.match(html, /Modello Memorie/);
  assert.match(html, /Label/);
  assert.match(html, /Score/);
  assert.match(html, /Audience/);
  assert.match(html, /Alert/);
  assert.match(html, /Dimensione del database/);
  assert.match(html, /Numero di modelli attivati/);
  assert.match(html, /Il costo varia in base all’entità e alla qualità del database/);
  assert.doesNotMatch(html, /VIDAS|gara|Proposta · 2027|81\.750|90\.000|€ 700/i);
});
