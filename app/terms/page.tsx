import type { Metadata } from "next";
import LegalPage, { LegalLink, LegalList } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Beam",
  description:
    "The terms that govern your use of Beam, the pricing experimentation platform operated by Beam Systems Inc.",
};

const CONTACT_EMAIL = "legal@beam.example";

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      summary="These terms govern your access to and use of Beam. By creating an account or running an experiment with us, you agree to them, so please read them carefully."
      updated="15 October 2026"
      sections={[
        {
          id: "acceptance",
          heading: "Agreement to these terms",
          content: (
            <>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement
                between you and Beam Systems Inc. (&ldquo;Beam&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;) covering your use of the Beam
                website, dashboard, SDKs, and APIs (together, the
                &ldquo;Service&rdquo;).
              </p>
              <p>
                If you accept these Terms on behalf of an organization, you confirm that
                you have authority to bind that organization. If you do not agree to
                these Terms, do not use the Service.
              </p>
            </>
          ),
        },
        {
          id: "accounts",
          heading: "Accounts and eligibility",
          content: (
            <>
              <p>
                You must be at least 16 years old and able to enter into a contract to
                use Beam. You agree to provide accurate account information, keep your
                credentials secure, and promptly notify us of any unauthorized use.
              </p>
              <p>
                You are responsible for everything that happens under your account,
                including activity by teammates you invite. Seats are unlimited on paid
                plans, but you remain accountable for your users&rsquo; compliance with
                these Terms.
              </p>
            </>
          ),
        },
        {
          id: "acceptable-use",
          heading: "Acceptable use",
          content: (
            <>
              <p>You agree not to misuse the Service. In particular, you will not:</p>
              <LegalList
                items={[
                  "Run experiments intended to deceive visitors, cloak content from crawlers, or serve different prices to protected classes in violation of applicable law;",
                  "Collect or process personal data you have no lawful basis to handle;",
                  "Reverse engineer, resell, or attempt to extract the source code of the Service except as permitted by law;",
                  "Probe, scan, or otherwise attempt to breach our security or that of any third party;",
                  "Introduce malware, or use the Service to send spam or unlawful communications;",
                  "Exceed documented rate limits or otherwise interfere with the Service for other customers.",
                ]}
              />
              <p>
                We may suspend or terminate access if we reasonably believe your use
                creates legal, security, or operational risk.
              </p>
            </>
          ),
        },
        {
          id: "billing",
          heading: "Plans, billing, and trials",
          content: (
            <>
              <p>
                Paid plans are billed in advance on a recurring basis — monthly or
                annually, depending on the option you choose — and renew automatically
                until cancelled. All prices exclude applicable taxes, which we add at
                checkout where required.
              </p>
              <p>
                New accounts receive a 14-day free trial with no card required. You can
                cancel any time from the dashboard; cancellation stops future renewals
                but does not refund the current period, except where the law requires it
                or where our 30-day money-back promise applies.
              </p>
              <p>
                We may change prices with at least 30 days&rsquo; notice before your next
                renewal. If you continue to use the Service after a price change takes
                effect, you accept the new price.
              </p>
            </>
          ),
        },
        {
          id: "customer-data",
          heading: "Your data and experiments",
          content: (
            <>
              <p>
                You own the data you put into Beam and the experiment configuration you
                create. We process that data as your processor and only as needed to
                provide and secure the Service, as described in our{" "}
                <LegalLink href="/privacy">Privacy Policy</LegalLink>.
              </p>
              <p>
                You are responsible for having a lawful basis to collect the visitor and
                revenue data you send us, and for disclosing your experiments and
                tracking to your end users where the law requires it. You grant us a
                limited licence to host and process your data so we can operate the
                Service.
              </p>
            </>
          ),
        },
        {
          id: "intellectual-property",
          heading: "Intellectual property",
          content: (
            <>
              <p>
                The Service, including its software, design, and documentation, is owned
                by Beam and its licensors and is protected by intellectual property
                laws. We grant you a non-exclusive, non-transferable right to use the
                Service during your subscription, subject to these Terms.
              </p>
              <p>
                We welcome feedback, but you agree we may use it without obligation or
                compensation. Machine-readable results and reports you export from Beam
                remain yours to use freely.
              </p>
            </>
          ),
        },
        {
          id: "third-party-services",
          heading: "Third-party services",
          content: (
            <p>
              The Service integrates with third parties such as your warehouse, payment
              provider, or messaging tools. Those services are governed by their own
              terms, and we are not responsible for them. Enabling an integration may
              grant it access to data you choose to share — review your configuration
              before turning it on.
            </p>
          ),
        },
        {
          id: "availability",
          heading: "Service availability and support",
          content: (
            <>
              <p>
                We work hard to keep Beam online and publish a status page for incidents.
                Support is available to all customers, and Scale plans include a 99.99%
                uptime target together with a dedicated experimentation lead.
              </p>
              <p>
                We may perform scheduled maintenance and will aim to give advance notice
                for anything that affects availability. From time to time we release
                features in beta; those are provided as-is and may change or be removed.
              </p>
            </>
          ),
        },
        {
          id: "termination",
          heading: "Term and termination",
          content: (
            <>
              <p>
                These Terms apply while your account is active. You may terminate at any
                time by cancelling your plan and closing your account. We may suspend or
                terminate the Service if you materially breach these Terms and do not
                cure the breach within 30 days of notice, or immediately for serious
                breaches such as unlawful use or security threats.
              </p>
              <p>
                On termination, your right to use the Service ends. We will make your
                data available for export for 30 days, after which it is deleted subject
                to our retention obligations.
              </p>
            </>
          ),
        },
        {
          id: "warranties",
          heading: "Disclaimers",
          content: (
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;.
              To the maximum extent permitted by law, we disclaim all implied warranties,
              including merchantability, fitness for a particular purpose, and
              non-infringement. Beam surfaces statistical results, but the business
              decision to change a price — and its outcome — remains yours. We do not
              warrant any particular revenue, conversion, or profit result.
            </p>
          ),
        },
        {
          id: "liability",
          heading: "Limitation of liability",
          content: (
            <>
              <p>
                To the maximum extent permitted by law, neither party is liable for
                indirect, incidental, special, or consequential damages, or for lost
                profits, revenue, or data, even if advised of the possibility.
              </p>
              <p>
                Our total aggregate liability arising out of or relating to these Terms is
                limited to the fees you paid for the Service in the 12 months before the
                event giving rise to the claim. Nothing in these Terms limits liability
                that cannot be limited by law.
              </p>
            </>
          ),
        },
        {
          id: "governing-law",
          heading: "Governing law and disputes",
          content: (
            <p>
              These Terms are governed by the laws of the State of Delaware, without
              regard to its conflict-of-law rules. The parties will attempt to resolve
              disputes informally first, and agree to the exclusive jurisdiction of the
              state and federal courts located in Delaware for any dispute that cannot be
              resolved informally.
            </p>
          ),
        },
        {
          id: "changes-to-terms",
          heading: "Changes to these terms",
          content: (
            <p>
              We may update these Terms from time to time. If we make a material change,
              we will update the date above and notify account holders before it takes
              effect. Continuing to use the Service after a change means you accept the
              updated Terms.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact us",
          content: (
            <>
              <p>
                Questions about these Terms can be sent to{" "}
                <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
                For how we handle personal data, see our{" "}
                <LegalLink href="/privacy">Privacy Policy</LegalLink>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
