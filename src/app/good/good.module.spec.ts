import { GoodModule } from './good.module';

describe('GoodModule', () => {
  let goodModule: GoodModule;

  beforeEach(() => {
    goodModule = new GoodModule();
  });

  it('should create an instance', () => {
    expect(goodModule).toBeTruthy();
  });
});
