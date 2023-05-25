type RootLayout = {
  auth: React.ReactNode;
  dashboard: React.ReactNode;
};

type Layout = {
  children: React.ReactNode;
};

type NavItem = {
  name: string;
  href: string;
  current: boolean;
};
