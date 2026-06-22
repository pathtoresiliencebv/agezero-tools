"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Boxes,
  Bot,
  Layout,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
  Sun,
  Moon,
  Layers,
  Star,
  Heart,
  Mail,
  Bell,
  Settings,
  User,
  Send,
  Loader,
  Circle,
  Square,
  Triangle,
} from "@/components/icons";
import { Aurora } from "@/components/motion/aurora";
import { GridPattern } from "@/components/motion/grid-pattern";
import { cn } from "@/lib/utils";

interface PreviewItem {
  name: string;
  category: "ui" | "ai" | "block" | "section";
  description: string;
  preview: React.ReactNode;
  install: string;
}

const ITEMS: PreviewItem[] = [
  {
    name: "Button",
    category: "ui",
    description: "6 variants, 4 sizes, asChild support",
    install: "npx agezero-ui add button",
    preview: (
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Default</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Button size="sm" variant="ghost">Ghost</Button>
        <Button size="sm" variant="destructive">Delete</Button>
      </div>
    ),
  },
  {
    name: "Card",
    category: "ui",
    description: "Header, content, footer, action slot",
    install: "npx agezero-ui add card",
    preview: (
      <Card className="w-full">
        <CardContent className="p-3 text-xs">
          <div className="mb-1 flex items-center justify-between">
            <p className="font-medium">Acme Inc</p>
            <Badge variant="secondary" className="text-[9px]">+12%</Badge>
          </div>
          <p className="text-muted-foreground">$2,420 this week</p>
        </CardContent>
      </Card>
    ),
  },
  {
    name: "Badge",
    category: "ui",
    description: "9 variants, icon support",
    install: "npx agezero-ui add badge",
    preview: (
      <div className="flex flex-wrap gap-1.5">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success" className="bg-emerald-500/10 text-emerald-600">+24%</Badge>
      </div>
    ),
  },
  {
    name: "Input",
    category: "ui",
    description: "Styled text input with focus ring",
    install: "npx agezero-ui add input",
    preview: (
      <Input placeholder="Type something…" className="h-8 max-w-xs text-xs" />
    ),
  },
  {
    name: "Avatar",
    category: "ui",
    description: "Image + initials fallback",
    install: "npx agezero-ui add avatar",
    preview: (
      <div className="flex -space-x-2">
        {["AB", "CD", "EF", "GH"].map((s) => (
          <div
            key={s}
            className="grid size-8 place-items-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-cyan-500 text-[10px] font-bold text-white"
          >
            {s}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Separator",
    category: "ui",
    description: "Horizontal or vertical divider",
    install: "npx agezero-ui add separator",
    preview: (
      <div className="flex w-full max-w-xs items-center gap-2 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>
    ),
  },
  {
    name: "Dialog",
    category: "ui",
    description: "Modal with backdrop + focus trap",
    install: "npx agezero-ui add dialog",
    preview: (
      <div className="rounded-lg border border-border bg-card p-3 shadow-2xl w-full max-w-xs">
        <p className="text-xs font-semibold">Confirm action</p>
        <p className="mt-1 text-[10px] text-muted-foreground">This cannot be undone.</p>
        <div className="mt-2 flex justify-end gap-1.5">
          <Button size="sm" variant="ghost">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </div>
      </div>
    ),
  },
  {
    name: "Tabs",
    category: "ui",
    description: "Underline / pill variants",
    install: "npx agezero-ui add tabs",
    preview: (
      <div className="w-full">
        <div className="flex border-b border-border text-xs">
          <button className="border-b-2 border-primary px-3 py-1.5 font-medium text-foreground">Overview</button>
          <button className="px-3 py-1.5 text-muted-foreground">Activity</button>
          <button className="px-3 py-1.5 text-muted-foreground">Settings</button>
        </div>
      </div>
    ),
  },
  {
    name: "Switch",
    category: "ui",
    description: "Toggle on / off",
    install: "npx agezero-ui add switch",
    preview: (
      <div className="flex items-center gap-2">
        <span className="relative inline-block h-5 w-9 rounded-full bg-primary">
          <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
        </span>
        <span className="text-xs">Notifications</span>
      </div>
    ),
  },
  {
    name: "Slider",
    category: "ui",
    description: "Single or range value",
    install: "npx agezero-ui add slider",
    preview: (
      <div className="w-full max-w-xs">
        <div className="relative h-1 rounded-full bg-muted">
          <div className="absolute left-0 right-1/3 top-0 h-1 rounded-full bg-primary" />
          <div className="absolute right-1/3 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-primary bg-background" />
        </div>
      </div>
    ),
  },
  {
    name: "Tooltip",
    category: "ui",
    description: "Hover-revealed popover",
    install: "npx agezero-ui add tooltip",
    preview: (
      <div className="relative">
        <Button size="sm" variant="outline">Hover me</Button>
        <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 rounded-md border border-border bg-card px-2 py-0.5 text-[10px] shadow-2xl whitespace-nowrap">
          Helpful tip
        </span>
      </div>
    ),
  },
  {
    name: "Popover",
    category: "ui",
    description: "Click-revealed panel",
    install: "npx agezero-ui add popover",
    preview: (
      <div className="rounded-md border border-border bg-card p-2 text-xs shadow-2xl">
        <p className="font-medium">Filter</p>
        <div className="mt-1 space-y-1 text-[10px] text-muted-foreground">
          <label className="flex items-center gap-1"><input type="checkbox" defaultChecked /> Drafts</label>
          <label className="flex items-center gap-1"><input type="checkbox" /> Archived</label>
        </div>
      </div>
    ),
  },
  {
    name: "Combobox",
    category: "ui",
    description: "Searchable select with keyboard nav",
    install: "npx agezero-ui add combobox",
    preview: (
      <div className="w-full max-w-xs rounded-md border border-border bg-card p-2 text-xs">
        <Input placeholder="Search…" className="h-7 text-xs" />
        <div className="mt-1.5 space-y-0.5 text-[10px]">
          {["Acme Corp", "Globex", "Initech", "Stark Ind."].map((c, i) => (
            <p key={c} className={cn("rounded px-2 py-1", i === 1 ? "bg-primary/10 text-foreground" : "text-muted-foreground")}>{c}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Date Picker",
    category: "ui",
    description: "Input + popover calendar",
    install: "npx agezero-ui add date-picker",
    preview: (
      <div className="w-full max-w-xs rounded-md border border-border bg-card p-3">
        <div className="mb-1.5 text-center text-[10px] font-semibold">June 2026</div>
        <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-muted-foreground">
          {["S","M","T","W","T","F","S"].map(d => <div key={d}>{d}</div>)}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "aspect-square rounded text-[10px] grid place-items-center",
                i + 1 === 12 && "bg-primary text-primary-foreground"
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Pagination",
    category: "ui",
    description: "Page numbers with prev/next",
    install: "npx agezero-ui add pagination",
    preview: (
      <div className="flex items-center gap-1">
        <Button size="icon" variant="outline" className="size-7">‹</Button>
        <Button size="icon" variant="outline" className="size-7">1</Button>
        <Button size="icon" className="size-7">2</Button>
        <Button size="icon" variant="outline" className="size-7">3</Button>
        <span className="px-1 text-xs text-muted-foreground">…</span>
        <Button size="icon" variant="outline" className="size-7">12</Button>
        <Button size="icon" variant="outline" className="size-7">›</Button>
      </div>
    ),
  },
  {
    name: "Steps",
    category: "ui",
    description: "Stepper / progress indicator",
    install: "npx agezero-ui add steps",
    preview: (
      <div className="flex w-full max-w-xs items-center gap-2 text-[10px]">
        {["Plan", "Build", "Ship"].map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-1.5">
              <span className={cn(
                "grid size-5 place-items-center rounded-full text-[10px] font-semibold",
                i < 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>{i + 1}</span>
              <span className={i < 2 ? "font-medium text-foreground" : "text-muted-foreground"}>{s}</span>
            </div>
            {i < 2 && <div className={cn("h-px flex-1", i < 1 ? "bg-primary" : "bg-border")} />}
          </React.Fragment>
        ))}
      </div>
    ),
  },
  {
    name: "Toast",
    category: "ui",
    description: "Auto-dismissing notifications",
    install: "npx agezero-ui add toast",
    preview: (
      <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-xs w-full max-w-xs">
        <div className="flex items-start gap-2">
          <Check size={14} className="text-emerald-500" />
          <div>
            <p className="font-medium">Saved</p>
            <p className="text-[10px] text-muted-foreground">Just now</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Skeleton",
    category: "ui",
    description: "Loading placeholder",
    install: "npx agezero-ui add skeleton",
    preview: (
      <div className="space-y-2 w-full max-w-xs">
        <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    ),
  },
  {
    name: "Message",
    category: "ai",
    description: "Chat bubble with role + avatar",
    install: "npx agezero-ui add message",
    preview: (
      <div className="space-y-2 w-full max-w-xs">
        <div className="flex items-start gap-2">
          <div className="grid size-6 shrink-0 place-items-center rounded-full bg-muted text-[10px]">Y</div>
          <div className="rounded-lg border border-border bg-card px-2 py-1 text-[11px]">
            What can AgeZero UI do?
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">J</div>
          <div className="rounded-lg border border-border bg-primary/5 px-2 py-1 text-[11px]">
            32 UI primitives, 22 AI components, 18 apps.
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Prompt Input",
    category: "ai",
    description: "Auto-grow textarea + submit",
    install: "npx agezero-ui add prompt-input",
    preview: (
      <div className="w-full max-w-xs rounded-2xl border border-border bg-card p-2">
        <textarea
          placeholder="Ask anything…"
          className="w-full resize-none bg-transparent text-[11px] outline-none"
          rows={2}
          defaultValue="Write a product description for…"
        />
        <div className="mt-1 flex items-center justify-between">
          <div className="flex gap-1">
            <span className="rounded bg-muted px-1 text-[9px] text-muted-foreground">attach</span>
            <span className="rounded bg-muted px-1 text-[9px] text-muted-foreground">web</span>
          </div>
          <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
            <Send size={9} />
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "Code Block",
    category: "ai",
    description: "Lightweight syntax highlighting",
    install: "npx agezero-ui add code-block",
    preview: (
      <pre className="w-full max-w-xs overflow-x-auto rounded-md bg-zinc-950 p-2 font-mono text-[10px] text-zinc-100">
{`export function hello() {
  return "world";
}`}
      </pre>
    ),
  },
  {
    name: "Agent Card",
    category: "ai",
    description: "Agent status + description",
    install: "npx agezero-ui add agent-card",
    preview: (
      <div className="rounded-md border border-border bg-card p-2 w-full max-w-xs">
        <div className="flex items-center justify-between text-[11px]">
          <p className="font-medium">Research Agent</p>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 text-[9px]">running</Badge>
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">Finds and verifies sources.</p>
        <div className="mt-1.5 h-1 overflow-hidden rounded bg-muted">
          <div className="h-full w-2/3 animate-pulse bg-primary" />
        </div>
      </div>
    ),
  },
  {
    name: "Aurora",
    category: "block",
    description: "Animated gradient mesh",
    install: "npx agezero-ui add aurora",
    preview: (
      <div className="relative h-16 w-full overflow-hidden rounded-md">
        <Aurora colors={["#7c3aed", "#06b6d4", "#f43f5e"]} speed={6} intensity={0.6} className="absolute inset-0" />
      </div>
    ),
  },
  {
    name: "Grid Pattern",
    category: "block",
    description: "SVG grid background",
    install: "npx agezero-ui add grid-pattern",
    preview: (
      <div className="relative h-16 w-full overflow-hidden rounded-md border border-border bg-card">
        <GridPattern className="opacity-50" />
      </div>
    ),
  },
  {
    name: "Marquee",
    category: "block",
    description: "Infinite scrolling strip",
    install: "npx agezero-ui add marquee",
    preview: (
      <div className="w-full overflow-hidden rounded-md border border-border bg-card py-2">
        <div className="flex animate-marquee-left gap-4 text-[10px] font-medium">
          {["Acme", "Globex", "Initech", "Stark", "Wayne", "Umbrella"].map((c) => (
            <span key={c} className="shrink-0">{c}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Count Up",
    category: "block",
    description: "Animated number",
    install: "npx agezero-ui add count-up",
    preview: (
      <p className="text-2xl font-bold tabular-nums tracking-tight">12,847</p>
    ),
  },
  {
    name: "Tilt 3D",
    category: "block",
    description: "Mouse-tilting card",
    install: "npx agezero-ui add tilt-3d",
    preview: (
      <div className="rounded-md border border-border bg-card p-3 text-xs shadow-2xl" style={{ transform: "perspective(500px) rotateY(-12deg) rotateX(8deg)" }}>
        <p className="font-medium">Tilting card</p>
        <p className="text-[10px] text-muted-foreground">Move your mouse</p>
      </div>
    ),
  },
  {
    name: "Bento Grid",
    category: "block",
    description: "Mixed-size feature grid",
    install: "npx agezero-ui add bento",
    preview: (
      <div className="grid w-full max-w-xs grid-cols-3 gap-1.5">
        <div className="col-span-2 rounded-md bg-primary/10 p-2 text-[10px] font-medium">Big</div>
        <div className="rounded-md bg-muted p-2 text-[10px]">Sm</div>
        <div className="rounded-md bg-muted p-2 text-[10px]">Sm</div>
        <div className="col-span-2 rounded-md bg-cyan-500/10 p-2 text-[10px] font-medium">Wide</div>
      </div>
    ),
  },
  {
    name: "Logo Cloud",
    category: "block",
    description: "Row of brand names",
    install: "npx agezero-ui add logo-cloud",
    preview: (
      <div className="flex w-full max-w-xs items-center justify-between gap-2 text-[10px] font-medium text-muted-foreground">
        {["Acme", "Globex", "Initech", "Stark"].map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    ),
  },
  {
    name: "Pricing",
    category: "block",
    description: "Tiered plans",
    install: "npx agezero-ui add pricing",
    preview: (
      <div className="grid w-full max-w-xs grid-cols-2 gap-1.5">
        <div className="rounded-md border border-border p-2 text-center">
          <p className="text-[10px] font-semibold">Hobby</p>
          <p className="text-base font-bold">$0</p>
        </div>
        <div className="rounded-md border border-primary bg-primary/5 p-2 text-center ring-1 ring-primary">
          <p className="text-[10px] font-semibold">Pro</p>
          <p className="text-base font-bold">$19</p>
        </div>
      </div>
    ),
  },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: Layers, count: ITEMS.length },
  { id: "ui", label: "UI", icon: Boxes, count: ITEMS.filter((i) => i.category === "ui").length },
  { id: "ai", label: "AI", icon: Bot, count: ITEMS.filter((i) => i.category === "ai").length },
  { id: "block", label: "Blocks", icon: Layout, count: ITEMS.filter((i) => i.category === "block").length },
];

export default function BrowsePage() {
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("all");
  const [copied, setCopied] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return ITEMS.filter((it) => {
      if (cat !== "all" && it.category !== cat) return false;
      if (!q) return true;
      const needle = q.toLowerCase();
      return it.name.toLowerCase().includes(needle) || it.description.toLowerCase().includes(needle);
    });
  }, [q, cat]);

  const copy = (cmd: string, name: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <div className="relative isolate overflow-hidden border-b border-border/60">
        <Aurora
          colors={["#7c3aed", "#06b6d4", "#f43f5e"]}
          speed={20}
          intensity={0.4}
          className="absolute inset-0 -z-10"
        />
        <GridPattern className="-z-10" mask="edges" />
        <div className="mx-auto max-w-5xl px-6 py-12 text-center sm:py-16">
          <Badge variant="secondary" className="mb-3 bg-background/60 backdrop-blur">
            <Sparkles size={12} className="mr-1" /> Interactive gallery
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse all components
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Every component on one page. Click to copy the install command, search, filter by category.
          </p>
          <div className="mx-auto mt-5 max-w-md">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search components…"
                className="h-9 pl-9"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-border/60 bg-background/40 backdrop-blur sticky top-14 z-30">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 py-2">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <Icon size={12} />
                {c.label}
                <span className="rounded bg-background/50 px-1 text-[10px]">{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length} components</span>
          <span>Tip: press <kbd className="rounded border border-border bg-background px-1">⌘K</kbd> from anywhere</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((it) => (
            <Card key={it.name} className="group overflow-hidden transition-colors hover:border-primary/40">
              <div className="flex h-32 items-center justify-center bg-muted/20 p-3">
                {it.preview}
              </div>
              <CardContent className="space-y-1 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold">{it.name}</p>
                    <Badge variant="outline" className="text-[9px]">
                      {it.category}
                    </Badge>
                  </div>
                  <Link
                    href={`/components#${it.name.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`Open ${it.name} docs`}
                  >
                    <ChevronRight size={12} />
                  </Link>
                </div>
                <p className="text-[10px] leading-relaxed text-muted-foreground line-clamp-2">
                  {it.description}
                </p>
                <button
                  onClick={() => copy(it.install, it.name)}
                  className="mt-1 flex w-full items-center justify-between gap-1 rounded-md border border-border bg-background/50 px-1.5 py-1 text-left font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <span className="truncate">{it.install}</span>
                  {copied === it.name ? (
                    <Check size={10} className="shrink-0 text-emerald-500" />
                  ) : (
                    <Copy size={10} className="shrink-0" />
                  )}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="grid place-items-center py-16 text-center text-sm text-muted-foreground">
            <div>
              <Search size={24} className="mx-auto mb-2 opacity-40" />
              No components match &quot;{q}&quot; in this category.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}