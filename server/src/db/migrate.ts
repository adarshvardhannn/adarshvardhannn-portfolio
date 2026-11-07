import { pool } from './pool.js';

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    subject         VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'new',
    ip_hash         VARCHAR(128),
    user_agent_hash VARCHAR(128),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

const CREATE_INDEXES_SQL = [
  `CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);`,
  `CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);`,
];

async function migrate(): Promise<void> {
  console.log('[Migration] Starting database migration...');

  try {
    await pool.query(CREATE_TABLE_SQL);
    console.log('[Migration] Table "contact_submissions" ensured.');

    for (const indexSql of CREATE_INDEXES_SQL) {
      await pool.query(indexSql);
    }
    console.log('[Migration] Indexes ensured.');

    console.log('[Migration] Migration completed successfully.');
  } catch (error) {
    console.error('[Migration] Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
