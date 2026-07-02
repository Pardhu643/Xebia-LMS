"use client";

import React, { useState, useMemo } from "react";
import PageHeader from "../../../components/common/PageHeader";
import MetricCard from "../../../components/common/MetricCard";
import Card, { CardBody } from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import {
  TrendingUp,
  Award,
  Users,
  Clock,
  BookOpen,
  Sparkles,
  CheckCircle2,
  MapPin,
  Building2,
  Briefcase,
  GraduationCap,
  Calendar,
  Layers,
  ChevronRight,
  TrendingDown,
  ThumbsUp,
  Percent,
  Search,
  RefreshCw,
  Layout,
  Play,
  Heart,
  Target,
  LineChart,
  Grid,
  Zap,
  Info,
  Shield,
  FileCode
} from "lucide-react";

// List of available filter values
const YEARS = ["All", "2026", "2025", "2024"];
const QUARTERS = ["All", "Q1", "Q2", "Q3", "Q4"];
const HALF_YEARS = ["All", "H1", "H2"];
const MONTHS = [
  "All", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const REGIONS = ["All", "India", "USA", "UK", "Netherlands", "Middle East"];
const LOCATIONS = ["All", "Gurugram", "Bengaluru", "Noida", "Atlanta", "London", "Amsterdam", "Dubai"];
const BUS = ["All", "Cloud Engineering", "Data & AI", "Software Engineering", "Agile & Devops", "Salesforce"];
const DEPARTMENTS = ["All", "Digital Solutions", "Data Science", "Platform Ops", "Security Practice", "Advisory Services"];
const PROJECTS = ["All", "Project Alpha", "Project Orion", "Project Sirius", "Project Polaris", "Project Zenith"];
const PRACTICES = ["All", "Microsoft Azure", "AWS", "Google Cloud", "Databricks", "Snowflake", "Generative AI"];
const GRADES = ["All", "Principal Consultant", "Senior Consultant", "Consultant", "Associate Consultant", "Tech Lead"];

export default function LeadershipAnalyticsPage() {
  // Global filter state
  const [filters, setFilters] = useState({
    year: "All",
    quarter: "All",
    halfYear: "All",
    month: "All",
    region: "All",
    location: "All",
    bu: "All",
    dept: "All",
    project: "All",
    practice: "All",
    grade: "All",
    employee: "",
    startDate: "",
    endDate: ""
  });

  const [activeTab, setActiveTab] = useState("executive");

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      year: "All",
      quarter: "All",
      halfYear: "All",
      month: "All",
      region: "All",
      location: "All",
      bu: "All",
      dept: "All",
      project: "All",
      practice: "All",
      grade: "All",
      employee: "",
      startDate: "",
      endDate: ""
    });
  };

  // Helper to generate a deterministic factor based on active filters.
  const filterFactor = useMemo(() => {
    let factor = 1.0;
    
    // Time filter reductions
    if (filters.year !== "All") factor *= 0.6;
    if (filters.quarter !== "All") factor *= 0.3;
    if (filters.halfYear !== "All") factor *= 0.52;
    if (filters.month !== "All") factor *= 0.12;

    // Org filter reductions
    if (filters.region !== "All") factor *= 0.45;
    if (filters.location !== "All") factor *= 0.32;
    if (filters.bu !== "All") factor *= 0.38;
    if (filters.dept !== "All") factor *= 0.28;
    if (filters.project !== "All") factor *= 0.15;
    if (filters.practice !== "All") factor *= 0.22;
    if (filters.grade !== "All") factor *= 0.26;
    if (filters.employee) factor *= 0.02;

    // Date range multiplier
    if (filters.startDate && filters.endDate) {
      factor *= 0.4;
    }

    return Math.max(factor, 0.01);
  }, [filters]);

  // Deterministic seed for charts & numbers based on filters
  const dataSeed = useMemo(() => {
    let sum = 0;
    const filterString = Object.values(filters).join("");
    for (let i = 0; i < filterString.length; i++) {
      sum += filterString.charCodeAt(i);
    }
    return sum || 100;
  }, [filters]);

  const pseudoRandom = (min, max, offset = 0) => {
    const val = Math.sin(dataSeed + offset) * 10000;
    const rnd = val - Math.floor(val);
    return Math.floor(rnd * (max - min + 1) + min);
  };

  // Dynamic calculated KPI metrics based on selection
  const kpis = useMemo(() => {
    const totalEmployees = Math.max(Math.round(2500 * (filters.region !== "All" ? 0.35 : 1) * (filters.dept !== "All" ? 0.25 : 1)), 50);
    const trainedFactor = 0.65 + (pseudoRandom(1, 15, 1) / 100);
    const nominated = Math.round(totalEmployees * (0.8 + (pseudoRandom(1, 10, 2) / 100)));
    const trained = Math.round(nominated * trainedFactor);
    const coveragePercent = ((trained / totalEmployees) * 100).toFixed(1);
    
    const sessions = Math.round(120 * filterFactor + pseudoRandom(1, 10, 3));
    const attendees = Math.round(trained * 1.4);
    const nominations = Math.round(nominated * 1.25);
    const avgSessionHrs = 2.5;
    const learningHours = Math.round(attendees * avgSessionHrs);

    const certsCompleted = Math.round(350 * filterFactor + pseudoRandom(1, 30, 4));
    const certGrowth = (12.4 + (pseudoRandom(-5, 10, 5) / 10)).toFixed(1);
    
    // AI Section
    const aiTrained = Math.round(trained * 0.42);
    const aiCerts = Math.round(certsCompleted * 0.38);
    const aiLearningHours = Math.round(learningHours * 0.45);

    // Feedback
    const avgFeedback = (4.5 + (pseudoRandom(-3, 4, 6) / 10)).toFixed(2);
    const satScore = Math.round(85 + pseudoRandom(-5, 10, 7));
    const recommendPercent = Math.round(88 + pseudoRandom(-4, 10, 8));

    return {
      totalEmployees,
      nominated,
      trained,
      coveragePercent,
      sessions,
      attendees,
      nominations,
      learningHours,
      certsCompleted,
      certGrowth,
      aiTrained,
      aiCerts,
      aiLearningHours,
      avgFeedback,
      satScore,
      recommendPercent
    };
  }, [filterFactor, filters, dataSeed]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leadership Learning Analytics Dashboard"
        description="Global learning reach, capability matrices, Zoho certifications, and AI transformation metrics."
        breadcrumbs={[
          { label: "Admin Console", href: "/admin" },
          { label: "Leadership Analytics", href: "/admin/leadership-analytics" }
        ]}
      />

      {/* FILTER CONTROL BAR */}
      <Card className="border border-border/80 shadow-xs bg-white rounded-2xl overflow-hidden">
        <CardBody className="p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-accent" />
              <span>Global Enterprise Filters</span>
            </span>
            <Button
              variant="outline"
              size="xs"
              onClick={resetFilters}
              className="flex items-center gap-1 hover:bg-gray-150 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5 text-xs">
            {/* Year filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Year-wise</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Quarter filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Quarter-wise</label>
              <select
                value={filters.quarter}
                onChange={(e) => setFilters({ ...filters, quarter: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {QUARTERS.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>

            {/* Half-Yearly filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Half-Yearly</label>
              <select
                value={filters.halfYear}
                onChange={(e) => setFilters({ ...filters, halfYear: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {HALF_YEARS.map((hy) => <option key={hy} value={hy}>{hy}</option>)}
              </select>
            </div>

            {/* Monthly filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Monthly</label>
              <select
                value={filters.month}
                onChange={(e) => setFilters({ ...filters, month: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Region filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Region</label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Location filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* BU filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Business Unit</label>
              <select
                value={filters.bu}
                onChange={(e) => setFilters({ ...filters, bu: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {BUS.map((bu) => <option key={bu} value={bu}>{bu}</option>)}
              </select>
            </div>

            {/* Dept filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Department</label>
              <select
                value={filters.dept}
                onChange={(e) => setFilters({ ...filters, dept: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Project filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Project</label>
              <select
                value={filters.project}
                onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {PROJECTS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Practice filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Practice</label>
              <select
                value={filters.practice}
                onChange={(e) => setFilters({ ...filters, practice: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {PRACTICES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {/* Grade filter */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Employee Grade</label>
              <select
                value={filters.grade}
                onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              >
                {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            {/* Search Individual */}
            <div className="space-y-1">
              <label className="font-bold text-foreground">Individual Employee</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ID or Name..."
                  value={filters.employee}
                  onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
                  className="w-full p-2 pr-7 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
                />
                <Search className="w-3.5 h-3.5 absolute right-2 top-2.5 text-foreground/40" />
              </div>
            </div>

            {/* Start Date filter */}
            <div className="space-y-1 col-span-1 md:col-span-2 lg:col-span-3">
              <label className="font-bold text-foreground">Custom Date Range (Start Date)</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              />
            </div>

            {/* End Date filter */}
            <div className="space-y-1 col-span-1 md:col-span-2 lg:col-span-3">
              <label className="font-bold text-foreground">Custom Date Range (End Date)</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full p-2 border border-border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 text-xs"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* TABS SELECTOR SYSTEM */}
      <div className="flex border-b border-border overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-200">
        {[
          { id: "executive", label: "Executive Summary" },
          { id: "coverage", label: "Coverage & Participation" },
          { id: "hours", label: "Learning Hours" },
          { id: "pillars", label: "Learning Pillars" },
          { id: "ai", label: "AI Transformation" },
          { id: "certs", label: "Zoho Certifications" },
          { id: "flagship", label: "Flagship Programs" },
          { id: "trends", label: "Trends & effectiveness" },
          { id: "champions", label: "Champions & Investment" },
          { id: "freshers", label: "Campus Journey" },
          { id: "future", label: "Future Roadmap" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/5 font-extrabold"
                : "border-transparent text-text-muted hover:text-foreground hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVE SECTION CONTAINER */}
      <div className="space-y-6">
        {/* T1: EXECUTIVE SUMMARY */}
        {activeTab === "executive" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Employees"
                value={kpis.totalEmployees.toLocaleString()}
                icon={Users}
                description="Total enterprise squad headcount"
                gradientScheme="primary"
              />
              <MetricCard
                title="Employees Nominated"
                value={kpis.nominated.toLocaleString()}
                icon={Award}
                description="Nominated for skills tracks"
                gradientScheme="primary"
              />
              <MetricCard
                title="Employees Trained"
                value={kpis.trained.toLocaleString()}
                icon={CheckCircle2}
                description="Successfully trained & assessed"
                gradientScheme="primary"
              />
              <div className="bg-white border border-border/80 shadow-xs rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-text-muted text-[10px] font-bold uppercase tracking-wider">
                    <span>Learning Coverage %</span>
                    <Percent className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-2xl font-black text-foreground mt-2 block">{kpis.coveragePercent}%</span>
                  <div className="h-2 bg-gray-150 rounded-full overflow-hidden mt-3.5">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${kpis.coveragePercent}%` }} />
                  </div>
                </div>
                <span className="text-[10px] text-text-muted font-bold mt-3 block">
                  Formula: Trained / Headcount × 100
                </span>
              </div>

              <MetricCard
                title="Sessions Conducted"
                value={kpis.sessions.toString()}
                icon={Calendar}
                description="Live expert sessions conducted"
                gradientScheme="primary"
              />
              <MetricCard
                title="Total Attendees"
                value={kpis.attendees.toLocaleString()}
                icon={Users}
                description="Sum total of session attendances"
                gradientScheme="primary"
              />
              <MetricCard
                title="Total Nominations"
                value={kpis.nominations.toLocaleString()}
                icon={Award}
                description="Nomination registrations processed"
                gradientScheme="primary"
              />
              <MetricCard
                title="Total Learning Hours"
                value={kpis.learningHours.toLocaleString()}
                icon={Clock}
                description="Total compiled learning exposure"
                gradientScheme="primary"
              />

              <MetricCard
                title="Certifications Completed"
                value={kpis.certsCompleted.toString()}
                icon={Award}
                trend={`+${kpis.certGrowth}% YoY`}
                description="Completed certification badges"
                gradientScheme="primary"
              />
              <MetricCard
                title="Employees Trained in AI"
                value={kpis.aiTrained.toString()}
                icon={Sparkles}
                description="Completed AI/GenAI capability paths"
                gradientScheme="primary"
              />
              <MetricCard
                title="AI Certifications Achieved"
                value={kpis.aiCerts.toString()}
                icon={Award}
                description="Databricks, Kiro & internal AI certs"
                gradientScheme="primary"
              />
              <MetricCard
                title="AI Learning Hours"
                value={kpis.aiLearningHours.toLocaleString()}
                icon={Clock}
                description="Dedicated GenAI skills hours"
                gradientScheme="primary"
              />

              <MetricCard
                title="Average Feedback Rating"
                value={`${kpis.avgFeedback} / 5.0`}
                icon={ThumbsUp}
                description="Session attendee evaluation score"
                gradientScheme="primary"
              />
              <MetricCard
                title="Training Satisfaction Score"
                value={`${kpis.satScore}%`}
                icon={Percent}
                description="Overall CSAT rating index"
                gradientScheme="primary"
              />
              <MetricCard
                title="Recommendation %"
                value={`${kpis.recommendPercent}%`}
                icon={ThumbsUp}
                description="Attendees recommending the program"
                gradientScheme="primary"
              />
            </div>
          </div>
        )}

        {/* T2: LEARNING COVERAGE & PARTICIPATION */}
        {activeTab === "coverage" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <Card>
              <CardBody className="p-6 space-y-4">
                <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                  Learning Coverage Metrics Breakdown
                </span>
                <div className="space-y-4.5">
                  {[
                    { label: "Learning Coverage by Region", trained: Math.round(kpis.trained * 0.88), total: Math.round(kpis.totalEmployees * 0.9) },
                    { label: "Learning Coverage by Location", trained: Math.round(kpis.trained * 0.65), total: Math.round(kpis.totalEmployees * 0.72) },
                    { label: "Learning Coverage by Project", trained: Math.round(kpis.trained * 0.76), total: Math.round(kpis.totalEmployees * 0.8) },
                    { label: "Learning Coverage by Business Unit", trained: Math.round(kpis.trained * 0.94), total: Math.round(kpis.totalEmployees * 0.95) },
                    { label: "Learning Coverage by Employee Grade", trained: Math.round(kpis.trained * 0.82), total: Math.round(kpis.totalEmployees * 0.88) }
                  ].map((item, idx) => {
                    const pct = ((item.trained / item.total) * 100).toFixed(1);
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-extrabold text-foreground">
                          <span>{item.label}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6 space-y-4">
                <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                  Regional Learning Coverage Heatmap
                </span>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[
                    { name: "Gurugram", pct: 88, class: "bg-emerald-600 text-white" },
                    { name: "Bengaluru", pct: 92, class: "bg-emerald-700 text-white" },
                    { name: "Noida", pct: 75, class: "bg-emerald-500 text-white" },
                    { name: "Atlanta (USA)", pct: 64, class: "bg-amber-500 text-white" },
                    { name: "London (UK)", pct: 58, class: "bg-amber-500 text-white" },
                    { name: "Amsterdam", pct: 82, class: "bg-emerald-600 text-white" },
                    { name: "Dubai (ME)", pct: 45, class: "bg-rose-500 text-white" },
                    { name: "Pune", pct: 79, class: "bg-emerald-500 text-white" },
                    { name: "Sales Team", pct: 38, class: "bg-rose-600 text-white" }
                  ].map((cell, idx) => (
                    <div key={idx} className={`p-4 rounded-xl flex flex-col justify-between h-24 ${cell.class} shadow-xs`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{cell.name}</span>
                      <span className="text-lg font-black">{cell.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card className="lg:col-span-2">
              <CardBody className="p-6 space-y-4">
                <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                  Project-wise Participation & Quarterly trend
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-foreground">Project-wise Participation Chart</h4>
                    <div className="h-44 flex items-end justify-between gap-4 border-b border-border pb-2 px-2">
                      {[78, 92, 54, 88, 62].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                          <div className="text-[9px] font-bold text-primary font-mono">{val}</div>
                          <div
                            className="w-full bg-primary hover:bg-accent transition-all rounded-t-md"
                            style={{ height: `${(val / 100) * 120}px` }}
                          />
                          <span className="text-[9px] text-text-muted font-bold truncate max-w-full">
                            {["Proj Alpha", "Proj Orion", "Proj Sirius", "Proj Polaris", "Proj Zenith"][idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-foreground">Quarterly Participation Trend</h4>
                    <div className="relative h-44 border-b border-l border-border px-2">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="var(--color-primary, #ED1C24)"
                          strokeWidth="3.5"
                          points="5,80 30,55 60,30 95,12"
                        />
                        <circle cx="5" cy="80" r="3" fill="var(--color-accent, #00AEEF)" />
                        <circle cx="30" cy="55" r="3" fill="var(--color-accent, #00AEEF)" />
                        <circle cx="60" cy="30" r="3" fill="var(--color-accent, #00AEEF)" />
                        <circle cx="95" cy="12" r="3" fill="var(--color-accent, #00AEEF)" />
                      </svg>
                      <div className="absolute bottom-1 left-0 right-0 flex justify-between px-2 text-[9px] text-text-muted font-bold font-mono">
                        <span>Q1 2025</span>
                        <span>Q2 2025</span>
                        <span>Q3 2025</span>
                        <span>Q4 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* T3: LEARNING HOURS ANALYTICS */}
        {activeTab === "hours" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Learning Hours"
                value={kpis.learningHours.toLocaleString()}
                icon={Clock}
                description="Total organization hours spent"
                gradientScheme="primary"
              />
              <MetricCard
                title="Avg Hours per Employee"
                value={(kpis.learningHours / kpis.totalEmployees).toFixed(1)}
                icon={Clock}
                description="Learning hours per headcount"
                gradientScheme="primary"
              />
              <MetricCard
                title="Avg Hours per Active Learner"
                value={(kpis.learningHours / kpis.trained).toFixed(1)}
                icon={Clock}
                description="Hours per successfully trained"
                gradientScheme="primary"
              />
              <MetricCard
                title="Top Region Avg Hours"
                value="28.4 hrs"
                icon={MapPin}
                description="Bengaluru learning center average"
                gradientScheme="primary"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardBody className="p-6 space-y-5">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    Learning hours additional insights
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>Top Learning-Focused Regions</span>
                      </h4>
                      <div className="divide-y divide-border text-xs">
                        {[
                          { name: "Bengaluru", hours: "4,820", users: "185" },
                          { name: "Gurugram", hours: "3,950", users: "162" },
                          { name: "Noida", hours: "2,480", users: "102" },
                          { name: "Amsterdam", hours: "1,850", users: "42" },
                          { name: "Atlanta", hours: "1,240", users: "32" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between py-2 items-center">
                            <span className="font-bold">{idx + 1}. {item.name}</span>
                            <span className="text-text-muted font-mono">{item.hours} hrs ({item.users} learners)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <h4 className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-accent" />
                        <span>Top Learning-Focused Projects</span>
                      </h4>
                      <div className="divide-y divide-border text-xs">
                        {[
                          { name: "Project Alpha", hours: "1,980" },
                          { name: "Project Orion", hours: "1,620" },
                          { name: "Project Polaris", hours: "1,150" },
                          { name: "Project Sirius", hours: "850" },
                          { name: "Project Zenith", hours: "780" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between py-2 items-center">
                            <span className="font-bold">{idx + 1}. {item.name}</span>
                            <span className="text-text-muted font-mono">{item.hours} hrs</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    Individual Learning Tracker
                  </span>
                  <div className="space-y-4.5 pt-2">
                    {[
                      { name: "Priyanka Sharma", hours: 48, progress: 95, track: "Next.js Architecture" },
                      { name: "Amit Patel", hours: 42, progress: 80, track: "Kubernetes Deployments" },
                      { name: "Rachel Green", hours: 38, progress: 65, track: "Spring Boot Enterprise" },
                      { name: "John Doe", hours: 35, progress: 100, track: "Compliance Basics" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-foreground">{item.name}</span>
                          <span className="text-text-muted font-mono">{item.hours} hrs</span>
                        </div>
                        <p className="text-[10px] text-text-muted font-semibold">{item.track}</p>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* T4: TRAINING CATEGORIES / LEARNING PILLARS */}
        {activeTab === "pillars" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "1. Compliance Learning",
                  desc: "Essential regulatory compliance and legal awareness paths mandated across Xebia.",
                  examples: "POSH, PISMS, Security Awareness, Mandatory Compliance Programs",
                  hours: 850,
                  certs: 240,
                  icon: Shield
                },
                {
                  title: "2. Technical Learning",
                  desc: "Core backend, database, and cloud engineering training tracks designed by Architects.",
                  examples: "Databricks, Cloud, Data Engineering, Development Technologies",
                  hours: 2950,
                  certs: 380,
                  icon: FileCode
                },
                {
                  title: "3. AI & GenAI Learning",
                  desc: "Advanced prompt engineering, local LLMs, and developer productivity tooling.",
                  examples: "Kiro, Claude, Copilot, GenAI Learning Paths, AI Workshops",
                  hours: 4200,
                  certs: 490,
                  icon: Sparkles
                },
                {
                  title: "4. Leadership Development",
                  desc: "Nurturing executive managers, project leaders, and team architects.",
                  examples: "YMP (Young Managers Program), Managerial Programs, People Management Programs",
                  hours: 640,
                  certs: 45,
                  icon: Layout
                },
                {
                  title: "5. Upskilling & Cross-Skilling",
                  desc: "Facilitating internal mobility and platform shifts for engineers.",
                  examples: "Solution Architect Programs, Tech Lead Development, Career Transition Paths",
                  hours: 1150,
                  certs: 88,
                  icon: Layers
                },
                {
                  title: "6. Certifications",
                  desc: "Tracking validation of skills through external technology vendor certifications.",
                  examples: "Databricks, AWS, Google Cloud, Azure, Snowflake, PMP",
                  hours: 3200,
                  certs: kpis.certsCompleted,
                  icon: Award
                },
                {
                  title: "7. Flagship Programs",
                  desc: "Strategic organizational shifts aligned with global core initiatives.",
                  examples: "Quantum Shift, Tech AI Thon, Databricks strategic certification drives",
                  hours: 1850,
                  certs: 120,
                  icon: Target
                }
              ].map((pillar, idx) => (
                <Card key={idx} className="hoverable border border-border/80 flex flex-col justify-between" hoverable>
                  <CardBody className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-black text-primary leading-tight">{pillar.title}</h3>
                      <div className="p-2 bg-primary/5 rounded-lg text-primary">
                        <pillar.icon className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <p className="text-xs text-foreground/80 leading-relaxed">{pillar.desc}</p>
                    
                    <div className="bg-gray-50 border border-border/50 rounded-xl p-3.5 space-y-2.5">
                      <span className="text-[10px] text-text-muted uppercase font-black tracking-wider block">
                        Included Tracks
                      </span>
                      <p className="text-[11px] font-bold text-foreground leading-snug">{pillar.examples}</p>
                    </div>
                  </CardBody>
                  
                  <div className="bg-gray-50/50 border-t border-border px-6 py-3.5 flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    <span>{pillar.hours.toLocaleString()} hours</span>
                    <span>{pillar.certs} certs</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* T5: AI TRANSFORMATION DASHBOARD */}
        {activeTab === "ai" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="AI Trained headcount"
                value={kpis.aiTrained.toString()}
                icon={Sparkles}
                description="Trained in AI Pillars"
                gradientScheme="primary"
              />
              <MetricCard
                title="AI Certifications"
                value={kpis.aiCerts.toString()}
                icon={Award}
                description="AI capability credentials"
                gradientScheme="primary"
              />
              <MetricCard
                title="AI Learning hours"
                value={kpis.aiLearningHours.toLocaleString()}
                icon={Clock}
                description="Total AI course hours logged"
                gradientScheme="primary"
              />
              <div className="bg-white border border-border/80 shadow-xs rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-text-muted text-[10px] font-bold uppercase tracking-wider">
                    <span>AI Maturity Score</span>
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-2xl font-black text-foreground mt-2 block">76 / 100</span>
                  <div className="h-2 bg-gray-150 rounded-full overflow-hidden mt-3.5">
                    <div className="h-full bg-accent rounded-full animate-pulse" style={{ width: "76%" }} />
                  </div>
                </div>
                <span className="text-[10px] text-text-muted font-bold mt-3 block">
                  Weighted: completions + certs + adoption
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    AI Capability Adoption Funnel
                  </span>
                  <div className="space-y-3 pt-3">
                    {[
                      { name: "Registered for AI Programs", count: 980, width: "w-full", color: "bg-primary" },
                      { name: "Attended Sessions", count: 750, width: "w-11/12", color: "bg-primary/90" },
                      { name: "Completed Learning", count: 480, width: "w-8/12", color: "bg-primary/80" },
                      { name: "Certified on AI", count: 180, width: "w-5/12", color: "bg-primary/70" },
                      { name: "Using AI Tools (Daily)", count: 95, width: "w-3/12", color: "bg-accent" }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs">
                        <span className="w-40 font-bold text-foreground text-right">{step.name}</span>
                        <div className="flex-1">
                          <div className={`h-8 ${step.color} ${step.width} rounded-r-lg flex items-center justify-between px-3 text-white font-extrabold shadow-sm`}>
                            <span>{step.count}</span>
                            <span>{((step.count / 980) * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 space-y-5">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    AI Tools Adoption & Champions
                  </span>
                  <div className="space-y-3">
                    {[
                      { name: "Copilot Users", count: 640 },
                      { name: "Kiro Users", count: 420 },
                      { name: "Claude Users", count: 185 },
                      { name: "Other Platforms", count: 92 }
                    ].map((tool, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <span className="font-semibold">{tool.name}</span>
                        <span className="font-extrabold text-foreground font-mono">{tool.count}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 border border-border/50 rounded-xl p-3.5 space-y-2.5">
                    <span className="text-[10px] text-text-muted uppercase font-black tracking-wider block">
                      AI Champions Network
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white border border-border p-2 rounded-lg">
                        <span className="block font-black text-primary">24</span>
                        <span className="text-[9px] font-bold text-text-muted">Power Users</span>
                      </div>
                      <div className="bg-white border border-border p-2 rounded-lg">
                        <span className="block font-black text-accent">12</span>
                        <span className="text-[9px] font-bold text-text-muted">AI Mentors</span>
                      </div>
                      <div className="bg-white border border-border p-2 rounded-lg">
                        <span className="block font-black text-cta">8</span>
                        <span className="text-[9px] font-bold text-text-muted">Ambassadors</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* T6: ZOHO CERTIFICATIONS */}
        {activeTab === "certs" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Certifications"
                value={kpis.certsCompleted.toString()}
                icon={Award}
                description="Zoho database certifications completed"
                gradientScheme="primary"
              />
              <MetricCard
                title="Approved in Zoho"
                value={Math.round(kpis.certsCompleted * 0.9).toString()}
                icon={CheckCircle2}
                description="Approved Zoho credentials sync"
                gradientScheme="primary"
              />
              <MetricCard
                title="Pending Approval"
                value={Math.round(kpis.certsCompleted * 0.1).toString()}
                icon={Clock}
                description="Submitted Zoho approvals pending"
                gradientScheme="primary"
              />
              <MetricCard
                title="High-demand certs"
                value="142"
                icon={Sparkles}
                description="Databricks, AWS & Snowflake certs count"
                gradientScheme="primary"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    Zoho Certification Lifecycle Funnel
                  </span>
                  <div className="grid grid-cols-6 gap-2 text-center text-xs pt-4">
                    {[
                      { name: "Assigned", val: 520, color: "bg-gray-100 text-foreground" },
                      { name: "Enrolled", val: 410, color: "bg-primary/10 text-primary border border-primary/20" },
                      { name: "Started", val: 320, color: "bg-primary/20 text-primary border border-primary/30" },
                      { name: "Completed", val: 240, color: "bg-primary/30 text-primary border border-primary/45" },
                      { name: "Submitted", val: 215, color: "bg-accent/20 text-accent border border-accent/30" },
                      { name: "Approved in Zoho", val: 195, color: "bg-emerald-100 text-emerald-800 border border-emerald-200" }
                    ].map((step, idx) => (
                      <div key={idx} className={`p-3 rounded-xl flex flex-col justify-between h-28 ${step.color} shadow-xs`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{step.name}</span>
                        <span className="text-base font-black">{step.val}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    High-demand Certifications
                  </span>
                  <div className="space-y-3">
                    {[
                      { name: "Databricks", count: 48, color: "bg-primary" },
                      { name: "AWS (Amazon Cloud)", count: 35, color: "bg-accent" },
                      { name: "Microsoft Azure", count: 28, color: "bg-blue-600" },
                      { name: "Google Cloud (GCP)", count: 18, color: "bg-amber-500" },
                      { name: "Snowflake", count: 15, color: "bg-sky-400" },
                      { name: "PMP", count: 8, color: "bg-cta" }
                    ].map((tech, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span>{tech.name}</span>
                          <span>{tech.count} completed</span>
                        </div>
                        <div className="h-2 bg-gray-150 rounded-full overflow-hidden">
                          <div className={`h-full ${tech.color}`} style={{ width: `${(tech.count / 48) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* T7: FLAGSHIP PROGRAM DASHBOARD */}
        {activeTab === "flagship" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "YMP (Young Managers Program)", enroll: 60, progress: 95, hours: 240, rating: 4.8, certs: 42 },
                { name: "Quantum Shift", enroll: 45, progress: 80, hours: 180, rating: 4.6, certs: 28 },
                { name: "Tech AI Thon", enroll: 240, progress: 100, hours: 480, rating: 4.9, certs: 85 },
                { name: "Databricks Program", enroll: 80, progress: 75, hours: 320, rating: 4.7, certs: 38 },
                { name: "GCV Certification Program", enroll: 35, progress: 60, hours: 140, rating: 4.4, certs: 15 },
                { name: "Kiro Learning Initiative", enroll: 150, progress: 88, hours: 300, rating: 4.5, certs: 52 },
                { name: "Copilot Learning Initiative", enroll: 180, progress: 92, hours: 360, rating: 4.8, certs: 70 }
              ].map((prog, idx) => (
                <Card key={idx} className="hoverable border border-border/80 flex flex-col justify-between" hoverable>
                  <CardBody className="p-5 space-y-4">
                    <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-[9px] font-black text-primary uppercase tracking-wider inline-block">
                      Flagship Program
                    </span>
                    <h3 className="text-sm font-black text-foreground leading-snug line-clamp-1">{prog.name}</h3>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                      <div className="bg-gray-50 border border-border p-2 rounded-lg">
                        <span className="block font-black text-foreground">{prog.enroll}</span>
                        <span className="text-[9px] font-bold text-text-muted">Participants</span>
                      </div>
                      <div className="bg-gray-50 border border-border p-2 rounded-lg">
                        <span className="block font-black text-foreground">{prog.progress}%</span>
                        <span className="text-[9px] font-bold text-text-muted">Completion</span>
                      </div>
                      <div className="bg-gray-50 border border-border p-2 rounded-lg">
                        <span className="block font-black text-foreground">{prog.hours}</span>
                        <span className="text-[9px] font-bold text-text-muted">Hours</span>
                      </div>
                    </div>
                  </CardBody>
                  
                  <div className="bg-gray-50/50 border-t border-border px-5 py-3 flex justify-between text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    <span>Feedback: {prog.rating} / 5.0</span>
                    <span>Certs: {prog.certs}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* T8: TRENDS & EFFECTIVENESS */}
        {activeTab === "trends" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardBody className="p-6 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-black text-primary uppercase tracking-wider">
                      Learning Growth Trends
                    </span>
                    <span className="text-[10px] text-text-muted font-bold">YoY Comparison</span>
                  </div>
                  <div className="divide-y divide-border text-xs">
                    {[
                      { metric: "Sessions Conducted", current: kpis.sessions, prev: Math.round(kpis.sessions * 0.85), growth: "+15%" },
                      { metric: "Employees Trained", current: kpis.trained, prev: Math.round(kpis.trained * 0.88), growth: "+12%" },
                      { metric: "Learning Hours Logged", current: kpis.learningHours, prev: Math.round(kpis.learningHours * 0.82), growth: "+18%" },
                      { metric: "Certifications Achieved", current: kpis.certsCompleted, prev: Math.round(kpis.certsCompleted * 0.9), growth: `+${kpis.certGrowth}%` },
                      { metric: "AI Learning Growth", current: kpis.aiLearningHours, prev: Math.round(kpis.aiLearningHours * 0.65), growth: "+35%" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between py-3 items-center">
                        <span className="font-bold">{row.metric}</span>
                        <div className="flex items-center gap-6 font-semibold">
                          <span className="text-text-muted font-mono">{row.prev.toLocaleString()} (Prev)</span>
                          <span className="text-foreground font-mono">{row.current.toLocaleString()} (Curr)</span>
                          <span className="text-emerald-600 font-extrabold flex items-center gap-0.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{row.growth}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    Training Effectiveness Ratings
                  </span>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs items-center">
                      <span className="font-semibold text-text-muted">Feedback Rating Average</span>
                      <span className="text-lg font-black text-primary font-mono">{kpis.avgFeedback} / 5.0</span>
                    </div>
                    <div className="flex justify-between text-xs items-center">
                      <span className="font-semibold text-text-muted">Trainer Competency Score</span>
                      <span className="text-lg font-black text-foreground font-mono">4.8 / 5.0</span>
                    </div>
                    <div className="flex justify-between text-xs items-center">
                      <span className="font-semibold text-text-muted">CSAT Index</span>
                      <span className="text-lg font-black text-foreground font-mono">{kpis.satScore}%</span>
                    </div>
                    <div className="flex justify-between text-xs items-center">
                      <span className="font-semibold text-text-muted">Recommendation Net %</span>
                      <span className="text-lg font-black text-foreground font-mono">{kpis.recommendPercent}%</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-border/50 rounded-xl p-3.5 space-y-2.5">
                    <span className="text-[10px] text-text-muted uppercase font-black tracking-wider block">
                      Best Performing Category
                    </span>
                    <p className="text-xs font-bold text-foreground leading-snug">
                      🏆 AI & Generative AI Pillars (Feedback avg: 4.88)
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* T9: CHAMPIONS & INVESTMENT */}
        {activeTab === "champions" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    LMS Learning Champions Recognition
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      { category: "Top Learner of the Quarter", name: "Priyanka Sharma", details: "48 hours logged", tag: "🏆 Quarterly Champion" },
                      { category: "Top AI Learner", name: "Amit Patel", details: "GenAI pathway completed", tag: "🤖 AI Champion" },
                      { category: "Top Certified Employee", name: "Siddharth Verma", details: "3 external certs synced", tag: "🎓 Zoho Certified" },
                      { category: "Learning Mentor", name: "Alex Jones", details: "Conducted 12 cloud sessions", tag: "🌟 Team Mentor" }
                    ].map((badge, idx) => (
                      <div key={idx} className="bg-gray-50 border border-border/80 rounded-xl p-4 space-y-2">
                        <span className="text-[9px] font-black text-text-muted uppercase tracking-wider block">
                          {badge.category}
                        </span>
                        <h4 className="text-sm font-extrabold text-foreground leading-tight">{badge.name}</h4>
                        <p className="text-xs text-text-muted leading-tight">{badge.details}</p>
                        <span className="inline-block px-2 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-black text-primary rounded-md uppercase tracking-wider mt-1.5">
                          {badge.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                    Project Learning Investment Matrix
                  </span>
                  <div className="divide-y divide-border text-xs">
                    {[
                      { project: "Project Alpha", trained: 48, hours: 240, certs: 18, ai: 85, invest: "94%" },
                      { project: "Project Orion", trained: 35, hours: 195, certs: 12, ai: 78, invest: "88%" },
                      { project: "Project Sirius", trained: 22, hours: 110, certs: 6, ai: 62, invest: "72%" },
                      { project: "Project Polaris", trained: 18, hours: 95, certs: 5, ai: 54, invest: "65%" },
                      { project: "Project Zenith", trained: 12, hours: 78, certs: 4, ai: 48, invest: "58%" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between py-3 items-center">
                        <div>
                          <span className="font-bold block text-foreground">{row.project}</span>
                          <span className="text-[10px] text-text-muted font-bold font-mono">
                            {row.trained} trained ({row.hours}h) | Certs: {row.certs}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 font-semibold">
                          <div className="text-right">
                            <span className="block font-black text-foreground font-mono">{row.invest}</span>
                            <span className="text-[9px] font-bold text-text-muted">Coverage</span>
                          </div>
                          <div className="text-right">
                            <span className="block font-black text-accent font-mono">{row.ai}/100</span>
                            <span className="text-[9px] font-bold text-text-muted">AI Score</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}

        {/* T10: CAMPUS JOURNEY */}
        {activeTab === "freshers" && (
          <div className="space-y-6 animate-fadeIn">
            <Card>
              <CardBody className="p-6 space-y-4">
                <span className="text-xs font-black text-primary uppercase tracking-wider block border-b border-border pb-2">
                  Campus Hires / Apprentice Development Funnel
                </span>
                <div className="grid grid-cols-6 gap-2 text-center text-xs pt-4">
                  {[
                    { name: "Campus Hiring", val: 120, pct: "100%", color: "bg-gray-100 text-foreground" },
                    { name: "Training Enroll", val: 120, pct: "100%", color: "bg-primary/10 text-primary border border-primary/20" },
                    { name: "Training Complete", val: 108, pct: "90%", color: "bg-primary/20 text-primary border border-primary/30" },
                    { name: "Cert Complete", val: 84, pct: "70%", color: "bg-primary/30 text-primary border border-primary/45" },
                    { name: "Project Allocation", val: 78, pct: "65%", color: "bg-accent/20 text-accent border border-accent/30" },
                    { name: "Billable Deployment", val: 72, pct: "60%", color: "bg-emerald-100 text-emerald-800 border border-emerald-200" }
                  ].map((step, idx) => (
                    <div key={idx} className={`p-3 rounded-xl flex flex-col justify-between h-32 ${step.color} shadow-xs`}>
                      <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{step.name}</span>
                      <div>
                        <span className="text-lg font-black block">{step.val}</span>
                        <span className="text-[10px] font-mono block mt-1">{step.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 border border-border/50 rounded-xl p-4 grid grid-cols-3 gap-6 text-xs text-center mt-4">
                  <div>
                    <span className="text-text-muted font-bold block">Avg Time to Deployment</span>
                    <span className="text-xl font-black text-foreground font-mono mt-1 block">45 Days</span>
                  </div>
                  <div>
                    <span className="text-text-muted font-bold block">Apprentice Conversion Rate</span>
                    <span className="text-xl font-black text-emerald-600 font-mono mt-1 block">90%</span>
                  </div>
                  <div>
                    <span className="text-text-muted font-bold block">Syllabus Completion Index</span>
                    <span className="text-xl font-black text-foreground font-mono mt-1 block">88 / 100</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* T11: FUTURE ROADMAP */}
        {activeTab === "future" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border border-dashed border-primary bg-primary/5">
                <CardBody className="p-6 space-y-4">
                  <h3 className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5 border-b border-primary/20 pb-2">
                    <Target className="w-4 h-4" />
                    <span>1. Skill Gap Dashboard (Roadmap)</span>
                  </h3>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    Will display current organizational skill matrices against required client project benchmarks.
                  </p>
                  <div className="space-y-3 pt-2 opacity-60">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-foreground">
                        <span>React/Next.js Gap</span>
                        <span>-12% Needed</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "88%" }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-foreground">
                        <span>Databricks/Data Eng Gap</span>
                        <span>-18% Needed</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "82%" }} />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-dashed border-accent bg-accent/5">
                <CardBody className="p-6 space-y-4">
                  <h3 className="text-xs font-black text-accent uppercase tracking-wider flex items-center gap-1.5 border-b border-accent/20 pb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>2. AI Recommendation Engine (Roadmap)</span>
                  </h3>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    Will auto-recommend pathways, certification programs, and career modules based on user logs.
                  </p>
                  <div className="space-y-2 pt-2 opacity-60 text-[11px] font-bold text-foreground">
                    <div className="p-2 bg-white rounded-lg border border-accent/20">
                      💡 Suggested for Cloud BU: AWS Solutions Architect
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-accent/20">
                      💡 Suggested for Java team: Reactive Spring Systems
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-dashed border-cta bg-cta/5">
                <CardBody className="p-6 space-y-4">
                  <h3 className="text-xs font-black text-cta uppercase tracking-wider flex items-center gap-1.5 border-b border-cta/20 pb-2">
                    <LineChart className="w-4 h-4" />
                    <span>3. Predictive Analytics (Roadmap)</span>
                  </h3>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    Forecast model predicting Zoho certification completions and identify learner attrition risk indices.
                  </p>
                  <div className="pt-2 opacity-60 text-xs flex justify-between font-extrabold items-center">
                    <span className="text-text-muted">Projected cert completion:</span>
                    <span className="text-cta text-sm font-black font-mono">82% on-time</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
