import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { acConfig } from '../../../app.config'
import { SaGallery } from './../../../models/sa-gallery.model';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html'
})
export class GalleryDetailsComponent implements OnInit {
  public gallery = new SaGallery();
  public galleryPhotoUrl;


  constructor(private http: HttpClient,  private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.getGalleryDetails(id);
    }
  }

  getGalleryDetails(id) {
    this.http.get(`${acConfig.apiUrl}/sa/gallery/get-gallery`, {
      params: {
        galleryNo: id
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.gallery = new SaGallery(response.body)
        this.galleryPhotoUrl = acConfig.fileUrl + this.gallery.galleryPhotoName;
        if (this.gallery.galleryDescr) {
          this.gallery.galleryDescr = this.getEditorValue(this.gallery.galleryDescr)
        }
      })
      .catch(console.log);
  }

  getEditorValue(value) {
    value = value.replace(/\r|\n/g, "<br />").replace(/\*(.+?)\*/g, "<b>$1</b>")
    return value;
  }
}
