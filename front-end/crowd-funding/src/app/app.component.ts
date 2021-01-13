import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { SplashScreenService } from './_components/splash-screen/splash-screen.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crowd-funding';
  private unsubscribe: Subscription[] = [];

  constructor(
    private router: Router,
    private splashScreenService: SplashScreenService) {}

  
  /**
	 * On init
	 */
	ngOnInit(): void {
		// enable/disable loader

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

}
