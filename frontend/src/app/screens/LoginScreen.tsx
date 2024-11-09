import React from 'react';
import { GoogleLogin,  } from '@react-oauth/google';
import { useCookies } from 'react-cookie'
import { CookiesTitle, ScreenUrls } from '../model/enum';
import { redirectToUrl } from '../providers/RedirectionProvider';

const LoginScreen = () => {
    const [_, setCookie] = useCookies([CookiesTitle.GoogleOAuthToken]);

    const handleLogin = (credential: string) => {
        setCookie(CookiesTitle.GoogleOAuthToken, credential, { path: '/' });
    };

  return (
    <div>
        <GoogleLogin
            onSuccess={credentialResponse => {
                /** The credentialResponse is a jwt token */
                if (credentialResponse?.credential) {
                    handleLogin(credentialResponse.credential);

                    /**Is credential.email is valid? */
                    redirectToUrl(ScreenUrls.LucasScreenPath);
                }
            }}
            onError={() => {
                console.error('[GoogleLogin onError]: Login Failed');
            }}
        />
    </div>
  )
}

export default LoginScreen;
