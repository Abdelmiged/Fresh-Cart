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
import { ProductDetailsPageComponent } from './Components/Layout/Pages/ProductDetailsPage/product-details-page/product-details-page.component';
import { WishlistPageComponent } from './Components/Layout/Pages/wishlist-page/wishlist-page/wishlist-page.component';
import { ShippingAddressDetailsComponent } from './Components/Layout/Pages/shipping-address-details/shipping-address-details.component';
import { verifyPasswordGuard } from './Guard/VerifyPasswordGuard/verify-password.guard';


export const routes: Routes = [
    {path: "home-page", component: HomePageComponent, canActivate: [authenticationGuard], title: "Home"},
    {path: "cart-page", component: CartPageComponent, canActivate: [authenticationGuard], title: "Cart"},
    {path: "wishlist-page", component: WishlistPageComponent, canActivate: [authenticationGuard], title: "Wishlist"},
    {path: "products-page", component: ProductsPageComponent, canActivate: [authenticationGuard], title: "Products"},
    {path: "categories-page", component: CategoriesPageComponent, canActivate: [authenticationGuard], title: "Cataegories"},
    {path: "brands-page", component: BrandsPageComponent, canActivate: [authenticationGuard], title: "Brands"},
    {path: "product-details-page/:id", component: ProductDetailsPageComponent, canActivate: [authenticationGuard], title: "Product Details"},
    {path: "shipping-address-details/:cartId", component: ShippingAddressDetailsComponent, canActivate: [authenticationGuard], title: "Shipping Address"},
    {path: "register-page", component: RegisterPageComponent, title: "Register"},
    {path: "login-page", component: LoginPageComponent, title: "Login"},
    {path: "forgot-password-page", component: ForgotPasswordPageComponent, title: "Forgot Password"},
    {path: "verify-password-page", component: VerifyPasswordPageComponent, canActivate: [forgotPasswordGuard], title: "Verify Password"},
    {path: "reset-password-page", component: ResetPasswordPageComponent, canActivate: [verifyPasswordGuard], title: "Reset Password"},
    {path: "allorders", redirectTo:"home-page", pathMatch: "full"},
    {path: "cart", redirectTo:"cart-page", pathMatch: "full"},
    {path: "", redirectTo: "home-page", pathMatch: "full"},
    {path: "**", component: NotFoundComponent, title: "Not Found"}
];
