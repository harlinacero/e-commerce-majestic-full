import { Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';
import { AuthGuard } from '../helpers/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'presentation',
				component: VideoComponent,
				canActivate: [AuthGuard],
				data: { roles: ['seller', 'shooper'] }
			},
			{
				path: 'forbidden',
				component: ForbiddenComponent
			}
		]
	},
];
