import { expect } from 'chai'
import { GildedRose } from '../app'
import Item from '../app/class/Item'
import { TYPE, QUALITY } from '../app/util/const'

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
})

describe('Aged Brie quality rules', () => { 

    it('Quality of Aged Brie increases when `sellIn` decreases', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.AgedBrie, 1, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(2)
        expect(newItem.sellIn).to.equal(0)
    })
    
    it('Quality peaks at 50', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.AgedBrie, 1, 50) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(50)
        expect(newItem.sellIn).to.equal(0)
    })
})

describe('Backstage Pass quality rules', () => {
    it('Increase quality by 2 if `sellIn <= 10`', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.BackstagePass, 11, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(3)
        expect(newItem.sellIn).to.equal(10)
    })

    it('Increase quality by 3 if `sellIn <= 5`', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.BackstagePass, 6, 1) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(4)
        expect(newItem.sellIn).to.equal(5)
    })
    
    it('Quality is 0 if `sellIn <= 0`', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.BackstagePass, 0, 10) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(-1)
    })
})

describe('Sulfuras quality rules', () => {
    it('Quality does not decrease', () => {
        const gildedRose = new GildedRose([ new Item(TYPE.Sulfuras, 1, QUALITY.Max) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(QUALITY.Max)
        expect(newItem.sellIn).to.equal(1)
    })
})

describe('Conjured quality rules', () => {
    it('Quality decreases twice as fast when `sellIn > 0`', () => {
        const gildedRose = new GildedRose([ new Item('Conjured', 2, 4) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(2)
        expect(newItem.sellIn).to.equal(1)
    }
    )
    it('Quality decreases twice as fast when `sellIn <= 0`', () => {
        const gildedRose = new GildedRose([ new Item('Conjured', 1, 4) ])
        const newItem = gildedRose.updateQuality()[0]
        expect(newItem.quality).to.equal(0)
        expect(newItem.sellIn).to.equal(0)
    })
})