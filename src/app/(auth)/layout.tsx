import React from 'react';

export default function AuthLayout({children}:{children: React.ReactNode}) {
  return (
    <div id='authLayout'>
      {children}
    </div>
  );
}

