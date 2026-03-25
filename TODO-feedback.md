# Feedback Task: Update Expense mock data + verified tick icon

**Status: In Progress**

## Steps:

- [x] 1. User confirmed plan for mock data update + hasReceipt tick
- [x] 2. Create TODO-feedback.md

- [ ] 3. Extend CampaignExpenseItem type in components/home/campaignTypes.ts with optional hasReceipt: boolean
- [x] 4. Update createExpenseReport in components/home/campaignMockData.ts with 6 new items per campaign (Rice etc., matching amounts/hasReceipt), ensure totalSpentLabel shows "4,500,000 MMK"

- [x] 5. Update ExpenseSection.tsx: import Check from lucide-react-native, conditionally render small green checkmark next to title if item.hasReceipt (inline flex row with title)

- [x] 6. Update TODO-feedback.md
- [x] 7. Test and attempt_completion
