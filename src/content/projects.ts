export interface ProjectInfo {
  emoji: string;
  title: string;
  frontend?: string;
  backend?: string;
  database?: string;
  features: string[];
}

export const projects: ProjectInfo[] = [
  {
    emoji: '🛒',
    title: '1-Loyiha — Online Shop',
    frontend: 'React',
    backend: 'Node.js + Express',
    database: 'PostgreSQL',
    features: ['Registration', 'Login', 'Products', 'Search', 'Category', 'Cart', 'Order', 'Admin panel'],
  },
  {
    emoji: '📊',
    title: '2-Loyiha — Admin Dashboard',
    features: ['Login', 'Users', 'Statistics', 'CRUD', 'Charts', 'API', 'Database'],
  },
  {
    emoji: '🚀',
    title: '3-Loyiha — Full Stack Web Application',
    features: ["Foydalanuvchi kurs davomida o'rgangan barcha texnologiyalar yordamida to'liq loyiha yaratadi."],
  },
];
