import React from 'react';
import AddUserModal from './modals/addUser-modal';
import LevelSetModal from './modals/levelSet-modal';
import ResultModal from './modals/result-modal';

export default function ModalProvider() {
  return (
    <>
      <AddUserModal/>
      <LevelSetModal/>
      <ResultModal/>
    </>
  );
}

