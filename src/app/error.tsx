'use client';

import { useEffect } from 'react';
import translations from 'shared/constants/translations';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <h1>{translations.techPages.errorPageTitle}</h1>
      <button
        type="button"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {translations.techPages.errorPageButtonLabel}
      </button>
    </>
  );
}
