import {withEngine} from './engine-artifact.mjs';
import assert from 'node:assert/strict';
import {legislationProfile,defaultVotingPolicy} from '../src/index.mjs';
await withEngine(async engine=>{
const p=legislationProfile({mode:'public-input'});engine.validatePolicy(defaultVotingPolicy({opensAt:1,closesAt:2}));
assert.equal(p.canAdopt,false);assert.equal(p.anchorRequired,true);
console.log('Legislation profile and real engine consumer contract passed.');

});
