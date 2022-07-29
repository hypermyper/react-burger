import { TIngredient, TOrder, TSetCookieProps } from "../types";

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
      // eslint-disable-next-line
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
      '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string | number | boolean, props?: TSetCookieProps) => {
  props = {
    path: '/',
    ...props,
  };
  let exp = props.expires;
  const d = new Date();
  if (typeof exp == 'number' && exp) {
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = Number(d);
  }
  if (exp && d.toUTCString) {
    props.expires = d.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, false, { expires: -1 });
};

export const getStatus = (status: string) => {
  return status === 'done' ? { text: 'Выполнен', textColor: 'green' } : status === 'pending' ? { text: 'Готовится', textColor: 'white' } : { text: 'Создан', textColor: 'red' };
}

export const filterOrdersByStatus = (arr: Array<TOrder>) => {
  return arr.reduce((acc: { [name: string]: Array<TOrder> }, curr) => {
    curr.status === 'done' ? acc['done'] = [...acc['done'], curr] : acc['pending'] = [...acc['pending'], curr]
    return acc;
  }, { done: [], pending: [] })
}

export const filterOrders = (arr: Array<TOrder>, id: string) => {
  return arr.filter((el: TOrder) => el.number === Number(id))[0]
}

const getDaysForCard = (days: number) => (
  days === 0 ? 'Сегодня'
    : days === 1 ? 'Вчера'
      : days > 1 ? `${days} дня(-ей) назад`
        : 'Что-то пошло не так:(');


export const conversionDateForCard = (date: string) => {
  const dayCreated: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime: number = Math.ceil((today.getTime() - dayCreated.getTime()) / (60 * 60 * 24 * 1000));
  const hours = dayCreated.getHours() > 9 ? dayCreated.getHours() : `0${dayCreated.getHours()}`
  const min = dayCreated.getMinutes() > 9 ? dayCreated.getMinutes() : `0${dayCreated.getMinutes()}`

  return `${getDaysForCard(diffTime)}, ${hours}:${min} i-GMT+${dayCreated.getTimezoneOffset() * (-1) / 60}`;
};

export const getPrice = (arr: Array<TIngredient>) => arr.reduce((acc: number, curr: TIngredient) => acc += curr.price, 0);

export const getBurgerIngredients = (arrIdBurgerIngredients: Array<string>, arrAllIngredients: Array<TIngredient>) => (
  arrIdBurgerIngredients.map((id) => (
    arrAllIngredients.filter((item) => item._id === id)))).flat()

type TGetBurgerIngredientsWithCountReduceAcc = {
  item: { [name: string]: TIngredient }, count: { [name: string]: number }
}

export const getBurgerIngredientsWithCount = (arr: Array<TIngredient>) => arr.reduce(
  (acc: TGetBurgerIngredientsWithCountReduceAcc, curr: TIngredient) => {
    const id = curr._id
    acc.item[id] = curr;
    acc.count[id] = (acc.count[id] || 0) + 1
    return acc
  }, { item: {}, count: {} }
);