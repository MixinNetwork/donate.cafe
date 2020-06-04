
CREATE TABLE IF NOT EXISTS users (
  user_id             VARCHAR(36) NOT NULL PRIMARY KEY,
  full_name           VARCHAR(1024) NOT NULL,
  avatar_url          VARCHAR(1024) NOT NULL,
  access_token        VARCHAR(512) NOT NULL DEFAULT '',
  created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donates (
  donate_id           VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id             VARCHAR(1024) NOT NULL,
  view_url            VARCHAR(1024) NOT NULL DEFAULT '',
  currency            varchar(3) NOT NULL DEFAULT 'USD',
  amount_info         JSONB NOT NULL,
  addresses           JSONB NOT NULL,
  created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS statistics_daily (
  donate_id           VARCHAR(36) NOT NULL,
  url                 VARCHAR(1024) NOT NULL,
  click               INTEGER NOT NULL DEFAULT 0,
  uv                  INTEGER NOT NULL DEFAULT 0,
  date                DATE NOT NULL DEFAULT NOW(),
  PRIMARY KEY(donate_id, date, url)
);

