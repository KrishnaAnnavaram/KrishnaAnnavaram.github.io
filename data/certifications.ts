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
 * Verified against the résumé and the LinkedIn certifications export. Entries
 * with a `verifyUrl` carry a live Credly badge; the rest are self-reported.
 *
 * Azure AI-102 was removed in an earlier pass because it appeared in no source
 * document available at the time. The current résumé lists it, so it is back —
 * without a Credly link, because none has been supplied yet.
 */
export const certifications: Certification[] = [
  {
    id: 'azure-ai-102',
    name: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft',
    issued: '2025-01',
    featured: true,
  },
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    issued: '2025-07',
    expires: '2028-07',
    verifyUrl: 'https://www.credly.com/badges/c2d796f7-9c51-45c1-a3a8-9406efbe2bb3',
    featured: true,
  },
]

/*
 * Removed: a "Data Science Masters Program" bootcamp certificate that read
 * confusingly beside the actual MS, plus Power BI, Excel VBA, an NPTEL Python
 * course, a Coursera IoT course and a Cambridge English certificate.
 *
 * They were all real. They were also seven undergraduate-era entries diluting
 * the two current credentials that matter, and one of them (SAP ABAP) told a
 * different career story entirely. The résumé lists AI-102 and AWS AI
 * Practitioner and nothing else; the site now matches.
 */

export const featuredCertifications = certifications.filter((c) => c.featured)
