import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — CyberSpace Digital",
  description:
    "The terms and conditions that govern your use of the CyberSpace Digital website and services.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of terms",
    body: [
      "These Terms of Service (\"Terms\") govern your access to and use of the CyberSpace Digital website and any services we provide (collectively, the \"Services\"). By accessing our website or engaging our Services, you agree to be bound by these Terms.",
      "If you are entering into these Terms on behalf of a company or other organisation, you represent that you have the authority to bind that entity.",
    ],
  },
  {
    id: "use-of-services",
    heading: "Use of our services",
    body: [
      "You agree to use our website and Services only for lawful purposes and in accordance with these Terms. You may not use them in any way that could damage, disable, overburden, or impair our systems, or interfere with any other party's use.",
      "We reserve the right to refuse service, suspend access, or remove content at our discretion where these Terms are breached.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: [
      "The website, its content, design, and all related trademarks and materials are owned by or licensed to CyberSpace Digital and are protected by applicable intellectual-property laws. Nothing in these Terms grants you a right to use our branding or content without our prior written permission.",
    ],
  },
  {
    id: "client-work",
    heading: "Client engagements & deliverables",
    body: [
      "Services provided to clients are governed by a separate written agreement or statement of work, which sets out scope, fees, timelines, and ownership of deliverables. Where these Terms and a signed engagement agreement conflict, the engagement agreement controls.",
      "Unless otherwise agreed in writing, ownership of final deliverables transfers to the client upon full payment. We retain the right to display completed work in our portfolio and marketing materials unless confidentiality is agreed.",
    ],
  },
  {
    id: "payment",
    heading: "Fees & payment",
    body: [
      "Fees for Services are set out in the applicable proposal or engagement agreement. Unless stated otherwise, invoices are due within the period specified on the invoice. Late payments may be subject to a reasonable interest charge and may result in suspension of work.",
    ],
  },
  {
    id: "warranties",
    heading: "Disclaimers",
    body: [
      "Our website is provided on an \"as is\" and \"as available\" basis without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, CyberSpace Digital will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of your use of the website or Services.",
      "Our total liability for any claim arising out of or relating to these Terms will not exceed the amount you paid to us, if any, for the Services giving rise to the claim.",
    ],
  },
  {
    id: "indemnification",
    heading: "Indemnification",
    body: [
      "You agree to indemnify and hold harmless CyberSpace Digital and its team from any claims, damages, liabilities, and expenses arising out of your breach of these Terms or your misuse of the website or Services.",
    ],
  },
  {
    id: "termination",
    heading: "Termination",
    body: [
      "We may suspend or terminate your access to the website at any time, without notice, if you breach these Terms. Provisions that by their nature should survive termination — including intellectual property, disclaimers, and limitation of liability — will continue to apply.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of Mexico, without regard to its conflict-of-law principles. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the competent courts located in Mexico.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may revise these Terms from time to time. When we do, we will update the \"Last updated\" date above. Your continued use of the website after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      "If you have questions about these Terms, contact us at legal@cyberspace.mx.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal — Terms"
      title="Terms of Service"
      updated="July 16, 2026"
      intro="These terms set out the rules for using our website and working with us. Please read them carefully."
      sections={sections}
    />
  );
}
