export interface NavItem {
  href: string
  label: string
  /** Shown in the command palette to disambiguate. */
  hint: string
}

export const navItems: NavItem[] = [
  { href: '/work/', label: 'Work', hint: 'Case studies with problem, approach, and result' },
  { href: '/experience/', label: 'Experience', hint: 'Roles, dates, and what each one involved' },
  { href: '/research/', label: 'Research', hint: 'Co-authored papers and supervised graduate projects' },
  { href: '/writing/', label: 'Writing', hint: 'Essays on retrieval, evaluation, and production AI' },
  { href: '/about/', label: 'About', hint: 'Background, principles, skills, and credentials' },
  { href: '/contact/', label: 'Contact', hint: 'Email, LinkedIn, GitHub, and résumé' },
]
