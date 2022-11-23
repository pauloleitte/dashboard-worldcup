import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  logged = false;
  ngOnInit(): void {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      this.logged = true;
    }
  }
}
