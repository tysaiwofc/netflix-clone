import { signOut } from 'next-auth/react';
import React from 'react';
import Link from 'next/link'
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex p-2 rounded">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
          <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
        </div>
      </div>

      {currentUser?.id === '655d3a871f96bf7355f57e80' ? <Link target='_blank' href="/create" className="bg-green-400 p-2 rounded px-3 mt-2 text-center text-white text-sm hover:underline hover:bg-green-500">
        Adicionar filme
      </Link> : ''}
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
        Sair da Netflix
      </div>
    </div>
  )
}

export default AccountMenu;
