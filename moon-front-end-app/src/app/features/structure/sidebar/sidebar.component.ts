import { Component, OnInit } from '@angular/core';
import { NavService } from '../../../shared/nav.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
function getMenu(parentID, data) {

  let fnData = data;

  return fnData.filter(function (node) {
    return (node.parentObjNo === parentID);
  }).map(function (node) {
    var exists = fnData.some(function (childNode) {

      return childNode.parentObjNo === node.OBJ_NO;
    });

    var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(node.OBJ_NO, fnData).join('') + '</ul>' : "";
    if (!node.connectByIsleaf) {
      return '<li><a class="has-submenu" href="#"><span class="menu-text">' + node.OBJ_NAME + '</span><i class="fa fa-angle-down"></i></a>' + subMenu + '</li>';
    } else {
      return '<li><a class="active-menu" rel = "/' + node.MENU_ID.replace("_", "").toLowerCase() + '" href = "#" > <span class="sub-menu-text" > ' + node.OBJ_NAME + ' </span>' + subMenu + '</a > </li>'
    }
  });
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  public navArray = [];
  htmlStr: string = '';
  constructor(private navService: NavService, private router: Router) {
  }

  ngOnInit() {
    this.getAllNavMenu();
  }

  getAllNavMenu() {
    this.navService.getMenu('F').subscribe(data => {
      this.navArray = JSON.parse(JSON.stringify(data.body));
      this.loadClickEvent(this.navArray);
    })
  }

  loadClickEvent(_nav) {

    let router = this.router;

    const routerArr = router.url.split('/');
    if (routerArr.length < 1) return;
    let module = routerArr[1];
    if (module === "load") {
      if (routerArr.length < 5) { return; }
      else { module = routerArr[3]; }
    }
    this.htmlStr = getMenu("M", _nav).join('');

    $(document).ready(function () {
      $('.menu-accordion .has-submenu').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('menu-show')) {
          $this.next().removeClass('menu-show');

          $this.next().slideUp(350);
        } else {
          $this.next().toggleClass('menu-show');
          $this.next().slideToggle(350);
        }
      });

      $('.active-menu').on('click', function (e) {
        e.preventDefault();
        router.navigateByUrl($(this).attr('rel'));
        $('.active-menu').removeClass('active');
        $(this).addClass('active');
      });

    })
  }

}
