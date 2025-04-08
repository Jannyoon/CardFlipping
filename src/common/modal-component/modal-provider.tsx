'use client';
import React from 'react';
import dynamic from '$/next/dynamic';
import { useModal } from '@/store/modal-store';
import { useGameStore } from '@/store/game-store';

const AddUserModal = dynamic(()=>import('./modals/addUser-modal'), {ssr:false});
const LevelSetModal = dynamic(()=>import('./modals/levelSet-modal'), {ssr:false});
const ResultModal = dynamic(()=>import('./modals/result-modal'), {ssr:false});


export default function ModalProvider() {
  const {type} = useModal();
  const {gameState} = useGameStore();

  return (
    <>
      {type==='signUp' && <AddUserModal/>}
      {type==='gameSet' && <LevelSetModal/>}
      {gameState==='end' && <ResultModal/>}
    </>
  );
}

