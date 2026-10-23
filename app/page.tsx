"use client";

import { useEffect, useMemo, useState } from "react";

const models = [
  {
    code: "01",
    short: "Lapsed",
    name: "Modello Lapsed",
    objective: "Redemption e riattivazione",
    thesis:
      "Distingue gli ex donatori su cui concentrare l’investimento, combinando storia donativa, risposta alle campagne e segnali di contesto.",
    signals: ["Recency, Frequency, Monetary", "Storico di risposta", "Valore e probabilità di ritorno"],
    outputs: ["Priorità 1 / Priorità 2", "Audience di riattivazione", "Reason code"],
    accent: "cyan",
  },
  {
    code: "02",
    short: "Regolari",
    name: "Propensione ai Regolari",
    objective: "Conversione e retention",
    thesis:
      "Individua i donatori one-off più vicini a una relazione continuativa e aiuta a proteggere la stabilità di chi dona già in modo regolare.",
    signals: ["Continuità e fedeltà", "Stabilità del sostegno", "Risposta alla relazione"],
    outputs: ["Propensione alla conversione", "Rischio di interruzione", "Priorità di caring"],
    accent: "blue",
  },
  {
    code: "03",
    short: "Online",
    name: "Engagement Online",
    objective: "Ottimizzazione e sinergia",
    thesis:
      "Legge la reale raggiungibilità e il comportamento digitale per coordinare canali, contenuti e pressione di contatto.",
    signals: ["Aperture e click", "Donazioni e conversioni", "Raggiungibilità multicanale"],
    outputs: ["Cluster di engagement", "Contact mix", "Audience digitali"],
    accent: "sky",
  },
  {
    code: "04",
    short: "HVD",
    name: "Modello HVD",
    objective: "Arricchimento e upgrade discovery",
    thesis:
      "Fa emergere il potenziale oltre il valore già donato, unendo comportamento, capacità contributiva e qualità della relazione.",
    signals: ["Valore puntuale e cumulato", "Geo-intelligence", "Network e segnali relazionali"],
    outputs: ["Indice di potenziale", "Pre-HVD e HVD", "Pipeline di relazione"],
    accent: "orange",
  },
  {
    code: "05",
    short: "Lasciti",
    name: "Lasciti Lookalike",
    objective: "Profilazione e trend discovery",
    thesis:
      "Parte dai profili noti per riconoscere affinità anagrafiche, geografiche e di fedeltà nella base donatori.",
    signals: ["Profilo seed", "Fedeltà nel tempo", "Somiglianze e trend"],
    outputs: ["Lookalike score", "Cluster di affinità", "Candidati da coltivare"],
    accent: "amber",
  },
  {
    code: "06",
    short: "Memorie",
    name: "Modello Memorie",
    objective: "Targetizzazione ottimizzata",
    thesis:
      "Riconosce le relazioni sensibili legate a persone care o assistite e guida una comunicazione rispettosa, pertinente e tracciabile.",
    signals: ["Legame relazionale", "Contesto della donazione", "Storia di caring"],
    outputs: ["Tag relazionali", "Regole di esclusione", "Journey dedicati"],
    accent: "violet",
  },
];

const decisionLayers = [
  {
    code: "01",
    label: "Base",
    question: "Quanto vale oggi?",
    body: "Una base economica coerente e comparabile, distinta per donatori occasionali e regolari.",
    example: "RFM Middle",
  },
  {
    code: "02",
    label: "Stato",
    question: "Dove si trova la relazione?",
    body: "Un lifecycle prevalente: nuovo, stabile, in crescita, in calo, lapsed, riattivato o regolare.",
    example: "In crescita",
  },
  {
    code: "03",
    label: "Segnali",
    question: "Che cosa sta succedendo?",
    body: "Engagement, trend, canali, interessi e pressione diventano segnali leggibili e aggiornabili.",
    example: "Digital engaged",
  },
  {
    code: "04",
    label: "Azione",
    question: "Che cosa facciamo adesso?",
    body: "Una priorità operativa con obiettivo, audience, canale, timing e motivazione disponibili al team.",
    example: "Conversione a regolare",
  },
];

const method = [
  {
    code: "01",
    title: "Analisi & Assessment",
    claim: "Capire cosa accade oggi",
    body: "KPI e obiettivi · processi di donor care · database e strumenti · interviste · donor journey attuale · SWOT integrata",
  },
  {
    code: "02",
    title: "Modelli & Segmenti",
    claim: "Costruire nuove letture",
    body: "Sei modelli DataProsper · integrazione delle sovrapposizioni · KPI per segmento",
  },
  {
    code: "03",
    title: "Implementazione su CRM",
    claim: "Trasformare insight in operatività",
    body: "Campi e regole CRM · dashboard di business intelligence · audience · pilot · formazione",
  },
  {
    code: "04",
    title: "Monitoraggio Continuo",
    claim: "Imparare dai risultati",
    body: "Performance · lift · drift · calibrazione · governance · handover",
  },
];

const investmentItems = [
  {
    code: "A",
    title: "Assessment e analisi",
    body: "Database, qualità, KPI, interviste, processi operativi e donor care, fotografia del donor journey attuale.",
  },
  {
    code: "B",
    title: "Modelli e prototipazione",
    body: "Selezione dei moduli, analisi, costruzione delle variabili, score, label, sovrapposizioni e validazione.",
  },
  {
    code: "C",
    title: "Segmenti e donor journey",
    body: "Obiettivi e KPI per segmento, priorità di attivazione, touchpoint, frequenze, contact plan e criteri di misurazione.",
  },
  {
    code: "D",
    title: "Integrazione e automazione",
    body: "Flussi verso CRM e piattaforme, audience e alert, regole di attivazione, specifiche e supervisione tecnica.",
  },
  {
    code: "E",
    title: "BI e attività aggiuntive",
    body: "Dashboard, visualizzazioni, data enrichment, sviluppi o approfondimenti aggiuntivi vengono dimensionati sul perimetro reale.",
  },
  {
    code: "F",
    title: "Servizio continuativo",
    body: "Elaborazioni periodiche, aggiornamento dei risultati, monitoraggio dei modelli e supporto operativo con fee mensile dedicata.",
  },
];

const team = [
  { name: "Marco Bellati", role: "Data Quality", org: "KIWI", image: "/team/marco-bellati.jpg" },
  { name: "Fiorenza Castelvetere", role: "Strategist", org: "DataProsper", image: "/team/fiorenza-castelvetere.jpg" },
  { name: "Fabio Molari", role: "Dati e analisi", org: "DataProsper", image: "/team/fabio-molari.jpg" },
  { name: "Antonio Schirone", role: "Direzione creativa", org: "DataProsper", image: "/team/antonio-schirone.jpg" },
  { name: "Marie Amadei", role: "Advisory", org: "DataProsper", image: "/team/marie-amadei.jpg" },
  { name: "Sebastiano Moneta", role: "Founder", org: "DataProsper", image: "/team/sebastiano-moneta.jpg" },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ProductLockup({ light = false }: { light?: boolean }) {
  return (
    <a className={`product-lockup ${light ? "product-lockup--light" : ""}`} href="#top" aria-label="ProsperData Engine, torna all’inizio">
      <span>ProsperData</span>
      <strong>Engine</strong>
    </a>
  );
}

export default function Home() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeLayer, setActiveLayer] = useState(3);
  useReveal();

  const model = models[activeModel];
  const layer = decisionLayers[activeLayer];
  const orbitModels = useMemo(() => models.map((item, index) => ({ ...item, index })), []);

  return (
    <main id="top">
      <header className="site-header">
        <ProductLockup light />
        <nav aria-label="Navigazione principale">
          <a href="#vision">Visione</a>
          <a href="#engine">Il sistema</a>
          <a href="#models">I modelli</a>
          <a href="#method">Metodo</a>
          <a href="#evidence">Evidenze</a>
          <a href="#investment">Investimento</a>
        </nav>
        <a className="header-cta" href="#contact">Parliamone <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__glow hero__glow--one" aria-hidden="true" />
        <div className="hero__glow hero__glow--two" aria-hidden="true" />
        <div className="hero__copy" data-reveal>
          <p className="eyebrow eyebrow--light">Decision intelligence per il fundraising</p>
          <h1 id="hero-title">ProsperData<br /><span>Engine</span></h1>
          <p className="hero__descriptor">Sistema di intelligence, segmentazione e attivazione</p>
          <p className="hero__lead">
            Sei modelli specialistici leggono valore, comportamento, potenziale e relazione. Un unico Engine combina i segnali e li trasforma in priorità operative per ogni donatore.
          </p>
          <div className="hero__actions">
            <a className="button button--light" href="#engine">Scopri come funziona <span aria-hidden="true">↓</span></a>
            <a className="text-link text-link--light" href="#models">Esplora i modelli <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-engine" aria-label="Sei modelli attorno al donatore">
          <div className="hero-engine__orbit hero-engine__orbit--outer" aria-hidden="true" />
          <div className="hero-engine__orbit hero-engine__orbit--inner" aria-hidden="true" />
          <div className="hero-engine__runner hero-engine__runner--one" aria-hidden="true"><span /></div>
          <div className="hero-engine__runner hero-engine__runner--two" aria-hidden="true"><span /></div>
          <div className="hero-engine__runner hero-engine__runner--three" aria-hidden="true"><span /></div>
          <div className="hero-engine__core">
            <small>UN DONATORE</small>
            <strong>Più segnali.</strong>
            <span>Una priorità.</span>
          </div>
          {orbitModels.map((item) => (
            <a
              className={`hero-engine__node hero-engine__node--${item.index + 1}`}
              href="#models"
              key={item.code}
              onClick={() => setActiveModel(item.index)}
              aria-label={`Vai al modello ${item.name}`}
            >
              <span>{item.code}</span>
              <strong>{item.short}</strong>
            </a>
          ))}
        </div>

        <div className="hero__footer">
          <span>DataProsper × Kiwi Data Science</span>
          <span>01 / Product overview</span>
        </div>
      </section>

      <section className="product-definition section" aria-labelledby="product-definition-title">
        <div className="product-definition__label" data-reveal>
          <span>PROSPERDATA ENGINE</span>
          <p>Definizione</p>
        </div>
        <p id="product-definition-title" data-reveal>
          <strong>ProsperData Engine è il framework specialistico di modellistica e prioritizzazione per il fundraising nonprofit.</strong> Produce segmenti, score, audience e criteri di attivazione integrabili nel CRM, negli strumenti di BI e nelle piattaforme operative del cliente.
        </p>
      </section>

      <section className="vision section" id="vision" aria-labelledby="vision-title">
        <div className="section-index" data-reveal><span>01</span><p>La visione</p></div>
        <div className="vision__headline" data-reveal>
          <h2 id="vision-title">Il database non ha bisogno<br />di altri segmenti.</h2>
          <p>Ha bisogno di una regia.</p>
        </div>
        <div className="vision__body" data-reveal>
          <p className="vision__lead">Una fascia economica dice quanto una persona ha donato. Non spiega se la relazione sta crescendo, se esiste una propensione, quale canale funziona o quale azione viene prima.</p>
          <p>ProsperData Engine supera la segmentazione come fotografia statica. Sovrappone letture complementari, rende visibili le ragioni di ogni priorità e collega l’analisi al lavoro quotidiano di fundraising e donor care.</p>
        </div>
        <div className="vision__principles" data-reveal>
          <article><span>01</span><strong>Donor-level</strong><p>La decisione parte dalla singola relazione, non dalla campagna.</p></article>
          <article><span>02</span><strong>Modulare</strong><p>Si attivano solo i modelli utili agli obiettivi e alla maturità dei dati.</p></article>
          <article><span>03</span><strong>Spiegabile</strong><p>Score e priorità conservano i segnali che li hanno determinati.</p></article>
          <article><span>04</span><strong>Continuo</strong><p>I risultati alimentano nuove elaborazioni e migliorano le decisioni.</p></article>
        </div>
      </section>

      <section className="engine section" id="engine" aria-labelledby="engine-title">
        <div className="section-index section-index--light" data-reveal><span>02</span><p>Il sistema decisionale</p></div>
        <div className="engine__heading" data-reveal>
          <h2 id="engine-title">Dai dati alla<br />prossima decisione.</h2>
          <p>ProsperData Engine organizza ogni lettura in quattro livelli. Il team non riceve solo un segmento: riceve le informazioni necessarie per scegliere l’azione prioritaria.</p>
        </div>

        <div className="decision-system" data-reveal>
          <div className="decision-system__nav" role="tablist" aria-label="Livelli dell’Engine">
            {decisionLayers.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeLayer === index}
                className={activeLayer === index ? "is-active" : ""}
                onClick={() => setActiveLayer(index)}
                key={item.code}
              >
                <span>{item.code}</span><strong>{item.label}</strong><i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
          <div className="decision-system__detail" role="tabpanel">
            <span className="decision-system__number">{layer.code}</span>
            <p>{layer.label.toUpperCase()}</p>
            <h3>{layer.question}</h3>
            <div className="decision-system__detail-bottom">
              <p>{layer.body}</p>
              <div><small>ESEMPIO DI OUTPUT</small><strong>{layer.example}</strong></div>
            </div>
          </div>
        </div>

        <div className="engine-overlap" data-reveal>
          <div className="engine-overlap__copy">
            <span>SOVRAPPOSIZIONI CHE DIVENTANO DECISIONI</span>
            <h3>Una persona.<br />Più letture valide.</h3>
            <p>Un donatore può essere contemporaneamente RFM Middle, ad alta propensione alla regolarizzazione e digitalmente ingaggiato. ProsperData Engine combina queste letture, stabilisce le priorità e restituisce le informazioni utili per definire le azioni da attivare.</p>
          </div>
          <div className="engine-overlap__visual" aria-label="Esempio di tre letture combinate in una priorità">
            <div className="signal signal--one"><span>RFM</span><strong>Middle</strong></div>
            <div className="signal signal--two"><span>PROPENSIONE</span><strong>Alta</strong></div>
            <div className="signal signal--three"><span>ENGAGEMENT</span><strong>Digitale</strong></div>
            <div className="engine-overlap__result">
              <small>AZIONE PRIORITARIA</small>
              <strong>Conversione<br />a regolare</strong>
              <span>Canale digitale · priorità alta</span>
            </div>
          </div>
        </div>

        <div className="engine-outputs" data-reveal>
          <p>L’Engine restituisce output utilizzabili dai sistemi e dalle persone.</p>
          <div>
            {[["01", "Label", "Che cosa vediamo"], ["02", "Score", "Con quale intensità"], ["03", "Audience", "Su chi agire"], ["04", "Alert", "Quando intervenire"]].map(([code, title, body]) => (
              <article key={code}><span>{code}</span><strong>{title}</strong><small>{body}</small></article>
            ))}
          </div>
        </div>
      </section>

      <section className="models section" id="models" aria-labelledby="models-title">
        <div className="section-index" data-reveal><span>03</span><p>I moduli</p></div>
        <div className="models__heading" data-reveal>
          <h2 id="models-title">Sei modelli specialistici.<br />Un’unica architettura.</h2>
          <p>L’Engine è modulare: ogni organizzazione sceglie le letture più rilevanti e può ampliare il sistema nel tempo.</p>
        </div>

        <div className="model-explorer" data-reveal>
          <div className="model-explorer__tabs" role="tablist" aria-label="Modelli ProsperData Engine">
            {models.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeModel === index}
                className={activeModel === index ? "is-active" : ""}
                onClick={() => setActiveModel(index)}
                key={item.code}
              >
                <span>{item.code}</span><strong>{item.short}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <article className={`model-detail model-detail--${model.accent}`} role="tabpanel">
            <div className="model-detail__top">
              <span>MODELLO {model.code}</span>
              <strong>{model.objective}</strong>
            </div>
            <h3>{model.name}</h3>
            <p className="model-detail__thesis">{model.thesis}</p>
            <div className="model-detail__columns">
              <div><span>SEGNALI PRINCIPALI</span>{model.signals.map((signal) => <p key={signal}>{signal}</p>)}</div>
              <div><span>OUTPUT OPERATIVI</span>{model.outputs.map((output) => <p key={output}>{output}</p>)}</div>
            </div>
          </article>
        </div>

        <p className="models__note" data-reveal>Non tutti i modelli devono partire insieme. Il perimetro si definisce sugli obiettivi, sulla disponibilità dei dati e sulla capacità di attivazione dell’organizzazione.</p>
      </section>

      <section className="method section" id="method" aria-labelledby="method-title">
        <div className="section-index" data-reveal><span>04</span><p>Il metodo</p></div>
        <div className="method__heading" data-reveal>
          <h2 id="method-title">Comprendere. Modellare.<br />Attivare. Migliorare.</h2>
          <p>La risposta al brief è un percorso in quattro fasi cumulative. Ogni fase produce un output utilizzabile dalla successiva e porta VIDAS dalla diagnosi alla capacità operativa interna.</p>
        </div>
        <div className="method__steps" data-reveal>
          {method.map((item) => (
            <article key={item.code}>
              <header><span>{item.code}</span><small>Fase</small></header>
              <h3>{item.title}</h3>
              <strong>{item.claim}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="method__outcomes" data-reveal>
          <span>I tre risultati richiesti da VIDAS</span>
          <div><strong>01</strong><p>Analisi multidimensionale</p></div>
          <div><strong>02</strong><p>Segmentazione evoluta</p></div>
          <div><strong>03</strong><p>Operativizzazione in CRM e BI</p></div>
        </div>

        <div className="operational-flow" data-reveal>
          <div className="operational-flow__intro">
            <span>FASE 03 · IL CICLO OPERATIVO</span>
            <h3>Il sistema entra<br />nel lavoro quotidiano.</h3>
            <p>Il sistema non procede in linea retta. Il CRM è insieme fonte dei dati e ambiente di attivazione: invia il patrimonio informativo all’Engine tramite ETL e riceve label, score, audience e alert. La business intelligence legge i risultati e chiude il ciclo, riportando le revisioni verso assessment, KPI e modelli.</p>
          </div>

          <section className="operations-band operations-band--design" aria-labelledby="operations-design-title">
            <div className="operations-band__heading">
              <span>FASI 01–03 · FLUSSO COMPLETO</span>
              <h4 id="operations-design-title">Dagli obiettivi al lavoro quotidiano</h4>
            </div>
            <div className="operations-design-flow">
              <article><span>FASE 01 · ASSESSMENT VIDAS</span><strong>Definire ciò che conta</strong><p>KPI e obiettivi, informazioni disponibili, dimensioni del database, donor care e pratiche operative.</p></article>
              <div className="operations-arrow" aria-hidden="true"><small>DEFINISCE</small><i>→</i></div>
              <article><span>FASE 02 · KPI E MODELLI</span><strong>Tradurre gli obiettivi</strong><p>Analisi del modello, procedure ETL, prototipazione e criteri di validazione.</p></article>
              <div className="operations-arrow" aria-hidden="true"><small>PRODUCE</small><i>→</i></div>
              <article className="operations-design-flow__result"><span>INPUT PER L’ENGINE</span><strong>Criteri e prototipi validati</strong><p>Le regole definite guidano le elaborazioni successive.</p></article>
              <div className="operations-arrow" aria-hidden="true"><small>ATTIVA</small><i>→</i></div>
              <article className="operations-design-flow__activation"><span>FASE 03 · OPERATIVIZZAZIONE</span><strong>Mettere il sistema al lavoro</strong><p>CRM, ProsperData Engine e business intelligence diventano un unico ciclo operativo.</p></article>
            </div>
          </section>

          <section className="operations-band operations-band--runtime" aria-labelledby="operations-runtime-title">
            <div className="operations-band__heading operations-band__heading--light">
              <span>FASE 03 · DETTAGLIO OPERATIVO</span>
              <h4 id="operations-runtime-title">CRM, Engine e BI chiudono il ciclo</h4>
            </div>
            <div className="operations-runtime-flow">
              <article><span>CRM</span><strong>Patrimonio e attivazione</strong><p>Dati, storico, campagne, risposte ed esiti della relazione.</p></article>
              <div className="operations-exchange" aria-label="Scambio bidirezionale tra CRM e ProsperData Engine">
                <div><span>ETL · DATI</span><i aria-hidden="true">→</i></div>
                <div><i aria-hidden="true">←</i><span>LABEL · SCORE · AUDIENCE · ALERT</span></div>
              </div>
              <article className="operations-runtime-flow__engine"><span>PROSPERDATA ENGINE</span><strong>Elaborare e assegnare</strong><p>Data quality, applicazione dei modelli e regole di prioritizzazione.</p></article>
              <div className="operations-output" aria-label="Risultati elaborati dall’Engine verso gli strumenti di business intelligence"><span>RISULTATI</span><i aria-hidden="true">→</i></div>
              <article className="operations-runtime-flow__bi"><span>BUSINESS INTELLIGENCE</span><strong>Leggere e monitorare</strong><p>Dashboard, KPI, scostamenti e segnali di revisione.</p></article>
            </div>
          </section>

          <section className="operations-band operations-band--learning" aria-labelledby="operations-learning-title">
            <div className="operations-band__heading operations-band__heading--learning">
              <h4 id="operations-learning-title">I risultati entrano nel CRM. La BI li rende leggibili.</h4>
              <p>Attivazioni, risposte ed esiti diventano KPI e segnali per il monitoraggio. Le evidenze aggiornano criteri, priorità e modelli.</p>
            </div>
            <div className="operations-learning-flow">
              <article><span>01</span><strong>Risultati nel CRM</strong><p>Attivazioni, risposte ed esiti operativi.</p></article>
              <i aria-hidden="true">→</i>
              <article className="operations-learning-flow__bi"><span>02</span><strong>Lettura in BI</strong><p>Dashboard, KPI e scostamenti.</p></article>
              <i aria-hidden="true">→</i>
              <article><span>03</span><strong>Monitoraggio</strong><p>Performance, lift e segnali di drift.</p></article>
              <i aria-hidden="true">→</i>
              <article className="operations-learning-flow__revision"><span>04 · REVISIONE</span><strong>Assessment, KPI e modelli</strong><p>Le evidenze riaprono il ciclo successivo.</p></article>
            </div>
            <p className="operations-cycle-return"><span aria-hidden="true">↺</span><strong>Il monitoraggio non chiude il progetto: riapre il ciclo.</strong></p>
          </section>
        </div>
      </section>

      <section className="evidence section" id="evidence" aria-labelledby="evidence-title">
        <div className="section-index section-index--light" data-reveal><span>05</span><p>Evidenze</p></div>
        <div className="evidence__heading" data-reveal>
          <h2 id="evidence-title">La modellistica<br />produce differenze misurabili.</h2>
          <p>Esperienze presentate in forma anonima nel rispetto degli accordi di riservatezza.</p>
        </div>

        <article className="case case--lapsed" data-reveal>
          <div className="case__copy">
            <span>CASO APPLICATIVO · Lapsed</span>
            <h3>Il modello supera<br />la selezione interna.</h3>
            <p>Su donatori inattivi da oltre 60 mesi, la selezione ProsperData è stata confrontata con il modello già utilizzato dall’organizzazione.</p>
            <small>4 mailing · 160.000 invii · 4 varianti di messaggio</small>
          </div>
          <div className="case__metrics" role="group" aria-label="Tre risultati collegati dello stesso confronto">
            <div><span className="case__metric-kicker">01 · Tasso di risposta</span><strong>1,82%</strong><span className="case__metric-label">response rate medio</span><small>vs 1,16% della selezione interna</small></div>
            <div><span className="case__metric-kicker">02 · Riattivazione</span><strong>+56,9%</strong><span className="case__metric-label">riattivazioni stimate</span><small>a parità di confronto</small></div>
            <div><span className="case__metric-kicker">03 · Raccolta</span><strong>+35%</strong><span className="case__metric-label">raccolta</span><small>rispetto alla selezione standard</small></div>
          </div>
        </article>

        <div className="experience" data-reveal>
          <div className="experience__intro"><span>ESPERIENZA APPLICATA</span><h3>Non solo modelli.<br />Conoscenza del nonprofit.</h3></div>
          <div className="experience__numbers">
            <article><strong>9</strong><span>organizzazioni</span><p>Modellistica Lapsed</p></article>
            <article><strong>3</strong><span>organizzazioni</span><p>Modelli HVD</p></article>
            <article><strong>8</strong><span>organizzazioni</span><p>Mailplan strategici e operativi</p></article>
          </div>
        </div>
      </section>

      <section className="partnership section" id="partnership" aria-labelledby="partnership-title">
        <div className="section-index" data-reveal><span>06</span><p>Le competenze</p></div>
        <div className="partnership__heading" data-reveal>
          <h2 id="partnership-title">Strategia di fundraising.<br />Data science. Messa a terra.</h2>
          <p>DataProsper e Kiwi Data Science uniscono conoscenza del settore nonprofit, qualità del dato, modellistica e capacità di tradurre l’analisi in processi utilizzabili.</p>
        </div>
        <div className="partner-lockups" data-reveal>
          <div className="partner-lockups__dataprosper"><img src="/dataprosper.png" alt="DataProsper" /><p>Strategia, segmentazione, donor journey, campaign intelligence e governance.</p></div>
          <span aria-hidden="true">×</span>
          <div className="partner-lockups__kiwi"><img src="/kiwi.png" alt="Kiwi Data Science" /><p>Data quality, architettura, modellistica, pipeline e integrazione tecnica.</p></div>
        </div>
        <div className="team-strip" data-reveal>
          {team.map((member) => (
            <article key={member.name}>
              <img src={member.image} alt="" />
              <div><span>{member.org}</span><strong>{member.name}</strong><small>{member.role}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="investment section" id="investment" aria-labelledby="investment-title">
        <div className="section-index section-index--light" data-reveal><span>07</span><p>Configurazione e investimento</p></div>
        <div className="investment__heading" data-reveal>
          <h2 id="investment-title">Un perimetro costruito<br />sulla complessità reale.</h2>
          <p>Il costo varia in base all’entità e alla qualità del database, ai moduli scelti e al livello di integrazione richiesto. Dopo una verifica preliminare definiamo attività, tempi e investimento in modo trasparente.</p>
        </div>
        <div className="investment__grid" data-reveal>
          {investmentItems.map((item) => (
            <article key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.body}</p></article>
          ))}
        </div>
        <div className="investment__variables" data-reveal>
          <span>L’INVESTIMENTO DIPENDE DA</span>
          <div><strong>Dimensione del database</strong><strong>Qualità e disponibilità dei dati</strong><strong>Numero di modelli attivati</strong><strong>Integrazioni e frequenza di aggiornamento</strong></div>
        </div>
      </section>

      <section className="contact section" id="contact" aria-labelledby="contact-title">
        <div className="contact__eyebrow" data-reveal>PROSPERDATA ENGINE</div>
        <div className="contact__content" data-reveal>
          <h2 id="contact-title">Quale decisione vuoi<br />rendere più semplice?</h2>
          <div>
            <p>Partiamo dagli obiettivi, dal database e dalle decisioni che oggi richiedono più tempo o più intuizione.</p>
            <a className="button button--dark" href="https://dataprosper.it/">Parliamone con DataProsper <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="contact__ghost" aria-hidden="true">ENGINE</div>
      </section>

      <footer className="footer">
        <ProductLockup light />
        <p>Decision intelligence per il fundraising</p>
        <div><a href="#top">Torna su ↑</a><span>DataProsper × Kiwi Data Science</span></div>
      </footer>
    </main>
  );
}
