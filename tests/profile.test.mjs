import test from 'node:test';
import assert from 'node:assert/strict';
import {legislationProfile,defaultVotingPolicy,signatureFonts} from '../src/index.mjs';
test('public civic defaults preserve equal votes, public anchors and free participation',()=>{
 const p=legislationProfile();assert.equal(p.weighting,'equal');assert.equal(p.anchorRequired,true);assert.equal(p.participationRequiresSubscription,false);assert.equal(p.weeklyFreeDocuments,1);
});
test('feedback profile cannot authorize adoption',()=>{assert.equal(legislationProfile({mode:'public-input'}).canAdopt,false);});
test('creator monetization is data and elected-office grants can be limited explicitly',()=>{
 const p=legislationProfile({weeklyFreeDocuments:0,officialUnlimited:false,officialMonthlyCap:50,singleDocumentEnabled:false});assert.equal(p.officialMonthlyCap,50);assert.equal(p.singleDocumentEnabled,false);
 assert.throws(()=>legislationProfile({officialMonthlyCap:50}));
});
test('unrecognized settings cannot disable civic invariants',()=>{
 for(const change of [{anchorRequired:false},{weighting:'shares'},{weeklyFreeDocuments:-1},{mode:'mutable-feedback'},{subscriptionEnabled:'yes'}])assert.throws(()=>legislationProfile(change));
});
test('Tycho font is reserved without claiming to have a distribution license',()=>{assert.equal(signatureFonts[0].displayName,"Tycho's Elegy");assert.equal(signatureFonts[0].enabled,false);});
test('policy explicitly identifies majority denominator and closure',()=>{const p=defaultVotingPolicy({opensAt:1,closesAt:10});assert.equal(p.approval.comparison,'gt');assert.equal(p.approval.basis,'decisive');assert.equal(p.allowEarlyClose,false);});
