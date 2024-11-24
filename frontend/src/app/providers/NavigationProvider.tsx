import React, { useEffect } from 'react';
import { redirectToUrl } from './RedirectionProvider';
import { ScreenUrls } from '../model/enum';

type Props = {
  guards: boolean[];
  component: JSX.Element;
  redirectionUrl?: ScreenUrls;
};

const NavigationProvider = ({guards, component, redirectionUrl}: Props) => {

  const isValid = guards.every(guard => guard);

  useEffect(() => {
    const isGuardsPassed = guards.every(guard => guard);
    if (!isGuardsPassed && redirectionUrl) {
      redirectToUrl(redirectionUrl);
    }
  }, [guards, redirectionUrl]);

  return (
    <React.Fragment>
      { isValid ? component : null}
    </React.Fragment>
  );
}

export default NavigationProvider;