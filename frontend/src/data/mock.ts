import {
  ShoppingCart as ShoppingCartIcon,
  BriefcaseBusiness as BriefcaseBusinessIcon,
  Package as PackageIcon,
  Clapperboard as ClapperboardIcon,
  Music as MusicIcon,
  CarTaxiFront as CarTaxiFrontIcon,
  Coffee as CoffeeIcon,
  House as HouseIcon,
  Sandwich as SandwichIcon,
  Fuel as FuelIcon,
  CirclePlay as CirclePlayIcon,
  Shirt as ShirtIcon,
  Wallet as WalletIcon,
  Utensils as UtensilsIcon,
  ShoppingBag as ShoppingBagIcon,
  Car as CarIcon,
  Smartphone as SmartphoneIcon,
} from "lucide-react";

export type Page =
    | "landing"
    | "login"
    | "register"
    | "dashboard"
    | "upload"
    | "statements"
    | "transactions"
    | "budgets"
    | "analytics"
    | "insights"
    | "profile"
    | "notifications"
    | "404";

export const transactions = [
  { id: 1, date: "2024-01-15", merchant: "Kaufland", category: "Groceries", amount: -287.5, icon: ShoppingCartIcon },
  { id: 2, date: "2024-01-14", merchant: "Salary — Accenture", category: "Income", amount: 8500.0, icon: BriefcaseBusinessIcon },
  { id: 3, date: "2024-01-13", merchant: "eMAG", category: "Shopping", amount: -1249.99, icon: PackageIcon },
  { id: 4, date: "2024-01-12", merchant: "Netflix", category: "Subscriptions", amount: -49.99, icon: ClapperboardIcon },
  { id: 5, date: "2024-01-11", merchant: "Cora", category: "Groceries", amount: -156.3, icon: ShoppingCartIcon },
  { id: 6, date: "2024-01-10", merchant: "Spotify", category: "Subscriptions", amount: -29.99, icon: MusicIcon },
  { id: 7, date: "2024-01-09", merchant: "Taxi — Bolt", category: "Transport", amount: -45.0, icon: CarTaxiFrontIcon },
  { id: 8, date: "2024-01-08", merchant: "Starbucks Victoriei", category: "Restaurants", amount: -67.5, icon: CoffeeIcon },
  { id: 9, date: "2024-01-07", merchant: "Dedeman", category: "Home", amount: -890.0, icon: HouseIcon },
  { id: 10, date: "2024-01-06", merchant: "Glovo", category: "Restaurants", amount: -112.0, icon: SandwichIcon },
  { id: 11, date: "2024-01-05", merchant: "Mol Romania", category: "Transport", amount: -380.0, icon: FuelIcon },
  { id: 12, date: "2024-01-04", merchant: "YouTube Premium", category: "Subscriptions", amount: -22.99, icon: CirclePlayIcon },
  { id: 13, date: "2024-01-03", merchant: "Zara Băneasa", category: "Shopping", amount: -560.0, icon: ShirtIcon },
  { id: 14, date: "2024-01-02", merchant: "Penny Market", category: "Groceries", amount: -198.4, icon: ShoppingCartIcon },
  { id: 15, date: "2024-01-01", merchant: "Bonus Q4", category: "Income", amount: 2000.0, icon: WalletIcon },
];

export const monthlyExpenses = [
  { month: "Aug", income: 8500, expenses: 4200 },
  { month: "Sep", income: 8500, expenses: 5100 },
  { month: "Oct", income: 10500, expenses: 4800 },
  { month: "Nov", income: 8500, expenses: 6200 },
  { month: "Dec", income: 10500, expenses: 7800 },
  { month: "Ian", income: 10500, expenses: 5040 },
];

export const categoryBreakdown = [
  { name: "Groceries", value: 642.2, color: "#10b981" },
  { name: "Shopping", value: 1809.99, color: "#6366f1" },
  { name: "Restaurants", value: 179.5, color: "#f59e0b" },
  { name: "Transport", value: 425.0, color: "#3b82f6" },
  { name: "Subscriptions", value: 102.97, color: "#ec4899" },
  { name: "Home", value: 890.0, color: "#8b5cf6" },
];

export const budgets = [
  { category: "Groceries", spent: 642, limit: 800, icon: ShoppingCartIcon, color: "#10b981" },
  { category: "Restaurants", spent: 179, limit: 300, icon: UtensilsIcon, color: "#f59e0b" },
  { category: "Shopping", spent: 1810, limit: 1500, icon: ShoppingBagIcon, color: "#6366f1" },
  { category: "Transport", spent: 425, limit: 500, icon: CarIcon, color: "#3b82f6" },
  { category: "Subscriptions", spent: 103, limit: 150, icon: SmartphoneIcon, color: "#ec4899" },
  { category: "Home", spent: 890, limit: 1200, icon: HouseIcon, color: "#8b5cf6" },
];

export const spendingTrend = [
  { day: "1 Ian", amount: 0 },
  { day: "3 Ian", amount: 198 },
  { day: "5 Ian", amount: 381 },
  { day: "7 Ian", amount: 538 },
  { day: "9 Ian", amount: 716 },
  { day: "11 Ian", amount: 1596 },
  { day: "13 Ian", amount: 2445 },
  { day: "15 Ian", amount: 3049 },
];

export const topMerchants = [
  { name: "eMAG", amount: 2349, count: 3 },
  { name: "Dedeman", amount: 890, count: 1 },
  { name: "Kaufland", amount: 643, count: 4 },
  { name: "Mol Romania", amount: 380, count: 2 },
  { name: "Zara", amount: 560, count: 2 },
  { name: "Glovo", amount: 312, count: 5 },
];

export const statements = [
  { id: 1, file: "BT_Statement_Ian_2024.pdf", bank: "Banca Transilvania", date: "2024-01-31", transactions: 43, status: "processed" },
  { id: 2, file: "BT_Statement_Dec_2023.pdf", bank: "Banca Transilvania", date: "2023-12-31", transactions: 67, status: "processed" },
  { id: 3, file: "Revolut_Dec_2023.csv", bank: "Revolut", date: "2023-12-31", transactions: 28, status: "processed" },
  { id: 4, file: "BT_Statement_Nov_2023.pdf", bank: "Banca Transilvania", date: "2023-11-30", transactions: 51, status: "processing" },
  { id: 5, file: "ING_Oct_2023.pdf", bank: "ING Bank", date: "2023-10-31", transactions: 39, status: "processed" },
];

export const notifications = [
  { id: 1, type: "warning", title: "Budget depășit", message: "Ai depășit bugetul de Shopping cu 310 RON (110%)", time: "acum 2 ore", read: false },
  { id: 2, type: "success", title: "Extras procesat", message: "BT_Statement_Ian_2024.pdf a fost procesat cu succes — 43 tranzacții", time: "acum 5 ore", read: false },
  { id: 3, type: "info", title: "Raport lunar disponibil", message: "Raportul tău pentru Ianuarie 2024 este gata", time: "ieri", read: true },
  { id: 4, type: "warning", title: "Tranzacție mare detectată", message: "Plată de 2.300 RON la eMAG detectată", time: "3 Ian", read: true },
  { id: 5, type: "success", title: "Obiectiv de economii atins", message: "Ai economisit 3.460 RON luna aceasta — obiectiv atins!", time: "15 Ian", read: true },
];