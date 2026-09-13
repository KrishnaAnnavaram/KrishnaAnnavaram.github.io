export interface NavItem {
  href: string
  label: string
  /** Shown in the command palette to disambiguate. */
  hint: string
}

/**
 * Six flat items, no dropdowns. Every benchmark portfolio studied for
 * docs/PORTFOLIO_RESEARCH.md uses four to six; none uses a nested menu.
 *
 * "Projects" leads because the repository-backed systems are the strongest
 * evidence on the site. It is one surface covering both the open-source
 * systems and the employment case studies, which continue to live under
 * /work/ so no published URL moves.
 */
export const navItems: NavItem[] = [
  { href: '/projects/', label: 'Projects', hint: 'Systems built, with architecture and measured results' },
  { href: '/experience/', label: 'Experience', hint: 'Roles, dates, and what each one involved' },
  { href: '/research/', label: 'Research', hint: 'Co-authored papers and supervised graduate projects' },
  { href: '/writing/', label: 'Writing', hint: 'Essays on retrieval, evaluation, and production AI' },
  { href: '/about/', label: 'About', hint: 'Background, principles, skills, and credentials' },
  { href: '/contact/', label: 'Contact', hint: 'Email, LinkedIn, GitHub, and résumé' },
]
