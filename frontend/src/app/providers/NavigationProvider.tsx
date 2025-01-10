import React, { useEffect } from 'react';
import { redirectToUrl } from './RedirectionProvider';
import { GuardResultTypes, GuardTypes, ScreenUrls } from '@model/enum';
import { useGoogleAccountGuard, useNotLoggedInGuard } from '@hooks/useGuardHooks';

type Props = {
  guards: GuardTypes[];
  component?: JSX.Element;
  redirectionUrl?: ScreenUrls;
};

const NavigationProvider = ({guards, component, redirectionUrl}: Props) => {

  const notLoggedInGuard = useNotLoggedInGuard(guards.includes(GuardTypes.NOT_LOGGED_IN_GUARD));
  const googleAuthGuard = useGoogleAccountGuard(guards.includes(GuardTypes.GOOGLE_ACCOUNT_GUARD));

  const guardTypeToGuardResultType = (guardType: GuardTypes) => {
    switch(guardType) {
      case GuardTypes.NOT_LOGGED_IN_GUARD:
        return notLoggedInGuard;
      case GuardTypes.GOOGLE_ACCOUNT_GUARD:
        return googleAuthGuard;
    }
  }

  const guardResultTypes = guards.map(guardType => guardTypeToGuardResultType(guardType));
  const isValid = guardResultTypes.every(guard => guard === GuardResultTypes.PASSED);

  useEffect(() => {
    const isPending = guardResultTypes.some(guard => guard === GuardResultTypes.PENDING);
    if (!isPending) {
      if (!isValid && redirectionUrl) {
        redirectToUrl(redirectionUrl);
      }
    }
  }, [isValid, guardResultTypes, redirectionUrl]);

  return (
    <React.Fragment>
      { isValid ? component : null}
    </React.Fragment>
  );
}

export default NavigationProvider;