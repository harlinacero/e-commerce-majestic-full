import { Routes } from '@angular/router';
import { VideoComponent } from './video/video.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'presentation',
				component: VideoComponent
			},
			// {
			// 	path: 'product',
			// 	component: ProdcutComponent
			// }
		]
	}
];
