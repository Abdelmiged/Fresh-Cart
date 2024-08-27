import { Routes } from '@angular/router';
import { HomePageComponent } from './Components/Layout/Pages/home-page/home-page.component';
import { CartPageComponent } from './Components/Layout/Pages/cart-page/cart-page.component';
import { ProductsPageComponent } from './Components/Layout/Pages/products-page/products-page.component';
import { CategoriesPageComponent } from './Components/Layout/Pages/categories-page/categories-page.component';
import { BrandsPageComponent } from './Components/Layout/Pages/brands-page/brands-page.component';
import { NotFoundComponent } from './Components/Layout/not-found/not-found.component';
import { RegisterPageComponent } from './Components/Layout/Pages/register-page/register-page.component';
import { LoginPageComponent } from './Components/Layout/Pages/login-page/login-page.component';
import { authenticationGuard } from './Guard/Guard/authentication.guard';
import { ForgotPasswordPageComponent } from './Components/Layout/Pages/ForgotPassword/forgot-password-page/forgot-password-page.component';
import { VerifyPasswordPageComponent } from './Components/Layout/Pages/ForgotPassword/verify-password-page/verify-password-page.component';
import { ResetPasswordPageComponent } from './Components/Layout/Pages/ForgotPassword/reset-password-page/reset-password-page.component';
import { forgotPasswordGuard } from './Guard/ForgotPasswordGuard/forgot-password.guard';


export const routes: Routes = [
    {path: "home-page", component: HomePageComponent, canActivate: [authenticationGuard]},
    {path: "cart-page", component: CartPageComponent, canActivate: [authenticationGuard]},
    {path: "products-page", component: ProductsPageComponent, canActivate: [authenticationGuard]},
    {path: "categories-page", component: CategoriesPageComponent, canActivate: [authenticationGuard]},
    {path: "brands-page", component: BrandsPageComponent, canActivate: [authenticationGuard]},
    {path: "register-page", component: RegisterPageComponent},
    {path: "login-page", component: LoginPageComponent},
    {path: "forgot-password-page", component: ForgotPasswordPageComponent},
    {path: "verify-password-page", component: VerifyPasswordPageComponent, canActivate: [forgotPasswordGuard]},
    {path: "reset-password-page", component: ResetPasswordPageComponent},
    {path: "", redirectTo: "home-page", pathMatch: "full"},
    {path: "**", component: NotFoundComponent}
];
