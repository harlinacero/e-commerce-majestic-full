import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastComponent } from "src/app/component/toast/toast.component";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from "src/app/services/storage.service";
import { ToastService } from "src/app/services/toast.service";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";

//declare var $: any;

@Component({
  selector: "app-full-layout",
  standalone:true,
  imports:[RouterModule, SidebarComponent, NavigationComponent, CommonModule, NgbCollapseModule, ToastComponent],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnInit {

  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  alertMessage: string | null = null;

 constructor(public router: Router, private storageService: StorageService, 
    private authService: AuthService,
    public toastService: ToastService
  ) {}


  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  ngOnInit() {
    this.storageService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.router.url === "/") {
      this.router.navigate(["/home"]);
    }
    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
