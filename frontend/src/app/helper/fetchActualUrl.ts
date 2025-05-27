export const fetchActualUrl = () => {
    const url = window.location.href;
    const splitUrls = url.split("/");
    return `/${splitUrls[splitUrls.length - 1]}`;
}
