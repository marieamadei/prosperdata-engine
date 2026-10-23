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
  assert.match(html, /ProsperData Engine è il framework specialistico di modellistica e prioritizzazione per il fundraising nonprofit/);
  assert.match(html, /Produce segmenti, score, audience e criteri di attivazione integrabili nel CRM/);
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
  assert.match(html, /Comprendere\. Modellare/);
  assert.match(html, /Attivare\. Migliorare/);
  assert.match(html, /La risposta al brief è un percorso in quattro fasi cumulative/);
  assert.match(html, /Analisi &amp; Assessment/);
  assert.match(html, /Capire cosa accade oggi/);
  assert.match(html, /Modelli &amp; Segmenti/);
  assert.match(html, /Costruire nuove letture/);
  assert.match(html, /Implementazione su CRM/);
  assert.match(html, /Trasformare insight in operatività/);
  assert.match(html, /Monitoraggio Continuo/);
  assert.match(html, /I tre risultati richiesti da VIDAS/i);
  assert.match(html, /Analisi multidimensionale/);
  assert.match(html, /Segmentazione evoluta/);
  assert.match(html, /Operativizzazione in CRM e BI/);
  assert.match(html, /Il sistema entra/);
  assert.match(html, /nel lavoro quotidiano/);
  assert.match(html, /FASI 01–03 · FLUSSO COMPLETO/);
  assert.match(html, /FASE 03 · OPERATIVIZZAZIONE/);
  assert.match(html, /CRM, ProsperData Engine e business intelligence diventano un unico ciclo operativo/);
  assert.match(html, /CRM, Engine e BI chiudono il ciclo/);
  assert.match(html, /I risultati entrano nel CRM\. La BI li rende leggibili\./);
  assert.doesNotMatch(html, /Mentor|Qlik/i);
  assert.match(html, /01 · Tasso di risposta/);
  assert.match(html, /02 · Riattivazione/);
  assert.match(html, /03 · Raccolta/);
  assert.match(html, /Dimensione del database/);
  assert.match(html, /Numero di modelli attivati/);
  assert.match(html, /Il costo varia in base all’entità e alla qualità del database/);
  assert.doesNotMatch(html, /gara|Proposta · 2027|81\.750|90\.000|€ 700/i);
  assert.doesNotMatch(html, /Luma|Jarvis|collega AI|assistente personale|briefing proattivo|Needs attention|Report|Pivot|To do|History|Snoozed|personal working profile|personalizzazione conversazionale|policy ownership|rulebook|riaprono automaticamente|dialogo continuo|WhatsApp|AI operating system|dati governati|Dati che spiegano|Intelligenza che orienta|next best action|next-best-action/i);
});
