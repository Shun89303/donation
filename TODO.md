# CreateOrganization Wizard Implementation

## Status: In Progress

### Step 1: ✅ Create TODO.md (Current)

### Step 2: Implement full CreateOrganization.tsx

- Define OrganizationFormData interface matching spec.
- Add state: formData, currentStep (1-5).
- Import/use: FadeScreen, useTheme, usePressScale, expo-image-picker (launchImageLibrary for logo, \* for doc?), StyleSheet.
- Build StepProgress component (5 bars, colors #4F46E5/#D1D5DB).
- Step indicator below progress.
- Conditional step renders (1-5) with inputs/validation.
- Custom Input: TextInput styled.
- Dropdown: SegmentedControls or Picker for orgType.
- File previews.
- Buttons with usePressScale.
- Review in step 5.
- Submit mock.

### Step 3: Install deps if needed

- expo install expo-image-picker expo-document-picker (if doc != image).

### Step 4: Test

- npx expo start, navigate to /createOrganization.
- Verify steps, validation, theme, progress.

### Step 5: Complete

- attempt_completion.
