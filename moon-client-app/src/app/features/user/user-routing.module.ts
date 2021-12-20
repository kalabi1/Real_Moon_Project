import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderInformationComponent } from './order-information/order-information.component';
import { FeatureProductDetailComponent } from './product-detail/feature-product-details';
import { ProjectListPlotComponent } from './project-list/project-list-plot.component';
import { ChairmanMessageComponent } from './chairman-message/chairman-message.component';
import { DirectorMessageComponent } from './director-message/director-message.component';
import { ManagingDirectorMessageComponent } from './managing-director-message/managing-director-message.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product-details/:id', component: ProductDetailComponent },
      { path: 'feature-product-details/:id', component: FeatureProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'project-list', component: ProjectListComponent },
      { path: 'project-list/:id', component: ProjectListComponent },
      { path: 'project-list-plot/:id', component: ProjectListPlotComponent },
      { path: 'project-details/:id', component: ProjectDetailsComponent },
      { path: 'checkout/:id', component: OrderConfirmationComponent },
      { path: 'order-info/:id', canActivate: [AuthGuard], component: OrderInformationComponent },
      { path: 'my-order', canActivate: [AuthGuard], component: MyOrderComponent },
      { path: 'profile', canActivate: [AuthGuard], component: MyProfileComponent },
      { path: 'edit-profile', canActivate: [AuthGuard], component: EditProfileComponent },
      { path: 'message-chairman', component: ChairmanMessageComponent },
      { path: 'director-chairman', component: DirectorMessageComponent },
      { path: 'managing-director-chairman', component: ManagingDirectorMessageComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'gallery-details', component: GalleryDetailsComponent },
      { path: 'gallery-details/:id', component: GalleryDetailsComponent },
      { path: 'contact', component: ContactComponent },
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }