const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const file = path.join(root, '.env');
let content = fs.existsSync(file)
  ? fs.readFileSync(file, 'utf8')
  : fs.readFileSync(path.join(root, '.env.example'), 'utf8');

for (const key of ['POSTGRES_PASSWORD', 'SESSION_SECRET', 'ALERT_ENCRYPTION_KEY']) {
  const pattern = new RegExp(`^${key}=(.*)$`, 'm');
  const match = content.match(pattern);
  if (match && match[1].trim()) continue;
  const line = `${key}=${crypto.randomBytes(32).toString('hex')}`;
  content = match ? content.replace(pattern, () => line) : `${content.trimEnd()}\n${line}\n`;
}

fs.writeFileSync(file, content, { mode: 0o600 });
console.log('Local Compose secrets configured; existing values preserved.');
