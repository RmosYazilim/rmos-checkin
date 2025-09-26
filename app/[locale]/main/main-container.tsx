'use client';
import { useTranslations } from 'next-intl';

import { PeopleAccordion } from './components/people-accordion';
import { useCustomers } from './store/usecustomers';
import { getCustomers } from './query/get-customers';
import { useEffect } from 'react';

export default function MainContainer() {
  const { customers } = useCustomers();
  const { click, canSubmit } = getCustomers();

  useEffect(() => {
    if (canSubmit) {
      click();
    }
  }, [canSubmit]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          {customers.map((item, index) => (
            <PeopleAccordion key={index} user={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
