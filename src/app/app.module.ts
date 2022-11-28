import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { AuthGuard } from "./shared/guards/auth.guard";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
