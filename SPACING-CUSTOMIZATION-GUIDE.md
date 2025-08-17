# Portfolio Spacing Customization Guide

## 🎯 Quick Mobile Spacing Changes

### **Simple 2-Line Edit**
Open `01-MAIN-WORKSPACE/portfolio-main.html` and find these lines:

**Line 50:**
```css
--mobile-card-gap: 12px; /* Space between cards - change this number easily */
```

**Line 51:**
```css
--mobile-card-gap-small: 10px; /* Small screens - change this number easily */
```

### **How to Customize:**

**More spacing between cards:**
```css
--mobile-card-gap: 20px;        /* Tablets/Mobile */
--mobile-card-gap-small: 15px;  /* Small phones */
```

**Less spacing between cards:**
```css
--mobile-card-gap: 8px;         /* Tablets/Mobile */
--mobile-card-gap-small: 6px;   /* Small phones */
```

**No spacing (cards touch):**
```css
--mobile-card-gap: 0px;         /* Tablets/Mobile */
--mobile-card-gap-small: 0px;   /* Small phones */
```

**Recommendation: ~10% of card height (~105px)**
```css
--mobile-card-gap: 12px;        /* ~10% spacing (recommended) */
--mobile-card-gap-small: 10px;  /* ~10% spacing for small screens */
```

## 📱 When Changes Apply

- **--mobile-card-gap**: Screens 481px to 768px wide (tablets, large phones)
- **--mobile-card-gap-small**: Screens 480px and smaller (small phones)

## 🖥️ Desktop Spacing (Optional)

**Line 56:**
```css
--desktop-gap: 2.5rem; /* Desktop grid spacing */
```

Change `2.5rem` to adjust spacing on desktop (1rem = 16px).

## ✅ That's It!

Just change the pixel numbers on lines 50 and 51. Save the file and refresh your browser to see the changes.

---
*Updated: 2025-08-17 - Session 3 Simplification*