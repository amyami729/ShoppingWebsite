// -----千分位逗號
export function currency (num) {
  // 將傳進來的數值加上 千分號 及 $ 字號
  const n = parseInt(num, 10);
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

// -----時間戳 TimeStamp
export function date (time) {
  // 換算成毫秒，取得本地的日期
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}