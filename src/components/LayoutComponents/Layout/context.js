import React from 'react';

let contentBuffer = {
  content: null,
};

const LayoutContext = React.createContext();

export const LayoutContextProvider = props => {
  const value = {
    getContentBuffer: () => contentBuffer,
    setContentBuffer: ({ content }) => (contentBuffer = { content }),
  };

  return <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>;
};

export const LayoutContextConsumer = LayoutContext.Consumer;
