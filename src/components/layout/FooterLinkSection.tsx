import { Link } from 'react-router-dom';

interface FooterLink {
  readonly to: string;
  readonly label: string;
}

interface FooterLinkSectionProps {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => (
  <div>
    <h3 className="mb-4 text-sm sm:text-base font-bold text-gray-900 dark:text-white">
      {title}
    </h3>
    <ul className="space-y-2.5">
      {links.map(({ to, label }) => (
        <li key={to}>
          <Link
            to={to}
            className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 transition-colors duration-200 hover:text-primary-600 dark:hover:text-white hover:font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded break-words"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
