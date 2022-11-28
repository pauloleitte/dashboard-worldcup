import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { AuthService } from "./features/auth/auth.service";
import { AuthGuard } from "./shared/guards/auth.guard";
import { SnackBarService } from "./shared/services/snack-bar/snack-bar.service";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, AppRoutingModule, HttpClientModule, SharedModule, BrowserAnimationsModule],
  providers: [AuthGuard, AuthService, SnackBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
