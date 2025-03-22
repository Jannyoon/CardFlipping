'use client';
import React from 'react';
import dynamic from '$/next/dynamic';

const AddUserModal = dynamic(()=>import('./modals/addUser-modal'), {ssr:false});
const LevelSetModal = dynamic(()=>import('./modals/levelSet-modal'), {ssr:false});
const ResultModal = dynamic(()=>import('./modals/result-modal'), {ssr:false});


export default function ModalProvider() {
  return (
    <>
      <AddUserModal/>
      <LevelSetModal/>
      <ResultModal/>
    </>
  );
}

