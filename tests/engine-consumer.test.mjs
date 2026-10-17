import test from 'node:test';
import assert from 'node:assert/strict';
import {withEngine} from '../scripts/engine-artifact.mjs';
import {legislationProfile,defaultVotingPolicy} from '../src/index.mjs';
test('civic profile consumes the pinned real engine and public-input cannot adopt',async()=>withEngine(async engine=>{
 const profile=legislationProfile({mode:'public-input'}),policy=defaultVotingPolicy({opensAt:1,closesAt:10});
 const electorate={id:'e',kind:'frozen',members:['a','b','c'].map(principalId=>({principalId,weight:'1'}))};
 const proposalDigest=engine.digest('proposal',{text:'quarterly'});
 const ballots=electorate.members.map(m=>({principalId:m.principalId,choice:'yes',castAt:5,policyId:policy.id,electorateId:'e',proposalDigest,policyDigest:engine.digest('policy',policy),electorateDigest:engine.digest('electorate',electorate)}));
 const result=engine.evaluateDecision({mode:profile.mode,policy,electorate,proposalDigest,ballots,now:10});
 assert.equal(result.status,'advisory');assert.equal(result.canAdopt,false);assert.equal(result.weights.yes,'3');
}));
