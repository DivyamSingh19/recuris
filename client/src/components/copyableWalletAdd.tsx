import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, CheckCircle } from 'lucide-react';

const CopyableWalletAddress = ({ walletAddress }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const displayAddress = walletAddress 
    ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}`
    : 'No Address';

  return (
    <button 
      onClick={handleCopy}
      className="text-sm bg-sidebar hover:underline py-2 px-4 text-primary rounded flex items-center gap-2 cursor-pointer"
    >
      <span className="flex items-center gap-2">
        <Image src="/metamask.svg" width={15} height={15} alt="Metamask" />
        {displayAddress}
        {copied ? (
          <CheckCircle className="text-green-500" size={16} />
        ) : (
          <Copy className="text-gray-500" size={16} />
        )}
      </span>
    </button>
  );
};

export default CopyableWalletAddress;