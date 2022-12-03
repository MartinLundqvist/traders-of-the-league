import { Link } from 'react-router-dom';

export const RenderBugReportLink = (date: string) => (
  <Link to={`/bugreports/report?${date}`}>Link</Link>
);
