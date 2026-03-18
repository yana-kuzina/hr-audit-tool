import { useState, useEffect } from "react";

const auditData = {
  recruitment: {
    label: "Recruitment",
    icon: "🎯",
    color: "#2563EB",
    light: "#EFF6FF",
    border: "#BFDBFE",
    source: "SHRM, AIHR, HR University",
    sections: [
      {
        title: "Стратегія та планування",
        items: [
          { id: "r1", text: "Існує затверджений процес відкриття вакансії (hiring request / headcount approval)", priority: "critical" },
          { id: "r2", text: "Job descriptions актуальні, містять чіткі вимоги, KPIs ролі та рівень грейду", priority: "critical" },
          { id: "r3", text: "Визначені sourcing-канали для кожного типу ролей (LinkedIn, Djinni, referrals, agencies)", priority: "high" },
          { id: "r4", text: "Є EVP (employer value proposition) або хоча б базові меседжі для кандидатів", priority: "medium" },
        ]
      },
      {
        title: "Процес відбору",
        items: [
          { id: "r5", text: "Є стандартизована структура інтерв'ю (screening → technical → cultural fit)", priority: "critical" },
          { id: "r6", text: "Інтерв'юери знають як проводити структуроване інтерв'ю (уникання bias)", priority: "high" },
          { id: "r7", text: "Scorecards або форми оцінки кандидатів заповнюються після кожного інтерв'ю", priority: "high" },
          { id: "r8", text: "Проводяться reference checks перед офером (або є рішення про відмову від них)", priority: "medium" },
          { id: "r9", text: "Кандидати отримують фідбек у розумні терміни (max 5 робочих днів)", priority: "high" },
        ]
      },
      {
        title: "Офер та документація",
        items: [
          { id: "r10", text: "Є стандартний шаблон offer letter з усіма необхідними умовами", priority: "critical" },
          { id: "r11", text: "Є salary bands / grading система для прийняття рішень по оферу", priority: "high" },
          { id: "r12", text: "Time-to-hire вимірюється (benchmark: 25-45 днів для IT/fintech)", priority: "high" },
          { id: "r13", text: "Cost-per-hire відстежується (прямі + непрямі витрати)", priority: "medium" },
          { id: "r14", text: "Offer acceptance rate відстежується (benchmark: >80%)", priority: "medium" },
        ]
      },
      {
        title: "Compliance",
        items: [
          { id: "r15", text: "Трудові договори підписуються до першого робочого дня", priority: "critical" },
          { id: "r16", text: "NDA / IP assignment угоди підписуються (критично для fintech)", priority: "critical" },
          { id: "r17", text: "Зберігаються записи про проведення відбору (anti-discrimination compliance)", priority: "high" },
        ]
      }
    ]
  },
  onboarding: {
    label: "Onboarding",
    icon: "🚀",
    color: "#059669",
    light: "#ECFDF5",
    border: "#A7F3D0",
    source: "SHRM Foundation 6C Framework, BambooHR Research",
    sections: [
      {
        title: "Pre-boarding (до першого дня)",
        items: [
          { id: "o1", text: "Новий співробітник отримує вітальний лист із деталями першого дня до виходу", priority: "high" },
          { id: "o2", text: "Робоче місце, ноутбук, акаунти та доступи готові до першого дня", priority: "critical" },
          { id: "o3", text: "Buddy або ментор призначений до виходу нового співробітника", priority: "high" },
          { id: "o4", text: "Менеджер має план першого тижня для нового члена команди", priority: "high" },
        ]
      },
      {
        title: "Compliance",
        items: [
          { id: "o5", text: "Всі обов'язкові документи підписані та зібрані в перші 2 дні", priority: "critical" },
          { id: "o6", text: "Новий співробітник ознайомлений з HR-політиками (відпустки, лікарняні, remote policy)", priority: "critical" },
          { id: "o7", text: "Security & data protection briefing проведено (критично для fintech)", priority: "critical" },
        ]
      },
      {
        title: "Clarification - розуміння ролі",
        items: [
          { id: "o8", text: "Чіткі 30/60/90-денні цілі погоджені між менеджером та новим співробітником", priority: "critical" },
          { id: "o9", text: "Нова людина розуміє свої KPIs та критерії успіху в ролі", priority: "critical" },
          { id: "o10", text: "Проведено ознайомлення з продуктом, бізнес-моделлю, стратегією компанії", priority: "high" },
        ]
      },
      {
        title: "Connection та Culture",
        items: [
          { id: "o11", text: "Новий співробітник познайомлений з ключовими стейкхолдерами та суміжними командами", priority: "high" },
          { id: "o12", text: "Є регулярні 1:1 з менеджером у перші 90 днів (мін. раз на тиждень)", priority: "high" },
          { id: "o13", text: "Проводиться onboarding survey через 30 і 90 днів", priority: "high" },
        ]
      },
      {
        title: "Метрики онбордингу",
        items: [
          { id: "o14", text: "Time-to-productivity відстежується (benchmark: 3-6 міс. для IT ролей)", priority: "medium" },
          { id: "o15", text: "New hire retention rate (90 днів) вимірюється (benchmark: >90%)", priority: "high" },
          { id: "o16", text: "Onboarding satisfaction score збирається та аналізується", priority: "medium" },
        ]
      }
    ]
  },
  performance: {
    label: "Performance Evaluation",
    icon: "📊",
    color: "#7C3AED",
    light: "#F5F3FF",
    border: "#DDD6FE",
    source: "AIHR, Gallup State of the Workplace, McKinsey",
    sections: [
      {
        title: "Основи системи",
        items: [
          { id: "p1", text: "Є чітко описаний performance management цикл (терміни, учасники, формат)", priority: "critical" },
          { id: "p2", text: "Кожен співробітник має персональні цілі або OKR пов'язані з бізнес-цілями", priority: "critical" },
          { id: "p3", text: "Менеджери навчені проводити performance review (уникати halo/recency bias)", priority: "high" },
          { id: "p4", text: "Грейди та ролеві компетенції описані та доступні всім співробітникам", priority: "high" },
        ]
      },
      {
        title: "Регулярність та фідбек",
        items: [
          { id: "p5", text: "Регулярні 1:1 між менеджерами та співробітниками (мін. раз на 2 тижні)", priority: "high" },
          { id: "p6", text: "Є практика continuous feedback (не тільки Annual review)", priority: "high" },
          { id: "p7", text: "360-feedback або peer review впроваджено або заплановано", priority: "medium" },
          { id: "p8", text: "Performance review документується та зберігається", priority: "critical" },
        ]
      },
      {
        title: "Зв'язок з compensation та розвитком",
        items: [
          { id: "p9", text: "Є прозорий зв'язок між перф-рев'ю та рішеннями про підвищення/бонуси", priority: "critical" },
          { id: "p10", text: "Individual Development Plans (IDP) розробляються для кожного співробітника", priority: "medium" },
          { id: "p11", text: "Underperformance management процес описаний і застосовується (PIP або аналог)", priority: "high" },
        ]
      },
      {
        title: "Метрики та аналітика",
        items: [
          { id: "p12", text: "Performance distribution аналізується на рівні команд (уникнення rating inflation)", priority: "high" },
          { id: "p13", text: "Кореляція між engagement та performance відстежується", priority: "medium" },
          { id: "p14", text: "High performer retention rate вимірюється (benchmark: >90%)", priority: "high" },
        ]
      }
    ]
  },
  motivation: {
    label: "Motivation & Engagement",
    icon: "💡",
    color: "#D97706",
    light: "#FFFBEB",
    border: "#FDE68A",
    source: "Gallup Q12, Herzberg Two-Factor Theory, SHRM Employee Recognition Survey",
    sections: [
      {
        title: "Компенсація та бенефіти",
        items: [
          { id: "m1", text: "Salary bands існують і є конкурентоспроможними (market benchmarking проводиться)", priority: "critical" },
          { id: "m2", text: "Структура бонусів / variable pay чітко описана і зрозуміла співробітникам", priority: "high" },
          { id: "m3", text: "Benefits package відповідає ринку (медстрахування, спорт, освітній бюджет)", priority: "high" },
          { id: "m4", text: "Equity / option plan існує або розглядається для ключових ролей (fintech best practice)", priority: "medium" },
        ]
      },
      {
        title: "Визнання та нематеріальна мотивація",
        items: [
          { id: "m5", text: "Є формальна або неформальна програма recognition (публічне визнання досягнень)", priority: "high" },
          { id: "m6", text: "Менеджери регулярно дають позитивний фідбек і відзначають внески команди", priority: "high" },
          { id: "m7", text: "Є можливості для внутрішнього переміщення / кар'єрного росту (internal mobility)", priority: "high" },
          { id: "m8", text: "L&D бюджет або навчальна програма існує та активно використовується", priority: "medium" },
        ]
      },
      {
        title: "Engagement та культура",
        items: [
          { id: "m9", text: "Employee engagement survey проводиться регулярно (мін. раз на рік)", priority: "high" },
          { id: "m10", text: "eNPS (Employee Net Promoter Score) вимірюється (benchmark IT: >20)", priority: "high" },
          { id: "m11", text: "Результати engagement surveys комунікуються і по них є action plan", priority: "critical" },
          { id: "m12", text: "Є pulse surveys або інші швидкі інструменти вимірювання настрою команди", priority: "medium" },
        ]
      },
      {
        title: "Well-being та баланс",
        items: [
          { id: "m13", text: "Overtime або burnout signals відстежуються менеджерами та HR", priority: "high" },
          { id: "m14", text: "Є чіткий remote/hybrid policy та він дотримується", priority: "high" },
          { id: "m15", text: "Mental health підтримка доступна (EAP або аналог)", priority: "medium" },
        ]
      }
    ]
  },
  offboarding: {
    label: "Offboarding",
    icon: "🤝",
    color: "#DC2626",
    light: "#FEF2F2",
    border: "#FECACA",
    source: "AIHR 9-Step Offboarding Framework, SHRM, PwC Global Workforce Study",
    sections: [
      {
        title: "Адміністративне та юридичне",
        items: [
          { id: "ob1", text: "Є чіткий offboarding checklist з власниками кожного кроку (HR, IT, Finance, Manager)", priority: "critical" },
          { id: "ob2", text: "Revocation системних доступів відбувається своєчасно (в день звільнення або раніше)", priority: "critical" },
          { id: "ob3", text: "Всі документи підписані: розрахунок, повернення техніки, NDA reminder", priority: "critical" },
          { id: "ob4", text: "Фінальний розрахунок проводиться вчасно і без помилок", priority: "critical" },
        ]
      },
      {
        title: "Knowledge Transfer",
        items: [
          { id: "ob5", text: "Є процес передачі знань і справ (handover документ або зустрічі)", priority: "critical" },
          { id: "ob6", text: "Ключові проекти, контакти та процеси задокументовані перед виходом", priority: "high" },
          { id: "ob7", text: "Визначений наступник або тимчасовий виконуючий обов'язки", priority: "high" },
        ]
      },
      {
        title: "Exit Interview",
        items: [
          { id: "ob8", text: "Exit interview проводиться з усіма співробітниками що звільняються", priority: "critical" },
          { id: "ob9", text: "Exit interview проводить нейтральна особа (HR, не прямий менеджер)", priority: "high" },
          { id: "ob10", text: "Дані exit interview аналізуються та впливають на HR-рішення", priority: "high" },
          { id: "ob11", text: "Exit survey/форма доступна як альтернатива для тих хто не хоче розмовляти", priority: "medium" },
        ]
      },
      {
        title: "Employer Brand та відносини",
        items: [
          { id: "ob12", text: "Команда повідомляється про відхід колеги своєчасно та коректно", priority: "high" },
          { id: "ob13", text: "Є alumni network або принаймні позитивне прощання (farewell)", priority: "medium" },
          { id: "ob14", text: "Voluntary turnover rate відстежується по причинах звільнення", priority: "high" },
          { id: "ob15", text: "Regretted turnover (цінні співробітники) аналізується окремо", priority: "high" },
        ]
      }
    ]
  }
};

const PRIORITY_CONFIG = {
  critical: { label: "Критично", color: "#DC2626", bg: "#FEF2F2" },
  high: { label: "Важливо", color: "#D97706", bg: "#FFFBEB" },
  medium: { label: "Бажано", color: "#2563EB", bg: "#EFF6FF" }
};

const STATUS_CONFIG = {
  none: { label: "Не оцінено", icon: "○", color: "#9CA3AF" },
  yes: { label: "Виконується", icon: "✓", color: "#059669" },
  partial: { label: "Частково", icon: "◑", color: "#D97706" },
  no: { label: "Відсутнє", icon: "✗", color: "#DC2626" },
  na: { label: "Не актуально", icon: "—", color: "#9CA3AF" }
};

const STORAGE_KEY = "hr-audit-v1";
const GSHEET_URL = "https://script.google.com/macros/s/AKfycbwNvC5PlszCs3zmDkaNk8PVqRjc1KC7VsCpn4W3s4i3TBeNdke9F0iYl-ytpcjUPwKc/exec";

const PROXY = "/.netlify/functions/sheets";

const storage = {
  async get() {
    try {
      const res = await fetch(PROXY);
      const json = await res.json();
      if (json.status === "ok" && json.data && Object.keys(json.data).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
        return json.data;
      }
    } catch (e) {}
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  },
  async set(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {}
    try {
      await fetch(PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
    } catch (e) {}
  },
  async delete() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    try {
      await fetch(PROXY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch (e) {}
  }
};

export default function HRAuditTool() {
  const [activeTab, setActiveTab] = useState("recruitment");
  const [checks, setChecks] = useState({});
  const [notes, setNotes] = useState({});
  const [activeNote, setActiveNote] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [filterPriority, setFilterPriority] = useState("all");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [loaded, setLoaded] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load on mount
  useEffect(() => {
    storage.get().then(data => {
      if (data) {
        if (data.checks) setChecks(data.checks);
        if (data.notes) setNotes(data.notes);
        if (data.savedAt) setLastSaved(data.savedAt);
      }
      setLoaded(true);
    });
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!loaded) return;
    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      const savedAt = new Date().toLocaleString("uk-UA");
      await storage.set({ checks, notes, savedAt });
      setLastSaved(savedAt);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, [checks, notes, loaded]);

  const setStatus = (id, status) => setChecks(prev => ({ ...prev, [id]: status }));

  const WEIGHT = { critical: 3, high: 2, medium: 1 };

  const getStats = (domain) => {
    const allItems = auditData[domain].sections.flatMap(s => s.items);
    const total = allItems.length;
    const yes = allItems.filter(i => checks[i.id] === "yes").length;
    const partial = allItems.filter(i => checks[i.id] === "partial").length;
    const no = allItems.filter(i => checks[i.id] === "no").length;
    const criticalMissing = allItems.filter(i => i.priority === "critical" && checks[i.id] === "no").length;
    const scored = allItems.filter(i => checks[i.id] && checks[i.id] !== "none" && checks[i.id] !== "na").length;

    // Weighted score: critical=3, high=2, medium=1
    // Невідмічені та "Відсутнє" = 0 балів, "Не актуально" виключається
    const activeItems = allItems.filter(i => checks[i.id] !== "na");
    const maxPoints = activeItems.reduce((sum, i) => sum + WEIGHT[i.priority], 0);
    const earnedPoints = activeItems.reduce((sum, i) => {
      const w = WEIGHT[i.priority];
      const s = checks[i.id];
      if (s === "yes") return sum + w;
      if (s === "partial") return sum + w * 0.5;
      return sum; // none, no = 0
    }, 0);
    const score = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;

    return { total, yes, partial, no, criticalMissing, score, scored, maxPoints, earnedPoints };
  };

  const scoreColor = (s) => s >= 80 ? "#059669" : s >= 60 ? "#D97706" : s > 0 ? "#DC2626" : "#9CA3AF";

  const handleReset = async () => {
    if (!window.confirm("Скинути всі відповіді та нотатки? Цю дію не можна відмінити.")) return;
    setChecks({});
    setNotes({});
    await storage.delete();
    setLastSaved(null);
  };

  const activeData = auditData[activeTab];
  const stats = getStats(activeTab);
  const totalAnswered = Object.keys(checks).filter(k => checks[k] && checks[k] !== "none").length;
  const totalItems = Object.values(auditData).flatMap(d => d.sections.flatMap(s => s.items)).length;

  const overallScore = (() => {
    let totalEarned = 0, totalMax = 0;
    Object.keys(auditData).forEach(domain => {
      const s = getStats(domain);
      totalEarned += s.earnedPoints;
      totalMax += s.maxPoints;
    });
    return totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  })();

  const filteredSections = activeData.sections.map(s => ({
    ...s,
    items: filterPriority === "all" ? s.items : s.items.filter(i => i.priority === filterPriority)
  })).filter(s => s.items.length > 0);

  if (!loaded) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "system-ui", color: "#64748B", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 32 }}>⏳</div>
        <div style={{ fontSize: 14 }}>Завантаження збережених даних...</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)", color: "white", padding: "24px 28px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#94A3B8", marginBottom: 4 }}>
                HR Audit
              </div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>HR Process Audit Tool</h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ fontSize: 12, color: saveStatus === "saved" ? "#86EFAC" : saveStatus === "saving" ? "#FCD34D" : "#64748B" }}>
                  {saveStatus === "saving" && "💾 Зберігаю..."}
                  {saveStatus === "saved" && "✓ Збережено"}
                  {saveStatus === "idle" && lastSaved && `✓ ${lastSaved}`}
                </div>
                <button onClick={() => setShowSummary(!showSummary)}
                  style={{ background: showSummary ? "#3B82F6" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "7px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  {showSummary ? "← До аудиту" : "📋 Звіт"}
                </button>
                <button onClick={handleReset}
                  style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#FCA5A5", padding: "7px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  🗑 Скинути
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 160, height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${(totalAnswered / totalItems) * 100}%`, height: "100%", background: "#34D399", borderRadius: 3, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>{totalAnswered}/{totalItems}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: scoreColor(overallScore), marginLeft: 4 }}>{overallScore}%</span>
              </div>
            </div>
          </div>

          {!showSummary && (
            <div style={{ display: "flex", gap: 3, overflowX: "auto" }}>
              {Object.entries(auditData).map(([key, domain]) => {
                const s = getStats(key);
                const domainItems = domain.sections.flatMap(sec => sec.items);
                const domainAnswered = domainItems.filter(i => checks[i.id] && checks[i.id] !== "none").length;
                const isActive = activeTab === key;
                return (
                  <button key={key} onClick={() => setActiveTab(key)}
                    style={{ background: isActive ? "white" : "transparent", color: isActive ? domain.color : "#94A3B8", border: "none", padding: "9px 16px 11px", borderRadius: "7px 7px 0 0", cursor: "pointer", fontSize: 12, fontWeight: isActive ? 700 : 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
                    <span>{domain.icon}</span>
                    <span>{domain.label}</span>
                    <span style={{ fontSize: 10, color: isActive ? "#94A3B8" : "#64748B" }}>{domainAnswered}/{domainItems.length}</span>
                    {s.criticalMissing > 0 && <span style={{ background: "#DC2626", color: "white", borderRadius: 10, padding: "0 5px", fontSize: 10, fontWeight: 700 }}>{s.criticalMissing}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px" }}>
        {showSummary ? (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", marginTop: 0, marginBottom: 18 }}>Зведений звіт аудиту</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 14, marginBottom: 20 }}>
              {Object.entries(auditData).map(([key, domain]) => {
                const s = getStats(key);
                return (
                  <div key={key} style={{ background: "white", borderRadius: 12, padding: 18, border: `1px solid ${domain.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 20 }}>{domain.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1E293B" }}>{domain.label}</div>
                          <div style={{ fontSize: 11, color: "#64748B" }}>{s.scored}/{s.total} оцінено</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: scoreColor(s.score) }}>{s.score}%</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                      {[{ count: s.yes, color: "#059669", label: "✓ Є" }, { count: s.partial, color: "#D97706", label: "◑ Частково" }, { count: s.no, color: "#DC2626", label: "✗ Відсутнє" }].map(item => (
                        <div key={item.label} style={{ flex: 1, textAlign: "center", background: "#F8FAFC", borderRadius: 6, padding: "6px 0" }}>
                          <div style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.count}</div>
                          <div style={{ fontSize: 10, color: "#94A3B8" }}>{item.label}</div>
                        </div>
                      ))}
                    </div>
                    {s.criticalMissing > 0 && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "#DC2626", fontWeight: 600 }}>⚠ {s.criticalMissing} критичних пробілів</div>}
                  </div>
                );
              })}
            </div>

            <div style={{ background: "white", borderRadius: 12, padding: 20, border: "1px solid #FECACA", marginBottom: 14 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#DC2626" }}>🚨 Критичні пробіли (відсутні)</h3>
              {(() => {
                const allCrit = Object.entries(auditData).flatMap(([, domain]) =>
                  domain.sections.flatMap(s => s.items)
                    .filter(i => i.priority === "critical" && checks[i.id] === "no")
                    .map(i => ({ ...i, domainLabel: domain.label, domainIcon: domain.icon, domainColor: domain.color }))
                );
                if (!allCrit.length) return <p style={{ color: "#059669", fontSize: 13, margin: 0 }}>✓ Критичних відсутніх пунктів не знайдено</p>;
                let lastDomain = null;
                return allCrit.map(item => (
                  <div key={item.id}>
                    {item.domainLabel !== lastDomain && (() => { lastDomain = item.domainLabel; return <div style={{ fontWeight: 600, fontSize: 12, color: item.domainColor, marginTop: 10, marginBottom: 4 }}>{item.domainIcon} {item.domainLabel}</div>; })()}
                    <div style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: "1px solid #FEF2F2", fontSize: 12, color: "#374151" }}>
                      <span style={{ color: "#DC2626", flexShrink: 0 }}>✗</span><span>{item.text}</span>
                    </div>
                  </div>
                ));
              })()}
            </div>

            <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#1D4ED8" }}>
              💾 Відповіді зберігаються автоматично в <strong>localStorage</strong> браузера — збережуться після оновлення сторінки.
            </div>
          </div>

        ) : (
          <div>
            <div style={{ background: "white", borderRadius: 12, padding: 18, marginBottom: 16, border: `1px solid ${activeData.border}`, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 20 }}>{activeData.icon}</span>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1E293B" }}>{activeData.label}</h2>
                </div>
                <div style={{ fontSize: 11, color: "#64748B" }}></div>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {[{ count: stats.yes, color: "#059669", label: "Виконується" }, { count: stats.partial, color: "#D97706", label: "Частково" }, { count: stats.no, color: "#DC2626", label: "Відсутнє" }].map(s => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.count}</div>
                      <div style={{ fontSize: 10, color: "#94A3B8" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {(
                  <div style={{ textAlign: "center", padding: "5px 12px", background: "#F8FAFC", borderRadius: 8 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: scoreColor(stats.score), lineHeight: 1 }}>{stats.score}%</div>
                    <div style={{ fontSize: 10, color: "#94A3B8" }}>score</div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 14, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#64748B" }}>Фільтр:</span>
              {["all", "critical", "high", "medium"].map(p => (
                <button key={p} onClick={() => setFilterPriority(p)}
                  style={{ padding: "3px 11px", borderRadius: 20, border: "1px solid", cursor: "pointer", fontSize: 11, fontWeight: 600, borderColor: filterPriority === p ? (p === "all" ? "#334155" : PRIORITY_CONFIG[p]?.color) : "#E2E8F0", background: filterPriority === p ? (p === "all" ? "#334155" : PRIORITY_CONFIG[p]?.bg) : "white", color: filterPriority === p ? (p === "all" ? "white" : PRIORITY_CONFIG[p]?.color) : "#64748B" }}>
                  {p === "all" ? "Всі" : PRIORITY_CONFIG[p].label}
                </button>
              ))}
            </div>

            {filteredSections.map((section, si) => (
              <div key={si} style={{ background: "white", borderRadius: 12, marginBottom: 12, overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ padding: "10px 18px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#374151" }}>{section.title}</h3>
                </div>
                {section.items.map((item, idx) => {
                  const status = checks[item.id] || "none";
                  const pCfg = PRIORITY_CONFIG[item.priority];
                  const hasNote = notes[item.id];
                  return (
                    <div key={item.id} style={{ padding: "12px 18px", borderBottom: idx < section.items.length - 1 ? "1px solid #F1F5F9" : "none", background: status === "no" ? "#FFF8F8" : status === "yes" ? "#F0FFF8" : "white", transition: "background 0.15s" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ flexShrink: 0, marginTop: 3 }}>
                          <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: pCfg.color, boxShadow: `0 0 0 3px ${pCfg.bg}` }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, marginBottom: 7 }}>{item.text}</div>
                          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                            {["yes", "partial", "no", "na"].map(s => {
                              const cfg = STATUS_CONFIG[s];
                              const isSel = status === s;
                              return (
                                <button key={s} onClick={() => setStatus(item.id, isSel ? "none" : s)}
                                  style={{ padding: "3px 9px", borderRadius: 6, border: "1.5px solid", borderColor: isSel ? cfg.color : "#E2E8F0", background: isSel ? cfg.color : "white", color: isSel ? "white" : "#64748B", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
                                  {cfg.icon} {cfg.label}
                                </button>
                              );
                            })}
                            <button onClick={() => setActiveNote(activeNote === item.id ? null : item.id)}
                              style={{ padding: "3px 9px", borderRadius: 6, border: "1.5px solid", borderColor: hasNote ? "#7C3AED" : "#E2E8F0", background: hasNote ? "#F5F3FF" : "white", color: hasNote ? "#7C3AED" : "#94A3B8", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                              ✏ {hasNote ? "Нотатка ▾" : "Нотатка"}
                            </button>
                          </div>
                          {activeNote === item.id && (
                            <textarea
                              placeholder="Спостереження, відповідальна особа, джерело даних..."
                              value={notes[item.id] || ""}
                              onChange={e => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                              style={{ width: "100%", marginTop: 7, padding: "7px 10px", fontSize: 12, border: "1px solid #DDD6FE", borderRadius: 7, resize: "vertical", minHeight: 56, fontFamily: "inherit", boxSizing: "border-box", outline: "none", background: "#FDFCFF", color: "#374151" }}
                            />
                          )}
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: pCfg.color, background: pCfg.bg, padding: "2px 7px", borderRadius: 4, flexShrink: 0, whiteSpace: "nowrap" }}>
                          {pCfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10, padding: "10px 14px", marginTop: 6, fontSize: 11, color: "#1D4ED8" }}>
              💾 Відповіді зберігаються автоматично після кожної зміни і залишаються після оновлення сторінки.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
