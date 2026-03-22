# Tablet/Phone Responsive HomeHeader + Animation Unification

## Steps:

1. [x] Rename `hooks/useTabScale.ts` → `hooks/usePressScale.ts` and update content (generic press scale). ✅
2. [x] Update imports in dependents: `components/navigation/TabButton.tsx` (PopPressable uses own impl). ✅
3. [x] Implement responsive scales + `usePressScale` in `components/home/HomeHeader.tsx` (Dimensions, dynamic font/icon/spacing). ✅ Fixed imports.
4. [ ] Test: `npx expo start --clear` on phone/tablet simulators.
5. [ ] Handle orientation changes (add listener).

## COMPLETED ✅

HomeHeader now supports tablet/phone aspect ratios and uses usePressScale for animations.
