# Update GallerySection.tsx to collapsible list

Status: In progress

## Steps:

- [x] 1. Add imports: Animated, useEffect, useRef, FlatList, Dimensions from 'react-native'; useState if needed.
- [ ] 2. Add expandAnim ref and isExpanded (sync with prop isOpen).
- [ ] 3. Add useEffect for animation timing on isExpanded change.
- [ ] 4. Add interpolators: contentMaxHeight (0 -> measured ~220px), opacity, chevron rotate.
- [ ] 5. Update header Pressable onPress to onToggle().
- [ ] 6. Wrap sectionContent in Animated.View with maxHeight/opacity/overflow:hidden; add onLayout to measure height.
- [ ] 7. Add transform rotate to chevron based on animation.
- [ ] 8. Replace galleryGrid with FlatList of ALL galleryImageUris: numColumns=2, render 2x2 tiles (full width/2, height 108), scrollable if >4. Preserve +X overlay on index===3 if extra>0, onPressShowAll.
- [ ] 9. Update empty state similarly animated.
- [ ] 10. Test animation, toggle, scroll, empty/4/many images.

After all: Mark complete, run app to verify.
