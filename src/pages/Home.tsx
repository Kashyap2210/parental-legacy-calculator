import { useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineScale,
  HiOutlineArrowTrendingUp,
  HiOutlineClock,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/cards/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/forms/Input";
import StatCard from "@/components/cards/StatCard";
import Button from "@/components/ui/Button";
import ChartsSection from "@/components/charts/ChartsSection";
import { useCalculator } from "@/hooks/useCalculator";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatTimestamp } from "@/utils/date";

function Home() {
  const calculator = useCalculator();
  const storage = useLocalStorage();

  const { selectedDate, results, errors, handleDateChange, reset } = calculator;
  const {
    storedCalculation,
    loading: storageLoading,
    load: loadStorage,
    save: saveStorage,
    clear: clearStorage,
  } = storage;

  const dateError = errors.length > 0 ? errors[0].message : undefined;

  useEffect(() => {
    if (storageLoading) return;

    const saved = loadStorage();

    if (saved) {
      handleDateChange(saved.dob);
    }
  }, [storageLoading, loadStorage, handleDateChange]);

  useEffect(() => {
    if (selectedDate && results) {
      saveStorage(selectedDate);
    }
  }, [selectedDate, results, saveStorage]);

  const handleReset = () => {
    reset();
    clearStorage();
  };

  return (
    <div className="space-y-16 py-12 sm:space-y-24 sm:py-20">
      {/* ── Hero Section ── */}
      <section aria-labelledby="hero-heading">
        <Container className="text-center">
          <Badge variant="info" className="mb-6">
            Legacy Calculator
          </Badge>

          <h1
            id="hero-heading"
            className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-text sm:text-5xl"
          >
            Parental Legacy
            <span className="text-primary-600"> Calculator</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            Enter a date of birth to generate a deterministic legacy report.
            Explore how family background, life choices, and key factors shape
            parental legacy across generations.
          </p>
        </Container>
      </section>

      {/* ── Calculator Section ── */}
      <section aria-labelledby="calculator-heading">
        <Container>
          <SectionTitle
            id="calculator-heading"
            title="Legacy Calculator"
            description="Select a date of birth to calculate the legacy report."
            className="mb-8"
          />

          <Card variant="outlined" padding="lg">
            <div className="max-w-md">
              <Input
                type="date"
                label="Date of Birth"
                description="Choose a valid date of birth to generate the report."
                required
                value={selectedDate}
                error={dateError}
                onChange={(e) => handleDateChange(e.target.value)}
                aria-describedby={dateError ? "date-error" : "date-description"}
              />
            </div>
          </Card>
        </Container>
      </section>

      {/* ── Results Section ── */}
      {results && (
        <section aria-labelledby="results-heading">
          <Container>
            <SectionTitle
              id="results-heading"
              title="Results"
              description="Breakdown of life factors by parental influence."
              className="mb-8"
            />

            <Card variant="default" padding="none" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    Factor breakdown by parental influence
                  </caption>
                  <thead>
                    <tr className="border-b border-border bg-surface-muted">
                      <th
                        scope="col"
                        className="px-6 py-3 font-semibold text-text"
                      >
                        Factor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right font-semibold text-primary-600"
                      >
                        Mother
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right font-semibold text-secondary-600"
                      >
                        Father
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right font-semibold text-text"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.factors.map((factor, index) => (
                      <tr
                        key={factor.id}
                        className={
                          index < results.factors.length - 1
                            ? "border-b border-border"
                            : undefined
                        }
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-text"
                        >
                          {factor.label}
                        </th>
                        <td className="px-6 py-4 text-right tabular-nums text-primary-600">
                          {factor.mother.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums text-secondary-600">
                          {factor.father.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums text-text-secondary">
                          {factor.total.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </Container>
        </section>
      )}

      {/* ── Summary Section ── */}
      {results && (
        <section aria-labelledby="summary-heading">
          <Container>
            <SectionTitle
              id="summary-heading"
              title="Summary"
              description="Aggregated legacy totals and dominant parental influence."
              className="mb-8"
            />

            <div aria-live="polite">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  title="Mother Total"
                  value={results.totals.mother.toFixed(3)}
                  icon={<HiOutlineUser />}
                  accentColor="primary"
                />
                <StatCard
                  title="Father Total"
                  value={results.totals.father.toFixed(3)}
                  icon={<HiOutlineUser />}
                  accentColor="secondary"
                />
                <StatCard
                  title="Grand Total"
                  value={results.totals.grand.toFixed(3)}
                  icon={<HiOutlineUsers />}
                  accentColor="neutral"
                />
                <StatCard
                  title="Dominant Parent"
                  value={
                    results.dominantParent === "mother" ? "Mother" : "Father"
                  }
                  icon={<HiOutlineScale />}
                  accentColor={
                    results.dominantParent === "mother"
                      ? "primary"
                      : "secondary"
                  }
                />
                <StatCard
                  title="Difference"
                  value={results.totals.difference.toFixed(3)}
                  icon={<HiOutlineArrowTrendingUp />}
                  accentColor="neutral"
                />
                {storedCalculation && (
                  <StatCard
                    title="Last Calculated"
                    value={formatTimestamp(storedCalculation.timestamp)}
                    icon={<HiOutlineClock />}
                    accentColor="neutral"
                  />
                )}
              </div>

              {storedCalculation && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    aria-label="Reset calculator and clear saved session"
                  >
                    <HiOutlineArrowPath
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Start Over
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ── Charts Section ── */}
      <Container>
        <ChartsSection results={results} />
      </Container>
    </div>
  );
}

export default Home;
