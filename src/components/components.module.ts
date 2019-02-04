import { NgModule } from '@angular/core';
import { LaundryCardComponent } from './laundry-card/laundry-card';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [
		LaundryCardComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		IonicModule
	],
	exports: [
		LaundryCardComponent
	]
})
export class ComponentsModule {}
