import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RajukApproval } from './../../../../../models/rajukapproval.model';
@Component({
  selector: 'app-rl1012',
  templateUrl: './rl1012.component.html',
})
export class RL1012Component implements OnInit {
  public rajukApproval = new RajukApproval();
  public editMode = false;


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }
}
