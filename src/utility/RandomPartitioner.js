function partition(N,k) {
  if( N === 0 ) return k === 0 ? [0] : Array(k).fill(0);
  
  let A = [0];
  
  for(let i = 0 ; i <k ; i++){
    A.push( Math.random()*N );
  }
  
  A = [...A,N];
  
  A.sort((a,b)=>a-b);
  
  const B = [...A].shift();
  
  return A.map((e,i)=>A[i+1] ? A[i+1] - e : null).slice(0, -1);
  
  //console.log(C);
};

export default partition;