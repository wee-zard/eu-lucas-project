import React, { useEffect } from 'react';
import { ScreenUrls } from '../model/enum';
import { redirectToUrl } from '../providers/RedirectionProvider';

const DefaultScreen = () => {

    useEffect(() => {
        redirectToUrl(ScreenUrls.LoginScreenPath);
    }, []);

    return (
        <React.Fragment></React.Fragment>
    )
};

export default DefaultScreen;