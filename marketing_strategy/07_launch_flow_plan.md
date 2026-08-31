# გეგმა v3 — „გაშვების ნაკადი" Figma-ფაილის ბლუპრინტი

**თარიღი:** 2026-08-31 · **ვერსია:** 3.0 (cross-border მოდელზე გადაწყობილი)
**სტატუსი:** ⏳ დასადასტურებელი — Figma იწყება მხოლოდ შენი OK-ს შემდეგ
**ეს ვერსია ანაცვლებს** ბაზრების კლასიფიკაციებს 01 §2.6-ში, 03 §1.1-სა და 06-ში — ისინი counsel-სპრინტის შემდეგ ჰარმონიზდება.

---

## 0. ცვლილებების ისტორია

| ვერსია | რა შეიცვალა |
|---|---|
| v2 | market-cell gate · სამფენიანი კაპიტალი · Contribution LTV/CAC · 4-gate T · ფუნქციური RACI |
| v2.1 | Bolivia→🟡 · Japan „prohibited" · DR ≈$690k · paid-ჯამები $62/199/399k · Capital „ინდიკატიური, ლიცენზირებამდე" |
| v2.2 | Chile mirror-თარიღი მოხსნილი · DR მთლიანად Regulatory Capital-ში · EC=Legal Opinion · Peru→priority diligence |
| **v3.0** | **მთელი მოდელი cross-border-ზე:** GREEN = „cross-border acquisition allowed" და არა „ბიზნესის გახსნა" · 7-შემოწმებიანი Market Gate · local-entity-მოთხოვნა = blocker · Bolivia→NO-GO · DR→LOW PRIORITY/NO-GO · Mexico→Legal Diligence · ლიცენზირება conditional add-on · counsel-სპრინტის მიზანი გადაწერილი · Acquisition Gate-ში traffic-clearance წესი · ტერმინოლოგია გაწმენდილი „market entry"-დან |

---

## გვერდი 1 · 📖 მთავარი თეზისი — Cross-Border მოდელი

> **ერთიანი საერთაშორისო ოპერატორი (Curaçao) · ერთი ვებსაიტი → სხვადასხვა ქვეყნიდან მომხმარებლების acquisition.**
>
> GREEN აღარ ნიშნავს „ამ ქვეყანაში ვხსნით ბიზნესს". ნიშნავს:
> **არსებულ საერთაშორისო ოპერატორს შეუძლია ამ ქვეყნის მომხმარებლის მიღება და მიზნობრივი მოზიდვა.**

**მთავარი sequence:**
```
Curaçao operator → country legal access review → approved geos
→ payment/provider validation → acquisition
→ local authorization მხოლოდ საჭიროების (და ეკონომიკური გამართლების) შემთხვევაში
```

სამი მმართველი წესი (06-დან, უცვლელი): ფასიანი მოცულობამდე არა · ატრიბუცია ჩვენია · პროგრესიის ბირთვი vendor-independent.

## გვერდი 2 · ✅ ინვენტარი
(უცვლელი — 15-პუნქტიანი ცხრილი; counsel-სპრინტის ხაზის ფორმულირება ახალია: „ბაზრების cross-border access დოსიეები — ❌ დასაწყები, T−30-ის პირველი ამოცანა")

## გვერდი 3 · 🌍 ბაზრები v3 — Market Gate 7 შემოწმებით

**სტატუსების განმარტება:**

| სტატუსი | ნიშნავს |
|---|---|
| 🟢 GREEN | **Cross-border acquisition allowed** — არსებული ოპერატორით ამ ქვეყნის რეზიდენტების მომსახურება და მიზნობრივი მოზიდვა დასაშვებია |
| 🟡 YELLOW | **Legal/licensing clarification required** |
| 🔴 RED | **Targeting/service prohibited** ან შეუთავსებელია მიმდინარე operator-მოდელთან |
| ⚪ GREY | **Insufficient legal evidence** |

**Market Gate — 7 შემოწმება ყოველ ქვეყანაზე:**
1. **Access legal?** — შეუძლია რეზიდენტს legally ითამაშოს ჩვენს საიტზე / ჩვენ მოვემსახუროთ?
2. **Local licence required?** — ითხოვს თუ არა targeting/service ადგილობრივ ავტორიზაციას?
3. **Foreign entity eligible?** — თუ ითხოვს, უცხოური იურ. პირი დაიშვება local branch-ის გარეშე?
4. **Marketing legal?** — paid/affiliate მიზნობრივი მარკეტინგი დასაშვებია?
5. **Payments work?** — დეპოზიტი და გატანა რეალურად მუშაობს?
6. **Games allowed?** — პროვაიდერების კონტენტი ამ ბაზარზე დაშვებულია?
7. **Economics work?** — Contribution LTV/CAC gate-ს აბარებს?

**Blocker-წესი:** თუ ბაზარი **local domiciled entity-ს ითხოვს** და ჩვენ მის გახსნას არ ვგეგმავთ → ქვეყანა ავტომატურად **NO-GO / HOLD**-ში გადადის, დანარჩენი შემოწმებების მიუხედავად.

| ბაზარი | v3 სტატუსი | საფუძველი |
|---|---|---|
| **Chile** | 🔴 RED | ონლაინ-თამაში უკანონოა expressly authorized-ის გარდა (SCJ); სასამართლოს დადგენილი ISP-ბლოკირება; აღსრულება 2026-შიც გრძელდება, თუმცა mirror-საიტების მუდმივი სრული ბლოკირება ტექნიკურად არასრულყოფილი რჩება (SUBTEL, 2026-06) |
| **Japan** | 🔴 RED | 2025-09-25: პრომო/რეკლამა/აფილიატ-ლინკები/recommendation-საიტები აკრძალულია (prohibited); NPA-აღსრულება. **Foreign website-ის არსებობა ვერაფერს ცვლის მიზნობრივი acquisition-ის აკრძალვაში.** $0 |
| Brazil | 🔴 RED | SPA-ლიცენზია + ANATEL |
| Colombia | 🔴 RED | Coljuegos |
| **Bolivia** | 🔴 **პრაქტიკული NO-GO** | AJ-ს ჩარჩო მხოლოდ ბოლივიაში დაფუძნებულ/domiciled იურ. პირებს უშვებს → **local-entity blocker-წესი ირთვება**: ჩვენს მოდელში მისი გახსნა არ იგეგმება — shortlist-იდან ამოღებულია |
| **Dominican Rep.** | 🔴/🟡 **LOW PRIORITY / NO-GO** | მაღალი regulatory entry (ლიცენზია ≈$347k + bond ≈$339k ≈ $690k) **+ local operational requirements** (ოფისი/call-center, .do, Registry/RNC) — cross-border მოდელს ცუდად ერგება. განიხილება მხოლოდ თუ ეკონომიკა ოდესმე გაამართლებს |
| აზია-კრიმინალი / EU-ლიცენზირებული | 🔴 RED | უცვლელი |
| **Peru** | 🟡 **Priority diligence** | აქცენტი: **უცხოურ იურ. პირს შეუძლია MINCETUR-authorization local branch-ის გარეშე** (ადმ. ვადა ≤30 სამუშაო დღე), თუ დანარჩენ მოთხოვნებსაც აკმაყოფილებს — homologation, ტექ. სერტიფიკაცია, გარანტიები, 12% Net-Win tax, გადახდები |
| **Mexico** | 🟡 **Legal Diligence / Licensing Required** | გასარკვევია: **შეუძლია თუ არა არსებულ საერთაშორისო ოპერატორს legally target/serve residents** — არა „local partner expansion". SEGOB-permit რეჟიმი მოქმედებს; 2026-08 ცვლილებები ჯერ ინიციატივებია |
| Ecuador | 🟡 Legal Opinion | ცალკე casino/sportsbook opinion cross-border access-ზე |
| Argentina | 🟡 Clarification | პროვინციული რეჟიმები — cross-border targeting-ის დასაშვებობა პროვინციების მიხედვით |
| Paraguay · Guatemala · Costa Rica | ⚪ GREY | Insufficient legal evidence — counsel-დოსიე კლასიფიკაციამდე |
| **GREEN დღეს** | **∅ ცარიელი** | პირველი GREEN = counsel-სპრინტის შედეგი |

**Counsel-სპრინტის მიზანი (გადაწერილი):** არა „რომელ ქვეყნებში გავხსნათ ოპერაცია", არამედ —
**„რომელი ქვეყნების მომხმარებლების cross-border acquisition არის დასაშვები არსებული operator setup-ით."**

**Jurisdiction dossier — თითო ქვეყანაზე 6 კონკრეტული პასუხი:**
1. Foreign operator access — დასაშვებია?
2. Local licence necessity — საჭიროა თუ არა targeting/service-სთვის?
3. Foreign entity eligibility — local branch-ის გარეშე?
4. Paid/affiliate marketing legality
5. Payment restrictions
6. Provider/content restrictions

## გვერდი 4 · 🗺 ნაკადი v3 — T-ღერძი ოთხი gate-ით

**T = პირველი legally cleared ბაზრის Production Readiness Date.** ოთხივე gate PASS → T:

```
Product Ready ──┐
Payments Ready ─┼─→ ოთხივე PASS → T · Soft Launch (ერთი ან რამდენიმე
Compliance Ready┤        legally cleared cross-border ბაზარი)
Acquisition Rdy─┘
```

- **Product:** launch-gate ჩეკლისტი (დემო→რეალური, ატრიბუცია, ანალიტიკა)
- **Payments:** ≥2 ლოკალური მეთოდი ცოცხალი მიზნობრივ გეოში · გატანის ტესტი რეალური თანხით · rolling-reserve პირობები ცნობილი · float საკმარისი
- **Compliance:** ბაზრის dossier-ის 6 პასუხი + 7-შემოწმებიანი gate PASS · T&C/RG/AML ვიზირებული
- **Acquisition:** ≥5 seed-პარტნიორი ხელმოწერილი · კრეატივები compliance-რევიუთი · ტრეკინგი E2E გატესტილი · **„No paid/affiliate traffic before legal market-access clearance"** — არც ერთი ფასიანი/აფილიატ-კლიკი გეოზე, სანამ მისი access-clearance არ დადასტურდა

**Soft Launch = ერთი ან რამდენიმე legally cleared cross-border ბაზარი** — არა „ერთი ქვეყანა, სადაც local licence ავიღეთ". ბექენდის მიბმა Product-gate-ის წინაპირობაა და არა თავად T.

## გვერდი 5 · 📣 არხები
(უცვლელი v2.2-დან: სცენარზე მიბმული ტემპები; Japan ამოღებული ყველგან; „რა არ მუშაობს" + Japan-პრომოს აკრძალვა. ემატება:) ყოველი არხის გეო-სია იკვებება **მხოლოდ GREEN-სიიდან** — არხს საკუთარი გეო-გადაწყვეტილება არ აქვს.

## გვერდი 6 · 💰 ბიუჯეტი v3 — სამი ფენა

### 6.1 ფენა A · Operating Platform Cost (წლიური, ინდიკატიური)

| მუხლი | Lean | Base | Aggressive |
|---|---:|---:|---:|
| ჰოსტინგი/ინფრა/CDN | $15k | $22k | $30k |
| KYC/AML per-check | $8k | $18k | $30k |
| პროვაიდერების მინიმუმები* | $30k | $55k | $90k |
| Support (LatAm, ES) | $35k | $60k | $90k |
| Security/pentest/DDoS | $15k | $25k | $35k |
| Legal/compliance retainer + 6–8 ქვეყნის **cross-border access opinion** | $45k | $65k | $90k |
| Ops/სხვა | $20k | $35k | $50k |
| **ჯამი A** | **~$170k** | **~$280k** | **~$415k** |

\* rev-share GGR-დანაა (COGS), აქ ფიქსირებული მინიმუმებია.
**ლიცენზირების განაცხადები ფენა A-დან ამოღებულია** — local authorization წინასწარ დაგეგმილი ხარჯი აღარ არის; ის conditional add-on-ია (იხ. 6.4).

### 6.2 ფენა B · Acquisition — თითო სცენარს საკუთარი timeline
(უცვლელი v2.2-დან — ჯამები $62/199/399k paid · $40/150/280k streamers · **B: $151k / $471k / $919k**; scale-start KPI-gate უცვლელი. Acquisition-ხარჯი მიემართება **მხოლოდ GREEN გეოებს**.)

### 6.3 ფენა C · Liquidity & Reserve (კაპიტალი, არა P&L)
(უცვლელი v2.2-დან — PSP rolling reserve / float / affiliate float / chargeback: **$80–160k / $225–440k / $460–900k**. Regulatory ბონდები აქ **არ** შედის — ისინი 6.4-ის conditional ხაზშია.)

### 6.4 **ინდიკატიური კაპიტალის მოთხოვნა** (A+B+C+ვენდორები 06-დან)

| | Lean | Base | Aggressive |
|---|---:|---:|---:|
| **ინდიკატიური კაპიტალი წელი-1 (cross-border მოდელი)** | **~$440–540k** | **~$1.0–1.25M** | **~$1.85–2.4M** |
| **+ Conditional: selected-market local authorization** | $0 default¹ | $0 default¹ | $0 default¹ |

¹ **Cross-border მოდელში local authorization default-ხარჯი აღარ არის.** ის ირთვება მხოლოდ იმ ბაზარზე, სადაც (ა) local authorization აუცილებელია targeting-ისთვის და (ბ) მისი აღება ეკონომიკურად გამართლდება (Contribution-მოდელით). მასშტაბის მაგალითი, რატომ არის ეს გადაწყვეტილება ძვირი: **DR = ლიცენზია ≈$347k + bond ≈$339k ≈ $690k** + implementation — სწორედ ამიტომ არის DR LOW PRIORITY/NO-GO.

### 6ბ · Unit Economics — Contribution gate
(უცვლელი v2.2-დან: LTV_c/CAC ≥ 2.0 · payback ≤ 6 თვე · CPA-ჭერი ~$55–65 სანამ NGR/FTD ≥$230–250 არ დადასტურდა.)

## გვერდი 7 · ⚠️ რისკები
(უცვლელი + ერთი ცვლილება:) „jurisdiction-შეცდომის რისკი" შერბილება ახლა 7-შემოწმებიანი gate + კვარტალური counsel-განახლება + **traffic-clearance წესი** (არც ერთი კლიკი clearance-მდე).

## გვერდი 8 · 📋 Launch Gate v3

**Gate 1–4** (გვ. 4) **+ Jurisdiction Readiness — GREEN-ის ჩართვა acquisition-ში მხოლოდ 10/10-ზე:**

1. **Cross-border legal clearance** (dossier-ის 6 პასუხი დადებითი) — ან, არჩეულ ბაზარზე, local authorization
2. Local payment availability (დეპოზიტი და გატანა)
3. Provider games permitted ამ ბაზარზე
4. AML/KYC/RG mapping ლოკალურ მოთხოვნებზე
5. Marketing/affiliate წესები დამტკიცებული
6. ლოკალური T&C/privacy
7. Geo/VPN კონტროლები
8. Treasury/withdrawal reserve ამ ბაზრისთვის
9. Support/complaints პროცესი (ენა, ვადები)
10. Production security/incident readiness

## გვერდი 9 · 🎯 KPI v3
(უცვლელი v2.2-დან — definitions + profitability-მეტრიკები; ემატება გეო-ჭრილი: ყველა KPI იზომება per-GREEN-market-ზეც.)

## გვერდი 10 · 👤 RACI v3 — ფუნქციებით

11 ფუნქცია უცვლელი. **Compliance-Legal-ის მთავარი ამოცანა შეცვლილია:**
**cross-border market access opinions** — და არა local entity setup. Local authorization-ის საკითხი Compliance-Legal-თან მხოლოდ მაშინ ბრუნდება, როცა კონკრეტულ ბაზარზე conditional-გადაწყვეტილება (6.4¹) დადგება. დაქირავების პრიორიტეტები უცვლელი: 1) Compliance-Legal, 2) Payments/PSP ops, 3) Support lead (ES).

---

## ტერმინოლოგიის წესი (მთელ ფაილზე და Figma-ზე)
„local partner path" · „local business" · „market entry" ტიპის ფორმულირებები აღარ გამოიყენება იქ, სადაც რეალურად მომხმარებლის მოზიდვაზეა საუბარი — ნაცვლად: **cross-border access · targeting · acquisition · resident service legality**. „Regulatory entry" რჩება მხოლოდ ნამდვილ local-authorization კონტექსტში (მაგ. DR).

## აშენების მეთოდი — უცვლელი
`create_new_file` → 10 გვერდი პარალელური აგენტებით → დამოუკიდებელი აუდიტი → სქრინშოტ-ვერიფიკაცია. Noto Sans Georgian; ციფრები Inter; confidence-ეტიკეტები.

## ღია კითხვები დადასტურებამდე

1. **Counsel-სპრინტი (~$25–50k):** მიზანი — „რომელი ქვეყნების მომხმარებლების cross-border acquisition არის დასაშვები არსებული operator setup-ით" — ვამტკიცებთ T−30-ის პირველ ხარჯად?
2. **სცენარი:** $440–540k / $1.0–1.25M / $1.85–2.4M (local authorization = $0 default, conditional) — რომელზე ვაკალიბრებ Figma-ს დეტალებს?
3. **GREY-სამეული (PY/GT/CR):** counsel-სპრინტშივე შედის თუ მეორე ტალღად?

**შემდეგი ნაბიჯი:** შენი „დაადასტურე" (ან შესწორებები) → Figma.
