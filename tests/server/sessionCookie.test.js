const app = require('../../server/index');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../../server/database/models/userModel');

const data = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  password: 'password',
  number: '1010101010',
};

const wrongData = {
  email: 'john@example.com',
  password: 'wrongpassword',
};

beforeAll(async () => {
  openDBConnection();

  bcrypt.hash(data.password, 11, async (error, hash) => {
    try {
      const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hash,
        number: data.number,
      });
      if (user) console.log('User successfully created');
    } catch (error) {
      console.log(error);
    }
  });
});

afterAll(async () => {
  try {
    const user = await User.deleteOne({
      email: data.email,
    });
    if (user.deletedCount === 1) console.log('User successfully deleted');
  } catch (error) {
    console.log(error);
  }

  closeDBConnection().then(() => {
    console.log('Database connection successfully closed!');
  });
});

describe('Session cookie test', () => {
  it('Login cookie test', async () => {
    const response = await supertest(app).post('/api/users/user').send(data);

    expect(response.statusCode).toEqual(200);
  });

  it('Failed login cookie test', async () => {
    const response = await supertest(app)
      .post('/api/users/user')
      .send(wrongData);
    expect(response.statusCode).toBe(404);
  });
});

async function openDBConnection() {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log('Database connection successfully opened');
    })
    .catch(err => console.log(err));
}

async function closeDBConnection() {
  mongoose.connection.close();
}
