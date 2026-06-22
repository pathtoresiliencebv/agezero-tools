"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import {
  ButtonPlayground,
  CardPlayground,
  DialogPlayground,
  InputPlayground,
  SelectPlayground,
  TabsPlayground,
  TooltipPlayground,
  AvatarPlayground,
  SwitchPlayground,
  SliderPlayground,
  ProgressPlayground,
  SparklinePlayground,
  BarPlayground,
  DonutPlayground,
  FadeInPlayground,
  StreamingTextPlayground,
  TokenCounterPlayground,
  ModelSelectorPlayground,
  CitationPlayground,
  GlowCardPlayground,
  Tilt3DPlayground,
  MagneticPlayground,
  AnimatedNumberPlayground,
  ScrollProgressPlayground,
  ParallaxPlayground,
  ConfettiPlayground,
} from "@/components/playground";

type PlaygroundEntry = {
  title: string;
  group: "ui" | "ai" | "charts" | "motion" | "blocks";
  Playground: React.ComponentType;
};

const playgroundRegistry: Record<string, PlaygroundEntry> = {
  button: { title: "Button", group: "ui", Playground: ButtonPlayground },
  card: { title: "Card", group: "ui", Playground: CardPlayground },
  dialog: { title: "Dialog", group: "ui", Playground: DialogPlayground },
  input: { title: "Input", group: "ui", Playground: InputPlayground },
  select: { title: "Select", group: "ui", Playground: SelectPlayground },
  tabs: { title: "Tabs", group: "ui", Playground: TabsPlayground },
  tooltip: { title: "Tooltip", group: "ui", Playground: TooltipPlayground },
  avatar: { title: "Avatar", group: "ui", Playground: AvatarPlayground },
  switch: { title: "Switch", group: "ui", Playground: SwitchPlayground },
  slider: { title: "Slider", group: "ui", Playground: SliderPlayground },
  progress: { title: "Progress", group: "ui", Playground: ProgressPlayground },
  sparkline: { title: "Sparkline", group: "charts", Playground: SparklinePlayground },
  bar: { title: "Bar", group: "charts", Playground: BarPlayground },
  donut: { title: "Donut", group: "charts", Playground: DonutPlayground },
  "fade-in": { title: "FadeIn", group: "motion", Playground: FadeInPlayground },
  "streaming-text": { title: "StreamingText", group: "ai", Playground: StreamingTextPlayground },
  "token-counter": { title: "TokenCounter", group: "ai", Playground: TokenCounterPlayground },
  "model-selector": { title: "ModelSelector", group: "ai", Playground: ModelSelectorPlayground },
  citation: { title: "Citation", group: "ai", Playground: CitationPlayground },
  "glow-card": { title: "GlowCard", group: "motion", Playground: GlowCardPlayground },
  "tilt-3d": { title: "Tilt3D", group: "motion", Playground: Tilt3DPlayground },
  magnetic: { title: "Magnetic", group: "motion", Playground: MagneticPlayground },
  "animated-number": { title: "AnimatedNumber", group: "blocks", Playground: AnimatedNumberPlayground },
  "scroll-progress": { title: "ScrollProgress", group: "blocks", Playground: ScrollProgressPlayground },
  parallax: { title: "Parallax", group: "blocks", Playground: ParallaxPlayground },
  confetti: { title: "Confetti", group: "blocks", Playground: ConfettiPlayground },
};

export default function PlaygroundPage() {
  const params = useParams<{ component: string }>();
  const slug = (params?.component ?? "").toLowerCase();
  const entry = playgroundRegistry[slug];
  const { copied, copy } = useCopyToClipboard();

  if (!entry) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Badge variant="secondary" className="mb-3">404</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          No playground for <code className="text-primary">{slug}</code>
        </h1>
        <p className="mt-2 text-muted-foreground">
          We haven&apos;t built a playground for that component yet. Try one of
          the ones below.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Object.entries(playgroundRegistry)
            .slice(0, 12)
            .map(([s, e]) => (
              <Button key={s} asChild size="sm" variant="outline">
                <Link href={`/playground/${s}`}>{e.title}</Link>
              </Button>
            ))}
        </div>
      </div>
    );
  }

  const { title, group, Playground } = entry;
  const importPath = `import { ${title} } from "@/components/${group === "ui" ? "ui" : group === "ai" ? "ai" : group === "charts" ? "charts" : "blocks"}/${title.toLowerCase()}"`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{group}</Badge>
            <Badge variant="outline">Playground</Badge>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/${group === "ui" ? "components" : group === "ai" ? "ai" : group === "motion" ? "motion" : "showcase"}`}>
            ← Back to {group}
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="play" className="mt-8">
        <TabsList>
          <TabsTrigger value="play">Play</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="play">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Live</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[260px] items-center justify-center rounded-md border border-dashed border-border bg-background/50 p-8">
                <Playground />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Import</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-3 text-xs">
                <code>{importPath}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => copy(importPath)}
              >
                {copied ? "Copied!" : "Copy import"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}