import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
export async function withEngine(callback) {
 const override=process.env.DGE_ENGINE_PATH??process.env.DCE_ENGINE_PATH;
 if(override)return callback(await import(pathToFileURL(override)));
 const archive=new URL('../contracts/engine-foundation.tgz',import.meta.url);
 const provenance=JSON.parse(await readFile(new URL('../contracts/engine-provenance.json',import.meta.url),'utf8'));
 const bytes=await readFile(archive);
 if(createHash('sha256').update(bytes).digest('hex')!==provenance.sha256)throw new Error('Core artifact integrity mismatch');
 const directory=await mkdtemp(join(tmpdir(),'dce-consumer-'));
 try {
  execFileSync('tar',['xzf',fileURLToPath(archive),'-C',directory,'--no-same-owner']);
  for(const [file,expected]of Object.entries(provenance.sourceFiles)) {
   if(!/^package\.json$|^src\/[a-z-]+\.mjs$/.test(file))throw new Error('Invalid pinned source path');
   const actual=createHash('sha256').update(await readFile(join(directory,'package',file))).digest('hex');
   if(actual!==expected)throw new Error('Core source integrity mismatch');
  }
  return await callback(await import(pathToFileURL(join(directory,'package/src/index.mjs'))));
 } finally {await rm(directory,{recursive:true,force:true});}
}
