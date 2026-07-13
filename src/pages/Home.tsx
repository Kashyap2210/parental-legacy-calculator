import {
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/cards/Card";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

const features = [
  {
    icon: HiOutlineUserGroup,
    title: "Family Background",
    description:
      "Analyze the foundational elements that shape each parent's approach to raising a family.",
  },
  {
    icon: HiOutlineHeart,
    title: "Generational Impact",
    description:
      "Understand how life choices and values pass from one generation to the next.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Legacy Insights",
    description:
      "Visualize the cumulative influence of key factors on parental legacy scores.",
  },
];

function Home() {
  return (
    <div className="space-y-24 py-16 sm:space-y-32 sm:py-24">
      {/* ── Hero Section ── */}
      <section aria-labelledby="hero-heading">
        <Container className="text-center">
          <Badge variant="info" className="mb-6">
            Phase 2 — Design System
          </Badge>

          <h1
            id="hero-heading"
            className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            Parental Legacy
            <span className="text-primary-600"> Calculator</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Explore how family background, life choices, and key factors shape
            parental legacy across generations. A data-driven approach to
            understanding intergenerational influence.
          </p>
        </Container>
      </section>

      {/* ── Features Section ── */}
      <section aria-labelledby="features-heading">
        <Container>
          <SectionTitle
            title="How It Works"
            description="Three pillars of analysis that drive the legacy calculation model."
            align="center"
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                variant="elevated"
                padding="lg"
                className="group transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Calculator Placeholder ── */}
      <section aria-labelledby="calculator-heading">
        <Container>
          <SectionTitle
            title="Legacy Calculator"
            description="Enter family details to generate a personalized legacy score analysis."
            className="mb-8"
          />

          <Card variant="outlined" padding="lg">
            <EmptyState
              message="Calculator coming in Phase 3"
              description="The legacy calculator form will be implemented in the next phase. This section will include date pickers, family background inputs, and scoring parameters."
            />
          </Card>
        </Container>
      </section>
    </div>
  );
}

export default Home;
