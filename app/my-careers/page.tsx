import type { Metadata } from "next";
import { Footer } from "@/components/footer/Footer";
import { HireSphereHandoff } from "@/components/hiresphere/HireSphereHandoff";
import { SavedJobsList } from "@/components/jobs/SavedJobsList";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/navigation/Header";
import { routes } from "@/data/navigation";
import { hiringPlatform } from "@/data/site";

export const metadata: Metadata = {
  title: "My Careers — RIL Careers",
  description: "Saved opportunities, applications and candidate profile.",
};

export default function MyCareersPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <div className="bg-background-muted">
          <Container className="pt-28 pb-16 md:pt-36 md:pb-20">
            <div className="mx-auto max-w-3xl">
              <HireSphereHandoff
                eyebrow="Candidate account"
                title="My Careers"
                continueLabel="Continue to My Careers"
                destination={hiringPlatform.accountUrl}
                back={{ href: routes.jobs, label: "Find jobs instead" }}
              >
                <p>
                  Your saved opportunities, applications and candidate profile will be managed through{" "}
                  {hiringPlatform.name}.
                </p>
              </HireSphereHandoff>
            </div>
          </Container>
        </div>

        <section aria-labelledby="saved-title" className="py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-5xl">
              <h2 id="saved-title" className="text-h3 text-primary">
                Saved on this device
              </h2>
              <p className="mt-2 text-body text-text-muted">
                A prototype preview. Once connected, saved roles will sync with your {hiringPlatform.name} profile.
              </p>
              <div className="mt-8">
                <SavedJobsList />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
