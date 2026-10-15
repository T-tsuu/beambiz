import type { Metadata } from "next";
import LegalPage, { LegalLink, LegalList } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Beam",
  description:
    "How Beam Systems Inc collects, uses, and protects data when you run pricing experiments with Beam.",
};

const CONTACT_EMAIL = "privacy@beam.example";

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      summary="This policy explains what data Beam collects, why we collect it, and the choices you have. It covers visitors to our website and customers who run pricing experiments with us."
      updated="15 October 2026"
      sections={[
        {
          id: "overview",
          heading: "Overview",
          content: (
            <>
              <p>
                Beam is a pricing experimentation platform operated by Beam Systems
                Inc. (&ldquo;Beam&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). We help
                teams split traffic across pricing variants, measure revenue instead of
                clicks, and decide which price to ship.
              </p>
              <p>
                We keep this document deliberately short on jargon. If anything here is
                unclear, email us at{" "}
                <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>{" "}
                and a human will answer.
              </p>
              <p>
                Beam acts as a <strong>processor</strong> for the visitor data that runs
                through your experiments, and as a <strong>controller</strong> for your
                account and the data we collect about our own website. If you need a
                signed Data Processing Agreement (DPA), we offer one to every customer.
              </p>
            </>
          ),
        },
        {
          id: "data-we-collect",
          heading: "Data we collect",
          content: (
            <>
              <p>We collect three kinds of data:</p>
              <LegalList
                items={[
                  <>
                    <strong>Account data.</strong> Name, work email, company, and
                    billing details you provide when you sign up or purchase a plan.
                  </>,
                  <>
                    <strong>Experiment data.</strong> The page URLs, variants, pricing
                    values, metrics, and revenue events you configure or send us through
                    our SDK, API, or integrations.
                  </>,
                  <>
                    <strong>Usage and device data.</strong> IP address, browser and
                    device type, referring pages, and product interactions, collected
                    when you use the dashboard or our website.
                  </>,
                ]}
              />
              <p>
                We do not ask for or intentionally collect special categories of
                personal data, and our service is not designed to process them.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use",
          heading: "How we use data",
          content: (
            <>
              <p>We use the data described above to:</p>
              <LegalList
                items={[
                  "Provide, operate, and secure the Beam service;",
                  "Run the statistical analysis behind your experiments and surface results, guardrails, and recommendations;",
                  "Authenticate your account and send transactional messages such as magic links, receipts, and incident notices;",
                  "Detect abuse, fraud, and security incidents;",
                  "Understand which features are used so we can improve the product;",
                  "Comply with legal, tax, and accounting obligations.",
                ]}
              />
              <p>
                We rely on contract performance to deliver the service, legitimate
                interests to secure and improve it, and consent where required — for
                example, for optional product analytics or marketing email. You can
                withdraw consent at any time.
              </p>
              <p>
                <strong>We do not sell your personal data, and we do not use the
                contents of your experiments to train advertising models.</strong>
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          heading: "Cookies and tracking",
          content: (
            <>
              <p>
                We use a small number of first-party cookies and similar storage to keep
                you signed in, remember your billing preferences, and protect against
                cross-site request forgery. These are strictly necessary and cannot be
                turned off without breaking the product.
              </p>
              <p>
                Optional product analytics on our own website only load after you
                consent, and you can change your choice from the cookie banner at any
                time. Variant assignment for your end users is handled with a
                first-party cookie or an edge-computed hash — never with third-party
                advertising cookies.
              </p>
            </>
          ),
        },
        {
          id: "subprocessors",
          heading: "Sub-processors",
          content: (
            <>
              <p>
                We use a short list of vetted vendors to run Beam. Each one is bound by
                a data processing agreement and only receives the data it needs:
              </p>
              <LegalList
                items={[
                  <>
                    <strong>Supabase</strong> — authentication and database hosting.
                  </>,
                  <>
                    <strong>Vercel</strong> — application hosting, edge delivery, and CDN.
                  </>,
                  <>
                    <strong>Stripe</strong> — payment processing and billing.
                  </>,
                  <>
                    <strong>Resend</strong> — transactional email delivery.
                  </>,
                  <>
                    <strong>Slack</strong> — guardrail and experiment alerts you opt into.
                  </>,
                ]}
              />
              <p>
                We give customers at least 30 days&rsquo; notice before adding a new
                sub-processor that touches personal data, so you have time to object.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          heading: "How long we keep data",
          content: (
            <>
              <p>
                Account data is kept for as long as your account is active and for a
                limited period afterwards to meet legal and accounting obligations.
                Experiment and event data is retained according to the history window on
                your plan, and deleted on request or when you close your account.
              </p>
              <p>
                Aggregated results that cannot identify a person may be retained
                longer, because they no longer constitute personal data.
              </p>
            </>
          ),
        },
        {
          id: "security",
          heading: "Security",
          content: (
            <>
              <p>
                Data is encrypted in transit with TLS and at rest in our managed
                database. Access to production systems is restricted, logged, and
                requires multi-factor authentication. We run regular backups and review
                our vendors&rsquo; security posture at least annually.
              </p>
              <p>
                If a breach affects your personal data, we will notify you and the
                relevant supervisory authority without undue delay and within the
                timeframes the law requires.
              </p>
            </>
          ),
        },
        {
          id: "rights",
          heading: "Your rights",
          content: (
            <>
              <p>
                Depending on where you live, you may have the right to access, correct,
                delete, port, or restrict the processing of your personal data, and to
                object to processing based on legitimate interests. You can exercise most
                of these directly from the portal, or by emailing us.
              </p>
              <p>
                If you are an end user of one of our customers&rsquo; experiments, the
                customer is the controller for that data. Contact them first; we will
                support their request. You can also lodge a complaint with your local
                data protection authority.
              </p>
            </>
          ),
        },
        {
          id: "international-transfers",
          heading: "International transfers",
          content: (
            <>
              <p>
                Beam is headquartered in the United States, and some of our vendors
                process data there. When personal data leaves the EEA, the UK, or
                Switzerland, we rely on the European Commission&rsquo;s Standard
                Contractual Clauses and, where applicable, the UK Addendum, together with
                additional technical measures such as encryption.
              </p>
            </>
          ),
        },
        {
          id: "children",
          heading: "Children",
          content: (
            <p>
              Beam is a business tool and is not directed to children under 16. We do
              not knowingly collect personal data from them. If you believe a child has
              provided us data, contact us and we will delete it.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          content: (
            <p>
              We may update this policy as the product and the law evolve. When we make
              a material change we will update the date at the top of this page and, for
              account holders, notify you by email or in the dashboard before it takes
              effect.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact us",
          content: (
            <>
              <p>
                Questions, requests, or objections can be sent to{" "}
                <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
                For privacy matters you can also write to Beam Systems Inc., Attn:
                Privacy, and we will respond within 30 days.
              </p>
              <p>
                See also our <LegalLink href="/terms">Terms of Service</LegalLink>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
