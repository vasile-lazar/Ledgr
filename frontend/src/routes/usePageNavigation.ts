import { useNavigate } from 'react-router-dom';
import type { Page } from '../data/mock';
import { PATHS } from './paths';
const pagePaths: Record<Page, string> = {
 landing: PATHS.PUBLIC.LANDING, login: PATHS.PUBLIC.LOGIN, register: PATHS.PUBLIC.REGISTER, '404': PATHS.PUBLIC.NOT_FOUND,
 dashboard: PATHS.APP.DASHBOARD,
upload: PATHS.APP.UPLOAD,
statements: PATHS.APP.STATEMENTS,
transactions: PATHS.APP.TRANSACTIONS,
budgets: PATHS.APP.BUDGETS,
analytics: PATHS.APP.ANALYTICS,
insights: PATHS.APP.INSIGHTS,
profile: PATHS.APP.PROFILE,
notifications: PATHS.APP.NOTIFICATIONS
};
export function usePageNavigation(): (page: Page) => void {
  const navigate = useNavigate();

  return (page: Page) => {
    void navigate(pagePaths[page]);
  };
}
