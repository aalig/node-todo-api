const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

it('should expect some values', () => {
    expect(12).toNotBe(11);
});