export interface Certification {
  id: string
  name: string
  issuer: string
  issued: string
  expires?: string
  verifyUrl?: string
  featured: boolean
}

/**
 * Verified against the LinkedIn certifications export. The two featured entries
 * carry live Credly badges; the rest are self-reported coursework.
 * The previously listed Azure AI-102 credential was removed — it appears in no
 * source document. See CONTENT_TODO.md.
 */
export const certifications: Certification[] = [
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    issued: '2025-07',
    expires: '2028-07',
    verifyUrl: 'https://www.credly.com/badges/c2d796f7-9c51-45c1-a3a8-9406efbe2bb3',
    featured: true,
  },
  {
    id: 'sap-abap',
    name: 'SAP Certified Development Associate — ABAP',
    issuer: 'SAP',
    issued: '2021-03',
    verifyUrl: 'https://www.credly.com/badges/e3d0d4ad-2c59-4417-8d14-7facdacd269a',
    featured: true,
  },
  { id: 'ds-masters', name: 'Data Science Masters Program', issuer: 'Professional training', issued: '2022-01', featured: false },
  { id: 'powerbi', name: 'Microsoft Power BI', issuer: 'Microsoft', issued: '2022-01', featured: false },
  { id: 'excel-vba', name: 'Excel VBA', issuer: 'Microsoft', issued: '2021-06', featured: false },
  { id: 'python-nptel', name: 'Python', issuer: 'NPTEL', issued: '2020-04', featured: false },
  { id: 'iot', name: 'Internet of Things', issuer: 'Coursera', issued: '2020-06', featured: false },
  { id: 'cambridge', name: 'Cambridge English Certification', issuer: 'Cambridge Assessment English', issued: '2019-08', featured: false },
]

export const featuredCertifications = certifications.filter((c) => c.featured)
