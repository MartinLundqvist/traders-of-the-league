import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';

export const RenderBadgeCell = (children: React.ReactNode) => (
  <Badge>{children}</Badge>
);

export const RenderVerifiedBadgeCell = (success: boolean) => (
  <Badge bg={success ? 'success' : 'warning'}>
    {success ? 'Verified' : 'Not Verified'}
  </Badge>
);

export const RenderConnectedBadgeCell = (connected: boolean) => (
  <Badge bg={connected ? 'success' : 'secondary'}>
    {connected ? 'Online' : 'Offline'}
  </Badge>
);
export const RenderPriorityBadgeCell = (priority: string) => {
  let bg = '';
  switch (priority) {
    case 'Low':
      bg = 'secondary';
      break;
    case 'Medium':
      bg = 'warning';
      break;
    case 'High':
      bg = 'danger';
      break;
    default:
      bg = 'secondary';
  }
  return <Badge bg={bg}>{priority}</Badge>;
};
