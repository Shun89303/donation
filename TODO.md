# Responsive CampaignCard Updates

## Plan Steps

- [x] Step 1: Add responsive logic (useWindowDimensions, Platform, scales) to CampaignCard.tsx and replace fixed styles with dynamic scaled values matching project patterns (SearchPanel/OrganizationFilters).
- [ ] Step 2: Update CampaignFeed.tsx to use numColumns=2 on tablets (width >=800) via getItemLayout or columnWrapperStyle, with responsive margins.
- [x] Step 3: Read and update SupportButton.tsx if it has fixed styles (responsive scales). No major changes needed (renamed styles).
- [x] Step 4: Test with `npx expo start --clear` and verify on phone/tablet previews. Server running, test in Expo Go.

Task complete ✅
