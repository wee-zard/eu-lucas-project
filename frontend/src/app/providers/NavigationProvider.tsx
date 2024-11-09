import React from 'react';

type Props = {
  guards: (() => boolean)[];
  component: JSX.Element;
};

const NavigationProvider = ({guards, component}: Props) => {

  const isGuardsPassed = guards.every(guard => guard());

  return (
    <React.Fragment>
      { isGuardsPassed ? component : null}
    </React.Fragment>
  );
}

export default NavigationProvider;