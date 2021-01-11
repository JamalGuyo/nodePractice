const bcrypt = require('bcrypt');

// technique 1: create hashed password
// const hashPassword = async(pw)=>{
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash)
// }
// technique 2 : create hashed password 
const hashPassword = async(pw)=>{
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash)
}
// check password
const login = async(pw, hash) => {
    const result = await bcrypt.compare(pw, hash);
    if(result){
        console.log('successfully logged in! password matched!')
    }else{
        console.log('incorrect');
    }
}
// hashPassword("monkey");
login('monkeY', '$2b$12$gCmUj2pkzo3CTeqGPOtp1e2pcoBPF3a5yBz5VtvJV05PmMUGmNkEq'
)