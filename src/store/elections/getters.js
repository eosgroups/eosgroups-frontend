export function getElectionsContract (state) {
    return state.electionsContract;
}

export function getElectionsConfig (state) {
    return state.electionsConfig;
}

export function getElectionsState (state) {
    return state.electionsState;
}

export function getCandidates (state) {
    return state.candidates;
}

export function getIsCandidate (state, getters, rootState, rootGetters) {
    let accountname = rootGetters["ual/getAccountName"];
    if(state.candidates && state.candidates.length && accountname){
        let cand = state.candidates.find(c=>c.cand == accountname);
        return cand ? cand : false;
    }
    else{
        return false;
    } 
}

export function getUserVotes (state) {
    return state.userVotes;
}
export function getUserStakes (state) {
    return state.userStakes;
}
