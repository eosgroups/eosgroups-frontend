import {notifyError, notifySuccess} from '../../../imports/notifications.js';

import { UAL } from "universal-authenticator-library";
import { Scatter } from 'ual-scatter';
import { Ledger } from 'ual-ledger';
import { Lynx } from 'ual-lynx';
import { TokenPocket } from 'ual-token-pocket';
import { EOSIOAuth } from 'ual-eosio-reference-authenticator';

export async function initUAL({ state, commit, dispatch, getters }, network) {
  let appName="croneos";
  let chains = [state.networks[getters.getActiveNetwork].config];
  console.log('init ual with', chains)
  let authenticators = [
    new Scatter(chains, {appName: appName}),
    new Ledger(chains),
    new Lynx(chains, { appName: appName }),
    new TokenPocket(chains),
    new EOSIOAuth(chains, { appName, protocol: 'eosio' })
  ];
  let ual = new UAL(
    chains,
    appName,
    authenticators
  );

  console.log("UAL", ual);
  commit("setUAL", ual);
}


export async function renderLoginModal({ state, commit, dispatch, getters }) {
  
  console.log("available authenticators", getters.getAuthenticators)
  for (var i = 0; i < getters.getAuthenticators; i++) {
    getters.getAuthenticators[i].reset();
    getters.getAuthenticators[i].init();
    await dispatch('waitForAuthenticatorToLoad', getters.getAuthenticators[i]);
  }
  commit("setShouldRenderLoginModal", true);
  console.log("available authenticators", getters.getAuthenticators)
  
}

export async function logout({ state, commit, dispatch }) {
  let activeAuth = state.activeAuthenticator;
  if(activeAuth){
    console.log(`Logging out from authenticator: ${activeAuth.getStyle().text}`);
    activeAuth.logout().then(() =>{
      console.log('Logged out!')
      commit("setActiveAuthenticator", false);
      commit("setAccountName", false);
      commit("setSESSION", {accountName:null, authenticatorName: null, network: null});
    }).catch(e => {console.log(`An error occured while attempting to logout from authenticator: ${activeAuth.getStyle().text}`)});
  }
  else{
    console.log('No active authenticator found, you must be logged in before logging out.');
  }
}

export async function waitForAuthenticatorToLoad({}, authenticator) {
  return new Promise((resolve) => {
    if (!authenticator.isLoading()) {
      resolve()
      return
    }
    const authenticatorIsLoadingCheck = setInterval(() => {
      if (!authenticator.isLoading()) {
        clearInterval(authenticatorIsLoadingCheck)
        resolve()
      }
    }, 250)
  })
}
export async function attemptAutoLogin({state, commit, dispatch}){
  let {accountName, authenticatorName, timestamp}= state.SESSION;
  if(accountName && authenticatorName){
    let authenticator = state.UAL.authenticators.find(a => a.getStyle().text == authenticatorName);
    authenticator.init();
    await dispatch('waitForAuthenticatorToLoad', authenticator);
    if(authenticator.initError){
      console.log(`Attempt to auto login with authenticator ${authenticatorName} failed because it's not available anymore.`);
      commit('setSESSION', {accountName:null, authenticatorName: null});
      return;
    }
    authenticator.login(accountName).then(()=>{
      commit('setSESSION', {accountName:accountName, authenticatorName: authenticatorName});
      commit("setAccountName", accountName);
      commit("setActiveAuthenticator", authenticator);
      notifySuccess({message:`Welcome back ${accountName}, you are connected to ${state.SESSION.network} with ${authenticatorName}.`});
    }).catch(e =>{
      commit('setSESSION', {accountName:null, authenticatorName: null});
      console.log('auto login error', e, e.cause);
    });
  }
  
}

export async function transact({ state, dispatch, commit }, payload) {

  const disable_signing_overlay = payload.disable_signing_overlay || false;
  //check if logged in before transacting
  if(!state.activeAuthenticator || !state.accountName){
    dispatch('renderLoginModal');
    return;
  }
  if(!disable_signing_overlay){
    commit('setSigningOverlay', {show: true, status:0, msg: 'Waiting for Signature'});
  }
  commit('setIsTransacting', true);
  
  let user = state.activeAuthenticator.users[0];
  //add authorization to actions if not supplied
  payload.actions.forEach(a => {
    if (!a.authorization) {
      a.authorization = [{ actor: user.accountName, permission: "active" }];
    }
  });
  console.log(JSON.stringify(payload.actions, null, 2) );
  //sign
  try{
    console.log('trying to push trx')
    let res = await user.signTransaction(
      { actions: payload.actions },
      { broadcast: true }
    );
    
    if(!disable_signing_overlay){
      commit('setSigningOverlay', { show: true, status: 1, msg: 'Transaction Successful'});
      dispatch('hideSigningOverlay', 1000);
    }
    commit('setIsTransacting', false);
    console.log(res);
    return res;
  }catch(e){
    // console.log(e, e.cause);
    if(!disable_signing_overlay){
      commit('setSigningOverlay', { show: true, status: 2, msg: await dispatch('parseUalError', e) });
      dispatch('hideSigningOverlay', 2000);
    }
    commit('setIsTransacting', false);
    notifyError({message : await dispatch('parseUalError', e) });
    return e.cause;
  }
  // let res = await user.signTransaction(
  //   { actions: payload.actions },
  //   { broadcast: true }
  // )
  // .then(res => {
    
  //   return res;
  // })
  // .catch(e =>{
  //   console.log('catch block');
  //   console.log(e, e.cause);
  //   return e;
  // })
  // commit('setIsTransacting', false);
  // return res;
}

export async function parseUalError({}, error){
  let cause = 'unknown cause';
  let error_code ='';
  if(error.cause){
    cause = error.cause.reason || error.cause.message || 'Report this error to enhance the UX';
    error_code = error.cause.code || error.cause.errorCode || "";
  }
  return `${error}. ${cause} ${error_code}`;
}

export async function hideSigningOverlay({ commit }, ms=10000) {
  await new Promise(resolve=>{setTimeout(resolve,ms)})
  commit('setSigningOverlay', { show: false, status:0});
}
