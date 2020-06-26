import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  templateUrl: './contactmanager-app.component.html',
  styleUrls: ['./contactmanager-app.component.scss']
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(private _iconRegistry: MatIconRegistry, private _sanitazor: DomSanitizer) { 
    this._iconRegistry.addSvgIcon('boy', this._sanitazor.bypassSecurityTrustResourceUrl('assets/avatar-boy.svg'));
    this._iconRegistry.addSvgIcon('girl', this._sanitazor.bypassSecurityTrustResourceUrl('assets/avatar-girl.svg'));

  }

  ngOnInit(): void {
  }

}
