'use client';

import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = () => {
  const { unreadCount } = useGlobalContext();

  return <span>{unreadCount}</span>;
};

export default UnreadMessageCount;