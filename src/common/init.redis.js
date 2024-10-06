const { createClient } = require('redis');

const client = createClient({
    url: 'redis://default:QShJXsbxqIvy4NTGYZlTVcODU571hgrQ@redis-18824.c292.ap-southeast-1-1.ec2.redns.redis-cloud.com:18824'
})

// lỗi do kết nối
client.on('error', err => console.log('Redis Client Error', error))

//server
const connectionRedis = () => {
    return client.connect()
        .then(() => console.log("REDIS CONECTED !"))
        //lỗi do server
        .catch((error) => console.log("Redis connection failed: ", error));
}

module.exports = {
    connectionRedis,
    redisClient: client
};
