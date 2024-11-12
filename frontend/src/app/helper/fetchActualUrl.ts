export const fetchActualUrl = () => {
    const url = window.location.href;
    const splittedUrls = url.split("/");
    const actualUrl = `/${splittedUrls[splittedUrls.length - 1]}`;
    return actualUrl;
}
