import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common';

const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const getEventType = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};
const cities = [`Amsterdam`, `Chamonix`, `Geneva`, `London`, `Moscow`, `Brussels`, `Budapest`, `Madrid`, `Helsinki`, `Paris`, `Prague`];
const getCity = () => {
  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const getOffers = () => {
  const offerTypes = [
    {id: `Flight`, name: `Add luggage`, price: `50`, title: `luggage`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Switch to comfort`, price: `80`, title: `comfort`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Add meal`, price: `15`, title: `meal`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Choose seats`, price: `5`, title: `seats`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Flight`, name: `Travel by train`, price: `40`, title: `train`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Taxi`, name: `Order Uber`, price: `20`, title: `uber`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Drive`, name: `Rent a car`, price: `200`, title: `car`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Check-in`, name: `Add breakfast`, price: `50`, title: `breakfast`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Sightseeing`, name: `Book tickets`, price: `40`, title: `tickets`, checked: Boolean(getRandomInteger(0, 1))},
    {id: `Sightseeing`, name: `Lunch in city`, price: `30`, title: `lunch`, checked: Boolean(getRandomInteger(0, 1))},
  ];
  return offerTypes;
};

const getDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  let description = ``;
  const randomIndex = getRandomInteger(1, 5);
  for (let i = 1; i <= randomIndex; i++) {
    description += descriptions[getRandomInteger(0, descriptions.length - 1)];
  }

  return description;
};

const getPhoto = () => {
  let photos = [];
  for (let i = 1; i <= getRandomInteger(1, 6); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

let startEvent = dayjs().subtract(120, `h`);
const getDate = () => {
  const MAX_MINUTES = 59;
  const MAX_HOURS = 23;
  const hours = getRandomInteger(0, MAX_HOURS);
  const minutes = getRandomInteger(0, MAX_MINUTES);
  const start = startEvent;
  const finish = startEvent.add(hours, `h`).add(minutes, `m`);

  startEvent = finish;

  return {
    start,
    finish,
  };
};

const getDestinations = () => {
  const destinations = [];
  cities.forEach((city) => destinations.push({city, description: getDescription(), photos: getPhoto()}));

  return destinations;
};

export const getEvent = () => {
  const eventType = getEventType();
  return {
    id: nanoid(),
    eventType,
    eventTypes,
    cities,
    offers: getOffers(),
    destination: {
      description: getDescription(),
      photos: getPhoto(),
      city: getCity(),
    },
    destinations: getDestinations(),
    price: getRandomInteger(20, 200),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    date: getDate(),
  };
};

export const BLANK_POINT = {
  price: `0`,
  cities,
  eventTypes,
  eventType: eventTypes[0],
  offers: getOffers(),
  pointEventType: getEventType(),
  destinations: getDestinations(),
  destination: getDestinations()[0],
  date: {
    start: dayjs(),
    finish: dayjs(),
  },
  isFavorite: false,
};
