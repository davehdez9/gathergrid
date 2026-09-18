'use client';

import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = () => {
  const { unreadCount } = useGlobalContext();

  return (
    <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 py-0.5 text-xs font-semibold text-white">
        {unreadCount}
    </span>
  )
};

export default UnreadMessageCount;