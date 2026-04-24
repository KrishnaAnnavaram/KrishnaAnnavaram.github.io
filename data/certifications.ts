export interface Certification {
  id: string
  name: string
  issuer: string
  issuedDate: string
  expiryDate?: string
  credentialId?: string
  verifyUrl?: string
  category: string
  featured: boolean
}

export const certifications: Certification[] = [
  {
    id: 'azure-ai-engineer',
    name: 'Microsoft Certified: Azure AI Engineer Associate (AI-102)',
    issuer: 'Microsoft',
    issuedDate: '2024-06',
    category: 'Cloud & AI',
    featured: true,
  },
  {
    id: 'aws-ai-practitioner',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    issuedDate: '2025-07',
    expiryDate: '2028-07',
    credentialId: 'c2d796f7-9c51-45c1-a3a8-9406efbe2bb3',
    verifyUrl: 'https://www.credly.com/badges/c2d796f7-9c51-45c1-a3a8-9406efbe2bb3',
    category: 'Cloud & AI',
    featured: true,
  },
  {
    id: 'sap-abap',
    name: 'SAP Certified Development Associate — ABAP with SAP NetWeaver',
    issuer: 'SAP',
    issuedDate: '2021-03',
    credentialId: 'e3d0d4ad-2c59-4417-8d14-7facdacd269a',
    verifyUrl: 'https://www.credly.com/badges/e3d0d4ad-2c59-4417-8d14-7facdacd269a',
    category: 'Enterprise',
    featured: true,
  },
  {
    id: 'microsoft-powerbi',
    name: 'Microsoft Power BI',
    issuer: 'Microsoft',
    issuedDate: '2022-01',
    category: 'Data & Analytics',
    featured: false,
  },
  {
    id: 'excel-vba',
    name: 'Excel VBA Automation',
    issuer: 'Microsoft',
    issuedDate: '2021-06',
    category: 'Data & Analytics',
    featured: false,
  },
  {
    id: 'python-nptel',
    name: 'Python Programming',
    issuer: 'NPTEL — IIT',
    issuedDate: '2020-04',
    category: 'Engineering',
    featured: false,
  },
  {
    id: 'iot-certification',
    name: 'Internet of Things',
    issuer: 'Coursera',
    issuedDate: '2020-06',
    category: 'Engineering',
    featured: false,
  },
  {
    id: 'cambridge-english',
    name: 'Cambridge English Certification',
    issuer: 'Cambridge Assessment English',
    issuedDate: '2019-08',
    category: 'Professional',
    featured: false,
  },
]
