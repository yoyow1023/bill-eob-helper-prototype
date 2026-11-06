/* Fictional sample packet. Amounts are integer cents so the arithmetic cannot drift. */
(function (root) {
  "use strict";

  var DEDUCTIBLE_ANNUAL = 150000;
  var DEDUCTIBLE_MET_BEFORE = 120000;
  var DEDUCTIBLE_REMAINING_BEFORE = 30000;
  var COINSURANCE_RATE = 20;

  var lines = [
    {
      id: "visit",
      cpt: "99214",
      chargeId: "CHG-1001",
      name: {
        en: "Office visit, established patient",
        es: "Consulta en el consultorio, paciente ya conocido"
      },
      codeNote: {
        en: "This code is often used for an office visit with a patient the practice already knows, when the visit is more involved than the shortest ones.",
        es: "Este código se usa a menudo para una consulta con un paciente que la clínica ya conoce, cuando la visita es un poco más amplia que las más breves."
      },
      onBill: true,
      onEob: true,
      billed: 28000,
      allowed: 16000,
      writeOff: 12000,
      deductible: 0,
      copay: 4000,
      coinsurance: 0,
      coinsuranceBase: 0,
      planPaid: 12000,
      eobPatient: 4000,
      billAsks: 4000,
      flag: "match",
      teaching: null,
      deductibleRemainingAfter: 30000
    },
    {
      id: "cbc",
      cpt: "85025",
      chargeId: "CHG-1002",
      name: {
        en: "Complete blood count",
        es: "Conteo sanguíneo completo"
      },
      codeNote: {
        en: "This code is often used for a complete blood count, a common blood test.",
        es: "Este código se usa a menudo para un conteo sanguíneo completo, un análisis de sangre frecuente."
      },
      onBill: true,
      onEob: true,
      billed: 9500,
      allowed: 2200,
      writeOff: 7300,
      deductible: 2200,
      copay: 0,
      coinsurance: 0,
      coinsuranceBase: 0,
      planPaid: 0,
      eobPatient: 2200,
      billAsks: 2200,
      flag: "match",
      teaching: null,
      deductibleRemainingAfter: 27800
    },
    {
      id: "bmp",
      cpt: "80048",
      chargeId: "CHG-1003",
      name: {
        en: "Basic metabolic panel",
        es: "Panel metabólico básico"
      },
      codeNote: {
        en: "This code is often used for a basic metabolic panel, a common blood test.",
        es: "Este código se usa a menudo para un panel metabólico básico, un análisis de sangre frecuente."
      },
      onBill: true,
      onEob: true,
      billed: 64000,
      allowed: 41000,
      writeOff: 23000,
      deductible: 27800,
      copay: 0,
      coinsurance: 2640,
      coinsuranceBase: 13200,
      planPaid: 10560,
      eobPatient: 30440,
      billAsks: 30440,
      flag: "match",
      teaching: "deductible-plus-coinsurance",
      deductibleRemainingAfter: 0
    },
    {
      id: "xray",
      cpt: "71046",
      chargeId: "CHG-1004",
      name: {
        en: "Chest X-ray, 2 views",
        es: "Radiografía de tórax, 2 vistas"
      },
      codeNote: {
        en: "This code is often used for a chest X-ray with two views.",
        es: "Este código se usa a menudo para una radiografía de tórax con dos vistas."
      },
      onBill: true,
      onEob: true,
      billed: 21000,
      allowed: 8500,
      writeOff: 12500,
      deductible: 0,
      copay: 0,
      coinsurance: 1700,
      coinsuranceBase: 8500,
      planPaid: 6800,
      eobPatient: 1700,
      billAsks: 8500,
      flag: "mismatch",
      teaching: null,
      deductibleRemainingAfter: 0
    },
    {
      id: "xray-dup",
      cpt: "71046",
      chargeId: "CHG-1005",
      name: {
        en: "Chest X-ray, 2 views",
        es: "Radiografía de tórax, 2 vistas"
      },
      codeNote: {
        en: "This is the same code and the same description as charge CHG-1004, on the same date of service.",
        es: "Es el mismo código y la misma descripción que el cargo CHG-1004, en la misma fecha de servicio."
      },
      onBill: true,
      onEob: false,
      billed: 21000,
      allowed: null,
      writeOff: null,
      deductible: null,
      copay: null,
      coinsurance: null,
      coinsuranceBase: null,
      planPaid: null,
      eobPatient: null,
      billAsks: 21000,
      flag: "duplicate",
      teaching: null,
      deductibleRemainingAfter: null
    }
  ];

  function sum(list, key) {
    return list.reduce(function (total, line) {
      return total + (line[key] || 0);
    }, 0);
  }

  function gapOf(line) {
    if (!line.onBill) return 0;
    if (!line.onEob) return line.billAsks;
    return line.billAsks - line.eobPatient;
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error("Sample packet check failed: " + message);
    }
  }

  var eobLines = lines.filter(function (line) { return line.onEob; });
  var billLines = lines.filter(function (line) { return line.onBill; });

  eobLines.forEach(function (line) {
    assert(line.billed - line.allowed === line.writeOff, line.id + " write-off");
    assert(
      line.deductible + line.copay + line.coinsurance + line.planPaid === line.allowed,
      line.id + " allowed split"
    );
    assert(
      line.deductible + line.copay + line.coinsurance === line.eobPatient,
      line.id + " patient responsibility"
    );
    if (line.coinsuranceBase) {
      assert(
        Math.round(line.coinsuranceBase * COINSURANCE_RATE / 100) === line.coinsurance,
        line.id + " coinsurance"
      );
      assert(
        line.allowed - line.deductible - line.copay === line.coinsuranceBase,
        line.id + " coinsurance base"
      );
    }
  });

  assert(lines[0].deductibleRemainingAfter === DEDUCTIBLE_REMAINING_BEFORE, "copay leaves deductible");
  assert(DEDUCTIBLE_REMAINING_BEFORE - lines[1].deductible === lines[1].deductibleRemainingAfter, "cbc deductible");
  assert(lines[1].deductibleRemainingAfter - lines[2].deductible === 0, "bmp meets deductible");
  assert(lines[2].teaching === "deductible-plus-coinsurance", "teaching line");
  assert(lines[2].deductible > 0 && lines[2].coinsurance > 0, "teaching uses both");
  assert(lines.filter(function (line) { return line.flag === "mismatch"; }).length === 1, "one mismatch");
  assert(lines.filter(function (line) { return line.flag === "duplicate"; }).length === 1, "one duplicate");
  assert(lines[3].billAsks - lines[3].eobPatient === lines[3].planPaid, "mismatch equals plan payment");

  var billAsks = sum(billLines, "billAsks");
  var eobPatient = sum(eobLines, "eobPatient");
  var allowed = sum(eobLines, "allowed");
  var planPaid = sum(eobLines, "planPaid");
  var gap = billAsks - eobPatient;
  var gapFromLines = lines.reduce(function (total, line) { return total + gapOf(line); }, 0);

  assert(billAsks === 66140, "bill total " + billAsks);
  assert(eobPatient === 38340, "eob total " + eobPatient);
  assert(gap === 27800, "gap " + gap);
  assert(gapFromLines === gap, "gap parts");
  assert(planPaid + eobPatient === allowed, "allowed checksum");
  assert(DEDUCTIBLE_MET_BEFORE + DEDUCTIBLE_REMAINING_BEFORE === DEDUCTIBLE_ANNUAL, "deductible parts");

  var packet = {
    id: "SP-100",
    patient: "Sample Patient",
    provider: "Sample General Hospital",
    insurer: "Example Health Plan",
    planLabel: "Sample PPO",
    memberId: "EX-00000000",
    groupId: "GRP-SAMPLE",
    accountId: "ACCT-SAMPLE-42",
    claimId: "CLM-SAMPLE-1001",
    statementId: "STMT-SAMPLE-77",
    serviceDate: "2026-03-12",
    billDate: "2026-04-03",
    eobDate: "2026-04-18",
    network: "in",
    deductibleAnnual: DEDUCTIBLE_ANNUAL,
    deductibleMetBefore: DEDUCTIBLE_MET_BEFORE,
    deductibleRemainingBefore: DEDUCTIBLE_REMAINING_BEFORE,
    coinsuranceRate: COINSURANCE_RATE,
    lines: lines,
    totals: {
      billAsks: billAsks,
      eobPatient: eobPatient,
      gap: gap,
      allowed: allowed,
      planPaid: planPaid,
      billedOnBill: sum(billLines, "billed"),
      billedOnEob: sum(eobLines, "billed")
    }
  };

  root.BillEob = root.BillEob || {};
  root.BillEob.packet = packet;
  root.BillEob.lineById = function (id) {
    for (var i = 0; i < packet.lines.length; i += 1) {
      if (packet.lines[i].id === id) return packet.lines[i];
    }
    return null;
  };
  root.BillEob.gapOf = gapOf;
})(typeof globalThis !== "undefined" ? globalThis : this);
