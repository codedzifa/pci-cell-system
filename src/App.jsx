import { useState, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell as PieCell, AreaChart, Area, Legend } from "recharts";

/* ═══════════════════════════════════════════════════════════════════
   PEREZ CHAPEL INTERNATIONAL — DOME DISTRICT
   Cell Leader Reporting System — COMPLETE PRODUCTION BUILD
   All 191 cells from official Google Form (June 2026)
   ═══════════════════════════════════════════════════════════════════ */

const NAVY="#0F2057",NAVY_MID="#1A3275",NAVY_LIGHT="#2A4A9A";
const GOLD="#C8952A",GOLD_LIGHT="#F0C870";
const IVORY="#FAF8F3",IVORY_DARK="#F0EDE4";
const RED="#C8102E",RED_LIGHT="#FDECEA";
const GREEN="#1A7A4A",GREEN_LIGHT="#E6F5EE";
const GRAY="#6B7280",GRAY_LIGHT="#F3F4F6",WHITE="#FFFFFF";

// ── COMPLETE DATA from official Google Form PDF ───────────────────
const REGIONS = [
  {id:"r1",name:"BETHEL REGION"},{id:"r2",name:"CANAAN REGION"},
  {id:"r3",name:"EDEN CENTRAL REGION"},{id:"r4",name:"EDEN EAST REGION"},
  {id:"r5",name:"EDEN WEST REGION"},{id:"r6",name:"GOSHEN REGION"},
  {id:"r7",name:"JUDAH CENTRAL REGION"},{id:"r8",name:"JUDAH EAST REGION"},
  {id:"r9",name:"SHILOH REGION"},{id:"r10",name:"ZION WEST REGION"},
  {id:"r11",name:"ZION EAST REGION"},
];

const SECTIONS = [
  {id:"s1",name:"BRIGHT AGBEKUDZI Area",regionId:"r1"},
  {id:"s2",name:"BRO GEORGE AGBAVOR Area",regionId:"r1"},
  {id:"s3",name:"PS ISRAEL GODWIN AMEKUDZI Area",regionId:"r1"},
  {id:"s4",name:"PS FRANCA ABANI Area",regionId:"r2"},
  {id:"s5",name:"REV CYNTHIA KPELLE Area",regionId:"r2"},
  {id:"s6",name:"REV GIFTY ADOKALEY DARKO-AMANKRAH Area",regionId:"r2"},
  {id:"s7",name:"SIS NAOMI OWUSU HANSEN Area",regionId:"r2"},
  {id:"s8",name:"DEAC MAWUTOR KUDOTO & SIS EMEFA AGBEDOE Area",regionId:"r3"},
  {id:"s9",name:"DEAC ROBERT AHETO & BRO FIIFI QUARTEY Area",regionId:"r3"},
  {id:"s10",name:"BRO EBENEZER SAWER TETTEH Area",regionId:"r3"},
  {id:"s11",name:"BRO MICHAEL OBIRI & BRO SAMUEL OPOKU SAKYI Area",regionId:"r4"},
  {id:"s12",name:"BRO LISBON TORGBOR & SIS MAVIS AMUZU Area",regionId:"r4"},
  {id:"s13",name:"PS NICHOLAS NUSETOR & BRO MAWULI AMENYA Area",regionId:"r5"},
  {id:"s14",name:"REV JOHN ADDO Area",regionId:"r6"},
  {id:"s15",name:"REV EVAN DAVID HUKPORTI Area",regionId:"r6"},
  {id:"s16",name:"PS JOSEPH TETTEH Area",regionId:"r6"},
  {id:"s17",name:"REV JOHN ATOBRAH Area",regionId:"r7"},
  {id:"s18",name:"REV DAVID GUBA KPELLE Area",regionId:"r7"},
  {id:"s19",name:"PS WILSON AHIAKONU Area",regionId:"r7"},
  {id:"s20",name:"REV ELVIS ANTWI DAKWA Area",regionId:"r8"},
  {id:"s21",name:"PS EMELIA YARO KASAMBATA Area",regionId:"r8"},
  {id:"s22",name:"DANIEL DOE Area",regionId:"r9"},
  {id:"s23",name:"ALBERT OBODAI AYERTEY Area",regionId:"r9"},
  {id:"s24",name:"MAAME DEDE KOTEY Area",regionId:"r9"},
  {id:"s25",name:"SIS DORA GAISIE Area",regionId:"r10"},
  {id:"s26",name:"BRO MICHAEL KWAME NYAME Area",regionId:"r10"},
  {id:"s27",name:"BRO ALEX CUDJOE Area",regionId:"r10"},
  {id:"s28",name:"BRO CHRISTIAN AHIAGBAH Area",regionId:"r11"},
];

const CELLS = [
  // BETHEL AREA 1 — BRIGHT AGBEKUDZI
  {id:"c1",name:"BETHEL DANSOMAN",sectionId:"s1",regionId:"r1",location:"Dansoman, Accra"},
  {id:"c2",name:"BETHEL ODORKOR",sectionId:"s1",regionId:"r1",location:"Odorkor, Accra"},
  {id:"c3",name:"BETHEL ODORKOR LFU 2",sectionId:"s1",regionId:"r1",location:"Odorkor, Accra"},
  {id:"c4",name:"BETHEL DANSOMAN MPOASE",sectionId:"s1",regionId:"r1",location:"Dansoman Mpoase, Accra"},
  {id:"c5",name:"BETHEL MATAHEKO",sectionId:"s1",regionId:"r1",location:"Mataheko, Accra"},
  {id:"c6",name:"BETHEL YELLOW HOUSE LFU",sectionId:"s1",regionId:"r1",location:"Accra"},
  // BETHEL AREA 2 — BRO GEORGE
  {id:"c7",name:"BETHEL EBENEZER DOWN (OPETEKWEI)",sectionId:"s2",regionId:"r1",location:"Opetekwei, Accra"},
  {id:"c8",name:"BETHEL MAMPROBI - SEMPE",sectionId:"s2",regionId:"r1",location:"Mamprobi, Accra"},
  // BETHEL AREA 3 — PS GODWIN
  {id:"c9",name:"BETHEL BUBUIASHI",sectionId:"s3",regionId:"r1",location:"Bubuiashi, Accra"},
  {id:"c10",name:"BETHEL FADAMA",sectionId:"s3",regionId:"r1",location:"Fadama, Accra"},
  {id:"c11",name:"BETHEL KANESHIE AKUTU",sectionId:"s3",regionId:"r1",location:"Kaneshie, Accra"},
  // CANAAN AREA 1 — PS FRANCA ABANI
  {id:"c12",name:"CANAAN BAWALESHIE (GODSWAY ANGLANU)",sectionId:"s4",regionId:"r2",location:"Bawaleshie, Accra"},
  {id:"c13",name:"CANAAN NTHC (PS FRANCA ABANI)",sectionId:"s4",regionId:"r2",location:"NTHC, Accra"},
  {id:"c14",name:"CANAAN OKPONGLO (PS FRANCA)",sectionId:"s4",regionId:"r2",location:"Okponglo, Accra"},
  {id:"c15",name:"CANAAN DZEN AYON (KWESI ZIBA)",sectionId:"s4",regionId:"r2",location:"Dzen Ayon, Accra"},
  {id:"c16",name:"CANAAN DZEN AYON LFU 2 (KWESI ZIBA)",sectionId:"s4",regionId:"r2",location:"Dzen Ayon, Accra"},
  {id:"c17",name:"CANAAN MADINA-UPSA LFU (DEAC SHIRLEY ADU-ASARE)",sectionId:"s4",regionId:"r2",location:"Madina-UPSA, Accra"},
  {id:"c18",name:"CANAAN OGBOJO (PS FRANCA)",sectionId:"s4",regionId:"r2",location:"Ogbojo, Accra"},
  {id:"c19",name:"CANAAN HUNTERS ROYAL HOTEL MADINA ESTATES LFU",sectionId:"s4",regionId:"r2",location:"Madina Estates, Accra"},
  {id:"c20",name:"CANAAN EL SHADDAI LANE (ERICA TORSU)",sectionId:"s4",regionId:"r2",location:"El Shaddai Lane, Accra"},
  {id:"c21",name:"CANAAN ABILITY (CHARLES DJOKOTOE)",sectionId:"s4",regionId:"r2",location:"Accra"},
  {id:"c22",name:"CANAAN BOUNDARY RD/MOTORWAY LFU (THELMA KWAME)",sectionId:"s4",regionId:"r2",location:"Boundary Rd, Accra"},
  // CANAAN AREA 3 — REV CYNTHIA KPELLE
  {id:"c23",name:"CANAAN OYIBI (SAMUEL AMEH-TETTEY)",sectionId:"s5",regionId:"r2",location:"Oyibi, Accra"},
  {id:"c24",name:"CANAAN EAST LEGON HILLS (REV CYNTHIA KPELLE)",sectionId:"s5",regionId:"r2",location:"East Legon Hills, Accra"},
  {id:"c25",name:"CANAAN ADENTA FRAFRAHA (SAMUEL PEH)",sectionId:"s5",regionId:"r2",location:"Adenta Frafraha, Accra"},
  {id:"c26",name:"CANAAN ROYAL NMAI DZORM LFU (MRS GLORIA KOMENG)",sectionId:"s5",regionId:"r2",location:"Nmai Dzorm, Accra"},
  {id:"c27",name:"CANAAN NMAI DZORM POLICE STATION LFU (JOSEPHINE ESHUN)",sectionId:"s5",regionId:"r2",location:"Nmai Dzorm, Accra"},
  {id:"c28",name:"CANAAN SPRINGFIELD COMMUNITY LFU",sectionId:"s5",regionId:"r2",location:"Springfield, Accra"},
  {id:"c29",name:"CANAAN SEDUASE LFU (MRS PHYLLIS KAYKENE)",sectionId:"s5",regionId:"r2",location:"Seduase, Accra"},
  {id:"c30",name:"CANAAN SANTEO LFU (MRS VIVIAN ADZIKA)",sectionId:"s5",regionId:"r2",location:"Santeo, Accra"},
  {id:"c31",name:"CANAAN KATAMANSO GOLDEN CITY (GERSHON ATIMU)",sectionId:"s5",regionId:"r2",location:"Katamanso, Accra"},
  {id:"c32",name:"CANAAN ABURI LFU (KWESI ZIBA)",sectionId:"s5",regionId:"r2",location:"Aburi, Eastern Region"},
  // CANAAN AREA 4 — REV GIFTY
  {id:"c33",name:"CANAAN LAKESIDE/ASHALE BOTWE (REV GIFTY DARKO-AMANKRAH)",sectionId:"s6",regionId:"r2",location:"Lakeside, Accra"},
  {id:"c34",name:"CANAAN LAKESIDE COMM. 8 (MRS PEACE AHIAKONU)",sectionId:"s6",regionId:"r2",location:"Lakeside Comm 8, Accra"},
  {id:"c35",name:"CANAAN FAIR HAVEN (MR ELLA AGYINASARE)",sectionId:"s6",regionId:"r2",location:"Fair Haven, Accra"},
  {id:"c36",name:"CANAAN ADENTA HONEY POT (SAMUEL PEH)",sectionId:"s6",regionId:"r2",location:"Adenta, Accra"},
  {id:"c37",name:"CANAAN LAKESIDE ESTATES-NSUONAANO (DEAC CHRISTOPHER DARKO-AMANKRAH)",sectionId:"s6",regionId:"r2",location:"Lakeside Estates, Accra"},
  // CANAAN AREA 5 — SIS NAOMI
  {id:"c38",name:"CANAAN NEW SITE (ALICE ARKU)",sectionId:"s7",regionId:"r2",location:"Accra"},
  {id:"c39",name:"CANAAN OYARIFA/PANTANG (NAOMI EVAN-APPIAH)",sectionId:"s7",regionId:"r2",location:"Oyarifa, Accra"},
  {id:"c40",name:"CANAAN ABOKOBI (DEAC JOHN ALISEE)",sectionId:"s7",regionId:"r2",location:"Abokobi, Accra"},
  {id:"c41",name:"CANAAN MADINA/AGBOGBA (FRANCIS GOMASHI)",sectionId:"s7",regionId:"r2",location:"Madina/Agbogba, Accra"},
  {id:"c42",name:"CANAAN TEIMAN ABOKOBI LFU (FELIA MARTEYE)",sectionId:"s7",regionId:"r2",location:"Teiman Abokobi, Accra"},
  {id:"c43",name:"CANAAN EL-SHAMMAH OYARIFA KAYBEE (SHINE LUCKY SAPPOR)",sectionId:"s7",regionId:"r2",location:"Oyarifa, Accra"},
  {id:"c44",name:"CANAAN-ABOKOBI KENTE SHALLOM LFU (LUCKY SHINE SARPOR)",sectionId:"s7",regionId:"r2",location:"Abokobi, Accra"},
  // EDEN CENTRAL AREA 1 — DEAC MAWUTOR & SIS EMEFA
  {id:"c45",name:"EDEN EBONY DOWN",sectionId:"s8",regionId:"r3",location:"Ebony Down, Accra"},
  {id:"c46",name:"EDEN PIGFARM LFU 2",sectionId:"s8",regionId:"r3",location:"Pigfarm, Accra"},
  {id:"c47",name:"EDEN KT SWAG PARK LFU",sectionId:"s8",regionId:"r3",location:"Accra"},
  {id:"c48",name:"EDEN TSE-ADDO LFU",sectionId:"s8",regionId:"r3",location:"Tse-Addo, Accra"},
  {id:"c49",name:"EDEN LA APAAPA LFU",sectionId:"s8",regionId:"r3",location:"La Apaapa, Accra"},
  {id:"c50",name:"EDEN PIGFARM LFU 3",sectionId:"s8",regionId:"r3",location:"Pigfarm, Accra"},
  {id:"c51",name:"EDEN EBONY JEAMA LFU 1",sectionId:"s8",regionId:"r3",location:"Ebony Jeama, Accra"},
  {id:"c52",name:"EDEN EBONY JEAMA LFU 2",sectionId:"s8",regionId:"r3",location:"Ebony Jeama, Accra"},
  // EDEN CENTRAL AREA 2 — DEAC ROBERT & BRO FIIFI
  {id:"c53",name:"EDEN MAAMOBI LFU",sectionId:"s9",regionId:"r3",location:"Maamobi, Accra"},
  {id:"c54",name:"EDEN NIMA LFU 1",sectionId:"s9",regionId:"r3",location:"Nima, Accra"},
  {id:"c55",name:"EDEN KANDA ESTATE",sectionId:"s9",regionId:"r3",location:"Kanda Estate, Accra"},
  {id:"c56",name:"EDEN 37 & BURMA CAMP LFU",sectionId:"s9",regionId:"r3",location:"37, Accra"},
  {id:"c57",name:"EDEN KOTOBABI LFU 1",sectionId:"s9",regionId:"r3",location:"Kotobabi, Accra"},
  {id:"c58",name:"EDEN 37 NEGHELI BARRACKS LFU",sectionId:"s9",regionId:"r3",location:"37 Barracks, Accra"},
  {id:"c59",name:"EDEN KPEHE LFU",sectionId:"s9",regionId:"r3",location:"Kpehe, Accra"},
  {id:"c60",name:"EDEN GILGAL LFU",sectionId:"s9",regionId:"r3",location:"Accra"},
  // EDEN CENTRAL AREA 3 — BRO EBENEZER SAWER TETTEH
  {id:"c61",name:"EDEN ASYLUMDOWN LFU",sectionId:"s10",regionId:"r3",location:"Asylum Down, Accra"},
  {id:"c62",name:"EDEN PIGFARM LFU 1",sectionId:"s10",regionId:"r3",location:"Pigfarm, Accra"},
  {id:"c63",name:"EDEN PIGFARM LFU 4",sectionId:"s10",regionId:"r3",location:"Pigfarm, Accra"},
  {id:"c64",name:"EDEN PIGFARM LFU 5",sectionId:"s10",regionId:"r3",location:"Pigfarm, Accra"},
  {id:"c65",name:"EDEN ROMAN RIDGE LFU",sectionId:"s10",regionId:"r3",location:"Roman Ridge, Accra"},
  {id:"c66",name:"EDEN EBONY SCHOOL JUNCTION LFU 1",sectionId:"s10",regionId:"r3",location:"Accra"},
  {id:"c67",name:"EDEN ABAVANA DOWN LFU 1",sectionId:"s10",regionId:"r3",location:"Abavana, Accra"},
  // EDEN EAST AREA 1 — BRO MICHAEL OBIRI & BRO SAMUEL
  {id:"c68",name:"EDEN DZORWULU LFU 1",sectionId:"s11",regionId:"r4",location:"Dzorwulu, Accra"},
  {id:"c69",name:"EDEN DZORWULU LFU 2",sectionId:"s11",regionId:"r4",location:"Dzorwulu, Accra"},
  {id:"c70",name:"EDEN DZORWULU LFU 3",sectionId:"s11",regionId:"r4",location:"Dzorwulu, Accra"},
  {id:"c71",name:"EDEN DZORWULU LFU 4",sectionId:"s11",regionId:"r4",location:"Dzorwulu, Accra"},
  {id:"c72",name:"EDEN AIRPORT RESIDENTIAL",sectionId:"s11",regionId:"r4",location:"Airport Residential, Accra"},
  {id:"c73",name:"EDEN DZORWULU LFU 5",sectionId:"s11",regionId:"r4",location:"Dzorwulu, Accra"},
  {id:"c74",name:"EDEN DZORWULU MECHANIC LFU 1",sectionId:"s11",regionId:"r4",location:"Dzorwulu, Accra"},
  // EDEN EAST AREA 2 — BRO LISBON & SIS MAVIS
  {id:"c75",name:"EDEN ABELEMKPE LFU 1",sectionId:"s12",regionId:"r4",location:"Abelemkpe, Accra"},
  {id:"c76",name:"EDEN ABELEMKPE LFU 2",sectionId:"s12",regionId:"r4",location:"Abelemkpe, Accra"},
  {id:"c77",name:"EDEN ABELEMKPE LFU 3",sectionId:"s12",regionId:"r4",location:"Abelemkpe, Accra"},
  {id:"c78",name:"EDEN ABELEMKPE LFU 4",sectionId:"s12",regionId:"r4",location:"Abelemkpe, Accra"},
  {id:"c79",name:"EDEN TESANO LFU",sectionId:"s12",regionId:"r4",location:"Tesano, Accra"},
  // EDEN WEST AREA 1 — PS NICHOLAS & BRO MAWULI
  {id:"c80",name:"EDEN ALAJO LFU",sectionId:"s13",regionId:"r5",location:"Alajo, Accra"},
  {id:"c81",name:"EDEN KT AWOTSE LFU",sectionId:"s13",regionId:"r5",location:"Accra"},
  {id:"c82",name:"EDEN NEWTOWN 37 STATION LFU",sectionId:"s13",regionId:"r5",location:"Newtown, Accra"},
  {id:"c83",name:"EDEN POLO PARK",sectionId:"s13",regionId:"r5",location:"Polo Park, Accra"},
  {id:"c84",name:"EDEN ALAJO - KANESHIE STATION",sectionId:"s13",regionId:"r5",location:"Alajo, Accra"},
  {id:"c85",name:"EDEN KOTOBABI POLICE STATION",sectionId:"s13",regionId:"r5",location:"Kotobabi, Accra"},
  {id:"c86",name:"EDEN KOTOBABI TSATSU PARK LFU",sectionId:"s13",regionId:"r5",location:"Kotobabi, Accra"},
  {id:"c87",name:"EDEN KOKOMLEMLE LFU",sectionId:"s13",regionId:"r5",location:"Kokomlemle, Accra"},
  {id:"c88",name:"EDEN NEWTOWN LFU 1",sectionId:"s13",regionId:"r5",location:"Newtown, Accra"},
  {id:"c89",name:"EDEN KOTOBABI MODEX LFU 1",sectionId:"s13",regionId:"r5",location:"Kotobabi, Accra"},
  {id:"c90",name:"EDEN NEWTOWN WHITE HOUSE",sectionId:"s13",regionId:"r5",location:"Newtown, Accra"},
  {id:"c91",name:"EDEN MAAMOBI POLYCLINIC LFU",sectionId:"s13",regionId:"r5",location:"Maamobi, Accra"},
  {id:"c92",name:"EDEN ALAJO LFU 2",sectionId:"s13",regionId:"r5",location:"Alajo, Accra"},
  {id:"c93",name:"EDEN KOKOMLEMLE HAVAAD LFU",sectionId:"s13",regionId:"r5",location:"Kokomlemle, Accra"},
  {id:"c94",name:"EDEN KOKOMLEMLE KING DAVID HOTEL LFU",sectionId:"s13",regionId:"r5",location:"Kokomlemle, Accra"},
  // GOSHEN AREA 1 — REV JOHN ADDO
  {id:"c95",name:"GOSHEN AKWETEMAN LFU 1",sectionId:"s14",regionId:"r6",location:"Akweteman, Accra"},
  {id:"c96",name:"GOSHEN APENKWA LFU 1",sectionId:"s14",regionId:"r6",location:"Apenkwa, Accra"},
  {id:"c97",name:"GOSHEN APENKWA LFU 2",sectionId:"s14",regionId:"r6",location:"Apenkwa, Accra"},
  {id:"c98",name:"GOSHEN MT ZION ABEKA LFU 1",sectionId:"s14",regionId:"r6",location:"Abeka, Accra"},
  {id:"c99",name:"GOSHEN SUE'S INN LFU 1",sectionId:"s14",regionId:"r6",location:"Sue's Inn, Accra"},
  // GOSHEN AREA 2 — REV EVAN DAVID HUKPORTI
  {id:"c100",name:"GOSHEN ALHAJI LFU 1",sectionId:"s15",regionId:"r6",location:"Alhaji, Accra"},
  {id:"c101",name:"GOSHEN ANYAA LFU 1",sectionId:"s15",regionId:"r6",location:"Anyaa, Accra"},
  {id:"c102",name:"GOSHEN KWASHIEMAN LFU1",sectionId:"s15",regionId:"r6",location:"Kwashieman, Accra"},
  {id:"c103",name:"GOSHEN LAPAZ LFU 1",sectionId:"s15",regionId:"r6",location:"Lapaz, Accra"},
  {id:"c104",name:"GOSHEN RACECOURSE LFU 1",sectionId:"s15",regionId:"r6",location:"Racecourse, Accra"},
  {id:"c105",name:"GOSHEN SOWUTUOM VRA LFU 1",sectionId:"s15",regionId:"r6",location:"Sowutuom, Accra"},
  {id:"c106",name:"GOSHEN TABORA LFU 1",sectionId:"s15",regionId:"r6",location:"Tabora, Accra"},
  {id:"c107",name:"GOSHEN LAPAZ NII-BOI LFU",sectionId:"s15",regionId:"r6",location:"Lapaz, Accra"},
  {id:"c108",name:"GOSHEN SANTA MARIA LFU 1",sectionId:"s15",regionId:"r6",location:"Santa Maria, Accra"},
  // GOSHEN AREA 3 — PS JOSEPH TETTEH
  {id:"c109",name:"GOSHEN ABLEKUMA AGBAJENA LFU 1",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c110",name:"GOSHEN ABLEKUMA JOMA LFU 1",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c111",name:"GOSHEN ABLEKUMA JOMA LFU 2",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c112",name:"GOSHEN ABLEKUMA MANHEA LFU 1",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c113",name:"GOSHEN ABLEKUMA NSAKINA LFU 1",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c114",name:"GOSHEN ABLEKUMA AGAPE LFU",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c115",name:"GOSHEN AGAPE TOP LFU 2",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c116",name:"GOSHEN ABLEKUMA JOMA LFU 3",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c117",name:"GOSHEN ABLEKUMA JOMA LFU 4",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  {id:"c118",name:"GOSHEN ABLEKUMA AGAPE LFU 3",sectionId:"s16",regionId:"r6",location:"Ablekuma, Accra"},
  // JUDAH CENTRAL AREA 1 — REV JOHN ATOBRAH
  {id:"c119",name:"JUDAH ACP KWABENYA",sectionId:"s17",regionId:"r7",location:"Kwabenya, Accra"},
  {id:"c120",name:"JUDAH ACP KWABENYA LFU 2",sectionId:"s17",regionId:"r7",location:"Kwabenya, Accra"},
  {id:"c121",name:"JUDAH AMASAMAN STADIUM JUNCTION",sectionId:"s17",regionId:"r7",location:"Amasaman, Accra"},
  {id:"c122",name:"JUDAH AYAWASO",sectionId:"s17",regionId:"r7",location:"Ayawaso, Accra"},
  {id:"c123",name:"JUDAH FISE",sectionId:"s17",regionId:"r7",location:"Fise, Accra"},
  {id:"c124",name:"JUDAH KUTUNSE KOANS ESTATES",sectionId:"s17",regionId:"r7",location:"Kutunse, Accra"},
  {id:"c125",name:"JUDAH ACP KWABENYA LFU 3",sectionId:"s17",regionId:"r7",location:"Kwabenya, Accra"},
  // JUDAH CENTRAL AREA 2 — REV DAVID GUBA KPELLE
  {id:"c126",name:"JUDAH ASHONGMAN ESTATE 1",sectionId:"s18",regionId:"r7",location:"Ashongman, Accra"},
  {id:"c127",name:"JUDAH ASHONGMAN ESTATE 2 - AGI SPOT",sectionId:"s18",regionId:"r7",location:"Ashongman, Accra"},
  {id:"c128",name:"JUDAH OLD ASHONGMAN",sectionId:"s18",regionId:"r7",location:"Old Ashongman, Accra"},
  {id:"c129",name:"JUDAH OLD ASHONGMAN LFU2",sectionId:"s18",regionId:"r7",location:"Old Ashongman, Accra"},
  {id:"c130",name:"JUDAH ACHIMOTA GULF HILLS",sectionId:"s18",regionId:"r7",location:"Achimota, Accra"},
  {id:"c131",name:"JUDAH HAATSO 1",sectionId:"s18",regionId:"r7",location:"Haatso, Accra"},
  {id:"c132",name:"JUDAH DOME 1",sectionId:"s18",regionId:"r7",location:"Dome, Accra"},
  {id:"c133",name:"JUDAH KISSEMAN",sectionId:"s18",regionId:"r7",location:"Kisseman, Accra"},
  {id:"c134",name:"JUDAH ASHONGMAN ESTATE MELCOM DOWN LFU",sectionId:"s18",regionId:"r7",location:"Ashongman, Accra"},
  // JUDAH CENTRAL AREA 3 — PS WILSON AHIAKONU
  {id:"c135",name:"JUDAH POKUASE KATAPOR",sectionId:"s19",regionId:"r7",location:"Pokuase, Accra"},
  {id:"c136",name:"JUDAH OFANKOR 7DAYS",sectionId:"s19",regionId:"r7",location:"Ofankor, Accra"},
  {id:"c137",name:"JUDAH SAPIEMAN ABLOMAH",sectionId:"s19",regionId:"r7",location:"Sapieman, Accra"},
  {id:"c138",name:"JUDAH POKUASE MAYERA",sectionId:"s19",regionId:"r7",location:"Pokuase, Accra"},
  {id:"c139",name:"JUDAH ANUMLE",sectionId:"s19",regionId:"r7",location:"Anumle, Accra"},
  {id:"c140",name:"JUDAH CENTRAL ONLINE LFU 1",sectionId:"s19",regionId:"r7",location:"Online"},
  {id:"c141",name:"JUDAH POKUASE MARKET",sectionId:"s19",regionId:"r7",location:"Pokuase Market, Accra"},
  {id:"c142",name:"JUDAH OFANKOR SPOT M LFU",sectionId:"s19",regionId:"r7",location:"Ofankor, Accra"},
  // JUDAH EAST AREA 1 — REV ELVIS ANTWI DAKWA
  {id:"c143",name:"JUDAH ABOFU",sectionId:"s20",regionId:"r8",location:"Abofu, Accra"},
  {id:"c144",name:"JUDAH ABOFU LFU 2",sectionId:"s20",regionId:"r8",location:"Abofu, Accra"},
  {id:"c145",name:"JUDAH PILLAR TWO LFU 1",sectionId:"s20",regionId:"r8",location:"Pillar 2, Accra"},
  {id:"c146",name:"JUDAH PILLAR TWO LFU 3",sectionId:"s20",regionId:"r8",location:"Pillar 2, Accra"},
  {id:"c147",name:"JUDAH TANTRA YELLOW HOUSE",sectionId:"s20",regionId:"r8",location:"Tantra Hill, Accra"},
  {id:"c148",name:"JUDAH ACHIMOTA POLICE STATION LFU",sectionId:"s20",regionId:"r8",location:"Achimota, Accra"},
  // JUDAH EAST AREA 2 — PS EMELIA YARO KASAMBATA
  {id:"c149",name:"JUDAH TAIFA",sectionId:"s21",regionId:"r8",location:"Taifa, Accra"},
  {id:"c150",name:"JUDAH TANTRA HILL",sectionId:"s21",regionId:"r8",location:"Tantra Hill, Accra"},
  {id:"c151",name:"JUDAH TANTRA HILL LFU 2",sectionId:"s21",regionId:"r8",location:"Tantra Hill, Accra"},
  {id:"c152",name:"JUDAH TANTRA HILL LFU 3",sectionId:"s21",regionId:"r8",location:"Tantra Hill, Accra"},
  {id:"c153",name:"JUDAH MILE 7 LFU 1",sectionId:"s21",regionId:"r8",location:"Mile 7, Accra"},
  {id:"c154",name:"JUDAH MILE 7 LFU 1 ANNEX",sectionId:"s21",regionId:"r8",location:"Mile 7, Accra"},
  {id:"c155",name:"JUDAH MILE 7 LFU 2",sectionId:"s21",regionId:"r8",location:"Mile 7, Accra"},
  {id:"c156",name:"JUDAH MILE 7 LFU 3",sectionId:"s21",regionId:"r8",location:"Mile 7, Accra"},
  {id:"c157",name:"JUDAH TANTRA HILL LFU 4",sectionId:"s21",regionId:"r8",location:"Tantra Hill, Accra"},
  {id:"c158",name:"JUDAH MILE 7 LFU 4",sectionId:"s21",regionId:"r8",location:"Mile 7, Accra"},
  // SHILOH AREA 1 — DANIEL DOE
  {id:"c159",name:"SHILOH KLAGON CHARITY LFU 4",sectionId:"s22",regionId:"r9",location:"Klagon, Accra"},
  {id:"c160",name:"SHILOH SPINTEX 1 LFU",sectionId:"s22",regionId:"r9",location:"Spintex, Accra"},
  {id:"c161",name:"SHILOH GOLF CITY LFU",sectionId:"s22",regionId:"r9",location:"Golf City, Accra"},
  {id:"c162",name:"SHILOH SPINTEX LFU 6",sectionId:"s22",regionId:"r9",location:"Spintex, Accra"},
  {id:"c163",name:"SHILOH DAWHENYA/C25",sectionId:"s22",regionId:"r9",location:"Dawhenya, Accra"},
  // SHILOH AREA 3 — ALBERT OBODAI AYERTEY
  {id:"c164",name:"SHILOH ANGLICAN LFU",sectionId:"s23",regionId:"r9",location:"Teshie, Accra"},
  {id:"c165",name:"SHILOH ANGLICAN LFU 2",sectionId:"s23",regionId:"r9",location:"Teshie, Accra"},
  {id:"c166",name:"SHILOH TESHIE MOBIL OSABU LFU 2",sectionId:"s23",regionId:"r9",location:"Teshie, Accra"},
  {id:"c167",name:"SHILOH TESHIE NUNGUA ESTATE LFU 3",sectionId:"s23",regionId:"r9",location:"Teshie Nungua, Accra"},
  // SHILOH AREA 4 — MAAME DEDE KOTEY
  {id:"c168",name:"SHILOH GREDA ESTATE",sectionId:"s24",regionId:"r9",location:"Greda Estate, Accra"},
  {id:"c169",name:"SHILOH BLOCK FACTORY",sectionId:"s24",regionId:"r9",location:"Accra"},
  {id:"c170",name:"SHILOH ONLINE LFU",sectionId:"s24",regionId:"r9",location:"Online"},
  {id:"c171",name:"SHILOH CELEBRITY HILL",sectionId:"s24",regionId:"r9",location:"Celebrity Hill, Accra"},
  // ZION WEST AREA 1 — SIS DORA GAISIE
  {id:"c172",name:"ZION GBAWE CP CELL (MRS ROSEMOND ABRAHAM RESIDENCE)",sectionId:"s25",regionId:"r10",location:"Gbawe, Accra"},
  {id:"c173",name:"ZION MALLAM (CLUSTER OF SCHOOLS)",sectionId:"s25",regionId:"r10",location:"Mallam, Accra"},
  {id:"c174",name:"ZION GBAWE BULLEMIN (DORA NANA GAISIE)",sectionId:"s25",regionId:"r10",location:"Gbawe, Accra"},
  {id:"c175",name:"ZION SAMPA VALLEY LFU (DORA)",sectionId:"s25",regionId:"r10",location:"Sampa Valley, Accra"},
  {id:"c176",name:"ZION OBLOGO M/A 1 (EDMUND OSEI)",sectionId:"s25",regionId:"r10",location:"Oblogo, Accra"},
  // ZION WEST AREA 2 — BRO MICHAEL KWAME NYAME
  {id:"c177",name:"ZION TUBA JUNCTION CELL (MICHAEL NYAME)",sectionId:"s26",regionId:"r10",location:"Tuba Junction, Accra"},
  {id:"c178",name:"ZION TUBA JUNCTION CELL LFU2 (MICHAEL NYAME)",sectionId:"s26",regionId:"r10",location:"Tuba Junction, Accra"},
  {id:"c179",name:"ZION TUBA JUNCTION CELL LFU3 (MICHAEL NYAME)",sectionId:"s26",regionId:"r10",location:"Tuba Junction, Accra"},
  {id:"c180",name:"ZION NEW BORTIANOR CELL (SAMUEL KOROMA)",sectionId:"s26",regionId:"r10",location:"New Bortianor, Accra"},
  {id:"c181",name:"ZION BRIGADE VILLA CELL LFU 1",sectionId:"s26",regionId:"r10",location:"Brigade Villa, Accra"},
  // ZION WEST AREA 3 — BRO ALEX CUDJOE
  {id:"c182",name:"ZION KAKRABA MILLENNIUM CITY (PCI KAKRABA CENTRE)",sectionId:"s27",regionId:"r10",location:"Kakraba, Accra"},
  {id:"c183",name:"ZION KAKRABA MILLENNIUM CITY LFU 2 (PCI KAKRABA CENTRE 2)",sectionId:"s27",regionId:"r10",location:"Kakraba, Accra"},
  {id:"c184",name:"ZION KAKRABA MILLENNIUM CITY LFU 3 (PCI KAKRABA CENTRE 3)",sectionId:"s27",regionId:"r10",location:"Kakraba, Accra"},
  // ZION EAST — BRO CHRISTIAN AHIAGBAH
  {id:"c185",name:"ZION KASOA OBUOM ROAD OIL FACTORY (MR DAVID EHINAWEY)",sectionId:"s28",regionId:"r11",location:"Kasoa, Central Region"},
  {id:"c186",name:"ZION NURSING QUARTERS MILLENNIUM CITY (MR & MRS CEPHAS AGBOADA)",sectionId:"s28",regionId:"r11",location:"Millennium City, Accra"},
  {id:"c187",name:"ZION DOMEABRA LFU (CEPHAS AGBOADA)",sectionId:"s28",regionId:"r11",location:"Domeabra, Accra"},
  {id:"c188",name:"ZION NEW APLAKU (CHRISTIAN AHIAGBAH)",sectionId:"s28",regionId:"r11",location:"New Aplaku, Accra"},
  // JUDAH CENTRAL — extra attendance section cells
  {id:"c189",name:"JUDAH DOME LFU 1",sectionId:"s18",regionId:"r7",location:"Dome, Accra"},
  {id:"c190",name:"JUDAH KISSEMNA LFU 1",sectionId:"s18",regionId:"r7",location:"Kisseman, Accra"},
  {id:"c191",name:"JUDAH HAATSO LFU 1",sectionId:"s18",regionId:"r7",location:"Haatso, Accra"},
];

const DEMO_ACCOUNTS = [
  {label:"Super Admin",sub:"Full system · all 191 cells · 11 regions",email:"admin@perezchapel.org",password:"admin123"},
  {label:"Regional Leader — Canaan",sub:"Rev Franca Abani · 33 cells",email:"canaan@perezchapel.org",password:"canaan123"},
  {label:"Sectional Leader — PS Franca Area",sub:"11 cells under PS Franca Abani",email:"franca.sec@perezchapel.org",password:"section123"},
  {label:"Cell Leader — SHILOH CELEBRITY HILL",sub:"Rebecca Laje Buenor",email:"rebecca@perezchapel.org",password:"rebecca123"},
];

const INIT_USERS = [
  {id:"u1",name:"Super Admin",email:"admin@perezchapel.org",phone:"0200000001",role:"super_admin",password:"admin123",isActive:true},
  {id:"u2",name:"Bethel Regional Leader",email:"bethel@perezchapel.org",phone:"0200000002",role:"regional_leader",regionId:"r1",password:"bethel123",isActive:true},
  {id:"u3",name:"Rev Franca Abani",email:"canaan@perezchapel.org",phone:"0249164869",role:"regional_leader",regionId:"r2",password:"canaan123",isActive:true},
  {id:"u4",name:"Eden Central Leader",email:"edencentral@perezchapel.org",phone:"0200000004",role:"regional_leader",regionId:"r3",password:"eden123",isActive:true},
  {id:"u5",name:"Goshen Regional Leader",email:"goshen@perezchapel.org",phone:"0200000005",role:"regional_leader",regionId:"r6",password:"goshen123",isActive:true},
  {id:"u6",name:"Judah Central Leader",email:"judahcentral@perezchapel.org",phone:"0200000006",role:"regional_leader",regionId:"r7",password:"judah123",isActive:true},
  {id:"u7",name:"Shiloh Regional Leader",email:"shiloh@perezchapel.org",phone:"0200000007",role:"regional_leader",regionId:"r9",password:"shiloh123",isActive:true},
  {id:"u20",name:"PS Franca Abani (Section)",email:"franca.sec@perezchapel.org",phone:"0249164869",role:"sectional_leader",sectionId:"s4",password:"section123",isActive:true},
  {id:"u21",name:"Rev Evan David Hukporti",email:"evan@perezchapel.org",phone:"0244000300",role:"sectional_leader",sectionId:"s15",password:"evan123",isActive:true},
  {id:"u22",name:"PS Emelia Yaro Kasambata (Section)",email:"emelia.sec@perezchapel.org",phone:"0540126414",role:"sectional_leader",sectionId:"s21",password:"emelia123",isActive:true},
  {id:"u40",name:"Godsway Anglanu",email:"godsway@perezchapel.org",phone:"0592758083",role:"cell_leader",cellId:"c12",password:"cell123",isActive:true},
  {id:"u41",name:"PS Franca Abani (Cell)",email:"franca.cell@perezchapel.org",phone:"0249164869",role:"cell_leader",cellId:"c14",password:"franca123",isActive:true},
  {id:"u42",name:"Emelia Yaro Kasambata",email:"emelia@perezchapel.org",phone:"0540126414",role:"cell_leader",cellId:"c153",password:"emelia456",isActive:true},
  {id:"u43",name:"Rebecca Laje Buenor",email:"rebecca@perezchapel.org",phone:"0244657616",role:"cell_leader",cellId:"c171",password:"rebecca123",isActive:true},
  {id:"u44",name:"Bright Agbekudzi",email:"bright@perezchapel.org",phone:"0244000400",role:"cell_leader",cellId:"c1",password:"bright123",isActive:true},
];

const INIT_MEMBERS = [
  {id:"m1",cellId:"c171",name:"Rebecca Laje Buenor",phone:"0244657616",isActive:true,joinDate:"2024-01-06",notes:""},
  {id:"m2",cellId:"c171",name:"Kofi Mensah",phone:"0244001122",isActive:true,joinDate:"2024-01-06",notes:""},
  {id:"m3",cellId:"c171",name:"Abena Owusu",phone:"0244003344",isActive:true,joinDate:"2024-02-10",notes:""},
  {id:"m4",cellId:"c171",name:"Kwame Asante",phone:"0244005566",isActive:true,joinDate:"2024-02-10",notes:""},
  {id:"m5",cellId:"c171",name:"Grace Tetteh",phone:"0244007788",isActive:true,joinDate:"2024-03-15",notes:""},
  {id:"m6",cellId:"c171",name:"Emmanuel Boateng",phone:"0244009900",isActive:true,joinDate:"2024-03-15",notes:""},
  {id:"m7",cellId:"c14",name:"PS Franca Abani",phone:"0249164869",isActive:true,joinDate:"2024-01-06",notes:""},
  {id:"m8",cellId:"c14",name:"Ama Osei",phone:"0244112233",isActive:true,joinDate:"2024-01-06",notes:""},
  {id:"m9",cellId:"c14",name:"Nana Yaw Boateng",phone:"0244445566",isActive:true,joinDate:"2024-02-10",notes:""},
  {id:"m10",cellId:"c14",name:"Akosua Frimpong",phone:"0244556677",isActive:true,joinDate:"2024-03-01",notes:""},
  {id:"m11",cellId:"c153",name:"Emelia Yaro Kasambata",phone:"0540126414",isActive:true,joinDate:"2024-01-10",notes:""},
  {id:"m12",cellId:"c153",name:"Samuel Peprah",phone:"0244700100",isActive:true,joinDate:"2024-01-10",notes:""},
  {id:"m13",cellId:"c153",name:"Comfort Asiedu",phone:"0244700200",isActive:true,joinDate:"2024-02-05",notes:""},
  {id:"m14",cellId:"c153",name:"Daniel Addo",phone:"0244700300",isActive:true,joinDate:"2024-02-05",notes:""},
  {id:"m15",cellId:"c153",name:"Patricia Amponsah",phone:"0244700400",isActive:true,joinDate:"2024-03-01",notes:""},
  {id:"m16",cellId:"c12",name:"Godsway Anglanu",phone:"0592758083",isActive:true,joinDate:"2024-01-06",notes:""},
  {id:"m17",cellId:"c12",name:"Esi Darko",phone:"0244800100",isActive:true,joinDate:"2024-01-06",notes:""},
  {id:"m18",cellId:"c12",name:"Kwabena Asante",phone:"0244800200",isActive:true,joinDate:"2024-02-10",notes:""},
];

function genId(){return"x"+Math.random().toString(36).slice(2,10);}
function getSaturdays(n=12){
  const d=[],t=new Date();
  t.setDate(t.getDate()-((t.getDay()+1)%7));
  for(let i=0;i<n;i++){d.unshift(t.toISOString().split("T")[0]);t.setDate(t.getDate()-7);}
  return d;
}
const WEEKS=getSaturdays(12);
const LAST_SAT=WEEKS[WEEKS.length-1];

function seedReports(){
  const reps=[];
  const seeds=["c1","c12","c14","c48","c57","c75","c83","c99","c102","c119","c135","c153","c159","c171","c172","c182"];
  seeds.forEach(cid=>{
    WEEKS.forEach((date,wi)=>{
      if((wi===3&&cid==="c171")||(wi===6&&cid==="c12"))return;
      const met=!(wi===4&&(cid==="c1"||cid==="c99"));
      const n=cid.replace("c","").charCodeAt(0)%5;
      reps.push({id:genId(),cellId:cid,reportDate:date,submittedAt:date+"T18:30:00",meetingHeld:met,
        noMeetingReason:met?"":"Public holiday — no meeting held",
        whoLed:"Cell Leader",soulsWon:wi%4===0?1:wi%7===0?2:0,
        adultsCount:4+(wi%4)+n,childrenCount:wi%3,
        attendanceTotal:4+(wi%4)+n+(wi%3),
        offeringAmount:30+(wi*8)+(n*4),testimony:wi%5===0?"A member testified of breakthrough this week.":"",
        outreachHeld:wi%2===0,noOutreachReason:wi%2!==0?"Members unavailable after meeting":"",
        outreachParticipants:wi%2===0?3+(wi%3):0,
        outreachDuration:wi%2===0?(wi%3===0?"up_to_1hr":"under_30min"):"",
        apVisit:wi%5===0,comments:"",photoUrl:""});
    });
  });
  return reps;
}
const INIT_REPORTS=seedReports();

const INIT_CAUTIONS=[
  {id:"ca1",fromUserId:"u20",toUserId:"u40",messageBody:"Dear Godsway, please ensure you upload your cell meeting photo with every report. The picture is needed for verification. God bless you.",isRead:false,createdAt:"2026-06-07T09:00:00"},
  {id:"ca2",fromUserId:"u3",toUserId:"u20",messageBody:"PS Franca, please follow up on the Okponglo cell — they missed two consecutive reports this month. Kindly make contact.",isRead:true,createdAt:"2026-05-30T10:00:00"},
  {id:"ca3",fromUserId:"u1",toUserId:"u3",messageBody:"Regional leaders: the June reporting window closes Monday midnight. Ensure all cells under you submit before then.",isRead:false,createdAt:"2026-06-08T08:00:00"},
  {id:"ca4",fromUserId:"u22",toUserId:"u42",messageBody:"Dear Emelia, the area pastor noted two members have been absent for over a month. Please make contact and update us.",isRead:false,createdAt:"2026-06-10T11:00:00"},
];

function seedAttendance(members,reports){
  const att=[];
  members.forEach(mem=>{
    const cr=reports.filter(r=>r.cellId===mem.cellId&&r.meetingHeld).sort((a,b)=>a.reportDate.localeCompare(b.reportDate));
    cr.forEach(rep=>att.push({id:genId(),reportId:rep.id,memberId:mem.id,cellId:mem.cellId,wasPresent:true}));
  });
  return att;
}

function patchAtt(att,reports){
  const c171r=reports.filter(r=>r.cellId==="c171"&&r.meetingHeld).sort((a,b)=>a.reportDate.localeCompare(b.reportDate));
  const c153r=reports.filter(r=>r.cellId==="c153"&&r.meetingHeld).sort((a,b)=>a.reportDate.localeCompare(b.reportDate));
  const l5=c171r.slice(-5).map(r=>r.id);
  const l3=c171r.slice(-3).map(r=>r.id);
  const l4=c153r.slice(-4).map(r=>r.id);
  return att.map(a=>{
    if(a.memberId==="m5"&&l5.includes(a.reportId))return{...a,wasPresent:false};
    if(a.memberId==="m6"&&l3.includes(a.reportId))return{...a,wasPresent:false};
    if(a.memberId==="m13"&&l4.includes(a.reportId))return{...a,wasPresent:false};
    return a;
  });
}

// ── STATE ─────────────────────────────────────────────────────────
function useAppState(){
  const[currentUser,setCurrentUser]=useState(null);
  const[regions,setRegions]=useState(REGIONS);
  const[sections,setSections]=useState(SECTIONS);
  const[cells,setCells]=useState(CELLS);
  const[users,setUsers]=useState(INIT_USERS);
  const[members,setMembers]=useState(INIT_MEMBERS);
  const[reports,setReports]=useState(INIT_REPORTS);
  const[attendance,setAttendance]=useState(()=>patchAtt(seedAttendance(INIT_MEMBERS,INIT_REPORTS),INIT_REPORTS));
  const[cautions,setCautions]=useState(INIT_CAUTIONS);
  const[reportingOpen,setReportingOpen]=useState(true);
  const[page,setPage]=useState("dashboard");
  const[toast,setToast]=useState(null);
  const showToast=useCallback((msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3200);},[]);
  const login=useCallback((email,password)=>{const u=INIT_USERS.find(x=>x.email===email&&x.password===password);if(u){setCurrentUser(u);setPage("dashboard");return true;}return false;},[]);
  const logout=useCallback(()=>{setCurrentUser(null);setPage("dashboard");},[]);
  return{currentUser,regions,setRegions,sections,setSections,cells,setCells,users,setUsers,
    members,setMembers,reports,setReports,attendance,setAttendance,cautions,setCautions,
    reportingOpen,setReportingOpen,page,setPage,toast,showToast,login,logout};
}

// ── ICONS ─────────────────────────────────────────────────────────
const IC=({n,s=18,c="currentColor"})=>{
  const p={
    home:"M3 9.75L12 3l9 6.75V21H15v-5.25h-6V21H3V9.75z",
    report:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0121 9.414V19a2 2 0 01-2 2z",
    users:"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197",
    settings:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    logout:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    cross:"M12 4v16m-8-8h16",check:"M5 13l4 4L19 7",x:"M6 18L18 6M6 6l12 12",plus:"M12 4v16m8-8H4",
    edit:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    trash:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    warn:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    chart:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    church:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    mail:"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    shield:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    download:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
    eye:"M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    move:"M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    flag:"M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H10l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
    upload:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
    trend:"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    person:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  };
  return<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={p[n]||""}/></svg>;
};

// ── PRIMITIVE UI ──────────────────────────────────────────────────
const Toast=({toast})=>{
  if(!toast)return null;
  return<div style={{position:"fixed",bottom:24,right:24,zIndex:9999,background:toast.type==="success"?GREEN:toast.type==="error"?RED:NAVY,color:WHITE,borderRadius:10,padding:"12px 20px",fontFamily:"Inter,sans-serif",fontSize:14,fontWeight:500,boxShadow:"0 4px 24px rgba(0,0,0,0.3)",display:"flex",alignItems:"center",gap:8,maxWidth:380}}>
    <IC n={toast.type==="success"?"check":"warn"} s={15} c={WHITE}/>{toast.msg}
  </div>;
};
const Bdg=({children,color=NAVY,bg=IVORY_DARK})=><span style={{background:bg,color,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700,fontFamily:"Inter,sans-serif",letterSpacing:0.4,whiteSpace:"nowrap"}}>{children}</span>;
const Stat=({label,value,sub,color=NAVY,icon,accent=false})=><div style={{background:accent?`linear-gradient(135deg,${NAVY} 0%,${NAVY_LIGHT} 100%)`:WHITE,borderRadius:12,padding:"15px 17px",boxShadow:"0 2px 10px rgba(15,32,87,0.07)",border:accent?"none":`1px solid ${IVORY_DARK}`,display:"flex",flexDirection:"column",gap:5,minWidth:118}}>
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <span style={{fontSize:10,fontWeight:600,color:accent?"rgba(255,255,255,0.65)":GRAY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.8}}>{label}</span>
    {icon&&<span style={{opacity:0.4}}><IC n={icon} s={13} c={accent?WHITE:color}/></span>}
  </div>
  <div style={{fontSize:27,fontWeight:800,fontFamily:"Montserrat,sans-serif",color:accent?WHITE:color,lineHeight:1}}>{value}</div>
  {sub&&<div style={{fontSize:11,color:accent?"rgba(255,255,255,0.5)":GRAY,fontFamily:"Inter,sans-serif"}}>{sub}</div>}
</div>;
const SH=({children,action})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,marginTop:24}}>
  <h2 style={{margin:0,fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:17,color:NAVY}}>{children}</h2>
  {action}
</div>;
const Btn=({children,onClick,color=NAVY,outline=false,small=false,danger=false,disabled=false,gold=false})=>{
  const bg=danger?RED:gold?GOLD:outline?"transparent":color;
  const cl=outline?(danger?RED:gold?GOLD:color):WHITE;
  return<button onClick={onClick} disabled={disabled} style={{background:bg,color:cl,border:outline?`1.5px solid ${danger?RED:gold?GOLD:color}`:"none",borderRadius:8,padding:small?"5px 12px":"9px 18px",fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:small?12:14,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,display:"inline-flex",alignItems:"center",gap:6,whiteSpace:"nowrap"}}>{children}</button>;
};
const Inp=({label,value,onChange,type="text",placeholder="",required=false,disabled=false})=><div style={{display:"flex",flexDirection:"column",gap:4}}>
  {label&&<label style={{fontSize:11,fontWeight:700,color:NAVY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.5}}>{label}{required?" *":""}</label>}
  <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled} style={{border:`1.5px solid ${IVORY_DARK}`,borderRadius:8,padding:"9px 12px",fontFamily:"Inter,sans-serif",fontSize:14,color:NAVY,outline:"none",background:disabled?IVORY:WHITE,width:"100%"}}/>
</div>;
const Sl=({label,value,onChange,options,placeholder="Select...",required=false})=><div style={{display:"flex",flexDirection:"column",gap:4}}>
  {label&&<label style={{fontSize:11,fontWeight:700,color:NAVY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.5}}>{label}{required?" *":""}</label>}
  <select value={value} onChange={e=>onChange(e.target.value)} style={{border:`1.5px solid ${IVORY_DARK}`,borderRadius:8,padding:"9px 12px",fontFamily:"Inter,sans-serif",fontSize:14,color:NAVY,background:WHITE,outline:"none",width:"100%"}}>
    <option value="">{placeholder}</option>
    {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
</div>;
const Ta=({label,value,onChange,placeholder="",rows=3})=><div style={{display:"flex",flexDirection:"column",gap:4}}>
  {label&&<label style={{fontSize:11,fontWeight:700,color:NAVY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.5}}>{label}</label>}
  <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{border:`1.5px solid ${IVORY_DARK}`,borderRadius:8,padding:"9px 12px",fontFamily:"Inter,sans-serif",fontSize:14,color:NAVY,background:WHITE,outline:"none",resize:"vertical",width:"100%"}}/>
</div>;
const Tog=({label,checked,onChange})=><label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",userSelect:"none"}}>
  <div onClick={()=>onChange(!checked)} style={{width:44,height:24,borderRadius:12,background:checked?GREEN:"#D1D5DB",position:"relative",transition:"background 0.2s",cursor:"pointer",flexShrink:0}}>
    <div style={{width:18,height:18,borderRadius:9,background:WHITE,position:"absolute",top:3,left:checked?23:3,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
  </div>
  {label&&<span style={{fontFamily:"Inter,sans-serif",fontSize:14,color:NAVY,fontWeight:500}}>{label}</span>}
</label>;
const Modal=({title,children,onClose,wide=false})=><div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
  <div style={{background:WHITE,borderRadius:14,boxShadow:"0 20px 60px rgba(0,0,0,0.3)",width:"100%",maxWidth:wide?800:500,maxHeight:"92vh",overflow:"auto"}}>
    <div style={{padding:"18px 24px",borderBottom:`1px solid ${IVORY_DARK}`,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:WHITE,zIndex:1}}>
      <h3 style={{margin:0,fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:16,color:NAVY}}>{title}</h3>
      <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:GRAY}}><IC n="x" s={20}/></button>
    </div>
    <div style={{padding:"20px 24px"}}>{children}</div>
  </div>
</div>;
const DT=({headers,rows,emptyMsg="No records found."})=><div style={{background:WHITE,borderRadius:10,border:`1px solid ${IVORY_DARK}`,overflow:"hidden"}}>
  <div style={{overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"Inter,sans-serif",fontSize:13}}>
      <thead><tr style={{background:NAVY}}>{headers.map((h,i)=><th key={i} style={{padding:"10px 14px",textAlign:"left",color:WHITE,fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:0.7,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
      <tbody>{rows.length===0?<tr><td colSpan={headers.length} style={{padding:28,textAlign:"center",color:GRAY}}>{emptyMsg}</td></tr>:rows.map((row,i)=><tr key={i} style={{background:i%2===0?WHITE:IVORY}}>{row.map((cell,j)=><td key={j} style={{padding:"10px 14px",color:NAVY,borderTop:`1px solid ${IVORY_DARK}`,verticalAlign:"middle"}}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
</div>;
const CC=({title,children,h=190})=><div style={{background:WHITE,borderRadius:12,padding:"16px 18px",border:`1px solid ${IVORY_DARK}`,boxShadow:"0 2px 8px rgba(15,32,87,0.06)"}}>
  <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:12}}>{title}</div>
  <ResponsiveContainer width="100%" height={h}>{children}</ResponsiveContainer>
</div>;
const Pbar=({value,max,color=NAVY})=>{
  const p=max>0?Math.min(100,Math.round(value/max*100)):0;
  return<div style={{background:IVORY_DARK,borderRadius:4,height:8,overflow:"hidden",flex:1}}><div style={{width:`${p}%`,background:color,height:"100%",borderRadius:4}}/></div>;
};
const Alert=({type="info",children})=>{
  const cfg={info:{bg:IVORY_DARK,c:NAVY,ic:"shield"},warning:{bg:"#FFF8E6",c:GOLD,ic:"warn"},danger:{bg:RED_LIGHT,c:RED,ic:"warn"},success:{bg:GREEN_LIGHT,c:GREEN,ic:"check"}}[type];
  return<div style={{background:cfg.bg,borderRadius:10,padding:"12px 16px",color:cfg.c,fontFamily:"Inter,sans-serif",fontSize:13,display:"flex",gap:10,alignItems:"flex-start",marginBottom:14}}>
    <IC n={cfg.ic} s={16} c={cfg.c}/><div>{children}</div>
  </div>;
};

// ── LOGIN ─────────────────────────────────────────────────────────
function LoginPage({onLogin}){
  const[email,setEmail]=useState("");
  const[pw,setPw]=useState("");
  const[err,setErr]=useState("");
  const go=(e,de,dp)=>{e?.preventDefault();if(!onLogin(de||email,dp||pw))setErr("Invalid email or password.");};
  return<div style={{minHeight:"100vh",background:`linear-gradient(160deg,${NAVY} 0%,${NAVY_MID} 60%,${NAVY_LIGHT} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{textAlign:"center",marginBottom:28}}>
      <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:64,height:64,borderRadius:16,background:GOLD,marginBottom:14,boxShadow:"0 6px 24px rgba(200,149,42,0.45)"}}>
        <IC n="cross" s={32} c={WHITE}/>
      </div>
      <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,color:WHITE,letterSpacing:-0.5}}>PEREZ CHAPEL INTERNATIONAL</div>
      <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:11,color:GOLD_LIGHT,letterSpacing:4,marginTop:3}}>DOME DISTRICT</div>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:6}}>LFU Cell Leader Reporting System · {CELLS.length} Cells · {REGIONS.length} Regions</div>
    </div>
    <div style={{width:"100%",maxWidth:440}}>
      <div style={{background:WHITE,borderRadius:16,padding:28,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <h2 style={{margin:"0 0 20px",fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:17,color:NAVY}}>Sign In</h2>
        <form onSubmit={go} style={{display:"flex",flexDirection:"column",gap:12}}>
          <Inp label="Email Address" value={email} onChange={setEmail} type="email" placeholder="your@email.com"/>
          <Inp label="Password" value={pw} onChange={setPw} type="password" placeholder="••••••••"/>
          {err&&<div style={{color:RED,fontSize:13,fontFamily:"Inter,sans-serif",display:"flex",gap:6,alignItems:"center"}}><IC n="warn" s={13} c={RED}/>{err}</div>}
          <Btn onClick={go} color={NAVY}><IC n="shield" s={14} c={WHITE}/> Sign In</Btn>
        </form>
        <div style={{marginTop:20,borderTop:`1px solid ${IVORY_DARK}`,paddingTop:18}}>
          <div style={{fontSize:11,fontWeight:700,color:GRAY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.8,marginBottom:10}}>Quick Demo Access</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {DEMO_ACCOUNTS.map(d=><button key={d.email} onClick={()=>go(null,d.email,d.password)} style={{background:IVORY,border:`1px solid ${IVORY_DARK}`,borderRadius:8,padding:"9px 14px",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:NAVY,fontWeight:600}}>{d.label}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:GRAY}}>{d.sub}</div></div>
              <IC n="logout" s={13} c={GRAY}/>
            </button>)}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

// ── SIDEBAR ───────────────────────────────────────────────────────
function Sidebar({currentUser,page,setPage,logout,unread,reportingOpen}){
  const role=currentUser?.role;
  const nav=[
    {id:"dashboard",label:"Dashboard",icon:"home",roles:["super_admin","regional_leader","sectional_leader","cell_leader"]},
    {id:"report",label:"Submit Report",icon:"report",roles:["cell_leader"]},
    {id:"members",label:"My Members",icon:"users",roles:["cell_leader"]},
    {id:"consistency",label:"Consistency",icon:"flag",roles:["super_admin","regional_leader","sectional_leader","cell_leader"]},
    {id:"reports_list",label:"All Reports",icon:"chart",roles:["super_admin","regional_leader","sectional_leader"]},
    {id:"structure",label:"Organisation",icon:"church",roles:["super_admin","regional_leader","sectional_leader"]},
    {id:"user_mgmt",label:"Users",icon:"person",roles:["super_admin"]},
    {id:"cautions",label:"Messages",icon:"mail",roles:["super_admin","regional_leader","sectional_leader","cell_leader"]},
    {id:"admin",label:"Admin Tools",icon:"settings",roles:["super_admin"]},
  ].filter(n=>n.roles.includes(role));
  const rc={super_admin:GOLD,regional_leader:"#7FFFBE",sectional_leader:"#87CEEB",cell_leader:"rgba(255,255,255,0.8)"};
  return<div style={{width:228,background:NAVY,display:"flex",flexDirection:"column",minHeight:"100vh",flexShrink:0,boxShadow:"4px 0 20px rgba(0,0,0,0.15)"}}>
    <div style={{padding:"22px 18px 16px",borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:38,height:38,borderRadius:10,background:GOLD,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 8px rgba(200,149,42,0.4)"}}><IC n="cross" s={20} c={WHITE}/></div>
        <div><div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:13,color:WHITE,lineHeight:1.2}}>PEREZ DOME</div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:9,color:GOLD_LIGHT,letterSpacing:1.5}}>CELL REPORTING SYSTEM</div></div>
      </div>
    </div>
    <div style={{margin:"10px 12px 0",background:reportingOpen?"rgba(26,122,74,0.22)":"rgba(200,16,46,0.2)",borderRadius:8,padding:"7px 12px",display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:7,height:7,borderRadius:4,background:reportingOpen?"#7FFFBE":RED,flexShrink:0}}/>
      <span style={{fontSize:11,fontWeight:600,color:reportingOpen?"#7FFFBE":"#FF8FA0",fontFamily:"Inter,sans-serif"}}>{reportingOpen?"Reporting Open":"Reporting Closed"}</span>
    </div>
    <nav style={{padding:"10px 8px",flex:1}}>
      {nav.map(item=>{
        const active=page===item.id;
        return<button key={item.id} onClick={()=>setPage(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 12px",background:active?"rgba(255,255,255,0.13)":"transparent",border:active?"1px solid rgba(255,255,255,0.12)":"1px solid transparent",borderRadius:8,cursor:"pointer",color:active?WHITE:"rgba(255,255,255,0.6)",fontFamily:"Inter,sans-serif",fontWeight:active?600:400,fontSize:13,marginBottom:2,textAlign:"left"}}>
          <IC n={item.icon} s={15} c={active?WHITE:"rgba(255,255,255,0.55)"}/>{item.label}
          {item.id==="cautions"&&unread>0&&<span style={{marginLeft:"auto",background:RED,color:WHITE,borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:700}}>{unread}</span>}
        </button>;
      })}
    </nav>
    <div style={{margin:"0 18px",borderTop:`1px solid rgba(255,255,255,0.08)`}}/>
    <div style={{padding:"12px 12px 8px"}}>
      <div style={{padding:"10px 12px",background:"rgba(255,255,255,0.05)",borderRadius:8,marginBottom:6}}>
        <div style={{fontSize:13,fontWeight:600,color:WHITE,fontFamily:"Inter,sans-serif",marginBottom:2}}>{currentUser?.name}</div>
        <div style={{fontSize:10,color:rc[role]||"rgba(255,255,255,0.5)",fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.8}}>{role?.replace(/_/g," ")}</div>
      </div>
      <button onClick={logout} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 12px",background:"none",border:"none",color:"rgba(255,255,255,0.4)",cursor:"pointer",borderRadius:6,fontFamily:"Inter,sans-serif",fontSize:12}}>
        <IC n="logout" s={13} c="rgba(255,255,255,0.4)"/> Sign Out
      </button>
    </div>
  </div>;
}

// ── DASHBOARD ─────────────────────────────────────────────────────
function Dashboard({state}){
  const{currentUser,reports,cells,sections,regions,members,cautions,attendance}=state;
  const role=currentUser.role;
  const sC=useMemo(()=>{
    if(role==="super_admin")return cells;
    if(role==="regional_leader")return cells.filter(c=>c.regionId===currentUser.regionId);
    if(role==="sectional_leader")return cells.filter(c=>c.sectionId===currentUser.sectionId);
    return cells.filter(c=>c.id===currentUser.cellId);
  },[cells,role,currentUser]);
  const sR=useMemo(()=>{const ids=new Set(sC.map(c=>c.id));return reports.filter(r=>ids.has(r.cellId));},[reports,sC]);
  const twR=sR.filter(r=>r.reportDate===LAST_SAT);
  const tot=sC.length,rep=new Set(twR.map(r=>r.cellId)).size,met=twR.filter(r=>r.meetingHeld).length;
  const att=twR.reduce((s,r)=>s+(r.attendanceTotal||0),0);
  const off=twR.reduce((s,r)=>s+(r.offeringAmount||0),0);
  const souls=twR.reduce((s,r)=>s+(r.soulsWon||0),0);
  const out=twR.filter(r=>r.outreachHeld).length;
  const trend=WEEKS.slice(-8).map(wk=>{
    const wR=sR.filter(r=>r.reportDate===wk&&r.meetingHeld);
    return{week:wk.slice(5),attendance:wR.reduce((s,r)=>s+r.attendanceTotal,0),offering:wR.reduce((s,r)=>s+r.offeringAmount,0),souls:wR.reduce((s,r)=>s+r.soulsWon,0)};
  });
  const pie=[{name:"Met",value:met,fill:GREEN},{name:"Didn't meet",value:rep-met,fill:GOLD},{name:"No report",value:tot-rep,fill:RED}].filter(x=>x.value>0);
  const unrepCells=sC.filter(c=>!twR.find(r=>r.cellId===c.id));
  const unreadC=cautions.filter(c=>c.toUserId===currentUser.id&&!c.isRead);
  const titleMap={super_admin:"Global Dashboard",regional_leader:`${regions.find(r=>r.id===currentUser.regionId)?.name||"Regional"} Dashboard`,sectional_leader:"Section Dashboard",cell_leader:"My Cell Dashboard"};
  const regRows=role==="super_admin"?regions.map(reg=>{
    const rc2=cells.filter(c=>c.regionId===reg.id);
    const rr=twR.filter(r=>rc2.find(c=>c.id===r.cellId));
    const reported=new Set(rr.map(r=>r.cellId)).size;
    const rate=rc2.length>0?Math.round(reported/rc2.length*100):0;
    return{name:reg.name.replace(" REGION",""),total:rc2.length,reported,rate,offering:rr.reduce((s,r)=>s+r.offeringAmount,0),souls:rr.reduce((s,r)=>s+r.soulsWon,0)};
  }).filter(r=>r.total>0):[];

  return<div style={{padding:24,maxWidth:1200}}>
    <div style={{marginBottom:20}}>
      <h1 style={{margin:"0 0 4px",fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:23,color:NAVY}}>{titleMap[role]}</h1>
      <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY}}>Week of {LAST_SAT} · {rep}/{tot} cells reported ({tot>0?Math.round(rep/tot*100):0}%)</div>
    </div>
    {unreadC.length>0&&<Alert type="warning"><strong>{unreadC.length} unread message{unreadC.length>1?"s":""}.</strong> Go to Messages to view.</Alert>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(128px,1fr))",gap:11,marginBottom:24}}>
      <Stat label="Total Cells" value={tot} icon="church" accent/>
      <Stat label="Reported" value={rep} sub={`${tot>0?Math.round(rep/tot*100):0}%`} color={NAVY} icon="report"/>
      <Stat label="Met" value={met} sub={`${rep-met} skipped`} color={GREEN} icon="check"/>
      <Stat label="Attendance" value={att} color={NAVY_LIGHT} icon="users"/>
      <Stat label="Offering" value={`GH₵${off}`} color={GOLD} icon="shield"/>
      <Stat label="Souls Won" value={souls} color={GREEN} icon="cross"/>
      <Stat label="Outreach" value={out} color={NAVY} icon="trend"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:20}}>
      <CC title="Attendance Trend — Last 8 Weeks">
        <AreaChart data={trend}>
          <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={NAVY} stopOpacity={0.15}/><stop offset="95%" stopColor={NAVY} stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" stroke={IVORY_DARK}/>
          <XAxis dataKey="week" tick={{fontSize:10}}/>
          <YAxis tick={{fontSize:10}}/>
          <Tooltip contentStyle={{fontFamily:"Inter,sans-serif",fontSize:12}}/>
          <Area type="monotone" dataKey="attendance" stroke={NAVY} strokeWidth={2.5} fill="url(#ag)" name="Attendance"/>
        </AreaChart>
      </CC>
      <CC title="This Week">
        <PieChart><Pie data={pie} cx="50%" cy="50%" outerRadius={72} dataKey="value" labelLine={false} label={({percent})=>`${(percent*100).toFixed(0)}%`} fontSize={10}>
          {pie.map((e,i)=><PieCell key={i} fill={e.fill}/>)}
        </Pie><Tooltip contentStyle={{fontFamily:"Inter,sans-serif",fontSize:12}}/><Legend wrapperStyle={{fontSize:10,fontFamily:"Inter,sans-serif"}}/></PieChart>
      </CC>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
      <CC title="Offering Trend (GH₵)" h={170}>
        <BarChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke={IVORY_DARK}/><XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/><Tooltip contentStyle={{fontFamily:"Inter,sans-serif",fontSize:12}}/><Bar dataKey="offering" fill={GOLD} name="Offering" radius={[3,3,0,0]}/></BarChart>
      </CC>
      <CC title="Souls Won per Week" h={170}>
        <LineChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke={IVORY_DARK}/><XAxis dataKey="week" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/><Tooltip contentStyle={{fontFamily:"Inter,sans-serif",fontSize:12}}/><Line type="monotone" dataKey="souls" stroke={GREEN} strokeWidth={2.5} dot={{r:4,fill:GREEN}} name="Souls"/></LineChart>
      </CC>
    </div>
    {role==="super_admin"&&regRows.length>0&&<>
      <SH>Region Comparison — This Week ({LAST_SAT})</SH>
      <div style={{background:WHITE,borderRadius:10,border:`1px solid ${IVORY_DARK}`,overflow:"hidden",marginBottom:22}}>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontFamily:"Inter,sans-serif",fontSize:13}}>
          <thead><tr style={{background:NAVY}}>{["Region","Total Cells","Reported","Rate","Offering (GH₵)","Souls"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",color:WHITE,fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:0.7,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
          <tbody>{regRows.map((r,i)=><tr key={i} style={{background:i%2===0?WHITE:IVORY}}>
            <td style={{padding:"10px 14px",fontWeight:700,color:NAVY,borderTop:`1px solid ${IVORY_DARK}`}}>{r.name}</td>
            <td style={{padding:"10px 14px",borderTop:`1px solid ${IVORY_DARK}`}}>{r.total}</td>
            <td style={{padding:"10px 14px",borderTop:`1px solid ${IVORY_DARK}`}}>{r.reported}</td>
            <td style={{padding:"10px 14px",borderTop:`1px solid ${IVORY_DARK}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}><Pbar value={r.reported} max={r.total} color={r.rate>75?GREEN:r.rate>50?GOLD:RED}/><span style={{fontSize:11,fontWeight:700,color:r.rate>75?GREEN:r.rate>50?GOLD:RED,minWidth:32}}>{r.rate}%</span></div>
            </td>
            <td style={{padding:"10px 14px",borderTop:`1px solid ${IVORY_DARK}`,color:GOLD,fontWeight:600}}>GH₵{r.offering}</td>
            <td style={{padding:"10px 14px",borderTop:`1px solid ${IVORY_DARK}`,color:GREEN,fontWeight:700}}>{r.souls}</td>
          </tr>)}</tbody>
        </table></div>
      </div>
    </>}
    {unrepCells.length>0&&<>
      <SH>Cells Without Report This Week ({unrepCells.length})</SH>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:9,marginBottom:20}}>
        {unrepCells.slice(0,18).map(c=><div key={c.id} style={{background:WHITE,border:`1px solid ${RED_LIGHT}`,borderLeft:`3px solid ${RED}`,borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
          <IC n="warn" s={15} c={RED}/>
          <div><div style={{fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:600,color:NAVY}}>{c.name}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:GRAY}}>{sections.find(s=>s.id===c.sectionId)?.name?.slice(0,32)}</div></div>
        </div>)}
      </div>
    </>}
    {role==="cell_leader"&&<>
      <SH>My Report History</SH>
      <DT headers={["Date","Met?","Attendance","Offering","Souls","Outreach","AP Visit"]}
        rows={sR.slice(-8).reverse().map(r=>[r.reportDate,r.meetingHeld?<Bdg color={GREEN} bg={GREEN_LIGHT}>Yes</Bdg>:<Bdg color={RED} bg={RED_LIGHT}>No</Bdg>,r.meetingHeld?r.attendanceTotal:"—",r.meetingHeld?`GH₵${r.offeringAmount}`:"—",r.soulsWon||"0",r.outreachHeld?<Bdg color={NAVY} bg={IVORY_DARK}>Yes</Bdg>:"No",r.apVisit?<Bdg color={GREEN} bg={GREEN_LIGHT}>Yes</Bdg>:"No"])}/>
    </>}
  </div>;
}

// ── REPORT FORM — mirrors exact Google Form question flow ─────────
function ReportForm({state}){
  const{currentUser,cells,sections,regions,reports,setReports,members,attendance,setAttendance,reportingOpen,showToast}=state;
  const cell=cells.find(c=>c.id===currentUser.cellId);
  const sec=sections.find(s=>s.id===cell?.sectionId);
  const reg=regions.find(r=>r.id===cell?.regionId);
  const cellMembers=members.filter(m=>m.cellId===currentUser.cellId&&m.isActive);
  const existing=reports.find(r=>r.cellId===currentUser.cellId&&r.reportDate===LAST_SAT);
  const[f,sf]=useState({
    reportDate:LAST_SAT,meetingHeld:existing?.meetingHeld??true,
    noMeetingReason:existing?.noMeetingReason||"",whoLed:existing?.whoLed||currentUser.name,
    adultsCount:existing?.adultsCount??0,childrenCount:existing?.childrenCount??0,
    offeringAmount:existing?.offeringAmount??0,testimony:existing?.testimony||"",
    outreachHeld:existing?.outreachHeld??false,noOutreachReason:existing?.noOutreachReason||"",
    soulsWon:existing?.soulsWon??0,outreachParticipants:existing?.outreachParticipants??0,
    outreachDuration:existing?.outreachDuration||"",photoUrl:existing?.photoUrl||"",
    comments:existing?.comments||"",apVisit:existing?.apVisit??false,
    noMeetingRemarks:existing?.noMeetingRemarks||"",
  });
  const[memAtt,setMemAtt]=useState(()=>{
    const init={};
    cellMembers.forEach(m=>{const rec=existing?attendance.find(a=>a.reportId===existing.id&&a.memberId===m.id):null;init[m.id]=rec?rec.wasPresent:true;});
    return init;
  });
  const set=(k,v)=>sf(p=>({...p,[k]:v}));
  const totAtt=Number(f.adultsCount)+Number(f.childrenCount);
  const submit=()=>{
    if(!reportingOpen){showToast("Reporting window is closed.","error");return;}
    const rid=existing?.id||genId();
    const rep={id:rid,cellId:currentUser.cellId,submittedBy:currentUser.id,reportDate:f.reportDate,submittedAt:new Date().toISOString(),...f,attendanceTotal:totAtt,soulsWon:Number(f.soulsWon),adultsCount:Number(f.adultsCount),childrenCount:Number(f.childrenCount),offeringAmount:Number(f.offeringAmount),outreachParticipants:Number(f.outreachParticipants)};
    setReports(p=>existing?p.map(r=>r.id===existing.id?rep:r):[...p,rep]);
    const newAtt=cellMembers.map(m=>({id:genId(),reportId:rid,memberId:m.id,cellId:currentUser.cellId,wasPresent:memAtt[m.id]!==false}));
    setAttendance(p=>[...p.filter(a=>a.reportId!==rid),...newAtt]);
    showToast(existing?"Report updated!":"Report submitted successfully!");
  };
  if(!cell)return<div style={{padding:24,color:RED,fontFamily:"Inter,sans-serif"}}>No cell assigned. Contact your administrator.</div>;
  const Card=({title,sub,children})=><div style={{background:WHITE,borderRadius:12,padding:"18px 20px",border:`1px solid ${IVORY_DARK}`,marginBottom:16}}>
    <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:14,color:NAVY,marginBottom:sub?4:12}}>{title}</div>
    {sub&&<div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY,marginBottom:12}}>{sub}</div>}
    {children}
  </div>;
  return<div style={{padding:24,maxWidth:700}}>
    <h1 style={{margin:"0 0 4px",fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,color:NAVY}}>PEREZ DOME LFU Leader Reporting Form</h1>
    <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:RED,fontWeight:600,marginBottom:16}}>This report is supposed to be submitted by Saturday 9 pm</div>
    {!reportingOpen&&<Alert type="danger">Reporting window is currently closed by the administrator.</Alert>}
    {existing&&<Alert type="info">You submitted a report for {LAST_SAT}. Submitting again will update it.</Alert>}

    {/* SECTION 1 — DATE */}
    <Card title="Date" sub="Day/Month/Year e.g. 10/09/2023">
      <Inp label="Date *" value={f.reportDate} onChange={v=>set("reportDate",v)} required placeholder="e.g. 14/06/2026"/>
    </Card>

    {/* REGION / SECTION / CELL — pre-filled, read-only */}
    <Card title="Region & Area Leader">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Inp label="Region *" value={reg?.name||"—"} onChange={()=>{}} disabled/>
        <Inp label="Area Leader / Section *" value={sec?.name||"—"} onChange={()=>{}} disabled/>
        <div style={{gridColumn:"1/-1"}}><Inp label="Name of your LFU *" value={cell.name} onChange={()=>{}} disabled/></div>
      </div>
    </Card>

    {/* SECTION 2 — LFU LEADERSHIP (Q43, Q44) */}
    <Card title="Section 2 — LFU Leadership">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{gridColumn:"1/-1"}}><Inp label="Name of LFU Leader *" value={f.whoLed} onChange={v=>set("whoLed",v)} required placeholder="Your full name"/></div>
        <div style={{gridColumn:"1/-1"}}><Inp label="Contact (phone number)" value={currentUser.phone||""} onChange={()=>{}} disabled/></div>
      </div>
    </Card>

    {/* SECTION 3 — HOME CELL MEETING (Q45 onward) */}
    <Card title="Section 3 — Home Cell Meeting">
      <Tog label="Did you have LFU meeting? *" checked={f.meetingHeld} onChange={v=>set("meetingHeld",v)}/>
      {!f.meetingHeld&&<div style={{marginTop:14}}><Ta label="If NO — please state the reason" value={f.noMeetingReason} onChange={v=>set("noMeetingReason",v)} placeholder="Explain why the meeting did not hold this week..." rows={3}/></div>}
      {f.meetingHeld&&<>
        <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:14}}>
          <Inp label="Who led the LFU meeting?" value={f.whoLed} onChange={v=>set("whoLed",v)} placeholder="Name of person who led"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <Inp label="How many adults were in attendance? *" type="number" value={f.adultsCount} onChange={v=>set("adultsCount",v)}/>
            <Inp label="How many children were in attendance? *" type="number" value={f.childrenCount} onChange={v=>set("childrenCount",v)}/>
          </div>
          <div style={{background:GREEN_LIGHT,borderRadius:8,padding:"8px 14px",fontFamily:"Inter,sans-serif",fontSize:13,color:NAVY}}>
            How many people attended LFU? (total): <strong>{totAtt}</strong> ({f.adultsCount} adults + {f.childrenCount} children)
          </div>
          <Inp label="Amount of offering? * — do not add GHS/GHC prefix. Input 0 if no offering." type="number" value={f.offeringAmount} onChange={v=>set("offeringAmount",v)} placeholder="e.g. 45"/>
        </div>

        {/* Member attendance roll */}
        {cellMembers.length>0&&<div style={{marginTop:18}}>
          <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:13,color:NAVY,marginBottom:4}}>Member Attendance Roll</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY,marginBottom:10}}>Toggle each member's presence. This helps track consistency automatically.</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {cellMembers.map(m=><div key={m.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:memAtt[m.id]!==false?GREEN_LIGHT:RED_LIGHT,borderRadius:8,border:`1px solid ${memAtt[m.id]!==false?"rgba(26,122,74,0.2)":"rgba(200,16,46,0.2)"}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:32,height:32,borderRadius:16,background:memAtt[m.id]!==false?GREEN:RED,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:WHITE,fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:13}}>{m.name[0]}</span></div>
                <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:13,color:NAVY}}>{m.name}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:GRAY}}>{m.phone}</div></div>
              </div>
              <Tog checked={memAtt[m.id]!==false} onChange={v=>setMemAtt(p=>({...p,[m.id]:v}))}/>
            </div>)}
          </div>
        </div>}

        <div style={{marginTop:14}}><Ta label="Testimony (optional)" value={f.testimony} onChange={v=>set("testimony",v)} placeholder="Share any testimonies from this week's meeting..." rows={3}/></div>
      </>}
    </Card>

    {/* SECTION 4 — LFU OUTREACH (Q52 onward) */}
    <Card title="Section 4 — LFU Outreach">
      <Tog label="Did you go on LFU outreach? *" checked={f.outreachHeld} onChange={v=>set("outreachHeld",v)}/>
      {!f.outreachHeld&&<div style={{marginTop:14}}><Ta label="If NO — please state reason" value={f.noOutreachReason} onChange={v=>set("noOutreachReason",v)} rows={2} placeholder="e.g. Heavy rain, insufficient members..."/></div>}
      {f.outreachHeld&&<div style={{marginTop:14,display:"flex",flexDirection:"column",gap:14}}>
        <Inp label="If YES — how many souls did you win? * (input 0 if no soul was won)" type="number" value={f.soulsWon} onChange={v=>set("soulsWon",v)}/>
        <Inp label="How many people were involved in the LFU outreach? * (input 0 if no one went)" type="number" value={f.outreachParticipants} onChange={v=>set("outreachParticipants",v)}/>
        <Sl label="How long did the LFU outreach last?" value={f.outreachDuration} onChange={v=>set("outreachDuration",v)} options={[
          {value:"under_30min",label:"Up to 30 mins"},
          {value:"up_to_1hr",label:"Up to 1 hour"},
          {value:"up_to_1_5hr",label:"Up to 1 hour, 30 mins"},
          {value:"up_to_2hr",label:"Up to 2 hours"},
          {value:"over_2hr",label:"Over 2 hours"},
        ]}/>
      </div>}
    </Card>

    {/* SECTION 5 — OBSERVATION (Q57 onward) */}
    <Card title="Section 5 — Observation">
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Inp label="Please upload a picture of your cell meeting (Google Drive link) — ensure EVERYONE at the meeting appears in the photo" value={f.photoUrl} onChange={v=>set("photoUrl",v)} placeholder="https://drive.google.com/..."/>
        <Ta label="Comments / Observations" value={f.comments} onChange={v=>set("comments",v)} rows={3} placeholder="Any observations or additional notes..."/>
        <Tog label="Did your LFU Area Pastor visit you? *" checked={f.apVisit} onChange={v=>set("apVisit",v)}/>
        {!f.meetingHeld&&<Ta label="Remarks (if no meeting)" value={f.noMeetingRemarks} onChange={v=>set("noMeetingRemarks",v)} rows={3} placeholder="Additional remarks..."/>}
      </div>
    </Card>

    <Btn onClick={submit} disabled={!reportingOpen} color={NAVY}><IC n="check" s={15} c={WHITE}/> {existing?"Update Report":"Submit Report"}</Btn>
  </div>;
}

// ── MEMBERS ───────────────────────────────────────────────────────
function MembersPage({state}){
  const{currentUser,members,setMembers,reports,attendance,showToast}=state;
  const cid=currentUser.cellId;
  const cm=members.filter(m=>m.cellId===cid);
  const[modal,setModal]=useState(false);const[edit,setEdit]=useState(null);const[form,setForm]=useState({name:"",phone:"",notes:""});const[filter,setFilter]=useState("all");
  const sf=(k,v)=>setForm(p=>({...p,[k]:v}));
  const cellReps=reports.filter(r=>r.cellId===cid&&r.meetingHeld).sort((a,b)=>a.reportDate.localeCompare(b.reportDate));
  const getStats=mid=>{
    const recs=attendance.filter(a=>a.memberId===mid);const present=recs.filter(a=>a.wasPresent).length;const total=cellReps.length;const rate=total>0?Math.round(present/total*100):100;
    let streak=0;for(let i=cellReps.length-1;i>=0;i--){const rec=recs.find(a=>a.reportId===cellReps[i].id);if(rec&&!rec.wasPresent)streak++;else break;}
    return{present,total,rate,streak};
  };
  const save=()=>{
    if(!form.name.trim()){showToast("Name required.","error");return;}
    if(edit)setMembers(p=>p.map(m=>m.id===edit.id?{...m,...form}:m));
    else setMembers(p=>[...p,{id:genId(),cellId:cid,...form,isActive:true,joinDate:new Date().toISOString().split("T")[0]}]);
    showToast(edit?"Member updated.":"Member added.");setModal(false);
  };
  const shown=cm.filter(m=>filter==="all"?true:filter==="active"?m.isActive:!m.isActive);
  return<div style={{padding:24}}>
    <SH action={<Btn onClick={()=>{setForm({name:"",phone:"",notes:""});setEdit(null);setModal(true);}} small><IC n="plus" s={12} c={WHITE}/> Add Member</Btn>}>
      Cell Members ({cm.filter(m=>m.isActive).length} active)
    </SH>
    <div style={{display:"flex",gap:11,marginBottom:16,flexWrap:"wrap"}}>
      <Stat label="Registered" value={cm.length} color={NAVY}/>
      <Stat label="Active" value={cm.filter(m=>m.isActive).length} color={GREEN}/>
      <Stat label="Flagged (3+)" value={cm.filter(m=>{const s=getStats(m.id);return s.streak>=3;}).length} color={RED}/>
    </div>
    <div style={{display:"flex",gap:4,marginBottom:14,borderBottom:`2px solid ${IVORY_DARK}`}}>
      {[["all","All"],["active","Active"],["inactive","Inactive"]].map(([v,l])=><button key={v} onClick={()=>setFilter(v)} style={{padding:"7px 14px",background:"none",border:"none",cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:filter===v?700:400,fontSize:13,color:filter===v?NAVY:GRAY,borderBottom:filter===v?`2px solid ${NAVY}`:"2px solid transparent",marginBottom:-2}}>{l}</button>)}
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {shown.length===0&&<div style={{color:GRAY,fontFamily:"Inter,sans-serif",fontSize:14,padding:"24px 0"}}>No members found. Add your first member above.</div>}
      {shown.map(m=>{
        const s=getStats(m.id);const cr=s.streak>=5,wy=s.streak>=3&&!cr;
        return<div key={m.id} style={{background:WHITE,borderRadius:10,border:`1px solid ${cr?RED:wy?GOLD:IVORY_DARK}`,borderLeft:`3px solid ${cr?RED:wy?GOLD:GREEN}`,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,opacity:m.isActive?1:0.55}}>
          <div style={{width:40,height:40,borderRadius:20,background:cr?RED:wy?GOLD:NAVY,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:WHITE,fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:14}}>{m.name[0]}</span></div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:NAVY}}>{m.name}</div>
            <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY}}>{m.phone} · Joined {m.joinDate}</div>
            {s.total>0&&<div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}><Pbar value={s.present} max={s.total} color={s.rate>75?GREEN:s.rate>50?GOLD:RED}/><span style={{fontSize:11,fontWeight:700,color:s.rate>75?GREEN:s.rate>50?GOLD:RED,minWidth:34}}>{s.rate}%</span>{s.streak>0&&<span style={{fontSize:11,color:cr?RED:GOLD,fontWeight:700}}>● {s.streak} absent</span>}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:4,alignItems:"flex-end"}}>
            {cr&&<Bdg color={RED} bg={RED_LIGHT}>Critical</Bdg>}
            {wy&&<Bdg color={GOLD} bg="#FFF8E6">Watch</Bdg>}
            {!cr&&!wy&&m.isActive&&<Bdg color={GREEN} bg={GREEN_LIGHT}>Regular</Bdg>}
            <div style={{display:"flex",gap:6,marginTop:4}}>
              <Btn small outline onClick={()=>{setForm({name:m.name,phone:m.phone,notes:m.notes||""});setEdit(m);setModal(true);}}><IC n="edit" s={12}/></Btn>
              <Btn small outline danger onClick={()=>{setMembers(p=>p.map(x=>x.id===m.id?{...x,isActive:!x.isActive}:x));showToast(m.isActive?"Deactivated.":"Reactivated.");}}>{m.isActive?"Deactivate":"Reactivate"}</Btn>
            </div>
          </div>
        </div>;
      })}
    </div>
    {modal&&<Modal title={edit?"Edit Member":"Add Member"} onClose={()=>setModal(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Inp label="Full Name" value={form.name} onChange={v=>sf("name",v)} required placeholder="e.g. Kofi Mensah"/>
        <Inp label="Phone Number" value={form.phone} onChange={v=>sf("phone",v)} placeholder="e.g. 0244001122"/>
        <Ta label="Notes (optional)" value={form.notes} onChange={v=>sf("notes",v)} rows={2}/>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setModal(false)}>Cancel</Btn><Btn onClick={save}>{edit?"Save":"Add Member"}</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── CONSISTENCY ───────────────────────────────────────────────────
function ConsistencyPage({state}){
  const{currentUser,members,reports,attendance,cells,sections}=state;
  const role=currentUser.role;
  const sC=useMemo(()=>{if(role==="super_admin")return cells;if(role==="regional_leader")return cells.filter(c=>c.regionId===currentUser.regionId);if(role==="sectional_leader")return cells.filter(c=>c.sectionId===currentUser.sectionId);return cells.filter(c=>c.id===currentUser.cellId);},[cells,role,currentUser]);
  const sM=members.filter(m=>sC.find(c=>c.id===m.cellId)&&m.isActive);
  const getData=mem=>{
    const cr=reports.filter(r=>r.cellId===mem.cellId&&r.meetingHeld).sort((a,b)=>a.reportDate.localeCompare(b.reportDate));
    const recs=attendance.filter(a=>a.memberId===mem.id);const present=recs.filter(a=>a.wasPresent).length;const total=cr.length;const rate=total>0?Math.round(present/total*100):100;
    let streak=0;for(let i=cr.length-1;i>=0;i--){const rec=recs.find(a=>a.reportId===cr[i].id);if(rec&&!rec.wasPresent)streak++;else break;}
    return{...mem,present,total,rate,streak,cell:sC.find(c=>c.id===mem.cellId)};
  };
  const all=sM.map(getData).sort((a,b)=>b.streak-a.streak);
  const crit=all.filter(d=>d.streak>=5),watch=all.filter(d=>d.streak>=3&&d.streak<5);
  const[tab,setTab]=useState("critical");
  const shown=tab==="critical"?crit:tab==="watch"?watch:all;
  return<div style={{padding:24}}>
    <h1 style={{margin:"0 0 4px",fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:22,color:NAVY}}>Consistency Tracker</h1>
    <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:GRAY,marginBottom:20}}>Track member attendance streaks and absentee flags across all scoped cells.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:11,marginBottom:20}}>
      <Stat label="Tracked" value={all.length} color={NAVY}/><Stat label="Critical (5+)" value={crit.length} color={RED}/><Stat label="Watch (3–4)" value={watch.length} color={GOLD}/><Stat label="Regular" value={all.filter(d=>d.streak===0).length} color={GREEN}/>
    </div>
    {crit.length>0&&<Alert type="danger"><strong>{crit.length} member{crit.length>1?"s":""} with 5+ consecutive absences.</strong> Immediate follow-up required. Cell leaders should be queried.</Alert>}
    {watch.length>0&&<Alert type="warning"><strong>{watch.length} member{watch.length>1?"s":""} on watch (3–4 absences).</strong> Cell leaders should make contact this week.</Alert>}
    {crit.length===0&&watch.length===0&&all.length>0&&<Alert type="success">All tracked members are attending consistently. Well done!</Alert>}
    <div style={{display:"flex",gap:4,marginBottom:14,borderBottom:`2px solid ${IVORY_DARK}`}}>
      {[["critical",`🔴 Critical (${crit.length})`],["watch",`🟡 Watch (${watch.length})`],["all",`All Members (${all.length})`]].map(([v,l])=><button key={v} onClick={()=>setTab(v)} style={{padding:"7px 14px",background:"none",border:"none",cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:tab===v?700:400,fontSize:13,color:tab===v?NAVY:GRAY,borderBottom:tab===v?`2px solid ${NAVY}`:"2px solid transparent",marginBottom:-2}}>{l}</button>)}
    </div>
    {shown.length===0?<div style={{textAlign:"center",padding:40,color:GRAY,fontFamily:"Inter,sans-serif"}}>No members in this category.</div>:
    <DT headers={["Member","Cell","Section","Attendance Rate","Absence Streak","Status"]}
      rows={shown.map(d=>[
        <div><div style={{fontWeight:600,color:NAVY}}>{d.name}</div><div style={{fontSize:11,color:GRAY}}>{d.phone}</div></div>,
        <span style={{fontSize:12}}>{d.cell?.name?.slice(0,26)||"—"}</span>,
        <span style={{fontSize:12}}>{sections.find(s=>s.id===d.cell?.sectionId)?.name?.slice(0,22)||"—"}</span>,
        <div style={{display:"flex",alignItems:"center",gap:8,minWidth:110}}><Pbar value={d.present} max={d.total} color={d.rate>75?GREEN:d.rate>50?GOLD:RED}/><span style={{fontSize:11,fontWeight:700,color:d.rate>75?GREEN:d.rate>50?GOLD:RED,minWidth:32}}>{d.rate}%</span><span style={{fontSize:11,color:GRAY}}>({d.present}/{d.total})</span></div>,
        d.streak>0?<span style={{color:d.streak>=5?RED:GOLD,fontWeight:700}}>{d.streak} in a row</span>:<span style={{color:GREEN}}>None</span>,
        d.streak>=5?<Bdg color={RED} bg={RED_LIGHT}>Critical</Bdg>:d.streak>=3?<Bdg color={GOLD} bg="#FFF8E6">Watch</Bdg>:<Bdg color={GREEN} bg={GREEN_LIGHT}>Regular</Bdg>,
      ])}
    />}
  </div>;
}

// ── ALL REPORTS ───────────────────────────────────────────────────
function ReportsList({state}){
  const{currentUser,reports,cells,regions,sections}=state;
  const role=currentUser.role;
  const[fR,setFR]=useState("");const[fS,setFS]=useState("");const[fW,setFW]=useState("");const[fM,setFM]=useState("");const[sel,setSel]=useState(null);
  const sIds=useMemo(()=>{let sc=cells;if(role==="regional_leader")sc=sc.filter(c=>c.regionId===currentUser.regionId);if(role==="sectional_leader")sc=sc.filter(c=>c.sectionId===currentUser.sectionId);return new Set(sc.map(c=>c.id));},[cells,role,currentUser]);
  const filtered=useMemo(()=>reports.filter(r=>sIds.has(r.cellId)).filter(r=>!fW||r.reportDate===fW).filter(r=>!fM||r.meetingHeld===(fM==="yes")).filter(r=>{if(!fR)return true;return cells.find(c=>c.id===r.cellId)?.regionId===fR;}).filter(r=>{if(!fS)return true;return cells.find(c=>c.id===r.cellId)?.sectionId===fS;}).sort((a,b)=>b.reportDate.localeCompare(a.reportDate)),[reports,sIds,fW,fM,fR,fS,cells]);
  const totOff=filtered.reduce((s,r)=>s+(r.offeringAmount||0),0);
  const totAtt=filtered.reduce((s,r)=>s+(r.attendanceTotal||0),0);
  const totS=filtered.reduce((s,r)=>s+(r.soulsWon||0),0);
  const wkOpts=[...new Set(reports.map(r=>r.reportDate))].sort().reverse().map(w=>({value:w,label:w}));
  const rOpts=regions.map(r=>({value:r.id,label:r.name}));
  const sOpts=sections.filter(s=>!fR||s.regionId===fR).map(s=>({value:s.id,label:s.name}));
  return<div style={{padding:24}}>
    <SH>All Reports ({filtered.length})</SH>
    <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"flex-end"}}>
      {role==="super_admin"&&<div style={{minWidth:160}}><Sl placeholder="All regions" value={fR} onChange={v=>{setFR(v);setFS("");}} options={rOpts}/></div>}
      {(role==="super_admin"||role==="regional_leader")&&<div style={{minWidth:200}}><Sl placeholder="All sections" value={fS} onChange={setFS} options={sOpts}/></div>}
      <div style={{minWidth:140}}><Sl placeholder="All weeks" value={fW} onChange={setFW} options={wkOpts}/></div>
      <div style={{minWidth:120}}><Sl placeholder="Met / Not met" value={fM} onChange={setFM} options={[{value:"yes",label:"Met"},{value:"no",label:"Did not meet"}]}/></div>
      <Btn small outline onClick={()=>{setFR("");setFS("");setFW("");setFM("");}}>Clear</Btn>
    </div>
    <div style={{display:"flex",gap:11,marginBottom:14,flexWrap:"wrap"}}>
      <Stat label="Shown" value={filtered.length} color={NAVY}/>
      <Stat label="Met" value={filtered.filter(r=>r.meetingHeld).length} color={GREEN}/>
      <Stat label="Total Attendance" value={totAtt} color={NAVY_LIGHT}/>
      <Stat label="Total Offering" value={`GH₵${totOff}`} color={GOLD}/>
      <Stat label="Souls Won" value={totS} color={GREEN}/>
    </div>
    <DT headers={["Date","Cell","Region","Met?","Attendance","Offering","Souls","AP","View"]}
      rows={filtered.map(r=>{
        const c=cells.find(x=>x.id===r.cellId);const rg=regions.find(x=>x.id===c?.regionId);
        return[
          <span style={{fontSize:12,color:GRAY,whiteSpace:"nowrap"}}>{r.reportDate}</span>,
          <div style={{fontWeight:600,color:NAVY,fontSize:12,maxWidth:180}}>{c?.name||r.cellId}</div>,
          <span style={{fontSize:11}}>{rg?.name?.replace(" REGION","")||"—"}</span>,
          r.meetingHeld?<Bdg color={GREEN} bg={GREEN_LIGHT}>Yes</Bdg>:<Bdg color={RED} bg={RED_LIGHT}>No</Bdg>,
          r.meetingHeld?r.attendanceTotal:"—",
          r.meetingHeld?<span style={{color:GOLD,fontWeight:600}}>GH₵{r.offeringAmount}</span>:"—",
          <span style={{color:GREEN,fontWeight:700}}>{r.soulsWon||"0"}</span>,
          r.apVisit?<Bdg color={NAVY} bg={IVORY_DARK}>Yes</Bdg>:"No",
          <Btn small outline onClick={()=>setSel(r)}><IC n="eye" s={12}/> View</Btn>,
        ];
      })}
    />
    {sel&&<Modal title={`Report — ${cells.find(c=>c.id===sel.cellId)?.name}`} onClose={()=>setSel(null)} wide>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        {[["Date",sel.reportDate],["Cell",cells.find(c=>c.id===sel.cellId)?.name||sel.cellId],
          ["Region",regions.find(r=>r.id===cells.find(c=>c.id===sel.cellId)?.regionId)?.name||"—"],
          ["Section",sections.find(s=>s.id===cells.find(c=>c.id===sel.cellId)?.sectionId)?.name||"—"],
          ["Meeting Held",sel.meetingHeld?"Yes":"No"],["Led By",sel.whoLed||"—"],
          ["Adults",sel.adultsCount],["Children",sel.childrenCount],["Total Attendance",sel.attendanceTotal],
          ["Offering (GH₵)",sel.offeringAmount],["Souls Won",sel.soulsWon],
          ["Outreach",sel.outreachHeld?"Yes":"No"],["Outreach Participants",sel.outreachParticipants||"—"],
          ["Outreach Duration",sel.outreachDuration?.replace(/_/g," ")||"—"],
          ["AP Visit",sel.apVisit?"Yes":"No"],["Submitted",sel.submittedAt?.slice(0,16)||"—"],
        ].map(([k,v])=><div key={k} style={{background:IVORY,borderRadius:8,padding:"10px 14px"}}>
          <div style={{fontSize:10,fontWeight:700,color:GRAY,textTransform:"uppercase",letterSpacing:0.5}}>{k}</div>
          <div style={{fontWeight:600,color:NAVY,marginTop:2,fontSize:13}}>{String(v||"—")}</div>
        </div>)}
      </div>
      {sel.testimony&&<Alert type="success"><strong>Testimony:</strong> {sel.testimony}</Alert>}
      {sel.noMeetingReason&&<Alert type="danger"><strong>No meeting reason:</strong> {sel.noMeetingReason}</Alert>}
      {sel.noOutreachReason&&<Alert type="warning"><strong>No outreach reason:</strong> {sel.noOutreachReason}</Alert>}
      {sel.comments&&<Alert type="info"><strong>Comments:</strong> {sel.comments}</Alert>}
      {sel.photoUrl&&<a href={sel.photoUrl} target="_blank" rel="noreferrer" style={{color:NAVY,fontFamily:"Inter,sans-serif",fontSize:13,display:"flex",alignItems:"center",gap:6}}><IC n="eye" s={14} c={NAVY}/> View Cell Meeting Photo</a>}
    </Modal>}
  </div>;
}

// ── ORGANISATION ──────────────────────────────────────────────────
function StructurePage({state}){
  const{currentUser,regions,setRegions,sections,setSections,cells,setCells,showToast}=state;
  const role=currentUser.role;
  const[tab,setTab]=useState("cells");const[modal,setModal]=useState(null);const[form,setForm]=useState({});const[moveModal,setMoveModal]=useState(null);const[moveTgt,setMoveTgt]=useState("");const[search,setSearch]=useState("");
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const sR=role==="super_admin"?regions:regions.filter(r=>r.id===currentUser.regionId);
  const sS=role==="super_admin"?sections:role==="regional_leader"?sections.filter(s=>s.regionId===currentUser.regionId):sections.filter(s=>s.id===currentUser.sectionId);
  const sC=role==="super_admin"?cells:role==="regional_leader"?cells.filter(c=>c.regionId===currentUser.regionId):cells.filter(c=>c.sectionId===currentUser.sectionId);
  const fC=search?sC.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.location.toLowerCase().includes(search.toLowerCase())):sC;
  const save=()=>{
    if(modal.type==="region"){if(!form.name?.trim()){showToast("Name required.","error");return;}modal.item?setRegions(p=>p.map(r=>r.id===modal.item.id?{...r,name:form.name}:r)):setRegions(p=>[...p,{id:genId(),name:form.name}]);}
    else if(modal.type==="section"){if(!form.name?.trim()||!form.regionId){showToast("Name and Region required.","error");return;}modal.item?setSections(p=>p.map(s=>s.id===modal.item.id?{...s,...form}:s)):setSections(p=>[...p,{id:genId(),name:form.name,regionId:form.regionId}]);}
    else{if(!form.name?.trim()||!form.sectionId){showToast("Name and Section required.","error");return;}const sec=sections.find(s=>s.id===form.sectionId);modal.item?setCells(p=>p.map(c=>c.id===modal.item.id?{...c,...form,regionId:sec?.regionId||c.regionId}:c)):setCells(p=>[...p,{id:genId(),name:form.name,sectionId:form.sectionId,regionId:sec?.regionId||"",location:form.location||""}]);}
    showToast(modal.item?"Updated.":"Added.");setModal(null);
  };
  const del=(type,id)=>{if(type==="region")setRegions(p=>p.filter(r=>r.id!==id));else if(type==="section")setSections(p=>p.filter(s=>s.id!==id));else setCells(p=>p.filter(c=>c.id!==id));showToast("Removed.");};
  const moveCell=()=>{if(!moveTgt){showToast("Select target.","error");return;}const sec=sections.find(s=>s.id===moveTgt);setCells(p=>p.map(c=>c.id===moveModal.id?{...c,sectionId:moveTgt,regionId:sec?.regionId||c.regionId}:c));showToast("Cell moved.");setMoveModal(null);setMoveTgt("");};
  return<div style={{padding:24}}>
    <SH action={<div style={{display:"flex",gap:8}}>
      {tab==="regions"&&role==="super_admin"&&<Btn small onClick={()=>{setModal({type:"region",item:null});setForm({});}}><IC n="plus" s={12} c={WHITE}/> Add Region</Btn>}
      {tab==="sections"&&(role==="super_admin"||role==="regional_leader")&&<Btn small onClick={()=>{setModal({type:"section",item:null});setForm({});}}><IC n="plus" s={12} c={WHITE}/> Add Section</Btn>}
      {tab==="cells"&&<Btn small onClick={()=>{setModal({type:"cell",item:null});setForm({});}}><IC n="plus" s={12} c={WHITE}/> Add Cell</Btn>}
    </div>}>Organisation Structure</SH>
    <div style={{display:"flex",gap:11,marginBottom:16}}><Stat label="Regions" value={sR.length} color={NAVY}/><Stat label="Sections" value={sS.length} color={NAVY_LIGHT}/><Stat label="Cells" value={sC.length} color={GREEN}/></div>
    <div style={{display:"flex",gap:4,marginBottom:14,borderBottom:`2px solid ${IVORY_DARK}`}}>
      {[["regions","Regions"],["sections","Sections"],["cells","Cells"]].map(([v,l])=><button key={v} onClick={()=>setTab(v)} style={{padding:"7px 14px",background:"none",border:"none",cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:tab===v?700:400,fontSize:13,color:tab===v?NAVY:GRAY,borderBottom:tab===v?`2px solid ${NAVY}`:"2px solid transparent",marginBottom:-2}}>{l}</button>)}
    </div>
    {tab==="cells"&&<div style={{marginBottom:12,maxWidth:340}}><Inp placeholder="Search cells by name or location..." value={search} onChange={setSearch}/></div>}
    {tab==="regions"&&<DT headers={["Region","Sections","Cells",""]} rows={sR.map(r=>[<span style={{fontWeight:700,color:NAVY}}>{r.name}</span>,sections.filter(s=>s.regionId===r.id).length,cells.filter(c=>c.regionId===r.id).length,<div style={{display:"flex",gap:6}}>{role==="super_admin"&&<><Btn small outline onClick={()=>{setModal({type:"region",item:r});setForm({...r});}}><IC n="edit" s={12}/></Btn><Btn small outline danger onClick={()=>del("region",r.id)}><IC n="trash" s={12}/></Btn></>}</div>])}/>}
    {tab==="sections"&&<DT headers={["Section Name","Region","Cells",""]} rows={sS.map(s=>[<span style={{fontWeight:600,color:NAVY,fontSize:12}}>{s.name}</span>,regions.find(r=>r.id===s.regionId)?.name?.replace(" REGION","")||"—",cells.filter(c=>c.sectionId===s.id).length,<div style={{display:"flex",gap:6}}><Btn small outline onClick={()=>{setModal({type:"section",item:s});setForm({...s});}}><IC n="edit" s={12}/></Btn>{(role==="super_admin"||role==="regional_leader")&&<Btn small outline danger onClick={()=>del("section",s.id)}><IC n="trash" s={12}/></Btn>}</div>])}/>}
    {tab==="cells"&&<DT headers={["Cell Name","Section","Region","Location",""]} rows={fC.map(c=>[<span style={{fontWeight:600,color:NAVY,fontSize:12}}>{c.name}</span>,sections.find(s=>s.id===c.sectionId)?.name?.slice(0,26)||"—",regions.find(r=>r.id===c.regionId)?.name?.replace(" REGION","")||"—",c.location||"—",<div style={{display:"flex",gap:5}}><Btn small outline onClick={()=>{setModal({type:"cell",item:c});setForm({...c});}}><IC n="edit" s={12}/></Btn>{(role==="super_admin"||role==="regional_leader")&&<><Btn small outline onClick={()=>{setMoveModal(c);setMoveTgt("");}}><IC n="move" s={12}/> Move</Btn><Btn small outline danger onClick={()=>del("cell",c.id)}><IC n="trash" s={12}/></Btn></>}</div>])}/>}
    {modal&&<Modal title={`${modal.item?"Edit":"Add"} ${modal.type}`} onClose={()=>setModal(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Inp label="Name" value={form.name||""} onChange={v=>set("name",v)} required/>
        {modal.type==="section"&&<Sl label="Region" value={form.regionId||""} onChange={v=>set("regionId",v)} options={sR.map(r=>({value:r.id,label:r.name}))} required/>}
        {modal.type==="cell"&&<><Sl label="Section" value={form.sectionId||""} onChange={v=>set("sectionId",v)} options={sS.map(s=>({value:s.id,label:s.name}))} required/><Inp label="Location" value={form.location||""} onChange={v=>set("location",v)} placeholder="e.g. Accra"/></>}
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setModal(null)}>Cancel</Btn><Btn onClick={save}>{modal.item?"Save":"Add"}</Btn></div>
      </div>
    </Modal>}
    {moveModal&&<Modal title={`Move: ${moveModal.name}`} onClose={()=>{setMoveModal(null);setMoveTgt("");}}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Alert type="info">Moving this cell transfers all its members and reports to the selected section.</Alert>
        <div style={{background:IVORY,borderRadius:8,padding:"10px 14px",fontFamily:"Inter,sans-serif",fontSize:13}}><strong>Current section:</strong> {sections.find(s=>s.id===moveModal.sectionId)?.name||"Unknown"}</div>
        <Sl label="Move to section" value={moveTgt} onChange={setMoveTgt} options={sS.filter(s=>s.id!==moveModal.sectionId).map(s=>({value:s.id,label:s.name}))} required/>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>{setMoveModal(null);setMoveTgt("");}}>Cancel</Btn><Btn gold onClick={moveCell}><IC n="move" s={14} c={WHITE}/> Move Cell</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── USER MANAGEMENT ───────────────────────────────────────────────
function UserMgmt({state}){
  const{users,setUsers,cells,sections,regions,showToast}=state;
  const[modal,setModal]=useState(null);const[form,setForm]=useState({});const[search,setSearch]=useState("");
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const save=()=>{
    if(!form.name?.trim()||!form.email?.trim()){showToast("Name and email required.","error");return;}
    if(modal.u){const u={...modal.u,...form};if(!form.password)delete u.password;setUsers(p=>p.map(x=>x.id===modal.u.id?u:x));}
    else{if(!form.password){showToast("Password required for new users.","error");return;}setUsers(p=>[...p,{id:genId(),...form,isActive:true}]);}
    showToast(modal.u?"Updated.":"Created.");setModal(null);
  };
  const rl={super_admin:"Super Admin",regional_leader:"Regional Leader",sectional_leader:"Sectional Leader",cell_leader:"Cell Leader"};
  const rc2={super_admin:GOLD,regional_leader:GREEN,sectional_leader:NAVY_LIGHT,cell_leader:GRAY};
  const filt=users.filter(u=>!search||u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()));
  return<div style={{padding:24}}>
    <SH action={<Btn small onClick={()=>{setModal({u:null});setForm({role:"cell_leader",isActive:true,password:""});}}><IC n="plus" s={12} c={WHITE}/> Add User</Btn>}>Users ({users.length})</SH>
    <div style={{marginBottom:14,maxWidth:300}}><Inp placeholder="Search by name or email..." value={search} onChange={setSearch}/></div>
    <DT headers={["Name","Email","Role","Assigned To","Status","Actions"]}
      rows={filt.map(u=>[
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:30,height:30,borderRadius:15,background:rc2[u.role]||GRAY,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:WHITE,fontWeight:700,fontSize:11}}>{u.name[0]}</span></div><span style={{fontWeight:600,color:NAVY}}>{u.name}</span></div>,
        <span style={{color:GRAY,fontSize:12}}>{u.email}</span>,
        <Bdg color={rc2[u.role]||GRAY} bg={`${rc2[u.role]||GRAY}22`}>{rl[u.role]||u.role}</Bdg>,
        u.role==="regional_leader"?regions.find(r=>r.id===u.regionId)?.name?.replace(" REGION","")||"—":u.role==="sectional_leader"?sections.find(s=>s.id===u.sectionId)?.name?.slice(0,22)||"—":u.role==="cell_leader"?cells.find(c=>c.id===u.cellId)?.name?.slice(0,22)||"—":"—",
        u.isActive!==false?<Bdg color={GREEN} bg={GREEN_LIGHT}>Active</Bdg>:<Bdg color={GRAY} bg={GRAY_LIGHT}>Inactive</Bdg>,
        <div style={{display:"flex",gap:6}}><Btn small outline onClick={()=>{setModal({u});setForm({...u,password:""});}}><IC n="edit" s={12}/></Btn><Btn small outline danger onClick={()=>{setUsers(p=>p.map(x=>x.id===u.id?{...x,isActive:!x.isActive}:x));showToast("Updated.");}}>{u.isActive!==false?"Deactivate":"Activate"}</Btn></div>,
      ])}
    />
    {modal&&<Modal title={modal.u?"Edit User":"Add User"} onClose={()=>setModal(null)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Inp label="Full Name" value={form.name||""} onChange={v=>set("name",v)} required/>
        <Inp label="Email" type="email" value={form.email||""} onChange={v=>set("email",v)} required/>
        <Inp label="Phone" value={form.phone||""} onChange={v=>set("phone",v)}/>
        <Sl label="Role" value={form.role||""} onChange={v=>set("role",v)} required options={[{value:"super_admin",label:"Super Admin"},{value:"regional_leader",label:"Regional Leader"},{value:"sectional_leader",label:"Sectional Leader"},{value:"cell_leader",label:"Cell Leader"}]}/>
        {form.role==="regional_leader"&&<Sl label="Region" value={form.regionId||""} onChange={v=>set("regionId",v)} options={regions.map(r=>({value:r.id,label:r.name}))}/>}
        {form.role==="sectional_leader"&&<Sl label="Section" value={form.sectionId||""} onChange={v=>set("sectionId",v)} options={sections.map(s=>({value:s.id,label:s.name}))}/>}
        {form.role==="cell_leader"&&<Sl label="Cell" value={form.cellId||""} onChange={v=>set("cellId",v)} options={cells.map(c=>({value:c.id,label:c.name}))}/>}
        <Inp label={modal.u?"New Password (blank = keep)":"Password"} type="password" value={form.password||""} onChange={v=>set("password",v)}/>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setModal(null)}>Cancel</Btn><Btn onClick={save}>{modal.u?"Save":"Create"}</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── MESSAGES / CAUTIONS ───────────────────────────────────────────
function CautionsPage({state}){
  const{currentUser,cautions,setCautions,users,showToast}=state;
  const role=currentUser.role;
  const[compose,setCompose]=useState(false);const[form,setForm]=useState({toUserId:"",messageBody:""});const[tab,setTab]=useState("inbox");
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const inbox=cautions.filter(c=>c.toUserId===currentUser.id).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  const sent=cautions.filter(c=>c.fromUserId===currentUser.id).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
  const unread=inbox.filter(c=>!c.isRead).length;
  const send=()=>{if(!form.toUserId||!form.messageBody.trim()){showToast("Select recipient and write a message.","error");return;}setCautions(p=>[...p,{id:genId(),fromUserId:currentUser.id,toUserId:form.toUserId,messageBody:form.messageBody,isRead:false,createdAt:new Date().toISOString()}]);showToast("Message sent.");setCompose(false);setForm({toUserId:"",messageBody:""});};
  const recips=useMemo(()=>{if(role==="super_admin")return users.filter(u=>u.id!==currentUser.id);if(role==="regional_leader")return users.filter(u=>(u.role==="cell_leader"||u.role==="sectional_leader")&&u.id!==currentUser.id);if(role==="sectional_leader")return users.filter(u=>u.role==="cell_leader"&&u.id!==currentUser.id);return[];},[users,role,currentUser]);
  const shown=tab==="inbox"?inbox:sent;
  return<div style={{padding:24,maxWidth:760}}>
    <SH action={role!=="cell_leader"&&<div style={{display:"flex",gap:8}}>{unread>0&&<Btn small outline onClick={()=>setCautions(p=>p.map(c=>c.toUserId===currentUser.id?{...c,isRead:true}:c))}>Mark all read</Btn>}<Btn small onClick={()=>setCompose(true)}><IC n="plus" s={12} c={WHITE}/> Compose</Btn></div>}>Messages & Cautions</SH>
    {unread>0&&<Alert type="warning"><strong>{unread} unread message{unread>1?"s":""}.</strong> Click any message to mark as read.</Alert>}
    <div style={{display:"flex",gap:4,marginBottom:14,borderBottom:`2px solid ${IVORY_DARK}`}}>
      {[["inbox",`Inbox (${inbox.length})`],["sent",`Sent (${sent.length})`]].map(([v,l])=><button key={v} onClick={()=>setTab(v)} style={{padding:"7px 14px",background:"none",border:"none",cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:tab===v?700:400,fontSize:13,color:tab===v?NAVY:GRAY,borderBottom:tab===v?`2px solid ${NAVY}`:"2px solid transparent",marginBottom:-2}}>{l}</button>)}
    </div>
    {shown.length===0?<div style={{textAlign:"center",padding:40,color:GRAY,fontFamily:"Inter,sans-serif"}}>No messages.</div>:
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {shown.map(msg=>{
        const fu=users.find(u=>u.id===msg.fromUserId);const tu=users.find(u=>u.id===msg.toUserId);
        const isIn=msg.toUserId===currentUser.id;const unr=isIn&&!msg.isRead;
        return<div key={msg.id} onClick={()=>isIn&&setCautions(p=>p.map(c=>c.id===msg.id?{...c,isRead:true}:c))} style={{background:unr?"rgba(15,32,87,0.04)":WHITE,border:`1px solid ${unr?NAVY:IVORY_DARK}`,borderLeft:`3px solid ${unr?NAVY:IVORY_DARK}`,borderRadius:10,padding:"14px 18px",cursor:isIn&&unr?"pointer":"default"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {unr&&<span style={{width:8,height:8,borderRadius:4,background:NAVY,display:"inline-block",flexShrink:0}}/>}
              <div style={{width:30,height:30,borderRadius:15,background:NAVY,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:WHITE,fontWeight:700,fontSize:11}}>{(isIn?fu?.name:tu?.name||"?")[0]}</span></div>
              <div><div style={{fontFamily:"Inter,sans-serif",fontSize:13,fontWeight:600,color:NAVY}}>{isIn?`From: ${fu?.name||"Unknown"}`:`To: ${tu?.name||"Unknown"}`}</div>
              <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:GRAY}}>{isIn?fu?.role?.replace(/_/g," "):tu?.role?.replace(/_/g," ")}</div></div>
            </div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:GRAY}}>{msg.createdAt.slice(0,10)}</div>{unr&&<span style={{fontSize:10,color:NAVY,fontWeight:700}}>Tap to read</span>}</div>
          </div>
          <p style={{margin:0,fontFamily:"Inter,sans-serif",fontSize:13,color:NAVY,lineHeight:1.65,paddingLeft:38}}>{msg.messageBody}</p>
        </div>;
      })}
    </div>}
    {compose&&<Modal title="Compose Message / Caution" onClose={()=>setCompose(false)}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Sl label="Send To" value={form.toUserId} onChange={v=>set("toUserId",v)} required options={recips.map(u=>({value:u.id,label:`${u.name} (${u.role?.replace(/_/g," ")})`}))}/>
        <Ta label="Message" value={form.messageBody} onChange={v=>set("messageBody",v)} rows={5} placeholder="Write your message here..."/>
        <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn outline onClick={()=>setCompose(false)}>Cancel</Btn><Btn onClick={send}><IC n="mail" s={14} c={WHITE}/> Send Message</Btn></div>
      </div>
    </Modal>}
  </div>;
}

// ── ADMIN TOOLS ───────────────────────────────────────────────────
function AdminTools({state}){
  const{reportingOpen,setReportingOpen,reports,cells,sections,regions,members,users,showToast,setCells}=state;
  const[tab,setTab]=useState("overview");const[csv,setCsv]=useState("");const[impRes,setImpRes]=useState(null);
  const expCSV=(data,fn)=>{if(!data.length)return;const h=Object.keys(data[0]).join(",");const r=data.map(d=>Object.values(d).map(v=>JSON.stringify(String(v))).join(","));const b=new Blob([[h,...r].join("\n")],{type:"text/csv"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=fn;a.click();URL.revokeObjectURL(u);showToast(`${fn} exported.`);};
  const expJSON=(data,fn)=>{const b=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=fn;a.click();URL.revokeObjectURL(u);showToast(`${fn} exported.`);};
  const importCells=()=>{
    try{const rows=csv.trim().split("\n").slice(1);let added=0,errs=[];
    rows.forEach((row,i)=>{const cols=row.split(",").map(c=>c.trim().replace(/^"|"$/g,""));const[rn,sn,cn,loc]=cols;if(!cn){errs.push(`Row ${i+2}: Cell name missing`);return;}const reg=regions.find(r=>r.name.toLowerCase().includes((rn||"").toLowerCase().replace(" region","")));const sec=sections.find(s=>s.name.toLowerCase().includes((sn||"").toLowerCase())&&(!reg||s.regionId===reg?.id));if(!sec){errs.push(`Row ${i+2}: Section "${sn}" not found`);return;}setCells(p=>[...p,{id:genId(),name:cn,sectionId:sec.id,regionId:sec.regionId,location:loc||""}]);added++;});
    setImpRes({added,errs});if(added>0)showToast(`${added} cell${added>1?"s":""} imported.`);}catch{showToast("Import failed. Check CSV format.","error");}
  };
  const tw=reports.filter(r=>r.reportDate===LAST_SAT);
  const twR=new Set(tw.map(r=>r.cellId)).size,twM=tw.filter(r=>r.meetingHeld).length;
  return<div style={{padding:24}}>
    <SH>Admin Tools</SH>
    <div style={{display:"flex",gap:4,marginBottom:18,borderBottom:`2px solid ${IVORY_DARK}`}}>
      {[["overview","Overview"],["reporting","Reporting Window"],["export","Data Export"],["import","Bulk Import"]].map(([v,l])=><button key={v} onClick={()=>setTab(v)} style={{padding:"7px 14px",background:"none",border:"none",cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:tab===v?700:400,fontSize:13,color:tab===v?NAVY:GRAY,borderBottom:tab===v?`2px solid ${NAVY}`:"2px solid transparent",marginBottom:-2}}>{l}</button>)}
    </div>

    {tab==="overview"&&<>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {[["Regions",regions.length],["Sections",sections.length],["Cells",cells.length],["Users",users.length],["Reports",reports.length],["Members",members.length]].map(([k,v])=><div key={k} style={{background:WHITE,borderRadius:10,padding:"16px",border:`1px solid ${IVORY_DARK}`,textAlign:"center"}}><div style={{fontFamily:"Montserrat,sans-serif",fontWeight:800,fontSize:28,color:NAVY}}>{v}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY}}>{k}</div></div>)}
      </div>
      <div style={{background:WHITE,borderRadius:12,padding:"18px 22px",border:`1px solid ${IVORY_DARK}`}}>
        <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:14,color:NAVY,marginBottom:12}}>This Week ({LAST_SAT})</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{background:IVORY,borderRadius:8,padding:"12px 16px"}}><div style={{fontSize:11,color:GRAY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Cells Reported</div><div style={{fontFamily:"Montserrat,sans-serif",fontSize:24,fontWeight:800,color:NAVY,marginBottom:6}}>{twR} / {cells.length}</div><Pbar value={twR} max={cells.length} color={NAVY}/></div>
          <div style={{background:IVORY,borderRadius:8,padding:"12px 16px"}}><div style={{fontSize:11,color:GRAY,fontFamily:"Inter,sans-serif",textTransform:"uppercase",letterSpacing:0.5,marginBottom:4}}>Cells That Met</div><div style={{fontFamily:"Montserrat,sans-serif",fontSize:24,fontWeight:800,color:GREEN,marginBottom:6}}>{twM}</div><Pbar value={twM} max={twR||1} color={GREEN}/></div>
        </div>
      </div>
    </>}

    {tab==="reporting"&&<div style={{maxWidth:560}}>
      <div style={{background:WHITE,borderRadius:12,padding:"20px 22px",border:`1px solid ${IVORY_DARK}`}}>
        <div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:14,color:NAVY,marginBottom:6}}>Reporting Window Control</div>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:13,color:GRAY,marginBottom:14}}>Open Saturday morning. Close Monday midnight. Cell leaders cannot submit when closed.</div>
        <div style={{background:reportingOpen?GREEN_LIGHT:RED_LIGHT,borderRadius:10,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:12,height:12,borderRadius:6,background:reportingOpen?GREEN:RED,flexShrink:0}}/>
          <div><div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:14,color:reportingOpen?GREEN:RED}}>{reportingOpen?"REPORTING IS OPEN":"REPORTING IS CLOSED"}</div>
          <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY}}>{reportingOpen?"Cell leaders can submit their weekly reports.":"All submissions are blocked."}</div></div>
        </div>
        <Tog label={reportingOpen?"Click to CLOSE the reporting window":"Click to OPEN the reporting window"} checked={reportingOpen} onChange={v=>{setReportingOpen(v);showToast(v?"Reporting window opened.":"Reporting window closed.");}}/>
      </div>
    </div>}

    {tab==="export"&&<div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:600}}>
      <Alert type="info">Export data for backup, migration, or leadership review. CSV files open in Excel and Google Sheets.</Alert>
      {[
        {label:"All Reports (CSV)",sub:`${reports.length} weekly reports across all cells`,fn:()=>expCSV(reports.map(r=>({Date:r.reportDate,Cell:cells.find(c=>c.id===r.cellId)?.name||r.cellId,Region:regions.find(rg=>rg.id===cells.find(c=>c.id===r.cellId)?.regionId)?.name||"",Section:sections.find(s=>s.id===cells.find(c=>c.id===r.cellId)?.sectionId)?.name||"",Met:r.meetingHeld?"Yes":"No",WhoLed:r.whoLed,Adults:r.adultsCount,Children:r.childrenCount,TotalAttendance:r.attendanceTotal,Offering:r.offeringAmount,SoulsWon:r.soulsWon,OutreachHeld:r.outreachHeld?"Yes":"No",OutreachParticipants:r.outreachParticipants,OutreachDuration:r.outreachDuration,APVisit:r.apVisit?"Yes":"No",Testimony:r.testimony||"",NoMeetingReason:r.noMeetingReason||"",Comments:r.comments||"",PhotoUrl:r.photoUrl||""})),"PCI_Reports_All.csv")},
        {label:"All 191 Cells Directory (CSV)",sub:"Complete cell listing with sections and regions",fn:()=>expCSV(cells.map(c=>({CellName:c.name,Section:sections.find(s=>s.id===c.sectionId)?.name||"",Region:regions.find(r=>r.id===c.regionId)?.name||"",Location:c.location||""})),"PCI_Cells_Directory.csv")},
        {label:"All Members (CSV)",sub:`${members.length} registered members with phone numbers`,fn:()=>expCSV(members.map(m=>({Name:m.name,Phone:m.phone,Cell:cells.find(c=>c.id===m.cellId)?.name||"",Active:m.isActive?"Yes":"No",JoinDate:m.joinDate,Notes:m.notes||""})),"PCI_Members.csv")},
        {label:"Offering Summary (CSV)",sub:"Offering per cell per date — for financial review",fn:()=>expCSV(reports.filter(r=>r.meetingHeld).map(r=>({Date:r.reportDate,Cell:cells.find(c=>c.id===r.cellId)?.name||r.cellId,Region:regions.find(rg=>rg.id===cells.find(c=>c.id===r.cellId)?.regionId)?.name||"",Offering:r.offeringAmount})),"PCI_Offering_Summary.csv")},
        {label:"Full System Backup (JSON)",sub:"Complete snapshot for migration to Supabase or another system",fn:()=>expJSON({regions,sections,cells,users:users.map(u=>({...u,password:"[REDACTED]"})),members,reports,exportDate:new Date().toISOString()},"PCI_Full_Backup.json")},
      ].map(({label,sub,fn})=><div key={label} style={{background:WHITE,borderRadius:10,padding:"12px 16px",border:`1px solid ${IVORY_DARK}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div><div style={{fontFamily:"Inter,sans-serif",fontWeight:600,fontSize:14,color:NAVY}}>{label}</div><div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY}}>{sub}</div></div>
        <Btn small onClick={fn}><IC n="download" s={13} c={WHITE}/> Export</Btn>
      </div>)}
    </div>}

    {tab==="import"&&<div style={{maxWidth:600}}>
      <Alert type="info"><strong>Bulk Cell Import via CSV</strong><br/>Required columns: <code style={{background:"rgba(0,0,0,0.07)",padding:"1px 5px",borderRadius:3,fontFamily:"monospace"}}>region_name, section_name, cell_name, location</code><br/>First row is treated as a header and skipped.</Alert>
      <div style={{background:WHITE,borderRadius:10,padding:"14px",border:`1px solid ${IVORY_DARK}`,marginBottom:12}}>
        <div style={{fontFamily:"Inter,sans-serif",fontSize:12,color:GRAY,marginBottom:6}}>Example format:</div>
        <pre style={{fontFamily:"monospace",fontSize:12,color:NAVY,background:IVORY,padding:"10px",borderRadius:6,overflow:"auto",margin:0}}>{`region_name,section_name,cell_name,location\nCANAAN REGION,PS FRANCA ABANI Area,CANAAN EAST LEGON NEW LFU,East Legon Accra\nBETHEL REGION,BRO GEORGE AGBAVOR Area,BETHEL KORLE BU LFU,Korle Bu Accra`}</pre>
      </div>
      <Ta label="Paste CSV data here" value={csv} onChange={setCsv} rows={8} placeholder="Paste your CSV content here..."/>
      <div style={{marginTop:12,display:"flex",gap:10}}><Btn onClick={importCells} disabled={!csv.trim()}><IC n="upload" s={14} c={WHITE}/> Import Cells</Btn><Btn outline onClick={()=>{setCsv("");setImpRes(null);}}>Clear</Btn></div>
      {impRes&&<div style={{marginTop:12}}><Alert type={impRes.errs.length===0?"success":"warning"}><strong>Import complete:</strong> {impRes.added} cell{impRes.added!==1?"s":""} added.{impRes.errs.length>0&&<ul style={{margin:"6px 0 0",paddingLeft:18}}>{impRes.errs.map((e,i)=><li key={i} style={{fontSize:12}}>{e}</li>)}</ul>}</Alert></div>}
    </div>}
  </div>;
}

// ── APP ROOT ──────────────────────────────────────────────────────
export default function App(){
  const state=useAppState();
  const{currentUser,page,setPage,cautions,toast,login,logout,reportingOpen}=state;
  const unread=cautions.filter(c=>c.toUserId===currentUser?.id&&!c.isRead).length;

  if(!currentUser)return<>
    <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Inter,sans-serif;background:${IVORY};}`}</style>
    <LoginPage onLogin={login}/><Toast toast={toast}/>
  </>;

  const pages={
    dashboard:<Dashboard state={state}/>,report:<ReportForm state={state}/>,
    members:<MembersPage state={state}/>,consistency:<ConsistencyPage state={state}/>,
    reports_list:<ReportsList state={state}/>,structure:<StructurePage state={state}/>,
    user_mgmt:<UserMgmt state={state}/>,cautions:<CautionsPage state={state}/>,
    admin:<AdminTools state={state}/>,
  };

  return<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:Inter,sans-serif;background:${IVORY};}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      ::-webkit-scrollbar{width:5px;height:5px}
      ::-webkit-scrollbar-thumb{background:${IVORY_DARK};border-radius:3px}
      input:focus,select:focus,textarea:focus{border-color:${NAVY}!important;box-shadow:0 0 0 3px rgba(15,32,87,0.1)!important;outline:none}
      button:hover:not(:disabled){opacity:0.86}
      button:active:not(:disabled){transform:scale(0.98)}
    `}</style>
    <div style={{display:"flex",minHeight:"100vh"}}>
      <Sidebar currentUser={currentUser} page={page} setPage={setPage} logout={logout} unread={unread} reportingOpen={reportingOpen}/>
      <div style={{flex:1,overflow:"auto",background:IVORY}}>
        <div key={page} style={{animation:"fadeUp 0.22s ease"}}>
          {pages[page]||pages.dashboard}
        </div>
      </div>
    </div>
    <Toast toast={toast}/>
  </>;
}
