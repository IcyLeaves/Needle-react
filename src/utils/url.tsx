type NeedleParams = {
    seed: string;
    mode: string;
};
function fetchParams(url: string): NeedleParams {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        seed: urlParams.get('seed') ?? '',
        mode: urlParams.get('mode') ?? '',
    };
}

export { fetchParams };
export type { NeedleParams };
