import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — CyberSpace Digital",
  description:
    "How CyberSpace Digital collects, uses, and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    id: "introduction",
    heading: "Introduction",
    body: [
      "This Privacy Policy explains how CyberSpace Digital (\"CyberSpace Digital\", \"we\", \"us\", or \"our\") collects, uses, shares, and protects information about you when you visit our website, contact us, or engage us for services.",
      "By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our website or services.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    body: [
      "Information you provide directly: When you submit our contact form, request a proposal, or otherwise correspond with us, we collect the details you share — such as your name, email address, company, and the contents of your message.",
      "Information collected automatically: Like most websites, we automatically collect certain technical information, including your IP address, browser type, device information, referring pages, and how you interact with our site. This is gathered through cookies and similar technologies.",
      "Information from third parties: We may receive information from analytics providers and other service partners that help us operate and improve our website.",
    ],
  },
  {
    id: "how-we-use-information",
    heading: "How we use your information",
    body: [
      "We use the information we collect to respond to your inquiries, provide and deliver our services, operate and improve our website, communicate with you about projects and updates, and comply with our legal obligations.",
      "We do not sell your personal information. We process it only for the purposes described in this policy or as otherwise permitted by law.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies & tracking technologies",
    body: [
      "We use cookies and similar technologies to remember your preferences, understand how our site is used, and improve your experience. You can control cookies through your browser settings, though disabling them may affect how the site functions.",
      "Where required by law, we ask for your consent before setting non-essential cookies.",
    ],
  },
  {
    id: "sharing",
    heading: "How we share information",
    body: [
      "We share information only with trusted service providers who perform functions on our behalf — such as hosting, analytics, and email delivery — and who are bound to protect it.",
      "We may also disclose information where required to comply with applicable law, enforce our agreements, or protect the rights, property, and safety of CyberSpace Digital, our clients, or others. In the event of a merger, acquisition, or sale of assets, information may be transferred as part of that transaction.",
    ],
  },
  {
    id: "data-retention",
    heading: "Data retention",
    body: [
      "We retain personal information for as long as necessary to fulfil the purposes described in this policy, to satisfy our legal and contractual obligations, and to resolve disputes. When information is no longer needed, we securely delete or anonymise it.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "Depending on your location, you may have rights to access, correct, update, or delete the personal information we hold about you, to object to or restrict certain processing, and to withdraw consent where processing is based on it.",
      "To exercise any of these rights, contact us using the details below. We will respond in accordance with applicable data-protection law.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "We maintain reasonable administrative, technical, and organisational measures designed to protect your information against unauthorised access, loss, or misuse. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "childrens-privacy",
    heading: "Children's privacy",
    body: [
      "Our website and services are intended for a business audience and are not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us so we can remove it.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. When we do, we will revise the \"Last updated\" date above. We encourage you to review this page periodically.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      "If you have questions about this Privacy Policy or how we handle your information, contact us at privacy@cyberspace.mx.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal — Privacy"
      title="Privacy Policy"
      updated="July 16, 2026"
      intro="Your privacy matters to us. This policy describes what information we collect, why we collect it, and the choices you have."
      sections={sections}
    />
  );
}
