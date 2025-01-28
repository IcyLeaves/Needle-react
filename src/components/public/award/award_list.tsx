import { Cookies } from 'react-cookie';

const AWARDS: Series[] =

const ALLAWARDS = AWARDS.map(series => {
    const res: { awards: Award[]; name: string } = {
        awards: series.seriesAwards.map(award => {
            return award;
        }),
        name: series.seriesName,
    };
    return res;
});

const collects: Award[] = [];

const myIdxOf = (arr: Award[], id: string): number => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return i;
    }
    return -1;
};

const MyCookies = new Cookies();

function collectAwards(isSaveCookies: boolean): Award[] {
    let cookieAwards: StorageObject = {};
    if (isSaveCookies) {
        cookieAwards = MyCookies.get('awards') || {};
    }
    for (const award of AWARDS) {
        if (award.checkFunc) {
            for (const res of award.checkFunc()) {
                const idx = myIdxOf(award.seriesAwards, res);
                if (idx >= 0) {
                    const getAward = award.seriesAwards[idx];
                    collects.push(getAward);
                    cookieAwards[getAward.id] = true;
                }
            }
        }
    }
    if (isSaveCookies) {
        MyCookies.set('awards', cookieAwards);
    }
    return collects;
}

export {  ALLAWARDS, collectAwards };
