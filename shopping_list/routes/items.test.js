process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');


let food = [
  {name: 'pickles', price: '$3.00'},
  {name: 'cheese', price: '$2.50'},
  {name: 'milk', price: '$3.25'}
];

beforeEach(function() {
    items.push(...food);
})

afterEach(function() {
  items.length = 0;
})

describe('GET /items',  () => {
  test('Get all items', async () => {
    const res = await request(app).get('/items')
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: food })
  })
})

describe('POST /items', () => {
  test('Create a new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({name: 'sugar', price: '$4.00'});
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: {name: 'sugar', price: '$4.00'} });
  })
  test('Responds with 400 if name is missing', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.statusCode).toBe(400);
  })
})

describe('GET /items/:name', () => {
  test('Display a single item', async () => {
    const itemName = 'cheese';
    const res = await request(app).get(`/items/${itemName}`)
    expect(res.statusCode).toBe(200);
    expect(res.body.items).toEqual( {name: 'cheese', price: '$2.50'})
  })
  test('Responds with 404 for invalid item', async () => {
    const res = await request(app).get(`/items/coolwhip`)
    expect(res.statusCode).toBe(404);
  })
})

describe('/PATCH /items/:name', () => {
  test('Updating a item', async () => {
    const updatedItem = { name: 'sugar', price: '$3.00'}
    const res = await request(app)
      .patch(`/items/${food[0].name}`)
      .send(updatedItem);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({items: updatedItem}) 
  })
  test('Respsonds with 404 for invalid name', async () => {
    const updatedItem = { name: 'sugar', price: '$3.00'}
    const res = await request(app).patch(`/items/piggles`).send(updatedItem);
    expect(res.statusCode).toBe(404)
  })
})

describe('/DELETE /items/:name', () => {
  test('Deleting a item', async () => {
    const itemName = 'cheese'
    const res = await request(app).delete(`/items/${itemName}`)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
  })
  test('Respsonds with 404 for deleting invalid item', async () => {
    const res = await request(app).delete(`/items/sweetTea`)
    expect(res.statusCode).toBe(404);
  })
})