import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/features/auth/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.isLoggedIn$.subscribe((val) => {
      console.log("VALOR", val);
      this.isLoggedIn = val;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
