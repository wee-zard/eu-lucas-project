import React, { useEffect, useState } from 'react';
import { redirectToUrl } from './RedirectionProvider';
import { ScreenUrls } from '../model/enum';

type Props = {
  guards: boolean[];
  component: JSX.Element;
  redirectionUrl?: ScreenUrls;
};

const NavigationProvider = ({guards, component, redirectionUrl}: Props) => {

  const [isValid, setValid] = useState(false);

  useEffect(() => {
    const isGuardsPassed = guards.every(guard => guard);
    if (!isGuardsPassed && redirectionUrl) {
      redirectToUrl(redirectionUrl);
    } else {
      setValid(true);
    }
  }, []);

  return (
    <React.Fragment>
      { isValid ? component : null}
    </React.Fragment>
  );
}

export default NavigationProvider;