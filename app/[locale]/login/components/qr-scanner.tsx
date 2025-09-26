'use client';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
export const QrScanner = () => {
  const router = useRouter();
  const [voucher, setVoucher] = useState('');
  const searchParams = useSearchParams();
  const guid = searchParams?.get('guid') ?? '';

  useEffect(() => {
    if (voucher) {
      router.push(`/main?guid=${guid}&voucher=${voucher}`);
    }
  }, [voucher, guid]);
  return (
    <Dialog>
      <DialogTrigger className="border-2 rounded-lg m-1">
        <QrCode color="black" size={36} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR</DialogTitle>
          <DialogDescription>
            <Scanner
              onScan={(barcodes) => {
                if (
                  Array.isArray(barcodes) &&
                  barcodes.length > 0 &&
                  barcodes[0].rawValue
                ) {
                  setVoucher(barcodes[0].rawValue);
                }
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
