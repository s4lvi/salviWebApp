import { DungeonModule } from './dungeon.module';

describe('DungeonModule', () => {
  let dungeonModule: DungeonModule;

  beforeEach(() => {
    dungeonModule = new DungeonModule();
  });

  it('should create an instance', () => {
    expect(dungeonModule).toBeTruthy();
  });
});
