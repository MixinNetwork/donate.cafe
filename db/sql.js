module.exports = {
  // users
  ADD_OR_UPDATE_USER: 'INSERT INTO users(user_id, full_name, avatar_url, access_token) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar) ON CONFLICT(user_id) DO UPDATE SET full_name=$2, avatar_url=$3, access_token=$4',
  GET_USER: 'SELECT full_name, avatar_url FROM users WHERE user_id=$1',
  GET_USER_BY_TOKEN: 'SELECT user_id FROM users WHERE access_token=$1',


  // donates
  ADD_DONATE: 'INSERT INTO donates(donate_id, user_id, view_url, currency, amount_info, addresses) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::jsonb, $6::jsonb)',
  UPDATE_DONATE_NAME: 'UPDATE donates SET name=$2 WHERE donate_id=$1',
  UPDATE_DONATE: 'UPDATE donates SET view_url=$2, currency=$3, amount_info=$4, addresses=$5 WHERE donate_id=$1',
  UPDATE_DONATE_WITHOUT_VIEW_URL: 'UPDATE donates SET currency=$2, amount_info=$3, addresses=$4 WHERE donate_id=$1',
  GET_DONATE: 'SELECT users.user_id, full_name, avatar_url, donates.* from donates LEFT JOIN users ON donates.user_id=users.user_id WHERE donate_id=$1',
  GET_DONATE_ID_BY_NAME: 'SELECT donate_id from donates WHERE name=$1',
  GET_DONATE_ID_BY_USER: 'SELECT donate_id from donates WHERE user_id=$1',

  //  statistics_daily
  ADD_STATISTICS_DAILY: 'INSERT INTO statistics_daily(donate_id, date, uv, click) VALUES($1::varchar, $2::DATE, $3::INTEGER, $4::INTEGER)',
  UPDATE_STATISTICS_DAILY_UV: 'UPDATE statistics_daily SET uv=$3, click=$4 WHERE donate_id=$1 AND date=$2',
  GET_STATISTICS_DAILY: 'SELECT uv, click FROM statistics_daily WHERE donate_id=$1 AND date=$2'
};

