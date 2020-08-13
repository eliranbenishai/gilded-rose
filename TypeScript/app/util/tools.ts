import { QUALITY, TYPE } from "./const"
import { UpdateItemValuesInt } from "../type"

export const increaseQuality = (quality: number) => quality <= QUALITY.Max ? quality + 1 : quality
export const decreaseQuality = (quality: number) => quality > QUALITY.Min ? quality - 1 : quality

export const updateQuality = (values:UpdateItemValuesInt):number => {
  let { quality, sellIn } = values
  quality = decreaseQuality(quality)
  quality = sellIn <= 0 ? decreaseQuality(quality) : quality
  
  return quality
}

export const updateItem = (values:UpdateItemValuesInt, name: string):UpdateItemValuesInt => {
    let { quality, sellIn } = values

    switch (name) {
        case TYPE.AgedBree:
            sellIn -= 1
            quality = increaseQuality(quality)
            quality = sellIn < 0 ? increaseQuality(quality) : quality
            break
            
        case TYPE.BackstagePass:
            sellIn -= 1
            quality = increaseQuality(quality);
            quality = sellIn <= 10 ? increaseQuality(quality) : quality;
            quality = sellIn <= 5 ? increaseQuality(quality) : quality;
            
            quality = sellIn === 0 ? 0 : quality;
            break

        case TYPE.Conjured:
            sellIn -= 1
            if (sellIn === 5) {
                quality -= 3
            } else {
                quality = updateQuality({ quality, sellIn })
            }
            break

        case TYPE.Sulfuras:
            break

        default:
            sellIn -= 1
            quality = updateQuality({ quality, sellIn })
            break
    }

    return {
        quality,
        sellIn,
    }
}