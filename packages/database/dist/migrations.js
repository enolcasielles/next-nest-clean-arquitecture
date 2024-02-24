var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';
export const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionString = 'postgresql://enolcasielles:SZd0Hp4vkIsF@ep-cold-rice-a2hhsw6k.eu-central-1.aws.neon.tech/test?sslmode=require';
    const sql = neon(connectionString);
    const db = drizzle(sql);
    yield migrate(db, { migrationsFolder: 'drizzle' });
});
runMigrations();
//# sourceMappingURL=migrations.js.map