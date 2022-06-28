export const ACTION_TYPE = {
  ALL: 0,
  IN: 1,
  OUT: 2,
};

export const TAP_DATE_CHARTS = ['Hôm qua', 'Tháng Trước', '3 Tháng trước'];

const MONTH = Array(12)
  .fill({})
  .map((_, i) => i + 1);

export const MOCK_TRANSACTIONS = Array(15)
  .fill({})
  .map((_, i) => {
    const month = MONTH[Math.floor(Math.random() * (i > 12 ? 12 : i))];
    return {
      id: i + 1,
      charge_date: `01/${month > 9 ? month : `0${month}`}/2022`,
      label: `THU PHI DICH VỤ EXIMBANK THANG ${month}`,
      price: Math.floor(Math.random() * 10000000),
      currency: 'VND',
      type: Math.floor(Math.random() * 2) + 1,
    };
  });
