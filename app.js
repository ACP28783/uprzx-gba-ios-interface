const $ = s => document.querySelector(s);
const romInput = $('#rom'), statusEl = $('#romStatus'), infoEl = $('#romInfo'), settings = $('#settings'), runBtn = $('#run'), outputEl = $('#output');
let loaded = null;
const dexNames = ['','Bulbasaur','Ivysaur','Venusaur','Charmander','Charmeleon','Charizard','Squirtle','Wartortle','Blastoise','Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidoran♀','Nidorina','Nidoqueen','Nidoran♂','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton','Farfetch’d','Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan','Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','Mr. Mime','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto','Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew','Chikorita','Bayleef','Meganium','Cyndaquil','Quilava','Typhlosion','Totodile','Croconaw','Feraligatr','Sentret','Furret','Hoothoot','Noctowl','Ledyba','Ledian','Spinarak','Ariados','Crobat','Chinchou','Lanturn','Pichu','Cleffa','Igglybuff','Togepi','Togetic','Natu','Xatu','Mareep','Flaaffy','Ampharos','Bellossom','Marill','Azumarill','Sudowoodo','Politoed','Hoppip','Skiploom','Jumpluff','Aipom','Sunkern','Sunflora','Yanma','Wooper','Quagsire','Espeon','Umbreon','Murkrow','Slowking','Misdreavus','Unown','Wobbuffet','Girafarig','Pineco','Forretress','Dunsparce','Gligar','Steelix','Snubbull','Granbull','Qwilfish','Scizor','Shuckle','Heracross','Sneasel','Teddiursa','Ursaring','Slugma','Magcargo','Swinub','Piloswine','Corsola','Remoraid','Octillery','Delibird','Mantine','Skarmory','Houndour','Houndoom','Kingdra','Phanpy','Donphan','Porygon2','Stantler','Smeargle','Tyrogue','Hitmontop','Smoochum','Elekid','Magby','Miltank','Blissey','Raikou','Entei','Suicune','Larvitar','Pupitar','Tyranitar','Lugia','Ho-Oh','Celebi','Treecko','Grovyle','Sceptile','Torchic','Combusken','Blaziken','Mudkip','Marshtomp','Swampert','Poochyena','Mightyena','Zigzagoon','Linoone','Wurmple','Silcoon','Beautifly','Cascoon','Dustox','Lotad','Lombre','Ludicolo','Seedot','Nuzleaf','Shiftry','Taillow','Swellow','Wingull','Pelipper','Ralts','Kirlia','Gardevoir','Surskit','Masquerain','Shroomish','Breloom','Slakoth','Vigoroth','Slaking','Nincada','Ninjask','Shedinja','Whismur','Loudred','Exploud','Makuhita','Hariyama','Azurill','Nosepass','Skitty','Delcatty','Sableye','Mawile','Aron','Lairon','Aggron','Meditite','Medicham','Electrike','Manectric','Plusle','Minun','Volbeat','Illumise','Roselia','Gulpin','Swalot','Carvanha','Sharpedo','Wailmer','Wailord','Numel','Camerupt','Torkoal','Spoink','Grumpig','Spinda','Trapinch','Vibrava','Flygon','Cacnea','Cacturne','Swablu','Altaria','Zangoose','Seviper','Lunatone','Solrock','Barboach','Whiscash','Corphish','Crawdaunt','Baltoy','Claydol','Lileep','Cradily','Anorith','Armaldo','Feebas','Milotic','Castform','Kecleon','Shuppet','Banette','Duskull','Dusclops','Tropius','Chimecho','Absol','Wynaut','Snorunt','Glalie','Spheal','Sealeo','Walrein','Clamperl','Huntail','Gorebyss','Relicanth','Luvdisc','Bagon','Shelgon','Salamence','Beldum','Metang','Metagross','Regirock','Regice','Registeel','Latias','Latios','Kyogre','Groudon','Rayquaza','Jirachi','Deoxys'];
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function ascii(b,s,n){return String.fromCharCode(...b.slice(s,s+n)).replace(/[^\x20-\x7E]/g,'·');}
function u16(b,o){return b[o]|(b[o+1]<<8)} function u32(b,o){return (b[o]|b[o+1]<<8|b[o+2]<<16|b[o+3]<<24)>>>0}
function readPtr(b,o){return u32(b,o)-0x08000000;}
function findAll(b, needle){const out=[]; outer:for(let i=0;i<=b.length-needle.length;i++){for(let j=0;j<needle.length;j++)if(b[i+j]!==needle[j])continue outer;out.push(i);}return out;}
function decodeHex(s){return s.match(/../g).map(x=>parseInt(x,16));}
function detect(b){const game=ascii(b,0xAC,4),version=b[0xBC];return ROMS.find(r=>r.game===game&&r.version===version)||null;}
function speciesMap(b){const prefix=decodeHex('0448814208D0481C0004000C05E00000');const matches=findAll(b,prefix);if(matches.length!==3)throw new Error(`Expected the original Gen 3 Pokédex pointer signature 3 times; found ${matches.length}. This ROM may be a hack, unsupported revision, or bad dump.`);const table=readPtr(b,matches[1]+16);if(table<0||table+822>b.length)throw new Error('Pokédex mapping pointer is outside this ROM.');const valid=[];for(let internal=1;internal<=411;internal++){const dex=u16(b,table+(internal-1)*2);if(dex>=1&&dex<=386)valid.push({internal,dex});}if(valid.length<200)throw new Error('Pokédex mapping did not look valid; refusing to modify this ROM.');return valid;}
function populateStarterSelectors(mapping,current){
  for(let slot=1;slot<=3;slot++){
    const select=$(`#starter${slot}`); if(!select) continue;
    const previous=select.value; select.replaceChildren(new Option('Random Pokémon','random'));
    const sorted=mapping.slice().sort((a,b)=>a.dex-b.dex||a.internal-b.internal);
    for(const item of sorted){
      const name=dexNames[item.dex]||`Pokémon ${item.dex}`;
      select.add(new Option(`#${item.dex} ${name}`,String(item.internal)));
    }
    select.value=[...select.options].some(o=>o.value===previous)?previous:'random';
    select.disabled=false;
  }
}
function seededRng(seed){let a=0x9e3779b9;for(let i=0;i<seed.length;i++)a=Math.imul(a^seed.charCodeAt(i),2654435761)>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function sample(pool,n,rng){const a=pool.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);}
let ROMS=[];fetch('./rom-database.json').then(r=>r.json()).then(x=>ROMS=x).catch(()=>{});
romInput.addEventListener('change',async()=>{loaded=null;infoEl.hidden=true;outputEl.hidden=true;runBtn.disabled=true;const f=romInput.files?.[0];if(!f){statusEl.textContent='No ROM selected.';return;}statusEl.className='status';statusEl.textContent='Reading ROM locally…';try{if(!ROMS.length)ROMS=await (await fetch('./rom-database.json')).json();const bytes=new Uint8Array(await f.arrayBuffer());if(bytes.length<0xC0)throw new Error('File is too small to be a GBA ROM.');const code=ascii(bytes,0xAC,4), version=bytes[0xBC], entry=detect(bytes);if(!entry)throw new Error(`Game code ${code}, revision ${version} is not in the supported database. Supported: US/EU Ruby and Sapphire, US Emerald, US FireRed/LeafGreen 1.0 and 1.1.`);const mapping=speciesMap(bytes);if(entry.starterOffset+520>=bytes.length)throw new Error('Starter table offset is outside this file.');const starterOffsets=entry.type==='FRLG'?[entry.starterOffset,entry.starterOffset+5,entry.starterOffset+515,entry.starterOffset+520,entry.starterOffset+461,entry.starterOffset+466]:[entry.starterOffset,entry.starterOffset+2,entry.starterOffset+4];const current=entry.type==='FRLG'?[u16(bytes,entry.starterOffset),u16(bytes,entry.starterOffset+515),u16(bytes,entry.starterOffset+461)]:[u16(bytes,entry.starterOffset),u16(bytes,entry.starterOffset+2),u16(bytes,entry.starterOffset+4)];loaded={file:f,bytes,entry,mapping,current};populateStarterSelectors(mapping,current);infoEl.innerHTML=[['File',f.name],['Size',(bytes.length/1048576).toFixed(2)+' MiB'],['Game code',code],['Revision',version],['Detected game',entry.label],['Valid species slots',mapping.length],['Current starter IDs',current.map(id=>{const m=mapping.find(x=>x.internal===id);return m?`#${m.dex} ${dexNames[m.dex]||''}`:`internal ID ${id}`}).join(' · ')]].map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('');infoEl.hidden=false;statusEl.className='status good';statusEl.textContent='ROM recognized. Starter randomization is available and runs locally.';runBtn.disabled=false;}catch(e){statusEl.className='status bad';statusEl.textContent=e.message||'Could not read this ROM.';}}
);
$('#preset').addEventListener('change',e=>{const p=e.target.value;$('#includeLegends').checked=p==='chaos';$('#excludeCurrent').checked=p!=='chaos';});
runBtn.addEventListener('click',()=>{
 if(!loaded)return;
 try{
  const out=loaded.bytes.slice(),{entry,mapping,current,file}=loaded;
  const seed=$('#seed').value.trim()||`${Date.now()}-${file.name}`; const rng=seededRng(seed);
  const legends=[144,145,146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386];
  let pool=mapping.filter(x=>x.dex>=1&&x.dex<=386);
  if(!$('#includeLegends').checked)pool=pool.filter(x=>!legends.includes(x.dex));
  if($('#excludeCurrent').checked)pool=pool.filter(x=>!current.includes(x.internal));
  if(entry.type==='FRLG')pool=pool.filter(x=>x.dex!==201); // Unown outside Tanoby Ruins can crash FRLG.
  if(!pool.length)throw new Error('The current random pool is empty. Change the legendary/current-starter settings.');
  const selects=[1,2,3].map(n=>$(`#starter${n}`).value);
  const fixed=selects.filter(v=>v!=='random').map(Number);
  if(new Set(fixed).size!==fixed.length)throw new Error('Choose a different Pokémon for each manually selected starter slot.');
  const chosen=[];
  for(let i=0;i<3;i++){
    if(selects[i]!=='random'){
      const found=mapping.find(x=>x.internal===Number(selects[i])); if(!found)throw new Error('A selected Pokémon is not valid for this ROM. Please choose it again.'); chosen.push(found);
    } else { const available=pool.filter(x=>!chosen.some(y=>y.internal===x.internal)&&!fixed.includes(x.internal)); if(!available.length)throw new Error('Not enough Pokémon remain in the pool.'); chosen.push(available[Math.floor(rng()*available.length)]); }
  }
  const ids=chosen.map(x=>x.internal);
  if(entry.type==='FRLG'){
    u16write(out,entry.starterOffset,ids[0]);u16write(out,entry.starterOffset+5,ids[1]);u16write(out,entry.starterOffset+515,ids[1]);u16write(out,entry.starterOffset+520,ids[2]);u16write(out,entry.starterOffset+461,ids[2]);u16write(out,entry.starterOffset+466,ids[0]);
  }else{u16write(out,entry.starterOffset,ids[0]);u16write(out,entry.starterOffset+2,ids[1]);u16write(out,entry.starterOffset+4,ids[2]);}
  const opts={wild:$('#optWild').checked,trainers:$('#optTrainers').checked,stats:$('#optStats').checked,types:$('#optTypes').checked,abilities:$('#optAbilities').checked,moves:$('#optMoves').checked,evos:$('#optEvos').checked,tmhm:$('#optTMHM').checked};
  const offsets=resolveOffsets(out,entry);
  if(opts.stats||opts.types||opts.abilities)randomizeStats(out,offsets.stats,mapping,opts,rng);
  if(opts.moves)randomizeMovesets(out,offsets.movesets,mapping,entry.moveCount||354,rng);
  if(opts.evos)randomizeEvolutions(out,offsets.evolutions,mapping,rng);
  if(opts.tmhm)randomizeTMHM(out,offsets.tmhm,mapping,rng);
  let wildCount=0,trainerCount=0;
  if(opts.wild)wildCount=randomizeWild(out,mapping,entry.type==='FRLG',rng);
  if(opts.trainers)trainerCount=randomizeTrainers(out,offsets.trainers,entry.trainerEntrySize||40,entry.trainerCount||0x2e7,mapping,rng);
  const changes=[`Seed: ${seed}`, ...chosen.map((x,i)=>`Starter ${i+1}: #${x.dex} ${dexNames[x.dex]||'Pokémon'}`)];
  if(opts.stats)changes.push('Base stats shuffled (stat totals preserved).');if(opts.types)changes.push('Pokémon types randomized.');if(opts.abilities)changes.push('Abilities randomized.');if(opts.moves)changes.push('Level-up moves randomized.');if(opts.evos)changes.push('Evolution destinations randomized.');if(opts.tmhm)changes.push('TM/HM compatibility randomized.');if(opts.wild)changes.push(`Wild encounter slots changed: ${wildCount}.`);if(opts.trainers)changes.push(`Trainer party members changed: ${trainerCount}.`);
  const blob=new Blob([out],{type:'application/octet-stream'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=file.name.replace(/\.gba$/i,'')+'-randomized.gba';a.textContent='Save randomized ROM to Files';a.className='download-link';$('#download').replaceChildren(a);$('#resultText').textContent=changes.join('\n')+'\n\nOriginal ROM left unchanged. Processing happened locally in this browser. Advanced options are experimental; verify the ROM in an emulator.';outputEl.hidden=false;outputEl.scrollIntoView({behavior:'smooth',block:'start'});statusEl.className='status good';statusEl.textContent='ROM generated. Review the change log and test the output before playing.';
 }catch(e){statusEl.className='status bad';statusEl.textContent=e.message||'Randomization failed.';}
});
function resolveOffsets(b,e){
 const ptr=o=>{if(o<0||o+4>b.length)throw new Error('Required table pointer is outside the ROM.');const p=readPtr(b,o);if(p<0||p>=b.length)throw new Error('A required table pointer is invalid for this ROM revision.');return p;};
 return {stats:e.statsOffset!=null?e.statsOffset:ptr(e.statsPointerOffset||0x1BC),movesets:e.movesetsPointerOffset?ptr(e.movesetsPointerOffset):(e.movesetsOffset),evolutions:e.evolutionsPointerOffset?ptr(e.evolutionsPointerOffset):e.evolutionsOffset,tmhm:e.tmhmPointerOffset?ptr(e.tmhmPointerOffset):e.tmhmOffset,trainers:e.trainerPointerOffset?ptr(e.trainerPointerOffset):e.trainerOffset};
}
function randomizeStats(b,base,mapping,opts,rng){
 if(!Number.isInteger(base)||base<0||base+411*28>b.length)throw new Error('Base-stat table could not be safely located.');
 const types=[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17];
 for(const m of mapping){const o=base+m.internal*28;if(o+24>b.length)continue;
  if(opts.stats){const vals=Array.from(b.slice(o,o+6));for(let i=vals.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[vals[i],vals[j]]=[vals[j],vals[i]];}b.set(vals,o);}
  if(opts.types){b[o+6]=types[Math.floor(rng()*types.length)];b[o+7]=rng()<0.35?b[o+6]:types[Math.floor(rng()*types.length)];}
  if(opts.abilities){b[o+22]=1+Math.floor(rng()*77);b[o+23]=1+Math.floor(rng()*77);}
 }
}
function randomizeMovesets(b,table,mapping,moveCount,rng){
 if(!Number.isInteger(table)||table<0||table+411*4>b.length)throw new Error('Level-up moves table could not be safely located.');let changed=0;
 for(const m of mapping){let p=readPtr(b,table+m.internal*4);if(p<0||p+2>b.length)continue;let guard=0;while(p+1<b.length&&guard++<100){if(b[p]===255&&b[p+1]===255)break;let id=b[p]|((b[p+1]&1)<<8);if(id>0&&id<=moveCount){let v=1+Math.floor(rng()*moveCount);b[p]=v&255;b[p+1]=(b[p+1]&0xFE)|((v>>8)&1);changed++;}p+=2;}}
 if(!changed)throw new Error('No valid learnset entries were found. This revision may use an unsupported moveset layout.');return changed;
}
function randomizeEvolutions(b,base,mapping,rng){if(!Number.isInteger(base)||base<0||base+411*0x28>b.length)throw new Error('Evolution table could not be safely located.');let n=0;for(const m of mapping){const o=base+m.internal*0x28;for(let j=0;j<5;j++){const q=o+j*8,method=u16(b,q),target=u16(b,q+4);if(method>=1&&method<=15&&target>0&&target<=411){u16write(b,q+4,mapping[Math.floor(rng()*mapping.length)].internal);n++;}}}if(!n)throw new Error('No evolution entries found in this ROM.');return n;}
function randomizeTMHM(b,base,mapping,rng){if(!Number.isInteger(base)||base<0||base+411*8>b.length)throw new Error('TM/HM compatibility table could not be safely located.');for(const m of mapping){const o=base+m.internal*8;for(let j=0;j<8;j++)b[o+j]=Math.floor(rng()*256);}return mapping.length;}
function randomizeWild(b,mapping,isFRLG,rng){const prefix=decodeHex('0348048009E00000FFFF0000'),matches=findAll(b,prefix);if(!matches.length)throw new Error('Wild encounter table signature not found. This ROM revision is not supported for wild randomization.');const table=readPtr(b,matches[0]+12);if(table<0||table+20>b.length)throw new Error('Wild encounter table pointer is invalid.');const pool=isFRLG?mapping.filter(x=>x.dex!==201):mapping;let count=0,seen=new Set(),bank=0;for(let rec=table;rec+20<=b.length&&bank++<1000;rec+=20){if(b[rec]===255&&b[rec+1]===255)break;for(const po of [4,8,12,16]){const area=readPtr(b,rec+po);if(area<0||area+8>b.length||b[area]===0)continue;const data=readPtr(b,area+4);if(data<0||data+4>b.length||seen.has(data))continue;seen.add(data);const slots=po===4?12:po===16?10:5;for(let i=0;i<slots;i++){const q=data+i*4;if(q+3>=b.length)break;const chosen=pool[Math.floor(rng()*pool.length)];u16write(b,q+2,chosen.internal);count++;}}}if(!count)throw new Error('No wild encounter slots were found. Refusing to export a partially randomized ROM.');return count;}
function randomizeTrainers(b,base,entrySize,trainerCount,mapping,rng){if(!Number.isInteger(base)||base<0||base+entrySize*2>b.length)throw new Error('Trainer table could not be safely located.');let count=0;for(let i=1;i<trainerCount;i++){const t=base+i*entrySize;if(t+entrySize>b.length)break;const kind=b[t];if(kind>3)break;const num=b[t+entrySize-8];if(num<1||num>6)continue;const p=readPtr(b,t+entrySize-4);if(p<0||p>=b.length)continue;const stride=(kind===1||kind===3)?16:8;if(p+num*stride>b.length)continue;for(let j=0;j<num;j++){const q=p+j*stride+4;const chosen=mapping[Math.floor(rng()*mapping.length)];u16write(b,q,chosen.internal);count++;}}if(!count)throw new Error('No trainer party members could be safely identified.');return count;}
function u16write(b,o,v){b[o]=v&255;b[o+1]=(v>>>8)&255;}
if('serviceWorker'in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
