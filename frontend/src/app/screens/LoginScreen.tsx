import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const LoginScreen = () => {

  return (
    <div>
        <div>

        </div>
        <div>
        <GoogleLogin
            onSuccess={credentialResponse => {
                /** The credentialResponse is a jwt token */
                if (credentialResponse?.credential) {
                    const decoded = jwtDecode(credentialResponse.credential);
                    /** We decoded the jwt token into readable object */
                    console.log("[GoogleLogin onSuccess]:", decoded);
                }
            }}
            onError={() => {
                console.log('[GoogleLogin onError]: Login Failed');
            }}
            />;
        </div>
    </div>
  );
}

export default LoginScreen;
