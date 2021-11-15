import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemService} from "../shared/item.service";
import {Subscription} from 'rxjs';
import {Item} from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  items: Item[] = []
  pSub: Subscription
  itemTitle


  constructor(private itemsService: ItemService) {
  }

  ngOnInit(): void {
    this.pSub = this.itemsService.getAll().subscribe(items => {
      this.items = items
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }

  addItem(item){
    this.itemsService.addItem(item)
  }
}
