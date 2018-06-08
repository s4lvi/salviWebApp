import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DungeonDisplayComponent } from './dungeon-display/dungeon-display.component';
import { DungeonInterpreterComponent } from './dungeon-interpreter/dungeon-interpreter.component';
import { DungeonLogicComponent } from './dungeon-logic/dungeon-logic.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DungeonDisplayComponent, DungeonInterpreterComponent, DungeonLogicComponent]
})
export class DungeonModule { }
