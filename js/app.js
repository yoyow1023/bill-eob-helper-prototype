/* Screen flow, language, and browser-only history. No network calls. */
(function (root) {
  "use strict";

  var LANG_KEY = "billEobHelper.lang";
  var HISTORY_KEY = "billEobHelper.history";
  var SESSION_KEY = "billEobHelper.session";
  var HISTORY_CAP = 30;
  var VIEWS = ["home", "documents", "summary", "bill", "eob", "compare", "questions", "history", "about"];
  var GLOSSARY = ["eob", "claim", "cpt", "billed", "allowed", "writeOff", "planPaid", "deductible", "copay", "coinsurance", "patient", "inNetwork", "duplicate"];

  var state = {
    lang: "en",
    view: "home",
    anchor: null,
    session: emptySession(),
    history: [],
    menuOpen: false
  };

  function emptySession() {
    return {
      loaded: false,
      source: null,
      fileName: null,
      historyId: null,
      historySavedAt: null,
      historyLabel: null
    };
  }

  function t(path, vars) {
    return root.BillEob.t(path, vars, state.lang);
  }

  function money(cents) {
    return root.BillEob.money(cents);
  }

  function packet() {
    return root.BillEob.packet;
  }

  function h(tag, props, children) {
    var node = document.createElement(tag);
    var key;
    props = props || {};
    for (key in props) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
      if (props[key] == null || props[key] === false) continue;
      if (key === "class") node.className = props[key];
      else if (key === "text") node.textContent = props[key];
      else node.setAttribute(key, props[key] === true ? "" : String(props[key]));
    }
    (children || []).forEach(function (child) {
      if (child == null || child === false) return;
      node.append(child.nodeType ? child : document.createTextNode(String(child)));
    });
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function announce(message) {
    var live = document.getElementById("status-live");
    if (!live) return;
    live.textContent = "";
    window.setTimeout(function () {
      live.textContent = message;
    }, 30);
  }

  function uid() {
    if (root.crypto && typeof root.crypto.randomUUID === "function") return root.crypto.randomUUID();
    return "id-" + Date.now().toString(36) + "-" + Math.random().toString(16).slice(2);
  }

  function readLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === "es" || stored === "en") return stored;
    } catch (error) {
      return "en";
    }
    return "en";
  }

  function writeLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
      return true;
    } catch (error) {
      return false;
    }
  }

  function readHistory() {
    try {
      var raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      var data = JSON.parse(raw);
      if (!data || !Array.isArray(data.items)) return [];
      return data.items.filter(function (item) {
        return item && typeof item.id === "string" && typeof item.label === "string" && typeof item.savedAt === "string";
      });
    } catch (error) {
      return [];
    }
  }

  function writeHistory() {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify({ version: 1, items: state.history }));
      return true;
    } catch (error) {
      return false;
    }
  }

  function readSession() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return emptySession();
      var data = JSON.parse(raw);
      if (!data || data.loaded !== true) return emptySession();
      return {
        loaded: true,
        source: data.source || "sample",
        fileName: data.fileName || null,
        historyId: data.historyId || null,
        historySavedAt: data.historySavedAt || null,
        historyLabel: data.historyLabel || null
      };
    } catch (error) {
      return emptySession();
    }
  }

  function writeSession() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state.session));
    } catch (error) {
      /* The sample can still stay open for this page view. */
    }
  }

  function parseHash() {
    var raw = (location.hash || "").replace(/^#\/?/, "");
    if (!raw) return { view: "home", anchor: null };
    var bits = raw.split("/");
    var view = VIEWS.indexOf(bits[0]) === -1 ? "home" : bits[0];
    return { view: view, anchor: bits[1] || null };
  }

  function go(view, anchor) {
    var next = "#/" + view + (anchor ? "/" + anchor : "");
    if (location.hash === next) render(true);
    else location.hash = next;
  }

  function setMenu(open) {
    state.menuOpen = open;
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function loadSample(source, fileName) {
    state.session = {
      loaded: true,
      source: source,
      fileName: fileName || null,
      historyId: null,
      historySavedAt: null,
      historyLabel: null
    };
    writeSession();
    announce(t("status.loadedSample"));
    if (state.view === "documents") render(false);
  }

  function openHistory(item) {
    state.session = {
      loaded: true,
      source: "history",
      fileName: null,
      historyId: item.id,
      historySavedAt: item.savedAt,
      historyLabel: item.label
    };
    writeSession();
    go("summary");
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "es") return;
    state.lang = lang;
    writeLang(lang);
    render(false);
    announce(t("langChanged"));
  }

  function pill(kind, labelKey) {
    var cls = kind === "match" ? "pill pill-match" : kind === "mismatch" ? "pill pill-mismatch" : kind === "teaching" ? "pill pill-teaching" : "pill pill-dup";
    return h("p", { class: cls, text: t(labelKey) });
  }

  function identityStrip() {
    var p = packet();
    return h("div", { class: "strip" }, [
      h("p", { class: "stamp", text: "Sample data / Datos de ejemplo — not a real bill" }),
      h("p", { class: "strip-title", text: p.patient }),
      h("p", { text: p.provider + " · " + p.insurer + " — " + p.planLabel }),
      h("p", { class: "quiet" }, [
        t("masthead.account") + " ",
        nowrap(p.accountId),
        " · " + t("masthead.claim") + " ",
        nowrap(p.claimId),
        " · " + t("masthead.member") + " ",
        nowrap(p.memberId)
      ]),
      h("p", { class: "quiet", text: t("masthead.service") + ": " + root.BillEob.formatDate(p.serviceDate, state.lang) })
    ]);
  }

  function nowrap(value) {
    return h("span", { class: "nowrap", text: value });
  }

  function fact(label, value) {
    var dd = h("dd", {});
    if (value && value.nodeType) dd.append(value);
    else dd.textContent = value;
    return h("div", {}, [
      h("dt", { text: label }),
      dd
    ]);
  }

  function fullMasthead() {
    var p = packet();
    var d = function (iso) { return root.BillEob.formatDate(iso, state.lang); };
    return h("section", { class: "card masthead" }, [
      h("p", { class: "stamp", text: "Sample data / Datos de ejemplo — not a real bill" }),
      h("p", { class: "kicker", text: t("masthead.packet", { id: p.id }) }),
      h("p", { class: "masthead-name", text: p.patient }),
      h("p", { class: "quiet", text: t("masthead.fictional") }),
      h("dl", { class: "facts" }, [
        fact(t("masthead.provider"), p.provider),
        fact(t("masthead.insurer"), p.insurer + " — " + p.planLabel),
        fact(t("masthead.member"), nowrap(p.memberId)),
        fact(t("masthead.group"), nowrap(p.groupId)),
        fact(t("masthead.account"), nowrap(p.accountId)),
        fact(t("masthead.statement"), nowrap(p.statementId)),
        fact(t("masthead.claim"), nowrap(p.claimId)),
        fact(t("masthead.service"), d(p.serviceDate)),
        fact(t("masthead.billDate"), d(p.billDate)),
        fact(t("masthead.eobDate"), d(p.eobDate)),
        fact(t("masthead.network"), t("masthead.inNetwork"))
      ])
    ]);
  }

  function rulesCard() {
    var p = packet();
    return h("section", { class: "card" }, [
      h("h2", { text: t("masthead.rulesTitle") }),
      h("p", { text: t("masthead.rulesNote") }),
      h("dl", { class: "facts" }, [
        fact(t("masthead.deductible"), money(p.deductibleAnnual)),
        fact(t("masthead.met"), money(p.deductibleMetBefore)),
        fact(t("masthead.remaining"), money(p.deductibleRemainingBefore)),
        fact(t("masthead.coinsurance"), p.coinsuranceRate + "%"),
        fact(t("masthead.copay"), money(4000))
      ]),
      h("p", { class: "quiet", text: t("masthead.copayNote") })
    ]);
  }

  function glossary(keys) {
    return h("dl", { class: "glossary" }, keys.map(function (key) {
      return h("div", {}, [
        h("dt", { text: t("glossaryLabels." + key) }),
        h("dd", { text: t("glossary." + key) })
      ]);
    }));
  }

  function amountList(line) {
    var rows = [];
    function add(label, value, flag) {
      rows.push(h("div", { class: flag ? "amt amt-flag" : "amt" }, [
        h("dt", { text: label }),
        h("dd", { class: "num", text: value })
      ]));
    }
    add(t("line.billed"), money(line.billed), false);
    if (line.onEob) {
      add(t("line.allowed"), money(line.allowed), false);
      add(t("line.writeOff"), money(line.writeOff), false);
      add(t("line.deductible"), money(line.deductible), false);
      add(t("line.copay"), money(line.copay), false);
      add(t("line.coinsurance"), money(line.coinsurance), false);
      add(t("line.planPaid"), money(line.planPaid), false);
      add(t("line.patient"), money(line.eobPatient), line.flag === "mismatch");
    } else {
      add(t("line.onEob"), t("line.no"), true);
    }
    if (line.onBill) add(t("line.billAsks"), money(line.billAsks), line.flag !== "match");
    return h("dl", { class: "amounts" }, rows);
  }

  function mathTable(line) {
    var p = packet();
    return h("table", { class: "math" }, [
      h("caption", { text: t("line.mathCaption") }),
      h("tbody", {}, [
        h("tr", {}, [
          h("th", { scope: "row", text: t("math.rowDeductible") }),
          h("td", { class: "num", text: money(line.deductible) })
        ]),
        h("tr", {}, [
          h("th", { scope: "row", text: t("math.rowCoinsurance", { rate: p.coinsuranceRate, base: money(line.coinsuranceBase) }) }),
          h("td", { class: "num", text: money(line.coinsurance) })
        ]),
        h("tr", {}, [
          h("th", { scope: "row", text: t("math.rowPlan") }),
          h("td", { class: "num", text: money(line.planPaid) })
        ]),
        h("tr", { class: "math-total" }, [
          h("th", { scope: "row", text: t("math.rowPatient") }),
          h("td", { class: "num", text: money(line.eobPatient) })
        ])
      ])
    ]);
  }

  function lineArticle(line, index, total, prefix) {
    var explained = root.BillEob.explainLine(line, state.lang);
    var pills = h("div", { class: "pills" }, [
      pill(line.flag, "line." + line.flag)
    ]);
    if (line.teaching) pills.append(pill("teaching", "line.teaching"));
    var jump = null;
    var jumpText = "";
    if (line.flag === "mismatch") {
      jump = "#/compare/issue-mismatch";
      jumpText = t("compare.jumpMismatch");
    } else if (line.flag === "duplicate") {
      jump = "#/compare/issue-duplicate";
      jumpText = t("compare.jumpDup");
    } else if (line.teaching) {
      jump = "#/compare/issue-math";
      jumpText = t("compare.jumpMath", { amount: money(packet().totals.eobPatient) });
    }
    return h("article", { class: "card line-card line-" + line.flag, id: prefix + "-line-" + line.id }, [
      h("p", { class: "kicker", text: t(prefix === "bill" ? "bill.lineKicker" : "eob.lineKicker", { n: index + 1, total: total }) }),
      h("h2", { text: line.name[state.lang] }),
      h("p", { class: "code", text: t("line.code") + " CPT " + line.cpt + " · " + t("line.charge") + " " + line.chargeId }),
      pills,
      amountList(line),
      line.teaching ? mathTable(line) : null,
      h("h3", { text: t("line.plain") }),
      h("div", { class: "prose" }, explained.paragraphs.map(function (paragraph) {
        return h("p", { text: paragraph });
      })),
      jump ? h("p", {}, [
        h("a", { href: jump, text: jumpText })
      ]) : null,
      h("details", {}, [
        h("summary", { text: t("line.words") }),
        glossary(explained.words)
      ])
    ]);
  }

  function emptyState() {
    return h("div", { class: "card empty-state" }, [
      h("h1", { tabindex: "-1", text: t("empty.title") }),
      h("p", { text: t("empty.body") }),
      h("p", {}, [
        h("a", { class: "button button-primary", href: "#/documents", text: t("empty.action") })
      ])
    ]);
  }

  function renderSummary(rootNode) {
    if (!state.session.loaded) {
      rootNode.append(emptyState());
      return;
    }
    var p = packet();
    var blocks = [
      h("h1", { tabindex: "-1", text: t("summary.h1") }),
      h("p", { class: "lede", text: t("summary.lede") })
    ];
    if (state.session.fileName) {
      blocks.push(h("p", { class: "note", text: t("documents.filePicked", { name: state.session.fileName }) }));
    }
    if (state.session.historyId && state.session.historySavedAt) {
      blocks.push(h("p", { class: "note", text: t("summary.fromHistory", {
        when: root.BillEob.formatWhen(state.session.historySavedAt, state.lang),
        label: state.session.historyLabel || ""
      }) }));
    }
    blocks.push(fullMasthead());
    blocks.push(rulesCard());
    blocks.push(h("section", { class: "card" }, [
      h("h2", { class: "visually-hidden", text: t("compare.totalsCaption") }),
      h("dl", { class: "totals" }, [
        h("div", { class: "total" }, [
          h("dt", { text: t("summary.eobLists") }),
          h("dd", { class: "num", text: money(p.totals.eobPatient) })
        ]),
        h("div", { class: "total" }, [
          h("dt", { text: t("summary.billAsks") }),
          h("dd", { class: "num", text: money(p.totals.billAsks) })
        ]),
        h("div", { class: "total total-flag" }, [
          h("dt", { text: t("summary.gap") }),
          h("dd", { class: "num", text: money(p.totals.gap) })
        ])
      ]),
      h("p", { text: t("summary.gapNote") })
    ]));
    blocks.push(h("section", { class: "card" }, [
      h("h2", { text: t("summary.lookTitle") }),
      h("ol", { class: "look-list" }, [
        h("li", { text: t("summary.look1") }),
        h("li", { text: t("summary.look2") }),
        h("li", { text: t("summary.look3") })
      ])
    ]));
    blocks.push(h("div", { class: "actions" }, [
      h("a", { class: "button button-primary", href: "#/bill", text: t("summary.ctaBill") }),
      h("a", { class: "button button-secondary", href: "#/eob", text: t("summary.ctaEob") }),
      h("a", { class: "button button-secondary", href: "#/compare", text: t("summary.ctaCompare") }),
      h("a", { class: "button button-secondary", href: "#/questions", text: t("summary.ctaQuestions") })
    ]));
    blocks.push(h("section", { class: "card" }, [
      h("h2", { text: t("summary.glossaryTitle") }),
      h("p", { text: t("summary.glossaryNote") }),
      glossary(GLOSSARY)
    ]));
    blocks.forEach(function (node) { rootNode.append(node); });
  }

  function renderBill(rootNode) {
    if (!state.session.loaded) {
      rootNode.append(emptyState());
      return;
    }
    var lines = packet().lines.filter(function (line) { return line.onBill; });
    rootNode.append(h("h1", { tabindex: "-1", text: t("bill.h1") }));
    rootNode.append(h("p", { class: "lede", text: t("bill.lede") }));
    rootNode.append(identityStrip());
    lines.forEach(function (line, index) {
      rootNode.append(lineArticle(line, index, lines.length, "bill"));
    });
  }

  function renderEob(rootNode) {
    if (!state.session.loaded) {
      rootNode.append(emptyState());
      return;
    }
    var lines = packet().lines.filter(function (line) { return line.onEob; });
    var dup = root.BillEob.lineById("xray-dup");
    rootNode.append(h("h1", { tabindex: "-1", text: t("eob.h1") }));
    rootNode.append(h("p", { class: "lede", text: t("eob.lede") }));
    rootNode.append(identityStrip());
    lines.forEach(function (line, index) {
      rootNode.append(lineArticle(line, index, lines.length, "eob"));
    });
    rootNode.append(h("aside", { class: "card flag-card" }, [
      h("h2", { text: t("eob.missingTitle") }),
      h("p", { text: t("eob.missingBody", {
        service: dup.name[state.lang],
        cpt: dup.cpt,
        chargeId: dup.chargeId,
        amount: money(dup.billAsks)
      }) }),
      h("p", {}, [
        h("a", { href: "#/bill/xray-dup", text: t("compare.openBill") })
      ])
    ]));
  }

  function mathStep(title, body, added, running, remaining, table) {
    return h("li", { class: "math-step" }, [
      h("h3", { text: title }),
      h("p", { text: body }),
      table || null,
      h("dl", { class: "running" }, [
        added == null ? null : h("div", {}, [
          h("dt", { text: t("math.add") }),
          h("dd", { class: "num", text: money(added) })
        ]),
        h("div", {}, [
          h("dt", { text: t("math.running") }),
          h("dd", { class: "num", text: money(running) })
        ]),
        remaining == null ? null : h("div", {}, [
          h("dt", { text: t("math.remaining") }),
          h("dd", { class: "num", text: money(remaining) })
        ])
      ])
    ]);
  }

  function renderMathList() {
    var p = packet();
    var items = [];
    items.push(mathStep(
      t("math.startTitle"),
      t("math.startBody", {
        met: money(p.deductibleMetBefore),
        annual: money(p.deductibleAnnual),
        remaining: money(p.deductibleRemainingBefore)
      }),
      null,
      0,
      p.deductibleRemainingBefore,
      null
    ));
    var running = 0;
    p.lines.filter(function (line) { return line.onEob; }).forEach(function (line) {
      var body;
      var table = null;
      if (line.id === "visit") {
        body = t("math.visitBody", {
          cpt: line.cpt,
          chargeId: line.chargeId,
          copay: money(line.copay),
          remaining: money(line.deductibleRemainingAfter),
          plan: money(line.planPaid),
          allowed: money(line.allowed)
        });
      } else if (line.id === "cbc") {
        body = t("math.cbcBody", {
          cpt: line.cpt,
          chargeId: line.chargeId,
          allowed: money(line.allowed),
          plan: money(line.planPaid),
          remaining: money(line.deductibleRemainingAfter)
        });
      } else if (line.id === "bmp") {
        body = t("math.bmpBody", {
          cpt: line.cpt,
          chargeId: line.chargeId,
          allowed: money(line.allowed),
          deductible: money(line.deductible),
          base: money(line.coinsuranceBase),
          rate: p.coinsuranceRate,
          coinsurance: money(line.coinsurance),
          planShare: 100 - p.coinsuranceRate,
          plan: money(line.planPaid),
          remaining: money(line.deductibleRemainingAfter)
        });
        table = mathTable(line);
      } else {
        body = t("math.xrayBody", {
          cpt: line.cpt,
          chargeId: line.chargeId,
          allowed: money(line.allowed),
          rate: p.coinsuranceRate,
          coinsurance: money(line.coinsurance),
          plan: money(line.planPaid)
        });
      }
      running += line.eobPatient;
      items.push(mathStep(
        t("math." + (line.id === "visit" ? "visitTitle" : line.id === "cbc" ? "cbcTitle" : line.id === "bmp" ? "bmpTitle" : "xrayTitle")),
        body,
        line.eobPatient,
        running,
        line.deductibleRemainingAfter,
        table
      ));
    });
    items.push(h("li", { class: "math-step math-done" }, [
      h("h3", { text: t("math.doneTitle") }),
      h("p", { text: t("math.doneBody", { total: money(p.totals.eobPatient), bill: money(p.totals.billAsks) }) })
    ]));
    return h("ol", { class: "math-steps" }, items);
  }

  function renderCompare(rootNode) {
    if (!state.session.loaded) {
      rootNode.append(emptyState());
      return;
    }
    var p = packet();
    var xray = root.BillEob.lineById("xray");
    var dup = root.BillEob.lineById("xray-dup");
    var gapX = xray.billAsks - xray.eobPatient;
    rootNode.append(h("h1", { tabindex: "-1", text: t("compare.h1") }));
    rootNode.append(h("p", { class: "lede", text: t("compare.lede") }));
    rootNode.append(identityStrip());
    rootNode.append(h("nav", { class: "jump", "aria-label": t("compare.jump") }, [
      h("a", { href: "#/compare/issue-mismatch", text: t("compare.jumpMismatch") }),
      h("a", { href: "#/compare/issue-duplicate", text: t("compare.jumpDup") }),
      h("a", { href: "#/compare/issue-math", text: t("compare.jumpMath", { amount: money(p.totals.eobPatient) }) })
    ]));
    rootNode.append(h("section", { class: "card" }, [
      h("h2", { text: t("compare.totalsCaption") }),
      h("dl", { class: "totals" }, [
        h("div", { class: "total" }, [
          h("dt", { text: t("summary.billAsks") }),
          h("dd", { class: "num", text: money(p.totals.billAsks) })
        ]),
        h("div", { class: "total" }, [
          h("dt", { text: t("summary.eobLists") }),
          h("dd", { class: "num", text: money(p.totals.eobPatient) })
        ]),
        h("div", { class: "total total-flag" }, [
          h("dt", { text: t("summary.gap") }),
          h("dd", { class: "num", text: money(p.totals.gap) })
        ])
      ]),
      h("p", { text: t("summary.gapNote") })
    ]));
    rootNode.append(h("section", { class: "card info-card", id: "issue-ordinary" }, [
      h("h2", { text: t("compare.writeoffTitle") }),
      h("p", { text: t("compare.writeoffBody") })
    ]));
    rootNode.append(h("section", { class: "card flag-card", id: "issue-mismatch" }, [
      h("p", { class: "pill pill-mismatch", text: t("line.mismatch") }),
      h("h2", { text: t("compare.mismatchTitle") }),
      h("p", { text: t("compare.mismatchBody", {
        service: xray.name[state.lang],
        cpt: xray.cpt,
        chargeId: xray.chargeId,
        billAsks: money(xray.billAsks),
        eobPatient: money(xray.eobPatient),
        planPaid: money(xray.planPaid),
        gap: money(gapX),
        allowed: money(xray.allowed)
      }) }),
      h("p", { class: "link-row" }, [
        h("a", { href: "#/bill/xray", text: t("compare.openBill") }),
        h("a", { href: "#/eob/xray", text: t("compare.openEob") })
      ])
    ]));
    rootNode.append(h("section", { class: "card dup-card", id: "issue-duplicate" }, [
      h("p", { class: "pill pill-dup", text: t("line.duplicate") }),
      h("h2", { text: t("compare.dupTitle") }),
      h("p", { text: t("compare.dupBody", {
        service: dup.name[state.lang],
        cpt: dup.cpt,
        date: root.BillEob.formatDate(p.serviceDate, state.lang),
        firstId: xray.chargeId,
        secondId: dup.chargeId,
        amount: money(dup.billAsks)
      }) }),
      h("p", { class: "link-row" }, [
        h("a", { href: "#/bill/xray-dup", text: t("compare.openBill") })
      ])
    ]));
    rootNode.append(h("section", { class: "card" }, [
      h("h2", { text: t("compare.partsTitle", { gap: money(p.totals.gap) }) }),
      h("p", { text: t("compare.partsIntro") }),
      h("ul", {}, [
        h("li", { text: t("compare.partMismatch", { chargeId: xray.chargeId, gap: money(gapX) }) }),
        h("li", { text: t("compare.partDup", { chargeId: dup.chargeId, amount: money(dup.billAsks) }) })
      ]),
      h("p", { class: "num strong-line", text: t("compare.partSum", { a: money(gapX), b: money(dup.billAsks), gap: money(p.totals.gap) }) })
    ]));
    rootNode.append(h("section", { class: "card", id: "issue-math" }, [
      h("p", { class: "pill pill-teaching", text: t("line.teaching") }),
      h("h2", { text: t("compare.mathTitle", { amount: money(p.totals.eobPatient) }) }),
      h("p", { text: t("compare.mathLede") }),
      renderMathList()
    ]));
    rootNode.append(h("section", { class: "card info-card" }, [
      h("h2", { text: t("compare.checksumTitle") }),
      h("p", { text: t("compare.checksumBody", {
        plan: money(p.totals.planPaid),
        patient: money(p.totals.eobPatient),
        allowed: money(p.totals.allowed)
      }) })
    ]));
    rootNode.append(h("section", {}, [
      h("h2", { text: t("compare.allTitle") }),
      h("div", { class: "stack" }, p.lines.map(function (line) {
        var statusKey = line.flag === "match" ? "line.match" : line.flag === "mismatch" ? "line.mismatch" : "line.duplicate";
        return h("article", { class: "card mini-line line-" + line.flag }, [
          h("h3", { text: line.name[state.lang] }),
          h("p", { class: "quiet", text: "CPT " + line.cpt + " · " + line.chargeId }),
          pill(line.flag, statusKey),
          h("dl", { class: "amounts" }, [
            h("div", {}, [
              h("dt", { text: t("compare.billAsks") }),
              h("dd", { class: "num", text: money(line.billAsks) })
            ]),
            h("div", {}, [
              h("dt", { text: t("compare.eobLists") }),
              h("dd", { class: "num", text: line.onEob ? money(line.eobPatient) : t("compare.notOnEob") })
            ])
          ])
        ]);
      }))
    ]));
    rootNode.append(h("p", { class: "actions" }, [
      h("a", { class: "button button-primary", href: "#/questions", text: t("compare.thenQuestions") })
    ]));
  }

  function questionList(title, note, items) {
    return h("section", { class: "card" }, [
      h("h2", { text: title }),
      note ? h("p", { class: "quiet", text: note }) : null,
      h("ol", { class: "questions" }, items.map(function (item) {
        return h("li", { text: item });
      }))
    ]);
  }

  function renderQuestions(rootNode) {
    if (!state.session.loaded) {
      rootNode.append(emptyState());
      return;
    }
    var q = root.BillEob.questions(state.lang);
    var text = root.BillEob.questionsPlainText(state.lang);
    var copyButton = h("button", { type: "button", class: "button button-primary no-print", id: "copy-questions", text: t("questions.copy") });
    var printButton = h("button", { type: "button", class: "button button-secondary no-print", id: "print-questions", text: t("questions.print") });
    var area = h("textarea", { id: "questions-text", readonly: "readonly", spellcheck: "false" });
    area.value = text;
    copyButton.addEventListener("click", function () {
      copyQuestions(area);
    });
    printButton.addEventListener("click", function () {
      window.print();
    });
    rootNode.append(h("h1", { tabindex: "-1", text: t("questions.h1") }));
    rootNode.append(h("p", { class: "lede", text: t("questions.lede") }));
    rootNode.append(h("p", { class: "note", text: t("questions.boundary") }));
    rootNode.append(identityStrip());
    rootNode.append(h("div", { class: "actions no-print" }, [copyButton, printButton]));
    rootNode.append(questionList(t("questions.hospitalTitle"), t("questions.hospitalNote"), q.hospital));
    rootNode.append(questionList(t("questions.planTitle"), t("questions.planNote"), q.plan));
    rootNode.append(questionList(t("questions.papersTitle"), null, q.papers));
    rootNode.append(questionList(t("questions.whoTitle"), t("questions.whoNote"), q.who));
    rootNode.append(h("div", { class: "card" }, [
      h("label", { for: "questions-text", text: t("questions.plainLabel") }),
      area
    ]));
  }

  function copyQuestions(area) {
    var text = area.value;
    area.focus();
    area.select();
    var legacy = false;
    try {
      legacy = document.execCommand("copy");
    } catch (error) {
      legacy = false;
    }
    if (legacy) {
      announce(t("questions.copied"));
      return;
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text).then(function () {
        announce(t("questions.copied"));
      }, function () {
        announce(t("questions.copyFailed"));
      });
      return;
    }
    announce(t("questions.copyFailed"));
  }

  function renderHistory(rootNode) {
    clear(rootNode);
    if (state.session.loaded) {
      rootNode.append(h("p", {}, [
        h("a", { href: "#/summary", text: t("history.back") })
      ]));
    }
    if (!state.history.length) {
      rootNode.append(h("p", { class: "card empty-state", id: "history-empty", text: t("history.empty") }));
      return;
    }
    rootNode.append(h("p", { class: "quiet", id: "history-count", text: t("history.count", { count: state.history.length }) }));
    rootNode.append(h("ul", { class: "history-list" }, state.history.map(function (item) {
      var openButton = h("button", { type: "button", class: "button button-primary", text: t("history.open") });
      var deleteButton = h("button", { type: "button", class: "button button-danger", text: t("history.delete") });
      openButton.addEventListener("click", function () { openHistory(item); });
      deleteButton.addEventListener("click", function () { askConfirm("delete", item); });
      return h("li", {}, [
        h("article", { class: "card history-card" }, [
          h("h2", { text: item.label }),
          h("p", { text: t("history.savedOn", { when: root.BillEob.formatWhen(item.savedAt, state.lang) }) }),
          h("p", { class: "quiet", text: t("history.packet", { id: item.packetId || packet().id }) }),
          h("div", { class: "actions" }, [openButton, deleteButton])
        ])
      ]);
    })));
    var clearButton = h("button", { type: "button", class: "button button-danger", id: "history-clear", text: t("history.clear") });
    clearButton.addEventListener("click", function () { askConfirm("clear", null); });
    rootNode.append(h("p", { class: "actions" }, [clearButton]));
  }

  function paintDocuments() {
    var loaded = state.session.loaded;
    ["bill", "eob"].forEach(function (slot) {
      var node = document.getElementById(slot + "-slot-status");
      if (!node) return;
      if (!loaded) {
        node.textContent = t("documents.empty");
        return;
      }
      var message = t("documents.loadedSlot");
      var usedThisSlot = state.session.source && state.session.source.indexOf(slot + "-") === 0;
      if (usedThisSlot && state.session.fileName) {
        message += " " + t("documents.filePicked", { name: state.session.fileName });
      }
      node.textContent = message;
    });
    var result = document.getElementById("documents-result");
    if (!result) return;
    clear(result);
    if (!loaded) return;
    var actions = h("div", { class: "actions" }, [
      h("a", { class: "button button-primary", href: "#/summary", text: t("documents.continue") }),
      h("a", { class: "button button-secondary", href: "#/bill", text: t("documents.readBill") }),
      h("a", { class: "button button-secondary", href: "#/eob", text: t("documents.readEob") })
    ]);
    var children = [
      h("h2", { text: t("documents.nowOpen") })
    ];
    if (state.session.fileName && state.session.source !== "history") {
      children.push(h("p", { text: t("documents.filePicked", { name: state.session.fileName }) }));
    }
    children.push(actions);
    result.append(h("div", { class: "card loaded-card", id: "documents-loaded" }, children));
  }

  function showView() {
    VIEWS.forEach(function (name) {
      var section = document.getElementById("view-" + name);
      if (section) section.hidden = name !== state.view;
    });
    var review = document.getElementById("review-nav");
    review.hidden = !state.session.loaded;
    review.querySelectorAll("[data-step]").forEach(function (link) {
      if (link.getAttribute("data-step") === state.view) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll("#site-nav a").forEach(function (link) {
      var step = link.getAttribute("data-nav");
      if (step === state.view) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    var save = document.getElementById("save-open");
    save.disabled = !state.session.loaded;
    document.body.setAttribute("data-view", state.view);
    document.body.setAttribute("data-self-check", "ok");
    document.body.setAttribute("data-sample-loaded", state.session.loaded ? "yes" : "no");
  }

  function focusTarget(moveFocus) {
    if (!moveFocus) return;
    var id = null;
    if (state.anchor) {
      if (state.view === "bill") id = "bill-line-" + state.anchor;
      else if (state.view === "eob") id = "eob-line-" + state.anchor;
      else id = state.anchor;
    }
    var target = id ? document.getElementById(id) : null;
    if (target) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });
      return;
    }
    var view = document.getElementById("view-" + state.view);
    var title = view ? view.querySelector("h1") : null;
    if (title) {
      if (!title.hasAttribute("tabindex")) title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
      title.scrollIntoView({ block: "start" });
    }
  }

  function render(moveFocus) {
    root.BillEob.applyStatic(state.lang);
    document.title = t("meta.title") + " — " + t("views." + state.view);
    ["summary", "bill", "eob", "compare", "questions"].forEach(function (name) {
      var node = document.getElementById(name + "-root");
      if (!node) return;
      clear(node);
      if (name === "summary") renderSummary(node);
      if (name === "bill") renderBill(node);
      if (name === "eob") renderEob(node);
      if (name === "compare") renderCompare(node);
      if (name === "questions") renderQuestions(node);
    });
    renderHistory(document.getElementById("history-root"));
    paintDocuments();
    showView();
    focusTarget(moveFocus);
  }

  function sync(moveFocus) {
    var parsed = parseHash();
    state.view = parsed.view;
    state.anchor = parsed.anchor;
    setMenu(false);
    render(moveFocus);
  }

  function askConfirm(type, item) {
    var title = document.getElementById("confirm-title");
    var body = document.getElementById("confirm-body");
    var ok = document.getElementById("confirm-ok");
    var cancel = document.getElementById("confirm-cancel");
    if (type === "delete") {
      title.textContent = t("history.deleteTitle");
      body.textContent = t("history.deleteBody", { label: item.label });
      ok.textContent = t("history.confirmDelete");
      ok.dataset.mode = "delete";
      ok.dataset.id = item.id;
    } else {
      title.textContent = t("history.clearTitle");
      body.textContent = t("history.clearBody");
      ok.textContent = t("history.confirmClear");
      ok.dataset.mode = "clear";
      ok.dataset.id = "";
    }
    cancel.textContent = t("history.cancel");
    document.getElementById("confirm-dialog").showModal();
  }

  function openSave() {
    if (!state.session.loaded) return;
    var input = document.getElementById("save-label");
    input.value = state.session.historyLabel || t("save.defaultLabel");
    document.getElementById("save-dialog").showModal();
    input.focus();
    input.select();
  }

  function commitSave() {
    var input = document.getElementById("save-label");
    var label = input.value.replace(/\s+/g, " ").trim().slice(0, 80);
    if (!label) label = t("save.defaultLabel");
    var item = {
      id: uid(),
      savedAt: new Date().toISOString(),
      label: label,
      packetId: packet().id
    };
    state.history.unshift(item);
    var capped = false;
    if (state.history.length > HISTORY_CAP) {
      state.history = state.history.slice(0, HISTORY_CAP);
      capped = true;
    }
    var ok = writeHistory();
    document.getElementById("save-dialog").close();
    if (!ok) {
      state.history.shift();
      announce(t("save.failed"));
      return;
    }
    state.session.historyId = item.id;
    state.session.historySavedAt = item.savedAt;
    state.session.historyLabel = item.label;
    state.session.source = state.session.source || "sample";
    writeSession();
    announce(capped ? t("save.capped") : t("save.saved"));
    render(false);
  }

  function commitConfirm() {
    var ok = document.getElementById("confirm-ok");
    var mode = ok.dataset.mode;
    var id = ok.dataset.id;
    if (mode === "delete") {
      state.history = state.history.filter(function (item) { return item.id !== id; });
      if (state.session.historyId === id) {
        state.session.historyId = null;
        state.session.historySavedAt = null;
        state.session.historyLabel = null;
        writeSession();
      }
    } else if (mode === "clear") {
      state.history = [];
      if (state.session.historyId) {
        state.session.historyId = null;
        state.session.historySavedAt = null;
        state.session.historyLabel = null;
        writeSession();
      }
    }
    var wrote = writeHistory();
    document.getElementById("confirm-dialog").close();
    if (!wrote) {
      announce(t("history.failed"));
      return;
    }
    announce(mode === "clear" ? t("history.cleared") : t("history.deleted"));
    render(false);
  }

  function onPickedFile(event, source) {
    var input = event.target;
    var name = input.files && input.files[0] ? input.files[0].name : "";
    input.value = "";
    if (!name) return;
    loadSample(source, name);
  }

  function bind() {
    document.getElementById("lang-en").addEventListener("click", function () { setLang("en"); });
    document.getElementById("lang-es").addEventListener("click", function () { setLang("es"); });
    document.getElementById("nav-toggle").addEventListener("click", function () {
      setMenu(!state.menuOpen);
    });
    document.getElementById("site-nav").addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && state.menuOpen) {
        setMenu(false);
        document.getElementById("nav-toggle").focus();
      }
    });
    document.getElementById("use-sample").addEventListener("click", function () {
      loadSample("sample-button", null);
    });
    document.getElementById("bill-file").addEventListener("change", function (event) { onPickedFile(event, "bill-file"); });
    document.getElementById("bill-camera").addEventListener("change", function (event) { onPickedFile(event, "bill-camera"); });
    document.getElementById("eob-file").addEventListener("change", function (event) { onPickedFile(event, "eob-file"); });
    document.getElementById("eob-camera").addEventListener("change", function (event) { onPickedFile(event, "eob-camera"); });
    document.getElementById("save-open").addEventListener("click", openSave);
    document.getElementById("save-cancel").addEventListener("click", function () {
      document.getElementById("save-dialog").close();
    });
    document.getElementById("save-confirm").addEventListener("click", commitSave);
    document.getElementById("save-label").addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        commitSave();
      }
    });
    document.getElementById("confirm-cancel").addEventListener("click", function () {
      document.getElementById("confirm-dialog").close();
    });
    document.getElementById("confirm-ok").addEventListener("click", commitConfirm);
    window.addEventListener("hashchange", function () {
      var move = ready;
      ready = true;
      sync(move);
    });
  }

  var ready = false;

  function boot() {
    if (!root.BillEob || !root.BillEob.packet || !root.BillEob.t || !root.BillEob.explainLine) {
      var main = document.getElementById("main");
      main.append(h("p", { class: "card", text: "The sample packet failed an internal check, so this prototype stopped rather than show numbers that do not add up. / El paquete de ejemplo no pasó una comprobación interna y el prototipo se detuvo." }));
      return;
    }
    root.BillEob.getLang = function () { return state.lang; };
    state.lang = readLang();
    state.history = readHistory();
    state.session = readSession();
    bind();
    if (!location.hash) {
      history.replaceState(null, "", "#/home");
    }
    ready = true;
    sync(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
