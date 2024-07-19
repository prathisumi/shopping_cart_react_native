import moment from 'moment';

export const getAmountFormat = (num: number) => {
  num?.toString().replace('$', '');
  let x = parseFloat(num?.toString()).toFixed(2);
  let a =
    x.toString().split('.')[0].length > 3
      ? x
          .toString()
          .substring(0, x.toString().split('.')[0].length - 3)
          .replace(/\B(?=(\d{2})+(?!\d))/g, ',') +
        ',' +
        x.toString().substring(x.toString().split('.')[0].length - 3)
      : x.toString();

  return '$ ' + a;
};

export const getFormatedDate = (date: string = '') => {
  if (date) {
    return moment(date).format('DD-MM-YYYY hh:mm A');
  }
  return '';
};
