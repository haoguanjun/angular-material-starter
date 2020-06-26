import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoModule } from './demo/demo.module';
import { ContactManagerModule } from './contactmanager/contactmanager.module';
import { ContactmanagerAppComponent } from './contactmanager/contactmanager-app.component';

const routes: Routes = [
  { path: "demo", loadChildren: "./demo/demo.module#DemoModule"},
  { path: "contactmanager", loadChildren: "./contactmanager/contactmanager.module#ContactManagerModule"},
  { path: "**", redirectTo: 'contactmanaget' }
];

@NgModule({
  imports: [
    DemoModule,
    ContactManagerModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
