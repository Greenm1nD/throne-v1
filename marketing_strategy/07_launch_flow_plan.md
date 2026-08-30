# გეგმა v2 — „გაშვების ნაკადი" Figma-ფაილის ბლუპრინტი

**თარიღი:** 2026-08-31 · **ვერსია:** 2.1 (v2-რევიუს 5 შესწორება შეტანილია)
**სტატუსი:** ⏳ დასადასტურებელი — Figma იწყება მხოლოდ შენი OK-ს შემდეგ
**ეს ვერსია ანაცვლებს** ბაზრების კლასიფიკაციებს 01 §2.6-ში, 03 §1.1-სა და 06-ში — ისინი counsel-სპრინტის შემდეგ ჰარმონიზდება (ორივეს გაფრთხილების ბანერი დაედო).

---

## 0. პასუხი რევიუზე — რა შეიცვალა

| რევიუს პუნქტი | სტატუსი v2-ში |
|---|---|
| ბაზრების რუკა (2/10) | ✅ თავიდან აწყობილი: market-cell gate მოდელი; CL/JP → 🔴 (გადამოწმებული პირველწყაროებით); PE/MX/DR/EC → 🟡 licensing track; PY/GT/CR → ⚪ verify; **GREEN დღეს ცარიელია** |
| „ბიუჯეტი ≠ launch budget" | ✅ სამფენიანი მოდელი: Operating + Acquisition + Liquidity/Reserve = **Total Capital Requirement** |
| Acquisition-ციფრების შეუთავსებლობა | ✅ თითო სცენარს საკუთარი თვიური ცხრილი აქვს + scale-start KPI-gate; $45–70k/თვე მხოლოდ Aggressive-შია |
| 2.5×-ის არითმეტიკა + NGR≠LTV | ✅ ცხრილი გასწორდა; gate გადავიდა **Contribution LTV / CAC**-ზე; CPA-ჭერი გამკაცრდა |
| KPI-ს profitability-ძრავა | ✅ definitions-სვეტი + 12 ახალი მეტრიკა |
| Launch Gate არასრული | ✅ 4 დამოუკიდებელი gate + 10-პუნქტიანი jurisdiction readiness თითო ქვეყანაზე |
| T-ღერძი | ✅ T = **პირველი ბაზრის Production Readiness Date** (არა ბექენდის დღე) |
| RACI პერსონალიზებული | ✅ ფუნქციებზე აგებული (11 ფუნქცია), ადამიანები role-ზე ებმიან |
| **v2-რევიუს 5 პუნქტი** | ✅ v2.1: Bolivia → 🟡 · Japan „prohibited" (არა „criminal") · DR ≈$690k შესვლა · paid-ჯამები $62/199/399k · Capital-სათაური → „ინდიკატიური, ლიცენზირებამდე" + TBD-ხაზი |

**შენარჩუნებული ~80%:** 10-გვერდიანი სტრუქტურა · Pre→Gate→Soft→Public→Scale ნაკადი · Soft Launch = ეკონომიკის აღმოჩენა და არა მოცულობა · vendor-independence · საკუთარი ატრიბუცია · კონცენტრაციის ლიმიტები · demo-data gate · RG day-1 · რისკების გვერდის მიდგომა.

---

## ახალი მთავარი თეზისი (გვერდი 1)

> გაშვების გეგმა არ იწყება კითხვით „სად ვიყიდოთ ტრაფიკი?" — ის იწყება კითხვით:
> **„რომელი market-cell არის ერთდროულად legal + payable + operable + measurable + profitable?"**
> რუკა ცარიელი იწყება. ქვეყანა GREEN-ს **იმსახურებს** 10-პუნქტიანი gate-ის გავლით — და მხოლოდ ამის შემდეგ ხვდება acquisition-ბიუჯეტში.

---

## გვერდი 2 · ✅ ინვენტარი
(უცვლელი v1-დან — 15-პუნქტიანი ცხრილი სტატუსებით; ემატება ხაზი: „ბაზრების იურიდიული დოსიეები — ❌ დასაწყები, counsel-სპრინტი T−30-ის პირველი ამოცანაა")

## გვერდი 3 · 🌍 ბაზრები v2 — Market-Cell Gate

**ხუთი პირობა GREEN-ისთვის:** Legal · Payable · Operable · Measurable · Profitable — ხუთივე ერთდროულად.

| ბაზარი | v2 სტატუსი | საფუძველი |
|---|---|---|
| **Chile** | 🔴 დახურული | უზენაესი სასამართლო 2025-09: ონლაინ-თამაში უკანონოა expressly authorized-ის გარდა; telecoms-ბლოკი; 2026-04 mirror-ბლოკებიც |
| **Japan** | 🔴 დახურული | 2025-09-25: პრომო/რეკლამა/აფილიატ-ლინკები/recommendation-საიტები **აკრძალულია (prohibited)**; NPA-აღსრულება. **Japan-მიმართული აფილიატ/ინფლუენსერ პრომო — აკრძალულია იაპონური კანონით.** ქვეყანა = $0 |
| Brazil | 🔴 | SPA-ლიცენზია + ANATEL (უცვლელი) |
| Colombia | 🔴 | Coljuegos (უცვლელი) |
| Bolivia | 🟡 **Licensing track — ლოკალური ერთეული სავალდებულო** | AJ-ს აქვს მოქმედი ონლაინ-ლიცენზიის ჩარჩო, მაგრამ მხოლოდ ბოლივიაში დაფუძნებული/domiciled იურ. პირებისთვის; არაავტორიზებული ოპერაცია უკანონოა. **Curaçao-only მოდელით ვერ შევა** |
| აზია-კრიმინალი / EU-ლიცენზირებული | 🔴 | უცვლელი |
| **Peru** | 🟡 **Licensing track** | MINCETUR-ს აქვს პირდაპირი authorization-პროცედურა, უცხოური კომპანიებისთვისაც — **რეგულირებული შესაძლებლობაა**, არა grey |
| **Mexico** | 🟡 Licensing track | SEGOB-permit აუცილებელია; Curaçao ≠ ავტორიზაცია; 2026-08 გამკაცრება განიხილება |
| **Dominican Rep.** | 🟡 Licensing track — **ძვირი შესვლა** | ონლაინ-ლიცენზია: **ღირებულება RD$20.47m ≈ $347k + performance bond RD$20m ≈ $339k → შესვლის ქეში ≈ $690k** implementation/ოპერაციულ ხარჯებამდე; ლოკალური ოფისი/call-center, .do დომენი, Commercial Registry/RNC-რეგისტრაცია. **„სწრაფი ბაზრის" სტატუსს კარგავს** |
| Ecuador | 🟡 opinion | ცალკე casino/sportsbook legal opinion |
| Argentina | 🟡 პროვინციული | CABA/PBA ლიცენზიები |
| Paraguay · Guatemala · Costa Rica | ⚪ VERIFY | ადგილობრივი counsel-დოსიე კლასიფიკაციამდე |
| **GREEN დღეს** | **∅ ცარიელი** | პირველი GREEN = counsel-სპრინტის შედეგი |

**Soft Launch-ის ბაზარი დღეს უცნობია** — ის counsel-სპრინტიდან გამოვა (სისწრაფის კანდიდატები: Peru — მკაფიო პროცედურით; Mexico — ლოკალური პარტნიორის permit-გზით). ეს გეგმის ყველაზე მნიშვნელოვანი ცვლილებაა.

## გვერდი 4 · 🗺 ნაკადი v2 — T-ღერძი ოთხი gate-ით

**T = პირველი ბაზრის Production Readiness Date.** T დგება მხოლოდ მაშინ, როცა ოთხივე დამოუკიდებელი gate PASS-ია:

```
Product Ready ──┐
Payments Ready ─┼─→ ოთხივე PASS → T · Soft Launch (1 ბაზარი)
Compliance Ready┤
Acquisition Rdy─┘
```

- **Product:** launch-gate ჩეკლისტი (დემო→რეალური, ატრიბუცია, ანალიტიკა)
- **Payments:** ≥2 ლოკალური მეთოდი ცოცხალი · გატანის ტესტი რეალური თანხით · rolling-reserve პირობები ცნობილი · float საკმარისი
- **Compliance:** ბაზრის 10-პუნქტიანი jurisdiction gate (გვ. 8) · T&C/RG/AML ვიზირებული
- **Acquisition:** ≥5 seed-პარტნიორი ხელმოწერილი · კრეატივები compliance-რევიუთი · ტრეკინგი E2E გატესტილი

ბექენდის მიბმა ამ მოდელში Product-gate-ის **წინაპირობაა** და არა თავად T.

## გვერდი 5 · 📣 არხები
(v1-ის სტრუქტურა რჩება; ცვლილებები:) Scale-ის ტემპები სცენარზეა მიბმული და არა საერთო · იაპონია ამოღებულია ყველგან · „რა არ მუშაობს" ბლოკს ემატება: **Japan-მიმართული აფილიატ/ინფლუენსერ პრომო — აკრძალულია (prohibited) 2025-09-25-დან**.

## გვერდი 6 · 💰 ბიუჯეტი v2 — სამი ფენა

### 6.1 ფენა A · Operating Platform Cost (წლიური, ინდიკატიური)

| მუხლი | Lean | Base | Aggressive |
|---|---:|---:|---:|
| ჰოსტინგი/ინფრა/CDN | $15k | $22k | $30k |
| KYC/AML per-check | $8k | $18k | $30k |
| პროვაიდერების მინიმუმები* | $30k | $55k | $90k |
| Support (LatAm, ES) | $35k | $60k | $90k |
| Security/pentest/DDoS | $15k | $25k | $35k |
| Legal/compliance retainer + 6–8 country-opinion | $45k | $65k | $90k |
| ლიცენზირების განაცხადები (PE/MX/DR — რომელსაც ავირჩევთ) | TBD² | TBD² | TBD² |
| Ops/სხვა | $20k | $35k | $50k |
| **ჯამი A** | **~$170k** | **~$280k** | **~$415k** |

\* rev-share GGR-დანაა (COGS), აქ მხოლოდ ფიქსირებული მინიმუმებია · ² counsel-სპრინტი დააზუსტებს — მასშტაბის მაგალითი: DR-ის ლიცენზიის ღირებულება ≈$347k (bond ცალკე, ფენა C); Peru-ს ფასები გამოქვეყნებადია

### 6.2 ფენა B · Acquisition — თითო სცენარს საკუთარი timeline

**Scale-start KPI-gate (სამივესთვის საერთო):** scale იწყება მხოლოდ თუ blended CPA ≤ ჭერი **და** FTD→2nd-deposit ≥30% **და** deposit-approval ≥85% **და** contribution-payback ტრენდი ≤6 თვე.

| Paid media | Lean | Base | Aggressive |
|---|---:|---:|---:|
| Discovery (თვე 1–2) | $3k/თვე | $9k → $16k | $12k → $25k |
| Validation (თვე 3–5) | $7k/თვე | $16k/თვე | $25k/თვე |
| Scale (თვე 6–12) | **capped $5k/თვე** | $18k/თვე | $41k/თვე |
| **Paid წლიური** | **$62k** | **$199k** | **$399k** |

| სტრიმერები (Kick/TG) | Lean | Base | Aggressive |
|---|---:|---:|---:|
| თვე 1–3 (CPA-only ტრიალები) | ~$1.5k/თვე | $4.5k→$9k | $4.5k→$16k |
| პიკი (თვე 6+) | $4k/თვე | **$15k/თვე** | **$30k/თვე** |
| **წლიური** | **~$40k** | **~$150k** | **~$280k** |

(02-ის „$54k/თვე" მრუდი = ზედა ზღვარი, არა Base — 02 შესაბამისად შესწორდება)

| სხვა acquisition | Lean | Base | Aggr |
|---|---:|---:|---:|
| აფილიატ-CPA ავანსები/პრიზები | $25k | $80k | $180k |
| SEO/კონტენტი ES-419 | $24k | $42k | $60k |
| **ჯამი B** | **~$151k** | **~$471k** | **~$919k** |

### 6.3 ფენა C · Liquidity & Reserve (კაპიტალი, არა P&L)

| მუხლი | Lean | Base | Aggressive |
|---|---:|---:|---:|
| PSP rolling reserve (5–10% დეპოზიტების, 90–180დ) | $30–60k | $80–160k | $180–350k |
| მოთამაშეთა float + გატანის ლიკვიდობა | $30–50k | $80–150k | $150–300k |
| აფილიატების payment float (~1 თვე) | $10–30k | $40–80k | $80–150k |
| Chargeback/fraud რეზერვი | $10–20k | $25–50k | $50–100k |
| DR performance bond (მხოლოდ თუ DR-ს ვიღებთ; ლიცენზიის ≈$347k ცალკეა — 6.4-ის TBD-ხაზი) | — | +≈$339k | +≈$339k |
| **ჯამი C** | **~$80–160k** | **~$225–440k** | **~$460–900k** |

### 6.4 **ინდიკატიური კაპიტალის მოთხოვნა — selected-market ლიცენზირებამდე** (A+B+C+ვენდორები 06-დან)

| | Lean | Base | Aggressive |
|---|---:|---:|---:|
| **ინდიკატიური კაპიტალი წელი-1 (ლიცენზირებამდე)** | **~$440–540k** | **~$1.0–1.25M** | **~$1.85–2.4M** |
| **+ Selected-market ლიცენზია/რეგულატორული კაპიტალი** | **TBD¹** | **TBD¹** | **TBD¹** |

¹ counsel-სპრინტის შემდეგ ივსება. მასშტაბის განცდისთვის: მხოლოდ DR-ის შესვლა ≈ **$690k** (ლიცენზია ~$347k + bond ~$339k) — ანუ ეს ხაზი ბაზრის არჩევანზე დამოკიდებულებით ასეულობით ათას $-ს შეიძლება შეადგენდეს.

> ეს ემთხვევა ადრეულ GTM-დასკვნას („~€600k-ზე დაბლა პატიოსანი გზა brand-first ან skin-ია") — v1-ის „$196k Lean" იყო **growth envelope** და არა ბიზნესის დაფინანსება. ყველა ციფრი ინდიკატიურია და Soft Launch-ის რეალური ძაბრით/counsel-ის ფასებით ზუსტდება.

## გვერდი 6ბ · Unit Economics v2 — Contribution gate

**ძველი შეცდომა გასწორებულია:** 2.5×-ზე CPA $85 ითხოვს $212.5-ს (და არა $180-ს).

**ახალი gate — Contribution LTV:**
```
12M NGR/FTD
− provider rev-share − ბონუსები − payment fees − ლოკალური გადასახადები
− chargeback/fraud − ცვლადი CRM/support
= Contribution LTV (LTV_c)          [ტიპურად NGR-ის ~55–65%]

წესი:  LTV_c / CAC ≥ 2.0 (M12-ზე)  და  contribution-payback ≤ 6 თვე
```

**შედეგი, პირდაპირ:** თუ Soft Launch-ის NGR/FTD ≈ $200 → LTV_c ≈ $110–130 → **CAC-ჭერი ≈ $55–65**, ანუ ძველი „CPA ≤$75" მკაცრდება, თუ NGR/FTD ≥$230–250 არ დადასტურდა. KPI-ცხრილები ამ ლოგიკას მიჰყვება.

## გვერდი 7 · ⚠️ რისკები
(v1-ის მატრიცა რჩება; ცვლილებები:) CL/JP გადადის „რეალიზებული რისკებიდან" → ისინი ახლა ფაქტია და არა რისკი · ემატება: **jurisdiction-შეცდომის რისკი თავად გეგმაში** (შერბილება: market-cell gate + კვარტალური counsel-განახლება) · ლიკვიდობის რისკი (reserve-ფენა C ამისთვისაა) · Japan-მიმართული პრომოს აკრძალვა → გეო-ფილტრი პარტნიორების ტრაფიკზეც.

## გვერდი 8 · 📋 Launch Gate v2

**Gate 1–4** (გვ. 4-ის ოთხეული) **+ Jurisdiction Readiness — ქვეყანა GREEN-დება მხოლოდ 10/10-ზე:**

1. Local legal clearance / licence
2. Local payment availability (დეპოზიტი და გატანა)
3. Provider games permitted ამ ბაზარზე
4. AML/KYC/RG mapping ლოკალურ მოთხოვნებზე
5. Marketing/affiliate წესები დამტკიცებული
6. ლოკალური T&C/privacy
7. Geo/VPN კონტროლები
8. Treasury/withdrawal reserve ამ ბაზრისთვის
9. Support/complaints პროცესი (ენა, ვადები)
10. Production security/incident readiness

## გვერდი 9 · 🎯 KPI v2 — definitions + profitability

ყველა მეტრიკას ემატება **definition-სვეტი** (მაგ.: D30 = **depositing-player retention**; ROAS = **NGR/spend**; ცალკე contribution-ROAS). ემატება:

FTD→2nd deposit (D14) · deposit approval rate · KYC completion · ARPU/ARPPU · NGR/FTD (M1/M3/M12) · bonus/NGR ≤25% · contribution margin · CAC payback (დღეები) · D90/D180 cohort value · withdrawal p95 · chargeback rate ≤1% · market & channel concentration.

## გვერდი 10 · 👤 RACI v2 — ფუნქციებით

11 ფუნქცია: Management · Product-Tech · Compliance-Legal · Payments-Treasury · Acquisition · Affiliates · CRM · BI · Support · Security · Creative. ადამიანები role-ზე ებმიან; დღევანდელი რეალობა (თითქმის ყველა → შენ/მე) ცხრილშივე ჩანს როგორც key-man რისკის ვიზუალიზაცია, **პირველი დაქირავების პრიორიტეტებით:** 1) Compliance-Legal officer, 2) Payments/PSP ops, 3) Support lead (ES).

---

## აშენების მეთოდი — უცვლელი
`create_new_file` → 10 გვერდი პარალელური აგენტებით → დამოუკიდებელი აუდიტი → სქრინშოტ-ვერიფიკაცია. Noto Sans Georgian; ციფრები Inter-ით; confidence-ეტიკეტი ყველა ფინანსურ დაფაზე.

## ღია კითხვები დადასტურებამდე

1. **Counsel-სპრინტი:** 6–8 ქვეყნის დოსიე (~$25–50k) — ვამტკიცებთ როგორც T−30-ის პირველ ხარჯს? ამის გარეშე Soft Launch-ბაზარი ვერ დგინდება.
2. **სცენარი:** Total Capital-ის სამი დონიდან ($450–600k / $1.0–1.3M / $1.8–2.4M) რომელზე ვაკალიბრებ Figma-ს დეტალებს?
3. **DR:** შესვლა ≈$690k-ია (ლიცენზია ~$347k + bond ~$339k) — ვტოვებთ licensing-track-ზე „ძვირი/ნელი" ეტიკეტით თუ ვხსნით რუკიდან?

**შემდეგი ნაბიჯი:** შენი „დაადასტურე" (ან შესწორებები) → Figma.
