import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { StractureModule } from '../structure/stracture.module';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderInformationComponent } from './order-information/order-information.component';
import { CoreModule } from '../../core/core.module';
import { FeatureProductDetailComponent } from './product-detail/feature-product-details';
import { ProjectListPlotComponent } from './project-list/project-list-plot.component';
import { ChairmanMessageComponent } from './chairman-message/chairman-message.component';
import { DirectorMessageComponent } from './director-message/director-message.component';
import { ManagingDirectorMessageComponent } from './managing-director-message/managing-director-message.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { TokenInterceptor } from '../../core/interceptors/token-interceptor.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AgmCoreModule } from '@agm/core';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjAU7UQs4psVVEEVC7WeE7WCYQWG9Cftc',
      libraries: ['places']
    }),
    StractureModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    CarouselModule.forRoot(),
    NgxPaginationModule,
    CoreModule
  ],
  declarations: [
    UserComponent,
    HomeComponent,
    ProductDetailComponent,
    FeatureProductDetailComponent,
    CartComponent,
    ProjectListComponent,
    ProjectListPlotComponent,
    ProjectDetailsComponent,
    OrderConfirmationComponent,
    MyProfileComponent,
    MyOrderComponent,
    EditProfileComponent,
    OrderInformationComponent,
    ChairmanMessageComponent,
    DirectorMessageComponent,
    ManagingDirectorMessageComponent,
    GalleryComponent,
    ContactComponent,
    GalleryDetailsComponent
  ],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class UserModule { }