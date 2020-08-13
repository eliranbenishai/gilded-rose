import { expect } from 'chai'
import { GildedRose } from '../app'
import Item from '../app/class/Item'
import { TYPE } from '../app/util/const'

describe('Gilded Rose', () => {

    it('Adding a new item', () => {
        const gildedRose = new GildedRose([ new Item('Unknown Item', 0, 0) ])
        const newItem = gildedRose.itemList[0]
        expect(newItem.name).to.equal('Unknown Item')
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(0)
    })
})

describe('General quality rules', () => {
    it('updateQuality when `sellIn = 1`', () => {
        const gildedRose = new GildedRose([ new Item('Unknown Item', 1, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(0)
    })
     
    it('updateQuality when `sellIn = 0`', () => {
        const gildedRose = new GildedRose([ new Item('Unknown Item', 0, 4) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(2)
        expect(newItem.sellIn).to.equal(-1)
    })

    it('Quality never goes below 0', () => {
        const gildedRose = new GildedRose([ new Item('Unknown Item', 0, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(-1)
    })

    it('Quality peaks at 50', () => {
        const gildedRose = new GildedRose([ new Item('Unknown Item', 1, 50) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(50)
        expect(newItem.sellIn).to.equal(0)
    })
})

describe('Aged Brie quality rules', () => { 

    it('Quality of Aged Brie increases when `sellIn` decreases', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.AgedBree, 1, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(2)
        expect(newItem.sellIn).to.equal(0)
    })
    
})

describe('Sulfuras quality rules', () => {
    it('Quality does not decrease', () => {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 1, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(80)
        expect(newItem.sellIn).to.equal(1)
    })
})

describe('backstage pass quality rules', () => {
    it('should increase quality of backstage passes by 1 when more than 10 days remaining', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 11, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(2)
        expect(newItem.sellIn).to.equal(10)
    })
    it('should increase quality of backstage passes by 2 when more than 5 days remaining', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 6, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(3)
        expect(newItem.sellIn).to.equal(5)
    })
    it('should increase quality of backstage passes by 3 when less than 5 days remaining', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 3, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(4)
        expect(newItem.sellIn).to.equal(2)
    })
    it('should set quality of backstage passes to 0 after concert', () => {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(-1)
    })
})

describe('conjured items', () => {
    it('should update quality for conjured sellin 1 day', () => {
        const gildedRose = new GildedRose([ new Item('Conjured', 1, 2) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(0)
    })
     
    it('should update conjured quality 4x as fast for sellin 0 days', () => {
        const gildedRose = new GildedRose([ new Item('Conjured', 0, 4) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(-1)
    })

    it('conjured item quality should never go below 0', () => {
        const gildedRose = new GildedRose([ new Item('Conjured', 0, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(-1)
    })

    it('should lower quality by 3 if exactly 5 days left', () => {
        const gildedRose = new GildedRose([ new Item('Conjured', 5, 6 )])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(3)
        expect(newItem.sellIn).to.equal(4)
    })
})