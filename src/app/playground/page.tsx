import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@/components/icons";

const PLAYGROUNDS = [
  { slug: "button", name: "Button", group: "UI primitives" },
  { slug: "card", name: "Card", group: "UI primitives" },
  { slug: "input", name: "Input", group: "UI primitives" },
  { slug: "dialog", name: "Dialog", group: "UI primitives" },
  { slug: "tabs", name: "Tabs", group: "UI primitives" },
  { slug: "tooltip", name: "Tooltip", group: "UI primitives" },
  { slug: "avatar", name: "Avatar", group: "UI primitives" },
  { slug: "switch", name: "Switch", group: "UI primitives" },
  { slug: "slider", name: "Slider", group: "UI primitives" },
  { slug: "progress", name: "Progress", group: "UI primitives" },
  { slug: "sparkline", name: "Sparkline", group: "Charts" },
  { slug: "bar", name: "Bar chart", group: "Charts" },
  { slug: "donut", name: "Donut chart", group: "Charts" },
  { slug: "fade-in", name: "FadeIn", group: "Motion" },
  { slug: "streaming-text", name: "StreamingText", group: "AI" },
  { slug: "token-counter", name: "TokenCounter", group: "AI" },
  { slug: "model-selector", name: "ModelSelector", group: "AI" },
];

export const metadata = {
  title: "Component playground · AgeZero UI",
  description: "Live interactive playgrounds for every AgeZero UI component.",
};

export default function PlaygroundIndex() {
  const groups = Array.from(new Set(PLAYGROUNDS.map((p) => p.group)));
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Badge variant="secondary" className="mb-3">Playground</Badge>
      <h1 className="text-4xl font-semibold tracking-tight">Component playgrounds</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Click any component to open an interactive playground with live props, source, and copy-to-clipboard.
      </p>
      <div className="mt-10 space-y-8">
        {groups.map((g) => (
          <div key={g}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{g}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PLAYGROUNDS.filter((p) => p.group === g).map((p) => (
                <Link key={p.slug} href={`/playground/${p.slug}`}>
                  <Card className="group transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="flex items-center justify-between p-4">
                      <span className="font-medium">{p.name}</span>
                      <ArrowRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
