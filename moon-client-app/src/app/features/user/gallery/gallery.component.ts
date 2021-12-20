import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { acConfig } from '../../../app.config'


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  public galleryList;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getGalleryList();
  }

  getGalleryList() {
    this.http.get(`${acConfig.apiUrl}/sa/gallery/`, {
      params: {

      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        this.galleryList = JSON.parse(JSON.stringify(response.body)).map(element => {
          element['galleryThumbName'] = acConfig.fileUrl + element.galleryThumbName;
          if(element['galleryDescr']){
            element['galleryDescr'] = this.getEditorValue(element['galleryDescr']);
          }
          return element;
        });
        console.log("this.galleryList", this.galleryList);
      })
      .catch(console.log);
  }

  getEditorValue(value) {
    value = value.replace(/\r|\n/g, "<br />").replace(/\*(.+?)\*/g, "<b>$1</b>")
    return value;
  }

}
