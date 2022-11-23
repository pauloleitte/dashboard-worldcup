import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatchComponent } from './match.component';
import { MatchService } from './match.service';
import { MatchRoutingModule } from './math.routing.module';

@NgModule({
  declarations: [MatchComponent],
  imports: [
    CommonModule,
    MatchRoutingModule
  ],
  providers: [MatchService]
})
export class MatchModule { }
