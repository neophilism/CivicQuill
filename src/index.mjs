/** Application policy data only; decision authority lives in the engine. */
export function legislationProfile(overrides={}) {
  const allowed=new Set(['mode','weeklyFreeDocuments','subscriptionEnabled','creditsEnabled','singleDocumentEnabled','officialUnlimited','officialMonthlyCap']);
  for(const k of Object.keys(overrides))if(!allowed.has(k))throw new Error('Unknown or invariant setting: '+k);
  const p={mode:'collaboration',weeklyFreeDocuments:1,subscriptionEnabled:true,creditsEnabled:true,singleDocumentEnabled:true,officialUnlimited:true,officialMonthlyCap:null,...overrides};
  if(!['collaboration','public-input'].includes(p.mode))throw new Error('Invalid document mode');
  if(!Number.isSafeInteger(p.weeklyFreeDocuments)||p.weeklyFreeDocuments<0)throw new Error('Invalid free document allowance');
  if(p.officialMonthlyCap!==null&&(!Number.isSafeInteger(p.officialMonthlyCap)||p.officialMonthlyCap<0))throw new Error('Invalid official grant cap');
  for(const k of ['subscriptionEnabled','creditsEnabled','singleDocumentEnabled','officialUnlimited'])if(typeof p[k]!=='boolean')throw new Error('Invalid boolean: '+k);
  if(p.officialUnlimited && p.officialMonthlyCap!==null)throw new Error('Unlimited grant cannot also have a cap');
  return Object.freeze({...p,product:'legislation',audience:'public',weighting:'equal',anchorRequired:true,canAdopt:p.mode==='collaboration',participationRequiresSubscription:false,
    officialGrantPurpose:'verified US federal/state/local office legislative work',heavyUseConversion:'explicit offer, never automatic charge'});
}
export function defaultVotingPolicy({id='civic-majority',opensAt,closesAt}={}) {
  return {id,weighting:'equal',allowEarlyClose:false,opensAt,closesAt,minYes:'1',quorum:{kind:'count',minimum:'3'},approval:{basis:'decisive',comparison:'gt',numerator:'1',denominator:'2'}};
}
export const signatureFonts=Object.freeze([{id:'tychos-elegy',displayName:"Tycho's Elegy",designer:'Pia Frauss',status:'license-required',enabled:false,source:'https://www.pia-frauss.com/fonts/te.htm',requiredRights:['commercial use','web embedding','PDF embedding and distribution']}]);
