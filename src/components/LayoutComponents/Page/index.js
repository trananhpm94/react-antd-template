import React, {useEffect} from 'react';
import { LayoutContextConsumer } from '../Layout/context';

let source = null;

const Page = ({...props, context}) => {
  const updateContent = () => {
    const { setContentBuffer } = context;
    const {   children } = props;
    setContentBuffer({
      content:  children,
    });
  };

  useEffect(() => {
    updateContent();
  }, []);

  return null;
};

export default props => {
  return (
    <LayoutContextConsumer>
      {context => {
        return <Page {...props} context={context} />;
      }}
    </LayoutContextConsumer>
  );
};
