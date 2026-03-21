# Campaign Details Modularization TODO

## Status: 🚀 In Progress

### 1. [ ] Setup Utilities

- ✅ Read utils/campaignDetailsUtils.ts (if needed)
- [ ] Extract 6 utility functions from index.tsx → utils/campaignDetailsUtils.ts
- [ ] Update imports in index.tsx

### 2. [ ] Create New Components (9 files in components/campaign/)

- [✅] CollapsibleSection.tsx (reusable)
- [ ] TopHeaderRow.tsx
- [✅] TopHeaderRow.tsx
- [ ] CampaignSummaryBlock.tsx
- [ ] PhotoGallery.tsx
- [ ] CampaignUpdates.tsx
- [ ] ExpenseReport.tsx
- [ ] ProofsSection.tsx
- [ ] AgencyVerification.tsx
- [ ] DonorComments.tsx
- [ ] CampaignFooter.tsx
- [ ] NotFoundCampaign.tsx

### 3. [ ] Refactor Main File

- [ ] app/campaign/[campaignId]/index.tsx → slim orchestrator
- Remove inline components/utilities
- Add imports for new components
- Pass props/state down

### 4. [ ] Testing & Validation

- [ ] Navigate to campaign details page
- [ ] Verify all sections expand/collapse
- [ ] Test donate button navigation
- [ ] Test save/share/comments
- [ ] ✅ Complete (attempt_completion)

**Next Action:** Extract utilities to utils/campaignDetailsUtils.ts
