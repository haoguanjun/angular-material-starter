import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent }
];

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations:[
    ButtonsComponent
  ],
  exports: [RouterModule]
})
export class DemoModule { }
