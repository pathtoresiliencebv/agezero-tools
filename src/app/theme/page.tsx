"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { themes, themeNames } from "@/lib/themes";

const ROLES = [
  { key: "--background", label: "Background" },
  { key: "--foreground", label: "Foreground" },
  { key: "--card", label: "Card" },
  { key: "--primary", label: "Primary" },
  { key: "--primary-foreground", label: "Primary fg" },
  { key: "--muted", label: "Muted" },
  { key: "--muted-foreground", label: "Muted fg" },
  { key: "--border", label: "Border" },
  { key: "--ring", label: "Ring" },
] as const;

export default function ThemeBuilderPage() {
  const [activeTheme, setActiveTheme] = React.useState<string>("default");
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [overrides, setOverrides] = React.useState<Record<string, string>>({});
  const { copied, copy } = useCopyToClipboard();

  // Compute the current value for a role: override → theme default.
  const current = React.useCallback(
    (key: string) => {
      if (overrides[key]) return overrides[key];
      const palette = themes[activeTheme] ?? themes.default!;
      return (palette[mode] as Record<string, string>)[key] ?? "oklch(0.5 0 0)";
    },
    [overrides, activeTheme, mode]
  );

  // Apply active theme + mode by setting data attributes + CSS vars on <html>.
  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = activeTheme;
    root.classList.toggle("dark", mode === "dark");
    const palette = themes[activeTheme] ?? themes.default!;
    const tokens = palette[mode] as Record<string, string>;
    for (const [k, v] of Object.entries(tokens)) {
      if (!overrides[k]) root.style.setProperty(k, v);
    }
    for (const [k, v] of Object.entries(overrides)) {
      if (v) root.style.setProperty(k, v);
    }
  }, [activeTheme, mode, overrides]);

  const exportCss = React.useMemo(() => {
    const palette = themes[activeTheme] ?? themes.default!;
    const tokens = { ...(palette[mode] as Record<string, string>), ...overrides };
    const lines = [
      `/* AgeZero UI — ${activeTheme} (${mode}) */`,
      `:root {`,
      ...ROLES.map((r) => `  ${r.key}: ${tokens[r.key] ?? "oklch(0.5 0 0)"};`),
      `}`,
    ];
    return lines.join("\n");
  }, [activeTheme, mode, overrides]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge variant="secondary" className="mb-3">
            Theme builder
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Tune your colors.
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Pick a preset, switch between light and dark, and tweak any
            token by hand. The CSS snippet on the right drops straight
            into your <code className="rounded bg-muted px-1.5 py-0.5 text-xs">globals.css</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-md border border-border bg-card p-0.5 text-xs">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-sm px-2.5 py-1 transition-colors",
                  mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Preset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {themeNames.map((t) => {
                  const palette = themes[t]![mode] as Record<string, string>;
                  return (
                    <button
                      key={t}
                      onClick={() => {
                        setActiveTheme(t);
                        setOverrides({});
                      }}
                      className={cn(
                        "group flex flex-col items-start gap-2 rounded-md border p-2 text-left transition-colors",
                        "hover:border-primary/40",
                        activeTheme === t
                          ? "border-primary shadow-[0_0_0_1px_theme(colors.primary.DEFAULT)]"
                          : "border-border"
                      )}
                    >
                      <div className="flex h-10 w-full overflow-hidden rounded">
                        <div
                          className="h-full flex-1"
                          style={{ background: palette["--primary"] }}
                        />
                        <div
                          className="h-full flex-1"
                          style={{ background: palette["--background"] }}
                        />
                        <div
                          className="h-full flex-1"
                          style={{ background: palette["--muted"] }}
                        />
                      </div>
                      <span className="text-xs font-medium capitalize">
                        {t}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {ROLES.map((r) => {
                  const value = current(r.key);
                  return (
                    <div
                      key={r.key}
                      className="flex items-center gap-2 rounded-md border border-border bg-card p-2"
                    >
                      <span
                        aria-hidden
                        className="size-8 shrink-0 rounded border border-border"
                        style={{ background: value }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">
                            {r.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {r.key}
                          </span>
                        </div>
                        <input
                          value={value}
                          onChange={(e) =>
                            setOverrides((o) => ({ ...o, [r.key]: e.target.value }))
                          }
                          className="mt-1 w-full rounded-sm border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Live preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="text-xs text-muted-foreground">Primary</div>
                  <div className="mt-1 text-lg font-semibold text-primary">
                    Headline
                  </div>
                </div>
                <div className="rounded-md border border-border bg-muted p-3">
                  <div className="text-xs text-muted-foreground">Muted</div>
                  <div className="mt-1 text-lg font-semibold text-foreground">
                    Headline
                  </div>
                </div>
                <div className="rounded-md border border-border bg-primary p-3">
                  <div className="text-xs text-primary-foreground/80">Inverse</div>
                  <div className="mt-1 text-lg font-semibold text-primary-foreground">
                    Headline
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">globals.css</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-[11px] leading-relaxed">
                <code>{exportCss}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 w-full"
                onClick={() => copy(exportCss)}
              >
                {copied ? "Copied!" : "Copy CSS"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}