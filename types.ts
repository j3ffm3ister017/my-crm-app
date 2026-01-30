export enum ViewState {
  INBOX = 'INBOX',
  COMPANY_DETAIL = 'COMPANY_DETAIL'
}

export interface Task {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  dueDate: string;
  urgent: boolean;
  important: boolean;
  type: 'Task' | 'Email' | 'Call';
  dateAdded: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string; // URL or placeholder
  url: string;
  owner: string;
  address: string;
  icp: boolean;
  revenue: string;
  linkedin: string;
  twitter: string;
}
