import { TreeExampleModule } from './tree-example.module';

describe('TreeExampleModule', () => {
  let treeExampleModule: TreeExampleModule;

  beforeEach(() => {
    treeExampleModule = new TreeExampleModule();
  });

  it('should create an instance', () => {
    expect(treeExampleModule).toBeTruthy();
  });
});
