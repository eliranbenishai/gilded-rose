import Item from './class/Item'
import { updateItem } from './util/tools'

export class GildedRose {
    itemList: Array<Item>

    constructor(itemList:Item[] = []) {
        this.itemList = itemList
    }

    updateQuality():Item[]  {
        for (let index = 0; index < this.itemList.length; index++) {
            const currentItem = this.itemList[index] as Item
            const { quality, sellIn, name } = currentItem
            const { quality: newQuality, sellIn: newSellIn } = updateItem({ quality, sellIn }, name)
            
            currentItem.quality = newQuality
            currentItem.sellIn = newSellIn
        }
        return this.itemList
    }
}


