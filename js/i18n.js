/* UI strings. Explanations that include dollar amounts are built in explain.js. */
(function (root) {
  "use strict";

  var dict = {
    en: {
      meta: {
        title: "Bill & EOB Helper (prototype)",
        description: "A prototype that explains a sample medical bill and a sample insurance Explanation of Benefits in plain language. Not medical, legal, or insurance advice."
      },
      brand: "Bill & EOB Helper",
      brandTag: "prototype",
      skip: "Skip to content",
      langGroup: "Language",
      langChanged: "Language set to English.",
      nav: {
        home: "Home",
        papers: "Papers",
        history: "History",
        about: "About",
        menu: "Menu",
        review: "Review steps"
      },
      steps: {
        summary: "Summary",
        bill: "Bill",
        eob: "EOB",
        compare: "Compare",
        questions: "Questions"
      },
      footer: {
        disclaimer: "Bill & EOB Helper (prototype) helps you read a bill and an Explanation of Benefits, organize questions, and see which kind of person to talk with. It is not medical, legal, or insurance advice. It does not decide what you owe, and it does not promise any result.",
        more: "Full disclaimer"
      },
      home: {
        h1: "Read a hospital bill next to the insurance EOB",
        lede: "A plain-language walkthrough for caregivers and for families who prefer English or Spanish. You move line by line, see where the two papers disagree, and leave with questions to ask a real person.",
        privacy: "The only documents in this demo are a fictional sample. A file or photo you choose is not opened and is not sent anywhere.",
        step1t: "Open the sample papers",
        step1: "The bill is the hospital statement. The EOB is the plan’s letter about the same claim. This demo uses one made-up pair.",
        step2t: "Read each line",
        step2: "Each line shows the billing code, the billed amount, the allowed amount, what the plan lists as paid, and the words deductible, copay, coinsurance, and patient responsibility.",
        step3t: "Compare, then list questions",
        step3: "The comparison marks an amount that does not match and a possible duplicate, and it adds up the patient-responsibility figure the way the sample EOB does.",
        start: "Open the sample documents",
        about: "Read the full disclaimer",
        boundary: "This tool will not tell you what you owe. It will not give medical, legal, or insurance advice, and it will not promise that a bill will change."
      },
      documents: {
        h1: "Add the two papers",
        intro: "A bill is the statement from the hospital or clinic. An Explanation of Benefits (EOB) is the letter from the insurance plan that says how the plan processed a claim. They are different documents. This page reads a sample of each, side by side.",
        billTitle: "Hospital bill",
        billHelp: "The statement that lists charges and an amount the hospital asks for.",
        eobTitle: "Insurance EOB",
        eobHelp: "The plan’s account of the claim. An EOB is not a bill.",
        choose: "Choose a file",
        photo: "Take a photo",
        chooseBill: "Choose a hospital bill file",
        photoBill: "Take a photo of a hospital bill",
        chooseEob: "Choose an EOB file",
        photoEob: "Take a photo of an EOB",
        useSample: "Use sample documents",
        note: "Choosing a file or a photo does not upload it. This prototype cannot read your papers. It opens the bundled sample instead, so you can click through the demo. Nothing is sent anywhere.",
        empty: "No document selected. Nothing is uploaded.",
        loadedSlot: "Sample document loaded.",
        filePicked: "You selected “{name}”. That file stayed on this device. It was not opened and it was not sent anywhere.",
        nowOpen: "Sample packet SP-100 is now open. Both papers below are the bundled sample, not the file you chose.",
        continue: "Continue to the summary",
        readBill: "Read the bill",
        readEob: "Read the EOB"
      },
      empty: {
        title: "The sample is not open yet",
        body: "This screen uses the bundled sample bill and sample EOB. Open them first. Nothing will be uploaded.",
        action: "Go to the papers"
      },
      masthead: {
        packet: "Sample packet {id}",
        fictional: "Fictional names and numbers",
        service: "Date of service",
        billDate: "Bill date",
        eobDate: "EOB date",
        patient: "Patient",
        member: "Member ID",
        group: "Group",
        account: "Hospital account",
        claim: "Claim",
        statement: "Statement",
        provider: "Hospital",
        insurer: "Plan",
        network: "Network label on the EOB",
        inNetwork: "In-network",
        rulesTitle: "Figures printed on the sample EOB",
        rulesNote: "These are the rules printed on the sample, so you can follow the arithmetic. They are not a decision about anyone’s coverage.",
        deductible: "Individual deductible",
        met: "Deductible met before this claim",
        remaining: "Deductible remaining before this claim",
        coinsurance: "Coinsurance after the deductible",
        copay: "Office-visit copay in this sample",
        copayNote: "In this sample, the office-visit copay does not reduce the deductible."
      },
      summary: {
        h1: "Sample packet SP-100",
        lede: "Here is the fictional bill and the fictional EOB this prototype can walk through. The plain-language text was written ahead of time for this packet. It is not produced by reading a file.",
        fromHistory: "Opened from a review saved in this browser on {when}. The label was “{label}”.",
        eobLists: "EOB lists as patient responsibility",
        billAsks: "Hospital bill asks for",
        gap: "Difference between those totals",
        gapNote: "The totals are not the same. That is a reason to ask questions. It is not a decision about what anyone must pay.",
        lookTitle: "What this sample is built to show",
        look1: "One line where the amount on the bill and the amount on the EOB do not match.",
        look2: "One possible duplicate charge, present on the bill and absent from the EOB.",
        look3: "One line where the EOB lists patient responsibility as deductible plus coinsurance, with the addition written out.",
        ctaBill: "Read the bill line by line",
        ctaEob: "Read the EOB line by line",
        ctaCompare: "Compare the two papers",
        ctaQuestions: "Questions to ask a person",
        glossaryTitle: "Words used in this prototype",
        glossaryNote: "Short meanings, for reading these papers. A real plan can define a word differently. The plan documents control the real contract."
      },
      bill: {
        h1: "The sample hospital bill",
        lede: "This is the sample statement from Sample General Hospital. “Bill asks for” means the amount printed on that line of the statement. It is not a decision about what you must pay.",
        lineKicker: "Bill line {n} of {total}",
        notOnEob: "This charge is not on the sample EOB."
      },
      eob: {
        h1: "The sample Explanation of Benefits",
        lede: "This is the sample EOB from Example Health Plan for claim CLM-SAMPLE-1001. An EOB says how the plan processed a claim. It is not a bill. “Patient responsibility” means the amount this EOB assigns to the member.",
        lineKicker: "EOB line {n} of {total}",
        missingTitle: "A bill line that is not on this EOB",
        missingBody: "The hospital bill also lists {service}, CPT {cpt}, charge {chargeId}, and asks for {amount}. That charge does not appear on this EOB. On the bill and on the comparison it is marked as a possible duplicate, which is a question, not a conclusion."
      },
      line: {
        charge: "Charge",
        code: "Billing code",
        plain: "In plain language",
        words: "Words on this line",
        codeIsGeneral: "That description is general information about the code, not a statement about anyone’s care.",
        billed: "Billed amount",
        allowed: "Allowed amount",
        writeOff: "Contractual write-off",
        deductible: "Deductible",
        copay: "Copay",
        coinsurance: "Coinsurance",
        planPaid: "Plan paid",
        patient: "Patient responsibility (EOB)",
        billAsks: "Bill asks for",
        onEob: "On the EOB",
        no: "Not on this EOB",
        yes: "Yes",
        match: "Amounts match",
        mismatch: "Amounts do not match",
        duplicate: "Possible duplicate",
        teaching: "Deductible + coinsurance",
        seeQuestions: "A question about this line is in the question list.",
        mathCaption: "How the EOB lists patient responsibility on this line"
      },
      compare: {
        h1: "Bill and EOB side by side",
        lede: "This page puts the sample statement next to the sample EOB. It points at numbers that do not agree. It does not decide which paper is right, and it does not decide what anyone must pay.",
        jump: "On this page",
        jumpMismatch: "Amounts that do not match",
        jumpDup: "Possible duplicate",
        jumpMath: "How the EOB lists {amount}",
        totalsCaption: "Totals printed on the two sample documents",
        writeoffTitle: "A difference that this sample treats as ordinary",
        writeoffBody: "Billed amounts and allowed amounts often differ. On the matching lines, that gap is labeled a contractual write-off: the sample documents treat it as not collectible under the plan’s rate. It is not listed as a payment from the member. The flagged mismatch below is a different kind of gap. It compares what the bill asks for with the patient-responsibility amount on the EOB.",
        mismatchTitle: "Amounts that do not match",
        mismatchBody: "{service} (CPT {cpt}, charge {chargeId}) is on both papers. The bill asks for {billAsks}. The EOB lists patient responsibility of {eobPatient} and a plan payment of {planPaid}. The difference is {gap}, the same as the plan payment. One reading is that the bill still shows the allowed amount of {allowed} and does not show the plan payment applied. This tool cannot tell you which document is right.",
        dupTitle: "Possible duplicate charge",
        dupBody: "The bill lists {service} twice, both CPT {cpt}, both dated {date}. Charge {firstId} is also on the EOB. Charge {secondId} asks for {amount} and is not on the EOB. Two lines with the same code, the same description, and the same date can be one service entered twice. They can also be two services that were coded the same way. This page flags the second line so you can ask. It does not decide that the charge is wrong.",
        partsTitle: "Where the {gap} difference in the totals comes from",
        partsIntro: "The other lines ask for the same amount the EOB lists. They add nothing to this difference.",
        partMismatch: "{chargeId}: the bill asks for {gap} more than the EOB lists.",
        partDup: "{chargeId}: the bill asks for {amount}, and the EOB has no line to match.",
        partSum: "{a} + {b} = {gap}.",
        mathTitle: "How the EOB lists {amount}",
        mathLede: "The sample EOB applies its printed rules in the order below. This is the arithmetic on the sample. It is not a statement of what anyone must pay. The second chest X-ray line is not part of this total, because it is not on the EOB.",
        checksumTitle: "A check you can repeat",
        checksumBody: "Plan payments on the EOB add up to {plan}. The patient-responsibility lines add up to {patient}. Together they equal the allowed amounts, {allowed}. {plan} + {patient} = {allowed}.",
        allTitle: "Every line",
        eobLists: "EOB lists",
        billAsks: "Bill asks",
        status: "Status",
        notOnEob: "Not on the EOB",
        openBill: "Show this line on the bill",
        openEob: "Show this line on the EOB",
        thenQuestions: "Take these notes to the question list"
      },
      math: {
        startTitle: "Before this claim",
        startBody: "The EOB shows {met} of a {annual} individual deductible already met. Deductible remaining: {remaining}.",
        visitTitle: "Office visit, copay",
        visitBody: "CPT {cpt}, charge {chargeId}. This sample handles the visit as a {copay} copay. The copay does not reduce the deductible here, so the deductible remaining stays {remaining}. The EOB lists a plan payment of {plan} (the rest of the {allowed} allowed amount).",
        cbcTitle: "Blood count, applied to the deductible",
        cbcBody: "CPT {cpt}, charge {chargeId}. The allowed amount is {allowed}. The EOB applies all of it to the deductible. The plan-paid line is {plan}. Deductible remaining after this line: {remaining}.",
        bmpTitle: "Metabolic panel, deductible and coinsurance",
        bmpBody: "CPT {cpt}, charge {chargeId}. The allowed amount is {allowed}. The deductible still had {deductible} left, and this line uses all of it. Allowed amount left over: {base}. Coinsurance in this sample is {rate}% of that leftover, which is {coinsurance}. The plan-paid line shows the other {planShare}%: {plan}. Deductible remaining after this line: {remaining}.",
        xrayTitle: "Chest X-ray that is on the EOB",
        xrayBody: "CPT {cpt}, charge {chargeId}. The allowed amount is {allowed}. The deductible is already met, so this line uses coinsurance only. {rate}% of {allowed} is {coinsurance}. The plan-paid line shows {plan}.",
        add: "Added to the patient-responsibility total",
        running: "Running total the EOB is building",
        remaining: "Deductible remaining",
        rowDeductible: "Deductible applied",
        rowCoinsurance: "Coinsurance, {rate}% of {base}",
        rowPlan: "Plan paid (not part of the patient-responsibility line)",
        rowPatient: "EOB lists for this line",
        doneTitle: "What the EOB lists for the claim",
        doneBody: "Adding the four EOB lines gives {total}. The hospital bill asks for {bill} across five lines. Those are two different totals."
      },
      questions: {
        h1: "Questions to ask a person",
        lede: "These questions are drafted from the sample papers. Copy or print them, then edit them in your own words. If you ever start from this list for real papers, replace every name and number first. Do not give a billing office the sample IDs as if they were yours.",
        boundary: "This is not a dispute letter. It is not medical, legal, or insurance advice. The list does not say what anyone must pay, and it does not promise that a charge will change.",
        hospitalTitle: "Questions for the hospital billing office",
        hospitalNote: "The phone number, if there is one, would be on a real statement. This prototype does not supply a number.",
        planTitle: "Questions for the insurance plan",
        planNote: "Use the customer service number printed on the insurance card. This prototype does not supply a number.",
        papersTitle: "Papers to have nearby",
        whoTitle: "Who else can help",
        whoNote: "This prototype only names kinds of help. It does not list organizations, websites, or phone numbers.",
        copy: "Copy questions",
        copied: "Copied to the clipboard on this device. Nothing was sent.",
        copyFailed: "The clipboard was not available. The plain-text box is selected so you can copy it from the keyboard. Nothing was sent.",
        print: "Print questions",
        plainLabel: "Plain-text version",
        qHospital1: "The statement lists two lines for “{service},” both CPT {cpt}, both dated {date}: charge {firstId} and charge {secondId}. The Explanation of Benefits lists this service once. Are these two different services, or was one line entered twice? If one line was entered twice, please send a corrected statement.",
        qHospital2: "For charge {chargeId} ({service}, CPT {cpt}), the statement asks for {billAsks}. The EOB for claim {claimId} lists patient responsibility of {eobPatient} and shows a plan payment of {planPaid}. Can you show how the statement arrived at {billAsks}, and whether that plan payment has been applied to account {accountId}?",
        qHospital3: "Please confirm account {accountId} and statement {statementId}, and tell me which charges on this statement are included in claim {claimId}.",
        qHospital4: "If a charge is corrected, please send an updated statement that lists each remaining charge, any amount the plan has paid, and the amount the statement still asks for.",
        qHospital5: "Please tell me the name of the person I speak with and a reference number for this conversation.",
        qPlan1: "Please walk through claim {claimId} and how the EOB gets to a patient-responsibility total of {total}, line by line. I especially want to follow the deductible and the coinsurance on CPT {cpt} ({service}), charge {chargeId}, which the EOB lists as {lineAmount}.",
        qPlan2: "This EOB shows {met} of a {annual} deductible already met before the claim, and {remaining} remaining. Is that what your records show for member {memberId} when the claim was processed?",
        qPlan3: "For CPT {cpt}, charge {chargeId}, the EOB lists an allowed amount of {allowed}, a plan payment of {planPaid}, and patient responsibility of {eobPatient}. The hospital statement asks for {billAsks} on that line. Can you confirm whether {planPaid} was paid to {provider}, and the date of that payment?",
        qPlan4: "The hospital statement has a second CPT {cpt} line, charge {chargeId}, for {amount}. I do not see it on this EOB. Is that charge part of this claim, part of a different claim, or not on file?",
        qPlan5: "This EOB marks {provider} as in-network. Please confirm that, and tell me where the plan documents describe the copay, deductible, and coinsurance used on this claim. If I disagree with how a line was processed, what review steps does this plan describe, what time limit does the plan itself write down, and where is that written?",
        paper1: "The hospital statement.",
        paper2: "The Explanation of Benefits for this claim.",
        paper3: "The insurance card.",
        paper4: "A note of the date, the name of the person you spoke with, and any reference number. Those notes stay with you. This prototype does not store them unless you save a review label in this browser.",
        who1: "Your hospital’s billing office. On a real statement, the number is often printed on the bill.",
        who2: "The customer service number on your insurance card.",
        who3: "A nonprofit patient advocate, or your state’s consumer assistance program.",
        who4: "If you want to ask whether a hospital has a financial-assistance or charity-care policy, the hospital billing office can tell you whether that hospital has one and how to request it.",
        textHeader: "Bill & EOB Helper (prototype)\nSAMPLE DATA — not a real bill\nSample packet {id}\nPatient: {patient}\nHospital: {provider}\nPlan: {insurer}\nAccount: {account}\nStatement: {statement}\nClaim: {claim}\nMember: {member}\n\nThese questions were written from fictional sample documents. If you use them as a starting point for your own papers, replace the names and numbers first. Do not give a billing office these sample IDs as if they were real.\n\nThis is not a dispute letter. It is not medical, legal, or insurance advice. It does not decide what anyone must pay and it does not promise any result."
      },
      glossary: {
        cpt: "A billing code printed on bills and EOBs. Matching the code helps you tell whether two lines refer to the same listed service. The code is not a diagnosis.",
        billed: "The provider’s price on the statement, before the plan’s allowed rate.",
        allowed: "The rate the plan statement says applies to that service.",
        writeOff: "On these sample lines, the billed amount minus the allowed amount. The sample treats that difference as not collectible under the plan’s rate. It is not listed as a payment from the member.",
        planPaid: "The amount the EOB says the plan paid toward the allowed amount.",
        deductible: "The amount the plan statement says the member pays for covered services before the plan starts sharing the cost. This sample shows one individual deductible.",
        copay: "A fixed dollar amount the plan statement lists for certain visits. In this sample, the office-visit copay does not reduce the deductible.",
        coinsurance: "A percentage of an allowed amount that the plan statement assigns to the member after the deductible is met. This sample prints 20%.",
        patient: "The amount the EOB assigns to the member for a line or a claim. Reading it here is not a conclusion about a legal debt.",
        inNetwork: "A label on this sample EOB meaning the plan lists the hospital as a contracted provider. This sample is marked in-network. Bills can be processed differently when that label is different.",
        eob: "Explanation of Benefits. The plan’s written account of how it processed a claim. It is not the hospital’s bill.",
        claim: "The request for payment the plan processed. The sample claim number is CLM-SAMPLE-1001.",
        duplicate: "A line this prototype flags because the bill repeats a code, a description, and a date, and the EOB lists that service only once. “Possible” means it is a question for the billing office. It is not a finding that the charge is wrong."
      },
      glossaryLabels: {
        cpt: "Billing code (CPT)",
        billed: "Billed amount",
        allowed: "Allowed amount",
        writeOff: "Contractual write-off",
        planPaid: "Plan paid",
        deductible: "Deductible",
        copay: "Copay",
        coinsurance: "Coinsurance",
        patient: "Patient responsibility",
        inNetwork: "In-network",
        eob: "EOB",
        claim: "Claim",
        duplicate: "Possible duplicate"
      },
      save: {
        button: "Save this review",
        title: "Save this review in this browser",
        body: "The entry stays in this browser’s local storage on this device. It stores a label, the time, and the fact that you were looking at sample packet SP-100. It does not store an uploaded file, because no file is read. It is not sent anywhere. Each save adds an entry. You can delete it on the History page.",
        label: "Label",
        placeholder: "For example: Sample March visit",
        cancel: "Cancel",
        confirm: "Save in this browser",
        saved: "Saved in this browser. It was not sent anywhere.",
        capped: "Saved in this browser. The oldest entry was dropped so this browser keeps 30 reviews.",
        failed: "This browser did not allow saving. The sample is still open on this page, but it will not be kept.",
        defaultLabel: "Sample packet SP-100"
      },
      history: {
        h1: "Reviews saved in this browser",
        lede: "Reviews you save stay in this browser’s local storage on this device only. They are not an account, they are not uploaded, and another browser or phone will not show them. Clearing site data for this page removes them. This prototype explains that here so it is not a surprise.",
        empty: "No reviews are saved in this browser yet. Open the sample and choose “Save this review” if you want one to appear here.",
        back: "The sample packet is still open",
        open: "Open",
        delete: "Delete",
        clear: "Clear all",
        savedOn: "Saved {when}",
        packet: "Sample packet {id}",
        deleteTitle: "Delete this saved review?",
        deleteBody: "“{label}” will be removed from this browser’s local storage. The sample documents themselves stay available. Nothing is sent anywhere.",
        clearTitle: "Remove every saved review?",
        clearBody: "Every review stored by this prototype in this browser will be deleted. This cannot be undone from the page. Nothing is sent anywhere.",
        confirmDelete: "Delete",
        confirmClear: "Clear all",
        cancel: "Cancel",
        deleted: "That review was deleted from this browser.",
        cleared: "All saved reviews were removed from this browser.",
        failed: "This browser did not allow a change to saved reviews.",
        count: "{count} saved in this browser"
      },
      about: {
        h1: "About this prototype",
        whatH: "What it is",
        whatP: "This is a clickable demonstration of a reading aid for a hospital bill and an insurance Explanation of Benefits. It is meant for caregivers and for families who want the papers in English or Spanish. It uses one fictional packet. The plain-language text was written ahead of time for that packet.",
        notH: "What it does not do",
        notLead: "Please read this before you use the sample as a model for your own papers.",
        not1: "It does not give medical advice, legal advice, or insurance advice.",
        not2: "It does not decide what you legally owe. A number on a bill or an EOB is something to read and ask about. It is not a ruling.",
        not3: "It does not promise that a charge will be removed, that a bill will go down, or that a conversation will end a certain way.",
        not4: "It is not a hospital, an insurance plan, a law office, a medical practice, or a patient-advocacy organization. It does not speak as a clinician, a lawyer, or a billing specialist.",
        not5: "It does not file appeals, send letters, call anyone, or contact a plan or a hospital for you.",
        not6: "It does not diagnose an illness, recommend treatment, interpret symptoms, or tell you whether to seek care.",
        sampleH: "Sample data only",
        sampleP: "Every screen is marked “Sample data / Datos de ejemplo — not a real bill.” Sample Patient, Sample General Hospital, Example Health Plan, and the member, account, and claim numbers are fictional. Choosing a file or a photo does not open that file. The page loads the bundled sample and does not send the file anywhere. There is no account and no analytics.",
        deviceH: "What stays on this device",
        deviceP: "If you save a review, this browser keeps a label and a timestamp in local storage, plus the fact that the review was sample packet SP-100. That information stays on this device, in this browser. It is not uploaded. Clearing the browser’s site data deletes it. The History page can delete one entry or clear them all.",
        helpH: "Who can actually help",
        helpP: "The useful next step is a conversation with a person who can see the real documents. This prototype only describes kinds of help. It does not list phone numbers, organization names, or websites, because a real contact has to come from your own papers or from a directory you choose.",
        help1: "Your hospital’s billing office. On a real statement, a phone number is often printed there.",
        help2: "The customer service number printed on your insurance card.",
        help3: "A nonprofit patient advocate, or your state’s consumer assistance program.",
        help4: "If you want to ask about a financial-assistance or charity-care policy, the hospital billing office can tell you whether that hospital has one and how to request it.",
        emergencyH: "Emergencies",
        emergencyP: "This prototype does not handle emergencies or medical decisions. If someone is in immediate danger, contact local emergency services. In the United States, call 911. If you or someone else is in a mental health crisis, you can call or text 988.",
        howH: "How to use the sample",
        howP: "Open the sample documents, read the bill, read the EOB, look at the comparison, and copy or print the questions. Then talk with a person. The questions include the fictional IDs on purpose, so you can see what a specific question looks like. Replace them before you use the list for anything real."
      },
      status: {
        loadedSample: "Sample packet SP-100 is open.",
        view: "{name}"
      },
      views: {
        home: "Home",
        documents: "Papers",
        summary: "Summary",
        bill: "Bill",
        eob: "EOB",
        compare: "Compare",
        questions: "Questions",
        history: "History",
        about: "About"
      }
    },
    es: {
      meta: {
        title: "Ayuda para la factura y el EOB (prototipo)",
        description: "Un prototipo que explica en lenguaje sencillo una factura médica de ejemplo y una explicación de beneficios de ejemplo. No es consejo médico, legal ni de seguro."
      },
      brand: "Ayuda para la factura y el EOB",
      brandTag: "prototipo",
      skip: "Saltar al contenido",
      langGroup: "Idioma",
      langChanged: "Idioma: español.",
      nav: {
        home: "Inicio",
        papers: "Papeles",
        history: "Historial",
        about: "Acerca de",
        menu: "Menú",
        review: "Pasos de la revisión"
      },
      steps: {
        summary: "Resumen",
        bill: "Factura",
        eob: "EOB",
        compare: "Comparar",
        questions: "Preguntas"
      },
      footer: {
        disclaimer: "Ayuda para la factura y el EOB (prototipo) sirve para leer una factura y una explicación de beneficios, ordenar preguntas y ver con qué tipo de persona hablar. No es consejo médico, legal ni de seguro. No decide lo que usted debe pagar y no promete ningún resultado.",
        more: "Aviso completo"
      },
      home: {
        h1: "Leer una factura del hospital junto al EOB del seguro",
        lede: "Un recorrido en lenguaje sencillo para personas que cuidan a un familiar y para familias que prefieren español o inglés. Va línea por línea, muestra dónde no coinciden los dos papeles y deja una lista de preguntas para hacerle a una persona real.",
        privacy: "Los únicos documentos de esta demostración son un ejemplo inventado. El archivo o la foto que usted elija no se abre y no se envía a ninguna parte.",
        step1t: "Abrir los papeles de ejemplo",
        step1: "La factura es el estado de cuenta del hospital. El EOB es la carta del plan sobre el mismo reclamo. Esta demostración usa un par inventado.",
        step2t: "Leer cada línea",
        step2: "Cada línea muestra el código de facturación, el monto facturado, el monto permitido, lo que el plan indica que pagó, y las palabras deducible, copago, coseguro y responsabilidad del paciente.",
        step3t: "Comparar y anotar preguntas",
        step3: "La comparación marca un monto que no coincide y un posible cargo duplicado, y suma la responsabilidad del paciente tal como lo hace el EOB de ejemplo.",
        start: "Abrir los documentos de ejemplo",
        about: "Leer el aviso completo",
        boundary: "Esta herramienta no le dice lo que usted debe pagar. No da consejo médico, legal ni de seguro, y no promete que una factura vaya a cambiar."
      },
      documents: {
        h1: "Agregar los dos papeles",
        intro: "La factura es el estado de cuenta del hospital o de la clínica. Una explicación de beneficios (EOB) es la carta del plan de seguro que dice cómo el plan procesó un reclamo. Son documentos distintos. Esta página lee un ejemplo de cada uno, lado a lado.",
        billTitle: "Factura del hospital",
        billHelp: "El estado de cuenta que enumera cargos y un monto que el hospital pide.",
        eobTitle: "EOB del seguro",
        eobHelp: "El informe del plan sobre el reclamo. Un EOB no es una factura.",
        choose: "Elegir un archivo",
        photo: "Tomar una foto",
        chooseBill: "Elegir un archivo de la factura del hospital",
        photoBill: "Tomar una foto de la factura del hospital",
        chooseEob: "Elegir un archivo del EOB",
        photoEob: "Tomar una foto del EOB",
        useSample: "Usar documentos de ejemplo",
        note: "Elegir un archivo o una foto no lo sube a ninguna parte. Este prototipo no puede leer sus papeles. Abre el ejemplo incluido para que usted pueda recorrer la demostración. No se envía nada.",
        empty: "Ningún documento seleccionado. No se sube nada.",
        loadedSlot: "Documento de ejemplo cargado.",
        filePicked: "Usted seleccionó “{name}”. Ese archivo se quedó en este dispositivo. No se abrió y no se envió a ninguna parte.",
        nowOpen: "El paquete de ejemplo SP-100 está abierto. Los dos papeles de abajo son el ejemplo incluido, no el archivo que usted eligió.",
        continue: "Continuar al resumen",
        readBill: "Leer la factura",
        readEob: "Leer el EOB"
      },
      empty: {
        title: "El ejemplo todavía no está abierto",
        body: "Esta pantalla usa la factura de ejemplo y el EOB de ejemplo. Ábralos primero. No se va a subir nada.",
        action: "Ir a los papeles"
      },
      masthead: {
        packet: "Paquete de ejemplo {id}",
        fictional: "Nombres y números ficticios",
        service: "Fecha del servicio",
        billDate: "Fecha de la factura",
        eobDate: "Fecha del EOB",
        patient: "Paciente",
        member: "Número de miembro",
        group: "Grupo",
        account: "Cuenta del hospital",
        claim: "Reclamo",
        statement: "Estado de cuenta",
        provider: "Hospital",
        insurer: "Plan",
        network: "Etiqueta de red en el EOB",
        inNetwork: "Dentro de la red",
        rulesTitle: "Cifras impresas en el EOB de ejemplo",
        rulesNote: "Son las reglas impresas en el ejemplo, para que se pueda seguir la cuenta. No son una decisión sobre la cobertura de nadie.",
        deductible: "Deducible individual",
        met: "Deducible ya cubierto antes de este reclamo",
        remaining: "Deducible que faltaba antes de este reclamo",
        coinsurance: "Coseguro después del deducible",
        copay: "Copago de la consulta en este ejemplo",
        copayNote: "En este ejemplo, el copago de la consulta no reduce el deducible."
      },
      summary: {
        h1: "Paquete de ejemplo SP-100",
        lede: "Esta es la factura ficticia y el EOB ficticio que este prototipo puede explicar. El texto en lenguaje sencillo se escribió de antemano para este paquete. No se produce al leer un archivo.",
        fromHistory: "Abierto desde una revisión guardada en este navegador el {when}. La etiqueta era “{label}”.",
        eobLists: "El EOB indica como responsabilidad del paciente",
        billAsks: "La factura del hospital pide",
        gap: "Diferencia entre esos totales",
        gapNote: "Los totales no son iguales. Eso es un motivo para hacer preguntas. No es una decisión sobre lo que alguien debe pagar.",
        lookTitle: "Lo que este ejemplo está armado para mostrar",
        look1: "Una línea en la que el monto de la factura y el monto del EOB no coinciden.",
        look2: "Un posible cargo duplicado, presente en la factura y ausente en el EOB.",
        look3: "Una línea en la que el EOB indica la responsabilidad del paciente como deducible más coseguro, con la suma escrita paso a paso.",
        ctaBill: "Leer la factura línea por línea",
        ctaEob: "Leer el EOB línea por línea",
        ctaCompare: "Comparar los dos papeles",
        ctaQuestions: "Preguntas para hacerle a una persona",
        glossaryTitle: "Palabras que usa este prototipo",
        glossaryNote: "Significados breves para leer estos papeles. Un plan real puede definir una palabra de otra manera. Los documentos del plan rigen el contrato real."
      },
      bill: {
        h1: "La factura de ejemplo del hospital",
        lede: "Este es el estado de cuenta de ejemplo de Sample General Hospital. “La factura pide” es el monto impreso en esa línea. No es una decisión sobre lo que usted debe pagar.",
        lineKicker: "Línea {n} de {total} de la factura",
        notOnEob: "Este cargo no está en el EOB de ejemplo."
      },
      eob: {
        h1: "La explicación de beneficios de ejemplo",
        lede: "Este es el EOB de ejemplo de Example Health Plan para el reclamo CLM-SAMPLE-1001. Un EOB dice cómo el plan procesó un reclamo. No es una factura. “Responsabilidad del paciente” es el monto que este EOB asigna a la persona asegurada.",
        lineKicker: "Línea {n} de {total} del EOB",
        missingTitle: "Una línea de la factura que no está en este EOB",
        missingBody: "La factura del hospital también incluye {service}, CPT {cpt}, cargo {chargeId}, y pide {amount}. Ese cargo no aparece en este EOB. En la factura y en la comparación está marcado como posible duplicado: es una pregunta, no una conclusión."
      },
      line: {
        charge: "Cargo",
        code: "Código de facturación",
        plain: "En lenguaje sencillo",
        words: "Palabras de esta línea",
        codeIsGeneral: "Esa descripción es información general sobre el código, no una afirmación sobre la atención de nadie.",
        billed: "Monto facturado",
        allowed: "Monto permitido",
        writeOff: "Ajuste contractual",
        deductible: "Deducible",
        copay: "Copago",
        coinsurance: "Coseguro",
        planPaid: "Pagó el plan",
        patient: "Responsabilidad del paciente (EOB)",
        billAsks: "La factura pide",
        onEob: "En el EOB",
        no: "No está en este EOB",
        yes: "Sí",
        match: "Los montos coinciden",
        mismatch: "Los montos no coinciden",
        duplicate: "Posible duplicado",
        teaching: "Deducible + coseguro",
        seeQuestions: "Hay una pregunta sobre esta línea en la lista de preguntas.",
        mathCaption: "Cómo el EOB indica la responsabilidad del paciente en esta línea"
      },
      compare: {
        h1: "La factura y el EOB, lado a lado",
        lede: "Esta página pone el estado de cuenta de ejemplo junto al EOB de ejemplo. Señala números que no coinciden. No decide cuál papel tiene razón y no decide lo que alguien debe pagar.",
        jump: "En esta página",
        jumpMismatch: "Montos que no coinciden",
        jumpDup: "Posible duplicado",
        jumpMath: "Cómo el EOB indica {amount}",
        totalsCaption: "Totales impresos en los dos documentos de ejemplo",
        writeoffTitle: "Una diferencia que este ejemplo trata como habitual",
        writeoffBody: "El monto facturado y el monto permitido suelen ser distintos. En las líneas que coinciden, esa diferencia se llama ajuste contractual: estos documentos de ejemplo la tratan como no cobrable según la tarifa del plan. No figura como un pago de la persona asegurada. El desajuste marcado más abajo es otro tipo de diferencia. Compara lo que pide la factura con la responsabilidad del paciente del EOB.",
        mismatchTitle: "Montos que no coinciden",
        mismatchBody: "{service} (CPT {cpt}, cargo {chargeId}) está en los dos papeles. La factura pide {billAsks}. El EOB indica una responsabilidad del paciente de {eobPatient} y un pago del plan de {planPaid}. La diferencia es {gap}, igual que el pago del plan. Una lectura posible es que la factura todavía muestra el monto permitido de {allowed} y no muestra aplicado el pago del plan. Esta herramienta no puede decirle cuál documento es el correcto.",
        dupTitle: "Posible cargo duplicado",
        dupBody: "La factura incluye {service} dos veces, las dos con CPT {cpt}, las dos con fecha {date}. El cargo {firstId} también está en el EOB. El cargo {secondId} pide {amount} y no está en el EOB. Dos líneas con el mismo código, la misma descripción y la misma fecha pueden ser un servicio anotado dos veces. También pueden ser dos servicios codificados de la misma manera. Esta página marca la segunda línea para que usted pueda preguntar. No decide que el cargo esté mal.",
        partsTitle: "De dónde sale la diferencia de {gap} entre los totales",
        partsIntro: "Las otras líneas piden el mismo monto que indica el EOB. No suman nada a esta diferencia.",
        partMismatch: "{chargeId}: la factura pide {gap} más de lo que indica el EOB.",
        partDup: "{chargeId}: la factura pide {amount} y el EOB no tiene una línea que corresponda.",
        partSum: "{a} + {b} = {gap}.",
        mathTitle: "Cómo el EOB indica {amount}",
        mathLede: "El EOB de ejemplo aplica las reglas impresas en este orden. Es la aritmética del ejemplo. No es una afirmación de lo que alguien debe pagar. La segunda línea de la radiografía no entra en este total, porque no está en el EOB.",
        checksumTitle: "Una comprobación que usted puede repetir",
        checksumBody: "Los pagos del plan en el EOB suman {plan}. Las líneas de responsabilidad del paciente suman {patient}. Juntas equivalen a los montos permitidos, {allowed}. {plan} + {patient} = {allowed}.",
        allTitle: "Todas las líneas",
        eobLists: "El EOB indica",
        billAsks: "La factura pide",
        status: "Estado",
        notOnEob: "No está en el EOB",
        openBill: "Ver esta línea en la factura",
        openEob: "Ver esta línea en el EOB",
        thenQuestions: "Llevar estas notas a la lista de preguntas"
      },
      math: {
        startTitle: "Antes de este reclamo",
        startBody: "El EOB muestra {met} de un deducible individual de {annual} ya cubiertos. Deducible que falta: {remaining}.",
        visitTitle: "Consulta, copago",
        visitBody: "CPT {cpt}, cargo {chargeId}. Este ejemplo trata la consulta como un copago de {copay}. Aquí el copago no reduce el deducible, así que el deducible que falta sigue en {remaining}. El EOB indica un pago del plan de {plan} (el resto del monto permitido de {allowed}).",
        cbcTitle: "Conteo de sangre, aplicado al deducible",
        cbcBody: "CPT {cpt}, cargo {chargeId}. El monto permitido es {allowed}. El EOB lo aplica todo al deducible. La línea de pago del plan es {plan}. Deducible que falta después de esta línea: {remaining}.",
        bmpTitle: "Panel metabólico, deducible y coseguro",
        bmpBody: "CPT {cpt}, cargo {chargeId}. El monto permitido es {allowed}. Todavía faltaban {deductible} del deducible, y esta línea los usa todos. Monto permitido que sobra: {base}. El coseguro en este ejemplo es el {rate}% de ese sobrante, o sea {coinsurance}. La línea de pago del plan muestra el otro {planShare}%: {plan}. Deducible que falta después de esta línea: {remaining}.",
        xrayTitle: "Radiografía de tórax que sí está en el EOB",
        xrayBody: "CPT {cpt}, cargo {chargeId}. El monto permitido es {allowed}. El deducible ya se cubrió, así que esta línea usa solo el coseguro. El {rate}% de {allowed} es {coinsurance}. La línea de pago del plan muestra {plan}.",
        add: "Se suma al total de responsabilidad del paciente",
        running: "Total acumulado que va armando el EOB",
        remaining: "Deducible que falta",
        rowDeductible: "Deducible aplicado",
        rowCoinsurance: "Coseguro, {rate}% de {base}",
        rowPlan: "Pagó el plan (no forma parte de la línea de responsabilidad del paciente)",
        rowPatient: "El EOB indica en esta línea",
        doneTitle: "Lo que el EOB indica para el reclamo",
        doneBody: "Al sumar las cuatro líneas del EOB da {total}. La factura del hospital pide {bill} en cinco líneas. Son dos totales distintos."
      },
      questions: {
        h1: "Preguntas para hacerle a una persona",
        lede: "Estas preguntas están redactadas a partir de los papeles de ejemplo. Cópielas o imprímalas, y luego edítelas con sus propias palabras. Si alguna vez usa esta lista para papeles reales, reemplace primero cada nombre y cada número. No le dé a una oficina de facturación los números de ejemplo como si fueran suyos.",
        boundary: "Esto no es una carta de disputa. No es consejo médico, legal ni de seguro. La lista no dice lo que alguien debe pagar y no promete que un cargo vaya a cambiar.",
        hospitalTitle: "Preguntas para la oficina de facturación del hospital",
        hospitalNote: "El teléfono, si existe, estaría en un estado de cuenta real. Este prototipo no da ningún número.",
        planTitle: "Preguntas para el plan de seguro",
        planNote: "Use el número de servicio al cliente impreso en la tarjeta del seguro. Este prototipo no da ningún número.",
        papersTitle: "Papeles para tener a mano",
        whoTitle: "Quién más puede ayudar",
        whoNote: "Este prototipo solo nombra tipos de ayuda. No enumera organizaciones, sitios web ni teléfonos.",
        copy: "Copiar preguntas",
        copied: "Copiado al portapapeles de este dispositivo. No se envió nada.",
        copyFailed: "El portapapeles no estaba disponible. El recuadro de texto está seleccionado para que pueda copiarlo con el teclado. No se envió nada.",
        print: "Imprimir preguntas",
        plainLabel: "Versión en texto sencillo",
        qHospital1: "El estado de cuenta tiene dos líneas de “{service}”, las dos con CPT {cpt} y las dos con fecha {date}: el cargo {firstId} y el cargo {secondId}. La explicación de beneficios incluye este servicio una sola vez. ¿Son dos servicios distintos, o una línea se anotó dos veces? Si una línea se anotó dos veces, por favor envíe un estado de cuenta corregido.",
        qHospital2: "En el cargo {chargeId} ({service}, CPT {cpt}), el estado de cuenta pide {billAsks}. El EOB del reclamo {claimId} indica una responsabilidad del paciente de {eobPatient} y muestra un pago del plan de {planPaid}. ¿Puede mostrar cómo el estado de cuenta llegó a {billAsks} y si ese pago del plan ya se aplicó a la cuenta {accountId}?",
        qHospital3: "Por favor confirme la cuenta {accountId} y el estado de cuenta {statementId}, y dígame qué cargos de este estado de cuenta están incluidos en el reclamo {claimId}.",
        qHospital4: "Si se corrige un cargo, por favor envíe un estado de cuenta actualizado que enumere cada cargo que quede, cualquier monto que el plan haya pagado y el monto que el estado de cuenta todavía pide.",
        qHospital5: "Por favor dígame el nombre de la persona con la que hablo y un número de referencia de esta conversación.",
        qPlan1: "Por favor recorra el reclamo {claimId} y cómo el EOB llega a un total de responsabilidad del paciente de {total}, línea por línea. En especial quiero seguir el deducible y el coseguro del CPT {cpt} ({service}), cargo {chargeId}, que el EOB indica como {lineAmount}.",
        qPlan2: "Este EOB muestra {met} de un deducible de {annual} ya cubiertos antes del reclamo, y {remaining} pendientes. ¿Es lo que muestran sus registros para el miembro {memberId} cuando se procesó el reclamo?",
        qPlan3: "Para el CPT {cpt}, cargo {chargeId}, el EOB indica un monto permitido de {allowed}, un pago del plan de {planPaid} y una responsabilidad del paciente de {eobPatient}. El estado de cuenta del hospital pide {billAsks} en esa línea. ¿Puede confirmar si {provider} recibió un pago de {planPaid} y en qué fecha?",
        qPlan4: "El estado de cuenta del hospital tiene una segunda línea de CPT {cpt}, cargo {chargeId}, por {amount}. No la veo en este EOB. ¿Ese cargo es parte de este reclamo, de otro reclamo, o no está en el expediente?",
        qPlan5: "Este EOB marca a {provider} como dentro de la red. Por favor confírmelo, y dígame dónde describen los documentos del plan el copago, el deducible y el coseguro usados en este reclamo. Si no estoy de acuerdo con cómo se procesó una línea, ¿qué pasos de revisión describe este plan, qué plazo escribe el propio plan y dónde está escrito?",
        paper1: "El estado de cuenta del hospital.",
        paper2: "La explicación de beneficios de este reclamo.",
        paper3: "La tarjeta del seguro.",
        paper4: "Una nota con la fecha, el nombre de la persona con la que habló y cualquier número de referencia. Esas notas se quedan con usted. Este prototipo no las guarda, salvo que usted guarde una etiqueta de la revisión en este navegador.",
        who1: "La oficina de facturación de su hospital. En un estado de cuenta real, el número suele estar impreso en la factura.",
        who2: "El número de servicio al cliente que figura en su tarjeta del seguro.",
        who3: "Una persona defensora de pacientes de una organización sin fines de lucro, o el programa de asistencia al consumidor de su estado.",
        who4: "Si quiere preguntar si un hospital tiene una política de asistencia financiera o de atención benéfica, la oficina de facturación puede decirle si ese hospital la tiene y cómo solicitarla.",
        textHeader: "Ayuda para la factura y el EOB (prototipo)\nDATOS DE EJEMPLO — no es una factura real\nPaquete de ejemplo {id}\nPaciente: {patient}\nHospital: {provider}\nPlan: {insurer}\nCuenta: {account}\nEstado de cuenta: {statement}\nReclamo: {claim}\nMiembro: {member}\n\nEstas preguntas se escribieron a partir de documentos de ejemplo ficticios. Si las usa como punto de partida para sus propios papeles, reemplace primero los nombres y los números. No le entregue a una oficina de facturación estos números de ejemplo como si fueran reales.\n\nEsto no es una carta de disputa. No es consejo médico, legal ni de seguro. No decide lo que alguien debe pagar y no promete ningún resultado."
      },
      glossary: {
        cpt: "Un código de facturación impreso en las facturas y en los EOB. Emparejar el código ayuda a ver si dos líneas se refieren al mismo servicio anotado. El código no es un diagnóstico.",
        billed: "El precio del proveedor en el estado de cuenta, antes de la tarifa permitida del plan.",
        allowed: "La tarifa que el estado de cuenta del plan dice que corresponde a ese servicio.",
        writeOff: "En estas líneas de ejemplo, el monto facturado menos el monto permitido. El ejemplo trata esa diferencia como no cobrable según la tarifa del plan. No figura como un pago de la persona asegurada.",
        planPaid: "El monto que el EOB dice que el plan pagó sobre el monto permitido.",
        deductible: "El monto que el estado de cuenta del plan dice que paga la persona asegurada por servicios cubiertos antes de que el plan empiece a compartir el costo. Este ejemplo muestra un deducible individual.",
        copay: "Una cantidad fija que el estado de cuenta del plan indica para ciertas visitas. En este ejemplo, el copago de la consulta no reduce el deducible.",
        coinsurance: "Un porcentaje de un monto permitido que el estado de cuenta del plan asigna a la persona asegurada después de cubierto el deducible. Este ejemplo indica 20%.",
        patient: "El monto que el EOB asigna a la persona asegurada en una línea o en un reclamo. Leerlo aquí no es una conclusión sobre una deuda legal.",
        inNetwork: "Una etiqueta de este EOB de ejemplo que significa que el plan incluye al hospital como proveedor contratado. Este ejemplo está marcado dentro de la red. Las facturas se pueden procesar de otra manera cuando esa etiqueta es distinta.",
        eob: "Explicación de beneficios. El informe escrito del plan sobre cómo procesó un reclamo. No es la factura del hospital.",
        claim: "La solicitud de pago que procesó el plan. El número de reclamo de ejemplo es CLM-SAMPLE-1001.",
        duplicate: "Una línea que este prototipo marca porque la factura repite un código, una descripción y una fecha, y el EOB incluye ese servicio solo una vez. “Posible” significa que es una pregunta para la oficina de facturación. No es una conclusión de que el cargo esté mal."
      },
      glossaryLabels: {
        cpt: "Código de facturación (CPT)",
        billed: "Monto facturado",
        allowed: "Monto permitido",
        writeOff: "Ajuste contractual",
        planPaid: "Pagó el plan",
        deductible: "Deducible",
        copay: "Copago",
        coinsurance: "Coseguro",
        patient: "Responsabilidad del paciente",
        inNetwork: "Dentro de la red",
        eob: "EOB",
        claim: "Reclamo",
        duplicate: "Posible duplicado"
      },
      save: {
        button: "Guardar esta revisión",
        title: "Guardar esta revisión en este navegador",
        body: "La entrada se queda en el almacenamiento local de este navegador, en este dispositivo. Guarda una etiqueta, la hora y el dato de que usted estaba viendo el paquete de ejemplo SP-100. No guarda un archivo subido, porque ningún archivo se lee. No se envía a ninguna parte. Cada guardado agrega una entrada. Puede borrarla en Historial.",
        label: "Etiqueta",
        placeholder: "Por ejemplo: Visita de marzo, ejemplo",
        cancel: "Cancelar",
        confirm: "Guardar en este navegador",
        saved: "Guardado en este navegador. No se envió a ninguna parte.",
        capped: "Guardado en este navegador. Se quitó la entrada más antigua para conservar 30 revisiones.",
        failed: "Este navegador no permitió guardar. El ejemplo sigue abierto en esta página, pero no se va a conservar.",
        defaultLabel: "Paquete de ejemplo SP-100"
      },
      history: {
        h1: "Revisiones guardadas en este navegador",
        lede: "Las revisiones que usted guarda se quedan solo en el almacenamiento local de este navegador, en este dispositivo. No son una cuenta, no se suben, y otro navegador o teléfono no las va a mostrar. Borrar los datos del sitio para esta página las elimina. Este prototipo lo explica aquí para que no sea una sorpresa.",
        empty: "Todavía no hay revisiones guardadas en este navegador. Abra el ejemplo y elija “Guardar esta revisión” si quiere que aparezca una aquí.",
        back: "El paquete de ejemplo sigue abierto",
        open: "Abrir",
        delete: "Borrar",
        clear: "Borrar todo",
        savedOn: "Guardado el {when}",
        packet: "Paquete de ejemplo {id}",
        deleteTitle: "¿Borrar esta revisión guardada?",
        deleteBody: "Se va a quitar “{label}” del almacenamiento local de este navegador. Los documentos de ejemplo siguen disponibles. No se envía nada.",
        clearTitle: "¿Quitar todas las revisiones guardadas?",
        clearBody: "Se va a borrar cada revisión que este prototipo guardó en este navegador. Desde esta página no se puede deshacer. No se envía nada.",
        confirmDelete: "Borrar",
        confirmClear: "Borrar todo",
        cancel: "Cancelar",
        deleted: "Esa revisión se borró de este navegador.",
        cleared: "Se quitaron de este navegador todas las revisiones guardadas.",
        failed: "Este navegador no permitió cambiar las revisiones guardadas.",
        count: "{count} guardadas en este navegador"
      },
      about: {
        h1: "Acerca de este prototipo",
        whatH: "Qué es",
        whatP: "Esta es una demostración en la que se puede hacer clic, de una ayuda para leer una factura de hospital y una explicación de beneficios del seguro. Está pensada para personas que cuidan a un familiar y para familias que quieren los papeles en español o en inglés. Usa un paquete ficticio. El texto en lenguaje sencillo se escribió de antemano para ese paquete.",
        notH: "Qué no hace",
        notLead: "Lea esto antes de usar el ejemplo como modelo para sus propios papeles.",
        not1: "No da consejo médico, consejo legal ni consejo de seguro.",
        not2: "No decide lo que usted debe pagar por ley. Un número en una factura o en un EOB es algo para leer y sobre lo cual preguntar. No es un fallo.",
        not3: "No promete que un cargo se vaya a quitar, que una factura vaya a bajar o que una conversación vaya a terminar de una manera determinada.",
        not4: "No es un hospital, un plan de seguro, un bufete, un consultorio médico ni una organización de defensa del paciente. No habla como personal clínico, como abogado ni como especialista en facturación.",
        not5: "No presenta apelaciones, no envía cartas, no llama a nadie y no contacta a un plan ni a un hospital por usted.",
        not6: "No diagnostica una enfermedad, no recomienda un tratamiento, no interpreta síntomas y no le dice si debe buscar atención.",
        sampleH: "Solo datos de ejemplo",
        sampleP: "Cada pantalla está marcada con “Sample data / Datos de ejemplo — not a real bill”. Sample Patient, Sample General Hospital, Example Health Plan y los números de miembro, de cuenta y de reclamo son ficticios. Elegir un archivo o una foto no abre ese archivo. La página carga el ejemplo incluido y no envía el archivo a ninguna parte. No hay cuenta ni analítica.",
        deviceH: "Qué se queda en este dispositivo",
        deviceP: "Si usted guarda una revisión, este navegador conserva en el almacenamiento local una etiqueta y la fecha, además del dato de que la revisión era el paquete de ejemplo SP-100. Esa información se queda en este dispositivo, en este navegador. No se sube. Borrar los datos del sitio del navegador la elimina. La página Historial puede borrar una entrada o borrarlas todas.",
        helpH: "Quién puede ayudar de verdad",
        helpP: "El paso útil que sigue es una conversación con una persona que pueda ver los documentos reales. Este prototipo solo describe tipos de ayuda. No enumera teléfonos, nombres de organizaciones ni sitios web, porque un contacto real tiene que salir de sus propios papeles o de un directorio que usted elija.",
        help1: "La oficina de facturación de su hospital. En un estado de cuenta real, a menudo hay un teléfono impreso ahí.",
        help2: "El número de servicio al cliente impreso en su tarjeta del seguro.",
        help3: "Una persona defensora de pacientes de una organización sin fines de lucro, o el programa de asistencia al consumidor de su estado.",
        help4: "Si quiere preguntar por una política de asistencia financiera o de atención benéfica, la oficina de facturación del hospital puede decirle si ese hospital la tiene y cómo solicitarla.",
        emergencyH: "Emergencias",
        emergencyP: "Este prototipo no atiende emergencias ni decisiones médicas. Si alguien está en peligro inmediato, contacte a los servicios de emergencia locales. En Estados Unidos, llame al 911. Si usted u otra persona está en una crisis de salud mental, puede llamar o enviar un mensaje de texto al 988.",
        howH: "Cómo usar el ejemplo",
        howP: "Abra los documentos de ejemplo, lea la factura, lea el EOB, mire la comparación y copie o imprima las preguntas. Después hable con una persona. Las preguntas incluyen a propósito los números ficticios, para que se vea cómo es una pregunta concreta. Reemplácelos antes de usar la lista para algo real."
      },
      status: {
        loadedSample: "El paquete de ejemplo SP-100 está abierto.",
        view: "{name}"
      },
      views: {
        home: "Inicio",
        documents: "Papeles",
        summary: "Resumen",
        bill: "Factura",
        eob: "EOB",
        compare: "Comparar",
        questions: "Preguntas",
        history: "Historial",
        about: "Acerca de"
      }
    }
  };

  function getLang() {
    if (root.BillEob && typeof root.BillEob.getLang === "function") {
      return root.BillEob.getLang();
    }
    return "en";
  }

  function lookup(lang, path) {
    var node = dict[lang];
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i += 1) {
      if (!node || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function t(path, vars, lang) {
    var use = lang || getLang();
    var str = lookup(use, path);
    if (typeof str !== "string") str = lookup("en", path);
    if (typeof str !== "string") return path;
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (match, key) {
      if (Object.prototype.hasOwnProperty.call(vars, key)) return String(vars[key]);
      return match;
    });
  }

  function applyStatic(lang) {
    document.documentElement.lang = lang === "es" ? "es" : "en";
    document.title = t("meta.title", null, lang);
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t("meta.description", null, lang));
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"), null, lang);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label"), null, lang));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"), null, lang));
    });
    var enButton = document.getElementById("lang-en");
    var esButton = document.getElementById("lang-es");
    if (enButton && esButton) {
      var isEs = lang === "es";
      enButton.setAttribute("aria-pressed", isEs ? "false" : "true");
      esButton.setAttribute("aria-pressed", isEs ? "true" : "false");
    }
  }

  root.BillEob = root.BillEob || {};
  root.BillEob.t = t;
  root.BillEob.applyStatic = applyStatic;
  root.BillEob.dictionary = dict;
})(typeof globalThis !== "undefined" ? globalThis : this);
