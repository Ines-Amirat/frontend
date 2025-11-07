// src/app/core/models/index.ts
// Angular 19 equivalent of Next.js /types/index.ts — export interfaces & type aliases (no global `declare`)

export type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

export interface SignUpParams {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

export interface NewUserParams {
  userId: string;
  email: string;
  name: string;
  password: string;
}



export interface Transaction {
  id: string;
  accountId: string;
  direction: 'CREDIT' | 'DEBIT';
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';   
  channel?: string;       
  category?: string;       
  description?: string;   
  occurredAt: string;     
  name?: string;
  image?: string;
}


export type UUID = string;

export interface BankAccount {
  id: UUID;
  userId: UUID;
  name: string;
  bankName: string;
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT';
  currency: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  maskedNumber?: string;
  iban?: string;
}




export interface Bank {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
}



export type AccountTypes = 'depository' | 'credit' | 'loan ' | 'investment' | 'other';

export type Category = 'Food and Drink' | 'Travel' | 'Transfer';

export interface CategoryCount {
  name: string;
  count: number;
  totalCount: number;
}

export interface Receiver {
  firstName: string;
  lastName: string;
}

export interface TransferParams {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
}

export interface AddFundingSourceParams {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}

export interface NewDwollaCustomerParams {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

// Props-equivalents for Angular components

export interface CreditCardProps {
  account: BankAccount;
  userName: string;
  showBalance?: boolean;
}

export interface BankInfoProps {
  account: BankAccount;
  appwriteItemId?: string;
  type: 'full' | 'card';
}

export interface HeaderBoxProps {
  type?: 'title' | 'greeting';
  title: string;
  subtext: string;
  user?: string;
}

export interface MobileNavProps {
  user: User;
}

export interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
}

export interface PlaidLinkProps {
  user: User;
  variant?: 'primary' | 'ghost';
  dwollaCustomerId?: string;
}

export interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

export interface BankDropdownProps {
  accounts: BankAccount[];
  // setValue is React-specific in Next.js; omit or adapt for Angular forms as needed.
  otherStyles?: string;
}

export interface BankTabItemProps {
  account: BankAccount;
  appwriteItemId?: string;
}

export interface TotlaBalanceBoxProps {
  accounts: BankAccount[];
  totalBanks: number;
  totalCurrentBalance: number;
}

export interface FooterProps {
  user: User;
}

export interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Array<Bank & BankAccount>; // mirrors Next.js `Bank[] & Account[]`
}

export interface SiderbarProps {
  user: User;
}

export interface RecentTransactionsProps {
  accounts: BankAccount[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

export interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

export interface CategoryBadgeProps {
  category: string;
}

export interface TransactionTableProps {
  transactions: Transaction[];
}

export interface CategoryProps {
  category: CategoryCount;
}

export interface DoughnutChartProps {
  accounts: BankAccount[];
}

export interface PaymentTransferFormProps {
  accounts: BankAccount[];
}

// Actions

export interface GetAccountsProps {
  userId: string;
}

export interface GetAccountProps {
  appwriteItemId: string;
}

export interface GetInstitutionProps {
  institutionId: string;
}

export interface GetTransactionsProps {
  accessToken: string;
}

export interface CreateFundingSourceOptions {
  customerId: string;            // Dwolla Customer ID
  fundingSourceName: string;     // Dwolla Funding Source Name
  plaidToken: string;            // Plaid Account Processor Token
  _links: object;                // Dwolla On Demand Authorization Link
}

export interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

export interface GetTransactionsByBankIdProps {
  bankId: string;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface GetUserInfoProps {
  userId: string;
}

export interface ExchangePublicTokenProps {
  publicToken: string;
  user: User;
}

export interface CreateBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  sharableId: string;
}

export interface GetBanksProps {
  userId: string;
}

export interface GetBankProps {
  documentId: string;
}

export interface GetBankByAccountIdProps {
  accountId: string;
}




