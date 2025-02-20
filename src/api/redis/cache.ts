import axios from 'axios';
import Redis from 'ioredis';

const defaultRedis = new Redis({
    host: "localhost",
    port: 6379,
    db: 0,
});

const REDIS_TTL = 60 * 60; // 1 hour

export const getCache = async <T>(url: string, redis: Redis = defaultRedis): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const cacheData = await redis.get(url);
            if (cacheData) {
                resolve(JSON.parse(cacheData));
            }
            const freshData = await axios.get<T>(url);
            await redis.set(url, JSON.stringify(freshData), 'EX', REDIS_TTL);
            resolve(freshData.data);
        } catch (error) {   
            reject(error);
        }
    });
}
