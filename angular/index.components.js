import {DashboardComponent} from './app/components/dashboard/dashboard.component';
import {NavSidebarComponent} from './app/components/nav-sidebar/nav-sidebar.component';
import {NavHeaderComponent} from './app/components/nav-header/nav-header.component';
import {LoginLoaderComponent} from './app/components/login-loader/login-loader.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';
import {CreatePostFormComponent} from './app/components/create_post_form/create_post_form.component';

angular.module('app.components')
	.component('dashboard', DashboardComponent)
	.component('navSidebar', NavSidebarComponent)
	.component('navHeader', NavHeaderComponent)
	.component('loginLoader', LoginLoaderComponent)
    .component('loginForm', LoginFormComponent)
    .component('registerForm', RegisterFormComponent)
    .component('createPostForm', CreatePostFormComponent);
