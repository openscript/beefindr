import { Hive } from './hive';

describe('Hive', () => {
  it('should create an instance', () => {
    expect(new Hive({
      name: 'Max Muster',
      address: {
        street: 'Musterstrasse 1337',
        zip: 1337,
        place: 'Leet'
      },
      email: 'max-muster@example.com'
    })).toBeTruthy();
  });
});
