import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../features/auth/auth.service";
import { ChartComponent } from "./components/chart/chart.component";
import { NavComponent } from "./components/nav/nav.component";
import { TableComponent } from "./components/table/table.component";

const modules = [CommonModule, RouterModule];

const components = [TableComponent, ChartComponent, NavComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [...modules],
  providers: [AuthService],
})
export class SharedModule {}
