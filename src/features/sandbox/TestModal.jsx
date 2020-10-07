import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';

export default function TestModal({ data }) {
  return (
    <ModalWrapper size='mini' header='test modal'>
      <div>Test data : {data}</div>
    </ModalWrapper>
  );
}
