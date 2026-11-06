/* Plain-language paragraphs. Numbers always come from the sample packet. */
(function (root) {
  "use strict";

  function money(cents) {
    var sign = cents < 0 ? "-" : "";
    var abs = Math.abs(cents);
    var dollars = Math.floor(abs / 100);
    var rem = abs % 100;
    return sign + "$" + dollars.toLocaleString("en-US") + "." + String(rem).padStart(2, "0");
  }

  function formatDate(iso, lang) {
    var parts = iso.split("-");
    var date = new Date(Date.UTC(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])));
    return new Intl.DateTimeFormat(lang === "es" ? "es-US" : "en-US", {
      dateStyle: "long",
      timeZone: "UTC"
    }).format(date);
  }

  function formatWhen(iso, lang) {
    var date = new Date(iso);
    return new Intl.DateTimeFormat(lang === "es" ? "es-US" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);
  }

  function packet() {
    return root.BillEob.packet;
  }

  function t(path, vars, lang) {
    return root.BillEob.t(path, vars, lang);
  }

  function wordsFor(line) {
    if (line.flag === "duplicate") return ["cpt", "billed", "duplicate"];
    var words = ["cpt", "billed", "allowed", "writeOff", "planPaid", "patient"];
    if (line.copay) words.push("copay");
    if (line.deductible) words.push("deductible");
    if (line.coinsurance) words.push("coinsurance");
    if (line.id === "visit") words.push("inNetwork");
    return words;
  }

  function explainLine(line, lang) {
    var p = packet();
    var name = line.name[lang];
    var m = money;
    var paragraphs;

    if (lang === "es") {
      paragraphs = explainEs(line, name, p, m);
    } else {
      paragraphs = explainEn(line, name, p, m);
    }

    return {
      paragraphs: paragraphs,
      words: wordsFor(line)
    };
  }

  function explainEn(line, name, p, m) {
    var code = line.codeNote.en + " " + t("line.codeIsGeneral", null, "en");
    if (line.flag === "duplicate") {
      return [
        "CPT " + line.cpt + " is the billing code on this line. " + code,
        "This is bill line " + line.chargeId + ", “" + name + ",” dated " + formatDate(p.serviceDate, "en") + ". The billed amount is " + m(line.billed) + ", and the statement asks for " + m(line.billAsks) + ". The sample EOB lists “" + name + "” only once, as charge " + p.lines[3].chargeId + ". It has no second line, so there is no allowed amount, plan payment, or patient-responsibility figure here to put beside this charge.",
        "A repeated code, description, and date can mean the same service was entered twice. It can also mean two services were coded the same way. This prototype marks it as a possible duplicate so you can ask the hospital billing office. It does not decide that the charge is wrong, and it does not decide what anyone must pay."
      ];
    }

    var intro = "CPT " + line.cpt + " is the billing code printed on both sample documents for “" + name + ".” A billing code is how the two papers label a service so the lines can be matched. " + code;

    var moneyBits = "The hospital bill lists a billed amount of " + m(line.billed) + ". That is the hospital’s price on the statement before the plan’s rate. The EOB lists an allowed amount of " + m(line.allowed) + ". The allowed amount is the rate this sample plan prints for this in-network service. The difference, " + m(line.writeOff) + ", is shown as a contractual write-off: an amount these sample documents treat as not collectible under the plan’s rate. A write-off is not a payment from the member.";

    var split;
    if (line.id === "visit") {
      split = "On this sample EOB, the visit is handled with a copay. A copay is a fixed dollar amount the plan lists for certain visits. The copay here is " + m(line.copay) + ". In this sample packet, that copay does not reduce the deductible, so the deductible remaining stays " + m(p.deductibleRemainingBefore) + ". The plan-paid line shows " + m(line.planPaid) + ", which is the rest of the allowed amount. The EOB lists patient responsibility of " + m(line.eobPatient) + ". Patient responsibility is the amount the EOB assigns to the member. It is not a legal decision about what a person must pay.";
    } else if (line.id === "cbc") {
      split = "The EOB applies the whole allowed amount, " + m(line.allowed) + ", to the deductible. A deductible is the amount the plan statement says the member pays for covered services before the plan starts sharing the cost. Before this line, " + m(p.deductibleRemainingBefore) + " of the deductible remained. After this line, " + m(line.deductibleRemainingAfter) + " remains. The plan-paid line is " + m(line.planPaid) + ". There is no copay and no coinsurance on this line. The EOB lists patient responsibility of " + m(line.eobPatient) + ". That phrase means the amount this EOB assigns to the member. It is not, by itself, a legal conclusion about a debt.";
    } else if (line.id === "bmp") {
      split = "Before this line, " + m(line.deductible) + " of the deductible was still left, and this line uses all of it. That meets the deductible in the sample. The allowed amount left over is " + m(line.coinsuranceBase) + ". Coinsurance is the share of an allowed amount the plan assigns to the member after the deductible. Here it is " + p.coinsuranceRate + "% of " + m(line.coinsuranceBase) + ", which is " + m(line.coinsurance) + ". The plan-paid line shows the other " + (100 - p.coinsuranceRate) + "%, " + m(line.planPaid) + ". The EOB lists patient responsibility as " + m(line.deductible) + " + " + m(line.coinsurance) + " = " + m(line.eobPatient) + ". There is no copay on this line. This is the arithmetic printed on the sample. It is not a decision about what anyone must pay.";
    } else {
      split = "The deductible in this sample is already met, so this line does not use the deductible and it has no copay. Coinsurance is " + p.coinsuranceRate + "% of the allowed amount: " + p.coinsuranceRate + "% of " + m(line.allowed) + " is " + m(line.coinsurance) + ". The plan-paid line shows " + m(line.planPaid) + ". The EOB lists patient responsibility of " + m(line.eobPatient) + ". That is the amount the EOB assigns to the member for this line, not a ruling about a debt.";
    }

    var ending;
    if (line.flag === "mismatch") {
      ending = "The hospital bill asks for " + m(line.billAsks) + " on this same line. The EOB lists " + m(line.eobPatient) + ". Those amounts do not match. The difference is " + m(line.billAsks - line.eobPatient) + ", which is the same figure as the plan payment. This tool cannot tell you which document is right. It is a question for the hospital billing office and for the plan.";
    } else {
      ending = "The hospital bill asks for " + m(line.billAsks) + " on this line. That matches the patient-responsibility amount the EOB lists. Matching numbers are still figures printed on sample documents. They are not a decision about what a person must pay.";
    }

    return [intro, moneyBits, split, ending];
  }

  function explainEs(line, name, p, m) {
    var code = line.codeNote.es + " " + t("line.codeIsGeneral", null, "es");
    if (line.flag === "duplicate") {
      return [
        "CPT " + line.cpt + " es el código de facturación de esta línea. " + code,
        "Esta es la línea " + line.chargeId + " de la factura, “" + name + "”, con fecha " + formatDate(p.serviceDate, "es") + ". El monto facturado es " + m(line.billed) + " y el estado de cuenta pide " + m(line.billAsks) + ". El EOB de ejemplo incluye “" + name + "” solo una vez, como cargo " + p.lines[3].chargeId + ". No tiene una segunda línea, así que aquí no hay un monto permitido, un pago del plan ni una cifra de responsabilidad del paciente para poner al lado de este cargo.",
        "Un código, una descripción y una fecha repetidos pueden significar que el mismo servicio se anotó dos veces. También pueden significar que dos servicios se codificaron de la misma manera. Este prototipo lo marca como posible duplicado para que usted pueda preguntarle a la oficina de facturación del hospital. No decide que el cargo esté mal y no decide lo que alguien debe pagar."
      ];
    }

    var intro = "CPT " + line.cpt + " es el código de facturación impreso en los dos documentos de ejemplo para “" + name + "”. Un código de facturación es la manera en que los dos papeles etiquetan un servicio para poder emparejar las líneas. " + code;

    var moneyBits = "La factura indica un monto facturado de " + m(line.billed) + ". Es el precio del hospital en el estado de cuenta, antes de la tarifa del plan. El EOB indica un monto permitido de " + m(line.allowed) + ". El monto permitido es la tarifa que este plan de ejemplo imprime para este servicio dentro de la red. La diferencia, " + m(line.writeOff) + ", figura como un ajuste contractual: un monto que estos documentos de ejemplo tratan como no cobrable según la tarifa del plan. Un ajuste no es un pago de la persona asegurada.";

    var split;
    if (line.id === "visit") {
      split = "En este EOB de ejemplo, la consulta se maneja con un copago. Un copago es una cantidad fija que el plan indica para ciertas visitas. Aquí el copago es " + m(line.copay) + ". En este paquete de ejemplo, ese copago no reduce el deducible, así que el deducible que falta sigue en " + m(p.deductibleRemainingBefore) + ". La línea de pago del plan muestra " + m(line.planPaid) + ", que es el resto del monto permitido. El EOB indica una responsabilidad del paciente de " + m(line.eobPatient) + ". Responsabilidad del paciente es el monto que el EOB asigna a la persona asegurada. No es una decisión legal sobre lo que una persona debe pagar.";
    } else if (line.id === "cbc") {
      split = "El EOB aplica todo el monto permitido, " + m(line.allowed) + ", al deducible. Un deducible es el monto que el estado de cuenta del plan dice que paga la persona asegurada por servicios cubiertos antes de que el plan empiece a compartir el costo. Antes de esta línea faltaban " + m(p.deductibleRemainingBefore) + " del deducible. Después de esta línea faltan " + m(line.deductibleRemainingAfter) + ". La línea de pago del plan es " + m(line.planPaid) + ". En esta línea no hay copago ni coseguro. El EOB indica una responsabilidad del paciente de " + m(line.eobPatient) + ". Esa frase significa el monto que este EOB asigna a la persona asegurada. Por sí sola, no es una conclusión legal sobre una deuda.";
    } else if (line.id === "bmp") {
      split = "Antes de esta línea todavía faltaban " + m(line.deductible) + " del deducible, y esta línea los usa todos. Con eso el deducible del ejemplo queda cubierto. El monto permitido que sobra es " + m(line.coinsuranceBase) + ". El coseguro es la parte de un monto permitido que el plan asigna a la persona asegurada después del deducible. Aquí es el " + p.coinsuranceRate + "% de " + m(line.coinsuranceBase) + ", o sea " + m(line.coinsurance) + ". La línea de pago del plan muestra el otro " + (100 - p.coinsuranceRate) + "%, " + m(line.planPaid) + ". El EOB indica la responsabilidad del paciente como " + m(line.deductible) + " + " + m(line.coinsurance) + " = " + m(line.eobPatient) + ". En esta línea no hay copago. Esta es la aritmética impresa en el ejemplo. No es una decisión sobre lo que alguien debe pagar.";
    } else {
      split = "El deducible de este ejemplo ya está cubierto, así que esta línea no usa el deducible y no tiene copago. El coseguro es el " + p.coinsuranceRate + "% del monto permitido: el " + p.coinsuranceRate + "% de " + m(line.allowed) + " es " + m(line.coinsurance) + ". La línea de pago del plan muestra " + m(line.planPaid) + ". El EOB indica una responsabilidad del paciente de " + m(line.eobPatient) + ". Es el monto que el EOB asigna a la persona asegurada en esta línea, no un fallo sobre una deuda.";
    }

    var ending;
    if (line.flag === "mismatch") {
      ending = "La factura del hospital pide " + m(line.billAsks) + " en esta misma línea. El EOB indica " + m(line.eobPatient) + ". Esos montos no coinciden. La diferencia es " + m(line.billAsks - line.eobPatient) + ", la misma cifra que el pago del plan. Esta herramienta no puede decirle cuál documento es el correcto. Es una pregunta para la oficina de facturación del hospital y para el plan.";
    } else {
      ending = "La factura del hospital pide " + m(line.billAsks) + " en esta línea. Esa cantidad coincide con la responsabilidad del paciente que indica el EOB. Los números que coinciden siguen siendo cifras impresas en documentos de ejemplo. No son una decisión sobre lo que una persona debe pagar.";
    }

    return [intro, moneyBits, split, ending];
  }

  function questionVars(lang) {
    var p = packet();
    var xray = root.BillEob.lineById("xray");
    var dup = root.BillEob.lineById("xray-dup");
    var bmp = root.BillEob.lineById("bmp");
    return {
      id: p.id,
      patient: p.patient,
      provider: p.provider,
      insurer: p.insurer,
      account: p.accountId,
      statement: p.statementId,
      claim: p.claimId,
      member: p.memberId,
      service: xray.name[lang],
      serviceBmp: bmp.name[lang],
      cpt: xray.cpt,
      cptBmp: bmp.cpt,
      date: formatDate(p.serviceDate, lang),
      firstId: xray.chargeId,
      secondId: dup.chargeId,
      chargeId: xray.chargeId,
      chargeBmp: bmp.chargeId,
      billAsks: money(xray.billAsks),
      eobPatient: money(xray.eobPatient),
      planPaid: money(xray.planPaid),
      allowed: money(xray.allowed),
      amount: money(dup.billAsks),
      total: money(p.totals.eobPatient),
      met: money(p.deductibleMetBefore),
      annual: money(p.deductibleAnnual),
      remaining: money(p.deductibleRemainingBefore),
      accountId: p.accountId,
      claimId: p.claimId,
      memberId: p.memberId,
      statementId: p.statementId
    };
  }

  function fill(path, lang, extra) {
    var vars = questionVars(lang);
    if (extra) {
      Object.keys(extra).forEach(function (key) { vars[key] = extra[key]; });
    }
    return t(path, vars, lang);
  }

  function questions(lang) {
    var p = packet();
    var bmp = root.BillEob.lineById("bmp");
    var hospital = [1, 2, 3, 4, 5].map(function (n) {
      return fill("questions.qHospital" + n, lang);
    });
var dup = root.BillEob.lineById("xray-dup");
  var plan = [1, 2, 3, 4, 5].map(function (n) {
    if (n === 1) {
      return t("questions.qPlan1", {
        claimId: p.claimId,
        total: money(p.totals.eobPatient),
        cpt: bmp.cpt,
        service: bmp.name[lang],
        chargeId: bmp.chargeId,
        lineAmount: money(bmp.eobPatient)
      }, lang);
    }
    if (n === 4) {
      var vars = questionVars(lang);
      vars.chargeId = dup.chargeId;
      return t("questions.qPlan4", vars, lang);
    }
    return fill("questions.qPlan" + n, lang);
  });
    var papers = [1, 2, 3, 4].map(function (n) {
      return t("questions.paper" + n, null, lang);
    });
    var who = [1, 2, 3, 4].map(function (n) {
      return t("questions.who" + n, null, lang);
    });
    return { hospital: hospital, plan: plan, papers: papers, who: who };
  }

  function questionsPlainText(lang) {
    var p = packet();
    var q = questions(lang);
    var header = t("questions.textHeader", {
      id: p.id,
      patient: p.patient,
      provider: p.provider,
      insurer: p.insurer,
      account: p.accountId,
      statement: p.statementId,
      claim: p.claimId,
      member: p.memberId
    }, lang);
    function block(title, items) {
      return title + "\n" + items.map(function (item, index) {
        return (index + 1) + ". " + item;
      }).join("\n");
    }
    return [
      header,
      block(t("questions.hospitalTitle", null, lang), q.hospital),
      block(t("questions.planTitle", null, lang), q.plan),
      block(t("questions.papersTitle", null, lang), q.papers),
      block(t("questions.whoTitle", null, lang), q.who)
    ].join("\n\n");
  }

  root.BillEob.money = money;
  root.BillEob.formatDate = formatDate;
  root.BillEob.formatWhen = formatWhen;
  root.BillEob.explainLine = explainLine;
  root.BillEob.questions = questions;
  root.BillEob.questionsPlainText = questionsPlainText;
})(typeof globalThis !== "undefined" ? globalThis : this);
