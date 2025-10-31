import type {
  accounts,
  brands,
  categories,
  componentFeatures,
  components,
  favoriteComponents,
  features,
  listingPrices,
  listings,
  sessions,
  sources,
  users,
  verifications,
} from '../schema'

export type Account = typeof accounts.$inferSelect
export type Brand = typeof brands.$inferSelect
export type Category = typeof categories.$inferSelect
export type ComponentFeature = typeof componentFeatures.$inferSelect
export type Component = typeof components.$inferSelect
export type FavoriteComponent = typeof favoriteComponents.$inferSelect
export type Feature = typeof features.$inferSelect
export type ListingPrice = typeof listingPrices.$inferSelect
export type Listing = typeof listings.$inferSelect
export type Session = typeof sessions.$inferSelect
export type Source = typeof sources.$inferSelect
export type User = typeof users.$inferSelect
export type Verification = typeof verifications.$inferSelect

export type NewAccount = typeof accounts.$inferInsert
export type NewBrand = typeof brands.$inferInsert
export type NewCategory = typeof categories.$inferInsert
export type NewComponentFeature = typeof componentFeatures.$inferInsert
export type NewComponent = typeof components.$inferInsert
export type NewFavoriteComponent = typeof favoriteComponents.$inferInsert
export type NewFeature = typeof features.$inferInsert
export type NewListingPrice = typeof listingPrices.$inferInsert
export type NewListing = typeof listings.$inferInsert
export type NewSession = typeof sessions.$inferInsert
export type NewSource = typeof sources.$inferInsert
export type NewUser = typeof users.$inferInsert
export type NewVerification = typeof verifications.$inferInsert
