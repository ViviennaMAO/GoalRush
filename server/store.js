// JSON 文件持久化层(MVP 用 · 上生产换 Postgres)
// 对应 PRD §6.1 数据模型

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'db.json');

function load() {
  if (!fs.existsSync(DB_PATH)) {
    const empty = {
      matches: [],
      predictions: [],
      settlements: [],
      eds_grants: [],
      groups: [],
      users: {},
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2));
    return empty;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function save(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// 简单读写锁 · 单进程足够,生产环境用 DB 事务
let _db = load();
let _writeLock = Promise.resolve();

export const store = {
  get db() { return _db; },

  async write(fn) {
    _writeLock = _writeLock.then(async () => {
      const result = await fn(_db);
      save(_db);
      return result;
    });
    return _writeLock;
  },

  reload() { _db = load(); },
};
