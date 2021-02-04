import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
  ];

  currentTheme = 'default';

  loggedUserMenu = [ { title: 'Desconectar', icon: 'log-out-outline' } ];
  anonymousUserMeny = [ { title: 'Conectar', icon: 'github-outline' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.setupUserMenu();
    this.updateUser();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  private async updateUser() {
    this.userService.getUser().then(data => this.user = data);
  }

  private setupUserMenu() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'logged-context-menu'),
        map(({ item: { title } }) => title),
      ).subscribe(title => {
        if (title === 'Desconectar') {
          this.authService.logout();
          this.user = null;
        }
      });

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'not-logged-context-menu'),
        map(({ item: { title } }) => title),
      ).subscribe(title => {
        if (title === 'Conectar') {
          this.authService.requestAuthorization();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
