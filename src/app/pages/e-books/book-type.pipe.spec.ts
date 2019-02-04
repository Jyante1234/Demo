import { BookTypePipe } from './book-type.pipe';

describe('BookTypePipe', () => {
  it('create an instance', () => {
    const pipe = new BookTypePipe();
    expect(pipe).toBeTruthy();
  });
});
