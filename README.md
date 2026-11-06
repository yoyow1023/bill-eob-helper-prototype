# Bill & EOB Helper (prototype)

A static, clickable prototype that walks through a **fictional** hospital bill and a **fictional** insurance Explanation of Benefits (EOB) in plain language, in English and Spanish.

It is a reading aid for caregivers and for families who use English or Spanish. It does not give medical, legal, or insurance advice. It does not decide what anyone must pay, and it does not promise any result.

Nothing is uploaded. Choosing a file or a photo does not open that file. The page always shows the bundled sample. Reviews you save stay in this browser’s local storage on this device only.

## Run it locally

No build step and no server-side code. From this folder:

```bash
python3 -m http.server 47321
```

Then open `http://127.0.0.1:47321/`. Paths are relative, so the same files also work when the site is served from a subpath.

JavaScript has to be enabled to move between screens. The page does not call any network API.

## What you can click through

1. **Papers.** “Use sample documents” opens sample packet SP-100. Choosing a file or taking a photo does the same thing and does not read the file.
2. **Bill and EOB.** Each line explains the billing code, billed amount, allowed amount, plan payment, deductible, copay, coinsurance, and patient responsibility.
3. **Compare.** Shows where the two papers disagree, and adds up the patient-responsibility figure the way the sample EOB does.
4. **Questions.** A list you can copy or print, to ask a hospital billing office and an insurance plan.
5. **History.** Save the open review, open it again, delete one, or clear all. Storage is `localStorage` in this browser only.
6. **Language.** English / Español on every screen. The choice is remembered in `localStorage`.

Every screen is marked: `Sample data / Datos de ejemplo — not a real bill`.

## The sample packet (all fictional)

| | |
|---|---|
| Patient | Sample Patient |
| Hospital | Sample General Hospital |
| Plan | Example Health Plan — Sample PPO |
| Member | EX-00000000 |
| Account | ACCT-SAMPLE-42 |
| Claim | CLM-SAMPLE-1001 |
| Date of service | March 12, 2026 |

The sample plan prints a $1,500 individual deductible, with $1,200 already met before this claim ($300 left), a $40 office-visit copay that does not reduce the deductible, and 20% coinsurance after the deductible.

Seeded on purpose:

- **Amounts that do not match.** Chest X-ray, CPT 71046, charge CHG-1004. The bill asks for $85.00 (the allowed amount). The EOB lists patient responsibility of $17.00 after a $68.00 plan payment.
- **Possible duplicate.** Charge CHG-1005 repeats “Chest X-ray, 2 views,” CPT 71046, on the same date, and asks for $210.00. The EOB lists that service once. The prototype flags it as a question. It does not decide that the charge is wrong.
- **Deductible plus coinsurance.** Basic metabolic panel, CPT 80048, charge CHG-1003. The EOB applies the last $278.00 of the deductible, then 20% coinsurance on the remaining $132.00 allowed ($26.40). It lists $304.40. The bill asks for the same $304.40.

The EOB’s four lines list $383.40 as patient responsibility. The bill’s five lines ask for $661.40. The $278.00 gap is $68.00 from the X-ray mismatch plus $210.00 from the extra X-ray line. Plan payments ($293.60) plus the EOB patient-responsibility total ($383.40) equal the allowed amounts ($677.00).

## Files

- `index.html` — screens, footer disclaimer, sample banner
- `css/styles.css`
- `js/sample-data.js` — the fictional packet and its arithmetic check
- `js/i18n.js` — English and Spanish interface text
- `js/explain.js` — line explanations and the question list
- `js/app.js` — navigation, language, and history
- `favicon.svg`
