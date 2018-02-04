import { normalize, schema } from 'normalizr';

const input = [{ name: "IT", users: [{ id: 1, time: 1000 }, { id: 2, time: 650 }] }];

//const data = [{ name: "IT", users: [ { type: 'admin', name: 'Beth' }, { type: 'user', name: 'Gren' } ] }];

const data = { name: "IT", user: [{ type: 'admin', name: 'Beth', time: 1000}, { type: 'admin', name: 'Gren', time: 650}] };

//args:
//d - data (the original json object)
//k - keys (the keys to look for to find children inside)
//
const ReformJSON2 = function(d, k) {
  
// Example data response

const user = new schema.Entity('users', {}, { processStrategy: (v,p,k)=>({ ...v, id_: Array.isArray(p[k]) ? p[k].indexOf(v) : 0 }), idAttribute: (v,p,k)=> Array.isArray(p[k]) ? p[k].indexOf(v) : 0});
  
const room = new schema.Entity('rooms', {user: [user]}, { processStrategy: (v,p,k)=>({ ...v, id_: Array.isArray(p[k]) ? p[k].indexOf(v) : 0}), idAttribute: (v,p,k)=>Array.isArray(p[k]) ? p[k].indexOf(v) : 0});

//const roomsSchema = [roomSchema];
  
//const responseSchema = { rooms: new schema.Array(roomsSchema), users: new schema.Array(usersSchema) };

const normalizedData = normalize(data, room);
  
  console.log(normalizedData);
  
  return normalizedData;
};

const ReformJSON1 = function () {
  
  const data = { id_str: '123', url: 'https://twitter.com', keen: { id_str: '456', name: 'Jimmy' } };

  const user = new schema.Entity('users', {}, { idAttribute: 'id_str' });
  const tweet = new schema.Entity('tweets', { keen: user }, { idAttribute: 'id_str'});

  const normalizedData = normalize(data, tweet);
  
  console.log(normalizedData);
};


export default ReformJSON;