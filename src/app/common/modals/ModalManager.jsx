import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from '../../../features/sandbox/TestModal';
import LoginForm from '../../../features/auth/LoginForm';

// Modal Manager is responsible for displaying the modal
export default function ModalManager() {
  const modalLooKUp = {
    TestModal,
    LoginForm,
  };
  const currentModal = useSelector((state) => state.modal);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLooKUp[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}
