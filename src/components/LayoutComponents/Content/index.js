import React from 'react';
import { LayoutContextConsumer } from '../Layout/context';

const AppContent = ({ context }) => {
  const { getContentBuffer } = context;
  const { content } = getContentBuffer();
  return <div className="utils__content">{content}</div>;
};

export default props => {
  return (
    <LayoutContextConsumer>
      {context => {
        return <AppContent {...props} context={context} />;
      }}
    </LayoutContextConsumer>
  );
};
