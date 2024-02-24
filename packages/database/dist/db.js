import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schemas/index';
const sql = neon('postgresql://enolcasielles:SZd0Hp4vkIsF@ep-cold-rice-a2hhsw6k.eu-central-1.aws.neon.tech/test?sslmode=require');
const db = drizzle(sql, {
    schema
});
export default db;
//# sourceMappingURL=db.js.map