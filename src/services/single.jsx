import { urls } from "./config";

const getRecepie = pageId => {
  return new Promise((resolve, rej) => {
    fetch(`${urls.recepie}/recepie-${pageId}.json`)
      .then(res => res.json())
      .then(resData => resolve(resData))
      .catch(err => rej(err));
  })
}
const getProducts = pageId => {
  return new Promise((resolve, rej) => {
    fetch(`${urls.products}/products-${pageId}.json`)
    .then(res => res.json())
    .then(resData => resolve(resData))
    .catch(err => rej(err));
  })
}

export const getData = id => {
  return Promise.all([getRecepie(id), getProducts(id)])
    .then(resData => resData)
}