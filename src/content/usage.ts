export interface UsageArea {
  key: string;
  emoji: string;
  name: string;
  stack: { frontend?: string; backend?: string; database?: string; note?: string };
}

export const usageAreas: UsageArea[] = [
  { key: 'ecommerce', emoji: '🛒', name: 'E-commerce', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL', note: 'Frontend va backend API orqali ma\'lumot almashadi.' } },
  { key: 'corporate', emoji: '🏢', name: 'Korporativ tizimlar', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
  { key: 'admin_panels', emoji: '📊', name: 'Admin panellar', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
  { key: 'web_app', emoji: '📱', name: 'Web application', stack: { frontend: 'React.js', backend: 'Node.js', database: 'PostgreSQL' } },
  { key: 'payments', emoji: '💳', name: 'To\'lov tizimlari', stack: { backend: 'Node.js + Express.js', database: 'PostgreSQL', note: 'Xavfsizlik va validatsiya juda muhim.' } },
  { key: 'taxi', emoji: '🚕', name: 'Taxi tizimlari', stack: { frontend: 'React.js', backend: 'Node.js (real-time)', database: 'PostgreSQL' } },
  { key: 'delivery', emoji: '📦', name: 'Delivery tizimlari', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
  { key: 'education', emoji: '🎓', name: 'Online education', stack: { frontend: 'React.js', backend: 'Node.js', database: 'PostgreSQL' } },
  { key: 'medical', emoji: '🏥', name: 'Medical systems', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
  { key: 'fintech', emoji: '🏦', name: 'FinTech', stack: { backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
  { key: 'chat', emoji: '💬', name: 'Chat applications', stack: { backend: 'Node.js (real-time)', database: 'PostgreSQL' } },
  { key: 'telegram_bots', emoji: '🤖', name: 'Telegram botlar', stack: { backend: 'Node.js', database: 'PostgreSQL' } },
  { key: 'crm_erp', emoji: '📈', name: 'CRM/ERP', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
  { key: 'startups', emoji: '🚀', name: 'Startaplar', stack: { frontend: 'React.js', backend: 'Node.js', database: 'PostgreSQL' } },
  { key: 'saas', emoji: '☁️', name: 'SaaS platformalar', stack: { frontend: 'React.js', backend: 'Node.js + Express.js', database: 'PostgreSQL' } },
];
