// alter table users add actual_amount VARCHAR(128) NOT NULL DEFAULT '';
module.exports = {
  // users
  ADD_OR_UPDATE_USER: 'INSERT INTO users(user_id, full_name, avatar_url, access_token) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar) ON CONFLICT(user_id) DO UPDATE SET full_name=$2, avatar_url=$3, access_token=$4',
  GET_USER: 'SELECT full_name, avatar_url FROM users WHERE user_id=$1',


  // donates
  ADD_DONATE: 'INSERT INTO donates(donate_id, user_id, view_url, currency, amount_info, addresses) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::jsonb, $6::jsonb)',
  UPDATE_DONATE: 'UPDATE donates SET  view_url=$3, currency=$4, amount_info=$5, addresses=$6 WHERE donate_id=$1 AND user_id=$2',
  GET_DONATE: 'SELECT users.user_id, full_name, avatar_url, donates.* from donates LEFT JOIN users ON donates.user_id=users.user_id WHERE donate_id=$1',
  GET_DONATE_ID_BY_USER: 'SELECT donate_id from donates WHERE user_id=$1',

  //  statistics_daily
  ADD_STATISTICS_DAILY: 'INSERT INTO statistics_daily(donate_id, url, date, uv, click) VALUES($1::varchar, $2::varchar, $3::DATE, $4::INTEGER, $5::INTEGER)',
  UPDATE_STATISTICS_DAILY_UV: 'UPDATE statistics_daily SET uv=$4, click=$5 WHERE donate_id=$1 AND url=$2 AND date=$3',
  GET_STATISTICS_DAILY: 'SELECT uv, click FROM statistics_daily WHERE donate_id=$1 AND url=$2 AND date=$3'
};

