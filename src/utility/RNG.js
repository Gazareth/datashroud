//returns a random integer between 0 and N, with optional exponential curve
export const ri_ = (r=1,e=1)=>Math.round(Math.pow(Math.random(),e)*r);  //rounded random number

//returns k bins of random sizes that add up to N
export const ra_ = (N,k)=> {
  if( N === 0 ) return k === 0 ? [0] : Array(k).fill(0);
  
  let A = [0];
  
  for(let i = 1 ; i <k ; i++){
    A.push( Math.random()*N );
  }
  
  A = [...A,N];
  
  A.sort((a,b)=>a-b);
  
  const B = [...A].shift();
  
  return A.map((e,i)=>A[i+1] ? A[i+1] - e : null).slice(0, -1);
  
  //console.log(C);
};

//picks a random element from an array, with optional exponential curve (uses ri_)
//A - array
//b - beginRatio (if slicing)
//e - endRatio (if slicing)
//ex - exponent (if you want randomness to be weighted)
export const rp_ = (A,b=0,e=1,ex=1)=>{
  const Ai = (x)=>Math.round(x*(A.length-1)); //get index of A from a ratio of how far along
  const a = A.slice(Ai(b),Ai(e));
  
  return a[ri_(a.length-1,ex)];
};