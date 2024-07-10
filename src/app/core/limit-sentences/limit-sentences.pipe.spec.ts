import { LimitSentencesPipe } from './limit-sentences.pipe';

describe('LimitSentencesPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitSentencesPipe();
    expect(pipe).toBeTruthy();
  });
});
