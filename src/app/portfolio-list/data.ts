export interface Version {
  id: string;
  name: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  creator: string;
  lastModified: string;
  tags: Record<string, string>;
  versions: Version[];
}

export interface Dimension {
  id: string;
  name: string;
  type: "text" | "dropdown";
  options: string[];
  color: string;
}

export const DIMENSION_COLORS = [
  "bg-blue-100 text-blue-800",
  "bg-purple-100 text-purple-800",
  "bg-green-100 text-green-800",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-800",
  "bg-teal-100 text-teal-800",
  "bg-indigo-100 text-indigo-800",
  "bg-orange-100 text-orange-800",
];

export const INITIAL_DIMENSIONS: Dimension[] = [
  {
    id: "stage",
    name: "Stage",
    type: "dropdown",
    options: ["Discovery", "Pilot", "Scaling", "Mature"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "department",
    name: "Department",
    type: "text",
    options: [],
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "region",
    name: "Region",
    type: "text",
    options: [],
    color: "bg-green-100 text-green-800",
  },
  {
    id: "priority",
    name: "Priority",
    type: "dropdown",
    options: ["High", "Medium", "Low"],
    color: "bg-amber-100 text-amber-800",
  },
];

export interface DataSet {
  label: string;
  projects: Project[];
  dimensions: Dimension[];
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Desert Canyon Logistics Platform",
    description: "Real-time fleet tracking for deliveries across arid terrain routes",
    creator: "Wile E. Coyote",
    lastModified: "2026-02-28",
    tags: { stage: "Pilot", department: "Logistics", region: "Southwest", priority: "High" },
    versions: [
      { id: "s1a", name: "Initial concept", date: "2026-01-10" },
      { id: "s1b", name: "After stakeholder review", date: "2026-02-01" },
      { id: "s1c", name: "Pilot-ready draft", date: "2026-02-28" },
    ],
  },
  {
    id: "2",
    name: "Rocket Sled Efficiency Analyzer",
    description: "ML model to optimize rocket sled fuel consumption and route timing",
    creator: "Road Runner",
    lastModified: "2026-03-01",
    tags: { stage: "Discovery", department: "R&D", priority: "Medium" },
    versions: [
      { id: "s2a", name: "v1 draft", date: "2026-02-15" },
      { id: "s2b", name: "Updated metrics", date: "2026-03-01" },
    ],
  },
  {
    id: "3",
    name: "Anvil Drop Safety Certification",
    description: "Automated compliance checker for industrial equipment safety standards",
    creator: "Foghorn Leghorn",
    lastModified: "2026-02-20",
    tags: { stage: "Scaling", department: "Compliance", region: "Northeast", priority: "High" },
    versions: [
      { id: "s3a", name: "Compliance framework v1", date: "2026-01-05" },
      { id: "s3b", name: "Audit-ready version", date: "2026-02-10" },
      { id: "s3c", name: "Post-audit revisions", date: "2026-02-20" },
    ],
  },
  {
    id: "4",
    name: "Tunnel Paint Illusion Generator",
    description: "AR tool for visualizing proposed infrastructure before construction begins",
    creator: "Wile E. Coyote",
    lastModified: "2026-03-02",
    tags: { stage: "Discovery", department: "Engineering", region: "Southwest" },
    versions: [
      { id: "s4a", name: "Proof of concept", date: "2026-03-02" },
    ],
  },
  {
    id: "5",
    name: "Birdseed Supply Chain Dashboard",
    description: "End-to-end visibility into raw materials procurement and distribution",
    creator: "Tweety Bird",
    lastModified: "2026-02-25",
    tags: { stage: "Pilot", department: "Supply Chain", region: "Midwest", priority: "Medium" },
    versions: [
      { id: "s5a", name: "Wireframes", date: "2026-01-20" },
      { id: "s5b", name: "Beta dashboard", date: "2026-02-25" },
    ],
  },
  {
    id: "6",
    name: "Cactus Farm Yield Predictor",
    description: "Satellite imagery analysis for predicting crop yields in desert agriculture",
    creator: "Yosemite Sam",
    lastModified: "2026-02-18",
    tags: { stage: "Scaling", department: "Agriculture", region: "Southwest", priority: "Low" },
    versions: [
      { id: "s6a", name: "Model v1", date: "2026-01-15" },
      { id: "s6b", name: "Accuracy improvements", date: "2026-02-05" },
      { id: "s6c", name: "Production deploy", date: "2026-02-18" },
    ],
  },
  {
    id: "7",
    name: "Roadside Cliff Alert Network",
    description: "IoT sensor network for detecting unstable cliff edges along highways",
    creator: "Road Runner",
    lastModified: "2026-03-03",
    tags: { stage: "Discovery", department: "Safety", priority: "High" },
    versions: [
      { id: "s7a", name: "Sensor spec draft", date: "2026-03-03" },
    ],
  },
  {
    id: "8",
    name: "ACME Product Recall Tracker",
    description: "Customer notification system for managing product recalls and replacements",
    creator: "Daffy Duck",
    lastModified: "2026-02-22",
    tags: { stage: "Pilot", department: "Customer Service", region: "Northeast" },
    versions: [
      { id: "s8a", name: "Initial design", date: "2026-02-01" },
      { id: "s8b", name: "Customer feedback round", date: "2026-02-22" },
    ],
  },
];

// --- Energy / Thailand dataset ---

const ENERGY_DIMENSIONS: Dimension[] = [
  {
    id: "sector",
    name: "Sector",
    type: "dropdown",
    options: ["Renewable", "LNG", "EV", "Biomethane", "Agriculture", "Healthcare", "Automotive", "AI"],
    color: "bg-green-100 text-green-800",
  },
  {
    id: "country",
    name: "Country",
    type: "dropdown",
    options: ["Thailand", "Malaysia", "Indonesia", "Japan"],
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "status",
    name: "Status",
    type: "dropdown",
    options: ["Active", "Planning", "Testing", "Operational"],
    color: "bg-amber-100 text-amber-800",
  },
];

const ENERGY_PROJECTS: Project[] = [
  {
    id: "e1",
    name: "Renewable Project for bidding under new PDP scheme in Thailand (new PDP 2024)",
    description: "To evaluate winning strategy, the process of RE bidding and how to achieve and assessment of the revenue, profile and LCOE or tariff in order to win t...",
    creator: "RE Strategy Team",
    lastModified: "2026-02-20",
    tags: { sector: "Renewable", country: "Thailand", status: "Planning" },
    versions: [{ id: "ve1a", name: "Initial analysis", date: "2026-02-20" }],
  },
  {
    id: "e2",
    name: "EV Charging Station Business in Thailand",
    description: "To formulate the business model of EV Charging Station Business in Thailand and leverage advantage of EGAT Diamond DC charger manufacturing ca...",
    creator: "EV Business Unit",
    lastModified: "2026-02-18",
    tags: { sector: "EV", country: "Thailand", status: "Active" },
    versions: [{ id: "ve2a", name: "Business model v1", date: "2026-01-15" }, { id: "ve2b", name: "Market update", date: "2026-02-18" }],
  },
  {
    id: "e3",
    name: "Renewable energy to Malaysia LNG",
    description: "Cross-border renewable energy supply chain analysis",
    creator: "Chikahiro Hosaka",
    lastModified: "2026-02-10",
    tags: { sector: "LNG", country: "Malaysia", status: "Planning" },
    versions: [{ id: "ve3a", name: "Draft proposal", date: "2026-02-10" }],
  },
  {
    id: "e4",
    name: "(MC Indonesia) Natural Gas to DC",
    description: "Exporting LNG from Indonesia is becoming an uncertain business model due to increasing national energy security, in the form of DMO. MC has 2 LN...",
    creator: "MC Indonesia",
    lastModified: "2026-01-28",
    tags: { sector: "LNG", country: "Indonesia", status: "Active" },
    versions: [{ id: "ve4a", name: "Feasibility study", date: "2026-01-28" }],
  },
  {
    id: "e5",
    name: "LNG to Power to Data Center",
    description: "Integrated LNG-to-power pipeline for data center operations",
    creator: "Infrastructure Team",
    lastModified: "2026-02-05",
    tags: { sector: "LNG", country: "Thailand", status: "Planning" },
    versions: [{ id: "ve5a", name: "Concept", date: "2026-02-05" }],
  },
  {
    id: "e6",
    name: "EGCO株保有方針",
    description: "Sample case in operational phase",
    creator: "EGCO Team",
    lastModified: "2026-01-20",
    tags: { sector: "Renewable", country: "Thailand", status: "Operational" },
    versions: [{ id: "ve6a", name: "Operational review", date: "2026-01-20" }],
  },
  {
    id: "e7",
    name: "Biomethane Project in Southern of Thailand (DeepTest)",
    description: "Deep testing phase for biomethane production facility",
    creator: "E-Group BD",
    lastModified: "2026-02-15",
    tags: { sector: "Biomethane", country: "Thailand", status: "Testing" },
    versions: [{ id: "ve7a", name: "Test phase 1", date: "2026-01-25" }, { id: "ve7b", name: "Deep test results", date: "2026-02-15" }],
  },
  {
    id: "e8",
    name: "Biomethane Project in Southern of Thailand (Test1)",
    description: "Initial test for biomethane production viability",
    creator: "E-Group BD Team",
    lastModified: "2026-02-12",
    tags: { sector: "Biomethane", country: "Thailand", status: "Testing" },
    versions: [{ id: "ve8a", name: "Test1 results", date: "2026-02-12" }],
  },
  {
    id: "e9",
    name: "TNC-Pongamia in Thailand",
    description: "Pongamia-based biofuel crop evaluation",
    creator: "THI Pongamia team",
    lastModified: "2026-02-08",
    tags: { sector: "Agriculture", country: "Thailand", status: "Active" },
    versions: [{ id: "ve9a", name: "Field trial v1", date: "2026-02-08" }],
  },
  {
    id: "e10",
    name: "PTTOR 25% investment",
    description: "Investment analysis for 25% stake acquisition",
    creator: "THI-AP",
    lastModified: "2026-01-30",
    tags: { sector: "Renewable", country: "Thailand", status: "Planning" },
    versions: [{ id: "ve10a", name: "Investment memo", date: "2026-01-30" }],
  },
  {
    id: "e11",
    name: "タイのヘルスケア事業展開",
    description: "Fullerton Healthによる買収候補",
    creator: "Healthcare BD",
    lastModified: "2026-02-25",
    tags: { sector: "Healthcare", country: "Thailand", status: "Planning" },
    versions: [{ id: "ve11a", name: "Due diligence", date: "2026-02-25" }],
  },
  {
    id: "e12",
    name: "Pongamia in Thailand",
    description: "Expanded pongamia plantation feasibility",
    creator: "THI Pongamia team",
    lastModified: "2026-02-01",
    tags: { sector: "Agriculture", country: "Thailand", status: "Active" },
    versions: [{ id: "ve12a", name: "Expansion plan", date: "2026-02-01" }],
  },
  {
    id: "e13",
    name: "MC Thailand UCE",
    description: "Used Cars Ecosystem for Isuzu",
    creator: "Automotive Division",
    lastModified: "2026-01-22",
    tags: { sector: "Automotive", country: "Thailand", status: "Active" },
    versions: [{ id: "ve13a", name: "Market analysis", date: "2026-01-22" }],
  },
  {
    id: "e14",
    name: "MUI",
    description: "AI Nose (MUI) Project",
    creator: "AI Research",
    lastModified: "2026-02-28",
    tags: { sector: "AI", country: "Thailand", status: "Testing" },
    versions: [{ id: "ve14a", name: "Prototype v1", date: "2026-02-28" }],
  },
];

// --- Japanese dataset ---

const JP_DIMENSIONS: Dimension[] = [
  {
    id: "category",
    name: "カテゴリー",
    type: "dropdown",
    options: ["エネルギー", "物流", "素材", "ヘルスケア", "不動産", "農業", "防衛", "リサイクル", "IT"],
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "phase",
    name: "フェーズ",
    type: "dropdown",
    options: ["構想", "検証", "実行", "運用"],
    color: "bg-rose-100 text-rose-800",
  },
  {
    id: "division",
    name: "事業部",
    type: "text",
    options: [],
    color: "bg-teal-100 text-teal-800",
  },
];

const JP_PROJECTS: Project[] = [
  {
    id: "j1",
    name: "御手洗_Aging Fit（エイジング・フィット）",
    description: "Aging Fitは、施工会社でも職人紹介・マッチングでもなく、小規模意匠における\"意匠判断\"を引き受け、合意を構造化するモデルである。 相談先・判断基準...",
    creator: "御手洗チーム",
    lastModified: "2026-02-28",
    tags: { category: "不動産", phase: "検証", division: "建築事業部" },
    versions: [{ id: "vj1a", name: "コンセプト", date: "2026-01-15" }, { id: "vj1b", name: "検証版", date: "2026-02-28" }],
  },
  {
    id: "j2",
    name: "五十嵐_RIC改",
    description: "地域インフラ管理プロジェクトの改良版",
    creator: "五十嵐",
    lastModified: "2026-02-20",
    tags: { category: "IT", phase: "構想", division: "デジタル事業部" },
    versions: [{ id: "vj2a", name: "初期案", date: "2026-02-20" }],
  },
  {
    id: "j3",
    name: "寺田_化学物質産廃プラットフォーム",
    description: "各社が製造工程で発生する化学物質廃棄物の情報プラットフォームを作成し、ニーズに合わせて会員に提供する事で、廃棄物排出側は廃棄コストの低減、購...",
    creator: "寺田",
    lastModified: "2026-02-15",
    tags: { category: "素材", phase: "検証", division: "化成品事業部" },
    versions: [{ id: "vj3a", name: "プラットフォーム設計", date: "2026-02-15" }],
  },
  {
    id: "j4",
    name: "御手洗_水門・陸閘管理システムプラットフォーム",
    description: "水門および陸閘の管理を効率化するシステム基盤",
    creator: "御手洗チーム",
    lastModified: "2026-02-10",
    tags: { category: "IT", phase: "構想", division: "インフラ事業部" },
    versions: [{ id: "vj4a", name: "要件定義", date: "2026-02-10" }],
  },
  {
    id: "j5",
    name: "五十嵐_土砂発電",
    description: "雨畑ダム内の土砂を位置エネルギーを利用し発電。",
    creator: "五十嵐",
    lastModified: "2026-02-22",
    tags: { category: "エネルギー", phase: "構想", division: "エネルギー事業部" },
    versions: [{ id: "vj5a", name: "技術調査", date: "2026-02-22" }],
  },
  {
    id: "j6",
    name: "五十嵐_三層電解グレーターワン",
    description: "日軽金HD所有水力発電所の設備稼働率向上と、三層電解法によるリサイクルアルミの品質向上。",
    creator: "五十嵐",
    lastModified: "2026-02-18",
    tags: { category: "素材", phase: "検証", division: "軽金属事業部" },
    versions: [{ id: "vj6a", name: "実験結果v1", date: "2026-01-30" }, { id: "vj6b", name: "品質評価", date: "2026-02-18" }],
  },
  {
    id: "j7",
    name: "五十嵐_蒲原ワット・ビット",
    description: "日軽金の蒲原製造所内で、水力発電所の近くにDCを作る",
    creator: "五十嵐",
    lastModified: "2026-02-05",
    tags: { category: "エネルギー", phase: "構想", division: "軽金属事業部" },
    versions: [{ id: "vj7a", name: "立地調査", date: "2026-02-05" }],
  },
  {
    id: "j8",
    name: "Copy of 物流の最適をすべての現場に。",
    description: "日本フルハーフとして\"特殊仕様まで判別できる車両要件データ\"を強みに、精密マッチング事業 もしくは トラックレンタル / サブスク事業（以下レンタル事...",
    creator: "物流チーム",
    lastModified: "2026-02-25",
    tags: { category: "物流", phase: "検証", division: "輸送事業部" },
    versions: [{ id: "vj8a", name: "事業計画書", date: "2026-02-25" }],
  },
  {
    id: "j9",
    name: "Aging意匠市場設計プロジェクト",
    description: "Aging（エイジング）を「機能空間の価値を深める一品一葉の意匠技術」と再定義し、供給制約型の市場モデルとして制度設計するプロジェクト。 発注者...",
    creator: "意匠設計チーム",
    lastModified: "2026-03-01",
    tags: { category: "不動産", phase: "実行", division: "建築事業部" },
    versions: [{ id: "vj9a", name: "市場分析", date: "2026-02-01" }, { id: "vj9b", name: "制度設計案", date: "2026-03-01" }],
  },
  {
    id: "j10",
    name: "増山プロジェクト",
    description: "常温倉庫を低温倉庫に一変（自動ラック低温倉庫コンバージョンビジネス）",
    creator: "増山",
    lastModified: "2026-02-12",
    tags: { category: "物流", phase: "構想", division: "物流事業部" },
    versions: [{ id: "vj10a", name: "コンセプト", date: "2026-02-12" }],
  },
  {
    id: "j11",
    name: "物流の最適をすべての現場に。",
    description: "日本フルハーフとして\"特殊仕様まで判別できる車両要件データ\"を強みに、精密マッチング事業 もしくは トラックレンタル / サブスク事業（以下レンタル事...",
    creator: "物流チーム",
    lastModified: "2026-02-20",
    tags: { category: "物流", phase: "実行", division: "輸送事業部" },
    versions: [{ id: "vj11a", name: "MVP", date: "2026-01-20" }, { id: "vj11b", name: "運用開始版", date: "2026-02-20" }],
  },
  {
    id: "j12",
    name: "マイクロデータセンター",
    description: "日軽金HDのアセットを詰め込んだコンテナ型データセンターの販売",
    creator: "DC推進チーム",
    lastModified: "2026-02-08",
    tags: { category: "IT", phase: "検証", division: "軽金属事業部" },
    versions: [{ id: "vj12a", name: "プロトタイプ", date: "2026-02-08" }],
  },
  {
    id: "j13",
    name: "熱中症対策ソリューション",
    description: "作業現場における熱中症リスク管理システム",
    creator: "安全管理チーム",
    lastModified: "2026-01-28",
    tags: { category: "ヘルスケア", phase: "構想", division: "安全事業部" },
    versions: [{ id: "vj13a", name: "要件整理", date: "2026-01-28" }],
  },
  {
    id: "j14",
    name: "ギャル式プレスト",
    description: "ギャルマインドで世の中をアゲ↑ていく",
    creator: "プレストチーム",
    lastModified: "2026-03-02",
    tags: { category: "IT", phase: "実行", division: "新規事業部" },
    versions: [{ id: "vj14a", name: "ローンチ版", date: "2026-03-02" }],
  },
  {
    id: "j15",
    name: "（テスト用）スポーツジム空き時間活用ビジネス",
    description: "ジムの空き時間を活用した新規ビジネスモデル検証",
    creator: "テストチーム",
    lastModified: "2026-01-25",
    tags: { category: "ヘルスケア", phase: "検証", division: "新規事業部" },
    versions: [{ id: "vj15a", name: "テスト計画", date: "2026-01-25" }],
  },
  {
    id: "j16",
    name: "防衛・高信頼電子機器向けアルミナ設計供給型ビジネス",
    description: "日本軽金属グループ（化成品事業部）が保有する高純度アルミナ / 水酸化アルミニウム技術を基盤に、三菱重工の防衛電子機器（レーダー・通信・電源）向...",
    creator: "化成品事業部",
    lastModified: "2026-02-28",
    tags: { category: "防衛", phase: "実行", division: "化成品事業部" },
    versions: [{ id: "vj16a", name: "供給計画", date: "2026-02-28" }],
  },
  {
    id: "j17",
    name: "下水汚泥焼却灰からのリン資源回収ビジネス",
    description: "下水道処理の際に発生する汚泥焼却灰からリン資源を回収する",
    creator: "環境事業チーム",
    lastModified: "2026-02-14",
    tags: { category: "リサイクル", phase: "検証", division: "環境事業部" },
    versions: [{ id: "vj17a", name: "技術検証", date: "2026-02-14" }],
  },
  {
    id: "j18",
    name: "地下鉄を活用した都心小口配送効率化モデル",
    description: "都心の地下鉄の始発・日中時間帯における余剰輸送力を活用し、コンビニや飲食店、オフィス向けの小口配送を行う都市型の新しい物流スキームと検討して...",
    creator: "都市物流チーム",
    lastModified: "2026-02-22",
    tags: { category: "物流", phase: "構想", division: "輸送事業部" },
    versions: [{ id: "vj18a", name: "スキーム設計", date: "2026-02-22" }],
  },
  {
    id: "j19",
    name: "都心の静寂空間",
    description: "都心の駅・オフィス・商業施設などに設置する、「働くため」ではなく「ととのえるため」の完全個室型リトリートブースの新規事業構想。 本構想は、既...",
    creator: "不動産事業チーム",
    lastModified: "2026-03-01",
    tags: { category: "不動産", phase: "構想", division: "不動産事業部" },
    versions: [{ id: "vj19a", name: "事業構想書", date: "2026-03-01" }],
  },
  {
    id: "j20",
    name: "加工工場併設型大型陸上養殖の設備システム",
    description: "陸上養殖業界が今後の成長作業となる中で、日本軽金属グループはARKという陸上養殖のスタートアップと協業し小型の陸上養殖設備の販売をおこなってい...",
    creator: "養殖事業チーム",
    lastModified: "2026-02-18",
    tags: { category: "農業", phase: "実行", division: "食品事業部" },
    versions: [{ id: "vj20a", name: "設備設計", date: "2026-01-20" }, { id: "vj20b", name: "試運転報告", date: "2026-02-18" }],
  },
  {
    id: "j21",
    name: "養蚕ビジネス",
    description: "日本の伝統産業である「養蚕（カイコ）」を起点に、飼育・副産物・素材・装置・教育・建築・地域を横断して再編集する、 循環型・共創型の新規事業モ...",
    creator: "新規事業部",
    lastModified: "2026-02-10",
    tags: { category: "農業", phase: "構想", division: "新規事業部" },
    versions: [{ id: "vj21a", name: "事業モデル案", date: "2026-02-10" }],
  },
  {
    id: "j22",
    name: "スポーツイベントにおけるアルミカップのリサイクル",
    description: "人が集まるが、笑顔が広がる、ごみがうまれないビジョンを掲げて、スポーツイベントにおいてリサイクル性の高いアルミニウム製カップを導入し、紙製や...",
    creator: "リサイクル推進チーム",
    lastModified: "2026-02-26",
    tags: { category: "リサイクル", phase: "実行", division: "軽金属事業部" },
    versions: [{ id: "vj22a", name: "パイロット結果", date: "2026-02-26" }],
  },
  {
    id: "j23",
    name: "Trust Chain",
    description: "ブロックチェーン活用の信頼性チェーン構築",
    creator: "IT推進チーム",
    lastModified: "2026-01-18",
    tags: { category: "IT", phase: "構想", division: "デジタル事業部" },
    versions: [{ id: "vj23a", name: "PoC計画", date: "2026-01-18" }],
  },
  {
    id: "j24",
    name: "（旧）エイジング技術プラットフォーム",
    description: "建築・内装・景観分野における部分的な復元・局所修復を支援する、エイジング技術に特化した知識・判断支援プラットフォーム。 経年劣化や部分交換によ...",
    creator: "建築技術チーム",
    lastModified: "2026-02-05",
    tags: { category: "不動産", phase: "運用", division: "建築事業部" },
    versions: [{ id: "vj24a", name: "旧版アーカイブ", date: "2026-02-05" }],
  },
  {
    id: "j25",
    name: "化学物質産廃プラットフォーム",
    description: "各社が製造工程で発生する化学物質廃棄物のプラットフォームを作成し、共有する事で、使用可能な物質についてはより安価にカーボンクレジットが低い原...",
    creator: "化成品事業部",
    lastModified: "2026-02-16",
    tags: { category: "素材", phase: "検証", division: "化成品事業部" },
    versions: [{ id: "vj25a", name: "共有基盤設計", date: "2026-02-16" }],
  },
  {
    id: "j26",
    name: "スマート・デンタル・トイ",
    description: "ペットの歯周病予防をサポートする「ハードウェア」と「アプリ・サービス」を融合させた循環型ヘルスケアサービス。口腔内画像や唾液データを採取して...",
    creator: "ヘルスケアチーム",
    lastModified: "2026-02-24",
    tags: { category: "ヘルスケア", phase: "検証", division: "新規事業部" },
    versions: [{ id: "vj26a", name: "プロトタイプ", date: "2026-02-24" }],
  },
  {
    id: "j27",
    name: "電力自給自足データセンター",
    description: "DC稼働時に発生する排熱(50~90°C)により沸点の低い冷媒（代替フロン等）を気化させ、タービンを回し電力を得る。冷媒は熱交換器による空冷により液...",
    creator: "DC推進チーム",
    lastModified: "2026-03-02",
    tags: { category: "エネルギー", phase: "構想", division: "軽金属事業部" },
    versions: [{ id: "vj27a", name: "技術検討書", date: "2026-03-02" }],
  },
  {
    id: "j28",
    name: "RIC（日本語版）",
    description: "Regional Infrastructure Management の日本語ローカライズ版",
    creator: "RICチーム",
    lastModified: "2026-01-22",
    tags: { category: "IT", phase: "運用", division: "デジタル事業部" },
    versions: [{ id: "vj28a", name: "日本語版リリース", date: "2026-01-22" }],
  },
  {
    id: "j29",
    name: "2026-01-20_RIC_Case_Japanese",
    description: "RICケーススタディの日本語版",
    creator: "RICチーム",
    lastModified: "2026-01-20",
    tags: { category: "IT", phase: "運用", division: "デジタル事業部" },
    versions: [{ id: "vj29a", name: "ケース作成", date: "2026-01-20" }],
  },
  {
    id: "j30",
    name: "2026-01-13_NLM_RIC_Project_",
    description: "Regional Infrastructure Management Project",
    creator: "NLM Team",
    lastModified: "2026-01-13",
    tags: { category: "IT", phase: "実行", division: "デジタル事業部" },
    versions: [{ id: "vj30a", name: "プロジェクト開始", date: "2026-01-13" }],
  },
];

// --- Bundled datasets ---

export const DATA_SETS: DataSet[] = [
  { label: "Acme Corp", projects: PROJECTS, dimensions: INITIAL_DIMENSIONS },
  { label: "MC Thailand", projects: ENERGY_PROJECTS, dimensions: ENERGY_DIMENSIONS },
  { label: "NLM", projects: JP_PROJECTS, dimensions: JP_DIMENSIONS },
];
