
export function setElectionsContract (state, payload) {
    state.electionsContract= payload;
}
export function setElectionsConfig (state, payload) {
    state.electionsConfig = payload;
}

export function setElectionsState (state, payload) {
    state.electionsState = payload;
}

export function setCandidates (state, payload) {
    state.candidates = payload;
}

export function setUserVotes (state, payload) {
    state.userVotes = payload;
}

export function setUserStakes (state, payload) {
    state.userStakes = payload;
}

