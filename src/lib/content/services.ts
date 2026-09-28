/*
 * CONTENT_REQUIRES_VERIFICATION
 * Service names and groups come from the owner's brief; the owner has approved
 * presenting all 15 services as areas where visitors can explore their options.
 * Copy rule: describe the service and what may help — don't promise outcomes
 * (savings, approval, credit scores, settlement amounts, timelines), and don't
 * repeat "no guarantee" language. The one short disclaimer lives on the page
 * template (serviceDisclaimer). See docs/content-verification.md.
 */
import type { IconName } from "@/components/ui/icon";

export type Service = {
  slug: string;
  title: string;
  /** One short, benefit-oriented line for the Services menu. */
  menuText: string;
  /** Hero intro: what this is and why it may matter. */
  description: string;
  /** "What is …?" — one or two short paragraphs. */
  overview: string[];
  /** Who it may be relevant for. */
  mayHelp: string[];
  /** What visitors may want to think about. */
  consider: string[];
  /** Information that helps a consultation go further. */
  haveReady: string[];
};

export type ServiceGroup = { id: string; title: string; icon: IconName; services: Service[] };

/** The single, short qualification shown near the bottom of service pages. */
export const serviceDisclaimer =
  "Options and results vary based on individual circumstances. A consultation does not guarantee eligibility or a specific outcome.";

export const serviceGroups: ServiceGroup[] = [
  {
    id: "personal-debt",
    title: "Personal Debt",
    icon: "dollar",
    services: [
      {
        slug: "debt-settlement",
        title: "Debt Settlement",
        menuText: "Resolve eligible debt for less than the full balance.",
        description:
          "Explore potential options for resolving eligible unsecured debt and understand whether debt settlement may fit your situation.",
        overview: [
          "Debt settlement means working toward an agreement with a creditor to resolve an unsecured debt for less than the full balance owed.",
          "It is usually considered by people who are struggling to keep up with credit card or other unsecured debt and are looking for an alternative to paying balances in full over many years.",
        ],
        mayHelp: [
          "You have significant credit card or unsecured loan balances",
          "Your monthly payments have become hard to manage",
          "You're behind on payments, or worried you soon will be",
          "You want to understand options other than minimum payments",
        ],
        consider: [
          "Settlement can affect your credit while accounts are being resolved",
          "Forgiven debt may have tax implications",
          "Each creditor handles settlement differently",
        ],
        haveReady: [
          "A list of your debts and who you owe",
          "Approximate balances and monthly payments",
          "Recent statements or collection letters",
          "Your monthly income and main expenses",
        ],
      },
      {
        slug: "debt-consolidation",
        title: "Debt Consolidation",
        menuText: "Simplify multiple debts into one payment.",
        description:
          "Learn whether combining multiple debts into a single monthly payment may make your finances easier to manage.",
        overview: [
          "Debt consolidation combines several debts into one repayment — often through a single new loan or structured plan — so you have one payment to track instead of many.",
          "Depending on the terms, it may also change your interest rate, monthly payment or repayment period.",
        ],
        mayHelp: [
          "You're juggling several credit card or loan payments",
          "You'd like one predictable monthly payment",
          "Your credit and income are relatively stable",
          "You want to compare consolidation with other options",
        ],
        consider: [
          "Compare the total cost, not just the monthly payment",
          "Look at the interest rate, fees and length of the term",
          "Qualifying for a consolidation loan depends on your credit and income",
        ],
        haveReady: [
          "Balances, interest rates and payments for each debt",
          "Your monthly income",
          "A rough idea of your credit standing",
        ],
      },
      {
        slug: "debt-validation",
        title: "Debt Validation",
        menuText: "Check that a debt is accurate and properly documented.",
        description:
          "Understand how to review whether a debt is accurate, properly documented and actually yours before deciding how to respond.",
        overview: [
          "Debt validation is the process of asking a collector to show that a debt is accurate — the amount, the original creditor, and that it belongs to you.",
          "It can be especially useful when a debt has been sold or passed to a collection agency and the details are unclear.",
        ],
        mayHelp: [
          "A collector has contacted you about a debt you don't recognize",
          "The amount doesn't match your records",
          "A debt has been sold or transferred to another company",
          "You want to understand a collection notice before responding",
        ],
        consider: [
          "Timing can matter, so it helps to act soon after receiving a collection notice",
          "Keep copies of all letters and notes of every call",
          "Validation confirms the details of a debt; it doesn't by itself resolve it",
        ],
        haveReady: [
          "Collection letters or notices you've received",
          "Any records from the original creditor",
          "Notes on calls with the collector",
        ],
      },
      {
        slug: "debt-relief",
        title: "Debt Resolution / Debt Relief",
        menuText: "Find a path forward with significant debt.",
        description:
          "Get help understanding your options if significant outstanding debt is weighing on you — and find a path that fits your situation.",
        overview: [
          "Debt relief is a broad term for approaches that help people address debt they're finding hard to manage — from settlement and consolidation to structured repayment.",
          "The right path depends on the kind of debt you have, how much you owe and what you can realistically afford each month.",
        ],
        mayHelp: [
          "You owe significant amounts across several accounts",
          "You're not sure which debt-relief approach fits you",
          "You want a clear picture of your options in one conversation",
        ],
        consider: [
          "Different approaches affect your credit and budget in different ways",
          "Some options suit certain types of debt better than others",
          "Understanding all your options first makes it easier to choose",
        ],
        haveReady: [
          "A list of your debts, balances and creditors",
          "Your monthly income and main expenses",
          "Any recent statements or collection letters",
        ],
      },
      {
        slug: "credit-card-debt-relief",
        title: "Credit Card Debt Relief",
        menuText: "Explore options for high credit card balances.",
        description:
          "Explore options for high balances on bank and store credit cards, and find an approach that fits your budget.",
        overview: [
          "High interest can make credit card balances hard to pay down, even with regular payments.",
          "Credit card debt relief looks at ways to address those balances — such as settlement, consolidation or a structured plan — based on your situation.",
        ],
        mayHelp: [
          "You carry large balances on one or more credit cards",
          "Most of your payment goes to interest",
          "You're behind on card payments, or close to it",
        ],
        consider: [
          "Each approach affects your credit differently",
          "Card issuers vary in how they work with customers",
          "Comparing options side by side helps you choose",
        ],
        haveReady: [
          "Recent statements for each card",
          "Balances, interest rates and minimum payments",
          "Your monthly income and main expenses",
        ],
      },
      {
        slug: "personal-loan-debt-relief",
        title: "Personal Loan Debt Relief",
        menuText: "Options for unsecured personal loans.",
        description:
          "Explore options for unsecured personal loans — loans not backed by a home or car — that have become hard to keep up with.",
        overview: [
          "Unsecured personal loans, including many online and installment loans, aren't tied to property like a home or car.",
          "If the payments have become difficult, there may be options for addressing the balance depending on the lender and your situation.",
        ],
        mayHelp: [
          "You have one or more unsecured personal or installment loans",
          "The monthly payments are straining your budget",
          "You're behind, or a loan has gone to collections",
        ],
        consider: [
          "Lenders and loan servicers handle hardship differently",
          "Your options can affect your credit",
          "It helps to review all your debts together, not just one loan",
        ],
        haveReady: [
          "Loan statements or agreements",
          "The lender or servicer's name and your balance",
          "Your monthly income and expenses",
        ],
      },
      {
        slug: "medical-debt-relief",
        title: "Medical Debt Relief",
        menuText: "Get help with qualifying medical bills.",
        description:
          "Get help understanding your options for qualifying medical bills and medical debt that has become difficult to manage.",
        overview: [
          "Medical bills can arrive unexpectedly and add up quickly, and they are sometimes passed to collection agencies.",
          "Medical debt relief looks at your bills and balances and the options that may be available for addressing them.",
        ],
        mayHelp: [
          "You have unpaid hospital, doctor or other medical bills",
          "Medical debt has gone to a collection agency",
          "You're unsure what you actually owe after insurance",
        ],
        consider: [
          "Billing errors happen, so it's worth reviewing itemized bills",
          "Check what your insurance has and hasn't covered",
          "Providers and collectors may handle payment arrangements differently",
        ],
        haveReady: [
          "Medical bills and itemized statements",
          "Insurance explanation-of-benefits statements",
          "Any collection letters",
        ],
      },
    ],
  },
  {
    id: "credit-financial-health",
    title: "Credit & Financial Health",
    icon: "compass",
    services: [
      {
        slug: "credit-restoration",
        title: "Credit Restoration",
        menuText: "Understand steps to rebuild your credit profile.",
        description:
          "Understand the steps that may support rebuilding and strengthening your credit profile over time.",
        overview: [
          "Credit restoration focuses on understanding what's on your credit reports, addressing information that is inaccurate, and building positive history going forward.",
          "Knowing where you stand is the first step toward a stronger financial position.",
        ],
        mayHelp: [
          "You've had credit challenges and want to rebuild",
          "You think your credit report may contain errors",
          "You're preparing for a future loan or major purchase",
        ],
        consider: [
          "Accurate information generally stays on a report; the focus is on correcting errors and building positive history",
          "Rebuilding credit takes consistent habits over time",
          "Checking your reports regularly helps you spot problems early",
        ],
        haveReady: [
          "Recent copies of your credit reports, if you have them",
          "Any items you believe are inaccurate",
          "A list of your current accounts",
        ],
      },
      {
        slug: "dti-improvement",
        title: "DTI Improvement",
        menuText: "Ease debt-to-income pressure on your finances.",
        description:
          "Understand strategies for reducing debt-to-income (DTI) pressure and strengthening your overall financial position.",
        overview: [
          "Your debt-to-income ratio compares your monthly debt payments with your gross monthly income. Lenders often look at it when you apply for credit.",
          "Reducing debt payments relative to income can ease pressure on your budget and improve how your finances look to lenders.",
        ],
        mayHelp: [
          "A large share of your income goes to debt payments",
          "You're planning to apply for a mortgage or other loan",
          "You want a clearer picture of your overall finances",
        ],
        consider: [
          "DTI can change by lowering monthly debt payments or increasing income",
          "Lenders use different DTI thresholds",
          "Some strategies take time to show up in your numbers",
        ],
        haveReady: [
          "Your monthly debt payments",
          "Your gross monthly income",
          "Any upcoming loan plans",
        ],
      },
    ],
  },
  {
    id: "business-tax",
    title: "Business & Tax",
    icon: "building",
    services: [
      {
        slug: "business-debt-settlement",
        title: "Business Debt Settlement",
        menuText: "Explore relief options for eligible business debt.",
        description:
          "Explore debt-relief options for eligible business debt and understand what may fit your business's situation.",
        overview: [
          "Business debt settlement means working toward agreements with business creditors to resolve eligible balances for less than the full amount owed.",
          "It may be considered when business debt has become difficult to keep up with and other options have been explored.",
        ],
        mayHelp: [
          "Your business has loans, lines of credit or vendor balances it's struggling to pay",
          "Cash flow can no longer support current payments",
          "Creditors or collectors are contacting your business",
        ],
        consider: [
          "Personal guarantees may make you personally responsible for some business debts",
          "Business creditors vary in how they approach settlement",
          "Forgiven debt may have tax implications for the business",
        ],
        haveReady: [
          "A list of business debts, creditors and balances",
          "Loan agreements and any personal guarantees",
          "Recent business financial statements",
        ],
      },
      {
        slug: "business-debt-restructuring",
        title: "Business Debt Restructuring",
        menuText: "Reorganize business obligations to ease cash flow.",
        description:
          "Explore ways your business may restructure or better manage its outstanding obligations to ease pressure on cash flow.",
        overview: [
          "Business debt restructuring looks at changing how and when a business repays what it owes — for example by adjusting payment terms or consolidating obligations.",
          "The aim is a repayment structure the business can realistically sustain.",
        ],
        mayHelp: [
          "Your business has several obligations with different terms",
          "Payments are due faster than revenue comes in",
          "You want to keep operating while getting debt under control",
        ],
        consider: [
          "Restructuring usually requires agreement from creditors",
          "New terms may change the total amount repaid",
          "Personal guarantees can affect your personal finances",
        ],
        haveReady: [
          "Current business debts and their terms",
          "Recent revenue and cash-flow figures",
          "Any creditor correspondence",
        ],
      },
      {
        slug: "tax-relief",
        title: "Tax Relief",
        menuText: "Get help with a tax-related financial burden.",
        description:
          "Get help understanding your options if you or your business is dealing with a tax-related financial burden.",
        overview: [
          "Tax debt can feel overwhelming, especially when notices keep arriving and penalties and interest continue to add up.",
          "Tax relief looks at the options that may be available for addressing what's owed, based on your situation.",
        ],
        mayHelp: [
          "You owe back taxes you can't pay in full",
          "You've received notices from a tax authority",
          "Tax debt is affecting your personal or business finances",
        ],
        consider: [
          "Responding to notices promptly keeps more options open",
          "Keeping current tax filings up to date matters",
          "Penalties and interest can continue while a balance remains",
        ],
        haveReady: [
          "Any tax notices or letters you've received",
          "Recent tax returns",
          "An estimate of the amount owed",
        ],
      },
      {
        slug: "tax-debt-restructuring",
        title: "Tax Debt Restructuring",
        menuText: "Manage outstanding tax debt with a workable plan.",
        description:
          "Explore approaches for managing outstanding tax obligations with a plan that works for your budget.",
        overview: [
          "Tax debt restructuring focuses on how an outstanding tax balance can be managed over time — for example through a payment arrangement.",
          "Having a plan in place can make a tax balance more manageable month to month.",
        ],
        mayHelp: [
          "You owe taxes and need more time to pay",
          "You want a predictable monthly amount",
          "You're trying to address tax debt alongside other debts",
        ],
        consider: [
          "Payment arrangements have requirements that must be kept up",
          "Interest and penalties may continue while a balance is paid",
          "Staying current on future filings is part of any plan",
        ],
        haveReady: [
          "Tax notices showing the balance owed",
          "Recent tax returns",
          "Your monthly income and expenses",
        ],
      },
      {
        slug: "personal-tax-debt-relief",
        title: "Personal Tax Debt Relief",
        menuText: "Options for unpaid personal tax obligations.",
        description:
          "Explore your options if you are dealing with unpaid personal tax obligations and want to get back on track.",
        overview: [
          "Unpaid personal taxes can create ongoing stress as notices, penalties and interest build up.",
          "Personal tax debt relief looks at the options that may be available to address what you owe as an individual.",
        ],
        mayHelp: [
          "You owe personal income taxes from one or more years",
          "You've received notices about an unpaid balance",
          "You're not sure what options are available to you",
        ],
        consider: [
          "Responding to notices promptly keeps more options open",
          "Unfiled returns usually need to be addressed first",
          "Your income and expenses affect which options may fit",
        ],
        haveReady: [
          "Tax notices or letters",
          "Recent tax returns",
          "Your monthly income and expenses",
        ],
      },
    ],
  },
  {
    id: "student-loans",
    title: "Student Loans",
    icon: "book",
    services: [
      {
        slug: "student-loan-assistance",
        title: "Student Loan Assistance",
        menuText: "Understand options for managing student loans.",
        description:
          "Understand the options that may be available for managing your student loans and finding a more workable payment.",
        overview: [
          "Student loan payments can take up a large share of your budget, and the rules differ between loan types.",
          "Student loan assistance helps you understand your loans and the options that may be available for managing them.",
        ],
        mayHelp: [
          "Your student loan payments are hard to afford",
          "You have federal loans, private loans, or both",
          "You're behind or your loans are in default",
        ],
        consider: [
          "Federal and private student loans have different options",
          "Your servicer holds the details of your loans",
          "Changes to repayment can affect the total you repay",
        ],
        haveReady: [
          "Your loan servicer's name and your account details",
          "Loan types and balances",
          "Your income and household size",
        ],
      },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap((g) => g.services);

export const servicesIndexPath = "/services";

export function servicePath(slug: string) {
  return `${servicesIndexPath}/${slug}`;
}

export function findService(slug: string): { service: Service; group: ServiceGroup } | undefined {
  for (const group of serviceGroups) {
    const service = group.services.find((s) => s.slug === slug);
    if (service) return { service, group };
  }
  return undefined;
}
