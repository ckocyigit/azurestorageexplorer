import { Component, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { BaseComponent } from '../base/base.component';

@Component({
	selector: 'shares',
	templateUrl: './shares.component.html'
})

export class SharesComponent extends BaseComponent {
	public shares: string[] | undefined;
	public selectedShare: string = '';

  @ViewChild('newShareName', { read: null, static: false }) newShareName: any;
  @ViewChild('containersMenu', { read: null, static: false }) containersMenu: any;

	constructor(utilsService: UtilsService) {
		super(utilsService);
		this.getShares();
	}

	ngOnChanges() {
		this.getShares();
	}

	getShares() {
		this.loading = true;
		this.utilsService.getData('api/Files/GetShares').subscribe(result => {
			this.loading = false;
			this.shares = JSON.parse(result);
		}, error => { this.setError(error); });
	}

	sharedChanged(event: Event) {
		var element = (event.currentTarget as Element);
		var share = (element.textContent as string).trim();

		var nodes = this.containersMenu.nativeElement.childNodes;
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].classList)
				nodes[i].classList.remove("active");
		}

		element.classList.add("active");

		this.selectedShare = share;
	}

	//newShare(event: Event) {
	//	let url = 'api/Files/NewShare?share=' + this.newShareName.nativeElement.value
	//	this.utilsService.postData(url, null).subscribe(result => {
	//		this.newShareName.nativeElement.value = "";
	//		this.getShares();
	//	}, error => { this.setError(error); });

	//}

	forceRefresh(force: boolean) {
		if (force) {
			this.getShares();
			this.selectedShare = '';
		}
	}
}
